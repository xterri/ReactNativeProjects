import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null); // only going to get 1 object back, use 'null' to indicate no data fetched
    // when trying to access data in result later, must make sure it's not null
    const id = navigation.getParam('id'); // goes into navigation param to get the param/object we want

    const getResult = async (id) => { 
        const response = await yelp.get(`/${id}`); // use backticks b/c id = JS code
        setResult(response.data); // need to get info from 'response.data' then re-render the component
    };

    // don't need to keep re-rendering, only need to display results once
    useEffect(() => {
        getResult(id);
    }, []);

    if (!result) { // b/c first render = null, informing app to not show anything on screen until populated with data
        return null;
    }

    return (
        <View>
            <Text>{result.name}</Text>
            <FlatList
                data={result.photos}
                keyExtractor={(photo) => photo} // photo = url = unique
                renderItem={({ item }) => { // actual url of photo
                    return (
                        <Image 
                            style={styles.imageStyle}
                            source={{ uri: item }} // outside {} = using js expression; inside {} = actual object
                        /> 
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        height: 200,
        width: 300,
    },
});

export default ResultsShowScreen;