import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import img from '../assets/icons/mtp.jpg';

export default class SingerCard extends Component {

    render() {
        const { showCard, imageStyle, name, row } = styles;
        return (
            <View style={showCard}>
                <View style={row}>
                    <View style={{ flex: 2 }}>
                        <Image source={img} style={imageStyle} />
                    </View>
                    <View style={{ flex: 8, paddingHorizontal: 10 }}>
                        <Text style={name}>Sơn Tùng MTP</Text>
                    </View>
                </View>
                <View style={row}>
                    <View style={{ flex: 2 }}>
                        <Image source={img} style={imageStyle} />
                    </View>
                    <View style={{ flex: 8, paddingHorizontal: 10 }}>
                        <Text style={name}>Sơn Tùng MTP</Text>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    showCard: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    name: {
        color: '#727272',
        fontWeight: 'bold',
        fontSize: 16
    },
});

