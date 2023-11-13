import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import React, { useState, setState } from 'react';

import { database } from "../database/firebase";
import { addDoc, collection } from "@firebase/firestore";

const CreatePoliticPartyScreen = (props) => {
    const [state, setState] = useState({
        nombre: '',
    })

    const saveNewUser = () => {
        console.log(state);

        
        if (state.nombre === '') {
            alert('Partido politico sin nombre');
            return;
        } 
        // Si todo va bien, guardarlo en la base de datos
        const ref = collection(database, "partido");
        try {
            addDoc(ref, state);
        } catch (err) {
            console.log(err);
        }
        alert('Partido politico guardado');
        props.navigation.navigate('PoliticPartiesListScreen');
    }

    return (
        <ScrollView>
            <View style={styles.inputGroup}>
                <Text>Crear Partido Político</Text>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Nombre' onChangeText={(value) => setState({ ...state, nombre: value })} />
            </View>
            <View>
                <Button title="Guardar Usuario" onPress={() => saveNewUser()} />
            </View>

        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default CreatePoliticPartyScreen;