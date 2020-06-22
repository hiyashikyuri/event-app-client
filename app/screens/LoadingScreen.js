import React, { useEffect } from 'react';
import { AppLoading } from 'expo';
import { validateToken, prepareLocalToken, removeLocalToken} from '../shared/auth_service'
import { useDispatch } from 'react-redux';
import { addCurrentUser } from '../redux/actions/current_user';

//1 - LOADING SCREEN
export default function LoadingScreen(props) {

    const dispatch = useDispatch();

    useEffect(() => checkLocalData(), []);

    const checkLogin = async () => {
        // ローカルのトークンがあるかどうかを確認
        const isValid = await prepareLocalToken()

        if (!isValid) {
            return props.navigation.navigate('Swipe');
        }

        // APIにtokenを確かめるところ
        await validateToken()
            .then(data => data.data.data)
            .then(data =>  {
                // userの情報をreduxで管理
                dispatch(addCurrentUser(data));
                props.navigation.navigate('Home');
            })
            .catch(error => {
                // tokenが古い、もしくは間違っている可能性があるので、not validなら削除する
                removeLocalToken();
                props.navigation.navigate('Swipe');
            });
    }

    function checkLocalData() {
        checkLogin()
    }

    return <AppLoading/>;
}
