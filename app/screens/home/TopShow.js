import React, { Component } from 'react';
import {
    Dimensions, View, Text,
    TouchableOpacity, ImageBackground, StyleSheet, Image
} from 'react-native';

import getToken from '../../api/getToken';
import sendShow from '../../api/sendShow';

import icStar from '../../assets/icons/star.png';
import icStarFill from '../../assets/icons/star-fill.png';

const url = 'http://ifanapp.000webhostapp.com/ifan/banners/show/';
const paddingValue = 5;

export default class TopShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInterested: '0',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }; 
        this.onLayout = this.onLayout.bind(this); 
    }

    componentWillMount() {
        const { topshow } = this.props;
        const { userShow } = this.props;
        for (let i = 0; i < userShow.length; i++) {
            if (userShow[i].id_show === topshow.id) {
                this.setState({ isInterested: userShow[i].interested });
                break;
            }
        }
    }

    onLayout(e) {
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        });
    }

    onSendShow() {
        if (this.state.isInterested === '1') {
            this.setState({ isInterested: '0' });
        } else {
            this.setState({ isInterested: '1' });
        }

        getToken()
            .then(token => sendShow(token, this.props.topshow, this.state.isInterested))
            .catch(err => console.log(err));
    }

    goToDetail(id, interested, style) {
        this.props.navigation.push('Detail', { id, interested, style });
    }

    parseDate(input) {
        const parts = input.trim().replace(/ +(?= )/g, '').split(/[\s-\/:]/);
        return parts;
    }

    render() {
        const { topshow } = this.props;
        if (Object.keys(topshow).length === 0) return null;

        const { wapper, showCard, boderTime, showTime, showInfo, showImp, showPrice,
            showDate, showMonth, showName, showPlace, startIcon, startIconFill, boderPrice } = styles;

        return (
            <View onLayout={this.onLayout} style={wapper}>
                <TouchableOpacity style={showCard} onPress={() => this.goToDetail(topshow.id, this.state.isInterested, 1)}>
                    <ImageBackground source={{ uri: `${url}${topshow.banners[0]}` }} style={{ height: (this.state.width - (paddingValue * 6)) / 2, borderRadius: 5, overflow: 'hidden' }}>
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
                            <TouchableOpacity onPress={() => this.onSendShow()}>
                                {this.state.isInterested === '1' ?
                                    <Image source={icStarFill} style={startIconFill} />
                                    :
                                    <Image source={icStar} style={startIcon} />
                                }
                            </TouchableOpacity>
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
    },
    startIconFill: {
        width: 20,
        height: 20,
        marginHorizontal: 14,
        tintColor: 'red'
    }
});

