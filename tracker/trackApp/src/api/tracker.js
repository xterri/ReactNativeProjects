import axios from 'axios';
import { AsyncStorage } from 'react-native'; // will be deprecated 

// assign to variable to add on extra code 
const instance = axios.create({
    baseURL: 'http://ac13f085.ngrok.io' // remember to change URL every 8 hrs with ngrok
});

// automatically authenicates users; checks if user has a token and auto adds it to our req
instance.interceptors.request.use(
    // called automatically when about to make a request
    async (config) => { // config obj = has info about req. we're about to make (ex. URL making req to, method of req, any headers attached to req)
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    // auto called when there is an error with making the request
    (err) => {
        return Promise.reject(err); // take err and return a new promise that is rejected and reject w/ the err
    }
);

export default instance;
