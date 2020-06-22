import React, { useEffect, useState } from 'react';
import { Container, Header, Button, Text, Content, Form, Item, Input, Label, View } from 'native-base';
import { ActivityIndicator, StyleSheet, Button as ReactNativeButton } from 'react-native';
import {
    getUserData,
    login,
    setAuthData,
    setUserData,
    signup,
    update,
    updatePassword,
    userInfo
} from '../shared/auth_service';
import FooterTabs from "../components/Footer";

export default function EditUserPasswordScreen(props) {

    // 必要な変数を定義
    const {navigation} = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setcurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    useEffect(() => {
        // APIから全てのイベント情報を取得してくる
        // 参考記事：https://qiita.com/daishi/items/4423878a1cd7a0ab69eb
        const f = async () => {
            setIsLoading(true);
            await userInfo()
                .then(response => response.data.response)
                .then(user => {
                    setIsLoading(false);
                    setName(user.name);
                    setEmail(user.email);
                }).catch(error => setIsLoading(false))
        }
        f();
    }, []);


    const onSubmit = () => {
        setIsLoading(true);
        return (
            updatePassword(newPassword, newPasswordConfirmation)
                .then(response => response.data.data)
                .then(data => {
                    setIsLoading(false);
                    console.log('------------');
                    console.log(data);
                    console.log('------------');
                    props.navigation.navigate('Setting');
                }).catch(data => {
                setIsLoading(false);
                setIsFailed(true);
            })
        );
    }

    const editButton = () => {
        if (isLoading) {
            return <ActivityIndicator size="small"/>;
        } else {
            return (
                <Button style={ styles.button } onPress={ () => {　onSubmit()　} }>
                    <Text style={ styles.text }>編集する</Text>
                </Button>
            )
        }
    }

    return (
        <Container>
            <Header/>
            <Content style={ styles.main }>
                { isFailed && <Text>新規登録に失敗しました。</Text> }
                <Form>
                    <Item inlineLabel>
                        <Label>新しいパスワード</Label>
                        <Input onChangeText={ (password) => setNewPassword(password) }/>
                    </Item>
                    <Item inlineLabel>
                        <Label>新しいパスワード(確認)</Label>
                        <Input onChangeText={ (password) => setNewPasswordConfirmation(password) }/>
                    </Item>
                </Form>
                { editButton() }
            </Content>
            <View style={ styles.footer }>
                <FooterTabs navigation={ navigation }/>
            </View>
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
    },
    main: {
        height: '90%'
    },
    footer: {
        height: '10%'
    }
});
