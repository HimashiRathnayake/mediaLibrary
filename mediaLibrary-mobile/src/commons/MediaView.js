import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import {styles} from '../styles/commons/mediaButton';

export const MediaButton = ({children, type, onPress}) => (
    <TouchableOpacity accessibilityLabel='mediaButton' onPress={onPress}>
        <View style={styles.container}>
            <View style={styles.buttonView}>
                {type==='Image'&&<Entypo name="images" style={styles.icon}/>}
                {type==='Audio'&&<Entypo name="beamed-note" style={styles.icon}/>}
                {type==='Video'&&<MaterialIcons name="video-library" style={styles.icon}/>}
            </View>
            <View>
                <Text style={styles.text}>{children}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

