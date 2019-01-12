import React, { Component } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';

import GridShow from './GridShow';
import TopShow from './TopShow';

import initData from '../../api/initData';
import getUserShow from '../../api/getUserShow';
import getToken from '../../api/getToken';

export default class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            topshow: {},
            shows: [],
            userShow: null
        };
    }

    componentDidMount() {
        this._isMounted = true;

        initData()
            .then(responJSON => {
                const { topshow, shows } = responJSON;
                this.setState({ topshow, shows });
            });

        getToken()
            .then(token => getUserShow(token))
            .then(responJSON => {
                if (this._isMounted) {
                    if (responJSON !== null) this.setState({ userShow: responJSON });
                    else this.setState({ userShow: [] });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.userShow !== null ?
                    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <TopShow navigation={this.props.navigation} topshow={this.state.topshow} userShow={this.state.userShow} />
                        <GridShow navigation={this.props.navigation} shows={this.state.shows} userShow={this.state.userShow} />
                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                        <ActivityIndicator size="large" color="#FF1F1F" />
                    </View>
                }
            </View>
        );
    }
}

