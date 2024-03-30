import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from '../styles/style';
import BasicButton from '../basics/button';
import LinkText from '../basics/linkText';
import { loginUser } from '../utility/apiRequests';
import { Ionicons } from '@expo/vector-icons';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  const handleRegister = async () => {
    if(email === "" || password === ""){
      setErrorText("Please, fill all the fields!");
      return;
    }

    try {
      const userData = {
          email: email,
          password: password
      };
      const response = await loginUser(userData);
      console.log('User logged in successfully:', response);
      setErrorText("");
      navigation.navigate('Home', {response});
    }catch (error) {
      console.error('Error loging in user:', error.message);
      setErrorText(error.message);
    }
  }

  return (
    <ImageBackground style={styles.container} source={require("../assets/background-image.png")}>
      <View style={styles.registerBox}>
        <Image 
          source={require("../assets/betNONSTOP-logo.png")}
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
          <View style={styles.passwordInputField}>
            <TextInput
              style={styles.passwordInputBar}
              placeholder='*********'
              secureTextEntry={isSecureTextEntry}
              onChangeText={setPassword}
              keyboardType='default'
            />
            <TouchableOpacity onPress={toggleSecureEntry}>
              <Ionicons name={isSecureTextEntry ? 'eye-off' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.errorText}>{errorText}</Text>
        <BasicButton text='Login' onPress={handleRegister} />
        <LinkText textBefore="Don't have an account? " linkedText='Register here' onPress={() => navigation.goBack()} />
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}
