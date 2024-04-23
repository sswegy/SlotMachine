import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity, Modal, SafeAreaView, ScrollView, ImageBackground, } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign, Ionicons, MaterialIcons, FontAwesome, } from "@expo/vector-icons";
import { homeStyles } from "../styles/homeStyle";
import { getUserTransactions, getLeaderboard } from "../utility/apiRequests";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {
  const route = useRoute();
  const userData = route.params.response;

  const [visibleQR, setVisibleQR] = useState(false);
  const showQR = () => {
    setVisibleQR(true);
  };
  const hideQR = () => {
    setVisibleQR(false);
  };

  const [visibleTransactions, setTransactions] = useState(false);
  const showTransactions = () => {
    setTransactions(true);
  };
  const hideTransactions = () => {
    setTransactions(false);
  };

  const [userTransactions, setUserTransactions] = useState([[]]);
  const [selectedButton, setSelectedButton] = useState("leaderboard"); // shte e "leaderboard", "calendar", "games"
  const [leaderboard, setLeaderboard] = useState("");

  useEffect(() => {
    getLeaderboardStats();
  }, []);

  const getTransactions = async () => {
    try {
      const response = await getUserTransactions(userData.id);
      setUserTransactions(response);
    } catch (error) {
      console.error("Error getting transactions:", error);
    }
  };

  const getLeaderboardStats = async () => {
    try {
      const response = await getLeaderboard();
      setLeaderboard(response);
    } catch (error) {
      console.error("Error getting leaderboard:", error);
    }
  }

  return (
    <ImageBackground
      style={homeStyles.container}
      source={require("../assets/background-image.png")}
    >
      <View style={homeStyles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="exit-to-app" size={36} color="#D8B400" />
        </TouchableOpacity>
        <TouchableOpacity
          style={homeStyles.balance}
          onPress={() => {
            getTransactions();
            showTransactions();
          }}
        >
          <Text style={{ fontSize: 16 }}>{userData.balance}</Text>
          <MaterialIcons name="attach-money" size={16} color="black" />
        </TouchableOpacity>
      </View>

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5]}
        colors={["#D8B400", "rgba(186, 29, 29, 1)"]}
        style={homeStyles.nameContainer}
      >
        <Text style={{ fontSize: 36, fontWeight: "800" }}>
          {userData.first_name} {userData.last_name}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>
          {userData.user_name}
        </Text>
        <TouchableOpacity onPress={showQR}>
          <AntDesign name="qrcode" size={36} color="black" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={homeStyles.utilityContainer}>
        <View style={homeStyles.buttonsContainer}>
          <TouchableOpacity style={selectedButton === "leaderboard" ? homeStyles.selectedButton : ""} onPress={() => setSelectedButton("leaderboard")}>
            <MaterialIcons name="leaderboard" size={42} color={selectedButton === "leaderboard" ? "#D8B400" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity style={selectedButton === "calendar" ? homeStyles.selectedButton : ""} onPress={() => setSelectedButton("calendar")}>
            <FontAwesome name="calendar" size={42} color={selectedButton === "calendar" ? "#D8B400" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity style={selectedButton === "games" ? homeStyles.selectedButton : ""} onPress={() => setSelectedButton("games")}>
            <FontAwesome name="gamepad" size={42} color={selectedButton === "games" ? "#D8B400" : "black"} />
          </TouchableOpacity>
        </View>
        <View style={homeStyles.interactiveTables}>
          {leaderboard != "" && (
            <ScrollView>
              {leaderboard[0].map((item, index) => (
                <View key={index} style={item.id === userData.id ? homeStyles.currentPlayerRow : homeStyles.playerRow}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 24, fontWeight: "600" }}>{index + 1}. </Text>
                    <Text style={{ fontSize: 24, fontWeight: "600" }}>{item.user_name}</Text>
                  </View>
                  <Text style={{ fontSize: 24, fontWeight: "600" }}>{item.balance}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      <Image source={require("../assets/playNonStop.png")} style={homeStyles.logo} />


      <Modal visible={visibleQR} animationType="slide" onRequestClose={hideQR} transparent>
        <SafeAreaView style={homeStyles.modal}>
          <View style={homeStyles.modalContainer}>
            <TouchableOpacity onPress={hideQR}>
              <AntDesign name="closecircleo" size={36} color="#D8B400" style={{ paddingBottom: 10 }} />
            </TouchableOpacity>
            <Image
              style={{ width: "100%", height: 300, borderWidth: 3, borderColor: "maroon", borderRadius: 60 }}
              source={{
                uri: userData.qr_code,
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>

      <Modal visible={visibleTransactions} animationType="slide" onRequestClose={hideTransactions} transparent>
        <SafeAreaView style={homeStyles.modal}>
          <View style={homeStyles.modalContainer}>
            <TouchableOpacity onPress={hideTransactions}>
              <Ionicons name="chevron-back-circle-outline" size={36} color="black" />
            </TouchableOpacity>

            <ScrollView style={homeStyles.transactionTable}>
              {userTransactions[0].map((item, index) => (
                <View key={index} style={homeStyles.transactionRow}>
                  <Text>{item.type}</Text>
                  <Text>{item.amount}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}
