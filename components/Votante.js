import * as React from 'react';
import * as RN from 'react-native';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { database } from '../database/firebase';

export default function Votante({
    id,
    dni,
    nombre,
    apellidos,
    edad
}) {

    const onDelete = () => {
        const docRef = doc(database, 'votante', id);
        deleteDoc(docRef);
    }

    const onEdit = () => {
        const docRef = doc(database, 'votante', id);
        // navigation.navigate("CreateVoterScreen")
    }

    return (
        <RN.View>
            <RN.View style={styles.productContainer}>
                {false && <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <RN.Text style={styles.name}>{dni}</RN.Text>
                    <AntDesign onPress={onDelete} name="delete" size={24} color="black" />
                    <AntDesign onPress={onEdit} name="edit" size={24} color="black" />
                </RN.View>}
                <RN.Text style={styles.name}>{nombre}</RN.Text>
                <RN.Text style={styles.name}>{apellidos}</RN.Text>
                <RN.Text style={styles.price}>{edad}</RN.Text>
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