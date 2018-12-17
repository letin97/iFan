import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';

import sendShow from '../../api/sendShow';
import getToken from '../../api/getToken';
import global from '../../global';

import icStar from '../../assets/icons/star.png';
import icLocation from '../../assets/icons/local.png';
import icStarFill from '../../assets/icons/star-fill.png';

const url = 'http://192.168.1.4/ifan/banners/show/';

export default class ShowCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInterested: '0'
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
            this.setState({ isInterested: '0' }, () => {
                getToken()
                    .then(token => sendShow(token, this.props.show, this.state.isInterested)
                        .then(rp => {
                            global.refreshGrid();
                            if (this.props.single === 1) global.refreshList();
                        })
                    )
                    .catch(err => console.log(err));
            });
        } else {
            this.setState({ isInterested: '1' }, () => {
                getToken()
                    .then(token => sendShow(token, this.props.show, this.state.isInterested)
                        .then(rp => {
                            global.refreshGrid();
                            if (this.props.single === 1) global.refreshList();
                        })

                    )
                    .catch(err => console.log(err));
            });
        }
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

        const { showCard, imageStyle, boderTime, showDate, showMonth, showTime, showName, showPlace, showAddress, showImp,
            boderPrice, showPrice, startIcon, startIconFill, locationIcon } = styles;
        return (
            <View style={showCard}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 4 }}>
                        <TouchableOpacity onPress={() => this.goToDetail(show.id, this.state.isInterested, 2)}>
                            <ImageBackground source={{ uri: `${url}${show.banners[0]}` }} style={imageStyle}>
                                <View style={boderTime}>
                                    <Text style={showDate}>{this.parseDate(show.time)[2]}</Text>
                                    <Text style={showMonth}>{this.parseDate(show.time)[1]}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => this.goToDetail(show.id, this.state.isInterested, 2)}>
                            <Text style={showTime}>{this.parseDate(show.time)[3]}:{this.parseDate(show.time)[4]}</Text>
                            <Text style={showName}>{show.name}</Text>
                            <Text style={showPlace}>{show.place}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={icLocation} style={locationIcon} />
                                <Text numberOfLines={1} style={showAddress}>{show.address}</Text>
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
        height: 113,
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
        fontSize: 14
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
    startIconFill: {
        width: 18,
        height: 18,
        marginHorizontal: 10,
        tintColor: 'red'
    },
    locationIcon: {
        width: 11,
        height: 11,
        marginTop: 2,
    }
});

