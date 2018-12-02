import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import ShowCard from '../home/ShowCard';

export default class ListShow extends Component {

    goToDetail(id) {
        this.props.navigation.navigate('Detail', { id });
    }

    render() {
        const { shows } = this.props;

        return (
            <View style={{ backgroundColor: '#fff' }}>
                <ScrollView>
                {shows.map(s => (
                    <TouchableOpacity onPress={() => this.goToDetail(s.id)} key={s.id}>
                        <ShowCard show={s} />
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>        
        );
    }
}

