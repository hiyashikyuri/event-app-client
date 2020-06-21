import axios from 'axios';
import { apiAuthPath } from './config';
import storage from './storage';

/* getter/setter */
export function setAuthData(token, client, uid) {
    storage.save({
        key: 'authData',
        data: {
            accessToken: token,
            client: client,
            uid: uid
        }
    });
}

export async function getAuthData() {
    return await storage.load({ key: 'authData' }).then(res => {
        return res
    }).catch(error => {
        return '';
    });
}

// user関連
export function setUserData(id, name, email) {
    storage.save({
        key: 'userData',
        data: {
            id: id,
            name: name,
            email: email
        }
    });
}

export async function getUserData() {
    return await storage.load({ key: 'userData' }).then(res => {
        return res
    }).catch(error => {
        return '';
    });
}

/* getter/setter */

/* tokenの確認などを行うメソッド */
export async function prepareLocalToken() {
    const authData = await getAuthData();
    const accessToken = authData.accessToken ? authData.accessToken : '';
    const client = authData.client ? authData.client : '';
    const uid = authData.uid ? authData.uid : '';
    return (accessToken.length > 0 && client.length > 0 && uid.length > 0) ? true : false
}

// このメソッドはprepareLocalTokenを実行してから行う。でないとnullが発生する可能性あり
export async function validateToken() {
    const authData = await getAuthData();
    return await axios.get(`${ apiAuthPath }validate_token?access-token=${ authData.accessToken }&client=${ authData.client }&uid=${ authData.uid }`);
}

export function removeLocalToken() {
    storage.remove({ key: 'authData' });
}

/* tokenの確認などを行うメソッド */


/* サインインなどを行うところ */
export async function login(email, password) {
    return await axios.post(`${ apiAuthPath }sign_in`, { email: email, password: password });
}

export async function signup(name, email, password, password_confirmation) {
    return await axios.post(`${ apiAuthPath }`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
    });
}

/* サインインなどを行うところ */


