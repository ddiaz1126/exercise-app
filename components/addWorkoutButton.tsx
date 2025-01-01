import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from "@/constants/Colors";

interface AddWorkoutButtonProps {
  onPress: () => void;
}

const AddWorkoutButton: React.FC<AddWorkoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom
    left: 20, // Distance from the left
    backgroundColor: Colors.colors.primary,
    borderRadius: 50, // Fully rounded
    width: 60, // Width of the button
    height: 60, // Height of the button
    alignItems: 'center', // Center the icon horizontally
    justifyContent: 'center', // Center the icon vertically
    shadowColor: '#000', // Shadow color
    shadowOpacity: 0.2, // Shadow transparency
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowRadius: 4, // Shadow blur
    elevation: 5, // For Android shadow
  },
});

export default AddWorkoutButton;
