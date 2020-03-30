import React from 'react';
import {UtilityThemeProvider} from 'react-native-design-utility';
import Navigator from './src/navigators/'

export default ()=>(
	<UtilityThemeProvider>
		<Navigator/>
	</UtilityThemeProvider>
);
		