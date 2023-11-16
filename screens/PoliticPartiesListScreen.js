import * as React from "react";
import * as RN from "react-native";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { useFocusEffect } from '@react-navigation/core';

import { auth, database } from "../database/firebase";
import { getAuth, onAuthStateChanged } from '@firebase/auth'; // Importa getAuth y onAuthStateChanged

import Partido from "../components/Partido";

export default function PoliticPartiesListScreen() {
    const [politicParties, setPoliticParties] = useState([]);
    const navigation = useNavigation();

    // Obtiene el objeto auth de Firebase
    const authInstance = getAuth();

    const [user, setUser] = useState(null); // Añade el estado para almacenar el usuario
    const [votante, setVotante] = useState(null);



    // Usa onAuthStateChanged para obtener el usuario actual
    useFocusEffect(() => {
        const fetchData = async () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                // Haz algo con el usuario (puede ser null si no hay usuario autenticado)
                if (user) {
                    console.log(user?.uid);
                    setUser(user); // Guarda el usuario en el estado

                    // Obtén el documento del votante
                    const votanteDoc = await getDoc(doc(database, 'votante', user.uid));
                    setVotante(votanteDoc);
                } else {
                    console.log("No hay usuario autenticado");
                }
            });

            // Devuelve la función de desuscripción para limpiar el efecto cuando el componente se desmonta
            return unsubscribe;
        };

        // Llama a la función asincrónica
        // fetchData();

        return () => {
            fetchData();
        }
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <RN.View style={{ marginEnd: 10, borderRadius: 10 }}>
                    <RN.Button title="Agregar" onPress={() => navigation.navigate("CreatePoliticPartyScreen")} />
                </RN.View>
            ),
        });
    }, [navigation]);

    React.useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, "partido"), (querySnapshot) => {
            // onSnapshot is a listener that listens to changes in the database in realtime
            console.log("querySnapshot unsuscribe");
            setPoliticParties(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    nombre: doc.data().nombre,
                    emoji: doc.data().emoji,
                }))
            );
        });
        return unsubscribe; // unsubscribe from the listener when the component is unmounting
        // because it avoids memory leaks
    }, []);

    return (
        <RN.View style={styles.container}>
            <RN.ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <RN.Text style={styles.title}>Partidos</RN.Text>
                {politicParties.map((politicParty) => (
                    <Partido key={politicParty.id} {...politicParty} votante={votante} />
                ))}
            </RN.ScrollView>
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F3F9",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        margin: 16,
    },
});  