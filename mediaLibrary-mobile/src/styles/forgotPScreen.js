import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  backgroundImage:{
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      resizeMode:'contain'
  },
  form: {
      alignContent: 'center',
      justifyContent: 'center',
      flex: 3
  },
  btn: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  bottom: {
    flex: 1,
    paddingTop: 10,
    width:360,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomtext: {
    color: 'white',
    backgroundColor: 'transparent',
    height: 50,
    marginTop: 20
  },
  loginbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976d2',
    height: 50,
    borderRadius: 20,
    zIndex: 100,
    width: 200,
    alignSelf: 'center',
    marginTop: 20
  },
  logintext: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 20,
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize: 26,
    marginBottom: 20
  },
  smallHeader:{
    color: '#9e9e9e',
    backgroundColor: 'transparent',
    fontSize: 15
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width:300,
    height: 50,
    marginHorizontal: 30,
    paddingLeft: 60,
    borderRadius: 20,
    color: '#ffffff',
    marginBottom: 20,
    marginTop: 20,
  },
  inputIcon: {
    position: 'absolute',
    zIndex: 99,
    left: 40,
    top: 9,
    color: 'white',
    fontSize: 30,
    marginTop: 20,
  },
  errorText:{
    color: '#d32f2f',
    alignSelf: 'center',
    marginTop: -20
  }
});
