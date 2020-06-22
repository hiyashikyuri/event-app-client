import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FooterTabs from '../components/Footer';
import { Container } from 'native-base';

export default function EventDetailScreen(props) {
    const { navigation } = props;

    // propsの中にあるnavigationからevent情報を取得
    const event = navigation.getParam('event', null);

    // 中身を表示させるまでにローディングを表示させることが可能
    const [isLoading, setIsLoading] = useState(false);

    // View部分
    return (
        <Container>
            <View style={ styles.main }>
                <Text>id：{ event.id }</Text>
                <Text>作者：{ event.body }</Text>
            </View>
            <View style={ styles.footer }>
                <FooterTabs navigation={ navigation }/>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        lineHeight: 33,
        fontFamily: 'Helvetica Neue',
        color: '#333333',
        padding: 16,
        paddingTop: 16,
        minHeight: 170,
        borderTopWidth: 1,
        borderColor: 'rgba(212,211,211, 0.3)'
    },
    main: {
        backgroundColor: '#F5F5F5',
        height: '90%'
    },
    footer: {
        height: '10%'
    }
});
