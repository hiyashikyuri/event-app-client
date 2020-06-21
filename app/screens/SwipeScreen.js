import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import Swiper from 'react-native-swiper';
export default class SwipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            failed: false
        };
    }

    render() {
        return (
            <Swiper showsButtons={true} loop={false}>
                <View style={styles.slide} index={0}>
                    <Text style={styles.text}>First Page</Text>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.text}>Second Page</Text>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.text}>Third Page</Text>
                    <Button style={ styles.button } onPress={ () => this.props.navigation.navigate('Signup') } >
                        <Text style={ styles.text }>会員登録する</Text>
                    </Button>
                </View>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#047cfc',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
