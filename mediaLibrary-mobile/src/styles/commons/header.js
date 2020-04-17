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
    searchHeader:{
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width : Dimensions.get('screen').width-30,
        alignSelf: 'center',
        borderRadius: 10,
        height: 50,
        marginTop: 30,
    },
    search:{
        marginTop: 10,
        fontSize: 30,
        color: '#fff'
    }
});