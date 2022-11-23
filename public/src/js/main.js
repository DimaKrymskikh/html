import '../scss/main.scss';

import {appModel} from './models/appModel.js';
import {userModel} from './models/userModel.js';
import {filmsModel} from './models/filmsModel.js';
import {paginationModel} from './models/paginationModel.js';
import {navigationBar} from './components/navigation.js';
import {spinner} from './components/spinner.js';
import {loading} from './pages/loading.js';
import {pageHome} from './pages/home.js';
import {pageCatalog} from './pages/catalog.js';
import {pageAccount} from './pages/account.js';
import {pageLogin} from './pages/login.js';
import {pageLogout} from './pages/logout.js';
import {pageRegister} from './pages/register.js';

// Переменная для хранения url сервера
export let  basicUrl;

export const app = appModel();
export const user = userModel();
export const filmsCatalog = filmsModel();
export const filmsAccount = filmsModel();
export const paginationCatalog = paginationModel();
export const paginationAccount = paginationModel();
export const nav = navigationBar();

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
    
    addBanLink();
    contentContainer.innerHTML = spinner();
    switch(tag.hash) {
        case '': pageHome(); break;
        case '#catalog': await pageCatalog(); break;
        case '#account': await pageAccount(); break;
        case '#login': pageLogin(); break;
        case '#logout': await pageLogout(); break;
        case '#register': pageRegister(); break;
    }
    removeBanLink();
}

/**
 * Используется для блоктрования ссылок для избежания повторных запросов
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

// Содержит запросы при загрузке приложения
(async function() {
    addBanLink();
    contentContainer.innerHTML = spinner();
    
    // Сохраняем url сервера в переменной basicUrl
    const response = await fetch('basicUrl.php');
    basicUrl = await response.text();
    
    await loading();
    
    pageHome();
    removeBanLink();
})();
