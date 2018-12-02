import React, { Component } from 'react';
import { View } from 'react-native';

import SingerCard from '../home/ShowCard';

export default class ListShow extends Component {

    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <SingerCard />
                <SingerCard />
                <SingerCard />
            </View>        
        );
    }
}

