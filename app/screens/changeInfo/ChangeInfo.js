import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, StyleSheet, TextInput, Alert
} from 'react-native';

import getToken from '../../api/getToken';
import changeInfo from '../../api/changeInfo';

export default class ChangeInfo extends Component {

    constructor(props) {
        super(props);
        const { name, address, phone } = this.props.navigation.getParam('user', '0');
        this.state = {
            name,
            address,
            phone
        };
    }

    onSuccess() {
        Alert.alert(
          'Thông báo',
          'Cập nhật thành công',
          [
            { text: 'OK', onPress: () => this.props.navigation.goBack() },
          ],
          { cancelable: false }
        );
      }

    changeInfoUser() {
        const { name, phone, address } = this.state;
        getToken()
          .then(token => changeInfo(token, name, phone, address))
          .then(user => {
            this.onSuccess();
          })
          .catch(err => console.log(err));
      }

    render() {
        const {
            wrapper, body,
            signInContainer, signInTextStyle, textInput
        } = styles;
        const { name, address, phone } = this.state;
        return (
            <View style={wrapper}>
                <View style={body}>
                    <TextInput
                        style={textInput}
                        placeholder="Nhập họ tên"
                        autoCapitalize="none"
                        underlineColorAndroid="transparent"
                        value={name}
                        onChangeText={text => this.setState({ ...this.state, name: text })}
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Nhập địa chỉ"
                        autoCapitalize="none"
                        underlineColorAndroid="transparent"
                        value={address}
                        onChangeText={text => this.setState({ ...this.state, address: text })}
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Nhập số điện thoại"
                        autoCapitalize="none"
                        underlineColorAndroid="transparent"
                        value={phone}
                        onChangeText={text => this.setState({ ...this.state, phone: text })}
                    />
                    <TouchableOpacity style={signInContainer} onPress={this.changeInfoUser.bind(this)}>
                        <Text style={signInTextStyle}>CẬP NHẬT THÔNG TIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#00B6BC', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#FF1F1F',
        borderWidth: 1
    },
    signInTextStyle: {
        color: '#FFF', fontFamily: 'Avenir', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#FF1F1F',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
});

