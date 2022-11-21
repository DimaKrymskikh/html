import {nav} from '../main.js';

export function pageReboot(message) {
    nav.navReboot();
    document.querySelector('#content-container').innerHTML = `
        <div>${message}</div>
        <div><a href="/">Перезагрузите приложение</a></div>
    `;
}
