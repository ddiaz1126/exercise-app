import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { validateClient } from '@/utils/database'; // Import validateClient function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this is imported
import TypeWriter from 'react-native-typewriter';
import Colors from '@/constants/Colors';

const App = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await validateClient(email, password);
      if (user) {
        // Retrieve and log the token
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token stored:', token); // Check if the token matches
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
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.container}>
        <SafeAreaView style={styles.innerContainer}>
          <View style={styles.chatTextContainer}>
              <TypeWriter typing={1} style={styles.chatText}>
              AI : Welcome back! I’ve been analyzing your activities and can’t wait to see how today goes. Let’s get you logged in and ready to continue your journey
              </TypeWriter>
          </View>
          {/* <Text style={styles.title}>Sign In</Text> */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="grey"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="grey"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <CustomButton
            onPress={handleLogin} // Update to call handleLogin
            title="Login"
          />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account yet?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 80,
    marginTop: 40,
  },
  inputContainer: {
    marginTop: 130,
    marginBottom: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 160,
  },
  label: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
  },
  button: {
    width: '10%',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signupText: {
    color: 'white',
  },
  signupLink: {
    color: 'lightblue',
    fontWeight: 'bold',
    marginBottom: 120,
  },
  chatTextContainer: {
    marginBottom: 90,
    width: '100%',
    position: 'absolute',  // Optional: Space between the container and top elements
  },
  
  chatText: {
    fontSize: 18,
    backgroundColor: Colors.colors.grey, // Ensure visibility of text
    borderRadius: 10,
    color: 'white', // Ensure text color is not blending into background
    marginRight: 0,
    paddingLeft: 10, // Add padding for better readability
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 5,
    fontFamily: 'Roboto Mono',  // Monospace font for a "robotic" feel
    letterSpacing: 1.5, // Increase space between characters
    lineHeight: 30,  // Increase space between lines to make text easier to read
    fontWeight: 'bold', // Make it bold for a stronger "robotic" appearance
  },
});

export default App;