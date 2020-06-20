import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './app/redux/store'; //Import the store
import Router from './app/router'
import FooterTabs from './app/components/Footer';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <View style={ styles.router }>
                    <Router/>
                </View>
                <View style={ styles.footer }>
                    <FooterTabs/>
                </View>
            </Provider>
        );
    }
}
const styles = StyleSheet.create({
    router: {
        height: '90%'
        // flex: 6,
    },
    footer: {
        height: '10%'
        // flex: 1,
        // justifyContent: 'flex-end'
    }
})
