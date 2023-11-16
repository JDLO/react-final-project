import * as React from 'react';
import * as RN from 'react-native';
import { database } from "../database/firebase";
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";

import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';


export default function Partido({
    id,
    nombre,
    emoji,
    votante,
}) {
    const [haVotado, setHaVotado] = useState(false);
    // Obtenemos el id del paritodo y la fecha actual
    const [voto, setVoto] = useState({
        idPartido: id,
        fechaVotacion: new Date(),
    })

    useEffect(() => {
        // Verifica si votante es una referencia válida antes de intentar acceder a sus datos
        if (votante && votante instanceof Object) {
            setHaVotado(votante.data().hasVoted);
        }
    }, [votante]);

    const onVote = async () => {
        console.log("VOTANTE: " + votante.id + " " + votante.data().hasVoted);
        // setHaVotado(votante.data().hasVoted);
        console.log(haVotado);
        if (haVotado) {
            console.log('No se puede votar')
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Ya ha votado, no puede votar nuevamente.',
                button: 'Cerrar',
            });
            return;
        }

        const ref = collection(database, "voto");
        setVoto({
            idPartido: id,
            fechaVotacion: new Date(),
        })
        try {
            // Agregamos el voto a la base de datos
            console.log("Puedes votar y este es tu voto: ")
            console.log(voto);
            await addDoc(ref, voto);
        } catch (err) {
            console.log(err);
        }


        // console.log("VOTANTE: " + votante.id + " " + votante.data().hasVoted);
        // Actualizo el usuario para que no vote mas
        const userRef = doc(database, 'votante', votante.id);
        await updateDoc(userRef, { hasVoted: true });
        setHaVotado(true);

        //TODO Falta actualizar el boton si ya ha votado

        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Éxito',
            textBody: 'Votación realizada, ¡gracias por su participación!',
            button: 'Cerrar',
        });
    }

    return (
        <AlertNotificationRoot>
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
        </AlertNotificationRoot>
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