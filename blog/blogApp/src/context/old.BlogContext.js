import React, { useState } from 'react';

const BlogContext = React.createContext(); // 'pipe' to child components

// creating component that can accept another component as arg, shown in 'BlogProvider
export const BlogProvider = ({ children }) => { // named export
    // const blogPosts = [
    //     { title: 'Blog 1' },
    //     { title: 'Blog 2' },
    //     { title: 'Blog 3' },
    // ];
    const [blogPosts, setBlogPosts] = useState([]); 

    // use the setter (setBlogPosts) to add new post to blogPosts variable
    const addBlogPost = () => { // whenever called, updates state variables and rerenders this component and everything else as well
        // creates a new array from scratch, not changing blogPosts value; appending?
        setBlogPosts([
            ...blogPosts, 
            { title: `Blog #${blogPosts.length + 1}` }
        ]); // ...blogPosts = add current blogPosts into new array; param2 = newVal to be added to array
    };

    return (
        // BlogContext.Provider = provides value prop into BlogContext
        // can't render text object with react, can enter in string, int, array a value for now
        <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>{/* pass 'value' from provider to nested children */}
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContext; 