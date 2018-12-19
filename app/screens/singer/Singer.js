import React, { Component } from 'react';
import {
    Text, View, StyleSheet, ScrollView, Image,
    TouchableOpacity, ImageBackground
} from 'react-native';

import ViewMoreText from 'react-native-view-more-text';
import LinearGradient from 'react-native-linear-gradient';

import getSingerDetail from '../../api/getSingerDetail';
import getShowSinger from '../../api/getShowSinger';

import getUserShow from '../../api/getUserShow';
import getUserSinger from '../../api/getUserSinger';
import getToken from '../../api/getToken';
import sendSinger from '../../api/sendSinger';


import ListShow from './ListShow';

const urlbanner = 'http://ifanapp.000webhostapp.com/ifan/banners/singer/';
const urlimage = 'http://ifanapp.000webhostapp.com/ifan/images/singer/';

export default class Singer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            singer: {},
            shows: [],
            userShow: [],
            isInterested: '0',
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'NO-ID');

        getSingerDetail(id)
            .then(responJSON => {
                const { singer } = responJSON;
                this.setState({ singer });
            })
            .catch(err => console.log(err));

        getShowSinger(id)
            .then(responJSON => {
                const { shows } = responJSON;
                this.setState({ shows });
            })
            .catch(err => console.log(err));

        getToken()
            .then(token => getUserSinger(token))
            .then(responJSON => {
                for (let i = 0; i < responJSON.length; i++) {
                    if (responJSON[i].id_singer === id) {
                        this.setState({ isInterested: responJSON[i].interested });
                        break;
                    }
                }
            })
            .catch(err => console.log(err));

        getToken()
            .then(token => getUserShow(token))
            .then(responJSON => {
                this.setState({ userShow: responJSON }, () => this.setState({ loading: false }));
            })
            .catch(err => {
                console.log(err);
            });
    }

    onSendSinger() {
        if (this.state.isInterested === '1') {
            this.setState({ isInterested: '0' }, () => {
                getToken()
                    .then(token => sendSinger(token, this.state.singer, this.state.isInterested)
                        .then(rp => {

                        })
                    )
                    .catch(err => console.log(err));
            });
        } else {
            this.setState({ isInterested: '1' }, () => {
                getToken()
                    .then(token => sendSinger(token, this.state.singer, this.state.isInterested)
                        .then(rp => {

                        })
                    )
                    .catch(err => console.log(err));
            });
        }
    }

    renderViewMore(onPress) {
        return (
            <View style={{ flexDirection: 'row', marginEnd: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.separator} />
                <Text onPress={onPress} style={{ color: '#00BFFF', fontSize: 10, paddingHorizontal: 5 }}>Xem thêm</Text>
            </View>

        );
    }
    renderViewLess(onPress) {
        return (
            <View style={{ flexDirection: 'row', marginEnd: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.separator} />
                <Text onPress={onPress} style={{ color: '#00BFFF', fontSize: 10, paddingHorizontal: 5 }}>Thu gọn</Text>
            </View>
        );
    }

    render() {
        const { singer } = this.state;
        if (Object.keys(singer).length === 0) return null;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.badge}>
                    <ImageBackground source={{ uri: `${urlbanner}${singer.banners[0]}` }} style={{ height: 180 }}>
                        <LinearGradient
                            colors={['transparent', 'rgba(180,180,180,0.5)']}
                            start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}
                            style={{ flex: 1 }}
                        >
                            <View style={styles.borderavatar}>

                                <Image style={styles.avatar} source={{ uri: `${urlimage}${singer.images[0]}` }} />
                                <View style={styles.badgeInfo}>
                                    <View style={{ marginStart: 10 }}>
                                        <Text style={styles.name}>{singer.name}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => this.onSendSinger()}>
                                        {this.state.isInterested === '1' ?
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <Text style={styles.textInterest}>+ Quan tâm</Text>
                                            </View>
                                            :
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <Text style={styles.textUnInterest}>+ Quan tâm</Text>
                                            </View>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                    <View style={styles.interest}>
                        <Text style={styles.number}>{singer.num_interested}</Text>
                        <Text style={styles.text}>Quan tâm</Text>
                    </View>
                </View>
                <View style={styles.separator} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ViewMoreText
                        numberOfLines={3}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                        textStyle={{ paddingHorizontal: 10, fontSize: 12, marginTop: 15 }}
                    >
                        <Text>{singer.description}</Text>
                    </ViewMoreText>
                </View>
                {this.state.loading === false ?
                    <ListShow navigation={this.props.navigation} shows={this.state.shows} userShow={this.state.userShow} />
                    : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    badge: {
        //alignItems: 'center',
        //padding: 15
    },
    badgeInfo: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3A3A3A'
    },
    description: {
        fontSize: 13,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    borderavatar: {
        position: 'absolute', // child
        bottom: 0, // position where you want
        left: 0,
        flexDirection: 'row',
        padding: 8
    },
    separator: {
        height: 0.5,
        backgroundColor: '#AAA',
        marginTop: 15,
        flex: 8
    },
    interest: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textInterest: {
        fontSize: 12,
        borderRadius: 3,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
        backgroundColor: '#FF1F1F',
        borderColor: '#FF1F1F',
        color: '#fff'
    },
    textUnInterest: {
        fontSize: 12,
        borderRadius: 3,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
        backgroundColor: '#3A3A3A',
        borderColor: '#3A3A3A',
        color: '#fff'
    }
});
