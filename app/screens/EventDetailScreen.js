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

import { addEvent, updateEvent } from "../redux/actions/actions";


const MAX_LENGTH = 250;

export default function EventDetailScreen(props) {

    const dispatch = useDispatch();
    const { navigation } = props;

    let event = navigation.getParam('event', null);

    //1 - DECLARE VARIABLES
    const [isSaving, setIsSaving] = useState(false);
    const [id] = useState(event ? event.id : "");
    const [title, setAuthor] = useState(event ? event.title : "");
    const [body, setText] = useState(event ? event.body : "");


    //4 - RENDER
    // let disabled = (title.length > 0 && body.length > 0) ? false : true;
    return (
        <SafeAreaView style={ styles.container }>
            <View>
                <Text>id：{ event.id }</Text>
                <Text>作者：{ event.body }</Text>
                {/*<Text>内容：{ event.text }</Text>*/}
            </View>
        </SafeAreaView>

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
