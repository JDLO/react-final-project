import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';

import { setDoc, doc } from "@firebase/firestore";
import { database } from "../database/firebase";
import { auth } from '../database/firebase';

import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateVoterScreen = (props) => {
    const [state, setState] = useState({
        dni: '',
        nombre: '',
        apellidos: '',
        edad: '',
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const saveNewUser = async () => {
        console.log(state);

        // Validación de campos
        //TODO Comprobar que no exista un votante con ese DNI -> HACER UN IF
        alert('FALTA COMPROBAR QUE NO EXISTE UN VOTANTE CON ESTE DNI');
        if (state.dni === '') {
            // alert('Votante sin DNI');
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Debe introducir su DNI.',
                button: 'Cerrar',
            });
            return;
        } else if (state.dni.match('/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i') === '') {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'DNI incorrecto.',
                button: 'Cerrar',
            });
            return;
        }
        if (state.nombre === '') {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Debe introducir su nombre.',
                button: 'Cerrar',
            });
            return;
        } if (state.apellidos === '') {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Debe introducir sus apellidos.',
                button: 'Cerrar',
            });
            return;
        } if (state.edad === '') {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Debe introducir su edad.',
                button: 'Cerrar',
            });
            return;
        } else {
            if (isNaN(state.edad)) {    //Comprobamos si es un numero
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Error',
                    textBody: 'La edad debe de ser un número.',
                    button: 'Cerrar',
                });
                return;
            } else {
                // Comprobamos si el votante es menor de 18 años
                let edad = parseInt(state.edad);
                if (edad < 18) {
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Error',
                        textBody: 'No puede votar si tiene menos de 18 años.',
                        button: 'Cerrar',
                    });
                    return;
                } else if (edad > 200) {
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Error',
                        textBody: 'Su edad no puede ser superior a 200 años.',
                        button: 'Cerrar',
                    });
                    return;
                }
            }
        }
        if (email === '') {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Debe introducir su correo electrónico.',
                button: 'Cerrar',
            });
            return;
        } else {
            // comprobamos que el correo tenga @
            if (email.indexOf('@') === -1) {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Error',
                    textBody: 'El correo electrónico debe tener @',
                    button: 'Cerrar',
                });
                return;
            }
        }
        // comprobamos que existe la contraseña
        if (password === '') {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Debe introducir una contraseña.',
                button: 'Cerrar',
            });
            return;
        } else if (password.length < 6) {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'La contraseña debe tener al menos 6 caracteres.',
                button: 'Cerrar',
            });
            return;
        }

        try {
            // Guardar la autenticación
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            ).then(async (userCredential) => {
                // Si todo va bien, guardar el votante
                await setDoc(doc(database, "votante", userCredential.user.uid), {
                    dni: state.dni,
                    nombre: state.nombre,
                    apellidos: state.apellidos,
                    edad: state.edad,
                    hasVoted: false,
                });
                console.log(userCredential.user);
            })
        } catch (error) {
            console.log(error);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Ha habido un error en el registro.',
                button: 'Cerrar',
            });
        };


        // Si todo va bien, guardarlo en la base de datos de votantes
        // const ref = collection(database, "votante");
        // try {
        //     addDoc(ref, state);
        // } catch (err) {
        //     console.log(err);
        // }

        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Error',
            textBody: 'Se ha creado su cuenta.',
            button: 'Cerrar',
        });
        props.navigation.navigate('HomePrincipal');
    }

    return (
        <AlertNotificationRoot>
            <ScrollView style={styles.container}>
                <View style={styles.formGroup}>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder='DNI'
                            onChangeText={(value) => setState({ ...state, dni: value })}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder='Nombre'
                            onChangeText={(value) => setState({ ...state, nombre: value })}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder='Apellidos'
                            onChangeText={(value) => setState({ ...state, apellidos: value })}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder='Edad'
                            keyboardType='numeric'
                            onChangeText={(value) => setState({ ...state, edad: value })}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder='Correo'
                            value={email}
                            keyboardType='email-address'
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput secureTextEntry={true}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title="Guardar" onPress={() => saveNewUser()} />
                    </View>
                </View>
            </ScrollView>
        </AlertNotificationRoot>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    formGroup: {
        // flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255,0.5)',
    },
    inputGroup: {
        // flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    button: {
        borderRadius: 10,
    }
})

export default CreateVoterScreen;