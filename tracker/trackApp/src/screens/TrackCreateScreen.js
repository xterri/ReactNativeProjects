import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation'; // withNavigationFocus = pass new prop and let us know if this screen is the focus 
import { FontAwesome } from '@expo/vector-icons';

import '../_mockLocation'; // comment out if you want to try testing with actual device

import Map from '../components/Map';
import TrackForm from '../components/TrackForm';

import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext);
    const callback = useCallback((location) => { // only runs if arg2 val changes         
        addLocation(location, recording)
    }, [recording]); // arg2 arr = similar to useEffect; any time arr changes, rebuild addLocation

    const [err] = useLocation(isFocused || recording, callback); // isFocused identifies if focus is on current screen
    // if on this screen or currently recording, keep recording until stopped

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}

            <TrackForm />
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name='plus' size={20} />
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);