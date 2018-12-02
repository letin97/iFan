import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import ViewMoreText from 'react-native-view-more-text';

export default class ScrollSinger extends Component {

    renderViewMore(onPress) {
        return (
            <View style={{ flexDirection: 'row', marginEnd: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.separator} />
                <Text onPress={onPress} style={{ color: '#00BFFF', fontSize: 10, paddingHorizontal: 5 }}>Xem thêm</Text>
            </View>

        );
    }
    renderViewLess(onPress) {
        return (
            <View style={{ flexDirection: 'row', marginEnd: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.separator} />
                <Text onPress={onPress} style={{ color: '#00BFFF', fontSize: 10, paddingHorizontal: 5 }}>Thu gọn</Text>
            </View>
        );
    }

    render() {
        const { show } = this.props;

        return (
            <View style={{ borderTopWidth: 0.5, borderColor: '#A0A0A0' }}>
                <Text style={styles.text}>Thông tin</Text>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <ViewMoreText
                            numberOfLines={3}
                            renderViewMore={this.renderViewMore}
                            renderViewLess={this.renderViewLess}
                            textStyle={{ paddingHorizontal: 10, fontSize: 12 }}
                        >
                            <Text>{show.description}</Text>
                        </ViewMoreText>
                    </View>
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
    }
});
