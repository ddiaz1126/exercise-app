import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Colors from "@/constants/Colors";
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TypeWriter from 'react-native-typewriter';
import ChatButton from '../../components/ChatButton'; 

const Dashboard = () => {
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const router = useRouter();

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });
  
  const [chatbotResponse, setChatbotResponse] = useState(null);

  const handleChatResponse = (response) => {
    setChatbotResponse(response); // Update chatbot response
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderItem = ({ item, index }) => {
    const isToday = item.toDateString() === currentDate.toDateString();
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.labelText}>{dayLabels[index]}</Text>
        <View style={[styles.dateCircle, isToday && styles.today]}>
          <Text style={styles.dayValues}>{item.getDate()}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    >
      <Text style={styles.dateText}>{monthYear}</Text>
      <View style={styles.weekContainer}>
        <FlatList
          data={weekDates}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          horizontal
          contentContainerStyle={styles.flatListContainer}
        />
      </View>

      <View style={styles.chatTextContainer}>
        <TypeWriter typing={1} style={styles.chatText}>
          {chatbotResponse || "Hello there! How can I assist you today?"}
        </TypeWriter>
      </View>

      <Text style={styles.previousWorkoutsText}>Previous Workouts</Text>

      {/* Floating Button */}
      <ChatButton onResponse={handleChatResponse} /> {/* Pass handleChatResponse to ChatButton */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    paddingTop: 80,
    paddingLeft: 20, 
    backgroundColor: Colors.colors.background,
  },
  weekContainer: {
    backgroundColor: 'white',
    width: 360,
    marginTop: 30,
    marginLeft: 0,
    borderWidth: 8,
    borderColor: 'white',
    borderRadius: 10,
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  dateCircle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 15,
  },
  today: {
    backgroundColor: 'lightgrey',
  },
  labelText: {
    fontSize: 12,
    color: 'Black',
  },
  chatTextContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  chatText: {
    fontSize: 14,
    backgroundColor: Colors.colors.grey,
    color: 'white',
    marginRight: 18,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 26,
    color: Colors.colors.text,
  },
  dayValues: {
    fontSize: 16,
    color: 'Black',
  },
  previousWorkoutsText: {
    fontSize: 20,
    color: Colors.colors.text,
    marginTop: 20,
  },
});

export default Dashboard;
