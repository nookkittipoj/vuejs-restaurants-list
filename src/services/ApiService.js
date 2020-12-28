import axios from 'axios';

const http = new axios.create({
    baseURL: process.env.VUE_APP_BASE_URI
})

const httpMethod = {
    get(url, options = {}) {
        return http
            .get(url, {
                ...options,
                headers: {
                    ...options.headers
                },
            })
            .then(res => res.data)
            .catch(err => {
                return Promise.reject(err.response.data)
            })
    },
    post(url, data = {}, options = {}) {
        return http
            .post(url, data, {
                ...options,
                headers: {
                    ...options.headers
                },
            })
            .then(res => res.data)
            .catch(err => {
                return Promise.reject(err.response.data)
            })
    },
}

export default httpMethod
