import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from "@/constants/Colors";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AddExercise = () => {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const router = useRouter();

  const handleAddExercise = async () => {
    const token = await AsyncStorage.getItem('userToken'); // Retrieve the token
    try {
      const response = await axios.post('http://10.0.0.103:8000/api/exercises/', {
        name: exerciseName,
        description: exerciseDescription,
      }, {
        headers: {
          Authorization: `Token ${token}`, // Include the token in the headers
        },
      });
      Alert.alert('Success', 'Exercise added successfully!');
      router.push('/exercises'); // Navigate back to exercises
    } catch (error) {
      console.error('Error adding exercise:', error);
      Alert.alert('Error', 'Failed to add exercise. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back link at the top left */}
      <TouchableOpacity onPress={() => router.push('/exercises')} style={styles.backLink}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add an Exercise</Text>
      <TextInput
        style={styles.input}
        placeholder="Exercise Name"
        placeholderTextColor="grey"
        value={exerciseName}
        onChangeText={setExerciseName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="grey"
        value={exerciseDescription}
        onChangeText={setExerciseDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddExercise}>
        <Text style={styles.buttonText}>Add Exercise</Text>
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

export default AddExercise;