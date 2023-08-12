---
layout: post
title:  "Passing the OSCP"
date:   2023-08-12 00:00:00 -0400
desc: >
    Where I talk about what I did to pass the OSCP
---

# Preface
The [OSCP](https://www.offsec.com/courses/pen-200/) is a penetration testing certification provided by Offensive Security ([Offsec](https://www.offsec.com/)) that covers a variety of hacking skills including scanning and networking operations, web application attacks, 
client side attacks, privilege escalation, Active Directory attacks, and more. The certification culminates in a 48 hour exam that is broken into two parts. 

The first 24 hours simulates a penetration test where you are tasked with attacking a network of six machines. Three of the machines, known as the AD set, are networked together in an AD configuration with one domain controller and
two clients. These machines can have dependencies meaning that information gained from one machine can be used to help you attack the other two. The other three machines
are known as the standalone machines and information gained on these machines is not useful for attacking any of the others.

## Scoring
To pass the exam, you need 70 points. Here's a breakdown of how the exam is scored.

- AD set - 40 points (all or nothing)
- Standalone machines - 20 points each (10 points for unprivileged access, 10 points for root)
- Bonus points - 10 points

To get points for the AD set, you must get administrative access on the domain controller. Points are awarded in an all or nothing manner, meaning that if you compromise two of the hosts on the domain
but can't get the DC you get 0 points for the set. The standalone machines offer 10 points for unprivileged access and 10 points for administrative access. There are also 10 bonus points that you can get
by rooting 30 of the 57 lab machines for the course and completing 80% of the exercises for every section in the course.

There is also a report component to the exam which doesn't give points but can damage your score if you don't do it correctly. I don't know anyone personally that this has happened to, but I have heard of
people failing the exam because of issues with their report. Offsec is known for being strict with their grading of the report.

# Background
My background is in programming and I have a BS in Computer Science. I've spent the last 5 years or so working in various programming positions in the industry. I also completed the PEN-100 course before it was converted
into a learning path. The OSCP is the first pentesting certification that I've completed.

# Preparation
Here is a summary of what I did to prepare for the exam:
- 100% of the exercises for the course material
- 30 of the 57 lab machines
- all of the [Bandit](https://overthewire.org/wargames/bandit/) machines on OverTheWire

I purchased the LearnOne subscription which gave me a years access to the course material and lab. I began my preparation in January 2023. I worked full time throughout this process so I took a pretty leisurely pace, 
especially at the start, completing roughly 1 unit per week. I also took breaks to do additional reading and work on the OverTheWire machines. After I finished the course work, I had about two weeks until my exam which
I used to complete 30 of the lab machines. At the time of writing, the lab machines consist of:
- Medtech
- Relia
- Skylark
- OSCP A
- OSCP B
- OSCP C

I fully completed Medtech and Relia, completed 5 machines on OSCP A, and 2 machines on OSCP B. Overall, I found my work on Medtech and Relia to be the most helpful in preparing for the exam, even though the OSCP machines
are retired exam machines and are therefore very similar to what you will find on the real exam. If you are taking the exam and are going for the bonus points, keep in mind that only root level access counts toward the 
30 machine requirement and the AD sets on the OSCP A/B/C machines only count as a single machine.

# Exam
I scheduled my Exam for 2pm on a Saturday. My normal waking hours are about 8am to midnight, so this seemed optimal to me because it would allow me to work for 10 hours, sleep, and then have another 7 hours or so to
finish the exam. My strategy was to attack the AD set first since completing this would give me 50 points total (with the bonus points). Then I would only need to root one of the standalone machines, or get local access on two, to pass.

When the exam started, I immediately attacked the AD set and was able to root the first machine within two hours. From here, I got stuck for several hours and was ultimately unable to pivot. I decided to take a break from the AD
set and work on the standalones for a while. I was able to get local access but then was unable to escalate my privileges. After several hours of trying, I decided to attack the next standalone machine. On the next machine, I was
able to get root access. By this time, it was around midnight and I decided to break for the night with a total of 40 points earned so far. I thought about it that night and decided that my best bet was to try the AD set again.

The next morning, I woke up at 7am and began to work again. I had a breakthrough and was able to root the domain controller by 9am. From here, I took a break for an hour or so before returning. I took a look at the last machine and
saw a promising potential foothold, but I decided to start on my report rather than attack the final machine. I knew that I had more than enough points (80) to pass and decided that it was more imporant to have a perfect report than to
have an extra machine done.

# Closing thoughts
I probably could have been ready to take this exam faster if I had been more diligent at the start of my studying. Neverless, I'm not sure if I could have passed on the first try if I did the 90 day subscription 
(at least not without a fair amount of burnout). If you work full time, I would recommend the LearnOne subscription over the 90 day unless you already have a background in pentesting and are confident that you can
move through the material quickly, or you are not currently working full time. 

## Advice for the exam
Take breaks or move to a different machine if you get really stuck during the exam, especially if you start to get frustrated. I spent more 
time stuck on certain machines than I should have. Expect the unexpected - there were things on the exam that I learned about in the course material but hadn't faced before. Try things from the course material first, 
but if nothing is working then be prepared to improvise. Be sure to leave ample time at the end of the exam to document your findings. I didn't write the report during the exam time, but it took me several hours to
gather all of my screenshots and arrange them into a narrative that would work for the report.
