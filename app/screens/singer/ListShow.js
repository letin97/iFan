import React, { Component } from 'react';
import { View, ListView } from 'react-native';

import global from '../../global';
import getUserShow from '../../api/getUserShow';
import getToken from '../../api/getToken';

import ShowCard from '../home/ShowCard';

export default class ListShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userShow: this.props.userShow,
            loading: false,
        };
        global.refreshList = this.refreshList.bind(this);
    }

    refreshList() {
        this.setState({ loading: true });
        getToken()
            .then(token => getUserShow(token))
            .then(responJSON => {
                this.setState({ userShow: responJSON }, () => this.setState({ loading: false }));
            })
            .catch(err => console.log(err));
    }

    render() {
        const { shows } = this.props;
        const { userShow } = this.state;

        return (
            <View style={{ backgroundColor: '#fff' }}>
                {this.state.loading === false ?
                    <ListView
                        enableEmptySections
                        dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(shows)}
                        renderRow={show => (
                            <ShowCard userShow={userShow} navigation={this.props.navigation} show={show} />
                        )}
                    />
                    : null}
            </View>
        );
    }
}

