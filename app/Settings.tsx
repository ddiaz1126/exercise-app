import { View, Text, StyleSheet } from 'react-native';
import Colors from "@/constants/Colors";
import React from 'react';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      {/* Add other settings options here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.colors.text,
    marginBottom: 20, // Space below the title
  },
});

export default Settings;