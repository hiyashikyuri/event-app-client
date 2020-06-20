import React from 'react';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

import { View, ActivityIndicator, TextInput, StyleSheet, AsyncStorage, SafeAreaView } from 'react-native';
import { Button as ReactNativeBUtton } from 'react-native';
import { apiAuthPath } from "../config";
import { Container, Header, Button, Text, Content, Form, Item, Input, Label } from 'native-base';

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
            return (
                    <Button style={ styles.button }
                            onPress={ () => {
                                this.onSubmit();
                            } }>
                        <Text style={ styles.text }>ログイン</Text>
                    </Button>
                )
        }
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    { this.state.failed && <Text>ログインに失敗しました。</Text> }
                    <Form>
                        <Item inlineLabel>
                            <Label>Username</Label>
                            <Input onChangeText={ (email) => this.setState({ email }) }/>
                        </Item>
                        <Item inlineLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={ (password) => this.setState({ password }) }/>
                        </Item>
                    </Form>
                    { this.loginButton() }
                    <ReactNativeBUtton
                        title="会員登録する" onPress={ () => this.props.navigation.navigate('Signup') }></ReactNativeBUtton>
                </Content>
            </Container>


            // <SafeAreaView>
            //     <View>
            //         { this.state.failed && <Text>ログインに失敗しました。</Text> }
            //
            //         <TextInput
            //             style={ styles.textInput }
            //             placeholder="email"
            //             onChangeText={ (email) => this.setState({ email }) }
            //         />
            //         <TextInput
            //             secureTextEntry={ true }
            //             style={ styles.textInput }
            //             placeholder="パスワード"
            //             onChangeText={ (password) => this.setState({ password }) }
            //         />
            //         { this.loginButton() }
            //         <Button title='会員登録する' onPress={() => this.props.navigation.navigate('Signup') } />
            //     </View>
            // </SafeAreaView>
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
    },
    button: {

        margin: 30
    },
    text: {
        //
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',

    }
});

// test@gmail.com
// 11111111
