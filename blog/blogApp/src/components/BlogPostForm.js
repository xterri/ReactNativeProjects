import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const BlogPostForm = ({ initialValues, onSubmit }) => {    
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput 
                value={title}
                onChangeText={(newTitle) => setTitle(newTitle)}
                style={styles.input}
            />
            <Text style={styles.label}>Content</Text>
            <TextInput 
                value={content}
                onChangeText={(newContent) => setContent(newContent)}
                style={styles.input}
            />
            <Button 
                title='Save Post' 
                onPress={() => onSubmit(title, content)}
            />
        </View>
    );
};

// gives the component some default property values, use to fill in default valuse
BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        backgroundColor: '#eee',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 5,
        margin: 5,
    },
    label: {
        fontSize: 20, 
        marginBottom: 5,
        marginLeft: 5,
    }
});

export default BlogPostForm;