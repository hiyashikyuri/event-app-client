import React from 'react';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

import { View, Button, ActivityIndicator, Text, TextInput, StyleSheet, AsyncStorage, SafeAreaView } from 'react-native';
import { apiAuthPath } from "../config";

export default class SignupScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            loading: false,
            failed: false
        };
    }
    
    onSubmit() {
        this.setState({ loading: true });
        return (
            axios.post(`${ apiAuthPath }`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }).then(response => {
                this.setState({ loading: false });
                this.props.navigation.navigate('Login');
            }).catch(data => {
                this.setState({ loading: false });
            })
        );
    }

    signupButton() {
        if (this.state.loading) {
            return <ActivityIndicator size="small"/>;
        } else {
            return <Button title="会員登録" onPress={ () => {
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
                        placeholder='お名前'
                        onChangeText={ (name) => this.setState({ name }) }
                    />
                    <TextInput
                        style={ styles.textInput }
                        placeholder='メールアドレス'
                        onChangeText={ (email) => this.setState({ email }) }
                    />
                    <TextInput
                        secureTextEntry={ true }
                        style={ styles.textInput }
                        placeholder='パスワード'
                        onChangeText={ (password) => this.setState({ password }) }
                    />
                    <TextInput
                        secureTextEntry={ true }
                        style={ styles.textInput }
                        placeholder='パスワード確認用'
                        onChangeText={ (password_confirmation) => this.setState({ password_confirmation }) }
                    />
                    { this.signupButton() }
                    <Button title='ログインする' onPress={() => this.props.navigation.navigate('Login') } />
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
