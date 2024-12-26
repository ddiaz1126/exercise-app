import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { validateClient } from '@/utils/database';
import Colors from '@/constants/Colors';
import TypeWriter from 'react-native-typewriter';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await validateClient(email, password);
      if (user) {
        Alert.alert('Success', 'Login successful');
        router.push('/Dashboard'); 
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatTextContainer}>
        <TypeWriter typing={true} style={styles.chatText}>
          AI: Your latest run has shown some big improvements! It was 2 mins longer than usual, and your mean heart rate is 2 bpm lower.
        </TypeWriter>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  chatTextContainer: {
    marginTop: 0,
    marginBottom: 20,
  },
  chatText: {
    fontSize: 14,
    backgroundColor: Colors.colors.grey,  // Ensure visibility of text
    color: 'white',  // Ensure text color is not blending into background
    marginRight: 18,
    paddingLeft: 10, // Add padding for better readability
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 5,
  },
});

export default Login;
