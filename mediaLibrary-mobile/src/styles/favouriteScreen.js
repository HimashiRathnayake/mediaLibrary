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
        width: Dimensions.get('screen').width/3,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    headerText: {
        fontSize: 18,
        color: '#fff',
        borderBottomWidth: 2,
    },
    headerIcon: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 10,
        marginTop: 2,
    }
});

