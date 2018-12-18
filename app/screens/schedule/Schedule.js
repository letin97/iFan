import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ListView, Animated, Image, StyleSheet } from 'react-native';

import getSchedule from '../../api/getSchedule';

const url = 'http://192.168.1.4/ifan/banners/show/';

export default class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
                getRowData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            })
        };
    }

    componentDidMount() {
        getSchedule()
            .then(responJSON => {
                const shedule = responJSON,
                    length = shedule.length,
                    dataBlob = {},
                    sectionIDs = [],
                    rowIDs = [];

                for (let i = 0; i < length; i++) {
                    const date = shedule[i];

                    // Add Section to Section ID Array
                    sectionIDs.push(date.date);
                    // Set Value for Section ID that will be retrieved by getSectionData
                    dataBlob[date.time] = date.date;

                    const shows = date.shows;
                    const showLength = shows.length;

                    // Initialize Empty RowID Array for Section Index
                    rowIDs[i] = [];

                    for (let j = 0; j < showLength; j++) {
                        const show = shows[j];
                        // Add Unique Row ID to RowID Array for Section
                        rowIDs[i].push(show.id);

                        // Set Value for unique Section+Row Identifier that will be retrieved by getRowData
                        dataBlob[show.id] = show;
                    }
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
                });
            })
            .catch(err => console.log(err));
    }

    parseDate(input) {
        const parts = input.trim().replace(/ +(?= )/g,'').split(/[\s-\/:]/);
        return parts;
    }

    goToDetail(id) {
        this.props.navigation.navigate('Detail', { id });
    }

    renderSectionHeader(sectionData, sectionID) {
        return (
            <Animated.View style={[styles.sectionHeader]}>
                <Text style={styles.sectionHeaderText}>
                    {this.parseDate(sectionID)[2]} Thg {this.parseDate(sectionID)[1]}
                </Text>
            </Animated.View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View key={rowID}>
                <TouchableOpacity key={rowID} onPress={() => this.goToDetail(rowData.id)}>
                    <View style={styles.row}>
                        <View style={styles.timeContainer}>
                            <Text style={styles.time}>{this.parseDate(rowData.time)[3]}:{this.parseDate(rowData.time)[4]}</Text>
                        </View>
                        <View style={styles.details}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={styles.showImage} source={{ uri: `${url}${rowData.banners}` }} />
                                <View style={styles.showInfo}>
                                    <Text style={styles.name}>{rowData.name}</Text>
                                    <Text style={styles.place}>{rowData.place}</Text>
                                </View>
                            </View>
                            <View style={styles.separator} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    stickySectionHeadersEnabled
                    automaticallyAdjustContentInsets={false}
                    removeClippedSubviews={false} 
                />
            </View>
        );
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
        width: 40,
        justifyContent: 'center',
    },
    time: {
        color: '#3B3738',
        textAlign: 'right',
        fontSize: 14,
        marginBottom: 20
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
        fontSize: 14,
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
        marginRight: 10,
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
