import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";
import SearchBox from '@/components/SearchBox';
import ScrollingFilter from '@/components/ScrollingFilter';

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleItemPress = (item: string) => {
    console.log(`Selected: ${item}`);
    // Handle the item selection here (e.g., filter exercises)
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: Colors.colors.background }}>
      <SearchBox
        placeholder="Search Exercises"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollingFilter
        items={['Chest', 'Back', 'Quads', 'Hamstring', 'Biceps', 'Triceps', 'Calves']}
        onItemPress={handleItemPress}
      />
      {/* Other components can go here */}
    </View>
  );
};

export default Exercises;
