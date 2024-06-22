// ExampleComponent.js

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../Hooks/themeContext';

const ExampleComponent = () => {
  const { theme, updateTheme } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    const newTheme = { ...theme, darkMode: !theme.darkMode };
    updateTheme(newTheme);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.darkMode ? '#2c3e50' : '#ecf0f1', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.primaryColor }}>Example Component</Text>
      <TouchableOpacity onPress={toggleDarkMode} style={{ marginTop: 20, padding: 10, backgroundColor: theme.secondaryColor }}>
        <Text>Toggle Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExampleComponent;
