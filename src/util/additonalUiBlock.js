import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PushNotification from 'react-native-push-notification';
import FastImage from 'react-native-fast-image';

export const PrebrifeText = ({text, maxLines, styleOfFont, style}) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <Text
      style={{
        ...styleOfFont,
        ...style,
        width: '100%',
      }}
      numberOfLines={showAll ? undefined : maxLines}>
      {text}
      {!showAll && (
        <Text
          onPress={toggleShowAll}
          style={{
            fontSize: 2,
            color: 'blue',
          }}>
          ...
          <Text style={{textDecorationLine: 'underline'}}>more</Text>
        </Text>
      )}
    </Text>
  );
};

export function ToastMessaage(message) {
  ToastAndroid.show(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    '#000',
    '#FF0000',
  );
}

export const fetchGreet = () => {
  const currentHour = new Date().getHours();
  let greet = '';

  if (currentHour >= 5 && currentHour < 12) {
    greet = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    greet = 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 20) {
    greet = 'Good Evening';
  } else {
    greet = 'Good Night';
  }

  return greet;
};

export function onCreateNotification(message, title = '') {
  const notificationObject = {
    channelId: 'default-channel-id',
    foreground: false,
    userInteraction: false,
    message: message,
    data: {},
  };
  const newNotificationObject = !Boolean(title)
    ? notificationObject
    : {
        ...notificationObject,
        title: title,
      };
  PushNotification.localNotification(newNotificationObject);
}

// const [file, setFile] = useState(null);
// const [imageURL, setImageURL] = useState(null);
// const onChangeAttachments = (event) => {
//     let staffStatusChange = cloneDeep(staffInfo);
//     const inputElement = event.target;
//     if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
//         return;
//     }
//     const selectedFile = inputElement.files[0];
//     const maxSize = 5 * 1024 * 1024;
//     const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (!selectedFile || !allowedFormats.includes(selectedFile.type)) {
//         setToast({ severity: 'error', message: 'Only JPG, JPEG, and PNG formats are allowed', color: 'error' });
//         setFile(null);
//         inputElement.value = '';
//         return;
//     }
//     if (selectedFile.size > maxSize) {
//         setToast({ severity: 'error', message: 'File size should be less than 5 MB', color: 'error' });
//         setFile(null);
//         inputElement.value = '';
//         return;
//     }
//     const selectedImageURL = URL.createObjectURL(selectedFile);
//     setStaffInfo(staffStatusChange)
//     setImageURL(selectedImageURL);
//     setFile(selectedFile);
//     saveAttachments(selectedFile);
// };

// const saveAttachments = async (file) => {
//     if (!file) {
//         setToast({ severity: 'error', message: "File selection is required", color: 'error' });
//         return;
//     }
//     try {
//         const response = await uploadStaffProfilePicture(file, updatedBy.staffId);
//         if (response.hasOwnProperty('pictureId')) {
//             let assignDateChange = cloneDeep(staffInfo);
//             assignDateChange['pictureId'] = response.pictureId;
//             assignDateChange['pictureName'] = response.fileName;
//             setStaffInfo(assignDateChange);
//             setFile(null);
//             const fileInputElement = document.getElementById('file');
//             if (fileInputElement) {
//                 fileInputElement.value = '';
//             }
//         }
//         else {
//             setToast({ severity: 'error', message: "Something went wrong try again", color: 'error' });
//         }
//         setSubmitting(false);
//     } catch (error) {
//         setSubmitting(false);
//         console.error('Error saving image:', error);
//         throw error;
//     }
// };

export function LoadingImageCache({source, style, resizeMode}) {
  return (
    <FastImage
      source={{
        uri: source,
        priority: FastImage.priority.high,
      }}
      style={style}
      resizeMode={resizeMode || FastImage.resizeMode.cover}
    />
  );
}

export const HighlightHashTags = ({style, text}) => {
  return text.split(' ').map((word, index) => {
    if (word.startsWith('#')) {
      return (
        <Text
          key={index}
          style={{
            ...style,
            ...{
              color: 'red',
              fontFamily: 'Poppins-SemiBold',
            },
          }}>
          {word}{' '}
        </Text>
      );
    } else {
      return (
        <Text
          key={index}
          style={{
            ...style,
          }}>
          {word}{' '}
        </Text>
      );
    }
  });
};
