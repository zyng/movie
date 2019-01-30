export const get = url => {
    return new Promise(
        (resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(json => resolve(json))
        }
    )
}

const apiAction = (url, method, body, resolve, reject) => {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": 'application/json; charset=utf-8'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(json => resolve(json))
            } else {
                reject(response)
            }
        })
}

export const post = (url, body) => {
    return new Promise(
        (resolve, reject) => apiAction(url, "POST", body, resolve, reject)
    )
}

export const put = (url, body) => {
    return new Promise(
        (resolve, reject) => apiAction(url, "PUT", body, resolve, reject)
    )
}

export const destroy = (url) => {
    return new Promise(
        (resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json; charset=utf-8'
                }
            }).then(response => {
                if (response.ok) {
                    resolve(response)
                } else {
                    reject(response)
                }
            })
        }
    )
}