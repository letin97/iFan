import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';

import icStar from '../../assets/icons/star.png';
import icLocation from '../../assets/icons/local.png';

const url = 'http://192.168.1.4/ifan/banners/show/';

export default class ShowCard extends Component {

    parseDate(input) {
        const parts = input.trim().replace(/ +(?= )/g,'').split(/[\s-\/:]/);
        return parts;
    }

    render() {
        const { show } = this.props;

        const { showCard, imageStyle, boderTime, showDate, showMonth, showTime, showName, showPlace, showAddress, showImp,
            boderPrice, showPrice, startIcon, locationIcon } = styles;
        return (
            <View style={showCard}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 4 }}>
                        <ImageBackground source={{ uri: `${url}${show.banners[0]}` }} style={imageStyle}>
                                <View style={boderTime}>
                                    <Text style={showDate}>{this.parseDate(show.time)[2]}</Text>
                                    <Text style={showMonth}>{this.parseDate(show.time)[1]}</Text>
                                </View>
                        </ImageBackground>
                    </View>
                    <View style={{ flex: 6, paddingHorizontal: 10 }}>
                        <Text style={showTime}>{this.parseDate(show.time)[3]}:{this.parseDate(show.time)[4]}</Text>
                        <Text style={showName}>{show.name}</Text>
                        <Text style={showPlace}>{show.place}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={icLocation} style={locationIcon} />
                            <Text style={showAddress}>{show.address}</Text>
                        </View>
                        <View style={showImp}>
                            <View style={boderPrice}>
                                <Text style={showPrice}>{show.price}</Text>
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
        borderRadius: 5,
        overflow: 'hidden',
    },
    boderTime: {
        borderWidth: 1,
        borderColor: '#A0A0A0',
        borderRadius: 5,
        position: 'absolute', // child
        bottom: 0, // position where you want
        left: 0,
        backgroundColor: 'rgba(40,40,40,0.6)',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    showDate: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    showMonth: {
        color: '#fff',
        fontSize: 12,
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

