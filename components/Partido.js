import * as React from 'react';
import * as RN from 'react-native';
import { database } from "../database/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { useState } from "react";


export default function Partido({
    id,
    nombre,
    emoji,
    hasVotedProp, 
    userId,
}) {
    // Obtenemos al usuario en sesión
    const [hasVoted, setHasVoted] = useState(hasVotedProp);
    const [voto, setVoto] = useState({
        idPartido: '',
        fechaVotacion: '',
    })

    const onVote = async () => {
        if (hasVoted) {
            alert('Ya has votado, no puedes votar nuevamente.');
            return;
        }

        const ref = collection(database, "voto");
        setVoto({
            idPartido: id,
            fechaVotacion: new Date(),
        })
        try {
            // Agregamos el voto a la base de datos
            console.log(voto);
            await addDoc(ref, voto);
        } catch (err) {
            console.log(err);
        }

        // Actualizo el usuario para que no vote mas
        const userRef = doc(database, 'votante', userId);
        await updateDoc(userRef, { hasVoted: true });
        setHasVoted(true);

        alert('Votación realizada');
    }

    return (
        <RN.View>
            <RN.View style={styles.productContainer}>
                <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <RN.Text style={styles.emoji}>{emoji}</RN.Text>
                </RN.View>
                <RN.Text style={styles.name}>{nombre}</RN.Text>
                <RN.TouchableOpacity
                    onPress={() => onVote()}
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