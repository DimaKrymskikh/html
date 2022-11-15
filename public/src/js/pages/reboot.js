import {nav, contentContainer} from '../main.js';

export function pageReboot(message) {
    nav.navReboot();
    contentContainer.innerHTML = `
        <div>${message}</div>
        <div><a href="/">Перезагрузите приложение</a></div>
    `;
}
