import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const DetailsText = ({children, name}) => (
<View flexDirection='row'><Text style={styles.detailTextLeft}>{name} :</Text><Text style={styles.detailTextRight}>{children}</Text></View>
);
const styles = StyleSheet.create({
    detailTextLeft: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 80,
        paddingTop: 20,
        width: 100
    },
    detailTextRight: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 20,
        paddingTop: 20
    },
});