import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    backgroundImage:{
        width:360,
        height:700,
        resizeMode:'contain',
    },
    container: {
        flex: 1,
        backgroundColor: "#EAEAEC"
    },
    header: {
        width: Dimensions.get('screen').width - 20,
        paddingVertical: 12,
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        marginTop: 10
    },
    headerText: {
        fontSize: 18,
        color: '#fff'
    },
    headerIcon: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 10,
        marginTop: 2,
    }
});

