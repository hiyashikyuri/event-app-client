import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import storage from "../shared/storage";

export default class FooterTabs extends React.Component {
    logout() {
        storage.remove({ key: 'authData' });
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            // ログインしていたら表示しないようにする
            <Container>
                <Footer>
                    <FooterTab>
                        <Button active onPress={ () => this.props.navigation.navigate('Home') }>
                            <Icon name="home"/>
                        </Button>
                        <Button onPress={ () => this.props.navigation.navigate('CreateEvent') }>
                            <Icon name="camera"/>
                        </Button>
                        {/*<Button>
                            <Icon active name="navigate"/>
                        </Button>*/ }
                        <Button onPress={ () => this.logout() }>
                            <Icon name="person"/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
