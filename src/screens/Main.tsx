import React from 'react';
import { View, Button, AsyncStorage, ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';

import axios from 'axios';

interface Event {
    id: number;
    title: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
}

export default class Main extends React.Component {
    
    url = 'http://localhost:3001/';
    
    constructor(props: any) {
        super(props);
        this.state = {
            eventName: '',
            events: '',
            loading: false,
            accessToken: ''
        };
    }
    
    async componentDidMount() {
        const headers = await this.setHeaders();
        this.setState({ loading: true, accessToken: await AsyncStorage.getItem('accessToken') });
        axios.get(`${ this.url }api/events`, { headers: headers })
            .then(events => events.data.response)
            .then((events: Event[]) => {
                this.setState({ loading: false, events: events });
            }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });
    }
    
    async setHeaders() {
        return {
            'Content-Type': 'application/json',
            'access-token': await AsyncStorage.getItem('accessToken'),
            client: await AsyncStorage.getItem('client'),
            uid: await AsyncStorage.getItem('uid'),
        };
    }
    
    async submitCreateEvent() {
        if (!this.state.eventName) return;
        
        this.setState({ loading: true });
        const headers = await this.setHeaders();
        axios.post(`${ this.url }api/events`, {
            event: {
                title: this.state.eventName,
                user_id: 1
            }
        }, { headers: headers })
            .then(event => event.data.response)
            .then((event: Event) => {
                this.state.events.push(event);
                this.setState({ events: this.state.events, eventName: '', loading: false });
            }).catch(error => {
            console.log(error);
        });
    }
    
    changeFinished(item) {
        item.finished = !item.finished;
        this.setState({ loading: true });
        const headers = {
            'access-token': AsyncStorage.getItem('accessToken'),
            client: AsyncStorage.getItem('client'),
            uid: AsyncStorage.getItem('uid'),
        };
        
        axios.patch(`${ this.url }events/${ item.id }`, {
            title: this.state.eventName,
            user_id: 1
        }, { headers: headers })
            .then(response => this.setState({ loading: false }))
            .catch(error => console.error(error));
    }
    
    createEventButton() {
        if (this.state.loading) return <ActivityIndicator size="small"/>;
        else return <Button title="作成" onPress={ () => this.submitCreateEvent() }/>;
    }
    
    renderEvents() {
        if (this.state.loading) {
            return <FlatList/>;
        } else {
            return (
                <FlatList
                    data={ this.state.events }
                    keyExtractor={ (item) => item.id.toString() }
                    renderItem={ ({ item }) => (
                        <CheckBox title={ item.title } checked={ item.finished }
                                  onPress={ () => this.changeFinished(item) }/>
                    ) }
                />
            );
            
        }
    }
    
    logout() {
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('client');
        AsyncStorage.removeItem('uid');
        this.props.navigation.navigate('login');
    }
    
    render() {
        return (
            <View>
                <View style={ styles.form }>
                    <TextInput
                        style={ styles.textInput }
                        placeholder="イベント名"
                        value={ this.state.eventName }
                        onChangeText={ (eventName) => this.setState({ eventName }) }
                    />
                    { this.createEventButton() }
                </View>
                { this.renderEvents() }
                <View style={ styles.logout }>
                    <Button title="ログアウト" onPress={ () => this.logout() }/>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    form: { margin: 40 },
    textInput: {
        height: 60,
        width: 300,
        paddingLeft: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
    },
    logout: { marginBottom: 20 }
});

