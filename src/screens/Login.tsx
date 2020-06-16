import React from 'react';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

import { View, Button, ActivityIndicator, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native';

export default class Login extends React.Component {
    
    url = 'http://localhost:3001/';
    
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
        if (await AsyncStorage.getItem('access_token')) {
            this.props.navigation.navigate('main');
        }
    }
    
    onSubmit() {
        this.setState({ loading: true });
        return (
            axios.post(`${ this.url }api/auth/sign_in`, {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                this.setState({ loading: false });
                const token = response.headers['access-token'];
                if (token) {
                    AsyncStorage.setItem('access_token', token);
                    
                    this.setState({ failed: false });
                    this.props.navigation.navigate('main');
                    
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
