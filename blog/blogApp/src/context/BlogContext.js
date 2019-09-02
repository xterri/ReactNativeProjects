import createDataContext from './createDataContext'; // use when we want to add new types of resource in our app
import jsonServer from '../api/jsonServer';

// define reducer
const blogReducer = (state, action) => {
    switch (action.type) {
        // case 'add_blogpost':
        //     return [...state, { 
        //         title: action.payload.title,
        //         content: action.payload.content,
        //     }];
        case 'delete_blogpost':
            // filter() iterates through all elem inside state array & run child function
            return state.filter((blogPost) => blogPost.id !== action.payload); // if true, elem returned in overall new array; else, rejected
            // blogPost = result from filter, run check before returning/adding new elem into state array
            // blogPost.id !== action.payload
                // if it doesn't match, add back to state array, else skip from adding it in
        case 'edit_blogpost':
            return state.map((blogPost) => { // map through all the blogPosts and find the one that matches id
                return blogPost.id === action.payload.id ? action.payload : blogPost;
                /* 
                    if (blogPost.id === action.payload.id) {
                        return action.payload; // find id match, return the edited version in action.payload 
                    } else {
                        return blogPost; // else return the current one
                    }
                */
            });
        case 'get_blogposts':
            return action.payload; // return the state value (ex. the data saved from db)
            // response back from api = assumed is total source of data/info, don't need to add to existing state, only replace
        default:
            return state;
    }
};

// define action functions to be called with dispatch 
const addBlogPost = (dispatch) => {
    return (async (title, content, callback) => {
        // json servers auto assigns ids for us
        await jsonServer.post('/blogposts', { title, content }); // arg2 = info to write to json server
        // dispatch({ type: 'add_blogpost', payload: {title, content} }); // <= no longer needed b/c IndexScreen will refresh to get updates
        callback ? callback() : null; // after dispatch, run callback
    });

    // example code if using an API for error check; if there is an error with the results, it won't run dispatch or callback
    /*
        return (
            async (title, content, callback) => {
                try {
                    await axios.post('example post', title, content);
                    dispatch({ type: 'add_blogpost', payload: {title, content}});
                    callback();
                }, catch (err) {
                    console.log(err);
                }
            }
        )
    */
};
// returns a function that will dispatch an action & attempt to modify the state

const deleteBlogPost = (dispatch) => {
    return (async (id) => { // pass/receive id/params/arg in the return function
        await jsonServer.delete(`/blogposts/${id}`);

        dispatch({ type: 'delete_blogpost', payload: id }); // keep to update on spot; opt2 add callback to refresh page
    });
};

const editBlogPost = (dispatch) => {
    return (async (id, title, content, callback) => {
        // put req when we want to update record with given ID
        await jsonServer.put(`/blogposts/${id}`, { title, content }); // arg2 = object of updated title & content

        dispatch({ type: 'edit_blogpost', payload: { id, title, content }}); // leave in so when we go back we see updates
        callback ? callback() : null;
    });
};

const getBlogPosts = (dispatch) => {
    // making a network request so should use async/await function
    return (async () => {
        const response = await jsonServer.get('/blogposts'); // '/blogposts' b/c that's what we named it in the db.json file

        // response.data === [{}, {}, {}]
        dispatch({ type: 'get_blogposts', payload: response.data }); // pass response to reducer to capture/save data and return to screen
        // dispatch() = auto runs the reducer
    });
}

// pass in reducer, object w/ actions, & initial/default state
export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts }, 
    []);

// return Context and Provider = react component that makes all our data available to something else in the app