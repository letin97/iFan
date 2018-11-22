import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

import mtp from '../assets/icons/mtp.jpg';
import soobin from '../assets/icons/soobin.jpg';
import mytam from '../assets/icons/mytam.jpg';
import khoimy from '../assets/icons/khoimy.jpg';
import bichphuong from '../assets/icons/bichphuong.jpg';
import baoanh from '../assets/icons/baoanh.jpg';

export default class ScrollViewImage extends Component {

    goToSinger() {
        this.props.navigation.navigate('Singer');
    }

    render() {
        return (
            <View>
                <Text style={styles.text}>Ca sĩ</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity onPress={this.goToSinger.bind(this)}>
                        <View style={{ alignItems: 'center', paddingHorizontal: 3 }}>
                            <Image source={mtp} style={styles.image} />
                            <Text style={styles.name}>Sơn Tùng MTP</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', paddingHorizontal: 3 }}>
                        <Image source={soobin} style={styles.image} />
                        <Text style={styles.name}>Soobin Hoàng Sơn</Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingHorizontal: 3 }}>
                        <Image source={mytam} style={styles.image} />
                        <Text style={styles.name}>Mỹ Tâm</Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingHorizontal: 3 }}>
                        <Image source={bichphuong} style={styles.image} />
                        <Text style={styles.name}>Bích Phương</Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingHorizontal: 3 }}>
                        <Image source={khoimy} style={styles.image} />
                        <Text style={styles.name}>Khởi My</Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingHorizontal: 3 }}>
                        <Image source={baoanh} style={styles.image} />
                        <Text style={styles.name}>Bảo Anh</Text>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200
    },
    text: {
        fontSize: 14,
        padding: 10,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});
