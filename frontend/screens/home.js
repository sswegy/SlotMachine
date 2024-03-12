import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { styles } from '../style';
import BasicButton from '../basics/button';
import { useRoute } from '@react-navigation/native'; 


export default function Home({ navigation }) {
  const route = useRoute()
  const userData = route.params.response

  return (
    <View style={styles.container}>
      <View style={styles.registerBox}>
        <Text>{userData.user_name}</Text>
        <Image
            style={{ width: 200, height: 200 }}
            source={{
                uri: userData.qr_code
            }}
        />
        <BasicButton text='Back' onPress={() => navigation.goBack()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
