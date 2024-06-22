import {PermissionsAndroid} from 'react-native';

export default function useMobilePermissionRequest(
  permissionName,
  permissionSuccessToast,
) {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(permissionName, {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        ToastMessaage(
          `Please give the Access the Of ${permissionSuccessToast} `,
        );
        return true;
      }
    } catch (error) {
      console.error('Error : ');
    }
  };
}
