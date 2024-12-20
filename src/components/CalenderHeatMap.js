import { View, Text,StyleSheet, ToastAndroid } from 'react-native'
import {CalendarList } from 'react-native-calendars'
import React from 'react'
import Toast from 'react-native-toast-message';

const unixToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is 0-based
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  // Prepare data for calendar in the format that react-native-calendars expects
const generateMarkedDates = (data) => {
    let markedDates = {};
    if(data != null){

      Object.keys(data).forEach((timestamp) => {
        const date = unixToDate(timestamp);
        const submissionCount = data[timestamp];
    
        // Set the date with a color depending on submission count
        let color;
        if (submissionCount <= 2) color = '#d1e7d1'; // Light Green for low submissions
        else if (submissionCount <= 5) color = '#84c084'; // Medium Green
        else if (submissionCount <= 10) color = '#2f8a2f'; // Dark Green
        else color = '#006400'; // Very Dark Green for high submissions
    
        markedDates[date] = {
          selected: true,
          selectedColor: color,
          selectedTextColor: '#ffffff',
        };
      });
    

    }
    
    return markedDates;
  };

const CalenderHeatMap = ({submissionCalender}) => {

const markedDates = generateMarkedDates(submissionCalender);
const legends = [
  { color: '#d1e7d1', label: '<= 2 Submission' },
  { color: '#84c084', label: 'Between 3 to 5' },
  { color: '#2f8a2f', label: '> 5 Submission' },
];

  return (
    <View>
      <CalendarList
       horizontal
       pastScrollRange={12}
       futureScrollRange={1}
        markedDates={markedDates}
        monthFormat={'MMM yyyy'}
        onDayPress={(day) => {
          const tim = (day.timestamp/1000).toString()
          const submission  =  (submissionCalender[tim] == undefined)? 0: submissionCalender[tim];
          ToastAndroid.show(`${submission} submission were made on ${day.day}-${day.month}-${day.year}`,ToastAndroid.SHORT)
        }}
      />
      <View style={styles.legendsContainer}>
        {legends.map((legend, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: legend.color }]} />
            <Text style={styles.legendLabel}>{legend.label}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      dayText: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      legendsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
      legendItem: {
        flexWrap:"wrap",
        alignItems: 'center',
        marginStart: 2,
      },
      legendColor: {
        width: 25,
        height: 25,
        marginRight: 6.5,
        borderRadius:15
      },
      legendLabel: {
        fontSize: 12.5,
        fontWeight: 'bold',
        color: '#333',
      },
  });

export default CalenderHeatMap