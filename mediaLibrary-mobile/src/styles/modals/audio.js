import {StyleSheet, Dimensions} from 'react-native';

export const stylesScreen = StyleSheet.create({
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        height: Dimensions.get('screen').height - 100,
        marginTop: 50,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('screen').width-40,
        borderRadius: 20,
        marginTop: 40

    },
    input: {
        width: Dimensions.get('screen').width-80,
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    header:{
        marginTop: 0,
        marginLeft: 20,
        marginBottom: 40,
        fontSize: 18,
        fontWeight: 'bold'
    },
    mainController:{
        top: 40,
        width: Dimensions.get('screen').width-40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50
    },
    icon: {
        fontSize: 30,
    },
    iconBottom:{
        fontSize: 20,
        marginHorizontal: 10
    },
    audioSlider: {
        width: Dimensions.get('screen').width-60,
        alignSelf: 'center'
    },
    volumeController: {
        flexDirection: 'row-reverse',
        marginLeft: 20,
        marginTop: 50,
        marginBottom: 20
    },
    volumeSlider: {
        width: 120
    },
    bottomView:{
        marginTop: 20,
        marginLeft: 20
    },
    text:{
        color: 'black'
    },
    audioTextContainer:{
        flexDirection: 'row-reverse'
    },
    audioText: {
        color: '#9e9e9e',
        marginTop: 2,
        marginRight: 25
    },
    detailTextLeft: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5,
        paddingTop: 20,
        width: 100
    },
    detailTextRight: {
        color: 'black',
        fontSize: 16,
        marginLeft: 0,
        paddingTop: 20,
        width: Dimensions.get('screen').width/2,
    },
});
