import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function LinkText({ textBefore, linkedText, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textBefore}>{textBefore}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.linkedText}>{linkedText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  linkedText: {
    color: "#D8B400",
    fontStyle: 'italic',
    fontSize: 16,
  },
  textBefore: {
    fontWeight: "500",
    fontSize: 16,
    color: "black",
  },
});
