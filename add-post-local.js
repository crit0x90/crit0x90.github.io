const fs = require('fs');
const path = require('path');
const readline = require('readline');

const jsFilePath = path.join(__dirname, 'assets', 'js', 'custom.js');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Function to escape special characters in strings
function escapeString(str) {
  return str.replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

async function addNewPost() {
  console.log('\n=== Add New Blog Post ===\n');
  
  // Prompt for post details
  const title = await prompt('Enter post title: ');
  const date = await prompt('Enter post date (YYYY-MM-DD): ');
  const description = await prompt('Enter post description: ');
  const url = await prompt('Enter post URL (e.g., blog/post-name.html): ');
  
  // Read the custom.js file
  try {
    let jsContent = fs.readFileSync(jsFilePath, 'utf8');
    
    // Find the posts array
    const postsArrayStart = jsContent.indexOf('const posts = [');
    const postsArrayEnd = jsContent.indexOf('];', postsArrayStart);
    
    if (postsArrayStart === -1 || postsArrayEnd === -1) {
      throw new Error('Could not find the posts array in custom.js');
    }
    
    // Extract the current posts array
    const postsArrayContent = jsContent.substring(postsArrayStart + 14, postsArrayEnd).trim();
    
    // Create a valid JS array for parsing
    const postsArrayString = '[' + postsArrayContent + ']';
    
    // Parse the array (removing trailing commas if present)
    const cleanedArrayString = postsArrayString.replace(/,\s*]/g, ']');
    let posts;
    try {
      posts = JSON.parse(cleanedArrayString);
    } catch (parseError) {
      console.error('Error parsing posts array:', parseError.message);
      console.log('Trying alternate method...');
      
      // Fallback to manual insertion
      const newPostEntry = `        {
            "title": "${escapeString(title)}",
            "date": "${date}",
            "description": "${escapeString(description)}",
            "url": "${url}"
        },`;
      
      // Insert at the beginning of the array
      const newContent = jsContent.substring(0, postsArrayStart + 14) + 
                        '\n' + newPostEntry + 
                        (postsArrayContent ? '\n' + postsArrayContent : '') + 
                        jsContent.substring(postsArrayEnd);
      
      fs.writeFileSync(jsFilePath, newContent, 'utf8');
      console.log('\nPost added successfully!');
      rl.close();
      return;
    }
    
    // Add the new post
    posts.push({
      title: title,
      date: date,
      description: description,
      url: url
    });
    
    // Sort the posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Format the posts array as a string
    let newPostsContent = '';
    posts.forEach((post, index) => {
      newPostsContent += `        {
            "title": "${escapeString(post.title)}",
            "date": "${post.date}",
            "description": "${escapeString(post.description)}",
            "url": "${post.url}"
        }${index < posts.length - 1 ? ',' : ''}`;
      
      if (index < posts.length - 1) {
        newPostsContent += '\n';
      }
    });
    
    // Rebuild the JavaScript file
    const newContent = jsContent.substring(0, postsArrayStart + 14) + 
                      '\n' + newPostsContent + '\n    ' + 
                      jsContent.substring(postsArrayEnd);
    
    fs.writeFileSync(jsFilePath, newContent, 'utf8');
    
    console.log('\nPost added successfully!');
    console.log('\nCurrent posts:');
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.date})`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  rl.close();
}

addNewPost();
