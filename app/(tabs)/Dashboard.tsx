import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Import icons for the plus sign
import { useRouter } from 'expo-router';
import TypeWriter from 'react-native-typewriter';

const Dashboard = () => {
  // Get the current month and year
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const router = useRouter(); // Initialize the router

  // Calculate the start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  // Create an array of dates for the week (Sunday to Saturday)
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });

  // Days of the week
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Render each date with its label
  const renderItem = ({ item, index }) => {
    const isToday = item.toDateString() === currentDate.toDateString();
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.labelText}>{dayLabels[index]}</Text>
        <View style={[styles.dateCircle, isToday && styles.today]}>
          <Text style={styles.dayValues}>{item.getDate()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{monthYear}</Text>
      <View style={styles.weekContainer}>
        <FlatList
          data={weekDates}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          horizontal
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
      {/* Typewriter Effect */}
      <View style={styles.chatTextContainer}>
        <TypeWriter typing={1} style={styles.chatText}>
          AI: Hey there, Misa. Glad to see you are back, ready for a new workout?
        </TypeWriter>
      </View>
      <Text style={styles.previousWorkoutsText}>Previous Workouts</Text>
      {/* You can add a list or additional content here for previous workouts */}

      {/* Floating Plus Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => router.push('/workoutsView')}>
        <Ionicons name="rocket" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    paddingTop: 80,
    paddingLeft: 20, 
    backgroundColor: Colors.colors.background,
  },
  dateText: {
    fontSize: 40, // Increased font size for month and year
    color: Colors.colors.text,
    marginBottom: 20, // Increased space below the date
  },
  weekContainer: {
    backgroundColor: 'white',
    marginTop: 30,
    marginLeft: 20,
    borderWidth: 8,
    borderColor: 'white',
    borderRadius: 10,
    height: 65, // Adjusted height to fit labels and dates
    justifyContent: 'center',
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  flatListContainer: {
    alignItems: 'center',
  },
  dateContainer: {
    alignItems: 'center', // Center items horizontally
    marginHorizontal: 5,
  },
  dateCircle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 15,
  },
  today: {
    backgroundColor: Colors.colors.primary,
  },
  labelText: {
    fontSize: 12, // Font size for day labels
    color: 'Black',
  },
  chatTextContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  chatText: {
    fontSize: 14,
    backgroundColor: Colors.colors.grey,  // Ensure visibility of text
    color: 'white',  // Ensure text color is not blending into background
    marginRight: 18,
    paddingLeft: 10, // Add padding for better readability
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 26,
    color: Colors.colors.text,
  },
  dayValues: {
    fontSize: 16,
    color: 'Black',
  },
  previousWorkoutsText: {
    fontSize: 20, // Adjust font size for the "Previous Workouts" label
    color: Colors.colors.text,
    marginTop: 20, // Space above the label
    marginLeft: 0, // Align with other text
  },
  // Floating Button Styles
  floatingButton: {
    position: 'absolute', // Make the button float
    bottom: 30, // Distance from the bottom of the screen
    right: 30, // Distance from the right of the screen
    backgroundColor: Colors.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30, // Make the button circular
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
});

export default Dashboard;


