import React, { Component } from 'react';
import {
    Text, View, StyleSheet, ScrollView, Image,
    TouchableOpacity,
} from 'react-native';


import getToken from '../../api/getToken';
import checkLogin from '../../api/checkLogin';

import saveToken from '../../api/saveToken';

export default class Personal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentWillMount() {
        getToken()
            .then(token => checkLogin(token))
            .then(res => {
                this.setState({ user: res.user });
            })
            .catch(err => console.log('ERROR LOGIN', err));
    }

    onSingOut() {
        saveToken('');
        this.props.navigation.navigate('SignedOut');
    }

    goToChangeInfo(user) {
        this.props.navigation.push('ChangeInfo', { user });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.user ?
                    <View style={styles.badge}>
                        <Image style={styles.avatar} />
                        <Text style={styles.name}>{this.state.user.name}</Text>
                    </View>
                    : null}
                <View style={styles.separator} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.goToChangeInfo(this.state.user)}>
                        <Text style={styles.textStyle}>Thay đổi thông tin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.textStyle}>Chính sách</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onSingOut.bind(this)}>
                        <Text style={styles.textStyle}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
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
