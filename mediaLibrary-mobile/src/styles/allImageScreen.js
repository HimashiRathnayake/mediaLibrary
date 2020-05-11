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
        marginTop: '60%',
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
    addImageIcon:{
        fontSize: 50,
        color: '#1976d2',
        alignSelf: 'center',
    },
    iconContainer:{
        backgroundColor: '#fff',
        position: 'absolute',
        top: Dimensions.get('screen').height - 140,
        right: 20,
        width: 50,
        height: 50,
        alignSelf: 'flex-end',
        borderRadius: 100,
        justifyContent: 'center',
        shadowOpacity: 1
    },
    folderActionModal:{
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center'
    },
    modalContainer:{
        backgroundColor: 'white',
        height: Dimensions.get('screen').height / 4,
        width: Dimensions.get('screen').width*2/3,
        borderRadius: 20,
        alignSelf: 'center',
        paddingTop: 10,
    },
    modalText: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 18
    },
});