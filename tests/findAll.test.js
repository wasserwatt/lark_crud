import http from "k6/http"
import { sleep, check } from "k6"

export let options = {
    vus: 5, // Number of virtual users
    duration: "30s", // Duration of the test
}

export default function () {
    // Replace the URL with your actual API endpoint
    let response = http.get("http://localhost:3000/blog/find/all")

    // Check if the response status is 200 OK
    check(response, {
        "Status is 200": (r) => r.status === 200,
    })

    // Sleep for 1 second before the next iteration
    sleep(1)
}
