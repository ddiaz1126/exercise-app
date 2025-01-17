import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { VictoryChart, VictoryBar, VictoryLine, VictoryTheme, VictoryAxis, VictoryScatter, VictoryArea, VictoryLabel } from 'victory-native';
import { VictoryPie } from 'victory-native';
import TypeWriter from 'react-native-typewriter';
import ChatButton from '../../components/ChatButton'; 
import AddWorkoutButton from '../../components/addWorkoutButton';
import StatsContainers from '../../components/statsContainers';
import BarChart from '../../components/barGraph';
import LineChart from '../../components/lineGraph';
import ScatterChart from '../../components/scatterGraph';

import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Responsive chart width and height
const chartWidth = width * 0.9;  // 90% of screen width, not full screen width
const chartHeight = chartWidth * 0.5;  // 50% of chart width

const RunsVisualization = () => {

  const statsData = [
    [
      { title: 'Last Week Cardio Sessions:', value: 3 },
      { title: 'Total Runs This Year:', value: 30 },
    ],
    [
      { title: 'Avg. Cardio Duration:', value: '45 mins' },
      { title: 'Total Miles:', value: '300' },
    ],
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);  // Active index for the slide

  const router = useRouter();

  const WorkoutCountData = [
    { x: new Date(2024, 0, 3), y: 7 }, 
    { x: new Date(2024, 3, 9), y: 4 }, 
    { x: new Date(2024, 6, 20), y: 2 }, 
    { x: new Date(2024, 9, 8), y: 6 }, 
    { x: new Date(2024, 11, 3), y: 9 },
    { x: new Date(2024, 0, 4), y: 9 }, 
    { x: new Date(2024, 3, 24), y: 2 }, 
    { x: new Date(2024, 6, 3), y: 0 }, 
    { x: new Date(2024, 9, 19), y: 10 }, 
    { x: new Date(2024, 11, 21), y: 2 },  
  ];
  
  const workoutVolumeData = [
    { x: new Date(2024, 0, 3), y: 300 }, 
    { x: new Date(2024, 3, 9), y: 600 }, 
    { x: new Date(2024, 6, 20), y: 450 }, 
    { x: new Date(2024, 9, 8), y: 100 }, 
    { x: new Date(2024, 11, 3), y: 650 },
    { x: new Date(2024, 0, 4), y: 350 }, 
    { x: new Date(2024, 3, 24), y: 400 }, 
    { x: new Date(2024, 6, 3), y: 390 }, 
    { x: new Date(2024, 9, 19), y: 150 }, 
    { x: new Date(2024, 11, 21), y: 260 }, 
  ];
  const benchPressMax = [
    { x: new Date(2024, 0, 3), y: 180 }, 
    { x: new Date(2024, 3, 9), y: 200 }, 
    { x: new Date(2024, 6, 20), y: 210 }, 
    { x: new Date(2024, 9, 8), y: 190 }, 
    { x: new Date(2024, 11, 3), y: 230 },
    { x: new Date(2024, 0, 4), y: 240 }, 
    { x: new Date(2024, 3, 24), y: 235 }, 
    { x: new Date(2024, 6, 3), y: 240 }, 
    { x: new Date(2024, 9, 19), y: 235 }, 
    { x: new Date(2024, 11, 21), y: 241 }, 
  ];
  const squatMax = [
    { x: new Date(2024, 0, 3), y: 180 }, 
    { x: new Date(2024, 3, 9), y: 220 }, 
    { x: new Date(2024, 6, 20), y: 245 }, 
    { x: new Date(2024, 9, 8), y: 300 }, 
    { x: new Date(2024, 11, 3), y: 290 },
    { x: new Date(2024, 0, 4), y: 305 }, 
    { x: new Date(2024, 3, 24), y: 320 }, 
    { x: new Date(2024, 6, 3), y: 315 }, 
    { x: new Date(2024, 9, 19), y: 325 }, 
    { x: new Date(2024, 11, 21), y: 330 }, 
  ];

  const [chatbotResponse, setChatbotResponse] = useState(null);

  const handleChatResponse = (response) => {
    setChatbotResponse(response); // Update chatbot response
  };

  return (
    <View style={styles.container}>
      {/* Your Workouts Title */}
      <View style={styles.title}>
        <Text style={styles.text}>Cardio Sessions</Text>
        <TouchableOpacity 
          onPress={() => router.push('/cardioHistory')} 
          style={styles.iconContainer}
        >
          <Ionicons name="list" size={34} color={Colors.colors.text} />
        </TouchableOpacity>
      </View>
      
      <StatsContainers stats={statsData} />
      <View style={styles.chatTextContainer}>
        <Text>
          <TypeWriter typing={1} style={styles.chatText}>
            {chatbotResponse || "Hello there! How can I assist you today?"}
          </TypeWriter>
        </Text>
      </View>
     {/* Scrollable Charts */}
      <ScrollView
        horizontal
        pagingEnabled
        style={styles.chartContainer}
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.floor(contentOffsetX / chartWidth);
          setActiveIndex(index);
        }}
        showsHorizontalScrollIndicator={false}
      >
        <BarChart
          Title="Cardio Sessions Over Time"
          Data={WorkoutCountData}
          Domain={[0, 1]}
          ChartWidth={330}
          ChartHeight={195}
          BarColor="green" // You can pass a custom color here
        />
        <LineChart
          Title="Calories Burned"
          Data={workoutVolumeData}
          Domain={[0, 1]}
          ChartWidth={330}
          ChartHeight={195}
          LineColor="green"
          MarkerColor="orange"
        />
      </ScrollView>  
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomtext}>Singe Sessions</Text>
      </View>
  
      {/* Floating Button */}
      <ChatButton onResponse={handleChatResponse} /> {/* Pass handleChatResponse to ChatButton */}
      {/* AddWorkoutButton */}
      <AddWorkoutButton onPress={() => router.push('/addWorkout')} />

    </View>
    
  );  
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: Colors.colors.background,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  title: {
    marginTop: 0,  // Adjust this value to set the top margin of the title
    marginBottom: 5, // Add this line to create space between the title and widgets
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginRight:50,
    marginTop: 60,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.colors.text,
    marginTop: 60,
    marginLeft: 60,
  },
  boldText: {
    color: Colors.colors.text,
    fontWeight: 'bold',  // Bold the text behind the colon
  },
  highlightText: {
    backgroundColor: 'lightgreen',  // Highlight the text after the colon
    fontWeight: 'normal',  // Regular weight for the highlighted text
  },
  chatTextContainer: {
    height: 50,
    marginTop: -20,
    marginBottom: -10,
    marginLeft: 10,
  },
  chatText: {
    fontSize: 14,
    backgroundColor: Colors.colors.grey,  // Ensure visibility of text
    color: 'white',  // Ensure text color is not blending into background
    marginRight: 18,
    paddingLeft: 10, // Add padding for better readability
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 5,
  },
  bottomtext: {
    backgroundColor: Colors.colors.dark,
    color: 'white',
    fontSize: 18,
    // marginTop: 60,
    // marginBottom: 20,
    marginLeft: 120,
  },
  chartBox: {
    backgroundColor: Colors.colors.grey,
    borderRadius: 10,
    paddingRight: 0,
    height: chartHeight,
    marginBottom: 20,
    marginLeft: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Optional: space out the widgets evenly
    width: '95%',
    marginBottom: 10,  // Optional: space between rows
  },
  widget: {
    width: '48%',  // Take up 50% of the row width with some padding
    padding: 10,
    height: 60,
    backgroundColor: Colors.colors.grey,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetTitleText: {
    color: 'white',
    fontSize: 14,
  },
  widgetValueText: {
    color: 'cyan',
    fontSize: 30,
    fontWeight: 500,
    fontFamily: 'Helvetica Neue',
  },
  chartContainer: {
    width: chartWidth,
    height: chartHeight + 10,
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',  // Use absolute positioning to place the dots at the bottom
    bottom: 230,             // Position it at the bottom of the container
    left: 0,               // Align the dots from the left
    right: 15,              // Align the dots to the right
    marginBottom: 0,     // Add a little space between the chart and the dots
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // justifyContent: 'center',
    backgroundColor: Colors.colors.text,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: Colors.colors.primary,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: Colors.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  textContainer: {
        // alignItems: 'center',
        marginTop: 0, 
  },
  textLine: {
    fontSize: 18, // Adjust font size as needed
    fontWeight: 'bold', // Optional: Make the text bold
    color: Colors.colors.text, // Matches your theme color
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  }
});

export default RunsVisualization;