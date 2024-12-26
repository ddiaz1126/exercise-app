import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";
import { useRouter } from 'expo-router';
import { addClient } from '@/utils/database'; // Ensure this imports the correct addClient function
import CustomButton from '@/components/CustomButton';
import TypeWriter from 'react-native-typewriter';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    const username = email.split('@')[0];

    setIsLoading(true); // Start loading state

    try {
      await addClient(name, username, email, password);
      Alert.alert('Success', 'Account created successfully');
      router.push('/'); 
    } catch (error) {
      console.error('Sign Up error:', error);
      Alert.alert('Error', 'Failed to create account');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatTextContainer}>
              <TypeWriter typing={1} style={styles.chatText}>
              AI: Ready to join the community? Let’s create your account and get started! 
              </TypeWriter>
      </View>
      <View style={styles.signUpContainer}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        placeholderTextColor={'grey'}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor={'grey'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        placeholderTextColor={'grey'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your Password"
        placeholderTextColor={'grey'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <CustomButton
            onPress={handleSignUp} // Update to call handleLogin
            title="Sign Up"
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Have an account already?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: Colors.colors.background,
  },
  // title: {
  //   fontSize: Colors.fonts.size.large,
  //   marginBottom: 20,
  //   textAlign: 'center',
  //   color: Colors.colors.text,
  //   fontFamily: Colors.fonts.bold,
  // },
  input: {
    height: 40,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: Colors.colors.text,
    backgroundColor: Colors.colors.dark,
  },
  label: {
    color: 'white',
    marginBottom: 5,
  },
  loginContainer: {
    flexDirection: 'row', // Aligns text and link in a row
    justifyContent: 'center',
    marginTop: 20, // Adjust this value as needed
  },
  loginText: {
    color: 'white',
  },
  loginLink: {
    color: 'lightblue',
    fontWeight: 'bold',
  },
  signUpContainer: {
    marginTop: 180,
  },
  chatTextContainer: {
    marginBottom: 0,
    marginLeft: 20,
    marginTop: 80,
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

export default SignUp;