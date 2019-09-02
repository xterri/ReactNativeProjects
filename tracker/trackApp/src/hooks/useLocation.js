// Logic for requesting permission to track users location, error handling & watching users change in location
import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null); // track error; error = null, everything ok
    // const [subscriber, setSubscriber] = useState(null);

    useEffect(() => {
        // want to have helper functions inside useEffect so it uses the most updated values, esp if using prop values
        let subscriber; // same as use the 'const [subscriber, setSubscriber] = useState(null);' but changes inside useEffect
        
        const startWatching = async () => {
            try {
                // only request permissions once
                await requestPermissionsAsync();
    
                subscriber = await watchPositionAsync({ // watch user's position and see it change over time
                    accuracy: Accuracy.BestForNavigation, // provide high accuracy for location readings
                    timeInterval: 1000, // get update once every second
                    distanceInterval: 10 // get update once every 10m
                }, callback // referencing a prop
                // (location) => {
                //     // console.log(location); // describe's user's actual location
                //     addLocation(location);
                // }
                );     
            } catch (e) {
                // if location permission is rejected, setErr message
                setErr(e); 
            }
        };

        if (shouldTrack) {
            startWatching(); // only want this run once when component first displayed on screen
        } else {
            if (subscriber) {
                // stop watching
                subscriber.remove(); // stop watching
            }
            subscriber = null; // reset subscriber to null to indicate we have nothing to stop
        }

        // cleanup/stop prev startWatching() 
        return () => {
            if (subscriber) { 
                subscriber.remove(); // stop watching
            }
        };
    }, [shouldTrack, callback]); // compare shouldTrack value w/ last time the hook ran; if value changes, run startWatching()
        // if value is the same then it does not rerender

    return [err]; // return an array for multiple values
};