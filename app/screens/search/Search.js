import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Text, View, StyleSheet, ImageBackground,
    TouchableOpacity, Dimensions, ScrollView,
    TextInput, ActivityIndicator
} from 'react-native';

import icSchedule from '../../assets/icons/schedule_fill.png';
import ListShow from '../singer/ListShow';

import searchShow from '../../api/searchShow';
import getUserShow from '../../api/getUserShow';
import getToken from '../../api/getToken';

const width = Dimensions.get('window').width;

export default class Search extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            shows: [],
            userShow: null,
            key: ''
        };
    }

    componentDidMount() {
        const key = '';
        this._isMounted = true;

        searchShow(key)
            .then(responJSON => {
                const { shows } = responJSON;
                this.setState({ shows });
            })
            .catch(err => console.log(err));

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

    onSearch() {
        searchShow(this.state.key)
            .then(responJSON => {
                const { shows } = responJSON;
                this.setState({ shows });
            })
            .catch(err => console.log(err));
    }

    parseDate(input) {
        const parts = input.trim().replace(/ +(?= )/g, '').split(/[\s-\/:]/);
        return parts;
    }

    goToSearchMap(shows) {
        this.props.navigation.navigate('SearchMap', { shows });
    }

    render() {
        const { shows } = this.state;

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Tên show diễn, nghệ sĩ, ca sĩ,..."
                    underlineColorAndroid="transparent"
                    value={this.state.key}
                    onChangeText={(text) => this.setState({ key: text })}
                    onSubmitEditing={() => this.onSearch()}
                />
                {typeof shows !== 'undefined' && shows.length > 0 ?
                    <TouchableOpacity style={styles.container} onPress={() => this.goToSearchMap(shows)}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={{
                                latitude: parseFloat(shows[0].latitude),
                                longitude: parseFloat(shows[0].longitude),
                                latitudeDelta: 0.0421,
                                longitudeDelta: 0.0421,
                            }}
                            //scrollEnabled={false}
                            liteMode
                        >
                            {shows.map(show => (
                                <Marker
                                    key={show.id}
                                    coordinate={{
                                        latitude: parseFloat(show.latitude),
                                        longitude: parseFloat(show.longitude),
                                        latitudeDelta: 0.0421,
                                        longitudeDelta: 0.0421,
                                    }}
                                    title={show.name}
                                    description={show.place}
                                >
                                    <View>
                                        <ImageBackground source={icSchedule} style={styles.icStyle} >
                                            <View style={{ alignItems: 'center', marginTop: 6 }}>
                                                <Text style={styles.date}>{this.parseDate(show.time)[2]}</Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    </TouchableOpacity> : null}

                {this.state.userShow !== null ?
                    <ListShow navigation={this.props.navigation} shows={this.state.shows} userShow={this.state.userShow} />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                        <ActivityIndicator size="large" color="#FF1F1F" />
                    </View>
                }
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: { height: 150, paddingHorizontal: 10, marginVertical: 5 },
    map: { flex: 1 },
    text: { fontSize: 14, padding: 10, fontWeight: 'bold', },
    icStyle: { width: 30, height: 30 },
    date: { color: '#fff', fontWeight: 'bold' },
    textInput: {
        backgroundColor: '#FFF',
        height: 30,
        paddingLeft: 10,
        paddingVertical: 0,
        borderColor: '#AAA',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
});
