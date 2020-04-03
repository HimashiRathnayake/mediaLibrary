import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {LoginScreen} from '../screens/LoginScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {SplashScreen} from '../screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from './context';
import {DrawerNavigator} from './DrawerNavigator';
import {AsyncStorage} from 'react-native';

const AuthStack =createStackNavigator();

export default ()=>{
	const [state, dispatch] = React.useReducer((prevState, action)=>{
		switch (action.type) {
			case 'RESTORE_TOKEN': return {
				...prevState,
				userToken: action.token,
				isLoading: false,
			};
			case 'SIGN_IN': return{
				...prevState,
				isSignout: false,
				userToken: action.token
			};
			case 'SIGN_OUT': return{
				...prevState,
				isSignout: true,
				userToken: null,
			}
		}
	}, {
		isLoading: true,
		isSignout: false,
		userToken: null
	});

	React.useEffect(()=>{
		const bootstrapAsync = async () => {
			let userToken;
			try {
			  	userToken = await AsyncStorage.getItem('userToken');
			} catch (e) {
			}
			dispatch({ type: 'RESTORE_TOKEN', token: userToken });
		  	};
			bootstrapAsync();	
		}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async data => {
				await AsyncStorage.setItem('userToken',data);
			    dispatch({ type: 'SIGN_IN', token: data });
			},
			signOut: () => dispatch({ type: 'SIGN_OUT' }),
			signUp: async data => {
				await AsyncStorage.setItem('userToken',data);
			    dispatch({ type: 'SIGN_IN', token: data});
			},
		  }),
		  []
	);

	if (state.isLoading){
		return <SplashScreen/>
	}
	return(
		<AuthContext.Provider value={authContext}>
		<NavigationContainer>
			{state.userToken == null ? (
				<AuthStack.Navigator>
					<AuthStack.Screen name="Login" component={LoginScreen} options={{title: "LoginScreen", headerShown: false}}/>
					<AuthStack.Screen name="SignUp" component={SignUpScreen} options={{title: "SignUpScreen", headerShown: false}}/>
				</AuthStack.Navigator> 
			) : (
				<DrawerNavigator/>
			)}
		</NavigationContainer>
		</AuthContext.Provider>
    );
}