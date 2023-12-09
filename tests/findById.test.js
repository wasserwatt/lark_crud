import http from "k6/http"
import { check, sleep } from "k6"

export default function () {
    // Define the base URL of your Express.js server
    const baseUrl = "http://localhost:3000"

    // Define the endpoint for finding a blog by ID
    const endpoint = "/find/id/1" // Replace '1' with the desired blog ID

    // Define the expected response status code
    const expectedStatusCode = 200

    // Make the HTTP request to find a blog by ID
    const res = http.get(`${baseUrl}${endpoint}`)

    // Check if the response status code matches the expected status code
    check(res, {
        "Status is 200": (r) => r.status === expectedStatusCode,
    })

    // Optional: Add additional checks based on your application's response
    // For example, you can check if the response body contains specific content

    // Sleep for a short duration between requests (adjust as needed)
    // This helps simulate realistic user behavior
    // k6 doesn't currently support real-time waiting for asynchronous operations,
    // so this sleep is a workaround
    // https://github.com/loadimpact/k6/issues/1046
    const sleepDuration = 1
    sleep(sleepDuration)
}
