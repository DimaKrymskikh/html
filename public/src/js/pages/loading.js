import {basicUrl} from '../domain.js';
import {app} from '../main.js';
import {request} from '../tools/request.js';

export async function loading() {
    return await request(`${basicUrl}/init/${app.aud}`, 'GET', null, {app});
}
