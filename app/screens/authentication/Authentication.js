import React, { Component } from 'react';
import {
    Text,
    View, TouchableOpacity, Image, StyleSheet,
} from 'react-native';

import getToken from '../../api/getToken';
import checkLogin from '../../api/checkLogin';

import SignIn from './SignIn';
import SignUp from './SignUp';

import imglogo from './../../assets/icons/logo.png';

export default class Authentication extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSignIn: true
        };
    }

    componentWillMount() {
        getToken()
            .then(token => checkLogin(token))
            .then(res => {
                this.props.navigation.replace('Home');
            })
            .catch(err => console.log('ERROR LOGIN', err));
    }

    signIn() {
        this.setState({ isSignIn: true });
    }

    signUp() {
        this.setState({ isSignIn: false });
    }

    render() {
        const { wrapper, imageStyle, textStyle, row,
            rowButton, buttonSignIn, buttonSignUp, activeStyle,
            inActiveStyle } = styles;

        const mainJSX = this.state.isSignIn ? <SignIn navigation={this.props.navigation} /> : <SignUp navigation={this.props.navigation} />;

        return (
            <View style={wrapper}>

                <View style={{ alignItems: 'center' }}>
                    <Image source={imglogo} style={imageStyle} />
                </View>

                {mainJSX}

                <View style={rowButton}>
                    <TouchableOpacity style={buttonSignIn} onPress={this.signIn.bind(this)}>
                        <Text style={this.state.isSignIn ? activeStyle : inActiveStyle}>
                            ĐĂNG NHẬP
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={buttonSignUp} onPress={this.signUp.bind(this)}>
                        <Text style={!this.state.isSignIn ? activeStyle : inActiveStyle}>
                            ĐĂNG KÍ
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        justifyContent: 'space-between'
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    textStyle: { color: '#FFF', fontSize: 22 },
    imageStyle: { height: 150, width: 150 },
    rowButton: { flexDirection: 'row' },
    buttonSignIn: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        marginRight: 1,
    },
    buttonSignUp: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        marginLeft: 1,
    },
    activeStyle: {
        color: '#FF1F1F'
    },
    inActiveStyle: {
        color: '#A6A6A6'
    }
});

