import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps'; // react component; polyLine = show line on map

import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
    const { state: { currentLocation, locations } } = useContext(LocationContext);

    if (!currentLocation) {
        return <ActivityIndicator size='large' style={{ marginTop: 200 }} />; // activity indicator = spinning wheel
    }

    return (
        <MapView // similar to an img; must assign it a height and width property
            style={styles.map}
            initialRegion={{ // reference a location in the world that we want to show; first location shown when map is rendered
                // latitude: 53.618718, // lat & long = where we're centering the map on
                // longitude: -113.4432999, 
                ...currentLocation.coords, // coords = pulling latitude & longitude from coords
                latitudeDelta: 0.01, // lat & long delta = how much area to display; zoom level we're showing
                longitudeDelta: 0.01
            }}
            // region={{ // when region updated, map updates and recenter & zoom on user 
            //     ...currentLocation.coords,
            //     latitudeDelta: 0.01,
            //     longitudeDelta: 0.01
            // }}

            // can add a "bouncing box" to prevent current location from going out of bounds in the area it's displayed in
        >
            <Circle
                center={currentLocation.coords}
                radius={30}
                strokeColor='rgba(158, 158, 255, 1.0)'
                fillColor='rgba(158, 158, 255, 0.3)'
            />

            <Polyline // must pass in additional # of coordinates; array of obj of lat & long properties
                coordinates={locations.map(loc => loc.coords)} // map arr of coords & return loc.coords
                // go through each diff location obj, only pull loc.coords and return into new arr
            />
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300,
    },
});

export default Map;

// Temporary coordinates for demo
// let points = [];

// for (let i = 0; i < 20; i++) {
//     if (i % 2 === 0) {
//         points.push({
//             latitude: 37.33233 + i * 0.001,
//             longitude: -122.03121 + i * 0.001,
//         });
//     } else {
//         points.push({
//             latitude: 37.33233 - i * 0.002,
//             longitude: -122.03121 + i * 0.001,
//         });
//     }
// }