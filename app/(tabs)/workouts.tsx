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

// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
// import Colors from "@/constants/Colors";
// import SearchBox from '@/components/SearchBox';

// const Workouts = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [generatedText, setGeneratedText] = useState('');

//   const handleGenerateText = () => {
//     if (!searchQuery.trim()) {
//       console.error('Prompt cannot be empty.');
//       return; // Exit the function if the search query is empty
//     }
    
//     // Fetch GPT-2 generated text from your Django API
//     fetch(`http://10.0.0.103:8000/api/gpt2/?prompt=${encodeURIComponent(searchQuery)}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (data.generated_text) {
//           setGeneratedText(data.generated_text);
//         } else {
//           console.error(data.error);
//         }
//       })
//       .catch(error => console.error('Error:', error));
//   };ç=

//   return (
//     <View style={{ flex: 1, alignItems: 'center', backgroundColor: Colors.colors.background }}>
//       <SearchBox
//         placeholder="Search Workouts"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />
//       <Button title="Generate Text" onPress={handleGenerateText} />
      
//       {/* Display the generated text */}
//       {generatedText ? (
//         <ScrollView>
//           <Text style={styles.generatedText}>{generatedText}</Text>
//         </ScrollView>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   generatedText: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: Colors.colors.background, // Adjust as per your design
//     borderRadius: 5,
//     width: '90%', // Adjust width as needed
//     color: 'white', // Text color set to white
//   },
// });

// export default Workouts;
