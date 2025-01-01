import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from "@/constants/Colors";
import SearchBox from '@/components/SearchBox';
import ScrollingFilter from '@/components/ScrollingFilter';
import ChatButton from '../../components/ChatButton';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import TypeWriter from 'react-native-typewriter';

const Trainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState<string | null>(null);
  const [isMapView, setIsMapView] = useState(false); // Toggle between list and map

  const handleChatResponse = (response: string) => {
    setChatbotResponse(response); // Update chatbot response
  };

  const handleItemPress = (item: string) => {
    console.log(`Selected: ${item}`);
    // Handle the item selection here (e.g., filter exercises)
  };

  const toggleView = () => {
    setIsMapView(!isMapView); // Toggle between list and map views
  };
  const [isMapMode, setIsMapMode] = useState(false);

  return (
    <View style={styles.container}>
      <SearchBox
        placeholder="Search Trainers/Gyms"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollingFilter
        items={['Near Me', 'Online', 'Powerlifting', 'Yoga', 'Crossfit', 'Weightlifting', 'Sports']}
        onItemPress={handleItemPress}
      />
      <View style={styles.chatTextContainer}>
        <Text>
          <TypeWriter typing={1} style={styles.chatText}>
            {chatbotResponse || "Hello there! How can I assist you today?"}
          </TypeWriter>
        </Text>
      </View>

      {isMapMode ? (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749, // San Francisco latitude
          longitude: -122.4194, // San Francisco longitude
          latitudeDelta: 0.20,
          longitudeDelta: 0.20,
        }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: 37.7749 + Math.random() * 0.01,
              longitude: -122.4194 + Math.random() * 0.01,
            }}
            title={`Trainer Name ${index + 1}`}
            description="San Francisco"
          />
        ))}
      </MapView>
    ) : (
      <ScrollView style={styles.infoContainer}>
        {Array.from({ length: 20 }, (_, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            {/* Image Placeholder */}
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder} />
              <View style={styles.starsContainer}>
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <FontAwesome
                    key={starIndex}
                    name={starIndex < 4 ? "star" : "star-o"}
                    size={16}
                    color="#ffd700"
                  />
                ))}
              </View>
            </View>

            {/* Trainer Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.trainerName}>Trainer Name {index + 1}</Text>
              <Text style={styles.detailText}>{index + 1} Main St</Text>
              <Text style={styles.detailText}>San Francisco</Text>
              <Text style={styles.detailText}>(555) 123-4567</Text>
              <Text style={styles.detailText}>Crossfit</Text>
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
    )}
      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsMapMode(!isMapMode)}
      >
        <Ionicons
          name={isMapMode ? "list-outline" : "map-outline"} // Change icon based on mode
          size={30}
          color="white"
        />
      </TouchableOpacity>

      {/* Floating Chat Button */}
      <ChatButton onResponse={handleChatResponse} /> {/* Pass handleChatResponse to ChatButton */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
    alignItems: 'center',
  },
  chatTextContainer: {
    marginTop: 0,
    marginBottom: 10,
  },
  arrowIcon: {
    marginRight: 0,
  },
  chatText: {
    fontSize: 14,
    backgroundColor: Colors.colors.grey,
    color: 'white',
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginRight: 10,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  trainerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
  },
  arrowContainer: {
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: Colors.colors.primary,
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default Trainer;

