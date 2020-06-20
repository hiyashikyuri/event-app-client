import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './app/redux/store'; //Import the store
import Router from './app/router'
import FooterTabs from "./app/components/Footer";
import { View, Text, ScrollView } from 'react-native';

export default class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                {/*<View></View>*/}
                <Router/>
                <FooterTabs/>
            </Provider>
        );
    }
}
