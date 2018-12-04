import React, { Component } from 'react';
import { View, ListView, TouchableOpacity } from 'react-native';

import ShowCard from '../home/ShowCard';

export default class ListShow extends Component {

    goToDetail(id) {
        this.props.navigation.push('Detail', { id });
    }

    render() {
        const { shows } = this.props;

        return (
            <View style={{ backgroundColor: '#fff' }}>
                <ListView
                    enableEmptySections
                    dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(shows)}
                    renderRow={show => (
                        <TouchableOpacity onPress={() => this.goToDetail(show.id)}>
                            <ShowCard show={show} />
                        </TouchableOpacity>
                    )}
                />
            </View>        
        );
    }
}

