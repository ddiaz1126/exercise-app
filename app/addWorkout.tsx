import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from "@/constants/Colors";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AddWorkout = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [duration, setDuration] = useState(''); // New field for workout duration
  const router = useRouter();

  const handleAddWorkout = async () => {
    const token = await AsyncStorage.getItem('userToken'); // Retrieve the token
    try {
      const response = await axios.post('http://10.0.0.103:8000/api/workouts/', {
        name: workoutName,
        description: workoutDescription,
        duration: duration, // Include duration in the request
      }, {
        headers: {
          Authorization: `Token ${token}`, // Include the token in the headers
        },
      });
      Alert.alert('Success', 'Workout added successfully!');
      router.push('/workouts'); // Navigate back to workouts
    } catch (error) {
      console.error('Error adding workout:', error);
      Alert.alert('Error', 'Failed to add workout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back link at the top left */}
      <TouchableOpacity onPress={() => router.push('/workouts')} style={styles.backLink}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add a Workout</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        placeholderTextColor="grey"
        value={workoutName}
        onChangeText={setWorkoutName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Notes"
        placeholderTextColor="grey"
        value={workoutDescription}
        onChangeText={setWorkoutDescription}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Date"
        placeholderTextColor="grey"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric" // To allow only numbers
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/workoutsView')}>
        <Text style={styles.buttonText}>Add Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.colors.background,
    justifyContent: 'center',
  },
  backLink: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backText: {
    color: Colors.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: Colors.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddWorkout;