import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, Modal, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { homeStyles } from '../styles/homeStyle';
import { getUserTransactions } from '../utility/apiRequests';



export default function Home({ navigation }) {
  const route = useRoute()
  const userData = route.params.response

  const [visibleQR, setVisibleQR] = useState(false);
  const showQR = () => { setVisibleQR(true) };
  const hideQR = () => { setVisibleQR(false) };

  const [visibleTransactions, setTransactions] = useState(false);
  const showTransactions = () => { setTransactions(true) };
  const hideTransactions = () => { setTransactions(false) };

  const [userTransactions, setUserTransactions] = useState([[]])

  const getTransactions = async () => {
    try {
      const response = await getUserTransactions(userData.id);
      setUserTransactions(response);
      console.log('Transactions:', response);
    } catch (error) {
      console.error('Error getting transactions:', error);
    }
  }

  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-outline" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.balance} onPress={() => { getTransactions(); showTransactions(); }}>
          <Text style={{ fontSize: 16 }}>{userData.balance}</Text>
          <MaterialIcons name="attach-money" size={16} color="black" />
        </TouchableOpacity>
      </View>

      <AntDesign name="smile-circle" size={128} color="green" />
      <Text style={{ fontSize: 36 }}>{userData.user_name}</Text>
      <TouchableOpacity onPress={showQR}>
        <AntDesign name="qrcode" size={24} color="black" />
      </TouchableOpacity>

      <Modal visible={visibleQR} animationType='slide' onRequestClose={hideQR} transparent>
        <SafeAreaView style={homeStyles.modal}>
          <View style={homeStyles.modalContainer}>
            <TouchableOpacity onPress={hideQR}>
              <Ionicons name="chevron-back-circle-outline" size={36} color="black" />
            </TouchableOpacity>
            <Image
              style={{ width: '100%', height: 300 }}
              source={{
                uri: userData.qr_code
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>

      <Modal visible={visibleTransactions} animationType='slide' onRequestClose={hideTransactions} transparent>
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
    </SafeAreaView>
  );
}
