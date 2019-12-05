import axios from 'axios';
//import { resolve } from './resolve.js';

export class API {

    constructor({ url }) {
        if (url == null) {
            url = "http://fa19-cs411-005.cs.illinois.edu:3000/";
        }
        this.url = url
        this.endpoints = {}
    }


    // async login(user, pass) {
    //     return await resolve(axios.post('http://some-api.com/auth', { user, pass }).then(res => res.data));
    // }

    // async getUser(id) {
    //     return await resolve(axios.get(`http://some-api.com/users/${id}`).then(res => res.data));
    // }


    async getPriceHistory(tickerId, duration, interval) {
        //return await resolve(axios.get(this.url + `${duration}?symbol=${tickerId}&interval=${interval}`).then(res => res.data));
        return axios.get(this.url + `${duration}?symbol=${tickerId}&interval=${interval}`)
            .then((response) => 
                response.data);
    }

    // async getFavoriteList(userId) {
    //     return await resolve(axios.get(`http://some-api.com/favoritelist/${userId}`).then(res => res.data));
    // }

    // async getPriceScoreDiff(date, time) {
    //     return await resolve(axios.get(`http://some-api.com/ticker/date=${date}&time=${time}`).then(res => res.data));
    // }
}

export default API;