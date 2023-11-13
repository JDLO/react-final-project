import * as React from 'react';
import * as RN from 'react-native';
import { database } from "../database/firebase";
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

export default function Partido({
    id,
    nombre,
    // emoji,
}) {

    const onDelete = () => {
        const docRef = doc(database, 'partido', id);
        deleteDoc(docRef);
    }

    const onVote = () => {
        console.log("VOTADO");
    }

    return (
        <RN.View>
            <RN.View style={styles.productContainer}>
                <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* <RN.Text style={styles.emoji}>{emoji}</RN.Text> */}
                    <AntDesign onPress={onDelete} name="delete" size={24} color="black" />
                </RN.View>
                <RN.Text style={styles.name}>{nombre}</RN.Text>
                <RN.TouchableOpacity
                    onPress={onVote}
                    style={styles.button}>
                    <RN.Text style={styles.buttonText}>Votar</RN.Text>
                </RN.TouchableOpacity>
            </RN.View>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    emoji: {
        fontSize: 100,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray',
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});