import React, { useEffect } from 'react';
import { AppLoading } from 'expo';
import { setUserData, validateToken, prepareLocalToken, removeLocalToken} from '../shared/auth_service'

//1 - LOADING SCREEN
export default function LoadingScreen(props) {

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

                // 返ってきたuserの情報を保存
                setUserData(data.id, data.name, data.email)
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
