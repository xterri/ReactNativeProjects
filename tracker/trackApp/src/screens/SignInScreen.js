import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context } from '../context/AuthContext';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignInScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(Context);

    return (
        <View style={styles.container}>
            <NavigationEvents // doesn't display anything on screen, use to pass callback functions as props to be called automaticall
                // onWillFocus={() => {}} 
                    // function called any time we're about to NAVIGATE TO this screen (called when just pressing button to go to this screen)
                    // called when about to start transition to this screen
                // onDidFocus={() => {}} 
                    // called when we successfully complete navigation to/landing on this screen
                onWillBlur={clearErrorMessage} // { () => { clearErrorMessage() }}
                    // called when we're about to navigate AWAY from this screen
                // onDidBlur={() => {}} 
                    // called when transition completes; buggy, doesn't call when navigating away
            />
            <AuthForm
                headerText='Sign In to Tracker'
                errorMessage={state.errorMessage}
                submitButtonText='Sign In'
                onSubmit={signin}
            />
            <NavLink
                text='Need an account? Click here to create one'
                routeName='SignUp'
            />
        </View>
    );
};

SignInScreen.navigationOptions = () => {
    return {
        header: null,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 220,
    },
});

export default SignInScreen;