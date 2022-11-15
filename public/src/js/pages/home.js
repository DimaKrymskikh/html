import {app, contentContainer, nav} from '../main.js';
import {getBreadcrumb} from '../components/breadcrumb.js'

// Получаем хлебные крошки
const breadcrumb = getBreadcrumb([{
                text: 'Главная страница'
            }]);

/**
 * Отрисовывает главную страницу
 * Изменяет вид меню, потому что после регистрации, входа или выхода из системы осущестляется редерикт на главную страницу
 * @returns {void}
 */
export function pageHome() {
    location.href = '#';
    document.title = 'Главная страница';
    nav.navBar(app.isGuest);
    contentContainer.innerHTML = `
        ${breadcrumb}
        <h1>Главная страница</h1>`;
}
