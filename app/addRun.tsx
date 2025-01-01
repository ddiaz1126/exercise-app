import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from "@/constants/Colors";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AddCardio = () => {
  const [activityType, setActivityType] = useState('Run'); // Default activity type
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Timer in seconds
  const [distance, setDistance] = useState(0); // Distance in kilometers (optional)
  const router = useRouter();

  const startTracking = () => {
    setIsTracking(true);
    setElapsedTime(0); // Reset timer
    // Add GPS tracking logic here if needed
  };

  const stopTracking = async () => {
    setIsTracking(false);
    const token = await AsyncStorage.getItem('userToken'); // Retrieve the token
    try {
      const response = await axios.post('http://10.0.0.103:8000/api/workouts/', {
        type: activityType,
        duration: elapsedTime,
        distance: distance, // Include distance if GPS tracking is added
      }, {
        headers: {
          Authorization: `Token ${token}`, // Include the token in the headers
        },
      });
      Alert.alert('Success', 'Workout saved successfully!');
      router.push('/workouts'); // Navigate back to workouts
    } catch (error) {
      console.error('Error saving workout:', error);
      Alert.alert('Error', 'Failed to save workout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Cardio</Text>

      {/* Activity Type Selector */}
      <View style={styles.activitySelector}>
        {['Run', 'Bike', 'Walk'].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setActivityType(type)}
            style={[
              styles.activityButton,
              activityType === type && styles.activityButtonSelected,
            ]}
          >
            <Text style={styles.activityText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timer and Metrics */}
      <View style={styles.metrics}>
        <Text style={styles.metricText}>Time: {elapsedTime} sec</Text>
        <Text style={styles.metricText}>Distance: {distance} km</Text>
      </View>

      {/* Start, Pause, Stop Buttons */}
      {!isTracking ? (
        <TouchableOpacity style={styles.button} onPress={startTracking}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={stopTracking}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => router.push('/runs')}
      >
        <Text style={styles.buttonText}>Cancel</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  activitySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  activityButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activityButtonSelected: {
    backgroundColor: Colors.colors.primary,
  },
  activityText: {
    color: 'white',
  },
  metrics: {
    marginBottom: 20,
  },
  metricText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddCardio;
