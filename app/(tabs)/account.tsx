import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';

const Account = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account</Text>
      <TouchableOpacity onPress={() => router.push('/Settings')} style={styles.settingsIcon}>
        <Ionicons name="settings-outline" size={24} color={Colors.colors.text} />
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.logoutLink}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Keep title at the top and push footer down
        alignItems: 'flex-start', // Align items to the left
        backgroundColor: Colors.colors.background,
        padding: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.colors.text,
        marginTop: 40,
    },
    settingsIcon: {
        position: 'absolute',
        top: 60,
        right: 30,
    },
    footer: {
      justifyContent: 'center', // Center content in footer
      alignItems: 'center', // Center horizontally
      marginBottom: 20, // Add some space from the bottom
      width: '100%', // Ensure it takes full width
    },
    logoutLink: {
      color: 'lightblue',
      fontWeight: 'bold',
      fontSize: 20,
    },
});

export default Account;
