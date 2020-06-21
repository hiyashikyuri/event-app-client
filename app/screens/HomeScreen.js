import React, { useEffect, useState } from 'react';
import { Container } from 'native-base';
import { FlatList, StyleSheet, SafeAreaView, View, Text, ActivityIndicator, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addEvents, deleteEvent } from '../redux/actions/events';
import ListItem from '../components/ListItem';
import { findAll, remove } from "../shared/event_service";
import FooterTabs from "../components/Footer";
import styles from "../styles";

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const eventReducer = useSelector((state) => state.eventReducer);
    const { events } = eventReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);
        //OPTION 2 - FAKE API
        findAll()
            .then((res) => {
                dispatch(addEvents(res.data.response))
            })
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
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

    const onDetail = (item) => {
        navigation.navigate('EventDetail', { event: item, title: "Event DEtail" })
    };

    //==================================================================================================

    //5 - EDIT QUOTE
    const onEdit = (item) => {
        navigation.navigate('CreateEvent', { event: item, title: "Edit Quote" })
    };

    //==================================================================================================

    //6 - DELETE QUOTE
    const onDelete = (id) => {
        remove(id)
            .then((res) => dispatch(deleteEvent(id)))
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };

    //==================================================================================================

    //7 - RENDER
    if (isFetching) {
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
                {/*<TouchableHighlight*/}
                {/*    style={ styles.floatingButton }*/}
                {/*    underlayColor='#ff7043'*/}
                {/*    onPress={ () => navigation.navigate('CreateEvent') }>*/}
                {/*    <Text style={ { fontSize: 25, color: 'white' } }>+</Text>*/}
                {/*</TouchableHighlight>*/}
                <View style={ styles.footer }>
                    <FooterTabs navigation={ navigation }/>
                </View>
            </Container>
        );
    }
};

