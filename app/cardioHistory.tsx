import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Ensure this is imported correctly
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import SearchBox from '@/components/SearchBox';
import ScrollingFilter from '@/components/ScrollingFilter';

const CardioHistory = () => {
  // Sample data for runs
  const runsData = [
    { id: '1', distance: '5 km', time: '25 min' },
    { id: '2', distance: '10 km', time: '50 min' },
    { id: '3', distance: '7 km', time: '35 min' },
    { id: '4', distance: '3 km', time: '15 min' },
    { id: '5', distance: '12 km', time: '60 min' },
    // Add more run data as needed
  ];
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const handleItemPress = (item: string) => {
    console.log(`Selected: ${item}`);
    // Handle the item selection here (e.g., filter exercises)
  };

  return (
    <View style={styles.container}>
      <View>
      <TouchableOpacity onPress={() => router.push('/runs')} style={styles.settingsIcon}>
        <Ionicons name="chevron-back-outline" size={28} color={Colors.colors.text} /><Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
        {/* <Text style={styles.titleText} >
            Cardio History 
        </Text> */}
        <View style={styles.searchComponent}>
          <SearchBox
            placeholder="Search Cardio History"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <ScrollingFilter
            items={['Runs', 'Cycling', 'Walking', 'Swimming', 'Yoga', 'Crossfit', 'HITT']}
            onItemPress={handleItemPress}
          />
        </View>
      </View>
      <ScrollView style={styles.infoContainer}>
        {runsData.map((run, index) => (
          <TouchableOpacity key={run.id} style={styles.card}>
            {/* Image Placeholder */}
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder} />
            </View>

            {/* Run Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.trainerName}>Run {run.id}</Text>
              <Text style={styles.detailText}>Distance: {run.distance}</Text>
              <Text style={styles.detailText}>Time: {run.time}</Text>
              <View style={styles.starsContainer}>
                {/* Optional Star Rating */}
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <FontAwesome
                    key={starIndex}
                    name={starIndex < 4 ? 'star' : 'star-o'} // Customize which stars are filled
                    size={16}
                    color="#ffd700"
                  />
                ))}
              </View>
            </View>

            {/* Arrow Icon */}
            <View style={styles.arrowContainer}>
              <Ionicons
                name="chevron-forward-outline"
                size={30}
                color="black"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, 
    paddingTop: 60,
    paddingLeft: 10, 
    backgroundColor: Colors.colors.background,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.colors.text,
    marginTop: 0,
    marginLeft: 90,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.colors.background, // Ensure a light background color for better visibility
    paddingTop: 0, // Add padding to ensure content is visible and not stuck to the top
    marginTop: 0,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#fff', // White background for each card
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc', // Gray background for image placeholder
    borderRadius: 30, // Circular placeholder
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 0,
  },
  detailsContainer: {
    flex: 3,
    marginLeft: 15,
    justifyContent: 'center',
  },
  trainerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#555', // Darker color for better contrast
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    marginLeft: 10,
  },
  searchComponent: {
    marginTop: -40,
    marginLeft: 10,
    width: '105%',
  },
  settingsIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    marginLeft: 8, // Space between the icon and the text
    color: Colors.colors.text, // Make sure it matches the icon color
  },
});

export default CardioHistory;
