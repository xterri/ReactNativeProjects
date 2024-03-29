import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

import { Context as TrackContext } from '../context/TrackContext';

const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);
    const _id = navigation.getParam('_id');

    const track = state.find( (t) => t._id === _id ); // returns a bool when match found
    const initialCoords = track.locations[0].coords;

    return (
        <View>
            <Text style={{ fontSize: 40 }}>{track.name}</Text>
            <MapView
                style={styles.map}
                initialRegion={{ 
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    ...initialCoords
                }}
            >
                <Polyline coordinates={track.locations.map(loc => loc.coords)} />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300,
    },
});

export default TrackDetailScreen;