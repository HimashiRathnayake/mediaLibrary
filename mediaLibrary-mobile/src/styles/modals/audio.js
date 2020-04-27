import {StyleSheet, Dimensions} from 'react-native';

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
        marginHorizontal: 10,
        color: 'black',
    },
    audioSlider: {
        width: Dimensions.get('screen').width-120,
        alignSelf: 'center',
        marginTop: 10
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
    detailsView:{
        marginTop: 0,
        marginLeft: 20,
    },
    text:{
        color: 'white'
    },
    audioTextContainer:{
        flexDirection: 'row-reverse'
    },
    audioText: {
        color: '#9e9e9e',
        marginTop: -12,
        marginRight: 48
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
        marginHorizontal: 8,
        fontSize: 16
    },
    userIcon:{
        color: '#fff',
		fontSize: 24,
		marginHorizontal: 4
    },
    removeIcon: {
        color: '#fff',
        fontSize: 24,
        marginLeft: Dimensions.get('screen').width - 250,
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
    }
});
