import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { styles } from '../style';
import BasicButton from '../basics/button';
import LinkText from '../basics/linkText';
import { loginUser } from '../utility/apiRequests';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    console.log("Login data:")
    console.log("email: ", email)
    console.log("password: ", password)

    try {
      const userData = {
          email: email,
          password: password
      };
      const response = await loginUser(userData);
      console.log('User logged in successfully:', response);
      navigation.navigate('Home', {response})
    }catch (error) {
      console.error('Error loging in user:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.registerBox}>
        <Image 
          source={require('../assets/epichno-logo.png')}
          style = {styles.logo}
        />

        <View style={styles.inputBox}>
          <Text style={styles.text}>Email:</Text>
          <TextInput
            style = {styles.inputBar}
            placeholder='ivan.ivanov@gmail.com'
            onChangeText={setEmail}
            keyboardType='email-address'
          />

          <Text style={styles.text}>Password:</Text>
          <TextInput
            style = {styles.inputBar}
            placeholder='*********'
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <BasicButton text='Login' onPress={handleRegister} />
        <LinkText textBefore="Don't have an account? " linkedText='Register here' onPress={() => navigation.goBack()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
