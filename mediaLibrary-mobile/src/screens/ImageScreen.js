import React, {Component} from 'react';
import {Box, Text} from 'react-native-design-utility';
import { ScreenContainer } from 'react-native-screens';
import { Button } from 'react-native';
import { BaseRouter } from '@react-navigation/native';

export const ImageScreen = ({navigation}) => (
    <Box f={1} center>
        <Text>Images</Text>
        {navigation.setParams({type: 'Image'})}
    </Box>
);