import React, { forwardRef, useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const DateTimePickerExample = forwardRef(({ onChangeText, errorMessage, ...props }, ref) => {
  const [date, setDate] = useState(new Date()); 
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    
    const formattedDate = formatDate(currentDate);
    onChangeText?.(formattedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>
        Wybrana data i czas: {date ? date.toLocaleString() : 'Brak daty'}
      </Text>
       */}
      <Text className="text-base text-gray-100 font-pmedium">Data</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput 
          className="flex-1 text-white font-psemibold text-base"
          value={date ? date.toLocaleString() : 'Brak daty'}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button onPress={() => showMode('date')} title="Data" />
        <Button onPress={() => showMode('time')} title="Czas" />
      </View>
      
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={styles.picker}
        />
      )}

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  picker: {
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default DateTimePickerExample;
