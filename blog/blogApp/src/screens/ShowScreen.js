import React, { useContext } from 'react'; // useContext to pull any data from any information in any component
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import { Context } from '../context/BlogContext';

const ShowScreen = ({ navigation }) => { // param2 can't be direclty received, must call 'navigation' prop first
    const id = navigation.getParam('id'); // use getParam to get the param you want
    const { state } = useContext(Context); 

    const blogPost = state.find((blogPost) => blogPost.id === id); // find() built-in helper function to search inside array
    // take any found blogposts and assign it to current blogPost variable

    return (
        <View>
            <Text>Show Screen</Text>
            <Text>Blog Post id: {id}</Text>
            <Text>Blog Post title: {blogPost.title}</Text>
            <Text>Blog Content: {`\n`} {blogPost.content}</Text>
        </View>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: 
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') })}>
                <EvilIcons name='pencil' size={35} />{/* assign react elem which will be displayed to right of header */}
            </TouchableOpacity>
    };
};

const styles = StyleSheet.create({});

export default ShowScreen;