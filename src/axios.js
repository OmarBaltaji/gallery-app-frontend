import Vue from 'vue';
import axios from 'axios';

const guest = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        "X-Requested-With": "XMLHttpRequest"
    }
});

Vue.prototype.$guest = guest;

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        "X-Requested-With": "XMLHttpRequest"
    }
});

api.interceptors.request.use((config) => {
    const token = document.cookie.split('access_token=')[1];
    if(token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
});

Vue.prototype.$api = api;

export { guest, api };