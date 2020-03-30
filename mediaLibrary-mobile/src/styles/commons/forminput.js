import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width:300,
        height: 50,
        marginHorizontal: 30,
        paddingLeft: 60,
        borderRadius: 20,
        color: '#ffffff',
		marginBottom: 20,
	  },
	  inputIcon: {
		position: 'absolute',
		zIndex: 99,
		left: 40,
		top: 9,
		color: 'white',
		fontSize: 30,
	  },
	  inputContainer :{
		// flex:1,
	  }
});
