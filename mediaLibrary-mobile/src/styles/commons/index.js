import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
    backgroundImage:{
        width: screenWidth,
        height: screenHeight,
        resizeMode:'contain',
    },
    container: {
        flex: 1,
        backgroundColor: "#EAEAEC"
    },
});

