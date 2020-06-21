import { AsyncStorage } from "react-native";
import axios from "axios";
import { apiAuthPath } from "./config";
import storage from "./storage";

// auth関連
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



