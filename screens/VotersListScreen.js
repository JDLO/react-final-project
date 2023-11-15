import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import * as RN from "react-native";
import { Text, View } from 'react-native';

import { useState } from "react";
import { database } from "../database/firebase";
import { useNavigation } from "@react-navigation/native";
import Votante from "../components/Votante";

const VotersListScreen = () => {

    const [voters, setVoters] = useState([]);
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <RN.View style={{marginEnd: 10, borderRadius: 10}}>
                <RN.Button title="Agregar" onPress={() => navigation.navigate("CreateVoterScreen")} />
            </RN.View>
          ),
        });
      }, [navigation]);

    React.useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, "votante"), (snapshot) => {
            setVoters(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    dni: doc.data().dni,
                    nombre: doc.data().nombre,
                    apellidos: doc.data().apellidos,
                    edad: doc.data().edad,
                }))
            );
        })
        return unsubscribe;
    }, []);

    return (
        <RN.View>
            <RN.ScrollView>
                {voters.map(votante => (
                    <Votante key={votante.id} {...votante} />
                ))
                }
            </RN.ScrollView>
        </RN.View>
    );
}
export default VotersListScreen;
