import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryScatter, VictoryArea, VictoryLabel } from 'victory-native';
import { VictoryPie } from 'victory-native';
import TypeWriter from 'react-native-typewriter';

const { width } = Dimensions.get('window');

// Responsive chart width and height
const chartWidth = width * 0.9;  // 90% of screen width, not full screen width
const chartHeight = chartWidth * 0.5;  // 50% of chart width

// Function to generate random fluctuations for data points
const addFluctuations = (data, fluctuationRange = 5) => {
  return data.map((point) => ({
    ...point,
    y: point.y + (Math.random() * fluctuationRange - fluctuationRange / 2), // Random fluctuation within the range
  }));
};

const RunsVisualization = () => {
  const [activeIndex, setActiveIndex] = useState(0);  // Active index for the slide

  // Base data: Time (in seconds or Unix timestamps) and heart rate values (120-180)
  const heartRateData = [
    { x: new Date(2024, 0, 1, 12, 0, 0), y: 130 },
    { x: new Date(2024, 0, 1, 12, 1, 0), y: 80 },
    { x: new Date(2024, 0, 1, 12, 2, 0), y: 160 },
    { x: new Date(2024, 0, 1, 12, 3, 0), y: 148 },
    { x: new Date(2024, 0, 1, 12, 4, 0), y: 170 },
  ];

  // Base pace data (in minutes per km or miles)
  const paceData = [
    { x: new Date(2024, 0, 1, 12, 0, 0), y: 5.3 },  // Pace in minutes/km
    { x: new Date(2024, 0, 1, 12, 1, 0), y: 5.2 },
    { x: new Date(2024, 0, 1, 12, 2, 0), y: 3.1 },
    { x: new Date(2024, 0, 1, 12, 3, 0), y: 4.3 },
    { x: new Date(2024, 0, 1, 12, 4, 0), y: 4.0 },
  ];

  // Add fluctuations to data
  const fluctuatedHeartRateData = addFluctuations(heartRateData, 5); // Fluctuation range for heart rate
  const fluctuatedPaceData = addFluctuations(paceData, 0.2); // Fluctuation range for pace (in minutes/km)

  // Pie chart data (e.g., breakdown of activity types during the run)
  const pieData = [
    { x: 'Very Light', y: 20 },
    { x: 'Light', y: 20 },
    { x: 'Moderate', y: 30 },
    { x: 'High', y: 20 },
    { x: 'Maximum', y: 10 },
  ];
  const chartsData = [
    {
      id: 1,
      component: (
        <VictoryChart theme={VictoryTheme.material} width={chartWidth} height={chartHeight} domainPadding={20}>

            <VictoryLabel
                text="Heart Rate Over Time"
                x={170} // Positioning the label (adjust x for center, y for height)
                y={20} // Position it above the chart
                style={{
                fontSize: 16,
                fontWeight: 'bold',
                fill: Colors.colors.text,
                textAnchor: 'middle',  // Center the title
                }}
            />
          <VictoryAxis
            tickFormat={(t) => new Date(t).toLocaleTimeString()} // Format time on x-axis
            tickCount={3}
            style={{
              axis: { stroke: Colors.colors.text },
              axisLabel: { fontSize: 12, padding: 30, fill: Colors.colors.text },
              ticks: { stroke: Colors.colors.text, size: 5 },
              tickLabels: { fontSize: 10, fill: Colors.colors.text },
              grid: { stroke: 'none' }, // Remove gridlines
            }}
          />
          <VictoryAxis
            dependentAxis
            domain={[120, 180]} // Set the y-axis range from 120 to 180
            tickCount={4}
            style={{
              axis: { stroke: Colors.colors.text },
              axisLabel: { fontSize: 10, padding: 30, fill: Colors.colors.text },
              ticks: { stroke: Colors.colors.text, size: 5 },
              tickLabels: { fontSize: 10, fill: Colors.colors.text },
              grid: { stroke: 'none' }, // Remove gridlines
            }}
          />
          {/* Add shaded area under the line */}
          <VictoryArea
            data={fluctuatedHeartRateData}
            style={{
              data: { fill: 'blue', fillOpacity: 0.2 },  // Blue shading under the line with some opacity
            }}
          />
          <VictoryLine
            data={fluctuatedHeartRateData}
            style={{
              data: { stroke: 'blue', strokeWidth: 3 },
            }}
          />
          {/* Add markers on the data points */}
          <VictoryScatter
            data={fluctuatedHeartRateData}
            size={3}
            style={{
              data: { fill: 'lightblue' }, // Marker color
            }}
          />
        </VictoryChart>
      ),
    },
    {
      id: 2,
      component: (
        <VictoryChart theme={VictoryTheme.material} width={chartWidth} height={chartHeight} domainPadding={20}>
            <VictoryLabel
                text="Pace Over Time"
                x={170} // Positioning the label (adjust x for center, y for height)
                y={20} // Position it above the chart
                style={{
                fontSize: 16,
                fontWeight: 'bold',
                fill: Colors.colors.text,
                textAnchor: 'middle',  // Center the title
                }}
            />
          <VictoryAxis
            tickFormat={(t) => new Date(t).toLocaleTimeString()} // Format time on x-axis
            tickCount={4}
            style={{
              axis: { stroke: Colors.colors.text },
              axisLabel: { fontSize: 12, padding: 10, fill: Colors.colors.text },
              ticks: { stroke: Colors.colors.text, size: 5 },
              tickLabels: { fontSize: 10, fill: Colors.colors.text },
              grid: { stroke: 'none' }, // Remove gridlines
            }}
          />
          <VictoryAxis
            dependentAxis
            // label="Pace (min/km)"
            tickCount={4}
            style={{
              axis: { stroke: Colors.colors.text },
              axisLabel: { fontSize: 12, padding: 30, fill: Colors.colors.text },
              ticks: { stroke: Colors.colors.text, size: 5 },
              tickLabels: { fontSize: 10, fill: Colors.colors.text },
              grid: { stroke: 'none' }, // Remove gridlines
            }}
          />
          {/* Add shaded area under the line */}
          <VictoryArea
            data={fluctuatedPaceData}
            style={{
              data: { fill: 'green', fillOpacity: 0.2 },  // Green shading under the line with some opacity
            }}
          />
          <VictoryLine
            data={fluctuatedPaceData}
            style={{
              data: { stroke: 'green', strokeWidth: 3 },
            }}
          />
          {/* Add markers on the data points */}
          <VictoryScatter
            data={fluctuatedPaceData}
            size={3}
            style={{
              data: { fill: 'lightgreen' }, // Marker color
            }}
          />
        </VictoryChart>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Last Run</Text>

      {/* Total Duration and Calories Burned Containers */}
      <View style={styles.infoContainer}>
      <View>
        <Text style={styles.infoText}>
            <Text style={styles.boldText}>Distance: </Text> 
            <Text style={styles.highlightText}>2 miles</Text>
        </Text>
        <Text style={styles.infoText}>
            <Text style={styles.boldText}>Duration: </Text> 
            <Text style={styles.highlightText}>25 mins</Text>
        </Text>
        <Text style={styles.infoText}>
            <Text style={styles.boldText}>Calories Burned: </Text> 
            <Text style={styles.highlightText}>300 kcal</Text>
        </Text>
        </View>

        {/* Pie Chart */}
        <View style={styles.pieChartContainer}>
          <View style={styles.pieChartTitleContainer}>
            <Text style={styles.pieChartTitle}> Heart Rate Zones</Text>
          </View>
          <View style={styles.pieBox}>
            {/* Legend */}
            <View style={styles.legendContainer}>
              {pieData.map((entry, index) => (
                <View style={styles.legendItem} key={index}>
                  <View style={[styles.legendColor, { backgroundColor: ['#FFFFFF', '#6D6DFF', '#FFB84D', '#4CAF50', '#F44336'][index] }]} />
                  <Text style={styles.legendLabel}>{entry.x}</Text>
                </View>
              ))}
            </View>
            <VictoryPie
              data={pieData}
              colorScale={['#FFFFFF', '#6D6DFF', '#FFB84D', '#4CAF50', '#F44336']}  // Different colors for each section
              style={{
                labels: { fontSize: 6, fill: 'black', fontWeight: 'bold'},
              }}
              innerRadius={40}  // Donut style
              labelRadius={27}  // Adjust label positioning
              width={150}  // Pie chart size
              height={150}
              labels={({ datum }) => `${datum.y}%`} 
            />
          </View>
        </View>
        
      </View>
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

      {/* Scrollable container for charts */}
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
      {/* Typewriter Effect */}
      <View style={styles.chatTextContainer}>
        <TypeWriter typing={1} style={styles.chatText}>
          AI: 
        </TypeWriter>
      </View>
      <View style={{ width: '100%' }}> 
        <Text style={styles.bottomtext}>Past Runs</Text>
      </View>

      {/* Floating Plus Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="rocket" size={30} color="white" />
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.colors.text,
    marginTop: 60,
    marginLeft: 90,
  },
  infoContainer: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 0,
    marginBottom: 20,
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
    marginBottom: 100,
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
  chartContainer: {
    width: chartWidth,
    height: chartHeight + 60,
    marginBottom: 10,
  },
  pieChartContainer: {
    backgroundColor: Colors.colors.grey,
    borderRadius: 10,
    // padding: 20,
    paddingRight: 10,
    paddingLeft: 40,
    marginTop: 30,
    marginLeft: 15,
    width: 160,
    height: 130,
    justifyContent: 'center',  // Center the pie chart inside the container
    alignItems: 'center', 
    // flexDirection: 'row',
  },
  pieChartTitleContainer: {
    marginBottom: -30,
    marginRight: -30,
  },
  pieChartTitle: {
    color: 'white',
    marginBottom: 10,
    marginLeft: -70,
    fontSize: 14,
    fontWeight: 'bold',
  },
  pieBox: {
    marginTop: 0,
    flexDirection: 'row',
    marginBottom: -30,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows the items to wrap to the next line if needed
    marginTop: 30, // Adjust spacing as needed
    justifyContent: 'flex-start', // Align items to the left
    width: '30%', // Ensure it takes full width
    paddingHorizontal: 0, // Add padding for spacing
    marginRight: 0,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 0, // Space between each legend item
    marginBottom: 5, // Space between rows
  },
  
  legendColor: {
    width: 10, // Adjust the size of the color box
    height: 10, // Adjust the size of the color box
    marginRight: 5, // Space between the color box and label
  },
  
  legendLabel: {
    fontSize: 8, // Adjust font size
    color: Colors.colors.text, // Ensure text color is visible
  },  
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',  // Use absolute positioning to place the dots at the bottom
    bottom: 293,             // Position it at the bottom of the container
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

export default RunsVisualization;
