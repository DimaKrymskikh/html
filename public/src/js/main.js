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

document.body.addEventListener('click', handlerRouter);

(async function() {
    // Сохраняем url сервера в переменной basicUrl
    const response = await fetch('basicUrl.php');
    basicUrl = await response.text();
    
    contentContainer.innerHTML = spinner();
    
    await loading();
    
    pageHome();
})();

function handlerRouter(e) {
    let tag;
    
    if (e.target.tagName.toLowerCase() === 'a') {
        tag = e.target;
    } else if (e.target.parentNode.tagName.toLowerCase() === 'a') {
        tag = e.target.parentNode;
    } else {
        return;
    }
    
    contentContainer.innerHTML = spinner();
    
    switch(tag.hash) {
        case '': pageHome(); break;
        case '#catalog': pageCatalog(); break;
        case '#account': pageAccount(); break;
        case '#login': pageLogin(); break;
        case '#logout': pageLogout(); break;
        case '#register': pageRegister(); break;
    }
}
