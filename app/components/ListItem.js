import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialIcons } from "@expo/vector-icons";
import { apiImagePath, apiPath } from "../shared/config";

let colours = ['#9DD6EB', '#97CAE5', '#92BBD9'];

export default function ListItem({ item, index, navigation, onDetail, onDelete, onEdit }) {
    const inputEl = useRef(null);

    const RightActions = ({ progress, dragX, onPress, item }) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <View style={ styles.buttons }>
                <RectButton
                    onPress={ () => {
                        inputEl.current.close();
                        onEdit(item);
                    } }>
                    <View style={ [styles.rightAction, styles.editAction] }>
                        <Animated.Text style={ [styles.actionText, { transform: [{ scale }] }] }>
                            編集
                        </Animated.Text>
                    </View>
                </RectButton>
                <RectButton onPress={ () => {
                    inputEl.current.close();
                    onDelete(item.id)
                } }>
                    <View style={ [styles.rightAction, styles.deleteAction] }>
                        <Animated.Text style={ [styles.actionText, { transform: [{ scale }] }] }>
                            削除
                        </Animated.Text>
                    </View>
                </RectButton>
            </View>
        );
    };

    function random() {
        if (index % 2 === 0) { //check if its an even number
            return colours[0];
        } else {
            return colours[2];
        }
    }

    return (
        <Swipeable
            ref={ inputEl }
            renderRightActions={ (progress, dragX) => (
                <RightActions progress={ progress } dragX={ dragX } item={ item }/>
            ) }>
            <View style={ styles.row }>
                <TouchableOpacity
                    style={ [styles.container, { backgroundColor: random() }] }
                    onPress={ () => {
                        onDetail(item)
                    } }>
                    <Text>
                        { item.image.url &&
                        <Image source={ { uri: apiImagePath + item.image.url } }
                               style={ styles.image }/> }
                        <Text style={ styles.title }>
                            { item.title }
                        </Text>
                    </Text>
                    <Text style={ styles.user }>
                        <Text>
                            <MaterialIcons name='person' style={ styles.icon } size={ 12 } color='white'/>
                        </Text>
                        <Text>
                            { item.user.name }
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </Swipeable>
    )
};

const styles = StyleSheet.create({
    row: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
        backgroundColor: '#FFF',
        padding: 10,
    },
    container: {
        padding: 10
    },
    icon: {
        textAlign: 'right'
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 10,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
        color: '#FFF',
        textAlign: "right"
    },
    image: {
        width: 100,
        height: 100
    },
    title: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        lineHeight: 21,
        color: '#FFF',
    },
    buttons: {
        width: 190,
        flexDirection: 'row'
    },
    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: 95,
    },
    editAction: {
        backgroundColor: '#497AFC'
    },
    deleteAction: {
        backgroundColor: '#dd2c00'
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
    }
});
