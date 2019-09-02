import React, { useContext } from 'react'; // need useState to control TextInput, use as local state
import { StyleSheet } from 'react-native';

import { Context } from '../context/BlogContext';

import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({ navigation }) => {
    const { addBlogPost } = useContext(Context); 

    return (
        <BlogPostForm
            // onSubmit make sure it passes the new title and content
            onSubmit={(title, content) => {
                addBlogPost(title, content, () => { navigation.navigate('Index') }) // title & content from callback function
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default CreateScreen;