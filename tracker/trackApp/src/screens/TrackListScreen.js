import React, { useContext } from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';

import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext);

    return (
        <>
            <NavigationEvents onWillFocus={fetchTracks} />{/* fetches our list just as we're about to go to this screen */}

            {/* <Text style={{ fontSize: 40 }}>Track List Screen</Text> */}

            <FlatList
                data={state}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('TrackDetail', { _id: item._id })} // arg2 = passing info to next screen
                        >
                            <ListItem 
                                chevron // chevron (>) = dispaly icon to right side of each list item
                                title={item.name}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </>
    );
};

TrackListScreen.navigationOptions = { // can use this as a function if want to use info from props object; or just an obj
    title: 'Tracks'
};

const styles = StyleSheet.create({});

export default TrackListScreen;