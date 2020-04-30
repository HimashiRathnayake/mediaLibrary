import {StyleSheet, Dimensions} from 'react-native';

export const stylesScreen = StyleSheet.create({
    upModal:{
        width: Dimensions.get('screen').width,
        height: 100,
    },
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(1,1,1,1)',
    },
    modalView: {
        height: Dimensions.get('screen').height,
        alignSelf: 'center',
        backgroundColor: 'rgba(1,1,1,1)',
        width: Dimensions.get('screen').width,
        borderRadius: 20,
        opacity: 1.0
    },
    icon: {
        color: '#fff',
        opacity: 0.8,
        fontSize: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    iconLeft:{
        color: '#fff',
        fontSize: 30,
        paddingTop: 15,
        marginRight: Dimensions.get('screen').width-220,
    },
    originalImage:{
        alignSelf: 'stretch',
        resizeMode: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
});