import { collection, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import * as RN from 'react-native';
import ResumeVotesPoliticParty from '../components/ResumeVotesPoliticParty';
import { database } from '../database/firebase';

const ResumeVotesListScreen = () => {
    const [politicParties, setPoliticParties] = useState([]);
    const navigation = useNavigation();

    React.useEffect(() => {
        const fetchData = async () => {
            const partidoSnapshot = await getDocs(collection(database, "partido"));
            const promises = partidoSnapshot.docs.map(async (doc) => {
                const id = doc.id;
                const nombre = doc.data().nombre;
                const emoji = doc.data().emoji;

                // Consulta la cantidad de votos para este partido
                const votosSnapshot = await getDocs(query(collection(database, 'voto'), where('idPartido', '==', id)));
                const cantidadVotos = votosSnapshot.size;

                return {
                    id,
                    nombre,
                    emoji,
                    votos: cantidadVotos,
                };
            });

            const results = await Promise.all(promises);

            setPoliticParties(results.sort((a, b) => b.votos - a.votos));
        };

        const unsubscribe = onSnapshot(collection(database, "partido"), () => {
            console.log("Query snapshot");
            fetchData();
        });

        return () => {
            console.log("Unsubscribe");
            unsubscribe();
        };
    }, []);

    return (
        <RN.View style={styles.container}>
            <RN.ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {politicParties.map((politicParty) => (
                    <ResumeVotesPoliticParty key={politicParty.id} {...politicParty} />
                ))}
            </RN.ScrollView>
        </RN.View>
    );
};

export default ResumeVotesListScreen;

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
