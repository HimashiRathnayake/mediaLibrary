import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export const styleHome = StyleSheet.create({
    backgroundImage:{
        width:screenWidth,
        height:screenHeight + 100,
        resizeMode:'contain',
    },
    container: {
        alignContent: 'center',
        flex: 1,
        marginBottom: 60
    },
    image: {
        alignSelf: 'center',
        height: 200,
        width: Dimensions.get('screen').width-20,
        resizeMode: 'cover',
        marginBottom: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    nextHeader:{
        marginTop: 30,
        fontSize: 22,
        marginLeft: 10,
        fontWeight: "bold",
        color: '#1976d2',
    },
    imageContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        height: 250,
        width: screenWidth-20,
        resizeMode: 'stretch',
        marginTop: 12,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    imageText:{
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 10
    },
    imageBottom: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center'
    }
});