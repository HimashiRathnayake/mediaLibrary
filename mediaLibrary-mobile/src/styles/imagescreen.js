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
        height: 140,
        width: 110,
        borderRadius: 30,
    },
    imagename:{
        alignSelf: 'center',
        color: 'white'
    },
    noImageContainer:{
        flex:1,
        alignSelf: 'center',
    },
    noImageText: {
        flex: 0.75,
        color: '#fff',
        justifyContent: 'space-between',
        textAlignVertical: 'center',
        fontSize: 20
    }
});