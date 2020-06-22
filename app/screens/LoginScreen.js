import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Button as ReactNativeButton } from 'react-native';
import { Container, Header, Button, Text, Content, Form, Item, Input, Label } from 'native-base';
import { setAuthData, login } from '../shared/auth_service';


export default function LoginScreen(props) {

    // 必要な変数を定義
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        setIsLoading(true);
        return (
            login(email, password)
                .then(response => {
                    setIsLoading(false);
                    const token = response.headers['access-token'];
                    const client = response.headers['client'];
                    const uid = response.headers['uid'];
                    if (token && client && uid) {
                        // storageにtoken情報などを追加
                        setAuthData(token, client, uid);
                        setIsFailed(false);
                        props.navigation.navigate('Home');
                    } else {
                        setIsFailed(true);
                    }
                }).catch(data => {
                setIsLoading(false);
            })
        );
    }

    const loginButton = () => {
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
                { isFailed && <Text>ログインに失敗しました。</Text> }
                <Form>
                    <Item inlineLabel>
                        <Label>Email</Label>
                        <Input onChangeText={ (email) => setEmail(email) }/>
                    </Item>
                    <Item inlineLabel last>
                        <Label>Password</Label>
                        <Input onChangeText={ (password) => setPassword(password) }/>
                    </Item>
                </Form>
                { loginButton() }
                <ReactNativeButton title="会員登録する" onPress={ () => props.navigation.navigate('Signup') }/>
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
