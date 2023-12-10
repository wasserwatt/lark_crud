import http from "k6/http"
import { sleep, check } from "k6"

// for 1 VU

export let options = {
    vus: 1, // Number of virtual users
    // Duration of the test
}

export default function () {
    // Replace the URL with your actual API endpoint and blog ID
    let response = http.del("http://localhost:3000/blog/delete/13")

    console.log("Response:", response.body)

    // Check if the response status is 200 OK
    check(response, {
        "Status is 200": (r) => r.status === 200,
    })
    // Sleep for 1 second before the next iteration
    sleep(1)
}

/*
// for multiple VU
export let options = {
    vus: 5, // Number of virtual users
    duration: "30s", // Duration of the test
}

export default function () {
    // Generate a unique postId for each virtual user
    const postId = Math.floor(Math.random() * 200) + 1 // Adjust the range as needed

    // Replace the URL with your actual API endpoint and use the generated postId
    let response = http.del(`http://localhost:3000/delete/${postId}`)
    console.log("Response:", response.body)
    // Check if the response status is 200 OK
    check(response, {
        "Status is 200": (r) => r.status === 200,
    })

    // Sleep for 1 second before the next iteration
    sleep(1)
}
*/
