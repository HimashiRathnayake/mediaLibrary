import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

export const stylesScreen = StyleSheet.create({
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,1)',
    },
    bottomBar:{
        height: 53,
        backgroundColor: 'rgba(1,1,1,0.7)',
        marginTop: deviceHeight - 80,
        width: deviceWidth -10,
        alignSelf: 'center',
    },
    msg:{
        color: "#fff",
        marginTop: -6
    },
    icon: {
        fontSize: 30,
        color:"black",
        fontSize:32
    },
    detailsView:{
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: 'white',
    },
    detailTextLeft: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5,
        paddingTop: 16,
        width: 100
    },
    detailTextRight: {
        color: '#8E97A6',
        fontSize: 16,
        marginLeft: 5,
        paddingTop: 16,
        width: Dimensions.get('screen').width/2,
    },
    accessText: {
        color: 'black',
        fontSize: 17,
        marginLeft: 5,
        paddingTop: 20,
        marginLeft: 24,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    userContainer: {
        flexDirection: 'row',
        backgroundColor: '#93A8B3',
        alignSelf: 'center',
        width : Dimensions.get('screen').width - 40,
        padding: 10,
        marginVertical: 2,
        borderRadius: 10        
    },
    userName: {
        color: '#fff',
        marginLeft: 8,
        marginRight: 2,
        fontSize: 16,
        width: Dimensions.get('screen').width - 145 ,
    },
    email: {
        color: '#fff',
        marginHorizontal: 8,
        fontSize: 16,
        width: Dimensions.get('screen').width - 90 ,
    },
    userIcon:{
        color: '#fff',
		fontSize: 24,
		marginHorizontal: 4
    },
    removeIcon: {
        color: '#fff',
        fontSize: 24,
        marginLeft: 10,
        position: 'relative',
    },
    renameIcon:{
        color: 'black',
		fontSize: 28,
        marginHorizontal: 0,
        marginTop: 16
    },
    button: {
        alignSelf: 'stretch',
        width: Dimensions.get('screen').width/3,
        marginBottom: 12,
        marginTop: 10,
        marginLeft:5,
        color: '#1976d2',
        fontSize: 14
    },
    detailsHeader: {
        elevation:6, 
        backgroundColor:'#fff',
        alignSelf:'center', 
        width:Dimensions.get('screen').width-10, 
        height:60,
        marginTop: 4,
        shadowColor: 'black',  
    },
    shareModal: {
        opacity: 0.9,
        backgroundColor: '#242424',
        height: Dimensions.get('screen').height,
        justifyContent: 'center',
    },
    shareView: {
        height: Dimensions.get('screen').height,
        backgroundColor: '#fff',
        // borderRadius: 20,
        alignSelf: 'center'
    },
    input: {
        backgroundColor: "rgba(52,52,52,0.3)",
        marginTop: 40,
        width:300,
        height: 50,
        marginHorizontal: 30,
        paddingLeft: 60,
        borderRadius: 20,
        color: '#ffffff',
        marginBottom: 20,
    }, 
    inputIcon: {
        marginTop: 40,
        position: 'absolute',
        zIndex: 99,
        left: 40,
        top: 9,
        color: "rgba(52,52,52,0.9)",
        fontSize: 30,
    },
    inputContainer:{
        marginTop: -20
    },
    owner: {
        color: 'rgba(52,52,52,0.5)',
    },
    coverContainer: {
        marginTop: 20,
        width: 130,
        height: 130,
        alignSelf: 'center',
        alignItems: 'stretch',
        elevation: 8,
        backgroundColor: '#0000',
        borderRadius: 60,
        marginBottom: -20
    },
    image:{
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf:'center',
        justifyContent: 'center'
    },
});
