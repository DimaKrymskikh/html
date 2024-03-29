import { Modal } from 'bootstrap';
import {app, user, filmsAccount, paginationAccount} from '../main.js';
import {paginationBlok, turnPage} from '../components/pagination.js';
import {getBreadcrumb} from '../components/breadcrumb.js';
import {objectUtil} from '../tools/objectUtil.js';
import {putFilms} from '../tools/putFilms.js';
import {renderFilmCard} from './filmCard.js';
import {renderPersonalFilmsTable} from './account/filmsTable.js';
import {renderFilmRemoveModal, showFilmRemoveModal, handlerRemoveFilm} from './account/filmRemoveModal.js';
import {renderAccountRemoveButton, renderAccountRemoveModal, showAccountRemoveModal, handlerAccountRemove} from './account/accountDeletionModal.js';
import {getDropdown, changeElementsNumber} from '../components/dropdown.js';

// Получаем доступ к полезным методам
const oU = objectUtil();

// Получаем хлебные крошки
const breadcrumb = getBreadcrumb([{
                hash: '#',
                text: 'Главная страница'
            }, {
                text: 'Личный кабинет'
            }]);


function content() {
    let htmlContent = `
        <div id="personalArea">
            ${breadcrumb}
        
            <h1>${user.login}. Личный кабинет</h1>
            <h2>Список доступных фильмов</h2>`;
    
    if (paginationAccount.itemsNumberTotal || filmsAccount.sortFilmTitle || filmsAccount.sortFilmDescription) {
        // Узел для выбора числа элементов на странице
        htmlContent += getDropdown('Число фильмов на странице', [10, 20, 50, 100], 'dropdown-films', paginationAccount);
        htmlContent += renderPersonalFilmsTable();
    } else {
        htmlContent += `
            <div class="alert alert-info" role="alert">
                У Вас ещё нет выбранных фильмов!
            </div>`;
    }
    
     htmlContent += renderAccountRemoveButton();
    
    // Закрываем <div id="personalArea">
    htmlContent += `</div>`;
    
    htmlContent += renderAccountRemoveModal();
    htmlContent += renderFilmRemoveModal();
    
    return htmlContent;
};

/**
 * Отрисовывает страницу аккаунта
 * @returns {void}
 */
function renderAccount() {
    let html = content();
    html += paginationBlok(paginationAccount);
    document.querySelector('#content-container').innerHTML = html;
    
    // Создаем экземпляр модального окна для удаления фильма
    const filmRemoveModal = new Modal('#film-remove-modal');
    // Создаем экземпляр модального окна для удаления аккаунта
    const removeAccountModal = new Modal('#remove-account-modal');
    
    // Если на странице имеются фильмы или вводились фильтры,
    // то на таблицу фильмов вешаем обработчик взаимодействия с фильмами и обработчики фильтрации списка фильмов
    if (paginationAccount.itemsNumberTotal || filmsAccount.sortFilmTitle || filmsAccount.sortFilmDescription) {
        document.getElementById('personal-films-table').addEventListener('click', handlerFilms(filmRemoveModal));
        // Задаем события для фильтровки списка фильмов
        oU.sortInput(document.getElementById('sort-film-title'), filmsAccount, 'setSortFilmTitle');
        putFilms(document.getElementById('sort-film-title'), paginationAccount, requestAccount, renderAccount);
        oU.sortInput(document.getElementById('sort-film-description'), filmsAccount, 'setSortFilmDescription');
        putFilms(document.getElementById('sort-film-description'), paginationAccount, requestAccount, renderAccount);
        // Изменяет число элементов на странице
        changeElementsNumber(document.getElementById('dropdown-films'), requestAccount, renderAccount);
    }
    // Обработка переключения страниц
    turnPage(document.querySelector('.pagination-container'), paginationAccount, requestAccount, renderAccount);
    
    // На кнопку 'Да' модального окна для удаления фильма вешаем обработчик, удаляющий фильм
    document.getElementById('remove-film-button').addEventListener('click', handlerRemoveFilm(filmRemoveModal, requestAccount, renderAccount));
    
    // На кнопку 'Да' модального окна для удаления аккаунта вешаем обработчик, удаляющий аккаунт
    document.getElementById('remove-account-button').addEventListener('click', handlerAccountRemove(removeAccountModal));
    // На кнопку "Удалить" (удалить аккаунт) вешаем обработчик, который открывает модальное окно для удаления аккаунта
    document.getElementById('show-account-button').addEventListener('click', showAccountRemoveModal(removeAccountModal));
}

/**
 * Осуществляет запрос на сервер для получения списка фильмов и параметров пагинации
 * @param {Object|int} pagination
 * @param {int} page
 * @returns {undefined}
 */
async function requestAccount(pagination, page) {
    let pageOnServer = arguments.length === 2 ? page : pagination.activePage;
    let itemsNumberOnPage = typeof pagination === "object" ? pagination.itemsNumberOnPage : pagination;
    
    return await app.request(`account/index/${pageOnServer}/${itemsNumberOnPage}`, 'POST',
        JSON.stringify({
            token: app.token,
            aud: app.aud,
            sortFilmTitle: filmsAccount.sortFilmTitle,
            sortFilmDescription: filmsAccount.sortFilmDescription
        }),
        {
            films: filmsAccount,
            pagination: paginationAccount
        }
    );
};

/**
 * Управляет взаимодействием с фильмами
 * @param {Object} modal
 * @returns {Function}
 */
function handlerFilms(modal) {
    return function(e) {
        if (e.target.className.toLowerCase().trim() === 'film-card') {
            renderFilmCard(e.target.getAttribute('data-film-id'));
        } else if (e.target.className.toLowerCase().trim() === 'removal-film') {
            showFilmRemoveModal(e.target, modal);
        } else {
            return;
        }
    };
};

/**
 * Отрисовывает страницу аккаунта
 * @returns {void}
 */
export async function pageAccount() {
    document.title = 'Личный кабинет';
    
    if (await requestAccount(paginationAccount)) {
        renderAccount();
    }
}
