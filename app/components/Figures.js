import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Figures extends Component {

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.text}>SẼ THAM GIA</Text>
                    <Text style={styles.number}>100</Text>
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text >QUAN TÂM</Text>
                    <Text >200</Text>
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text >LƯỢT CHIA SẺ</Text>
                    <Text >300</Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#000',
        fontSize: 14,
        //fontWeight: 'bold',
    },
    number: {
        color: '#FF1F1F',
        fontSize: 12,
    },
});
