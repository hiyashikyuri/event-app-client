import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiPath } from '../config';
import { addEvents, deleteEvent } from "../redux/actions/actions";
import ListItem from "../components/ListItem";

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { events } = dataReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);
        //OPTION 2 - FAKE API
        axios.get(`${ apiPath }events`)
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
        axios.delete(`${ apiPath }events/${ id }`, { data: { id: id } })
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
            <SafeAreaView style={ styles.container }>
                <FlatList
                    data={ events }
                    renderItem={ renderItem }
                    keyExtractor={ (item) => item.id }/>
                <TouchableHighlight
                    style={ styles.floatingButton }
                    underlayColor='#ff7043'
                    onPress={ () => navigation.navigate('CreateEvent', { title: "New Quote" }) }>
                    <Text style={ { fontSize: 25, color: 'white' } }>+</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
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
        bottom: 60,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});
