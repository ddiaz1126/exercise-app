import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ExerciseCard from '../components/exerciseCard';

const AddWorkout = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [exercises, setExercises] = useState([{ name: '', description: '', duration: '' }]); // Array of exercises
  const router = useRouter();

  const handleAddWorkout = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post('http://10.0.0.103:8000/api/workouts/', {
        name: workoutName,
        description: workoutDescription,
        duration: duration,
        exercises: exercises, // Send exercises data
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      Alert.alert('Success', 'Workout added successfully!');
      router.push('/workouts');
    } catch (error) {
      console.error('Error adding workout:', error);
      Alert.alert('Error', 'Failed to add workout. Please try again.');
    }
  };

  const handleExerciseChange = (index: number, updatedExercise: { name: string, description: string, duration: string }) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = updatedExercise;
    setExercises(updatedExercises);
  };

  const handleAddExercise = () => {
    if (exercises.length < 10) {
      setExercises([...exercises, { name: '', description: '', duration: '' }]); // Add a new empty exercise
    } else {
      Alert.alert('Limit Reached', 'You can only add up to 10 exercises.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back link at the top left */}
      <TouchableOpacity onPress={() => router.push('/workouts')} style={styles.backLink}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Workout 1</Text>
      
      {/* Notes Section: Label without a TextInput box */}
      <Text style={styles.notesLabel}>Notes</Text>

      {/* Free-form TextInput for Notes */}
      <TextInput
        style={[styles.input, styles.notesInput]} // Styling for the notes section
        placeholder="Add notes here..."
        placeholderTextColor="grey"
        value={workoutDescription}
        onChangeText={setWorkoutDescription}
        multiline
        numberOfLines={4}
      />

      {/* Scrollable Exercise Cards */}
      <ScrollView contentContainerStyle={styles.exerciseCardsContainer}>
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            exerciseName={exercise.name}
            description={exercise.description}
            duration={exercise.duration}
            onChange={(updatedExercise) => handleExerciseChange(index, updatedExercise)} // Pass the change handler
          />
        ))}
      </ScrollView>

      {/* Button to add new exercise */}
      <TouchableOpacity style={styles.addExerciseButton} onPress={handleAddExercise}>
        <Text style={styles.addExerciseText}>+ Add Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddWorkout}>
        <Text style={styles.buttonText}>Add Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 120,
    backgroundColor: Colors.colors.background,
  },
  backLink: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    marginTop: 30,
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
    marginBottom: 10,
    marginTop: -20,
    textAlign: 'center',
  },
  input: {
    height: 30,
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
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notesLabel: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10, // Space between label and input field
  },
  notesInput: {
    height: 40, // Adjust the height of the input field for notes
    textAlignVertical: 'top', // Align text to the top of the input
    paddingHorizontal: 10, // Padding inside the input field
    marginBottom: 0, // Space below the input field
    borderWidth: 0, // No border
    backgroundColor: 'transparent', // Transparent background to remove boxy appearance
    color: 'white', // White text color
    fontSize: 16, // Adjust font size if needed
  },
  exerciseCardsContainer: {
    paddingBottom: 20, // Add some padding to the bottom of the scroll view
  },
  addExerciseButton: {
    backgroundColor: Colors.colors.grey,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addExerciseText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddWorkout;
