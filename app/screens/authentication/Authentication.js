import React, { Component } from 'react';
import {
    Text,
    View, TouchableOpacity, Image, StyleSheet,
} from 'react-native';


import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Authentication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignIn: true
        };
    }

    backToMain() {
        const { navigator } = this.props;
        navigator.pop();
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

        const mainJSX = this.state.isSignIn ? <SignIn backToMain={this.backToMain.bind(this)} /> : <SignUp signIn={this.signIn.bind(this)} />;

        return (
            <View style={wrapper}>

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
        backgroundColor: '#00B6BC',
        padding: 20,
        justifyContent: 'space-between'
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    textStyle: { color: '#FFF', fontSize: 22 },
    imageStyle: { height: 25, width: 25 },
    rowButton: { flexDirection: 'row' },
    buttonSignIn: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        marginRight: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    buttonSignUp: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        marginLeft: 1,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    activeStyle: {
        color: '#00B6BC'
    },
    inActiveStyle: {
        color: '#A6A6A6'
    }
});

