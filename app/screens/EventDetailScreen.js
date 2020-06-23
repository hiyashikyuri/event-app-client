import React, { useState } from 'react';
import { Button as ReactNativeButton, ScrollView, StyleSheet, Text, View } from 'react-native';
import FooterTabs from '../components/Footer';
import { Button, Card, CardItem, Container, Content, Thumbnail } from 'native-base';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";


export default function EventDetailScreen(props) {
    const { navigation } = props;

    // propsの中にあるnavigationからevent情報を取得
    const event = navigation.getParam('event', null);

    // 中身を表示させるまでにローディングを表示させることが可能
    const [isLoading, setIsLoading] = useState(false);

    // View部分
    return (
        <Container style={ styles.wrapper }>
            <ScrollView style={ styles.main }>
                {/*<View style={ { marginTop: 40, alignItems: 'center' } }>*/ }
                {/*    <Thumbnail small source={ { uri: 'http://www.bluecode.jp/images/shiro.jpg' } }/>*/ }
                {/*</View>*/ }
                <View style={ [styles.contentHeader] }>
                    <View style={ [styles.content, { flexDirection: 'row', flexWrap: 'wrap' }] }>
                        <MaterialIcons style={{ marginRight: 20 }} name="event-note" size={ 40 } color="white"/>
                        <Text style={ styles.title }>{ event.title }</Text>
                    </View>

                </View>
                <View>
                    {/* TODO, event作成したuserの名前を表示する */}
                    <Text style={ styles.user }>大久保</Text>
                </View>


                <Text style={ styles.body }>{ event.body }</Text>
                {/* TODO, addressを表示する */}
                {/*<Text style={ styles.address }>{ event.address }</Text>*/}
                <View style={ { flexDirection: 'row', flexWrap: 'wrap' } }>
                    <FontAwesome style={{ marginRight: 10 }} name="map-marker" size={24} color="black" />
                    <Text style={ styles.address }>愛知県名古屋市中村区井深町1-1</Text>
                </View>


                {/*<Button style={ styles.button } onPress={ () => navigation.navigate('EditUserInfo') }>*/ }
                {/*</Button>*/ }
                {/*<Button style={ styles.button } onPress={ () => navigation.navigate('EditUserPassword') }>*/ }
                {/*    <Text style={ styles.text }>パスワード変更</Text>*/ }
                {/*</Button>*/ }
                {/*<ReactNativeButton title='ログアウト' onPress={ () => logout() }/>*/ }
            </ScrollView>
            <View style={ styles.footer }>
                <FooterTabs navigation={ navigation }/>
            </View>
        </Container>
    );
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
    contentHeader: {
        backgroundColor: '#92BBD9',
        height: 200,
    },
    content: {
        position: 'absolute',
        left: 20,
        bottom: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 33,
        fontFamily: 'Helvetica Neue',
        color: '#fff',
        // minHeight: 170,
        borderTopWidth: 1,
        borderColor: 'rgba(212,211,211, 0.3)',
        // marginLeft: 'auto',
        // marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',

    },
    body: {
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        lineHeight: 18
    },
    address: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    user: {
        marginTop: 10,
        textAlign: 'right',
        textAlignVertical: 'top'
    },
    wrapper: {
        backgroundColor: '#F5F5F5',
    },
    main: {
        margin: 10,
        backgroundColor: '#F5F5F5',
        height: '90%'
    },
    footer: {
        height: '10%'
    }
});
