import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import storage from "../shared/storage";

export default function FooterTabs(route) {
    const { navigation } = route;

    // footerのアクティブを制御
    let homeActive, eventActive, userActive = false;
    const routeName = navigation.state.routeName;
    switch (routeName) {
        case 'Home':
            homeActive = true;
            break;
        case 'CreateEvent':
            eventActive = true;
            break;
        case 'User':
            userActive = true;
            break;
        default:
            // メイン機能以外はどれもactiveにしない
            homeActive = false;
            eventActive = false;
            userActive = false;
            break;
    }

    return (
        <Container>
            <Footer>
                <FooterTab>
                    <Button active={ homeActive } onPress={ () => navigation.navigate('Home') }>
                        <Icon name="home"/>
                    </Button>
                    <Button active={ eventActive } onPress={ () => navigation.navigate('CreateEvent') }>
                        <Icon name="camera"/>
                    </Button>
                    {/*<Button>
                            <Icon active name="navigate"/>
                        </Button>*/ }
                    <Button active={ userActive } onPress={ () => navigation.navigate('User') }>
                        <Icon name="person"/>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}
