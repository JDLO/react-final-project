import * as React from "react";
import * as RN from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { View, Text, FlatList } from 'react-native';

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { database } from "../database/firebase";
import Partido from "../components/Partido";

// const PoliticPartiesListScreen=() => {
//    return (
//         <View>
//             <Text>Listado de Votantes</Text>
//         </View>
//     )
// }
// // TypeError: 0, _firebase.firestore is not a function (it is Object)
// const UsersList1=() => {
//     const [data, setData]=useState();
//     const usersCollection = firestore().collection('Users').get();
//     setData(users.docs);
//     console.log(usersCollection.get());
//     return (
//         <View>
//             <Text>Listado de Partidos</Text>
//         </View>
//     )
// }
// export default PoliticPartiesListScreen;

export default function PoliticPartiesListScreen() {
    const [politicParties, setPoliticParties] = useState([]);
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <RN.Button title="Agregar" onPress={() => navigation.navigate("CreatePoliticPartyScreen")} />
            ),
        });
    }, [navigation]);

    React.useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, "partido"), (querySnapshot) => {
            // onSnapshot is a listener that listens to changes in the database in realtime
            console.log("querySnapshot unsusbscribe");
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
                    <Partido key={politicParty.id} {...politicParty} />
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