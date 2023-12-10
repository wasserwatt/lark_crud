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
            exec: "postIdGen",
            vus: 1,
            startTime: "31s",
            duration: "5m",
        },
    },
}

export function createBlog() {
    // Generate a random blog object for testing
    let blog = {
        postId: 0,
        postTitle: "testTitle",
        postDetail: "testDetail",
        postDtm: "2023-12-02",
        postAuthor: "tester",
        postStatus: 1,
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

export function postIdGen() {
    // Loop through postIds from 1 to 800 and call deleteBlog function
    for (let postId = 1; postId <= 800; postId++) {
        deleteBlog(postId)
    }
}
// 1 vu 5m can delet 323 records
export function deleteBlog(postId) {
    let response = http.del(`http://localhost:3000/blog/delete/${postId}`)

    console.log(`Response for postId ${postId}:`, response.body)

    // Check if the response status is 200 OK
    check(response, {
        [`Status is 200 for postId ${postId}`]: (r) => r.status === 200,
    })

    // Sleep for 1 second before the next iteration
    sleep(1)
}
