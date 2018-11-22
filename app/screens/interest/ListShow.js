import React, { Component } from 'react';
import { View } from 'react-native';

import ShowCard from '../../components/ShowCard';

export default class ListShow extends Component {

    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <ShowCard />
                <ShowCard />
                <ShowCard />
            </View>        
        );
    }
}

