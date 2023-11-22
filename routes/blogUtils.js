// blogUtils.js
const Blog = require("../util/db.config").blog

async function checkRequiredFields(blog) {
    if (!blog || !blog.postId) {
        throw new Error("PostId is required to create a blog.")
    }
}

async function checkIfBlogExistsByPostId(postId) {
    const existingBlog = await Blog.findOne({ where: { postId } })
    if (existingBlog) {
        throw new Error("Blog with the same postId already exists.")
    }
}

module.exports = {
    checkRequiredFields,
    checkIfBlogExistsByPostId,
}
