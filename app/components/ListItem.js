import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

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

    //Returns a colour based on the index
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
                    onPress={ () => { onDetail(item) } }>
                    <Text style={ styles.quote }>
                        { item.title }
                    </Text>
                    <Text style={ styles.author }>
                        { item.body }
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
    author: {
        marginTop: 25,
        marginBottom: 10,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
        color: '#FFF',
        textAlign: "right"
    },
    quote: {
        marginTop: 5,
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
