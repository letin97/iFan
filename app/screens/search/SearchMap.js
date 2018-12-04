import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Text, View, StyleSheet, ImageBackground,
    TouchableOpacity, Dimensions
} from 'react-native';

import icSchedule from '../../assets/icons/schedule_fill.png';
import ShowCard from '../home/ShowCard';

const width = Dimensions.get('window').width;

export default class SearchMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowPlace: false,
            showChosen: {}
        };
    }

    componentWillMount() {
        const shows = this.props.navigation.getParam('shows', 'NO-SHOWS');
        this.setState({ isShowPlace: true, showChosen: shows[0] });
    }

    goToDetail(id) {
        this.props.navigation.push('Detail', { id });
    }

    parseDate(input) {
        const parts = input.trim().replace(/ +(?= )/g, '').split(/[\s-\/:]/);
        return parts;
    }

    chooseShow(show) {
        this.setState({ isShowPlace: true, showChosen: show });
    }

    render() {
        const shows = this.props.navigation.getParam('shows', 'NO-SHOWS');
      
        return (
            <View style={styles.container}>
                {typeof shows !== 'undefined' && shows.length > 0 ?
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: parseFloat(shows[0].latitude),
                            longitude: parseFloat(shows[0].longitude),
                            latitudeDelta: 0.0421,
                            longitudeDelta: 0.0421,
                        }}
                    //liteMode
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
                                onPress={() => this.chooseShow(show)}
                            >
                                <ImageBackground source={icSchedule} style={styles.icStyle} >
                                    <View style={{ alignItems: 'center', marginTop: 6 }}>
                                        <Text style={styles.date}>{this.parseDate(show.time)[2]}</Text>
                                    </View>
                                </ImageBackground>
                            </Marker>
                        ))}

                    </MapView> : null}

                {this.state.isShowPlace ?
                    <View style={styles.overlay}>
                        <View style={{ alignItems: 'flex-end', marginBottom: 3 }}>
                            <TouchableOpacity onPress={() => this.setState({ isShowPlace: false })}>
                                <Text style={styles.close}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.goToDetail(this.state.showChosen.id)}>
                            <ShowCard show={this.state.showChosen} />
                        </TouchableOpacity>
                    </View> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    text: { fontSize: 14, padding: 10, fontWeight: 'bold', },
    icStyle: { width: 30, height: 30 },
    date: { color: '#fff', fontWeight: 'bold' },

    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.4)',
        width
    },

    close: {
        fontSize: 12
    }
});
