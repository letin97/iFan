import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';

import global from '../../global';
import getUserShow from '../../api/getUserShow';
import getToken from '../../api/getToken';

import ShowCard from '../home/ShowCard';

export default class ListUserShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userShow: []
        };
    }

    componentWillMount() {
        getToken()
            .then(token => getUserShow(token))
            .then(responJSON => {
                this.setState({ userShow: responJSON });
            })
            .then(this.setState({ loading: false }))
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    render() {
        const { userShow } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                {this.state.loading === false ?
                    <ListView
                        enableEmptySections
                        dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(userShow)}
                        renderRow={show => (
                            <ShowCard userShow={userShow} navigation={this.props.navigation} show={show} />
                        )}
                    />
                    : null}
            </View>
        );
    }
}

