// import lib
const express = require("express")
const axios = require("axios")
const route = express.Router()

// webhook api
route.post("/webhook", async (req, res, next) => {
    try {
        console.log("body::==", req.body)
        console.log("params::==", req.params)

        console.log("Webhook recieved req")
    } catch (error) {
        console.error("Error sending webhook request:", error.message)
    }
})
