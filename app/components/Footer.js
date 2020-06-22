import React from 'react';
import { Container, Footer, FooterTab, Button } from 'native-base';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
export default function FooterTabs(route) {
    const { navigation } = route;

    // footerのアクティブを制御
    let homeActive, eventActive, settingActive = false;
    const routeName = navigation.state.routeName;
    switch (routeName) {
        case 'Home':
            homeActive = true;
            break;
        case 'CreateEvent':
            eventActive = true;
            break;
        case 'Setting':
            settingActive = true;
            break;
        default:
            // メイン機能以外はどれもactiveにしない
            homeActive = false;
            eventActive = false;
            settingActive = false;
            break;
    }

    return (
        <Container>
            <Footer>
                <FooterTab>
                    <Button active={ homeActive } onPress={ () => navigation.navigate('Home') }>
                        <MaterialIcons name="home" size={24} color="black" />
                    </Button>
                    <Button active={ eventActive } onPress={ () => navigation.navigate('CreateEvent') }>
                        <AntDesign name="plus" size={24} color="black" />
                    </Button>
                    <Button active={ settingActive } onPress={ () => navigation.navigate('Setting') }>
                        <AntDesign name="setting" size={24} color="black" />
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}
