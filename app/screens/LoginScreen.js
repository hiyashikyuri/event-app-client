import React from 'react';
import { ActivityIndicator, StyleSheet, Button as ReactNativeButton } from 'react-native';
import { Container, Header, Button, Text, Content, Form, Item, Input, Label } from 'native-base';
import { setAuthData, login } from '../shared/auth_service';

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
            login(this.state.email, this.state.password)
                .then(response => {
                    this.setState({ loading: false });
                    const token = response.headers['access-token'];
                    const client = response.headers['client'];
                    const uid = response.headers['uid'];
                    if (token && client && uid) {
                        // storageにtoken情報などを追加
                        setAuthData(token, client, uid)
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
                <Button style={ styles.button } onPress={ () => this.onSubmit() }>
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
                            <Label>Email</Label>
                            <Input onChangeText={ (email) => this.setState({ email }) }/>
                        </Item>
                        <Item inlineLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={ (password) => this.setState({ password }) }/>
                        </Item>
                    </Form>
                    { this.loginButton() }
                    <ReactNativeButton title="会員登録する" onPress={ () => this.props.navigation.navigate('Signup') }/>
                </Content>
            </Container>
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
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',

    }
});
