import { collection, getDocs, query, where } from '@firebase/firestore';
import * as React from 'react';
import { useEffect, useState } from "react";
import * as RN from 'react-native';
import { database } from '../database/firebase';

export default function ResumeVotesPoliticParty({
    id,
    nombre,
    emoji,
    votos
}) {

    return (
        <RN.View>
            <RN.View style={styles.productContainer}>
                <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <RN.Text style={styles.emoji}>{emoji}</RN.Text>
                </RN.View>
                <RN.Text style={styles.name}>{nombre}</RN.Text>
                <RN.Text style={styles.name}>Número de votos: {votos}</RN.Text>
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