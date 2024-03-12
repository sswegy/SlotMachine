import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function LinkText({ textBefore, linkedText, onPress }){
    return(
        <View style={styles.container}>
            <Text style = {styles.textBefore}>{ textBefore }</Text>
            <TouchableOpacity onPress={ onPress }>
                <Text style = {styles.linkedText}>{ linkedText }</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    linkedText: {
        color: "maroon",
        fontSize: 16
    },
    textBefore: {
        color: "black",
        fontSize: 16
    },
})