import React, { Component } from 'react';
import {
    View, TextInput, TouchableOpacity,
    Text, StyleSheet, Alert
} from 'react-native';

import register from '../../api/register';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            rePassword: ''
        };
    }

    onSuccess() {
        Alert.alert(
            'Thông báo',
            'Đăng kí thành công',
            [
                { text: 'OK', onPress: () => this.props.signIn() },
            ],
            { cancelable: false }
        );
    }

    onFail() {
        Alert.alert(
            'Thông báo',
            'Email này đã được sử dụng',
            [
                { text: 'OK', onPress: () => this.removeEmail.bind(this) },
            ],
            { cancelable: false }
        );
    }

    register() {
        const { email, name, password } = this.state;
        register(email, name, password)
            .then(res => {
                if (res === 'THANH_CONG') this.onSuccess();
                else this.onFail();
            });
    }

    removeEmail() {
        this.setState({ email: '' });
    }

    render() {
        const { textInput, bigButton, butonText } = styles;
        return (
            <View>
                <TextInput
                    style={textInput}
                    underlineColorAndroid="transparent"
                    placeholder="Nhập họ và tên"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />
                <TextInput
                    style={textInput}
                    underlineColorAndroid="transparent"
                    placeholder="Nhập email"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={textInput}
                    underlineColorAndroid="transparent"
                    placeholder="Nhập mật khẩu"
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TextInput
                    style={textInput}
                    underlineColorAndroid="transparent"
                    placeholder="Xác nhận mật khẩu"
                    secureTextEntry
                    value={this.state.rePassword}
                    onChangeText={text => this.setState({ rePassword: text })}
                />
                <TouchableOpacity style={bigButton} onPress={this.register.bind(this)}>
                    <Text style={butonText}>ĐĂNG KÍ NGAY</Text>
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
