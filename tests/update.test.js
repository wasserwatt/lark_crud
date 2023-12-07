import http from "k6/http"
import { check, sleep } from "k6"

export default function () {
    // Define the base URL for your API
    const baseUrl = "http://localhost:3000"

    // Generate a random postId in the range of 1-4400 for testing
    const postId = Math.floor(Math.random() * 870) + 1
    console.log("postId::==", postId)
    // Define the payload for the update request
    const payload = {
        postId: 8000,
        postTitle: "อัพเดทแล้ว",
        postDetail: "อัพเดทแล้ว",
        postDtm: "3000-11-22",
        postAuthor: "tester",
        postStatus: 1,
    }

    // Send the update request
    const updateResponse = http.put(
        `http://localhost:3000/blog/update/8000`,
        JSON.stringify(payload),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )

    // Check if the update was successful (status code 200)
    check(updateResponse, {
        "Update successful": (resp) => resp.status === 200,
    })

    // Add a sleep to simulate user think time
    sleep(1)
}
