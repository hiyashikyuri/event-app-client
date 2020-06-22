import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View　} from 'react-native';

export default function EventDetailScreen(props) {
    const { navigation } = props;

    // propsの中にあるnavigationからevent情報を取得
    const event = navigation.getParam('event', null);

    // 中身を表示させるまでにローディングを表示させることが可能
    const [isLoading, setIsLoading] = useState(false);

    // View部分
    return (
        <SafeAreaView style={ styles.container }>
            <View>
                <Text>id：{ event.id }</Text>
                <Text>作者：{ event.body }</Text>
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
