import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { StyleSheet } from "react-native";

export default class FooterTabs extends Component {
    render() {
        return (
            <Container style={ styles.container }>
                <Footer>
                    <FooterTab>
                        <Button active>
                            <Icon name="apps"/>
                        </Button>
                        <Button>
                            <Icon name="camera"/>
                        </Button>
                        <Button>
                            <Icon active name="navigate"/>
                        </Button>
                        <Button>
                            <Icon name="person"/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-end',
    }
})
