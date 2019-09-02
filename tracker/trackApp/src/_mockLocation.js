import * as Location from 'expo-location'; 

const tenMetersWithDegrees = 0.0001; // 10m in long & lat

const getLocation = (increment) => {
    // return obj w/ fake location coordinates
    let coords = {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: -113.4433816 + increment * tenMetersWithDegrees,
            latitude: 53.6187368 + increment * tenMetersWithDegrees
        }
    };

    // console.log(coords);
    return coords;
};

let counter = 0;

// once every second emit an event directly into location library to 'fake' user's location
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });

    counter++;
}, 1000);