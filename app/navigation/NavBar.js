import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';


import icUser from '../assets/icons/user.png';
import icBack from '../assets/icons/back_white.png';
import icSearch from '../assets/icons/search.png';

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = { width: undefined };
    }

    renderRight() {
        const windowWidth = Dimensions.get('window').width;
        const width = this.state.width
            ? (windowWidth - this.state.width) / 2
            : undefined;

        const renderRightContent = () => {
            const resetAction = StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({ routeName: 'Home' }),
                  NavigationActions.navigate({ routeName: 'Search' }),
                ],
              });
                            
            if (this.props.navigation.state.routeName !== 'Search' && this.props.navigation.state.routeName !== 'SearchMap'
            && this.props.navigation.state.routeName !== 'Personal' && this.props.navigation.state.routeName !== 'ChangeInfo'
            && this.props.navigation.state.routeName !== 'Contact') {
                return (
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.dispatch(resetAction)}>
                            <Image source={icSearch} style={styles.icSearch} />
                        </TouchableOpacity>
                    </View>
                );
            }
        };

        return (
            <View style={[{ width }, styles.right]}>
                {renderRightContent()}
            </View>
        );
    }

    renderLeft() {
        const windowWidth = Dimensions.get('window').width;
        const width = this.state.width
            ? (windowWidth - this.state.width) / 2
            : undefined;

        const renderLeftContent = () => {
            if (this.props.navigation.state.routeName !== 'Home') {
                return (
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={icBack} style={styles.icBack} />
                        </TouchableOpacity>
                    </View>
                );
            }

            return (
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Personal')}>
                        <Image source={icUser} style={styles.icStyle} />
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <View style={[{ width }, styles.left]}>
                {renderLeftContent()}
            </View>
        );
    }


    renderTitle() {
        return (
            <View style={styles.title}>
                <Text style={styles.text}>iFan</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderTitle()}
                {this.renderLeft()}
                {this.renderRight()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 45,
        marginVertical: 5,
        //justifyContent: 'flex-end',
        backgroundColor: '#fff',
        //alignItems: 'space-between',
        //zIndex: 100
    },
    icStyle: {
        width: 30,
        height: 30,
        marginLeft: 3,
    },
    icBack: {
        width: 30,
        height: 30,
        tintColor: '#000'
    },
    icSearch: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold',
    },
    left: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    },
    right: {
        position: 'absolute',
        right: 5,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    },
    title: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
