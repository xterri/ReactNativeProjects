import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { Context } from '../context/BlogContext';

import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation }) => {    
    const id = navigation.getParam('id');
    const { state, editBlogPost } = useContext(Context); 

    const blogPost = state.find((blogPost) => blogPost.id === id)

    return (
        <BlogPostForm
            initialValues={{ title: blogPost.title, content: blogPost.content }}
            onSubmit={(title, content) => { // onSubmit receives the new title and content
                editBlogPost(id, title, content, () => { navigation.pop() })
                // navigation.pop() = goes back to previous screen
                // navigation.navigate('ScreenName') = goes to whichever screen you want it to go to
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default EditScreen;