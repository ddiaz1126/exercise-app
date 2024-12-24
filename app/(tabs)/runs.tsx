import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons'; // Import icons for the plus sign
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import { VictoryPie } from 'victory-native';  // Import the VictoryPie component

// Get screen width dynamically
const { width } = Dimensions.get('window');

// Responsive chart width and height
const chartWidth = width * 0.9;  // 90% of screen width
const chartHeight = chartWidth * 0.5;  // 50% of chart width

// Function to generate random fluctuations for data points
const addFluctuations = (data, fluctuationRange = 5) => {
  return data.map((point) => ({
    ...point,
    y: point.y + (Math.random() * fluctuationRange - fluctuationRange / 2), // Random fluctuation within the range
  }));
};

const RunsVisualization = () => {
  // Base data: Time (in seconds or Unix timestamps) and heart rate values (120-180)
  const heartRateData = [
    { x: new Date(2024, 0, 1, 12, 0, 0), y: 130 },
    { x: new Date(2024, 0, 1, 12, 1, 0), y: 135 },
    { x: new Date(2024, 0, 1, 12, 2, 0), y: 128 },
    { x: new Date(2024, 0, 1, 12, 3, 0), y: 148 },
    { x: new Date(2024, 0, 1, 12, 4, 0), y: 170 },
  ];

  // Base pace data (in minutes per km or miles)
  const paceData = [
    { x: new Date(2024, 0, 1, 12, 0, 0), y: 5.3 },  // Pace in minutes/km
    { x: new Date(2024, 0, 1, 12, 1, 0), y: 5.2 },
    { x: new Date(2024, 0, 1, 12, 2, 0), y: 5.1 },
    { x: new Date(2024, 0, 1, 12, 3, 0), y: 5.0 },
    { x: new Date(2024, 0, 1, 12, 4, 0), y: 4.9 },
  ];

  // Add fluctuations to data
  const fluctuatedHeartRateData = addFluctuations(heartRateData, 5); // Fluctuation range for heart rate
  const fluctuatedPaceData = addFluctuations(paceData, 0.2); // Fluctuation range for pace (in minutes/km)

  // Pie chart data (e.g., breakdown of activity types during the run)
  const pieData = [
    { x: 'Walking', y: 20 },
    { x: 'Light', y: 20 },
    { x: 'Medium', y: 30 },
    { x: 'High', y: 30 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Last Run</Text>

      {/* Total Duration and Calories Burned Containers */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.infoText}>Distance: 2 miles</Text>
          <Text style={styles.infoText}>Duration: 25 mins</Text>
          <Text style={styles.infoText}>Calories Burned: 300 kcal</Text>
        </View>

        {/* Pie Chart */}
        <View style={styles.pieChartContainer}>
          <VictoryPie
            data={pieData}
            colorScale={['#6D6DFF', '#FFB84D', '#4CAF50', '#F44336']}  // Different colors for each section
            style={{
              labels: { fontSize: 10, fill: Colors.colors.text },
            }}
            innerRadius={30}  // Donut style
            labelRadius={20}  // Adjust label positioning
            width={200}  // Pie chart size
            height={200}
          />
        </View>
      </View>

      {/* Heart Rate Chart */}
      <View style={styles.chartBox}>
        <VictoryChart theme={VictoryTheme.material} width={chartWidth} height={chartHeight} domainPadding={20}>
          <VictoryAxis
            tickFormat={(t) => new Date(t).toLocaleTimeString()} // Format time on x-axis
            tickCount={2}
            style={{
              axis: { stroke: Colors.colors.text },
              axisLabel: { fontSize: 12, padding: 30, fill: Colors.colors.text },
              ticks: { stroke: Colors.colors.text, size: 5 },
              tickLabels: { fontSize: 10, fill: Colors.colors.text },
              grid: { stroke: 'none' } // Remove gridlines
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Heart Rate (bpm)"
            domain={[120, 180]} // Set the y-axis range from 120 to 180
            tickCount={4}
            style={{
              axis: { stroke: Colors.colors.text },
              axisLabel: { fontSize: 10, padding: 30, fill: Colors.colors.text },
              ticks: { stroke: Colors.colors.text, size: 5 },
              tickLabels: { fontSize: 10, fill: Colors.colors.text },
              grid: { stroke: 'none' } // Remove gridlines
            }}
          />
          <VictoryLine
            data={fluctuatedHeartRateData}
            style={{
              data: { stroke: 'blue' },
            }}
          />
        </VictoryChart>
      </View>

      {/* Pace Over Time Chart */}
      <View style={styles.chartBox}>
        <VictoryChart theme={VictoryTheme.material} width={chartWidth} height={chartHeight} domainPadding={20}>
          <VictoryAxis
            tickFormat={(t) => new Date(t).toLocaleTimeString()} // Format time on x-axis
            tickCount={4}
            style={{
              axis: { stroke: Colors.colors.text },
              axisLabel: { fontSize: 12, padding: 10, fill: Colors.colors.text },
              ticks: { stroke: Colors.colors.text, size: 5 },
              tickLabels: { fontSize: 10, fill: Colors.colors.text },
              grid: { stroke: 'none' } // Remove gridlines
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Pace (min/km)"
            tickCount={4}
            style={{
              axis: { stroke: Colors.colors.text },
              axisLabel: { fontSize: 12, padding: 30, fill: Colors.colors.text },
              ticks: { stroke: Colors.colors.text, size: 5 },
              tickLabels: { fontSize: 10, fill: Colors.colors.text },
              grid: { stroke: 'none' } // Remove gridlines
            }}
          />
          <VictoryLine
            data={fluctuatedPaceData}
            style={{
              data: { stroke: 'green' },
            }}
          />
        </VictoryChart>
      </View>

      {/* Floating Plus Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => router.push('/workoutsView')}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',  // Align content to the left horizontally
    justifyContent: 'flex-start',  // Align content to the top vertically
    backgroundColor: Colors.colors.background,
    paddingLeft: 20,
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.colors.text,
    marginTop: 40,
  },
  textContainer: {
    flex: 1,  // Allow the text container to take up available space
  },
  infoContainer: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',  // Align text and pie chart horizontally
    alignItems: 'center',  // Vertically center the items
    justifyContent: 'space-between',  // Ensure space between text and pie chart  // Vertically center the items
  },
  infoText: {
    fontSize: 18,
    color: Colors.colors.text,
    marginVertical: 5,
  },
  chartBox: {
    backgroundColor: Colors.colors.grey, // Lighter background for chart box
    borderRadius: 10,  // Rounded corners
    paddingRight: 1,  // Some padding around the chart
    marginBottom: 20,  // Space between charts
    shadowColor: '#000',  // Shadow effect for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,  // Shadow for Android
  },
  floatingButton: {
    position: 'absolute', // Make the button float
    bottom: 30, // Distance from the bottom of the screen
    right: 30, // Distance from the right of the screen
    backgroundColor: Colors.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30, // Make the button circular
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  pieChartContainer: {
    backgroundColor: Colors.colors.grey,
    borderRadius: 10,
    padding: 10,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,  // Space between the pie chart and text
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default RunsVisualization;


