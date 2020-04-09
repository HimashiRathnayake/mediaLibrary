import {StyleSheet, Dimensions} from 'react-native';

export const styleAudio = StyleSheet.create({
    container:{
        marginTop: 10,
        width: Dimensions.get('screen').width,
        alignSelf: 'center',
        marginBottom: 120,
    },
    noAudioContainer:{
        marginTop: '50%',
        alignSelf: 'center',
    },
    noAudioText: {
        color: '#fff',
        justifyContent: 'space-between',
        textAlignVertical: 'center',
        fontSize: 20
    },
    audioContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        alignSelf: 'center',
        width : Dimensions.get('screen').width - 40,
        padding: 10,
        marginVertical: 2,
        borderRadius: 10        
    },
    audioName: {
        color: '#fff',
        marginHorizontal: 8,
        fontSize: 14
    },
    audioNameLeft: {
        color: 'black',
        marginHorizontal: 0,
        fontSize: 14
    },
    addAudioIcon:{
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
    }
})