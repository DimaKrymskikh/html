import {basicUrl, app} from '../main.js';
import {request} from '../tools/request.js';

/**
 * Запрос при загрузке приложения
 * @returns {Object|Boolean}
 */
export async function loading() {
    return await request(`${basicUrl}/init/${app.aud}`, 'GET', null, {app});
}
