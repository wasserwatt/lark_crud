import http from "k6/http"

export const options = {
    discardResponseBodies: true,
    scenarios: {
        userCreateBlog: {
            executor: "constant-vus",
            exec: "createBlog",
            vus: 50,
            duration: "30s",
        },
        news: {
            executor: "per-vu-iterations",
            exec: "news",
            vus: 50,
            iterations: 100,
            startTime: "30s",
            maxDuration: "1m",
        },
    },
}

export function crateBlog() {
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

export function updateBlog() {
    // Define the base URL for your API
    const baseUrl = "http://localhost:3000"

    // Generate a random postId in the range of 1-4400 for testing
    const postId = Math.floor(Math.random() * 4400) + 1

    // Define the payload for the update request
    const payload = {
        postTitle: "Updated",
        postDetail: "Updated",
        postDtm: "2023-12-07",
        postAuthor: "tester",
        postStatus: 1,
    }

    // Send the update request
    const updateResponse = http.put(
        `${baseUrl}/update/${postId}`,
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
export function contacts() {
    http.get("https://test.k6.io/contacts.php", {
        tags: { my_custom_tag: "contacts" },
    })
}

export function news() {
    http.get("https://test.k6.io/news.php", { tags: { my_custom_tag: "news" } })
}
