// Blog posts data
const blogPosts = [
    {
        title: "Welcome to my blog",
        summary: "First post on my new blog.",
        date: "2023-08-09",
        url: "welcome-post.html",
        dateDisplay: "August 9, 2023"
    },
    {
        title: "Passing the OSCP",
        summary: "A breakdown of my experience preparing for and passing the OSCP certification.",
        date: "2023-08-12",
        url: "passing-the-oscp.html",
        dateDisplay: "August 12, 2023"
    },
    {
        title: "Passing the hash through RDP",
        summary: "Learn how to perform a pass-the-hash attack through RDP.",
        date: "2023-08-29",
        url: "passing-the-hash-rdp.html",
        dateDisplay: "August 29, 2023"
    },
    {
        title: "BSidesSF 2025 Review",
        summary: "Where I talk through what I learned at BSidesSF 2025.",
        date: "2025-04-30",
        url: "BSidesSF-2025.html",
        dateDisplay: "April 30, 2025"
    },
        {
        title: "LLM Hacking",
        summary: "Where I talk through what I've learned from hacking LLMs.",
        date: "2025-07-19",
        url: "LLM-Hacking.html",
        dateDisplay: "July 19, 2025"
    },
    // Add new blog posts here
];

// Function to sort posts by date (newest first)
function sortPostsByDate(posts) {
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to create HTML for a blog post
function createPostHTML(post) {
    return `
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title">${post.title}</h2>
            <p class="card-text">${post.summary}</p>
            <div class="text-muted mb-3">Posted on ${post.dateDisplay}</div>
            <a href="${post.url}" class="btn btn-primary">Read More &rarr;</a>
        </div>
    </div>
    `;
}

// Function to load blog posts
function loadBlogPosts() {
    const postsContainer = document.getElementById('blog-posts');
    if (!postsContainer) return;
    
    // Clear any existing content
    postsContainer.innerHTML = '';
    
    // Sort posts by date (newest first)
    const sortedPosts = sortPostsByDate(blogPosts);
    
    // Create HTML for each post and add to container
    sortedPosts.forEach(post => {
        postsContainer.innerHTML += createPostHTML(post);
    });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadBlogPosts);
