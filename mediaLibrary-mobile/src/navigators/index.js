import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {SplashScreen} from '../screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from './context';
import {DrawerNavigator} from './DrawerNavigator';
import {AsyncStorage} from 'react-native';
import {AuthNavigator} from '../navigators/StackNavigators';

const Stack =createStackNavigator();

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
			};
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
				console.log(e);
			}
			dispatch({ type: 'RESTORE_TOKEN', token: userToken });
		  	};
			bootstrapAsync();	
		}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async data => {
				await AsyncStorage.multiSet([['userToken',data.token],['email',data.email]]);
			    dispatch({ type: 'SIGN_IN', token: data.token });
			},
			signOut: async () => {
				let keys = ['userToken','email'];
				await AsyncStorage.clear();
				dispatch({ type: 'SIGN_OUT' });
			},
			signUp: async data => {
				await AsyncStorage.multiSet([['userToken',data.token],['email',data.email]]);
			    dispatch({ type: 'SIGN_IN', token: data.token});
			},
		  }),[]
	);

	if (state.isLoading){
		return <SplashScreen/>
	}
	return(
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				<Stack.Navigator>
					{state.userToken === null ? (
						<Stack.Screen name='AuthNavigator' component={AuthNavigator} options={{headerShown: false}}/>
					) : (
						<Stack.Screen name='DrawerNavigator' component={DrawerNavigator} options={{headerShown: false}}/>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
    );
}