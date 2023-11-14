import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { addDoc, collection } from "@firebase/firestore";
import { database } from "../database/firebase";

const CreateVoterScreen = (props) => {
    const [state, setState] = useState({
        dni: '',
        nombre: '',
        apellidos: '',
        edad: ''
    })

    const saveNewUser = () => {
        console.log(state);

        // Validación de campos
        //TODO Comprobar que no exista un votante con ese DNI -> HACER UN IF
        alert('FALTA COMPROBAR QUE NO EXISTE UN VOTANTE CON ESTE DNI');
        if (state.dni === '') {
            alert('Votante sin DNI');
            return;
        } else if (state.dni.match('/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i') === '') {
            alert('DNI incorrecto');
            return;
        }
        if (state.nombre === '') {
            alert('Votante sin nombre');
            return;
        } if (state.apellidos === '') {
            alert('Votante sin apellidos');
            return;
        } if (state.edad === '') {
            alert('Votante sin edad');
            return;
        } else {
            if (isNaN(state.edad)) {    //Comprobamos si es un numero
                alert('La edad tiene que ser un número');
                return;
            } else {
                // Comprobamos si el votante es menor de 18 años
                let edad = parseInt(state.edad);
                if (edad < 18) {
                    alert('El votante no puede ser menor de 18 años');
                    return;
                } else if (edad > 100) {
                    alert('El votante no puede ser mayor de 100 años');
                    return;
                }
            }
        }

        // Si todo va bien, guardarlo en la base de datos
        const ref = collection(database, "votante");
        try {
            addDoc(ref, state);
        } catch (err) {
            console.log(err);
        }
        alert('Votante guardado');
        props.navigation.navigate('VotersListScreen');
    }

    return (
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
                <View style={styles.button}>
                    <Button title="Guardar" onPress={() => saveNewUser()} />
                </View>
            </View>
        </ScrollView>
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