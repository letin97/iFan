import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from './screens/home/Home';
import DetailScreen from './screens/detail/ShowDetail';
import SingerScreen from './screens/singer/Singer';
import ScheduleScreen from './screens/schedule/Schedule';
import InterestScreen from './screens/interest/Interest';
import NavBar from './navigation/NavBar';
import SearchScreen from './screens/search/Search';
import SearchMapScreen from './screens/search/SearchMap';
import AuthenticationScreen from './screens/authentication/Authentication';
import PersonalScreen from './screens/personal/Personal';
import ChangeInfoScreen from './screens/changeInfo/ChangeInfo';

import ListUserShowScreen from './screens/interest/ListUserShow';
import ListUserSingerScreen from './screens/interest/ListUserSinger';

import icHome from './assets/icons/home.png';
import icSchedule from './assets/icons/schedule.png';
import icStar from './assets/icons/star-fill.png';

import transition from '../app/navigation/transitions';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Detail: {
        screen: DetailScreen
    },
    Singer: {
        screen: SingerScreen
    },
    Search: {
        screen: SearchScreen
    },
    SearchMap: {
        screen: SearchMapScreen
    },
    Authentication: {
        screen: AuthenticationScreen
    },
    Personal: {
        screen: PersonalScreen
    },
    ChangeInfo: {
        screen: ChangeInfoScreen
    }
}, {
        initialRouteName: 'Home',
        transitionConfig: transition,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: (headerProps) => (
                <NavBar navigation={navigation} headerProps={headerProps} />
            ),
        }),

    });

const InterestStack = createStackNavigator({
    Interest: {
        screen: InterestScreen
    },
    ListUserShow: {
        screen: ListUserShowScreen
    },
    ListUserSinger: {
        screen: ListUserSingerScreen
    },
}, {
        initialRouteName: 'Interest',
        transitionConfig: transition,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null
        }),

    });

export default createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image source={icHome} style={{ height: 24, width: 24, tintColor }} />
            )
        }
    },
    Schedule: {
        screen: ScheduleScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image source={icSchedule} style={{ height: 24, width: 24, tintColor }} />
            )
        }
    },
    Interest: {
        screen: InterestStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image source={icStar} style={{ height: 24, width: 24, tintColor }} />
            )
        }
    },
},
    {
        tabBarOptions: {
            activeTintColor: '#FF1F1F'
        }
    });

