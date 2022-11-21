import {app, nav} from '../main.js';

export function pageNewLogin() {
    nav.navBar(app.isGuest);
    document.querySelector('#alert-authorization').hidden = false;
    document.querySelector('#content-container').innerHTML = `
        <div>Время токена истекло. Выполните вход заново.</div>
    `;
}
