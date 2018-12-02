import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, View, StyleSheet } from 'react-native';

import getPlaceDetail from '../../api/getPlaceDetail';

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: {}
        };
    }

    componentDidMount() {
        const { id } = this.props;

        getPlaceDetail(id)
        .then(responJSON => {
            const { place } = responJSON;
            this.setState({ place });
        })
        .catch(err => console.log(err));
    }

    render() {
        const { place } = this.state;
        if (Object.keys(place).length === 0) return null;

        return (
            <View style={{ borderTopWidth: 0.5, borderColor: '#A0A0A0' }}>
                <View>
                    <Text style={styles.text}>Địa điểm</Text>
                </View>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: parseFloat(place.latitude),
                            longitude: parseFloat(place.longitude),
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        liteMode
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: parseFloat(place.latitude),
                                longitude: parseFloat(place.longitude),
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121
                            }}
                            title={place.name}
                            description={place.address}
                        />
                    </MapView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { height: 200 },
    map: { flex: 1 },
    text: { 
        fontSize: 14,
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 5,
        fontWeight: 'bold'
    }
});
