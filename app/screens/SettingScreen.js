import React, { useEffect, useState } from 'react';
import { Container, Button, Text, Thumbnail, Content, View, Card, CardItem, Right } from 'native-base';
import { Button as ReactNativeButton } from 'react-native';
import { StyleSheet, ScrollView } from 'react-native';
// native-baseのiconは不具合が多いのでexpoのライブラリ使います
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { getUserData, removeLocalToken, userInfo } from '../shared/auth_service';
import FooterTabs from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";

export default function SettingScreen(props) {

    const dispatch = useDispatch();
    // reduxの設定
    const currentUserReducer = useSelector((state) => state.currentUserReducer);
    const { currentUser } = currentUserReducer;

    const { navigation } = props;

    // 必要な変数を定義
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        // APIから全てのイベント情報を取得してくる
        // 参考記事：https://qiita.com/daishi/items/4423878a1cd7a0ab69eb


        // const f = async () => {
        //     setIsLoading(true);
        //     await userInfo()
        //         .then(response => response.data.response)
        //         .then(user => {
        //             setIsLoading(false);
        //             setName(user.name);
        //             setEmail(user.email);
        //         }).catch(error => setIsLoading(false))
        // };
        // f();
    }, []);

    const logout = () => {
        removeLocalToken();
        navigation.navigate('Login');
    }

    // 参考にしたデザイン
    // https://qiita.com/zaburo/items/1cf1f987d3eb09146753
    return (
        <Container style={ { flex: 1, backgroundColor: "#eee" } }>
            <ScrollView style={ styles.main }>
                <View style={ { marginTop: 40, alignItems: 'center' } }>
                    <Thumbnail small source={ { uri: "http://www.bluecode.jp/images/shiro.jpg" } }/>
                </View>
                <Text style={ { alignSelf: 'center', margin: 20 } }>基本情報</Text>
                <View style={ { marginTop: 0, width: '100%', alignSelf: 'center' } }>
                    <Content>
                        <Card>
                            <CardItem>
                                <MaterialIcons name="person" style={ styles.icon } size={ 24 } color="black"/>
                                <Text>名前：{ currentUser[0].name }</Text>
                            </CardItem>
                            <CardItem>
                                <MaterialIcons name="email" style={ styles.icon } size={ 24 } color="black"/>
                                <Text>Email：{ currentUser[0].email }</Text>
                            </CardItem>
                        </Card>
                    </Content>
                </View>
                <Button style={ styles.button } onPress={ () => navigation.navigate('EditUserInfo') }>
                    <Text style={ styles.text }>アカウント情報編集</Text>
                </Button>
                <Button style={ styles.button } onPress={ () => navigation.navigate('EditUserPassword') }>
                    <Text style={ styles.text }>パスワード変更</Text>
                </Button>
                <ReactNativeButton title='ログアウト' onPress={ () => logout() }/>
            </ScrollView>
            <View style={ styles.footer }>
                <FooterTabs navigation={ navigation }/>
            </View>
        </Container>)
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 10
    },
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
