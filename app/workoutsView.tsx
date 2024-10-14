import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors'; // Assuming you have a Colors constant file
import { useRouter } from 'expo-router';

const WorkoutsView = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back button in the top-left */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Workout Name aligned to the top and centered */}
      <Text style={styles.title}>Workout Name</Text>

      {/* Other components or workout details can go below */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: Colors.colors.background,
    alignItems: 'center', // Centers content horizontally
  },
  backButton: {
    position: 'absolute', // Places it in the top-left corner
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 18,
    color: Colors.colors.primary, // Change to whatever color fits your design
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default WorkoutsView;
