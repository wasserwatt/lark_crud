import http from "k6/http"
import { check, sleep } from "k6"

export let options = {
    vus: 30,
    duration: "5m",
}

export default function () {
    // Generate a random blog object for testing
    let blog = {
        // Add your blog properties here
        postId: 0,
        postTitle: "testTitle",
        postDetail: "testDetail",
        postDtm: "2023-12-02",
        postAuthor: "tester",
        postStatus: 1,
        // Add other required properties
    }

    // Send a POST request to create a new blog
    let createResponse = http.post(
        "http://localhost:3000/blog/create",
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
    let getAllResponse = http.get("http://localhost:3000/blog/find/all")

    // Check if the GET request was successful (status code 200)
    check(getAllResponse, {
        "Get All Blogs Status is 200": (res) => res.status === 200,
    })

    // Sleep for a short duration before the end of the iteration
    sleep(1)
}
