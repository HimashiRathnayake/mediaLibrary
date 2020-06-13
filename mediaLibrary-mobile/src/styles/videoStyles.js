import {StyleSheet, Dimensions} from 'react-native';

export const styleVideo = StyleSheet.create({
    container:{
        marginTop: 20,
        width: Dimensions.get('screen').width,
        alignSelf: 'center',
        marginBottom: 120,
    },
    noVideoContainer:{
        marginTop: '40%',
        alignSelf: 'center',
    },
    originalImage:{
        width: 150,
        height:150,
        borderRadius: 10,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 20
    },
    noVideoText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    },
    noVideoTextB:{
        color: '#9e9e9e',
        textAlign: 'center',
        fontSize: 16
    },
    videoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        alignSelf: 'center',
        width : Dimensions.get('screen').width - 40,
        padding: 10,
        marginVertical: 2,
		borderRadius: 10,
		flexDirection: 'row'        
    },
    videoName: {
        color: '#fff',
        marginHorizontal: 8,
        fontSize: 16
	},
	videoIcon: {
		color: '#fff',
		fontSize: 24,
		marginHorizontal: 4
	},
    addVideoIcon:{
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
    iconBottom:{
        position:'absolute', 
        marginTop: 10,
        marginLeft: Dimensions.get('screen').width - 80,
        fontSize: 25
    },
})