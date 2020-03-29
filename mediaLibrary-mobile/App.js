import React, { Component } from 'react';
import {UtilityThemeProvider, Box, Text} from 'react-native-design-utility';
import Navigator from './src/screens/'

export default class Cat extends Component {
  render() {
	return (
		<UtilityThemeProvider>
			<Navigator/>
		</UtilityThemeProvider>
	);
  }
}


