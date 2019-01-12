import React, { Component } from 'react';
import { View, ListView } from 'react-native';

import global from '../../global';
import getUserShow from '../../api/getUserShow';
import getToken from '../../api/getToken';

import ShowCard from '../home/ShowCard';

export default class ListShow extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userShow: this.props.userShow
        };
        global.refreshList = this.refreshList.bind(this);
    }

    refreshList() {
        this._isMounted = true;

        this.setState({ userShow: null }, () => {
            getToken()
                .then(token => getUserShow(token))
                .then(responJSON => {
                    if (this._isMounted) {
                        if (responJSON !== null) this.setState({ userShow: responJSON });
                        else this.setState({ userShow: [] });
                    }
                })
                .catch(err => console.log(err));
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { shows } = this.props;
        const { userShow } = this.state;

        return (
            <View style={{ backgroundColor: '#fff' }}>
                {this.state.userShow !== null ?
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

