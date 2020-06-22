import React, { useEffect, useState } from 'react';
import { Container, Header, Button, Text, Content, Form, Item, Input, View } from 'native-base';
import { ActivityIndicator, StyleSheet  } from 'react-native';
import { updatePassword } from '../shared/auth_service';
import FooterTabs from '../components/Footer';
import { Ionicons } from '@expo/vector-icons';
export default function EditUserPasswordScreen(props) {

    // 必要な変数を定義
    const {navigation} = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    useEffect(() => { }, []);

    const onSubmit = () => {
        setIsLoading(true);
        return (
            updatePassword(newPassword, newPasswordConfirmation)
                .then(response => response.data.data)
                .then(data => {
                    setIsLoading(false);
                    props.navigation.navigate('Setting');
                }).catch(data => {
                setIsLoading(false);
                setIsFailed(true);
            })
        );
    }

    const editButton = () => {
        if (isLoading) {
            return <ActivityIndicator size='small'/>;
        } else {
            return (
                <Button style={ styles.button } onPress={ () => {　onSubmit()　} }>
                    <Text style={ styles.text }>編集する</Text>
                </Button>
            )
        }
    }

    return (
        <Container>
            <Header/>
            <Content style={ styles.main }>
                { isFailed && <Text>新規登録に失敗しました。</Text> }
                <Form>
                    <Item inlineLabel>
                        <Ionicons name='md-key' style={ styles.icon } size={24} color='black' />
                        <Input
                            placeholder='新しいパスワード'
                            secureTextEntry={ true }
                            onChangeText={ (password) => setNewPassword(password) }/>
                    </Item>
                    <Item inlineLabel>
                        <Ionicons name='md-key' style={ styles.icon } size={24} color='black' />
                        <Input
                            placeholder='新しいパスワード(確認用)'
                            secureTextEntry={ true }
                            onChangeText={ (password) => setNewPasswordConfirmation(password) }/>
                    </Item>
                </Form>
                { editButton() }
            </Content>
            <View style={ styles.footer }>
                <FooterTabs navigation={ navigation }/>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 10
    },
    textInput: {
        height: 60,
        width: 300,
        paddingLeft: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
    },
    button: {
        margin: 30
    },
    text: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    main: {
        height: '90%',
        backgroundColor: '#eee',
    },
    footer: {
        height: '10%'
    }
});
