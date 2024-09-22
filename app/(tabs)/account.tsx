import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed
import { useRouter } from 'expo-router';

const Account = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account</Text>
      <TouchableOpacity onPress={() => router.push('/Settings')} style={styles.settingsIcon}>
        <Ionicons name="settings-outline" size={24} color={Colors.colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'flex-start', // Align items to the left
        backgroundColor: Colors.colors.background,
        padding: 20, // Add some padding
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.colors.text,
        marginTop: 40, // Use margin instead of top
    },
    settingsIcon: {
        position: 'absolute',
        top: 60, // Adjust the vertical position
        right: 30,
    },
});

export default Account;