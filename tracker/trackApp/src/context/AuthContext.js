import { AsyncStorage } from 'react-native';

import createDataContext from './createDataContext';
import trackApi from '../api/tracker';
import { navigate } from '../navigationRef'; 

const authReducer = (state, action) => { // reducer called with 2 args, state and action; only called by react directly
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }; // overwrite the state.errorMessage with the one from payload
        case 'signup' || 'signin':
            return { token: action.payload, errorMessage: '' }; // don't need to carry through values from state obj
        case 'signout': 
            return { token: null, errorMessage: '' }; // indicate there are no tokens to allow signin
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        default: 
            return state;
    };
};


/*
** ACTION FUNCTIONS
*/

// if returning one thing, can remove { return } to create and implicit function (see signin function)
const signup = (dispatch) => { // must return a function to get access to the dispatch function
    return (async ({ email, password }) =>  {
        try {
            // make API request to sign up with the email and password created; post req
            const response = await trackApi.post('/signup', { email, password }); // make POST req to signup route
            
            // if signed up, modify the state to indicate they are authenticated
            await AsyncStorage.setItem('token', response.data.token); // set to user's device
            // await AsyncStorage.getItem('token'); // get jwt token from user's device

            dispatch({ type: 'signup', payload: response.data.token });

            // navigate to main flow
            navigate('TrackList');
        } catch (err) {
            // if sign up fails, return error message

            // console.log(err.message);
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
        };
    });
};

const signin = (dispatch) => async ({ email, password }) => {
    try {
        // try to signin
        const response = await trackApi.post('/signin', { email, password });

        // handle success by updating state
        await AsyncStorage.setItem('token', response.data.token);

        dispatch({ type: 'signin', payload: response.data.token});
        navigate('TrackList');
    } catch (err) {
        // console.log(err);

        // handle failure by showing error message
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign in'});
    };
};

const signout = (dispatch) => async () => {
    // sign out
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
};


/*
** HELPER FUNCTIONS
*/ 

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

// try to sign user in automatically based on info on user's device
const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList'); 
    } else {
        navigate('loginFlow'); // or can navigate to 'SignUp'
    }
};

// export Provider in Context to be used throughout the application
export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin }, // obj of our action functions
    { token: null, errorMessage: '' } // initial state; errorMessage = display error message to user
); 