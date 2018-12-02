import React, { Component } from 'react';
import {
    Text, View, StyleSheet, ScrollView, Image,
    TouchableOpacity, ImageBackground
} from 'react-native';

import ViewMoreText from 'react-native-view-more-text';
import LinearGradient from 'react-native-linear-gradient';

import getSingerDetail from '../../api/getSingerDetail';
import getShowSinger from '../../api/getShowSinger';

import ListShow from '../interest/ListShow';

const urlbanner = 'http://192.168.1.4/ifan/banners/singer/';
const urlimage = 'http://192.168.1.4/ifan/images/singer/';

export default class Singer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            singer: {},
            shows: []
        };
    }

    componentDidMount() {
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

                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={styles.textInterest}>+ Quan tâm</Text>
                                    </View>
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

                <ListShow shows={this.state.shows} />
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
    }
});
