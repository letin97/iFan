import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, View, StyleSheet } from 'react-native';

export default class Map extends Component {

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.text}>Địa điểm</Text>
                </View>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 10.7766387,
                            longitude: 106.7031052,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        liteMode
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: 10.7766387,
                                longitude: 106.7031052,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121
                            }}
                            title={'Nhà hát thành phố'}
                            description={'AAAAAAAAAAAAAAA'}
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
    text: { fontSize: 14, padding: 10, fontWeight: 'bold', }
});
