import {app, nav, alertAuthorization} from '../main.js';

export function pageNewLogin() {
    nav.navBar(app.isGuest);
    alertAuthorization.hidden = false;
    document.querySelector('#content-container').innerHTML = `
        <div>Время токена истекло. Выполните вход заново.</div>
    `;
}
