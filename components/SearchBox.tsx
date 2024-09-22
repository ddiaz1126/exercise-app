import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from "@/constants/Colors";

interface SearchBoxProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder={placeholder}
        placeholderTextColor={Colors.colors.text}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 20, // Space between search box and other elements
    marginTop: 70, // Adjust this value to lower the search box
  },
  searchBar: {
    height: 40,
    borderColor: Colors.colors.text,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: Colors.colors.text,
  },
});

export default SearchBox;
