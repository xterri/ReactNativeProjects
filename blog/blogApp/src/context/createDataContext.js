// Udemy - Complete ReactNative + Hooks Course (Lesson 127 - Automating Context Creation)
//reusable function to automate setup process of context items
// use when we need to add in a new resource (ex. images, comments, etc); i.e. new section for resources
// make new Context steps
    // 1. make reducer
    // 2. make action functions that use dispatch() for updates
    // 3. pass to createDataContext to make context obj that provider can use
    // 4. use <Provider> to wrap {children} components
    // 5. in child components, call context with useContext() for information/resources

// exporting plan functions for js file, name file with lowercase on first word
import React, { useReducer } from 'react';

export default (reducer, actions, initalState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initalState);

        // actions === { addBlogPost: (dispatch) => { return() => {} }}
            // loop through action obj, for every key (ex. addBlogPost) take the function can call it with dispatch,
            // which will return the function from addBlogPost, which is passed to the value prop in <Context.Provider>
        const boundActions = {}; // actions are processed & bound to dispatch

        // iterate through object
        for (let key in actions) {
            // key === 'addBlogPost'
            boundActions[key] = actions[key](dispatch); 
            // boundActions.addBlogPost  = actions (refers to addBlogPost function, (dispatch) => { return () => {} })
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider };
};