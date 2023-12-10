import http from "k6/http"
import { check, sleep } from "k6"

export let options = {
    vus: 2, // Number of virtual users
    iterations: 2, // Number of iterations per virtual user
}

export default function deleteBlogs() {
    // Calculate the range of IDs each VU will handle
    const vu1Start = 1
    const vu1End = 100
    const vu2Start = 101
    const vu2End = 200

    // Determine which VU is executing
    const isVU1 = __VU === 1

    // Calculate the range for the current VU
    const start = isVU1 ? vu1Start : vu2Start
    const end = isVU1 ? vu1End : vu2End

    // Iterate through the range of IDs
    for (let i = start; i <= end; i++) {
        let url = `http://localhost:3000/blog/delete/${i}`

        // Make a DELETE request for each blog ID
        let response = http.del(url)

        console.log(
            `VU ${__VU} - Deleted blog with ID ${i}. Response:`,
            response.body
        )

        // Check if the response status is 200 OK
        check(response, {
            [`VU ${__VU} - Status is 200 for blog with ID ${i}`]: (r) =>
                r.status === 200,
        })

        // Sleep for 1 second before the next iteration
        sleep(1)
    }
}
