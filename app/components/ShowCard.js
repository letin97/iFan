import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import img from '../assets/icons/show1.jpg';
import icStar from '../assets/icons/star.png';
import icLocation from '../assets/icons/local.png';

export default class ShowCard extends Component {

    render() {
        const { showCard, imageStyle, showTime, showName, showPlace, showAddress, showImp,
            boderPrice, showPrice, startIcon, locationIcon } = styles;
        return (
            <View style={showCard}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 4 }}>
                        <Image source={img} style={imageStyle} />
                    </View>
                    <View style={{ flex: 6, paddingHorizontal: 10 }}>
                        <Text style={showTime}>TODAY 20:00</Text>
                        <Text style={showName}>Show diễn Heniken</Text>
                        <Text style={showPlace}>Nhà hát Thành phố</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={icLocation} style={locationIcon} />
                            <Text style={showAddress}>07 Công Trường Lam Sơn, Bến Nghé, Quận 1, Hồ Chí Minh</Text>
                        </View>
                        <View style={showImp}>
                            <View style={boderPrice}>
                                <Text style={showPrice}>200,000</Text>
                            </View>
                            <Image source={icStar} style={startIcon} />
                        </View>
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
        //elevation: 5,
        backgroundColor: 'transparent'
    },
    imageStyle: {
        width: null,
        height: 120,
        borderRadius: 5
    },
    showTime: {
        color: '#FF1F1F',
        fontWeight: 'bold',
        fontSize: 12
    },
    showName: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    showPlace: {
        color: '#6E6E6E',
        fontSize: 12
    },
    showAddress: {
        color: '#6E6E6E',
        fontSize: 10
    },
    showImp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4
    },
    showPrice: {
        color: '#FF1F1F',
        fontWeight: 'bold',
        fontSize: 12,
    },
    boderPrice: {
        borderWidth: 1,
        borderColor: '#A0A0A0',
        borderRadius: 5,
        flex: 1,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 12
    },
    locationIcon: {
        width: 11,
        height: 11,
        marginTop: 2,
    }
});

