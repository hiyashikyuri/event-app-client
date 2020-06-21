import axios from 'axios';
import { apiAuthPath, apiPath } from './config';
import { getAuthData, getUserData } from "./auth_service";

export async function findAll() {
    const authData = await getAuthData();
    const config = {
        headers: {
            'access-token': authData.accessToken,
            client: authData.client,
            uid: authData.uid
        }
    }
    return await axios.get(`${ apiPath }events`, config);
}


export async function save(title, body) {
    const authData = await getAuthData();
    const config = {
        headers: {
            'access-token': authData.accessToken,
            client: authData.client,
            uid: authData.uid
        }
    }
    const event = { title: title, body: body };
    return await axios.post(`${ apiPath }events/`, { event }, config);
}

export async function edit(id, title, body) {
    const authData = await getAuthData();
    const config = {
        headers: {
            'access-token': authData.accessToken,
            client: authData.client,
            uid: authData.uid
        }
    }
    const event = { id: id, title: title, body: body };
    return await axios.put(`${apiPath}events/${id}`, { event }, config)
}

export async function remove(id) {
    const authData = await getAuthData();
    const config = {
        headers: {
            'access-token': authData.accessToken,
            client: authData.client,
            uid: authData.uid
        }
    }
    return await axios.delete(`${ apiPath }events/${ id }`, config);
}
