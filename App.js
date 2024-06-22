import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';
import { ThemeProvider } from './src/Hooks/themeContext'
import NotesScreen from './src/Screen/Notes'


// # For Creating SHA1 Key using CMD 

// # Get inside the Project Directory After Open Terminal Type Following Command

// #  keytool -list -v -keystore ./android/App/debug.keystore -alias androiddebugkey -storepass android -keypass android


export default function App() {
  const Stack = createNativeStackNavigator();

    PushNotification.createChannel({
      channelId: 'default-channel-id',
      channelName: 'Default channel',
      channelDescription: 'A default channel for basic notifications',
      playSound: true,
      soundName: 'default',
      importance: 4,
      vibrate: true,
    });
  return (
    <ThemeProvider>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
          }}>
          <Stack.Screen name="Note" component={NotesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </ThemeProvider>
  );
}
