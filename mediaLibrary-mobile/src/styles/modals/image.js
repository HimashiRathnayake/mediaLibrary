import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width; 

export const stylesScreen = StyleSheet.create({
    upModal:{
        width: Dimensions.get('screen').width,
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.5)'
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
    bottomModal: {
        height: 140,
        marginTop: deviceHeight - 160,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    bottomBar:{
        height: 80,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginTop: deviceHeight - 80,
        width: deviceWidth -10,
        alignSelf: 'center',
    },
    bottomHeader:{
        marginTop: 0,
        fontSize: 12,
        alignSelf: 'center',
        color: '#B6B7BF'
    },
    bottomText:{
        fontSize: 15,
        fontWeight: "500",
        marginTop: 8,
        color: "#8E97A6",
        alignSelf: 'center'
    },
    msg:{
        color: "#fff",
        marginTop: -4
    },
});