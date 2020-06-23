import axios from 'axios';
import { apiPath } from './config';
import { getAuthorization } from './auth_service';

export async function findAll() {
    const config = await getAuthorization();
    return await axios.get(`${ apiPath }events`, config);
}

export async function save(title, body, address) {
    const config = await getAuthorization();
    const event = { title: title, body: body, address: address };
    return await axios.post(`${ apiPath }events/`, { event }, config);
}

export async function edit(id, title, body, address) {
    const config = await getAuthorization();
    const event = { id: id, title: title, body: body, address: address };
    return await axios.put(`${apiPath}events/${id}`, { event }, config)
}

export async function remove(id) {
    const config = await getAuthorization();
    return await axios.delete(`${ apiPath }events/${ id }`, config);
}
