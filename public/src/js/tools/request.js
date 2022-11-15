import {app, filmsCatalog, paginationCatalog} from '../main.js';
import {pageReboot} from '../pages/reboot.js';
import {pageNewLogin} from '../pages/newlogin.js'

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
        return;
    }
    
    if (response.status === 401) {
        app.setData(result.app);
        pageNewLogin();
        return;
    }
    
    for (let field in ob) {
        ob[field].setData(result[field]);
    }
  
    return result;
}
