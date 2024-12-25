import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { VictoryChart, VictoryBar, VictoryLine, VictoryTheme, VictoryAxis, VictoryScatter, VictoryArea, VictoryLabel } from 'victory-native';
import { VictoryPie } from 'victory-native';
import TypeWriter from 'react-native-typewriter';

const { width } = Dimensions.get('window');

// Responsive chart width and height
const chartWidth = width * 0.9;  // 90% of screen width, not full screen width
const chartHeight = chartWidth * 0.5;  // 50% of chart width

const Workouts = () => {
  const [activeIndex, setActiveIndex] = useState(0);  // Active index for the slide

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


  const chartsData = [
    {
      id: 1,
      component: (
        <VictoryChart theme={VictoryTheme.material} width={chartWidth} height={chartHeight} domainPadding={20}>
        <VictoryLabel
          text="Workouts Over Time"
          x={chartWidth / 2} // Centers the label horizontally
          y={30} // Adjust this value based on your chart's height (can modify for better alignment)
          style={{
            fontSize: 18, // Increased font size for better visibility
            fontWeight: 'bold',
            fill: Colors.colors.text,
            textAnchor: 'middle', // Ensures the text is centered horizontally
          }}
        />
        <VictoryAxis
          tickFormat={(t) => new Date(t).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          tickCount={3} // Adjusted to show 5 ticks for better spacing
          style={{
            axis: { stroke: Colors.colors.text },
            axisLabel: { fontSize: 12, padding: 30, fill: Colors.colors.text },
            ticks: { stroke: Colors.colors.text, size: 5 },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: { stroke: 'none' },
          }}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, 10]}
          tickCount={4}
          style={{
            axis: { stroke: Colors.colors.text },
            axisLabel: { fontSize: 10, padding: 30, fill: Colors.colors.text },
            ticks: { stroke: Colors.colors.text, size: 5 },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: { stroke: 'none' },
          }}
        />
        {/* Bar Chart */}
        <VictoryBar
          data={WorkoutCountData}
          style={{
            data: { fill: 'cyan' },
          }}
          barWidth={10}
        />
        {/* Line Chart (Smoothed) */}
        <VictoryLine
          data={WorkoutCountData}
          style={{
            data: { stroke: 'orange', strokeWidth: 2 }, // Line style (orange color, thickness 2)
          }}
          interpolation="monotoneX" // Smooth curve
        />
      </VictoryChart>
      ),
    },
    {
      id: 2,
      component: (
        <VictoryChart theme={VictoryTheme.material} width={chartWidth} height={chartHeight} domainPadding={20}>
        <VictoryLabel
          text="Total Workout Volume"
          x={chartWidth / 2} // Centers the label horizontally
          y={30} // Adjust this value based on your chart's height (can modify for better alignment)
          style={{
            fontSize: 18, // Increased font size for better visibility
            fontWeight: 'bold',
            fill: Colors.colors.text,
            textAnchor: 'middle', // Ensures the text is centered horizontally
          }}
        />
        <VictoryAxis
          tickFormat={(t) => new Date(t).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          tickCount={3} // Adjusted to show 5 ticks for better spacing
          style={{
            axis: { stroke: Colors.colors.text },
            axisLabel: { fontSize: 12, padding: 30, fill: Colors.colors.text },
            ticks: { stroke: Colors.colors.text, size: 5 },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: { stroke: 'none' },
          }}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, 10]}
          tickCount={4}
          style={{
            axis: { stroke: Colors.colors.text },
            axisLabel: { fontSize: 10, padding: 30, fill: Colors.colors.text },
            ticks: { stroke: Colors.colors.text, size: 5 },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: { stroke: 'none' },
          }}
        />
        {/* Bar Chart */}
        <VictoryBar
          data={workoutVolumeData}
          style={{
            data: { fill: 'cyan' },
          }}
          barWidth={10}
        />
        {/* Line Chart (Smoothed) */}
        <VictoryLine
          data={workoutVolumeData}
          style={{
            data: { stroke: 'orange', strokeWidth: 2 }, // Line style (orange color, thickness 2)
          }}
          interpolation="monotoneX" // Smooth curve
        />
      </VictoryChart>
      ),
    },
    {
      id: 3,
      component: (
        <VictoryChart theme={VictoryTheme.material} width={chartWidth} height={chartHeight} domainPadding={20}>
        <VictoryLabel
          text="Bench Press Max (lbs)"
          x={chartWidth / 2} // Centers the label horizontally
          y={30} // Adjust this value based on your chart's height (can modify for better alignment)
          style={{
            fontSize: 18, // Increased font size for better visibility
            fontWeight: 'bold',
            fill: Colors.colors.text,
            textAnchor: 'middle', // Ensures the text is centered horizontally
          }}
        />
        <VictoryAxis
          tickFormat={(t) => new Date(t).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          tickCount={3} // Adjusted to show 5 ticks for better spacing
          style={{
            axis: { stroke: Colors.colors.text },
            axisLabel: { fontSize: 12, padding: 30, fill: Colors.colors.text },
            ticks: { stroke: Colors.colors.text, size: 5 },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: { stroke: 'none' },
          }}
        />
        <VictoryAxis
          dependentAxis
          domain={[125, 180]}
          tickCount={2}
          style={{
            axis: { stroke: Colors.colors.text },
            axisLabel: { fontSize: 10, padding: 30, fill: Colors.colors.text },
            ticks: { stroke: Colors.colors.text, size: 5 },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: { stroke: 'none' },
          }}
        />
        {/* Line Chart (Smoothed) */}
        <VictoryLine
          data={benchPressMax}
          style={{
            data: { stroke: 'orange', strokeWidth: 2 }, // Line style (orange color, thickness 2)
          }}
          interpolation="monotoneX" // Smooth curve
        />
        <VictoryScatter
            data={benchPressMax}
            size={3}
            style={{
              data: { fill: 'darkorange' }, // Marker color
            }}
          />
      </VictoryChart>
      ),
    },
    {
      id: 4,
      component: (
        <VictoryChart theme={VictoryTheme.material} width={chartWidth} height={chartHeight} domainPadding={20}>
        <VictoryLabel
          text="Squat Max (lbs)"
          x={chartWidth / 2} // Centers the label horizontally
          y={30} // Adjust this value based on your chart's height (can modify for better alignment)
          style={{
            fontSize: 18, // Increased font size for better visibility
            fontWeight: 'bold',
            fill: Colors.colors.text,
            textAnchor: 'middle', // Ensures the text is centered horizontally
          }}
        />
        <VictoryAxis
          tickFormat={(t) => new Date(t).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          tickCount={3} // Adjusted to show 5 ticks for better spacing
          style={{
            axis: { stroke: Colors.colors.text },
            axisLabel: { fontSize: 12, padding: 30, fill: Colors.colors.text },
            ticks: { stroke: Colors.colors.text, size: 5 },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: { stroke: 'none' },
          }}
        />
        <VictoryAxis
          dependentAxis
          domain={[200, 300]}
          tickCount={4}
          style={{
            axis: { stroke: Colors.colors.text },
            axisLabel: { fontSize: 10, padding: 30, fill: Colors.colors.text },
            ticks: { stroke: Colors.colors.text, size: 5 },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: { stroke: 'none' },
          }}
        />
        {/* Line Chart (Smoothed) */}
        <VictoryLine
          data={squatMax}
          style={{
            data: { stroke: 'cyan', strokeWidth: 2 }, // Line style (orange color, thickness 2)
          }}
          interpolation="monotoneX" // Smooth curve
        />
        <VictoryScatter
            data={squatMax}
            size={3}
            style={{
              data: { fill: 'darkorange' }, // Marker color
            }}
          />
      </VictoryChart>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Your Workouts Title */}
      <View style={styles.title}>
        <Text style={styles.text}>Your Workouts</Text>
      </View>
  
      {/* Info Container (Widgets) */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.widget}>
            <Text style={styles.widgetTitleText}>Last Week Workouts:</Text>
            <Text style={styles.widgetValueText}>2</Text>
          </View>
          <View style={styles.widget}>
            <Text style={styles.widgetTitleText}>Total Workouts:</Text>
            <Text style={styles.widgetValueText}>30</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.widget}>
            <Text style={styles.widgetTitleText}>Avg. Workout Duration</Text>
            <Text style={styles.widgetValueText}>45 mins</Text>
          </View>
          <View style={styles.widget}>
            <Text style={styles.widgetTitleText}>Total Weight Lifted:</Text>
            <Text style={styles.widgetValueText}>50k lbs</Text>
          </View>
        </View>
      </View>
  
      {/* Scrollable Charts */}
      <ScrollView
        horizontal
        pagingEnabled
        style={styles.chartContainer}
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.floor(contentOffsetX / chartWidth); // Get the index based on the scroll position
          setActiveIndex(index);  // Update the active index
        }}
        showsHorizontalScrollIndicator={false}
      >
        {chartsData.map((item) => (
          <View style={styles.chartBox} key={item.id}>
            {item.component}
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatTextContainer}>
        <TypeWriter typing={true} style={styles.chatText}>
          AI: Your latest run has shown some big improvements! It was 2 mins longer than usual, and your mean heart rate is 2 bpm lower.
        </TypeWriter>
      </View>
  
      {/* Dots */}
      <View style={styles.dotsContainer}>
        {chartsData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
  
      <View style={{ width: '100%' }}>
        <Text style={styles.bottomtext}>Individual Workouts</Text>
      </View>
  
      {/* Floating Plus Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
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
    paddingLeft: 20,
    paddingTop: 20,
  },
  title: {
    marginTop: 0,  // Adjust this value to set the top margin of the title
    marginBottom: 30, // Add this line to create space between the title and widgets
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.colors.text,
    marginTop: 60,
    marginLeft: 90,
  },
  infoContainer: {
    marginTop: 30,
    // paddingTop: 20, 
    flex: 1,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
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
    height: 60,
    marginTop: -110,
    marginBottom: 90,
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
    backgroundColor: Colors.colors.grey,
    color: 'white',
    fontSize: 18,
    marginTop: 60,
    marginBottom: 20,
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
    color: Colors.colors.primary,
    fontSize: 30,
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
    bottom: 280,             // Position it at the bottom of the container
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
});

export default Workouts;

