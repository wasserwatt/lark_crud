import http from "k6/http"
import { check, sleep } from "k6"

export const options = {
    discardResponseBodies: true,
    scenarios: {
        userCreateBlog: {
            executor: "constant-vus",
            exec: "createBlog",
            vus: 30,
            duration: "30s",
        },
        userUpdateBlog: {
            executor: "constant-vus",
            exec: "updateBlog",
            vus: 1,
            startTime: "31s",
            duration: "30s",
        },
    },
}

export function createBlog() {
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
}

export function updateBlog() {}
