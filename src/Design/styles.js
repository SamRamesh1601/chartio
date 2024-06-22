import { StyleSheet, Text, View } from 'react-native'
import { ColorValues, FontValues, Screen_Size } from './values';
import { useContext } from 'react';
import { ThemeContext } from '../Hooks/themeContext';

const Styles = StyleSheet.create({
        containerStyle: {
            width: Screen_Size.width,
            height: Screen_Size.height,
            backgroundColor: ColorValues?.primaryColor
        },
        textStyle: {
            fontSize: FontValues?.primarySizeL,
            fontFamily: FontValues?.primarySemiBold,
            color: ColorValues?.secondaryColor,
            fontWeight: 'bold',
        },
        alignContainerCenter: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        flexDirRow: {
            flexDirection: 'row'
        }
})
    
export default Styles