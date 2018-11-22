import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Text, View, StyleSheet, ImageBackground,
    TouchableOpacity, Dimensions
} from 'react-native';

import icSchedule from '../../assets/icons/schedule_fill.png';
import ShowCard from '../../components/ShowCard';

const width = Dimensions.get('window').width;

export default class SearchMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowPlace: true,
            region: {
                latitude: 10.7766387,
                longitude: 106.7031052,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
            },
            arrayPlaces: [{ latitude: 10.7766387, longitude: 106.7031052, name: 'Nhà hát', description: 'A' },
            { latitude: 10.8020398, longitude: 106.6672654, name: 'Sân vận động Quân khu 7', description: 'C' },
            { latitude: 10.7877679, longitude: 106.6993208, name: 'Sân vận động Hoa Lư', description: 'B' }]
        };
    }

    showPlace() {
        this.setState({ isShowPlace: true });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={this.state.region}
                        //liteMode
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
                                onPress={this.showPlace.bind(this)}
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

                    {this.state.isShowPlace ?
                        <View style={styles.overlay}>
                            <View style={{ alignItems: 'flex-end', marginBottom: 3 }}>
                                <TouchableOpacity onPress={() => this.setState({ isShowPlace: false })}>
                                    <Text style={styles.close}>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail')}>
                                <ShowCard />
                            </TouchableOpacity>
                            
                        </View> : null
                    }
                </View>
            </View >
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
