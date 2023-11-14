import * as RN from 'react-native';
import React, { useState, useEffect } from 'react';

import { auth } from '../database/firebase';

import { database } from "../database/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
                props.navigation.navigate('Home');
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
                props.navigation.navigate('Home');
            })
        } catch (error) {
            console.log(error);
        };
    }

    // useEffect to clear the fields on component mount or when the user signs out
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                // User is signed out, clear the fields
                setEmail('');
                setPassword('');
            }
        });

        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <RN.View style={styles.container}>
            <RN.View style={styles.formGroup}>
            <RN.View style={styles.inputGroup}>
                    <RN.TextInput placeholder='Usuario'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={{ backgroundColor: '#F1F1F1', marginVertical: 10 }}
                    />
                </RN.View>
                <RN.View style={styles.inputGroup}>
                    <RN.TextInput secureTextEntry={true}
                    placeholder='Contraseña'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={{ backgroundColor: '#F1F1F1', marginVertical: 10 }} />
                </RN.View>
                <RN.View style={styles.buttonGroup}>
                    <RN.Button onPress={emailSignUp} title="Registrase" color="#29D02E" />
                </RN.View>
                <RN.View style={styles.buttonGroup}>
                    <RN.Button onPress={emailSignIn} title="Iniciar sesión" />
                </RN.View>
            </RN.View>
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
    },
    buttonGroup: {
        borderRadius: 10,
        marginBottom: 10,
    },
})

export default LoginScreen;