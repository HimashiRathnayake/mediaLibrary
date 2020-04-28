import {StyleSheet, Dimensions} from 'react-native';

export const stylesScreen = StyleSheet.create({
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,1)',
    },
    modalView: {
        height: Dimensions.get('screen').height,
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width,
        borderRadius: 20,
        opacity: 1.0
    },
    icon: {
        color: 'black',
        fontSize: 20,
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    iconLeft:{
        color: '#fff',
        fontSize: 20,
        paddingRight: 120,
        paddingTop: 15,
    },
    originalImage:{
        alignSelf: 'stretch',
        resizeMode: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
});