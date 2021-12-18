import axios from "axios"

export default function(config) {
    let config_defaults = {
        baseURL: 'http://localhost:8000' ,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    }

    return axios({
        ...config_defaults, ...config,
        headers: {
            ...config_defaults.headers,
            ...config.headers
        }
    })
}
