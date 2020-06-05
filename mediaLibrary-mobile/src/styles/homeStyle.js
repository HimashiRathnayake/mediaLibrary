import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const styleHome = StyleSheet.create({
    header:{
        backgroundColor: 'rgba(254,254,254,0.2)',
        borderRadius: 10,
        marginTop:30,
        height: 50,
        width: screenWidth-20,
        alignSelf: 'center',
        marginBottom: 12,
    },
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
        height: screenHeight*2/5 - 50,
        width: Dimensions.get('screen').width-20,
        resizeMode: 'cover',
        marginBottom: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    nextHeader:{
        marginTop: 8,
        fontSize: 22,
        marginLeft: 10,
        fontWeight: "bold",
        color: '#1976d2',
    },
    imageContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        height: screenHeight*2/5,
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