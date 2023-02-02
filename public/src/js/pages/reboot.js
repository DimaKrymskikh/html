import {nav} from '../main.js';

/**
 * Страница, которая показывается, когда сервер ответил с кодом > 400
 * @param {String} status
 * @param {String} message
 * @returns {void}
 */
export function pageReboot(status, message) {
    nav.navReboot();
    document.querySelector('#content-container').innerHTML = `
        <div>[${status}] ${message}</div>
        <div><a href="/">Перезагрузите приложение</a></div>
    `;
}
