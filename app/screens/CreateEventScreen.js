import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    AsyncStorage
} from 'react-native';

import { useDispatch } from 'react-redux';
import { Header } from 'react-navigation-stack';

import axios from "axios";

import { addEvent, updateEvent } from '../redux/actions/events';
import { apiPath } from '../shared/config';


const MAX_LENGTH = 250;

export default function CreateEventScreen(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    let event = navigation.getParam('event', null);

    //1 - DECLARE VARIABLES
    const [isSaving, setIsSaving] = useState(false);
    const [id] = useState(event ? event.id : '');
    const [title, setTitle] = useState(event ? event.title : '');
    const [body, setBody] = useState(event ? event.body : '');

    //2 - GET FLATLIST DATA
    const onSave = () => {
        let edit = event !== null;
        let event_ = {};

        //OPTION 2 - FAKE API
        if (edit) {
            event_ = event;
            event_['title'] = title;
            event_['body'] = body;
            axios.put(`${apiPath}events/${id}`, event_)
                .then(res => res.data.response)
                .then((data) => {
                    dispatch(updateEvent(data));
                    navigation.goBack();
                })
                .catch(error => alert(error.message))
        } else {
            event_ = { id: id, title: title, body: body , user_id: 1};
            axios.post(`${apiPath}events/`, event_)
                .then(res => res.data.response)
                .then((data) => {
                    dispatch(addEvent(data));
                    navigation.goBack();
                })
                .catch(error => alert(error.message))
        }
    }

    //4 - RENDER
    let disabled = (title.length > 0 && body.length > 0) ? false : true;
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={ Header.HEIGHT } style={ styles.flex } behavior="padding">
            <SafeAreaView style={ styles.flex }>
                <View style={ styles.flex }>
                    <TextInput
                        onChangeText={ (text) => setTitle(text) }
                        placeholder={ 'title' }
                        autoFocus={ true }
                        style={ [styles.author] }
                        value={ title }/>
                    <TextInput
                        multiline={ true }
                        onChangeText={ (text) => setBody(text) }
                        placeholder={ "Body" }
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
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
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
    }
});
