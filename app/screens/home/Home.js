import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import GridShow from './GridShow';
import TopShow from './TopShow';

import initData from '../../api/initData';
import getUserShow from '../../api/getUserShow';
import getToken from '../../api/getToken';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            topshow: {},
            shows: [],
            userShow: []
        };
    }

    componentWillMount() {
        initData()
            .then(responJSON => {
                const { topshow, shows } = responJSON;
                this.setState({ topshow, shows });
            });

        getToken()
            .then(token => getUserShow(token))
            .then(responJSON => {
                this.setState({ userShow: responJSON }, () => this.setState({ loading: false }));
            })
            .catch(err => {
                console.log(err);
                //this.setState({ loading: false });
            });  
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loading === false ?
                    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <TopShow navigation={this.props.navigation} topshow={this.state.topshow} userShow={this.state.userShow} />
                        <GridShow navigation={this.props.navigation} shows={this.state.shows} userShow={this.state.userShow} />
                    </ScrollView>
                    : null}
            </View>
        );
    }
}

