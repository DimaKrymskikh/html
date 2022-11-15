import {basicUrl} from '../domain.js';
import {app, alertAuthorization} from '../main.js';
import {pageHome} from './home.js';
import {request} from '../tools/request.js';

export async function pageLogout() {
    
    const result = await request(`${basicUrl}/logout`, 'POST',
        JSON.stringify({
            token: app.token,
            aud: app.aud
        }),
        {app}
    );
    
    alertAuthorization.hidden = false;
    pageHome(); 
}
