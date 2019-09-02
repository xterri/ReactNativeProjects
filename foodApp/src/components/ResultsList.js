import React from 'react';
import { withNavigation } from 'react-navigation'; // provides access to nav prop it needs
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'; // FlatList used when want to show a scrollable list of data to users

import ResultsDetail from './ResultsDetail';

// use props.title or { title } to deconstruct; or props for whole object
const ResultsList = ({ title, results, navigation }) => {
    // don't show results until results found; w/ check = everything loads together
    if (!results.length) {
        return null;
    };

    return (
        <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>{title}</Text>
            <FlatList
                horizontal={true} // default = shows list vertically; can also leave as 'horizontal' (minus {true}), if prop is true
                data={results} // getting list of data from 'results'
                keyExtractor={(result) => result.id} // need to assign unique key for every result as stable identifier with keyExtractor
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', { id: item.id })}>
                        {/* pass arg2 to communicate info to ResultsShowScreen */}
                        {/* only passing the business id */}
                            <ResultsDetail result={item}/>
                        </TouchableOpacity>
                    );
                }} // { item } === actual object we're iterating over; has all restaurant data in it
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5,
    },
    containerStyle: {
        marginBottom: 10,
    },
});

export default withNavigation(ResultsList); 
// wrap 'ResultsList' to export a "special" version of results list w/ extra functionality to give it access to navigation
// still passing down navigation prop, just not through SearchScreen