import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {Text, View, TextInput, Image,TouchableOpacity, ImageBackground} from "react-native";
import { styles } from "../styles/style";
import BasicButton from "../basics/button";
import LinkText from "../basics/linkText";
import { registerUser } from "../utility/apiRequests";
import { Ionicons } from "@expo/vector-icons";

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  const handleRegister = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      setErrorText("Please, fill all the fields!");
      return;
    }

    try {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        user_name: username,
        email: email,
        password: password,
      };
      const response = await registerUser(userData);
      console.log("User registered successfully:", response);
      setErrorText("");
      navigation.navigate("Home", { response });
    } catch (error) {
      console.error("Error registering user:", error.message);
      setErrorText(error.message);
    }
  };

  return (
    <ImageBackground style={styles.container} source={require("../assets/background-image.png")}>
      <View style={styles.registerBox}>
        <Image
          source={require("../assets/playNonStop.png")}
          style={styles.logo}
        />
        <View style={styles.inputBox}>
          <View style={styles.fullNameBox}>
            <View style={styles.halfNameBox}>
              <Text style={styles.text}>First Name:</Text>
              <TextInput
                style={styles.inputBar}
                placeholder="Ivan"
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.halfNameBox}>
              <Text style={styles.text}>Last Name:</Text>
              <TextInput
                style={styles.inputBar}
                placeholder="Ivanov"
                onChangeText={setLastName}
              />
            </View>
          </View>

          <Text style={styles.text}>Username:</Text>
          <TextInput
            style={styles.inputBar}
            placeholder="VankataPower"
            onChangeText={setUsername}
          />

          <Text style={styles.text}>Email:</Text>
          <TextInput
            style={styles.inputBar}
            placeholder="ivan.ivanov@gmail.com"
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.text}>Password:</Text>
          <View style={styles.passwordInputField}>
            <TextInput
              style={styles.passwordInputBar}
              placeholder="*********"
              secureTextEntry={isSecureTextEntry}
              onChangeText={setPassword}
              keyboardType="default"
            />
            <TouchableOpacity onPress={toggleSecureEntry}>
              <Ionicons
                name={isSecureTextEntry ? "eye-off" : "eye"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.errorText}>{errorText}</Text>
        <BasicButton text="Register" onPress={handleRegister} />
        <LinkText
          textBefore="Already have an account? "
          linkedText="Login here"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}
