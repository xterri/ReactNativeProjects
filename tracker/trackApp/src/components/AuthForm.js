import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements'

import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>

            <Input 
                label='Email'
                value={email} 
                onChangeText={setEmail} // same as (newEmail) => setEmail(newEmail); passes the newEmail directly
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Spacer/>
            <Input 
                label='Password'
                secureTextEntry // same as secureTextEntry={true}; hides password input
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                autoCorrect={false}
            />

            { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
            <Spacer>
                <Button 
                    title={submitButtonText}
                    onPress={() => onSubmit({ email, password })}
                />
                {/* <Button 
                    title='Go to Main Flow'
                    onPress={() => navigation.navigate('mainFlow')}
                /> */}
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15,
    },
});

export default AuthForm;