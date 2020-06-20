import React from 'react';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

import { View, Button, ActivityIndicator, Text, TextInput, StyleSheet, AsyncStorage, SafeAreaView } from 'react-native';
import { apiAuthPath } from "../config";

export default class LoginScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            failed: false
        };
    }
    
    async componentDidMount() {
        if (await AsyncStorage.getItem('accessToken')) {
            this.props.navigation.navigate('main');
        }
    }
    
    onSubmit() {
        this.setState({ loading: true });
        return (
            axios.post(`${ apiAuthPath }sign_in`, {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                this.setState({ loading: false });
                const token = response.headers['access-token'];
                const client = response.headers['client'];
                const uid = response.headers['uid'];
                if (token && client && uid) {
                    AsyncStorage.setItem('accessToken', token);
                    AsyncStorage.setItem('client', client);
                    AsyncStorage.setItem('uid', uid);
                    
                    this.setState({ failed: false });
                    this.props.navigation.navigate('Home');
                    
                } else {
                    this.setState({ failed: true });
                }
            }).catch(data => {
                this.setState({ loading: false });
            })
        );
    }
    
    loginButton() {
        if (this.state.loading) {
            return <ActivityIndicator size="small"/>;
        } else {
            return <Button title="ログイン" onPress={ () => {
                this.onSubmit();
            } }/>;
        }
    }
    
    render() {
        return (
            <SafeAreaView>
                <View>
                    { this.state.failed && <Text>ログインに失敗しました。</Text> }
                    
                    <TextInput
                        style={ styles.textInput }
                        placeholder="email"
                        onChangeText={ (email) => this.setState({ email }) }
                    />
                    <TextInput
                        secureTextEntry={ true }
                        style={ styles.textInput }
                        placeholder="パスワード"
                        onChangeText={ (password) => this.setState({ password }) }
                    />
                    { this.loginButton() }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 60,
        width: 300,
        paddingLeft: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
    }
});

// test@gmail.com
// 11111111