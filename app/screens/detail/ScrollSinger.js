import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const url = 'http://192.168.1.4/ifan/images/singer/';

export default class ScrollSinger extends Component {

    goToDetail(id) {
        this.props.navigation.replace('Singer', { id });
    }

    render() {
        const { singers } = this.props;
        
        return (
            <View style={{ marginBottom: 10 }}>
                <Text style={styles.text}>Ca sĩ</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                {singers.map(s => (
                    <TouchableOpacity onPress={() => this.goToDetail(s.id)} key={s.id}>
                        <View style={{ alignItems: 'center', paddingHorizontal: 3 }}>
                            <Image source={{ uri: `${url}${s.images[0]}` }} style={styles.image} />
                            <Text style={styles.name}>{s.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200
    },
    text: {
        fontSize: 14,
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 5,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});
