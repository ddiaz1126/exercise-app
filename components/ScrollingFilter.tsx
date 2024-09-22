import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ScrollingButton from '@/components/ScrollingButton';

interface ScrollingFilterProps {
  items: string[];
  onItemPress: (item: string) => void;
}

const ScrollingFilter: React.FC<ScrollingFilterProps> = ({ items, onItemPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <ScrollingButton
            key={index}
            title={item}
            onPress={() => onItemPress(item)} // Handle item press
            containerStyles={styles.button} // Add custom styles if needed
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%', // Adjust as needed
    marginBottom: 20, // Space below the filter
  },
  button: {
    marginRight: 10, // Space between buttons
  },
});

export default ScrollingFilter;