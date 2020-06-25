import React from 'react';
import { Container } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // ...StyleSheet.absoluteFillObject, // これがあると全部表示されない
        height: 400,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

// Googleの設定が必要
// https://docs.expo.io/versions/latest/sdk/map-view/
// https://medium.com/nycdev/create-a-react-native-app-with-google-map-using-expo-io-68041252023d
// https://qiita.com/zaburo/items/0bd2e92fb10c50767538
export default function Map(address) {

    return (
        <Container style={ styles.container }>
            <MapView
                provider={ PROVIDER_GOOGLE } // remove if not using Google Maps
                style={ styles.map }
                region={ {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                } }
            >
            </MapView>
        </Container>
    )
}
