import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
      backgroundImage:{
          width:360,
          height:640,
          resizeMode:'contain'
      },
      form: {
          alignContent: 'center',
          justifyContent: 'center',
          flex: 1
      },
      btn: {
        position: 'absolute',
        top: 55,
        right: 28,
      },
      bottom: {
        flex: 1,
        top: 65,
        width:360,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      bottomtext: {
        color: 'white',
        backgroundColor: 'transparent',
      },
      loginbutton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1976d2',
        height: 50,
        borderRadius: 20,
        zIndex: 100,
        width: 200
      },
      buttonContainer: {
        flex: 1,
        top: -95,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      logintext: {
        color: 'white',
        backgroundColor: 'transparent',
      },
      headerContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
        fontSize: 26
      },
});
