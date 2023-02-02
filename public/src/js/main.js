import '../scss/main.scss';

import {appModel} from './models/appModel.js';
import {userModel} from './models/userModel.js';
import {filmsModel} from './models/filmsModel.js';
import {paginationModel} from './models/paginationModel.js';
import {navigationBar} from './components/navigation.js';
import {spinner} from './components/spinner.js';
import {pageHome} from './pages/home.js';
import {pageCatalog} from './pages/catalog.js';
import {pageAccount} from './pages/account.js';
import {pageLogin} from './pages/login.js';
import {pageLogout} from './pages/logout.js';
import {pageRegister} from './pages/register.js';

// Экземпляр приложения
export const app = appModel();
// Экземпляр пользователя
export const user = userModel();
// Список всех доступных фильмов
export const filmsCatalog = filmsModel();
// Список фильмов, доступных пользователю
export const filmsAccount = filmsModel();
// Экземпляр пагинации списка всех фильмов
export const paginationCatalog = paginationModel();
// Экземпляр пагинации списка фильмов, доступных пользователю
export const paginationAccount = paginationModel();
// Экземпляр, управляющий основным меню
export const nav = navigationBar();

// Элемент DOM, который содержит изменяемый контент
const contentContainer = document.querySelector('#content-container');

// Отслеживает клики по ссылкам.
// href ссылок должен состоять только из hash
document.body.addEventListener('click', handlerRouter);

/**
 * Переключает страницы приложения
 * @param {Event} e
 * @returns {void}
 */
async function handlerRouter(e) {
    let tag;
    
    if (e.target.tagName.toLowerCase() === 'a' && !e.target.classList.contains('ban')) {
        tag = e.target;
    } else if (e.target.parentNode.tagName.toLowerCase() === 'a' && !e.target.parentNode.classList.contains('ban')) {
        tag = e.target.parentNode;
    } else {
        return;
    }
    
    // Блокируем ссылки от повторного нажатия
    addBanLink();
    // Запускаем большой спиннер
    contentContainer.innerHTML = spinner();
    // Отрисовываем нужную страницу
    switch(tag.hash) {
        case '': pageHome(); break;
        case '#catalog': await pageCatalog(); break;
        case '#account': await pageAccount(); break;
        case '#login': pageLogin(); break;
        case '#logout': await pageLogout(); break;
        case '#register': pageRegister(); break;
    }
    // Разблокируем ссылки
    removeBanLink();
}

/**
 * Используется для блоктрования ссылок во избежания повторных запросов
 * @returns {void}
 */
function addBanLink() {
    document.querySelectorAll('a').forEach( (item) => {
        item.classList.add('ban');
    });
}

/**
 * Используется для разблоктрования ссылок
 * @returns {void}
 */
function removeBanLink() {
    document.querySelectorAll('a').forEach( (item) => {
        item.classList.remove('ban');
    });
}

// Загрузка приложения
(async function() {
    addBanLink();
    contentContainer.innerHTML = spinner();
    
    if( await app.request(`init/${app.aud}`, 'GET', null, {app}) ) {
        pageHome();
        removeBanLink();
    }
})();
