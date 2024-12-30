import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import SearchBox from '@/components/SearchBox';
import ScrollingFilter from '@/components/ScrollingFilter';
import ChatButton from '../../components/ChatButton'; 
import { Ionicons } from '@expo/vector-icons';
import TypeWriter from 'react-native-typewriter';

const Trainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState<string | null>(null);

  const handleChatResponse = (response: string) => {
    setChatbotResponse(response); // Update chatbot response
  };

  const handleItemPress = (item: string) => {
    console.log(`Selected: ${item}`);
    // Handle the item selection here (e.g., filter exercises)
  };

  return (
    <View style={styles.container}>
      <SearchBox
        placeholder="Search Trainers"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollingFilter
        items={['Near Me', 'Online', 'Powerlifting', 'Yoga', 'Crossfit', 'Weightlifting', 'Sports']}
        onItemPress={handleItemPress}
      />
      <View style={styles.chatTextContainer}>
        <Text>
          <TypeWriter typing={1} style={styles.chatText}>
            {chatbotResponse || "Hello there! How can I assist you today?"}
          </TypeWriter>
        </Text>
      </View>
      {/* Scrollable Information Rows */}
      <ScrollView style={styles.infoContainer}>
        {Array.from({ length: 20 }, (_, index) => (
          <View key={index} style={styles.infoRow}>
            <Text style={styles.infoText}>Trainer {index + 1}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Floating Chat Button */}
      <ChatButton onResponse={handleChatResponse} /> {/* Pass handleChatResponse to ChatButton */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
    alignItems: 'center',
  },
  chatTextContainer: {
    marginTop: 0,
    marginBottom: 10,
  },
  chatText: {
    fontSize: 14,
    backgroundColor: Colors.colors.grey,
    color: 'white',
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1, // Allow the ScrollView to take remaining space
    width: '100%', // Make the ScrollView take the full width
    marginTop: 10,
    paddingHorizontal: 20,
  },
  infoRow: {
    padding: 15,
    // backgroundColor: Colors.colors.grey,
    marginBottom: 10,
    borderRadius: 8,
    borderBottomWidth: 1, // Add bottom border for separation
    borderBottomColor: 'white',
  },
  infoText: {
    fontSize: 16,
    color: Colors.colors.primary,
  },
});

export default Trainer;
