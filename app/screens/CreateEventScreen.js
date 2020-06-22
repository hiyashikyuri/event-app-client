import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Container } from 'native-base';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../redux/actions/events';
import { edit, save } from "../shared/event_service";
import FooterTabs from "../components/Footer";

const MAX_LENGTH = 500;

export default function CreateEventScreen(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    // イベント情報をpropsの中から取得
    let event = navigation.getParam('event', null);

    // 必要な変数を定義
    const [isLoading, setIsSaving] = useState(false);
    const [id] = useState(event ? event.id : '');
    const [title, setTitle] = useState(event ? event.title : '');
    const [body, setBody] = useState(event ? event.body : '');

    // 保存するためのメソッド
    const onSave = () => {
        // idがあれば修正、なければ新規で追加
        if (id) {
            edit(id, title, body)
                .then(res => res.data.response)
                .then((data) => {
                    dispatch(updateEvent(data));
                    navigation.goBack();
                })
                .catch(error => alert(error.message));
        } else {
            save(title, body)
                .then(res => res.data.response)
                .then((data) => {
                    dispatch(addEvent(data));
                    navigation.goBack();
                })
                .catch(error => alert(error.message));
        }
    }

    // View部分
    let disabled = (title.length > 0 && body.length > 0) ? false : true;
    return (
        <KeyboardAvoidingView style={styles.wrapper}  behavior="padding">
            <Container style={ styles.container } >
                <View style={ styles.flex }>
                    <TextInput
                        onChangeText={ (text) => setTitle(text) }
                        placeholder={ 'イベント名' }
                        autoFocus={ true }
                        style={ [styles.author] }
                        value={ title }/>
                    <TextInput
                        multiline={ true }
                        onChangeText={ (text) => setBody(text) }
                        placeholder={ 'イベントの詳細' }
                        style={ [styles.text] }
                        maxLength={ MAX_LENGTH }
                        value={ body }/>
                </View>
                <View style={ styles.buttonContainer }>
                    <View style={ { flex: 1, justifyContent: "center" } }>
                        <Text
                            style={ [styles.count, (MAX_LENGTH - body.length <= 10) && { color: "red" }] }> { MAX_LENGTH - body.length }</Text>
                    </View>
                    <View style={ { flex: 1, alignItems: "flex-end" } }>
                        <TouchableHighlight style={ [styles.button] } disabled={ disabled } onPress={ onSave }
                                            underlayColor="rgba(0, 0, 0, 0)">
                            <Text style={ [styles.buttonText, { color: disabled ? "rgba(255,255,255,.5)" : "#FFF" }] }>
                                保存
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={ styles.footer }>
                    <FooterTabs navigation={ navigation }/>
                </View>
            </Container>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    container: {
        height: '90%',
        backgroundColor: '#F5F5F5'
    },
    flex: {
        flex: 1
    },
    buttonContainer: {
        height: 70,
        flexDirection: "row",
        padding: 12,
        backgroundColor: "white"
    },
    count: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        color: "#6B9EFA"
    },
    button: {
        width: 80,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#6B9EFA"
    },
    buttonText: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 16,
    },
    author: {
        fontSize: 20,
        lineHeight: 22,
        fontFamily: 'Helvetica Neue',
        height: 80,
        padding: 16,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 30,
        lineHeight: 33,
        fontFamily: 'Helvetica Neue',
        color: "#333333",
        padding: 16,
        paddingTop: 16,
        minHeight: 170,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)"
    },
    footer: {
        height: '10%'
    },
});
