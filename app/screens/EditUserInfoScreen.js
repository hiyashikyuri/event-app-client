import React, { useEffect, useState } from 'react';
import { Container, Header, Button, Text, Content, Form, Item, Input, View } from 'native-base';
import { ActivityIndicator, StyleSheet  } from 'react-native';
import { update  } from '../shared/auth_service';
import FooterTabs from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../redux/actions/current_user';
import { MaterialIcons } from '@expo/vector-icons';

export default function EditUserInfoScreen(props) {

    const dispatch = useDispatch();
    // reduxの設定
    const currentUserReducer = useSelector((state) => state.currentUserReducer);
    const { currentUser } = currentUserReducer;

    // 必要な変数を定義
    const {navigation} = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [name, setName] = useState(currentUser[0].name);
    const [email, setEmail] = useState(currentUser[0].email);

    useEffect(() => { }, []);

    const onSubmit = () => {
        setIsLoading(true);
        return (
            update(name, email)
                .then(response => response.data.data)
                .then(data => {
                    setIsLoading(false);
                    // userの情報をreduxで管理
                    dispatch(updateCurrentUser(data));
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
                        <MaterialIcons name='person' style={ styles.icon } size={ 24 } color='black'/>
                        <Input placeholder='名前' value={ name} onChangeText={ (name) => setName(name) }/>
                    </Item>
                    <Item inlineLabel>
                        <MaterialIcons name='email' style={ styles.icon } size={ 24 } color='black'/>
                        <Input placeholder='Email' value={ email } onChangeText={ (email) => setEmail(email) }/>
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
