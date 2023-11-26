// import lib
const express = require("express")
const axios = require("axios")

async function sendToWebhook(link) {
    await axios.post("http://localhost:3000/webhook", newBlog, {
        headers: {
            "Content-Type": "application/json",
        },
    })
}

module.exports = {
    sendToWebhook,
}
