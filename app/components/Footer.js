import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { AsyncStorage } from 'react-native';
import storage from "../shared/storage";

export default class FooterTabs extends React.Component {
    logout() {
        storage.remove({ key: 'authData' });
        // this.props.navigation.navigate('login');
    }

    render() {
        return (
            // ログインしていたら表示しないようにする
            <Container>
                <Footer>
                    <FooterTab>
                        <Button active>
                            <Icon name="home"/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('CreateEvent') }>
                            <Icon name="camera"/>
                        </Button>
                        <Button>
                            <Icon active name="navigate"/>
                        </Button>
                        <Button onPress={ ()    => this.logout() }>
                            <Icon name="person"/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
