import React, { forwardRef, useState } from 'react'
import { View, Text, Switch } from 'react-native';

const SwitchField = forwardRef(({ label, value, onValueChange, otherStyles, errorMessage, ...props}, ref) => {
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="flex-row items-center justify-between">
        <Text className="text-white font-pmedium">{label}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onValueChange}
          value={value}
          {...props}
          ref={ref}
        />
      </View>
      <Text className="text-red-500">{errorMessage}</Text>
    </View>
  );
})

export default SwitchField;
