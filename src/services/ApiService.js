import axios from 'axios';
import {baseUri} from "@/utils/constants";

const http = new axios.create({
    baseURL: baseUri
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
