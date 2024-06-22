import { Dimensions } from "react-native"
import { ThemeContext } from '../Hooks/themeContext';
import { useContext } from "react";

// # Default Screen Size Window

export const Screen_Size = {
    'width' : Dimensions.get('window').width,
    'height' : Dimensions.get('window').height
}

// # Font Styles Values

export const FontValues = {
    primaryFont: 'Lexend-Regular',
    primaryBold: 'Lexend-Regular',
    primarySemiBold: 'Lexend-Regular',
    primarySizeL: 60,
    primarySizeM: 40,
    primarySizeD: 30,
    primarySizeS: 20,
    primarySizeSM: 10,
}

// # Color Theme Styles Values

const darkTheme = {
    primaryColor: '#000',
    secondaryColor : '#FFF',
}

const lightTheme = {
    primaryColor: '#FFF',
    secondaryColor : '#000',
}

export const ColorsValues = () => {
   const { theme } = useContext(ThemeContext);

   return theme.darkMode ? lightTheme : darkTheme
};