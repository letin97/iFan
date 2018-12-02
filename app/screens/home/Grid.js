import React, { Component } from 'react';
import {
    Dimensions, ListView, View, Text,
    TouchableOpacity, ImageBackground, StyleSheet, Image
} from 'react-native';

import icStar from '../../assets/icons/star.png';

const url = 'http://192.168.1.4/ifan/banners/show/';
const paddingValue = 5;
const width = Dimensions.get('window').width;


export default class Grid extends Component {

    goToDetail(id) {
        this.props.navigation.navigate('Detail', { id });
    }

    parseDate(input) {
        const parts = input.trim().replace(/ +(?= )/g,'').split(/[\s-\/:]/);
        return parts;
    }
    
    render() {
        const { shows } = this.props;
        const { wapper, imageStyle, showCard, boderTime, showTime, showInfo, showImp, showPrice,
            showDate, showMonth, showName, showPlace, body, startIcon, boderPrice } = styles;
        return (
            <View style={wapper}>
                <ListView
                    enableEmptySections
                    contentContainerStyle={body}
                    dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(shows)}
                    renderRow={show => (
                        <TouchableOpacity style={showCard} onPress={() => this.goToDetail(show.id)}>
                            <ImageBackground source={{ uri: `${url}${show.banners[0]}` }} style={imageStyle}>
                                <View style={boderTime}>
                                    <Text style={showDate}>{this.parseDate(show.time)[2]}</Text>
                                    <Text style={showMonth}>{this.parseDate(show.time)[1]}</Text>
                                </View>
                            </ImageBackground>
                            <View style={showInfo}>
                                <Text style={showTime}>{this.parseDate(show.time)[3]}:{this.parseDate(show.time)[4]}</Text>
                                <Text numberOfLines={2} style={showName}>{show.name}</Text>
                                <Text numberOfLines={2} style={showPlace}>{show.place}</Text>
                                <View style={showImp}>
                                    <View style={boderPrice}>
                                        <Text style={showPrice}>{show.price}</Text>
                                    </View>
                                    <Image source={icStar} style={startIcon} />
                                </View>
                            </View>                       
                        </TouchableOpacity>
                    )}
                    renderSeparator={(sectionID, rowID) => {
                        if (rowID % 2 === 1) return <View style={{ width, height: 10 }} />;
                        return null;
                    }}
                />
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
        width: (width - (paddingValue * 6)) / 2,
        height: (width - (paddingValue * 6)) / 2.6,
        borderRadius: 5,
        overflow: 'hidden',
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: 3,
    },
    showCard: {
        width: (width - (paddingValue * 6)) / 2,
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
    showInfo: {
        paddingTop: 4,
        paddingLeft: 10,
    },
    showTime: {
        color: '#FF1F1F',
        fontWeight: 'bold',
        fontSize: 12,
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
        width: 18,
        height: 18,
        marginHorizontal: 10
    }
});

