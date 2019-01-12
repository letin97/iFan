import React, { Component } from 'react';
import { View, ListView, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import icSad from '../../assets/icons/sad.png';
import getUserSinger from '../../api/getUserSinger';
import getToken from '../../api/getToken';

const url = 'http://ifanapp.000webhostapp.com/ifan/images/singer/';

export default class ListUserSinger extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userSinger: null
        };
    }

    componentDidMount() {
        this._isMounted = true;
        getToken()
            .then(token => getUserSinger(token))
            .then(responJSON => {
                if (this._isMounted) {
                    if (responJSON !== null) this.setState({ userSinger: responJSON });
                    else this.setState({ userSinger: [] });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    goToDetail(id) {
        this.props.navigation.push('Singer', { id });
    }

    render() {
        const { userSinger } = this.state;
        const { showCard, imageStyle, name, row } = styles;

        if (userSinger !== null && userSinger.length === 0) {
            return (
                <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={icSad} style={{ height: 24, width: 24 }} />
                    <Text>Hiện chưa có ca sĩ nào</Text>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                {this.state.userSinger !== null ?
                    <ListView
                        enableEmptySections
                        dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(userSinger)}
                        renderRow={singer => (
                            <View style={showCard}>
                                <TouchableOpacity onPress={() => this.goToDetail(singer.id)}>
                                    <View style={row}>
                                        <View style={{ flex: 2 }}>
                                            <Image source={{ uri: `${url}${singer.images}` }} style={imageStyle} />
                                        </View>
                                        <View style={{ flex: 8, paddingHorizontal: 10 }}>
                                            <Text style={name}>{singer.name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        )}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                        <ActivityIndicator size="large" color="#FF1F1F" />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    showCard: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    name: {
        color: '#727272',
        fontWeight: 'bold',
        fontSize: 16
    },
});
