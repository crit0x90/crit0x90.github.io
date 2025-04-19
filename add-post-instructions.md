# Adding a New Blog Post

Since you're using GitHub Pages, follow these steps to add a new blog post to your website:

## Step 1: Create the Post HTML File
1. Make a copy of the `blog/post-template.html` file
2. Rename it to match your post title (e.g., `my-new-post.html`)
3. Edit the file, replacing:
   - `POST TITLE` (in the title tag and h1)
   - `MONTH DAY, YEAR` (with actual date)
   - The content section with your article
   - Update the "Tools Used" section

## Step 2: Add Post to the JavaScript File
1. Open `assets/js/custom.js`
2. Find the `posts` array (starts with `const posts = [`)
3. Add a new entry at the beginning of the array:
```javascript
{
    "title": "Your Post Title",
    "date": "YYYY-MM-DD",
    "description": "Brief description of your post.",
    "url": "blog/my-new-post.html"
},
```
4. Save the file

## Step 3: Update the Blog Index Page (Optional)
If you want your post to appear in the blog index page:
1. Open `blog/index.html`
2. Add your new post to the list of blog posts

## Step 4: Commit and Push to GitHub
1. Commit all your changes
2. Push to your GitHub repository
3. GitHub Pages will automatically update your site

Remember: The posts on the homepage are sorted by date automatically, so they will appear in the correct order as long as the dates in your JavaScript file are correct.
