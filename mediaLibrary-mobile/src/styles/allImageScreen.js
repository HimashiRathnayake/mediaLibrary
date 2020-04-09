import {StyleSheet, Dimensions} from 'react-native';

export const stylesScreen = StyleSheet.create({
    container:{
        marginTop: 10,
        width: Dimensions.get('screen').width,
        flexDirection:'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginBottom: 120
    },
    imagewrapper:{
        margin: 5,
        borderRadius: 30,
        width: null,
        alignSelf: 'stretch',
        resizeMode: 'contain',
        height: 110,
        width: 110,
        borderRadius: 30,
    },
    imagename:{
        marginTop: -10,
        alignSelf: 'center',
        color: 'white'
    },
    noImageContainer:{
        marginTop: '50%',
        alignSelf: 'center',
    },
    noImageText: {
        color: '#fff',
        justifyContent: 'space-between',
        textAlignVertical: 'center',
        fontSize: 20
    },
    image:{
        flex: 1,
        alignSelf: 'stretch',
        resizeMode: 'cover',
        height: 110,
        width: 110,
        borderRadius: 10,
    },
    imageIcon: {
        fontSize: 100,
        color: '#9e9e9e',
        alignSelf: 'center'
    },
    addImageIcon: {
        fontSize: 150,
        color: '#9e9e9e',
        alignSelf: 'center',
        // marginTop: -200
    },
    imageAdder: {

    }
});