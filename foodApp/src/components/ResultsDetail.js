import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const ResultsDetail = ( {result} ) => {
    return (
        <View style={styles.containerStyle}>
            <Image 
                source={{ uri: result.image_url }} // outer {} = referring to JS expression; inner {} = actual object being passed
                style={styles.imageStyle}
            />
            {/* Image won't show unless set with fixed height and width */}
            <Text style={styles.nameStyle}>{result.name} </Text>
            <Text>{`${result.rating} Stars \t\t ${result.review_count} Reviews`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        width: 252,
        marginLeft: 15,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 4
    },
    imageStyle: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginBottom: 5,
    },
    nameStyle: {
        fontWeight: 'bold',
    },
});

export default ResultsDetail;