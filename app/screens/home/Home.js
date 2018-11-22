import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Grid from '../../components/Grid';
import TopShow from '../../components/TopShow';
import ShowDetail from '../detail/ShowDetail';
import Map from '../../components/Map';
import SwiperImage from '../../components/SwiperImage';
import Figures from '../../components/Figures';
import ScrollViewImage from '../../components/ScrollViewImage';
import Singer from '../singer/Singer';
import SingerCard from '../../components/SingerCard';

export default class Home extends Component {

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

                <TopShow navigation={this.props.navigation} />
                <Grid navigation={this.props.navigation} />
            </ScrollView>
            
        );
    }
}

