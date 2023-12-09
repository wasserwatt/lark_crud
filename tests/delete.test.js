import http from "k6/http"
import { sleep, check } from "k6"

export let options = {
    vus: 1, // Number of virtual users
    duration: "5s", // Duration of the test
}

export default function () {
    // Replace the URL with your actual API endpoint and blog ID
    let response = http.del("http://localhost:3000/blog/delete/1")

    // Check if the response status is 200 or 204 (assuming successful deletion)
    check(response, {
        "Status is 200 or 204": (r) => r.status === 200 || r.status === 204,
    })

    // Sleep for 1 second before the next iteration
    sleep(1)
}
