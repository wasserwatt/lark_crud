// blogUtils.js
const Blog = require("../util/db.config").blog

async function checkRequiredFields(blog) {
    if (!blog || !blog.postId) {
        throw new Error("PostId is required to process.")
    }
}

async function checkIfBlogExistsByPostId(postId) {
    const existingBlog = await Blog.findOne({ where: { postId } })
    if (existingBlog) {
        throw new Error("Blog with the same postId already exists.")
    }
}

async function checkIfBlogExistsByPostIdForUpdateBlog(postId, postNewId) {
    const existingBlog = await Blog.findOne({ where: { postId } })
    if (postNewId == postId) {
        //this should pass and do nothing else
        return
    }
    // two cases
    // 1. change data into the new available postId
    // 2. change data into the unavialabele postId (it exists)
    // 1. Change data into the new available postId
    const newAvailableBlog = await Blog.findOne({
        where: { postId: postNewId },
    })
    if (!newAvailableBlog) {
        // If the new postId does not exist, you can proceed with the update logic.
        // ... your logic to update the data ...
        return
    }
    // this is the 2nd case
    if (existingBlog && postId != postNewId) {
        throw new Error("Blog with the same postId already exists.")
    }
}

module.exports = {
    checkRequiredFields,
    checkIfBlogExistsByPostId,
    checkIfBlogExistsByPostIdForUpdateBlog,
}
