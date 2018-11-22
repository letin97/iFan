import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ListView, Animated, Image, StyleSheet } from 'react-native';

import scheduleJson from './schedule.json';
import img from '../../assets/icons/show1.jpg';

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            loading: true,
            scrollDistance: new Animated.Value(0),
            dataSource: ds.cloneWithRowsAndSections(scheduleJson)
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    stickySectionHeadersEnabled
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        const circleStyle = { backgroundColor: '#05A9D6' };

        const title = (
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.showImage} source={img} />
                <View style={styles.showInfo}>
                    <Text style={styles.name}>{rowData.name}</Text>
                    <Text style={styles.place}>{rowData.place.name}</Text>
                </View>
            </View>
        );

        const content = (
            <View style={styles.row}>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{rowData.time}</Text>
                </View>
                <View style={styles.details}>
                    {title}
                    <View style={styles.separator} />
                </View>
            </View>
        );

        if (rowData.speaker) {
            return (
                <TouchableOpacity onPress={() => this._onRowPressed(rowData)} key={rowID}>
                    {content}
                </TouchableOpacity>
            );
        }

        return (
            <View key={rowID}>
                {content}
            </View>
        );
    }

    renderSectionHeader(sectionData, sectionID) {
        const scrollDistance = this.state.scrollDistance;
        const headerStyles = {
            //  height: scrollDistance.interpolate({
            //     inputRange: [40, 130],
            //     outputRange: [130, 40],
            //       extrapolate: 'clamp',
            //  })
        };

        return (
            <Animated.View style={[styles.sectionHeader, headerStyles]}>
                <Text style={styles.sectionHeaderText}>
                    {sectionID}
                </Text>
            </Animated.View>
        );
    }

    _onRowPressed(rowData) {
        let route = {
            name: 'details',
            title: 'Talk Details',
            talkInfo: rowData
        };

        this.props.navigator.push(route);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    // ListView
    list: {
        flex: 1
    },
    // SectionHeader
    sectionHeader: {
        marginBottom: 15,
        backgroundColor: '#FF1F1F',
        height: 24,
        justifyContent: 'center'
    },
    sectionHeaderText: {
        color: '#FFF',
        fontSize: 16,
        alignSelf: 'center'
    },
    // Row
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    timeContainer: {
        width: 40
    },
    time: {
        color: '#AAA',
        textAlign: 'right',
        fontSize: 12
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#88C057',
        position: 'absolute',
        left: -5,
        top: 0
    },
    details: {
        borderColor: '#AAA',
        borderLeftWidth: 1,
        flexDirection: 'column',
        flex: 1,
        marginLeft: 20,
        paddingLeft: 20
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3B3738',
        marginBottom: 6
    },
    place: {
        fontSize: 12,
        marginBottom: 6
    },
    showImage: {
        width: 80,
        height: 60,
        borderRadius: 5,
        marginRight: 15,
    },
    showInfo: {
        flex: 1
    },
    separator: {
        height: 0.5,
        backgroundColor: '#AAA',
        marginTop: 15,
        marginBottom: 15
    }
});
