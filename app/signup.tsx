import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";
import { useRouter } from 'expo-router';
import { addClient } from '@/utils/database'; // Ensure this imports the correct addClient function

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
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={Colors.colors.grey}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.colors.grey}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.colors.grey}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={Colors.colors.grey}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} color={Colors.colors.buttonBackground} />
      <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Have an account already?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.colors.background,
  },
  title: {
    fontSize: Colors.fonts.size.large,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.colors.text,
    fontFamily: Colors.fonts.bold,
  },
  input: {
    height: 40,
    borderColor: Colors.colors.grey,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: Colors.colors.text,
    backgroundColor: Colors.colors.dark,
  },
  loginContainer: {
    flexDirection: 'row', // Aligns text and link in a row
    justifyContent: 'center',
    marginTop: 40, // Adjust this value as needed
  },
  loginText: {
    color: 'white',
  },
  loginLink: {
    color: 'lightblue',
    fontWeight: 'bold',
  },
});

export default SignUp;