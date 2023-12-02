import http from "k6/http"
import { check, sleep } from "k6"

export let options = {
    vus: 10,
    duration: "30s",
}

export default function () {
    // Generate a random blog object for testing
    let blog = {
        // Add your blog properties here
        title: "Test Blog",
        content: "This is a test blog post.",
        // Add other required properties
    }

    // Send a POST request to create a new blog
    let createResponse = http.post(
        "http://localhost:your_port_number/create",
        JSON.stringify(blog),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )

    // Check if the blog creation was successful (status code 200)
    check(createResponse, {
        "Create Blog Status is 200": (res) => res.status === 200,
    })

    // Sleep for a short duration before sending the next request
    sleep(1)

    // You can add additional tests for other API endpoints (e.g., updating, deleting)

    // Example: Send a GET request to retrieve all blogs
    let getAllResponse = http.get("http://localhost:your_port_number/find/all")

    // Check if the GET request was successful (status code 200)
    check(getAllResponse, {
        "Get All Blogs Status is 200": (res) => res.status === 200,
    })

    // Sleep for a short duration before the end of the iteration
    sleep(1)
}
