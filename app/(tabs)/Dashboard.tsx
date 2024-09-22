import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from "@/constants/Colors";
import React from 'react';

const Dashboard = () => {
  // Get the current month and year
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

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
      <Text style={styles.previousWorkoutsText}>Previous Workouts</Text>
      {/* You can add a list or additional content here for previous workouts */}
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
});

export default Dashboard;

