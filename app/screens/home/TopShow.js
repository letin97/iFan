import React, { Component } from 'react';
import {
    Dimensions, View, Text,
    TouchableOpacity, ImageBackground, StyleSheet, Image
} from 'react-native';

import icStar from '../../assets/icons/star.png';

const url = 'http://192.168.1.4/ifan/banners/show/';
const paddingValue = 5;
const width = Dimensions.get('window').width;

export default class TopShow extends Component {

    goToDetail(id) {
        this.props.navigation.navigate('Detail', { id });
    }

    parseDate(input) {
        const parts = input.trim().replace(/ +(?= )/g,'').split(/[\s-\/:]/);
        return parts;
    }

    render() {
        const { topshow } = this.props;
        if (Object.keys(topshow).length === 0) return null;
           
        const { wapper, imageStyle, showCard, boderTime, showTime, showInfo, showImp, showPrice,
            showDate, showMonth, showName, showPlace, startIcon, boderPrice } = styles;

        return (
            <View style={wapper}>
                <TouchableOpacity style={showCard} onPress={() => this.goToDetail(topshow.id)}>
                    <ImageBackground source={{ uri: `${url}${topshow.banners[0]}` }} style={imageStyle}>
                        <View style={boderTime}>
                            <Text style={showDate}>{this.parseDate(topshow.time)[2]}</Text>
                            <Text style={showMonth}>{this.parseDate(topshow.time)[1]}</Text>
                        </View>
                    </ImageBackground>
                    <View style={showInfo}>
                        <Text style={showTime}>{this.parseDate(topshow.time)[3]}:{this.parseDate(topshow.time)[4]}</Text>
                        <Text style={showName}>{topshow.name}</Text>
                        <Text style={showPlace}>{topshow.place}</Text>
                        <View style={showImp}>
                            <View style={boderPrice}>
                                <Text style={showPrice}>{topshow.price}</Text>
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
    startIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 14
    }
});

