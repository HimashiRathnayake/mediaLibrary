import { StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

export const styles = StyleSheet.create({
    header:{
        marginTop: 30,
        fontSize: 20,
        color: '#9e9e9e',
    },
    nextHeader:{
        marginTop: 30,
        fontSize: 22,
        marginLeft: 10,
        width: Dimensions.get('screen').width/2,
        fontWeight: "bold",
        color: '#1976d2',
    },
    headerIcon: {
        color: '#9e9e9e',
        fontSize: 20,
        left: 10,
        top: 36,
    },
});