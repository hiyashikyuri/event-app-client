import React, { useState } from 'react';
import { Container, Header, Button, Text, Content, Form, Item, Input, Label } from 'native-base';
import { ActivityIndicator, StyleSheet, Button as ReactNativeButton } from 'react-native';
import { login, setAuthData, signup } from '../shared/auth_service';

export default function SignupScreen(props) {

    // 必要な変数を定義
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const onSubmit = () => {
        setIsLoading(true);
        return (
            signup(name, email, password, password_confirmation)
                .then(response => {
                    setIsLoading(false);
                    props.navigation.navigate('Login');
                }).catch(data => {
                setIsLoading(false);
                setIsFailed(true);
            })
        );
    }

    const signupButton = () => {
        if (isLoading) {
            return <ActivityIndicator size="small"/>;
        } else {
            return (
                <Button style={ styles.button } onPress={ () => onSubmit() }>
                    <Text style={ styles.text }>ログイン</Text>
                </Button>
            )
        }
    }

    return (
        <Container>
            <Header/>
            <Content>
                { isFailed && <Text>新規登録に失敗しました。</Text> }
                <Form>
                    <Item inlineLabel>
                        <Label>Username</Label>
                        <Input onChangeText={ (name) => setName(name) }/>
                    </Item>
                    <Item inlineLabel>
                        <Label>Email</Label>
                        <Input onChangeText={ (email) => setEmail(email) }/>
                    </Item>
                    <Item inlineLabel last>
                        <Label>Password</Label>
                        <Input onChangeText={ (password) => setPassword(password) }/>
                    </Item>
                    <Item inlineLabel last>
                        <Label>Password Confirmation</Label>
                        <Input
                            onChangeText={ (password_confirmation) => setPasswordConfirmation(password_confirmation) }/>
                    </Item>
                </Form>
                { signupButton() }
                <ReactNativeButton title='ログインする' onPress={ () => props.navigation.navigate('Login') }/>
                <ReactNativeButton title='説明画面に戻る' onPress={ () => props.navigation.navigate('Swipe') }/>
            </Content>
        </Container>
    );
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
