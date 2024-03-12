import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { styles } from '../style';
import BasicButton from '../basics/button';
import LinkText from '../basics/linkText';
import { registerUser, fetchUsers } from '../utility/apiRequests';

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    console.log("Registeration data:")
    console.log("firstName: ", firstName)
    console.log("lastName: ", lastName)
    console.log("userame: ", username)
    console.log("email: ", email)
    console.log("password: ", password)

    try {
      const userData = {
          first_name: firstName,
          last_name: lastName,
          user_name: username,
          email: email,
          password: password
      };
      const response = await registerUser(userData);
      console.log('User registered successfully:', response);
      navigation.navigate('Home', {response})
    }catch (error) {
      console.error('Error registering user:', error);
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
          <Text style={styles.text}>First Name:</Text>
          <TextInput
            style = {styles.inputBar}
            placeholder='Ivan'
            onChangeText={setFirstName}
          />

          <Text style={styles.text}>Last Name:</Text>
          <TextInput
            style = {styles.inputBar}
            placeholder='Ivanov'
            onChangeText={setLastName}
          />

          <Text style={styles.text}>Username:</Text>
          <TextInput
            style = {styles.inputBar}
            placeholder='VankataPower'
            onChangeText={setUsername}
          />

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

        <BasicButton text='Register' onPress={handleRegister} />
        <LinkText textBefore='Already have an account? ' linkedText='Login here' onPress={() => navigation.navigate('Login')} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
