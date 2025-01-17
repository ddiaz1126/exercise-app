import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from "@/constants/Colors";

type StatsContainersProps = {
  stats: {
    title: string;
    value: string | number;
  }[][];
};

const StatsContainers: React.FC<StatsContainersProps> = ({ stats }) => {
  return (
    <View style={styles.infoContainer}>
      {stats.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((stat, index) => (
            <View key={index} style={styles.widget}>
              <Text style={styles.widgetTitleText}>{stat.title}</Text>
              <Text style={styles.widgetValueText}>{stat.value}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    infoContainer: {
        marginTop: 60,
        // paddingTop: 20, 
        flex: 1,
        marginBottom: 60,
        alignItems: 'center',
        justifyContent: 'center',
      },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  widget: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: Colors.colors.grey,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  widgetTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  widgetValueText: {
    color: 'cyan',
    fontSize: 25,
    fontWeight: 500,
    fontFamily: 'Helvetica Neue'
  },
});

export default StatsContainers;
