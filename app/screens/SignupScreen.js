import React from 'react';
import axios from 'axios';
import { Container, Header, Button, Text, Content, Form, Item, Input, Label } from 'native-base';
import { ActivityIndicator, StyleSheet, Button as ReactNativeButton } from 'react-native';
import { apiAuthPath } from '../config';

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
            return (
                <Button style={ styles.button } onPress={ () => this.onSubmit() }>
                    <Text style={ styles.text }>新規登録</Text>
                </Button>
            )
        }
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    { this.state.failed && <Text>新規登録に失敗しました。</Text> }
                    <Form>
                        <Item inlineLabel>
                            <Label>Username</Label>
                            <Input onChangeText={ (name) => this.setState({ name }) }/>
                        </Item>
                        <Item inlineLabel>
                            <Label>Email</Label>
                            <Input onChangeText={ (email) => this.setState({ email }) }/>
                        </Item>
                        <Item inlineLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={ (password) => this.setState({ password }) }/>
                        </Item>
                        <Item inlineLabel last>
                            <Label>Password Confirmation</Label>
                            <Input
                                onChangeText={ (password_confirmation) => this.setState({ password_confirmation }) }/>
                        </Item>
                    </Form>
                    { this.signupButton() }
                    <ReactNativeButton title="ログインする" onPress={ () => this.props.navigation.navigate('Login') }/>
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
