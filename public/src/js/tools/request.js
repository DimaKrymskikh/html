import {app, user} from '../main.js';
import {pageReboot} from '../pages/reboot.js';
import {pageNewLogin} from '../pages/newlogin.js'

/**
 * Оболочка над fetch
 * @param {String} url
 * @param {String} method
 * @param {String} body - Строка JSON
 * @param {Object} ob - Содержит список элементов, которые будут обновлены 
 * @returns {Object|Boolean}
 */
export async function request(url, method, body, ob = null) {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });
        
    const result = await response.json();
    
    if (response.status === 403) {
        pageReboot(result.message); 
        app.setDefault();
        return false;
    }
    
    if (response.status === 401) {
        app.setData(result.app);
        user.setData(result.user);
        pageNewLogin();
        return false;
    }
    
    for (let field in ob) {
        ob[field].setData(result[field]);
    }
  
    return result;
}
