// import lib
/*
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
*/
// ... (existing imports)

const express = require("express")
const axios = require("axios")
const db = require("../util/db.config")
const {
    checkRequiredFields,
    checkIfBlogExistsByPostId,
} = require("./blogUtils")

const sequelize = db.sequelize
const Blog = db.blog
const route = express.Router()

// ... (existing routes)

// Watch for changes in the audit table
route.post("/webhook", async (req, res, next) => {
    try {
        // DELIMITER //

        // CREATE PROCEDURE UpdateAndCallAPI()
        // BEGIN
        //     -- Your database update logic here

        //     -- Call API using a suitable method (e.g., using a UDF that interacts with an external system)
        // END //

        // DELIMITER ;

        //         DELIMITER //

        // CREATE TRIGGER contacts_after_insert
        // AFTER INSERT
        // ON contacts FOR EACH ROW
        // BEGIN
        //     CALL UpdateAndCallAPI();
        // END;

        // //

        // DELIMITER ;

        console.log("Webhook request successful:", req.body)

        res.status(200).json({ success: true })
    } catch (error) {
        console.error("Error sending webhook request:", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

module.exports = route
