import React, { Component } from 'react';
import { View, ListView, Text, ActivityIndicator, Image } from 'react-native';

import icSad from '../../assets/icons/sad.png';
import getUserShow from '../../api/getUserShow';
import getToken from '../../api/getToken';

import ShowCard from '../home/ShowCard';

export default class ListUserShow extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userShow: null
        };
    }

    componentDidMount() {
        this._isMounted = true;

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
        const { userShow } = this.state;

        if (userShow !== null && userShow.length === 0) {
            return (
                <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={icSad} style={{ height: 24, width: 24 }} />  
                    <Text>Hiện chưa có show nào</Text>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                {this.state.userShow !== null ?
                    <ListView
                        enableEmptySections
                        dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(userShow)}
                        renderRow={show => (
                            <ShowCard userShow={userShow} navigation={this.props.navigation} show={show} />
                        )}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                        <ActivityIndicator size="large" color="#FF1F1F" />
                    </View>
                }
            </View>
        );
    }
}

