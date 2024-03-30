import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function BasicButton({ text, onPress }){
    return(
        <TouchableOpacity onPress={ onPress }>
            <View style = {styles.BasicButton}>
                <Text style = {styles.BasicButtonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    BasicButton: {
        backgroundColor: "#D8B400",
        paddingHorizontal: 50,
        paddingVertical: 8,
        borderRadius: 10,
    },
    BasicButtonText: {
        color: "white",
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 20
    },
})