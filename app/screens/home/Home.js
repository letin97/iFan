import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import Grid from '../../components/Grid';
import TopShow from '../../components/TopShow';

import initData from '../../api/initData';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topshow: {},
            shows: []
        };
    }

    componentDidMount() {
        initData()
            .then(responJSON => {
                const { topshow, shows } = responJSON;
                this.setState({ topshow, shows });
            });
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <TopShow navigation={this.props.navigation} topshow={this.state.topshow} />
                <Grid navigation={this.props.navigation} shows={this.state.shows} />
            </ScrollView>   
        );
    }  
}

