import { StyleSheet, Dimensions} from 'react-native';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT / 2 ;

export const stylesScreen = StyleSheet.create({
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        height: Dimensions.get('screen').height,
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width,
        borderRadius: 20,
    },
    header:{
        marginTop: 0,
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    videoContainer:{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height* 1 / 2,
        marginTop: 40,
    },
    video: {
        width: Dimensions.get('screen').width-5,
        alignSelf: 'center',
        height: VIDEO_CONTAINER_HEIGHT,
        backgroundColor: 'black',
        borderRadius: 10,
        elevation: 30
    },
    icon: {
        fontSize: 30,
        color:"black",
        fontSize:32
    },
    iconBottom:{
        fontSize: 20,
        width: DEVICE_WIDTH/3,
        textAlign: 'center',
        marginTop: 20,
    },
    bottomView:{
        marginTop: 20,
        marginLeft: 20
    },
    headerTop:{
        marginTop: 10,
        fontSize: 12,
        alignSelf: 'center',
        color: '#B6B7BF'
    },
    header:{
        fontSize: 15,
        fontWeight: "500",
        marginTop: 8,
        marginBottom: 10,
        color: "#8E97A6",
        alignSelf: 'center'
    },
    bottom:{
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    bottomText:{
        marginTop: 20,
        fontSize: 16,
        color: '#1976d2'
    },    
});