import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../service/service-config.json';
import Geolocation from '@react-native-community/geolocation';

export const storeDataAsyncStorage = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('CurrentUserData', jsonValue);
  } catch (e) {
    console.error(` Storing Data From Async Storage  : ${e}`);
  }
};

export const getDataAsyncStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('CurrentUserData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(` Reading Data From Async Storage  : ${e}`);
  }
};

export const removeDataAsynStorage = async () => {
  try {
    await AsyncStorage.removeItem('CurrentUserData');
  } catch (e) {
    console.error(` Removing Data From Async Storage  : ${e}`);
  }
};

export function fetchAddressFromCoords(lat, lon) {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${baseUrl.GEOFIY_API_KEY}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      if (result.features.length) {
        console.log(result.features[0].properties.formatted);
        return result;
      } else {
        console.log('Geocoding failed:', result);
        return result;
      }
    })
    .catch(error => {
      console.error('Error fetching result: ', error);
      return error;
    });
}

export function useLocationDataLatLon() {
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocationData({latitude, longitude});
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return locationData;
}
