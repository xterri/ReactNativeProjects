import React from 'react';
import { Feather } from '@expo/vector-icons'; // 'Feather' = icon library name
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {

    return (
        <View style={styles.backgroundStyle}>
            <Feather name='search' style={styles.iconStyle}/>{/* expo-cli already includes the some icons available to use: https://expo.github.io/vector-icons/*/}
            <TextInput
                autoCapitalize='none'
                // autoCorrect={false}
                style={styles.inputStyle}
                placeholder='Search'
                // refer to SquareScreen 
                value={term}
                onChangeText={onTermChange} // shorten function, but entering in function name to reference to
                    // only works with 1 or no argument passed to callback function
                onEndEditing={onTermSubmit} // function to determine what happens when user hits ubmits their input 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginTop: 15,
        marginHorizontal: 15,
        flexDirection: 'row',
    },
    inputStyle: {
        fontSize: 18,
        flex: 1, // takes up the available space in parent
    },
    iconStyle: {
        fontSize: 35, // if defining only size in JSX use {size: 5} in place of {styles.iconStyle}
        alignSelf: 'center', 
        marginHorizontal: 15,
    }
});

export default SearchBar;

/* CALLING APIs
FETCH
- built-in, don't need to install libraries
- error handling a little weird
- requires a lot of additional code to make it work 'sensibly'

AXIOS
- separate library to make requests, new dependencies (app size increases a bit)
- easy to use, sensible defaults, and reusable code
- npm install axios
*/