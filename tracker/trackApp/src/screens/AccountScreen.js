import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation'; // makes sure content does not render behind top status bar
import { FontAwesome } from '@expo/vector-icons';

import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext); 

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text>Account Screen</Text>
            <Spacer>
                <Button 
                    title='Sign Out'
                    onPress={signout}
                />
            </Spacer>
        </SafeAreaView>
    );
};

AccountScreen.navigationOptions = {
    title: 'Account',
    tabBarIcon: <FontAwesome name='gear' size={20} />
};

const styles = StyleSheet.create({});

export default AccountScreen;