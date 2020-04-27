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
         color: '#fff',
    },
    icon: {
        color: '#fff',
        fontSize: 20,
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    iconEdit: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 5,
        paddingTop: 20,
    },
    iconLeft:{
        color: '#fff',
        fontSize: 20,
        paddingRight: 120,
        paddingTop: 15,
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
        width: Dimensions.get('screen').width - 80,
        height: Dimensions.get('screen').height/2,
        alignSelf: 'center',
        justifyContent:'center'
    },
    detailsContainer:{
        textAlign: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        alignSelf: 'center',
        backgroundColor: 'black'
    },
    originalImage:{
        alignSelf: 'stretch',
        resizeMode: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height-100
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
        paddingTop: 20,
        width: Dimensions.get('screen').width /2 
    },
    detailTextName: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 20,
        paddingTop: 20,
        width: Dimensions.get('screen').width /2 -40
    },
});