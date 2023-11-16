import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


const CustomButton = ({ title, icon, onPress, style }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Ionicons name={icon} size={20} color="white" />
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#259FFF', // Puedes personalizar el color aquí
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 18,
    },
});