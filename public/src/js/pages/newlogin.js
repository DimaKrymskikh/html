import {app, nav, contentContainer, alertAuthorization} from '../main.js';

export function pageNewLogin() {
    nav.navBar(app.isGuest);
    alertAuthorization.hidden = false;
    contentContainer.innerHTML = `
        <div>Время токена истекло. Выполните вход заново.</div>
    `;
}
