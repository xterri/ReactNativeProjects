// hook = adds in some additional functionality to a component; business logic side
// name file as what this hook is going to help us with (ex. how to use the results from api call)

import { useEffect, useState } from 'react';
import yelp from  '../api/yelp';

// immediately export the function inside this function
export default () => {
    const [results, setResults] = useState([]); // empty array b/c result should be a large object
    const [errorMsg, setErrorMsg] = useState(''); 

    // any API/network requests = async operation; must add a Promise to handle search results returned 
    // make the searchApi an async function OR chain with '.then' statement
        // simpler to make it an async function, and use the 'await' to get results
    const searchApi = async (searchTerm) => {
        // error handling with try-catch statement
        try {
            const response = await yelp.get('/search', { 
                params: { // params property as arg2 in axios call, any key-val pair = auto appended to req URL
                    limit: 50, // will search <baseURL>/search?limit=50
                    term: searchTerm, // term: term = same key-val, can just call 'term'
                    location: 'san jose'
                }
            }); // access yelp api, GET type HTTP request, accessing '/search' route
                // wait for response to come back and resolved with actual data
                // response variable = .data property on it; the JSON data from the API call 
            setResults(response.data.businesses); // setting results with this array of objects
        } catch (err) {
            // if above fails, catch will get the error; display the error to the users
            // console.log(err);
            setErrorMsg('Something went wrong. Please try again later')
        }
    };

    // BAD CODE: call searchAPI when component is first rendered
        // searchApi('pasta'); // looping the search many times in a row, b/c re-rendering

    // useEffect(arg1 {}, arg2 []) === arg1 = run x # of times; arg2 = configure how often to run the arg1 function
        // only arg1 function = runs every time component is rendered
        // arg1 function + arg2 empty array = runs only when component is first rendered
        // arg1 function + arg2 array w/ value = runs only when component is first rendered & when 'value' changes
    useEffect(() => {
        searchApi('pasta');
    }, []); // leaves a default search when first rendered

    // note the functions and variables needed/used in SearchScreen JSX block & return in the hook
    return [searchApi, results, errorMsg];
}