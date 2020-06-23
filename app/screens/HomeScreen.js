import React, { useEffect, useState } from 'react';
import { Container } from 'native-base';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addEvents, deleteEvent } from '../redux/actions/events';
import ListItem from '../components/ListItem';
import { findAll, remove } from '../shared/event_service';
import FooterTabs from '../components/Footer';

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    // loadingを表示させるための変数
    const [isLoading, setIsLoading] = useState(false);

    // reduxの設定
    const eventReducer = useSelector((state) => state.eventReducer);
    const { events } = eventReducer;

    // ここから開始される
    useEffect(() => getData(), []);

    // APIから全てのイベント情報を取得してくる
    const getData = () => {
        setIsLoading(true);
        findAll()
            .then((res) => {
                dispatch(addEvents(res.data.response))
            })
            .catch(error => alert(error.message))
            .finally(() => setIsLoading(false));
    };

    // 一つ一つのデータをリスト形式で表示させるためのメソッド
    const renderItem = ({ item, index }) => {
        return (
            <ListItem
                item={ item }
                index={ index }
                navigation={ navigation }
                onDetail={ onDetail }
                onDelete={ onDelete }
                onEdit={ onEdit }/>
        )
    };

    // Eventの操作メソッド
    const onDetail = (item) => { navigation.navigate('EventDetail', { event: item }) };

    const onEdit = (item) => { navigation.navigate('CreateEvent', { event: item }) };

    const onDelete = (id) => {
        remove(id)
            .then((res) => dispatch(deleteEvent(id)))
            .catch(error => alert(error.message))
            .finally(() => setIsLoading(false));
    };

    // View部分
    if (isLoading) {
        return (
            <View style={ styles.activityIndicatorContainer }>
                <ActivityIndicator animating={ true }/>
            </View>
        );
    } else {
        return (
            <Container style={ styles.container }>
                <FlatList
                    data={ events }
                    renderItem={ renderItem }
                    keyExtractor={ (item) => `item-${ item.id.toString() }` }/>
                <View style={ styles.footer }>
                    <FooterTabs navigation={ navigation }/>
                </View>
            </Container>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        height: '90%',
        backgroundColor: '#eee',
    },
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    floatingButton: {
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 80,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    main: {
        height: '90%'
    },
    footer: {
        height: '10%'
    }
})
