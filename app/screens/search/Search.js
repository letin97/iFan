import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Text, View, StyleSheet, ImageBackground,
    TouchableOpacity, Dimensions
} from 'react-native';

import icSchedule from '../../assets/icons/schedule_fill.png';
import ShowCard from '../../components/ShowCard';

const width = Dimensions.get('window').width;

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowPlace: true,
            arrayPlaces: [{ latitude: 10.7766387, longitude: 106.7031052, name: 'Nhà hát', description: 'A' },
            { latitude: 10.8020398, longitude: 106.6672654, name: 'Sân vận động Quân khu 7', description: 'C' },
            { latitude: 10.7877679, longitude: 106.6993208, name: 'Sân vận động Hoa Lư', description: 'B' }]
        };
    }

    goToSearchMap() {
        this.props.navigation.navigate('SearchMap');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <TouchableOpacity style={styles.container} onPress={this.goToSearchMap.bind(this)}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.arrayPlaces[0].latitude,
                            longitude: this.state.arrayPlaces[0].longitude,
                            latitudeDelta: 0.0421,
                            longitudeDelta: 0.0421,
                        }}
                        //scrollEnabled={false}
                        liteMode
                    >
                        {this.state.arrayPlaces.map(place => (
                            <Marker
                                key={place.latitude}
                                coordinate={{
                                    latitude: place.latitude,
                                    longitude: place.longitude,
                                    latitudeDelta: 0.0421,
                                    longitudeDelta: 0.0421,
                                }}
                                title={place.name}
                                description={place.description}
                            >
                                <View>
                                    <ImageBackground source={icSchedule} style={styles.icStyle} >
                                        <View style={{ alignItems: 'center', marginTop: 6 }}>
                                            <Text style={styles.date}>2</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </Marker>
                        ))}
                    </MapView>
                </TouchableOpacity>
                <ShowCard />
                <ShowCard />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: { height: 150, paddingHorizontal: 10, marginVertical: 5 },
    map: { flex: 1 },
    text: { fontSize: 14, padding: 10, fontWeight: 'bold', },
    icStyle: { width: 30, height: 30 },
    date: { color: '#fff', fontWeight: 'bold' },
});
