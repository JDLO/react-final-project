import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import * as RN from "react-native";

export default function Home() {
    const navigation = useNavigation();

    return (
        <RN.ImageBackground
            source={require('../assets/Fondos/fondo_home.png')}
            style={styles.backgroundImage}
        >
            <RN.View style={styles.container}>
                <RN.ScrollView contentContainerStyle={styles.listContainer}>
                    <RN.View style={styles.itemList}>
                        <RN.Button                             
                            title="Votantes"
                            onPress={() => navigation.navigate("VotersListScreen")}
                        />
                    </RN.View>
                    <RN.View style={styles.itemList}>
                        <RN.Button 
                            style={styles.itemList}
                            title="Partidos"
                            onPress={() => navigation.navigate("PoliticPartiesListScreen")}
                        />                        
                    </RN.View>
                    <RN.View style={styles.itemList}>
                        <RN.Button 
                            style={styles.itemList}
                            title="Resumen de la votación"
                            onPress={() => navigation.navigate("PoliticPartiesListScreen")}
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
