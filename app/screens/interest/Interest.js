import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import schedule from '../../assets/icons/schedule.png';
import icSinger from '../../assets/icons/singer.png';

export default class Interest extends Component {

    goToListShow() {
        this.props.navigation.push('ListUserShow');
    }

    goToListSinger() {
        this.props.navigation.push('ListUserSinger');
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <Text style={styles.text}>Show diễn</Text>
                <TouchableOpacity onPress={() => this.goToListShow()}>
                    <View style={styles.row}>
                        <Image source={schedule} style={styles.image} />
                        <Text style={styles.name}>Show quan tâm</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.text}>Ca sĩ</Text>
                <TouchableOpacity onPress={() => this.goToListSinger()}>
                    <View style={styles.row}>
                        <Image source={icSinger} style={styles.image} />
                        <Text style={styles.name}>Ca sĩ quan tâm</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center', marginVertical: 5, },
    map: { flex: 1 },
    image: { width: 30, height: 30, marginHorizontal: 10, },
    text: { fontSize: 14, padding: 10, fontWeight: 'bold', },
    name: { fontSize: 14, color: '#6E6E6E' }
});

