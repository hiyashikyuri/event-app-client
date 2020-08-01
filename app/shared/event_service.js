import axios from 'axios';
import { apiPath } from './config';
import { getAuthorization } from './auth_service';


export async function findAll() {
    const config = await getAuthorization();
    return await axios.get(`${ apiPath }events`, config);
}

export async function save(title, body, address, image) {
    let formData = new FormData();
    formData.append('event[title]', title);
    formData.append('event[body]', body);
    formData.append('event[address]', address);
    if (image !== null) {
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('event[image]', {
                uri: image,
                name: `test.${ fileType }`,
                type: `image/${ fileType }`,
            }
        );
    }
    const config = await getAuthorization();
    return await axios.post(`${ apiPath }events/`, formData, config);
}

export async function edit(id, title, body, address, image) {
    let formData = new FormData();
    formData.append('event[id]', id);
    formData.append('event[title]', title);
    formData.append('event[body]', body);
    formData.append('event[address]', address);
    if (image !== null) {
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('event[image]', {
                uri: image,
                // TODO, original_nameで送りたい
                name: `test.${ fileType }`,
                type: `image/${ fileType }`,
            }
        );
    }
    const config = await getAuthorization();
    return await axios.put(`${ apiPath }events/${ id }`, formData, config)
}

export async function remove(id) {
    const config = await getAuthorization();
    return await axios.delete(`${ apiPath }events/${ id }`, config);
}
