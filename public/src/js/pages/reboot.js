import {nav} from '../main.js';

/**
 * Страница, которая показывается, когда сервер ответил с кодом 403
 * @param {String} message
 * @returns {void}
 */
export function pageReboot(message) {
    nav.navReboot();
    document.querySelector('#content-container').innerHTML = `
        <div>${message}</div>
        <div><a href="/">Перезагрузите приложение</a></div>
    `;
}
