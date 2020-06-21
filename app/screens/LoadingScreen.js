import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import axios from 'axios';
import { apiAuthPath } from '../shared/config';
import { getAuthData, setAuthData, setUserData} from '../shared/auth_service'

//1 - LOADING SCREEN
export default function LoadingScreen(props) {

    useEffect(() => checkLocalData(), []);

    const checkLogin = async () => {
        const authData = await getAuthData();

        const accessToken = authData.accessToken ?  authData.accessToken : '';
        const client = authData.client ? authData.client : '';
        const uid = authData.uid ? authData.uid : '';

        const isValid = (accessToken.length > 0 && client.length > 0 && uid.length > 0) ? true : false

        if (!isValid) {
            return props.navigation.navigate('Login');
        }

        if (isValid) {
            return axios.get(`${ apiAuthPath }validate_token?access-token=${ accessToken }&client=${ client }&uid=${ uid }`)
                .then(data => data.data.data)
                .then(data =>  {
                    setUserData(data.id, data.name, data.email)
                    props.navigation.navigate('Home');
                })
                .catch(error => {
                    alert(error.message)
                    props.navigation.navigate('Login');
                });
        }
    }

    function checkLocalData() {
        checkLogin()
    }

    return <AppLoading/>;
}
