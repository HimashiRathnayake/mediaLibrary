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
    folderWrapper: {
        width: 110,
        marginLeft: 10,
        justifyContent: 'center',
        marginBottom: 5
    },
    folderIcon: {
        fontSize: 100,
        color: '#9e9e9e',
        alignSelf: 'center'
    },
    folderName: {
        marginTop: -12,
        color: '#fff',
        alignSelf: 'center'
    },
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalView: {
        height: 200,
        marginTop: 200,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('screen').width-40,
        borderRadius: 20
    },
    input: {
        width: Dimensions.get('screen').width-80,
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    inputHeader:{
        marginTop: 40,
        marginLeft: 20,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    bottom:{
        flex: 1,
        top: 50,
        width: Dimensions.get('screen').width-40,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 16,
    },
    folderActionModal:{
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center'
    },
    modalContainer:{
        backgroundColor: 'white',
        height: Dimensions.get('screen').height/4,
        width: Dimensions.get('screen').width/2 + 60,
        borderRadius: 20,
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: Dimensions.get('screen').height/16 - 5,
    },
    modalText: {
        paddingVertical: 10,
        textAlign: 'center',
        fontSize: 18
    },
    noFolderContainer:{
        marginTop: '50%',
        alignSelf: 'center',
    },
    noFolderText:{
        color: '#fff',
        justifyContent: 'space-between',
        textAlignVertical: 'center',
        fontSize: 20
    },
    addFolderIcon: {
        fontSize: 150,
        color: '#9e9e9e',
        alignSelf: 'center',
        // marginTop: -200
    },
});