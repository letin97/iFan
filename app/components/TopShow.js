import React, { Component } from 'react';
import {
    Dimensions, View, Text,
    TouchableOpacity, ImageBackground, StyleSheet, Image
} from 'react-native';

import img from '../assets/icons/show1.jpg';
import icStar from '../assets/icons/star.png';

const paddingValue = 5;
const width = Dimensions.get('window').width;

export default class TopShow extends Component {

    render() {
        const { wapper, imageStyle, showCard, boderTime, showTime, showInfo, showImp, showPrice,
            showDate, showMonth, showName, showPlace, numberPeple, startIcon, boderPrice } = styles;
        return (
            <View style={wapper}>
                <TouchableOpacity style={showCard}>
                    <ImageBackground source={img} style={imageStyle}>
                        <View style={boderTime}>
                            <Text style={showDate}>18</Text>
                            <Text style={showMonth}>09</Text>
                        </View>
                    </ImageBackground>

                    <View style={showInfo}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 7 }}>
                                <Text style={showTime}>TODAY 20:00</Text>
                                <Text style={showName}>Show diễn Heniken</Text>
                                <Text style={showPlace}>Nhà hát Thành phố</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={numberPeple}>1,2k người</Text>
                            </View>

                        </View>

                        <View style={showImp}>
                            <View style={boderPrice}>
                                <Text style={showPrice}>200,000</Text>
                            </View>

                            <Image source={icStar} style={startIcon} />
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wapper: {
        backgroundColor: '#FFF',
        margin: 5,
        elevation: 5,
        justifyContent: 'space-between'
    },
    imageStyle: {
        height: (width - (paddingValue * 6)) / 2,
        borderRadius: 5,
        overflow: 'hidden',
    },
    showCard: {
        elevation: 5,
        backgroundColor: '#FFF'
    },
    boderTime: {
        borderWidth: 1,
        borderColor: '#A0A0A0',
        borderRadius: 5,
        position: 'absolute', // child
        bottom: 0, // position where you want
        left: 0,
        backgroundColor: 'rgba(40,40,40,0.6)',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    showDate: {
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
    },
    showMonth: {
        color: '#fff',
        fontSize: 16,
    },
    showInfo: {
        paddingTop: 6,
        paddingLeft: 15,
    },
    showTime: {
        color: '#FF1F1F',
        fontWeight: 'bold',
        fontSize: 14,
    },
    showName: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18
    },
    showPlace: {
        color: '#6E6E6E',
        fontSize: 14
    },
    showImp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6
    },
    showPrice: {
        color: '#FF1F1F',
        fontWeight: 'bold',
        fontSize: 14,
    },
    boderPrice: {
        borderWidth: 1,
        borderColor: '#A0A0A0',
        borderRadius: 5,
        flex: 1,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberPeple: {
        color: '#A0A0A0',
        fontSize: 18,
        fontWeight: 'bold',
    },
    startIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 14
    }
});

