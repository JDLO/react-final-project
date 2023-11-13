import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useState, setState } from 'react';
import * as RN from "react-native";
import EmojiPicker from "rn-emoji-keyboard";
import { database } from "../database/firebase";
import { addDoc, collection } from "@firebase/firestore";

const CreatePoliticPartyScreen = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        nombre: '',
        emoji: "📷",
    })

    const handlePick = (emojiObject) => {
        setNewItem({
            ...newItem,
            emoji: emojiObject.emoji,
        });
    };

    const saveNewUser = () => {
        if (newItem.nombre === '') {
            alert('Partido politico sin nombre');
            return;
        }
        // Si todo va bien, guardarlo en la base de datos
        const ref = collection(database, "partido");
        try {
            addDoc(ref, newItem);
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
            <RN.Text onPress={() => setIsOpen(true)} style={styles.emoji}>
                {newItem.emoji}
            </RN.Text>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <View style={styles.inputGroup}>
                <TextInput placeholder='Nombre' onChangeText={(value) => setNewItem({ ...newItem, nombre: value })} />
            </View>
            <View>
                <Button title="Guardar Usuario" onPress={() => saveNewUser()} />
            </View>

        </ScrollView>
    )

}


const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
    },
    inputContainer: {
        width: "90%",
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
    },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        padding: 10,
        marginVertical: 6,
    },
});

export default CreatePoliticPartyScreen;