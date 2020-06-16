import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';

export default class Main extends React.Component {
    
    logout() {
        AsyncStorage.removeItem('access_token');
        this.props.navigation.navigate('login');
    }
    
    render() {
        return (
            <View>
                <Button title="ログアウト" onPress={ () => this.logout() }/>
            </View>
        );
    }
    
}
