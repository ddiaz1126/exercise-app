import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import Colors from "@/constants/Colors";
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';
import TypeWriter from 'react-native-typewriter';
import ChatButton from '../../components/ChatButton'; 
import CustomButton from '@/components/CustomButton';

const Account = () => {
  const router = useRouter();

  const [chatbotResponse, setChatbotResponse] = useState(null);

  const handleChatResponse = (response) => {
    setChatbotResponse(response); // Update chatbot response
  };

  const [isEnabled, setIsEnabled] = useState(false); // Track switch state

  const toggleSwitch = () => setIsEnabled(previousState => !previousState); 

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {/* Account Header */}
        <Text style={styles.headerText}>Account</Text>
        {/* Settings Icon */}
        <TouchableOpacity onPress={() => router.push('/Settings')} style={styles.settingsIcon}>
            <Ionicons name="settings-outline" size={28} color={Colors.colors.text} />
        </TouchableOpacity>
      </View>
      {/* Profile Overview Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={30} color={Colors.colors.text} style={styles.arrowIcon} />
      </View>
      {/* Chatbot Response */}
      <View style={styles.chatTextContainer}>
        <TypeWriter typing={1} style={styles.chatText}>
          {chatbotResponse || "Hello there! How can I assist you today?"}
        </TypeWriter>
      </View>
      {/* Preferences */}
      <View style={styles.preferencesContainer}>
        <View style={styles.preferencesTextContainer}>
          <Text style={styles.preferenceName}>Preferences</Text>
        </View>
        <Switch
        trackColor={{ false: Colors.colors.grey, true: Colors.colors.primary }}
        thumbColor={isEnabled ? Colors.colors.grey : Colors.colors.grey}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
        <Ionicons name="chevron-forward-outline" size={30} color={Colors.colors.text} style={styles.arrowIcon} />
      </View>

      {/* Log Out Button */}
      <View style={styles.footer}>
        <CustomButton
            onPress={() => router.push('/')} // Update to call handleLogin
            title="Log Out"
            style={styles.logoutButton} 
        />
      </View>

      {/* Chat Button */}
      <ChatButton onResponse={handleChatResponse} /> {/* Pass handleChatResponse to ChatButton */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.background,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    headerText: {
      fontSize: 32,
      fontWeight: '700',
      color: Colors.colors.text,
      textAlign: 'center', // Center the text
      flex: 1, // Allow the title to take up the available space between the icon
  },
    titleContainer: {
      flexDirection: 'row', // Align items horizontally
      justifyContent: 'space-between', // Space between the text and the icon
      alignItems: 'center', // Vertically center the items
      width: '100%', // Ensure it takes full width
      paddingHorizontal: 20, // Add some padding to the sides for spacing
      marginTop: 40, // Adjust the margin if needed
      marginLeft: 15,
  },
    settingsIcon: {
        // position: 'relative',
    },
    arrowIcon: {
      marginRight: 0, // Add some space between the text and the arrow
    },
    profileSection: {
      flexDirection: 'row', // Align items horizontally
      alignItems: 'center', // Vertically center the profile image and text
      marginTop: 40,
      backgroundColor: Colors.colors.grey,
      padding: 10,
      borderRadius: 5,
    },
    preferencesContainer: {
      flexDirection: 'row', // Align items horizontally
      alignItems: 'center', // Vertically center the profile image and text
      marginTop: 40,
      backgroundColor: Colors.colors.grey,
      padding: 10,
      borderRadius: 5,
    },
    preferencesTextContainer: {
      justifyContent: 'flex-start', // Align text to the top of the container
      paddingRight: 147,
    },
    profileImage: {
      width: 70,
      height: 70,
      borderRadius: 50,
      marginRight: 30, // Add space between the image and text
    },
    preferenceName: {
      marginRight: 10,
      color: 'white',
      fontSize: 16, 
    },
    profileTextContainer: {
      justifyContent: 'flex-start', // Align text to the top of the container
      paddingRight: 35,
    },
    profileName: {
      fontSize: 20,
      fontWeight: '600',
      color: Colors.colors.text,
    },
    profileEmail: {
      fontSize: 16,
      color: 'white',
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
    optionsSection: {
        marginTop: 30,
        width: '100%',
    },
    optionButton: {
        backgroundColor: Colors.colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    optionText: {
        color: 'white',
        fontSize: 16,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        marginTop: 40,
    },
    logoutButton: {
        backgroundColor: Colors.colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 50,
        width: '80%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    switch: {
      marginRight: 30, // Optional, add space between switch and the text
    },
});

export default Account;
