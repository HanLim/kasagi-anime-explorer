import axios from 'axios';

export default class BaseAPI {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async get(endpoint, params = {}) {
        return this.api.get(endpoint, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('API GET Error:', error);
                throw error;
            });
    }

    async post(endpoint, data) {
        return this.api.post(endpoint, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('API POST Error:', error);
                throw error;
            });
    }
}