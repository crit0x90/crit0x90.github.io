// Custom JavaScript for crit0x90.github.io

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Terminal typing effect for headers (optional)
    const typingHeaders = document.querySelectorAll('.typing-effect');
    
    typingHeaders.forEach(header => {
        const text = header.textContent;
        header.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                header.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        typeWriter();
    });
    
    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the current path includes the link path
        // This handles both exact matches and subdirectory matches
        if (currentLocation === linkPath || 
            (linkPath !== 'index.html' && currentLocation.includes(linkPath))) {
            link.classList.add('active');
        }
    });
    
    // Initialize code highlighting if available
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }
    
    // Function to add target="_blank" to external links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('http')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Add scroll to top button functionality (if present)
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        };
        
        scrollTopBtn.addEventListener('click', function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
    }
    
    // Automatically load blog posts on index page
    const blogPostsContainer = document.getElementById('blog-posts-container');
    if (blogPostsContainer) {
        loadBlogPosts();
    }
});

// Function to load blog posts from JSON file
function loadBlogPosts() {
    // Hardcoded blog posts data (to avoid CORS issues when viewing locally)
    const posts = [
        {
            title: "Passing the hash through RDP",
            summary: "Learn how to perform a pass-the-hash attack through RDP.",
            date: "2023-08-29",
            url: "blog/passing-the-hash-rdp.html",
            dateDisplay: "August 29, 2023"
        },
        {
            title: "BSidesSF 2025 Review",
            summary: "Where I talk through what I learned at BSidesSF 2025.",
            date: "2025-04-30",
            url: "blog/BSidesSF-2025.html",
            dateDisplay: "April 30, 2025"
        },
            {
            title: "LLM Hacking",
            summary: "Where I talk through what I've learned from hacking LLMs.",
            date: "2025-07-19",
            url: "blog/LLM-Hacking.html",
            dateDisplay: "July 19, 2025"
        }
    ];
    
    const blogPostsContainer = document.getElementById('blog-posts-container');
    
    // Clear the container
    blogPostsContainer.innerHTML = '';
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create HTML for each post
    posts.forEach(post => {
        const postDate = new Date(post.date);
        const formattedDate = postDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const postHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h2 class="card-title">${post.title}</h2>
                    <p class="card-text">${post.summary}</p>
                    <div class="card-text mb-3">Posted on ${formattedDate}</div>
                    <a href="${post.url}" class="btn btn-primary">Read More &rarr;</a>
                </div>
            </div>
        `;
        
        blogPostsContainer.innerHTML += postHTML;
    });
}
