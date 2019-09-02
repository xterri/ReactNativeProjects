import React, { useState } from 'react'; // useEffect = function that lets us run a snippet of code one time, when it first renders to screen
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import useResults from '../hooks/useResults';

import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';

// SearchScreen = where Yelp API search happens
    // pass a callback to do the search
const SearchScreen = () => { // passing {navigation} from app to here to another screen = redundant; can call it where we need it
    const [term, setTerm] = useState(''); // always useState when wanting to update something
    const [searchApi, results, errorMsg] = useResults(); // how hook's functions and variables called into this file

    const filterResultsByPrice = (price) => {
        // price === '$' || '$$' || '$$$'
        return results.filter((result) => { // results.filter() = separates each obj into 'result' to search each 'section'
            return result.price === price; // if true, returns inside a new results set / array
            // iterates through array to find the match
        });
    };

    return (
        <>{/* empty tag (<> & </>), allows user to return elements but doesn't render an element on the screen, no container (no { flex: 1 }*/}
        {/* // <View style={{ flex: 1 }}> */}
        {/* on Android must constrain view element b/c it expands a bit off screen*/}
        {/* use { flex: 1 } on parent view to only use actual visible screen state */}
            <SearchBar 
                term={term}
                onTermChange={(newTerm) => setTerm(newTerm)} // passes term input from user to child  
                onTermSubmit={() => searchApi(term)} // passing reference to function to be invoked
            />
            <Text style={{ color: 'red' }}>{errorMsg ? errorMsg : null}</Text>
            {/* <Text># of results found: {results.length}</Text> */}

            <ScrollView>{/* like <View> but will automatically enable scrolling */}
                <ResultsList 
                    title='Cheap Eats'
                    results={filterResultsByPrice('$')}
                    // navigation={navigation} // must pass down this prop in order to navigate from screen to screen
                />
                <ResultsList 
                    title='Moderate Eats'
                    results={filterResultsByPrice('$$')}
                    // navigation={navigation}
                />
                <ResultsList
                    title='Expensive Eats'
                    results={filterResultsByPrice('$$$')}
                    // navigation={navigation}
                />
            </ScrollView>
        {/* // </View> */}
        </>
    );
};

const styles = StyleSheet.create({});

export default SearchScreen;