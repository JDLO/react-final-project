import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import * as RN from "react-native";

import { getAuth, signOut } from 'firebase/auth';
import CustomButton from "../components/CustomButton";

export default function Home() {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <RN.View style={{ marginEnd: 10, borderRadius: 10 }}>
                    <RN.Button onPress={emailSignOut} title="Sign out" color="#FF1400" />
                </RN.View>
            ),
        });
    }, [navigation]);

    const emailSignOut = async () => {
        // signOut()
        //     .then(() => {
        //         console.log('User account logged out!');
        //         navigation.navigate('LoginScreen');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        const auth = getAuth();  // Initialize auth
        signOut(auth)  // Call signOut on the authenticated user
            .then(() => {
                console.log('User account logged out!');
                navigation.navigate('LoginScreen');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <RN.ImageBackground
            source={require('../assets/Fondos/fondo_home.png')}
            style={styles.backgroundImage}
        >
            <RN.View style={styles.container}>
                <RN.ScrollView contentContainerStyle={styles.scrollContainer}>
                    <RN.View style={styles.itemList}>
                        <CustomButton
                            title="Partidos"
                            icon="flag"
                            onPress={() => navigation.navigate("PoliticPartiesListScreen")}
                        />
                    </RN.View>
                    <RN.View style={styles.itemList}>
                        <CustomButton 
                            title="Votantes" 
                            icon="people"
                            onPress={() => navigation.navigate("VotersListScreen")}
                        />
                    </RN.View>
                    <RN.View style={styles.itemList}>
                        <CustomButton
                            title="Resumen de Votos"
                            icon="bar-chart"
                            onPress={() => navigation.navigate("ResumeVotesListScreen")}
                        />
                    </RN.View>

                </RN.ScrollView>
            </RN.View>
        </RN.ImageBackground>
    );
}

const styles = RN.StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        margin: 10,
        paddingBottom: 100,
        paddingHorizontal: 10,
        padding: 10,
    },
    itemList: {
        marginTop: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        margin: 16,
    },
});
