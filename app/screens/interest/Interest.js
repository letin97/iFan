import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import schedule from '../../assets/icons/schedule.png';
import showAttend from '../../assets/icons/show_attend.png';
import showAttendGreen from '../../assets/icons/show_attend_green.png';

export default class Interest extends Component {

    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <Text style={styles.text}>Show diễn</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ListShow')}>
                    <View style={styles.row}>
                        <Image source={schedule} style={styles.image} />
                        <Text style={styles.name}>Show sắp diễn ra</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Image source={showAttendGreen} style={[styles.image]} />
                        <Text style={styles.name}>Show sẽ tham gia</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Image source={showAttend} style={styles.image} />
                        <Text style={styles.name}>Show đã tham gia</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.text}>Ca sĩ</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ListSinger')}>
                    <View style={styles.row}>
                        <Image source={schedule} style={styles.image} />
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

