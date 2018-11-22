import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

export default class SwiperImage extends Component {

    // componentDidMount() {
    //     Image.getSize(myUri, (width, height) => {
    //         this.setState({ width, height });
    //         console.log(`The image dimensions are ${width}x${height}`);
    //     }, (error) => {
    //         console.error(`Couldn't get the image size: ${error.message}`);
    //     });
    // }

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.text}>Hình ảnh</Text>
                </View>

                <Swiper style={styles.wrapper}>
                    <Image
                        source={{ uri: 'https://dantricdn.com/thumb_w/640/2017/screen-shot-2017-11-12-at-82252-pm-1510492990932.png' }}
                        style={styles.img}
                        resizeMode='cover'
                    />

                    <Image
                        source={{ uri: 'https://image.thanhnien.vn/665/uploaded/congthang/2017_01_09/image002_sssu.jpg' }}
                        style={styles.img}
                        resizeMode='cover'
                    />
                </Swiper>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        height: 200
    },
    img: {
        flex: 1,
    },
    text: { fontSize: 14, padding: 10, fontWeight: 'bold', }
});

