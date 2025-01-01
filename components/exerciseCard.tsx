import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from "@/constants/Colors";

interface ExerciseCardProps {
  exerciseName: string;
  description: string;
  duration: string;
  onChange: (updatedExercise: { name: string, description: string, duration: string, sets: any[] }) => void;
}

interface Set {
  reps: string;
  weight: string;
  rir: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exerciseName, description, duration, onChange }) => {
  const [sets, setSets] = useState<Set[]>([{ reps: '', weight: '', rir: '' }]);

  const handleInputChange = (field: string, value: string, index: number) => {
    const updatedSets = [...sets];
    updatedSets[index] = { ...updatedSets[index], [field]: value };
    setSets(updatedSets);
    onChange({ name: exerciseName, description, duration, sets: updatedSets });
  };

  const handleRemoveSet = (index: number) => {
    const updatedSets = sets.filter((_, i) => i !== index);
    setSets(updatedSets);
    onChange({ name: exerciseName, description, duration, sets: updatedSets });
  };

  const handleAddSet = () => {
    if (sets.length < 6) {
      setSets([...sets, { reps: '', weight: '', rir: '' }]);
    } else {
      Alert.alert('Max sets reached', 'You can add up to 6 sets.');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Exercise Name</Text>

      {/* Row with Titles */}
      <View style={styles.setRow}>
        <Text style={[styles.setNumber, styles.setHeader]}>Set</Text>
        <Text style={[styles.setHeader, { marginLeft: 0 }]}>Reps</Text>  {/* Increased space */}
        <Text style={styles.setHeader}>Weight</Text>
        <Text style={styles.setHeader}>RIR</Text>
       </View>

      {/* Render rows */}
      {sets.map((set, index) => (
        <View key={index} style={styles.setRow}>
          <Text style={styles.setNumber}>{index + 1}</Text>
          <TextInput
            style={styles.setInput}
            placeholder="Reps"
            value={set.reps}
            onChangeText={(text) => handleInputChange('reps', text, index)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.setInput}
            placeholder="Weight"
            value={set.weight}
            onChangeText={(text) => handleInputChange('weight', text, index)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.setInput}
            placeholder="RIR"
            value={set.rir}
            onChangeText={(text) => handleInputChange('rir', text, index)}
            keyboardType="numeric"
          />
          {/* Remove button */}
          <TouchableOpacity onPress={() => handleRemoveSet(index)} style={styles.removeButton}>
            <Text style={styles.removeText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Add Set Button */}
      {sets.length < 6 && (
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddSet}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.colors.background,
    padding: 20,
    marginBottom: 0,
    marginTop: -15,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginLeft: -10,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: -10,
  },
  setNumber: {
    fontSize: 18,
    color: 'white',
    width: 40,  // Increase width for number column
    textAlign: 'center',
    marginRight: 0,
  },
  setHeader: {
    fontSize: 12,
    color: 'white',
    // fontWeight: 'bold',
    flex: 1,
    // textAlign: 'center',
    marginLeft: -25,
  },
  setInput: {
    flex: 1,
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 6,
    color: 'white',
    width: 40, 
  },
  removeButton: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  removeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    alignItems: 'flex-end',  // Align the button to the right
    marginTop: 0,
  },
  addButton: {
    backgroundColor: Colors.colors.primary,
    width: 30,
    height: 30,
    padding: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  addText: {
    fontSize: 24,
    color: 'white',
  },
});

export default ExerciseCard;
