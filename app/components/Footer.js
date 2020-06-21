import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import storage from "../shared/storage";

export default class FooterTabs extends React.Component {
    logout() {
        storage.remove({ key: 'authData' });
        this.props.navigation.navigate('Login');
    }

    render() {
        let homeActive, eventActive = false;
        const routeName = this.props.navigation.state.routeName;
        switch (routeName) {
            case 'Home':
                homeActive = true;
                break;
            case 'CreateEvent':
                eventActive = true;
                break;
            default:
                homeActive = true;
                break;
        }

        return (
            // ログインしていたら表示しないようにする
            <Container>
                <Footer>
                    <FooterTab>
                        <Button active={ homeActive } onPress={ () => this.props.navigation.navigate('Home') }>
                            <Icon name="home"/>
                        </Button>
                        <Button active={ eventActive } onPress={ () => this.props.navigation.navigate('CreateEvent') }>
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
