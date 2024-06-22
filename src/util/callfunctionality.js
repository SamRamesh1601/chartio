import { Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export async function requestCallPermission(phone) {
    const result2 = await request(PERMISSIONS.ANDROID.CALL_PHONE);
    if (result2 === RESULTS.GRANTED) {
        makePhoneCall(phone);
    } else {
    }
};

export function makePhoneCall(phoneNumber) {
    Linking.openURL(phoneNumber)
        .catch(err => console.error('An error occurred', err));
};
