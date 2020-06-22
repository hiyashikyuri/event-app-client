import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import Swiper from 'react-native-swiper';

export default function SwipeScreen(props) {
    return (
        <Swiper showsButtons={ true }>
            <View style={ styles.slide1 }>
                <Text style={ styles.text }>First Page</Text>
            </View>
            <View style={ styles.slide2 }>
                <Text style={ styles.text }>Second Page</Text>
            </View>
            <View style={ styles.slide3 }>
                <Text style={ styles.text }>Third Page</Text>
                <Button style={ styles.button } onPress={ () => props.navigation.navigate('Signup') }>
                    <Text style={ styles.text }>会員登録する</Text>
                </Button>
            </View>
        </Swiper>
    );
}

const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});
