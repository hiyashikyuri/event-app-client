import React, { useEffect, useState } from 'react';
import {
    Container, Header, Button, Text, Thumbnail, Content, Form, Item, Input, Label, View,
    Card, CardItem, Icon, Right
} from 'native-base';
import { ActivityIndicator, StyleSheet, Button as ReactNativeButton, ScrollView } from 'react-native';
import { getUserData, login, removeLocalToken, setAuthData, signup } from '../shared/auth_service';
import { findAll } from "../shared/event_service";
import { addEvents } from "../redux/actions/events";
import FooterTabs from "../components/Footer";

export default function UserSettingScreen(props) {

    const { navigation } = props;

    // 必要な変数を定義
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    let user = '';

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            user = await getUserData();
            setName(user.name);
            setEmail(user.email);
            setName(user.name);
        }
    }, []);

    // APIから全てのイベント情報を取得してくる
    /*const getData = async () => {
        // ユーザー情報はローカルから取得
        setIsLoading(true);
        user = await getUserData();
        setName(user.name);
        setEmail(user.email);
        setName(user.name);
    };*/

    // const onSubmit = () => {
    //     setIsLoading(true);
    //     return (
    //         signup(name, email, password, password_confirmation)
    //             .then(response => {
    //                 setIsLoading(false);
    //                 props.navigation.navigate('Login');
    //             }).catch(data => {
    //             setIsLoading(false);
    //             setIsFailed(true);
    //         })
    //     );
    // }

    const logout = () => {
        removeLocalToken();
        navigation.navigate('Login');
    }
    const signupButton = () => {
        if (isLoading) {
            return <ActivityIndicator size="small"/>;
        } else {
            return (
                <Button style={ styles.button } onPress={ () => {
                } }>
                    <Text style={ styles.text }>ログイン</Text>
                </Button>
            )
        }
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
                                <Icon active name="logo-googleplus"/>
                                <Text>名前：{ name }</Text>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Icon active name="logo-googleplus"/>
                                <Text>Email：{ email }</Text>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </CardItem>
                        </Card>
                    </Content>
                </View>
                <Button style={ styles.button } onPress={ () => logout() }>
                    <Text style={ styles.text }>ログアウト</Text>
                </Button>
            </ScrollView>
            <View style={ styles.footer }>
                <FooterTabs navigation={ navigation }/>
            </View>
        </Container>)
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
