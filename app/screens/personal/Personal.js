import React, { Component } from 'react';
import {
    Text, View, StyleSheet, ScrollView, Image,
    TouchableOpacity, ActivityIndicator,
} from 'react-native';


import getToken from '../../api/getToken';
import checkLogin from '../../api/checkLogin';

import saveToken from '../../api/saveToken';

export default class Personal extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this._isMounted = true;

        getToken()
            .then(token => checkLogin(token))
            .then(res => {
                if (this._isMounted) {
                    if (res.user !== null) this.setState({ user: res.user });
                }
            })
            .catch(err => console.log('ERROR LOGIN', err));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSingOut() {
        saveToken('');
        this.props.navigation.navigate('SignedOut');
    }

    goToChangeInfo(user) {
        this.props.navigation.push('ChangeInfo', { user });
    }

    goToContact() {
        this.props.navigation.push('Contact');
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.user !== null ?
                    <View>
                        <View style={styles.badge}>
                            <Image style={styles.avatar} />
                            <Text style={styles.name}>{this.state.user.name}</Text>

                        </View>
                        <View style={styles.separator} />
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.goToChangeInfo(this.state.user)}>
                                <Text style={styles.textStyle}>Thay đổi thông tin</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.goToContact()}>
                                <Text style={styles.textStyle}>Liên hệ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.onSingOut.bind(this)}>
                                <Text style={styles.textStyle}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                        <ActivityIndicator size="large" color="#FF1F1F" />
                    </View>
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    badge: {
        alignItems: 'center',
        marginTop: 5,
        //padding: 15
    },
    textStyle: {
        color: '#3A3A3A',
        fontSize: 15,
        padding: 10
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3A3A3A'
    },
    description: {
        fontSize: 13,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    borderavatar: {
        position: 'absolute', // child
        bottom: 0, // position where you want
        left: 0,
        flexDirection: 'row',
        padding: 8
    },
    separator: {
        height: 0.5,
        backgroundColor: '#AAA',
        marginTop: 15,
        flex: 8
    },
});
