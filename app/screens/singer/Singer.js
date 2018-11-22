import React, { Component } from 'react';
import {
    Text, View, StyleSheet, ScrollView, Image,
    TouchableOpacity, ImageBackground
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import LinearGradient from 'react-native-linear-gradient';

import backgounrd from '../../assets/icons/backgroundmtp.jpg';
import mtp from '../../assets/icons/mtp.jpg';
import ShowCard from '../../components/ShowCard';

export default class Singer extends Component {

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
        return (
            <ScrollView style={styles.container}>
                <View style={styles.badge}>
                    <ImageBackground source={backgounrd} style={{ height: 180 }}>
                        <LinearGradient
                            colors={['transparent', 'rgba(180,180,180,0.5)']}
                            start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}
                            style={{ flex: 1 }}
                        >
                            <View style={styles.borderavatar}>

                                <Image style={styles.avatar} source={mtp} />
                                <View style={styles.badgeInfo}>
                                    <View style={{ marginStart: 10 }}>
                                        <Text style={styles.name}>Sơn Tùng MTP</Text>
                                    </View>

                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Text style={styles.textInterest}>+ Quan tâm</Text>
                                    </View>
                                </View>

                            </View>
                        </LinearGradient>
                    </ImageBackground>
                    <View style={styles.interest}>
                        <Text style={styles.number}>18.3k</Text>
                        <Text style={styles.text}>Quan tâm</Text>
                    </View>
                </View>
                <View style={styles.separator} />
                <View style={{ flex: 1 }}>
                    <ViewMoreText
                        numberOfLines={3}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                        textStyle={{ paddingHorizontal: 10, fontSize: 12, marginTop: 15 }}
                    >
                        <Text>
                            M-TP tên thật là Nguyễn Thanh Tùng. Cậu thanh niên sinh năm 1994 ở Thái Bình sớm bị hip hop hớp hồn giống như bao bạn bè đồng trang lứa. Và với niềm đam mê này, M-TP quyết tâm khăn gói tới Hà Nội học hỏi thêm về hip hop. Sau khi tốt nghiệp cấp 3, anh chàng dự định sẽ đầu quân làm học viên tại Học viện M4Me để rèn rũa khả năng ca hát, sáng tác... trước khi chính thức theo đuổi con đường âm nhạc. Ngoài đam mê ca hát, M-TP còn có khả năng sáng tác, chơi piano và nhảy cực "đỉnh". Với thế mạnh này, anh chàng không ngừng cố gắng học tập các bậc đàn anh đàn chị và đã có trong tay một hành trang khá "khủng" những sáng tác của riêng mình
                        </Text>
                    </ViewMoreText>
                </View>

                <ShowCard />
                <ShowCard />
                <ShowCard />
                <ShowCard />
                <ShowCard />
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    badge: {
        //alignItems: 'center',
        //padding: 15
    },
    badgeInfo: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3A3A3A'
    },
    description: {
        fontSize: 13,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    borderavatar: {
        position: 'absolute', // child
        bottom: 0, // position where you want
        left: 0,
        flexDirection: 'row',
        padding: 8
    },
    separator: {
        height: 0.5,
        backgroundColor: '#AAA',
        marginTop: 15,
        flex: 8
    },
    interest: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textInterest: {
        fontSize: 12,
        borderRadius: 3,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
        backgroundColor: '#FF1F1F',
        borderColor: '#FF1F1F',
        color: '#fff'
    }
});
