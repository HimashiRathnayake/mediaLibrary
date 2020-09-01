import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const stylesScreen = StyleSheet.create({
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    bottomBar:{
        height: 80,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginTop: deviceHeight - 80,
        width: deviceWidth -10,
        alignSelf: 'center',
    },
    msg:{
        color: "#fff",
        marginTop: -4
    },
    modalView: {
        height: Dimensions.get('screen').height,
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width,
        borderRadius: 20,
    },
    input: {
        width: Dimensions.get('screen').width-80,
        alignSelf: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
    headerTop:{
        marginTop: 0,
        fontSize: 12,
        alignSelf: 'center',
        color: '#B6B7BF'
    },
    header:{
        fontSize: 15,
        fontWeight: "500",
        marginTop: 8,
        color: "#8E97A6",
        alignSelf: 'center'
    },
    image:{
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf:'center',
        justifyContent: 'center'
    },
    mainController:{
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: 140,
        width: 140,
        borderRadius: 100,
        backgroundColor: 'rgba(93, 63, 106, 0.2)'
    },
    icon: {
        fontSize: 30,
        color:"black",
        fontSize:32
    },
    iconTop:{
        fontSize: 22,
        marginHorizontal: 20,
        color: 'black',
    },
    audioSlider: {
        width: Dimensions.get('screen').width-120,
        alignSelf: 'center',
        marginTop: 10
    },
    // volumeController: {
    //     flexDirection: 'row-reverse',
    //     marginLeft: 20,
    //     marginTop: 50,
    //     marginBottom: 20
    // },
    // volumeSlider: {
    //     width: 120
    // },
    audioTextContainer:{
        flexDirection: 'row-reverse'
    },
    audioText: {
        color: '#9e9e9e',
        marginTop: -12,
        marginRight: 48
    },
    track: {
        height: 3,
        borderRadius: 2,
        backgroundColor: "#FFF"
    },
    thumb: {
        width:  12,
        height: 12,
        backgroundColor: "#3D425C"
    },
    coverContainer: {
        marginTop: 20,
        width: 210,
        height: 210,
        alignSelf: 'center',
        alignItems: 'stretch',
        elevation: 8,
        backgroundColor: '#0000',
        borderRadius: 100
    },
    playButtonContainer: {
        backgroundColor: "#FFF",
        borderColor: "#93A8B3",
        borderWidth: 16,
        width: 80,
        height: 80,
        borderRadius: 64,
        alignItems: "center",
        alignSelf: 'center',
        justifyContent: "center",
        marginHorizontal: 32,
        paddingLeft:2
    },
    title:{
        fontSize: 18, 
        fontWeight: "500",
        color: "#3D425C"
    },
    artist:{
        fontSize: 15, 
        marginTop: 2,
        color: "#8E97A6"
    },
    bottom:{
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    bottomText:{
        marginTop: 10,
        fontSize: 16,
        color: '#1976d2'
    },
});
