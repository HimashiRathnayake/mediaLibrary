import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {LoginScreen} from '../screens/LoginScreen';
import {SplashScreen} from '../screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from '../screens/context';
import {DrawerNavigator} from './DrawerNavigator';

const AuthStack =createStackNavigator();

export default ()=>{
	const [isLoading, setIsLoading] = React.useState(true);
	const [userToken, setUserToken] = React.useState(null);
	const authContext = React.useMemo(()=>{
		return {
			signIn: ()=> {
				setIsLoading(false);
				setUserToken('asdf');
			},
			signUp: ()=> {
				setIsLoading(false);
				setUserToken('asdf');
			},
			signOut: ()=> {
				setIsLoading(false);
				setUserToken(null);
			}
		}
	}, [])

	React.useEffect(()=>{
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	if (isLoading){
		return <SplashScreen/>
	}
	return(
		<AuthContext.Provider value={authContext}>
		<NavigationContainer>
			{userToken ? (
				<DrawerNavigator/>
			) : (
				<AuthStack.Navigator>
					<AuthStack.Screen name="Login" component={LoginScreen} options={{title: "LoginScreen", headerShown: false}}/>
				</AuthStack.Navigator> 
			)}
		</NavigationContainer>
		</AuthContext.Provider>
    );
}