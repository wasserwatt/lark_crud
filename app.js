// import express & define port = 3000
const express = require("express")
const app = express()
const port = 3000

// set use body json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// add route
// route blog
const blogRoute = require("./routes/blog")
app.use("/blog", blogRoute)
// route web hook
app.post("/webhook", (req, res) => {
    const receivedJson = req.body
    console.log("Webhook received JSON from API::==", receivedJson)
    // Handle the webhook request here

    //res.status(200).send(`Request successfull Received text: ${receivedJson}`)
    res.status(200).json(`/webhook response: ${receivedJson}`)
})
// set port & run server
app.listen(port, () => console.log(`App listening on port ${port}!`))
