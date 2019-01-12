import React, { Component } from 'react';
import {
    Dimensions, View, Text,
    StyleSheet, Image, ScrollView,
    TouchableOpacity, ActivityIndicator
} from 'react-native';


import ScrollSinger from './ScrollSinger';
import Map from './Map';
import Information from './Infomation';
import SwiperShow from './SwiperShow';

import getShowDetail from '../../api/getShowDetail';
import getSingerShow from '../../api/getSingerShow';

import sendShow from '../../api/sendShow';
import getToken from '../../api/getToken';
import global from '../../global';

import icStar from '../../assets/icons/star.png';
import icStarFill from '../../assets/icons/star-fill.png';
import icAttend from '../../assets/icons/attend.png';
import icShare from '../../assets/icons/share.png';
import icLocal from '../../assets/icons/local.png';
import icTime from '../../assets/icons/time.png';
import icTicket from '../../assets/icons/ticket.png';

const width = Dimensions.get('window').width;
const url = 'http://ifanapp.000webhostapp.com/ifan/banners/show/';

export default class ShowDetail extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            show: null,
            singers: [],
            isInterested: '0',
            style: ''
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        const interested = navigation.getParam('interested', '0');
        const style = navigation.getParam('style', '0');
        this.setState({ isInterested: interested, style });

        this._isMounted = true;

        getShowDetail(id)
            .then(responJSON => {
                if (this._isMounted) {
                    const { show } = responJSON;
                    this.setState({ show });
                }
            })
            .catch(err => console.log(err));

        getSingerShow(id)
            .then(responJSON => {
                const { singers } = responJSON;
                this.setState({ singers });
            })
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSendShow() {
        if (this.state.isInterested === '1') {
            this.setState({ isInterested: '0' }, () => {
                getToken()
                    .then(token => sendShow(token, this.state.show, this.state.isInterested)
                        .then(rp => {
                            global.refreshGrid();
                            if (this.state.style === 2) global.refreshList();
                        })
                    )
                    .catch(err => console.log(err));
            });
        } else {
            this.setState({ isInterested: '1' }, () => {
                getToken()
                    .then(token => sendShow(token, this.state.show, this.state.isInterested)
                        .then(rp => {
                            global.refreshGrid();
                            if (this.state.style === 2) global.refreshList();
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

    render() {
        const { show } = this.state;
        if (show === null) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                    <ActivityIndicator size="large" color="#FF1F1F" />
                </View>
            );
        }

        const { wapper, imageStyle, showCard, boderTime, showTime, showInfo, showFullDate, showPrice,
            showDate, showMonth, showName, showPlace, icStyle1, icStyle1Fill, icStyle2, boderPrice, icInfo, icInfoFill } = styles;

        return (
            <ScrollView style={showCard}>
                <Image source={{ uri: `${url}${show.banners[0]}` }} style={imageStyle} />
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
                            <TouchableOpacity onPress={() => this.onSendShow()}>
                                {this.state.isInterested === '1' ?
                                    <View style={{ alignItems: 'center' }} >
                                        <Image source={icStarFill} style={icStyle1Fill} />
                                        <Text style={icInfoFill}>Quan tâm</Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: 'center' }} >
                                        <Image source={icStar} style={icStyle1} />
                                        <Text style={icInfo}>Quan tâm</Text>
                                    </View>
                                }
                            </TouchableOpacity>
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

                <ScrollSinger navigation={this.props.navigation} singers={this.state.singers} />
                <Information show={this.state.show} />
                <Map id={this.state.show.id_place} />
                <SwiperShow />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wapper: {
        paddingHorizontal: 10
    },
    imageStyle: {
        height: 200,
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
    icInfoFill: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
    },
    icStyle1: {
        width: 25,
        height: 25,
        marginVertical: 5,
    },
    icStyle1Fill: {
        width: 25,
        height: 25,
        marginVertical: 5,
        tintColor: 'red'
    },
    icStyle2: {
        width: 18,
        height: 18,
        marginVertical: 5,
    }
});

