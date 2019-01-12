import React, { Component } from 'react';
import {
    Dimensions, ListView, View, StyleSheet, RefreshControl
} from 'react-native';


import ShowCardGrid from './ShowCardGrid';

import global from '../../global';
import getUserShow from '../../api/getUserShow';
import getToken from '../../api/getToken';

const width = Dimensions.get('window').width;

export default class GridShow extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userShow: this.props.userShow,
        };
        global.refreshGrid = this.refreshGrid.bind(this);
    }

    refreshGrid() {
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
        const { wapper, body } = styles;
        return (
            <View style={wapper}>
                {this.state.userShow !== null ?
                    <ListView
                        enableEmptySections
                        contentContainerStyle={body}
                        dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(shows)}
                        renderRow={show => (
                            <ShowCardGrid userShow={userShow} navigation={this.props.navigation} show={show} />
                        )}
                        renderSeparator={(sectionID, rowID) => {
                            if (rowID % 2 === 1) return <View style={{ width, height: 10 }} />;
                            return null;
                        }}
                    />
                    : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wapper: {
        backgroundColor: '#FFF',
        margin: 5,
        elevation: 5,
        justifyContent: 'space-between'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: 3,
    }
});

