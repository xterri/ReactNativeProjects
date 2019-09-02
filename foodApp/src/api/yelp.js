// create different files in this API directory
// each importing axios and create instance of axios and preconfig with specific api

import axios from 'axios';

// use axios directly to make a network request
// can also make an instance with preset options assigned
export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses', // root URL making request to <function>; no '/' end at word
    // authorize ourselves to use Yelp API with request header  
    headers: {
        Authorization: 'Bearer DE3oM-9z8w2M2u9K7OTdd1NkGCB62-Xzp77j3T_yF3Pa7FMa_ZkhfdsahkmgNE8SAE38OLBDnPDEJ0Q3a8WlC9FHRnjbLxyNnARvhyNaP7ABrWgdUdbDOOO9FYtRXXYx'
    }
});

// yelp.get('/search') // pre-configured baseURL will be added on

// import this file to any component that needs Yelp API to access the api without having to redesignate the baseURL and Authorization