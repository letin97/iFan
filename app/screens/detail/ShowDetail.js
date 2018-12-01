import React, { Component } from 'react';
import {
    Dimensions, View, Text,
    StyleSheet, Image, ScrollView
} from 'react-native';

import ScrollViewImage from '../../components/ScrollViewImage';
import Map from '../../components/Map';
import SwiperImage from '../../components/SwiperImage';

import getShow from '../../api/getShow';
import icStar from '../../assets/icons/star.png';
import icAttend from '../../assets/icons/attend.png';
import icShare from '../../assets/icons/share.png';
import icLocal from '../../assets/icons/local.png';
import icTime from '../../assets/icons/time.png';
import icTicket from '../../assets/icons/ticket.png';

const width = Dimensions.get('window').width;
const url = 'http://192.168.1.4/ifan/banners/show/';

export default class ShowDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: {}
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        getShow(id)
        .then(responJSON => {
            const { show } = responJSON;
            this.setState({ show });
        })
        .catch(err => console.log(err));
    }

    parseDate(input) {
        const parts = input.trim().replace(/ +(?= )/g,'').split(/[\s-\/:]/);
        return parts;
    }

    render() {
        const { show } = this.state;
        if (Object.keys(show).length === 0) return null;

        const { wapper, imageStyle, showCard, boderTime, showTime, showInfo, showFullDate, showPrice,
            showDate, showMonth, showName, showPlace, icStyle1, icStyle2, boderPrice, icInfo } = styles;
        
        return (
            <ScrollView style={showCard}>
                <Image source={{ uri: `${url}${show.banners[0]}` }}style={imageStyle} />
                <View style={wapper}>
                    <View style={showInfo}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 3 }}>
                                <View style={boderTime}>
                                    <Text style={showDate}>{this.parseDate(show.time)[2]}</Text>
                                    <Text style={showMonth}>{this.parseDate(show.time)[1]}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 7, justifyContent: 'center' }}>
                                <Text style={showName}>{show.name}</Text>
                                <Text style={showPlace}>{show.place}</Text>
                            </View>

                        </View>

                        <View style={boderPrice}>
                            <Text style={showPrice}>ĐẶT VÉ</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={icStar} style={icStyle1} />
                                <Text style={icInfo}>Quan tâm</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={icAttend} style={icStyle1} />
                                <Text style={icInfo}>Tham gia</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={icShare} style={icStyle1} />
                                <Text style={icInfo}>Chia sẻ</Text>
                            </View>
                        </View>

                        <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#A0A0A0' }}>
                            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={icTime} style={icStyle2} />
                                </View>
                                <View style={{ flex: 8 }}>
                                    <Text style={showFullDate}>{this.parseDate(show.time)[2]} Thg {this.parseDate(show.time)[1]} </Text>
                                    <Text style={showTime}>{this.parseDate(show.time)[3]}:{this.parseDate(show.time)[4]}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={icLocal} style={icStyle2} />
                                </View>
                                <View style={{ flex: 8 }}>
                                    <Text style={showFullDate}>{show.place}</Text>
                                    <Text style={showTime}>{show.address}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={icTicket} style={icStyle2} />
                                </View>
                                <View style={{ flex: 8 }}>
                                    <Text style={showFullDate}>{show.price}</Text>
                                    <Text style={showTime}>{show.company}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <ScrollViewImage navigation={this.props.navigation} show={this.state.show} />
                <Map />
                <SwiperImage />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wapper: {
        paddingHorizontal: 10
    },
    imageStyle: {
        width,
        height: width / 2,
    },
    showCard: {
        elevation: 5,
        backgroundColor: '#FFF'
    },
    boderTime: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    showDate: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
    },
    showMonth: {
        color: '#000',
        fontSize: 18,
    },
    showInfo: {
        paddingTop: 6,
    },
    showFullDate: {
        color: '#000',
        fontSize: 13,
    },
    showTime: {
        color: '#6E6E6E',
        fontSize: 11,
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
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    boderPrice: {
        borderWidth: 1,
        borderColor: '#A0A0A0',
        borderRadius: 5,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF1F1F',
    },
    icInfo: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    icStyle1: {
        width: 25,
        height: 25,
        marginVertical: 5,
    },
    icStyle2: {
        width: 18,
        height: 18,
        marginVertical: 5,
    }
});

