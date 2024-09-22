import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const App = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.container}>
        <SafeAreaView style={styles.innerContainer}>
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="grey"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
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
            onPress={() => router.push('/Dashboard')}
            title="Login"
            style={styles.button}
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
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
    flexDirection: 'row', // Aligns text and link in a row
    justifyContent: 'center',
    marginTop: 40, // Adjust this value as needed
  },
  signupText: {
    color: 'white',
  },
  signupLink: {
    color: 'lightblue',
    fontWeight: 'bold',
  },
});

export default App;