import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context } from '../context/AuthContext';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignUpScreen = () => {
    const { state, signup, clearErrorMessage } = useContext(Context); // destructure the state obj and signup; init req to signup the w/ API

    // TODO: how to clear the stack email & pw on this screen when navigating back to it from sign in? 
    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage} // see SignInScreen.js for notes
            /> 
            <AuthForm
                headerText='Sign Up for Tracker'
                errorMessage={state.errorMessage}
                submitButtonText='Sign Up'
                onSubmit={signup} // same as {({ email, password }) => signup({ email, password })}
                // take ref to signup function 
                // any time onSubmit function called inside AuthForm, call signup and pass in the appropriate argumemnts
            />
            <NavLink
                text='Already have an account? Click here to Sign In'
                routeName='SignIn'
            />
        </View>
    );
};

// use navigationOptions to change the way react navigation behaves and displays the screen
SignUpScreen.navigationOptions = () => { // don't have to use the option function, can just return an obj
    return {
        header: null // hide the header in the app
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // expand and cover the screen as much as possible
        justifyContent: 'center', // center content inside to middle of the screen
        marginBottom: 220, // move the content higher on the screen
    },
});

export default SignUpScreen;


/*
** Original SignUpScreen code
*/

// import React, { useState, useContext } from 'react';
// import { View, StyleSheet, TouchableOpacity } from 'react-native';
// import { Text, Input, Button } from 'react-native-elements'

// import Spacer from '../components/Spacer';
// import { Context } from '../context/AuthContext';

// const SignUpScreen = ({ navigation }) => {
//     const { state, signup } = useContext(Context); // destructure the state obj and signup; init req to signup the w/ API

//     const [ email, setEmail ] = useState('');
//     const [ password, setPassword ] = useState('');

//     return (
//         <View style={styles.container}>
//             <Spacer>
//                 <Text h3>Sign Up for Tracker</Text>
//             </Spacer>

//             <Input 
//                 label='Email' 
//                 value={email} 
//                 onChangeText={setEmail} // same as (newEmail) => setEmail(newEmail); passes the newEmail directly
//                 autoCapitalize='none'
//                 autoCorrect={false}
//             />
//             <Spacer/>
//             <Input 
//                 label='Password'
//                 secureTextEntry // same as secureTextEntry={true}; hides password input
//                 value={password}
//                 onChangeText={setPassword}
//                 autoCapitalize='none'
//                 autoCorrect={false}
//             />

//             { state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null }
//             <Spacer>
//                 <Button 
//                     title='Sign Up'
//                     onPress={() => signup({ email, password })}
//                 />
//                 {/* <Button 
//                     title='Go to Main Flow'
//                     onPress={() => navigation.navigate('mainFlow')}
//                 /> */}
//             </Spacer>

//             <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//                 <Spacer>
//                     <Text style={styles.link}>Already have an account? Click here to Sign In</Text>
//                 </Spacer>            
//             </TouchableOpacity>
//         </View>
//     );
// };

// // use navigationOptions to change the way react navigation behaves and displays the screen
// SignUpScreen.navigationOptions = () => { // don't have to use the option function, can just return an obj
//     return {
//         header: null // hide the header in the app
//     };
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1, // expand and cover the screen as much as possible
//         justifyContent: 'center', // center content inside to middle of the screen
//         marginBottom: 220, // move the content higher on the screen
//     },
//     errorMessage: {
//         fontSize: 16,
//         color: 'red',
//         marginLeft: 15,
//         marginTop: 15,
//     },
//     link: {
//         color: 'blue',
//     }
// });

// export default SignUpScreen;
