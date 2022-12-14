import {basicUrl, app, user} from '../main.js';
import {pageHome} from './home.js';
import {request} from '../tools/request.js';

/**
 * Разлогирование пользователя
 * @returns {void}
 */
export async function pageLogout() {
    
    const result = await request(`${basicUrl}/logout`, 'POST',
        JSON.stringify({
            token: app.token,
            aud: app.aud
        }),
        {app, user}
    );
    
    // Если запрос вернул false, то выходим из функции
    if (!result) {
        return;
    }
    
    document.querySelector('#alert-authorization').hidden = false;
    pageHome(); 
}
