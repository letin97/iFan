import React, { Component } from 'react';
import {
    View, TextInput, TouchableOpacity,
    Text, StyleSheet
} from 'react-native';

import singnIn from '../../api/signIn';
import saveToken from '../../api/saveToken';
import getToken from '../../api/getToken';

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onSignIn() {
        const { email, password } = this.state;
        singnIn(email, password)
        .then(res => {
            saveToken(res.token);
            getToken().then(token => console.log(token));
        })
        .catch(err => console.log(err));  
    }

    render() {
        const { textInput, bigButton, butonText } = styles;
        const { email, password } = this.state;
        return (
            <View>
                <TextInput
                    style={textInput}
                    underlineColorAndroid="transparent"
                    placeholder="Nhập email"
                    value={email}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    style={textInput}
                    underlineColorAndroid="transparent"
                    placeholder="Nhập mật khẩu"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => this.setState({ password: text })}
                />
                <TouchableOpacity style={bigButton} onPress={this.onSignIn.bind(this)}>
                    <Text style={butonText}>ĐĂNG NHẬP NGAY</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    textInput: {
        backgroundColor: '#FFF',
        height: 40,
        paddingLeft: 30,
        fontSize: 15,
        marginBottom: 10,
        borderRadius: 20,
    },
    bigButton: {
        height: 40,
        borderColor: '#FFF',
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    butonText: {
        color: '#FFF',
        fontWeight: '400'
    }
});
