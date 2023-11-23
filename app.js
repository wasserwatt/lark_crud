// import express & define port = 3000
const express = require("express")
const app = express()
const port = 3000
// set use body json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// add route
const blogRoute = require("./routes/blog")
app.use("/blog", blogRoute)
// set port & run server
app.listen(port, () => console.log(`App listening on port ${port}!`))
