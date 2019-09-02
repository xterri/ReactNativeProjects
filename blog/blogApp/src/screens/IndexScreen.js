import React, { useContext, useEffect } from 'react'; // useContext = looks at context object and provides access to provider's value prop
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Context as BlogContext } from '../context/BlogContext'; // context = moving information
// { Context as BlogContext } = renames the var to avoid name confusion if 2+ files use Context

// to access information from provider, need 'provider' component & useContext
const IndexScreen = ({ navigation }) => {
    // useContext() = extract/access the value prop from BlogContext 
    const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext); // access the value prop from BlogContext.Provider
    // ^ destructuring an object into separate variables

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => { // this component (IndexScreen) is the primary screen, run callback function
            getBlogPosts(); // anytime we return to this screen = get an update on the posts
        });

        // prevent memory leaks, close listener when done with it
        return (() => { // return function only invoked if IndexScreen completely stopped showing on the screen (not stacked)
            listener.remove(); 
        });
    }, []);

    return (
        <>
            {/* <Button 
                title='Add Post'
                onPress={addBlogPost} // same as {() => addBlogPost()}
            /> */}
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather 
                                        name='trash'
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

// RNav auto calls this function to navigation options, when index screen about to be displayed by RNav
// it will inspect the object returned; object used to customize the header & its functionalities/buttons
IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: 
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name='plus' style={styles.icon} />{/* assign react elem which will be displayed to right of header */}
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    row: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'grey', 
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24,
    },
});

export default IndexScreen;