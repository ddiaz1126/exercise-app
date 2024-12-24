import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";
import SearchBox from '@/components/SearchBox';
import ScrollingFilter from '@/components/ScrollingFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken'); // Retrieve the token
      try {
        const response = await fetch('http://127.0.0.1:8000/api/exercises/', {
          headers: {
            Authorization: `Token ${token}`, // Include the token in the headers
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setError(error.message); // Set error message for display
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemPress = (item) => {
    console.log(`Selected: ${item.name}`);
    // Handle the item selection here (e.g., filter exercises)
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.colors.primary} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.colors.background }}>
      <SearchBox
        placeholder="Search Exercises"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollingFilter
        items={['Chest', 'Back', 'Quads', 'Hamstring', 'Biceps', 'Triceps', 'Calves']}
        onItemPress={handleItemPress}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id.toString()} // Ensure you have a unique key
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDescription}>{item.description}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addExercise')}>
        <Text style={styles.addButtonText}>Add Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseItem: {
    paddingVertical: 15,
    paddingHorizontal: 10, // Add padding for left alignment
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '100%', // Make it take up the full width of the screen
  },
  exerciseName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'left', // Ensure the text is aligned to the left
  },
  exerciseDescription: {
    color: 'white',
    textAlign: 'left', // Ensure the text is aligned to the left
  },
  errorText: {
    color: 'red',
    margin: 10,
  },
  addButton: {
    backgroundColor: Colors.colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '90%', // Adjust width as needed
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Exercises;