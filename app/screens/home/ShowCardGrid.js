import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

import sendShow from '../../api/sendShow';
import getToken from '../../api/getToken';
import global from '../../global';

import icStar from '../../assets/icons/star.png';
import icStarFill from '../../assets/icons/star-fill.png';

const url = 'http://192.168.1.4/ifan/banners/show/';
const paddingValue = 5;
const width = Dimensions.get('window').width;

export default class ShowCardGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInterested: '0',
        };  
    }

    componentWillMount() {
        const { show } = this.props;
        const { userShow } = this.props;
        for (let i = 0; i < userShow.length; i++) {
            if (userShow[i].id_show === show.id) {
                this.setState({ isInterested: userShow[i].interested });
                break;
            }
        }
    }

    onSendShow() {
        if (this.state.isInterested === '1') {
            this.setState({ isInterested: '0' });
        } else {
            this.setState({ isInterested: '1' });
        }

        getToken()
            .then(token => sendShow(token, this.props.show, this.state.isInterested))
            .catch(err => console.log(err));
    }

    parseDate(input) {
        const parts = input.trim().replace(/ +(?= )/g, '').split(/[\s-\/:]/);
        return parts;
    }

    goToDetail(id, interested, style) {
        this.props.navigation.push('Detail', { id, interested, style });
    }

    render() {
        const { show } = this.props;

        const { showCard, imageStyle, boderTime, showDate, showMonth, showTime, showName, showPlace, showImp,
            boderPrice, showPrice, startIcon, startIconFill, showInfo } = styles;
        return (
            <View style={showCard}>
                <TouchableOpacity onPress={() => this.goToDetail(show.id, this.state.isInterested, 1)}>
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
                    </View>
                </TouchableOpacity>

                <View style={showImp}>
                    <View style={boderPrice}>
                        <Text style={showPrice}>{show.price}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.onSendShow()}>
                        {this.state.isInterested === '1' ?
                            <Image source={icStarFill} style={startIconFill} />
                            :
                            <Image source={icStar} style={startIcon} />
                        }
                    </TouchableOpacity>
                </View>
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
        fontSize: 14
    },
    showPlace: {
        color: '#6E6E6E',
        fontSize: 12
    },
    showImp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        paddingLeft: 10,
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
    },
    startIconFill: {
        width: 18,
        height: 18,
        marginHorizontal: 10,
        tintColor: 'red'
    }
});

