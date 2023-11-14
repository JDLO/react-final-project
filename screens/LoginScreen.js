import * as RN from 'react-native';
import React, { useState, setState } from 'react';

import { auth } from '../database/firebase';

import { database } from "../database/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const LoginScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailSignUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            ).then((userCredential) => {
                console.log(userCredential.user);
                props.navigation.navigate('PoliticPartiesListScreen');
            })
        } catch (error) {
            console.log(error);
        };
    }

    const emailSignIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            ).then((userCredential) => {
                console.log(userCredential.user);
                props.navigation.navigate('PoliticPartiesListScreen');
            })
        } catch (error) {
            console.log(error);
        };
    }

    const emailSignOut = async () => {
        signOut()
            .then(() => {
                console.log('User account logged out!');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <RN.View style={styles.container}>
            <RN.View style={styles.formGroup}>
                <RN.View style={styles.inputGroup}>
                    <RN.TextInput placeholder='usuario'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={{ backgroundColor: '#eee', marginVertical: 10 }}
                    />
                </RN.View>
                <RN.View style={styles.inputGroup}>
                    <RN.TextInput secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={{ backgroundColor: '#eee', marginVertical: 10 }} />
                </RN.View>
            </RN.View>
            <RN.Button onPress={emailSignUp} title="Sign up" />
            <RN.Button onPress={emailSignIn} title="Sign in" />
            <RN.Button onPress={emailSignOut} title="Sign out" />
        </RN.View>
    )
}


const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    formGroup: {
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255,0.5)',
    },
    inputGroup: {
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default LoginScreen;