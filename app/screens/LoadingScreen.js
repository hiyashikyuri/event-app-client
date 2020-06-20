import React, {useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import { AppLoading } from 'expo';
import axios from 'axios';
import { apiAuthPath } from '../config';

//1 - LOADING SCREEN
export default function LoadingScreen(props) {

    useEffect(() => checkLocalData(), []);

    const checkLogin = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const client = await AsyncStorage.getItem('client');
        const uid = await AsyncStorage.getItem('uid');
        return axios.get(`${apiAuthPath}validate_token?access-token=${ accessToken }&client=${ client }&uid=${ uid }`)
            .then((data) => {
                props.navigation.navigate('Home');
                // console.log(data)
            })
            .catch(error => {
                // alert(error.message)
                props.navigation.navigate('Login');
            })
    }

    function checkLocalData(){
        // checkLogin()


        //Check if LocalStorage has been populated with the sample data
        // AsyncStorage.getItem('quotes', (err, data) => {
        //     //if it doesn't exist, extract from json fil
        //     if (data === null){
        //         AsyncStorage.setItem('quotes', JSON.stringify(SampleData.quotes));//save the initial data in Async
        //
        //         props.navigation.navigate('App'); //Navigate to the home page
        //     }else{
        //         props.navigation.navigate('App'); //Navigate to the home page
        //     }
        // });
        props.navigation.navigate('Login');
    }

    return <AppLoading/>;
}
