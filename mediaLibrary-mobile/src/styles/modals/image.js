import {StyleSheet, Dimensions} from 'react-native';

export const stylesScreen = StyleSheet.create({
    imagename:{
        alignSelf: 'center',
        color: 'white'
    },
    modal: {
         flex:1,
         padding: 0,
         backgroundColor: 'black',
         color: '#fff'
    },
    icon: {
        color: '#fff',
        fontSize: 20,
        paddingHorizontal: 15,
        paddingTop: 5,
    },
    iconLeft:{
        color: '#fff',
        fontSize: 20,
        paddingRight: 120,
        paddingTop: 5,
    },
    back:{
        color: '#fff',
        fontSize: 20,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        marginRight: 200,
        paddingTop: 5
    },
    details: {
        marginTop: 140,
        width: Dimensions.get('screen').width - 80,
        height: Dimensions.get('screen').height/2,
        alignSelf: 'center'
    },
    originalImage:{
        alignSelf: 'stretch',
        resizeMode: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    detailTextLeft: {
        color: '#fff',
        fontSize: 16,
        paddingTop: 20,
        width: 100
    },
    detailTextRight: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 20,
        paddingTop: 20
    },
});