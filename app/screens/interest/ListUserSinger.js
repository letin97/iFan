import React, { Component } from 'react';
import { View, ListView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import getUserSinger from '../../api/getUserSinger';
import getToken from '../../api/getToken';

const url = 'http://192.168.1.4/ifan/images/singer/';

export default class ListUserSinger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userSinger: []
        };
    }

    componentWillMount() {
        getToken()
            .then(token => getUserSinger(token))
            .then(responJSON => {
                if (responJSON !== null) this.setState({ userSinger: responJSON }, () => this.setState({ loading: false }));
                else this.setState(({ loading: false }));
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    goToDetail(id) {
        this.props.navigation.push('Singer', { id });
    }

    render() {
        const { userSinger } = this.state;
        const { showCard, imageStyle, name, row } = styles;

        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                {this.state.loading === false ?
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
                    : null}
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
