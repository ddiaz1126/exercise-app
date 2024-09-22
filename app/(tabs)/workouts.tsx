import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";
import SearchBox from '@/components/SearchBox';
import ScrollingFilter from '@/components/ScrollingFilter';

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleItemPress = (item: string) => {
    console.log(`Selected: ${item}`);
    // Handle the item selection here (e.g., filter exercises)
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: Colors.colors.background }}>
      <SearchBox
        placeholder="Search Workouts"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollingFilter
        items={['Upper Body', 'Legs', 'Push', 'Pull', 'Arms & Abs', 'Glutes', 'Cardio']}
        onItemPress={handleItemPress}
      />
      {/* Other components can go here */}
    </View>
  );
};

export default Workouts;