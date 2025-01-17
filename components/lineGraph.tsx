import React, { useState } from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, VictoryTheme } from 'victory-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";

const LineChartWithMarkers = ({ Title, Data, Domain, ChartWidth, ChartHeight, LineColor, MarkerColor }) => {
  const [filteredData, setFilteredData] = useState(Data);
  const [activeButton, setActiveButton] = useState('All'); // Default active button

  // Filtering function based on time frame
  const filterData = (timeFrame) => {
    const now = new Date();
    let filtered;

    switch (timeFrame) {
      case '1 W':
        filtered = Data.filter(
          (item) => new Date(item.x) >= new Date(now.setDate(now.getDate() - 7))
        );
        break;
      case '1 M':
        filtered = Data.filter(
          (item) => new Date(item.x) >= new Date(now.setMonth(now.getMonth() - 1))
        );
        break;
      case '3 M':
        filtered = Data.filter(
          (item) => new Date(item.x) >= new Date(now.setMonth(now.getMonth() - 3))
        );
        break;
      case '1 Y':
        filtered = Data.filter(
          (item) => new Date(item.x) >= new Date(now.setFullYear(now.getFullYear() - 1))
        );
        break;
      case 'All':
        filtered = Data; // Show all data
        break;
      default:
        filtered = Data; // Default case
    }

    setFilteredData(filtered);
    setActiveButton(timeFrame); // Update active button
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Title}</Text>
      <VictoryChart
        theme={VictoryTheme.material}
        width={ChartWidth}
        height={ChartHeight}
        domainPadding={20}
      >
        <VictoryAxis
          tickFormat={(t) =>
            new Date(t).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })
          }
          tickCount={3}
          style={{
            axis: { stroke: Colors.colors.text },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: {
              stroke: 'lightgray',
              strokeDasharray: 'none',
              strokeWidth: 0.5,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          domain={Domain}
          tickCount={4}
          style={{
            axis: { stroke: Colors.colors.text },
            tickLabels: { fontSize: 10, fill: Colors.colors.text },
            grid: {
              stroke: 'lightgray',
              strokeDasharray: 'none',
              strokeWidth: 0.5,
            },
          }}
        />
        {/* Line */}
        <VictoryLine
          data={filteredData}
          style={{
            data: { stroke: LineColor, strokeWidth: 2 },
          }}
        />
        {/* Markers */}
        <VictoryScatter
          data={filteredData}
          size={3} // Size of the markers
          style={{
            data: { fill: MarkerColor },
          }}
        />
      </VictoryChart>
      <View style={styles.buttonContainer}>
        {['1 W', '1 M', '3 M', '1 Y', 'All'].map((timeFrame) => (
          <TouchableOpacity
            key={timeFrame}
            style={[
              styles.button,
              activeButton === timeFrame && styles.activeButton, // Apply active style
            ]}
            onPress={() => filterData(timeFrame)}
          >
            <Text
              style={[
                styles.buttonText,
                activeButton === timeFrame && styles.activeButtonText, // Apply active text style
              ]}
            >
              {timeFrame}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colors.grey,
    padding: 0,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
    marginBottom: 75,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.colors.text,
    marginBottom: -30,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: -10,
    backgroundColor: Colors.colors.dark,
    borderRadius: 10,
  },
  button: {
    backgroundColor: Colors.colors.dark,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  activeButton: {
    backgroundColor: 'white', // Active button background color
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  activeButtonText: {
    color: 'black', // Active button text color
  },
});

export default LineChartWithMarkers;
