// import lib
const express = require("express")
const axios = require("axios")
const db = require("../util/db.config")
const {
    checkRequiredFields,
    checkIfBlogExistsByPostId,
} = require("./blogUtils")
const { sendToWebhook } = require("./webhookUtils")
// define variable
const sequelize = db.sequelize
const Blog = db.blog
const route = express.Router()

// get blog with id
route.get("/find/id/:id", async (req, res, next) => {
    console.log("body::==", req.body)
    console.log("params::==", req.params)
    const blogId = req.params.id
    let blogs = {}
    if (blogId) {
        blogs = await Blog.findByPk(blogId)
    }
    // JSON object
    const jsonData = {
        operation: "find by id",
        id: blogId,
        status: "sucessful",
    }
    // CRUD API STABLE
    // Make a POST request to /webhook with the JSON data
    const response = await axios.post(
        "http://localhost:3000/webhook",
        jsonData,
        {
            headers: {
                "Content-Type": "application/json", // Set the content type to application/json
            },
        }
    )
    res.json(blogs)
})

// get blogs all
route.get("/find/all", async (req, res, next) => {
    try {
        console.log("body::==", req.body)
        console.log("params::==", req.params)

        const blogs = await Blog.findAll()
        res.json(blogs)

        // JSON object
        const jsonData = {
            operation: "find all",
            status: "sucessful",
        }
        // CRUD API STABLE
        // Make a POST request to /webhook with the JSON data
        const response = await axios.post(
            "http://localhost:3000/webhook",
            jsonData,
            {
                headers: {
                    "Content-Type": "application/json", // Set the content type to application/json
                },
            }
        )
        // Log the response data
        //console.log("Response from /webhook:", response) // Print like this will get [object Object]
        //console.log(response.data)
        //console.dir(JSON.stringify(response.data.operation))

        console.log("BLOG.JS request to /webhook successful")
    } catch (error) {
        console.error(
            "Error sending webhook request from BLOG.JS:",
            error.message
        )
    }
})

//create blog
route.post("/create", async (req, res, next) => {
    // console.log("body::==", req.body)
    // console.log("params::==", req.params)
    const blog = req.body
    try {
        // Check if required fields exist
        await checkRequiredFields(blog)

        // Check if the blog already exists
        await checkIfBlogExistsByPostId(blog.postId)

        let newBlog = null

        if (blog) {
            newBlog = await sequelize.transaction(function (t) {
                // chain all your queries here. make sure you return them.
                return Blog.create(blog, { transaction: t })
            })
            await axios.post("http://localhost:3000/webhook", newBlog, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }

        res.json(newBlog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//update blog
route.put("/update/:id", async (req, res, next) => {
    console.log("body::==", req.body)
    console.log("params::==", req.params)
    const blog = req.body
    const postId = req.params.id
    try {
        // Check if required fields exist
        await checkRequiredFields(blog)

        // Check if the blog already exists
        await checkIfBlogExistsByPostId(blog.postId)

        let updateBlog = null

        if (blog && postId) {
            updateBlog = await sequelize.transaction(function (t) {
                return Blog.update(
                    blog,
                    { where: { postId: postId } },
                    { transaction: t }
                )
            })
            await axios.post("http://localhost:3000/webhook", blog, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }

        res.json(updateBlog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//delete blog with id
route.delete("/delete/:id", async (req, res, next) => {
    console.log("body::==", req.body)
    console.log("params::==", req.params)
    const blogId = req.params.id
    let blogDestroy = null
    if (blogId) {
        const blog = await Blog.findByPk(blogId)
        if (blog) {
            blogDestroy = await blog.destroy()
        }
        await axios.post("http://localhost:3000/webhook", blog, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    res.json(blogDestroy)
})

module.exports = route
