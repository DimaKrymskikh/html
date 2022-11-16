import {basicUrl, app, contentContainer, user, filmsAccount, paginationAccount} from '../main.js';
import {paginationBlok, turnPage} from '../components/pagination.js';
import {getBreadcrumb} from '../components/breadcrumb.js';
import {request} from '../tools/request.js';
import {renderFilmCard} from './filmCard.js';
import {renderPersonalFilmsTable} from './account/filmsTable.js';
import {renderFilmRemoveModal, showFilmRemoveModal, handlerRemoveFilm} from './account/filmRemoveModal.js';
import {renderAccountRemoveButton, renderAccountRemoveModal, showAccountRemoveModal, handlerAccountRemove} from './account/accountDeletionModal.js';

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
    
    if (paginationAccount.itemsNumberTotal) {
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

function renderAccount() {
    let html = content();
    html += paginationBlok(paginationAccount);
    contentContainer.innerHTML = html;
    
    // Создаем экземпляр модального окна для удаления фильма
    const filmRemoveModal = new bootstrap.Modal('#film-remove-modal');
    // Создаем экземпляр модального окна для удаления аккаунта
    const accountRemoveModal = new bootstrap.Modal('#account-remove-modal');
    
    // Если на странице имеются фильмы, то на таблицу фильмов вешаем обработчик взаимодействия с фильмами
    if (paginationAccount.itemsNumberTotal) {
        document.getElementById('personal-films-table').addEventListener('click', handlerFilms(filmRemoveModal));
    }
    // Обработка переключения страниц
    turnPage(document.querySelector('.pagination-container'), paginationAccount, requestAccount, renderAccount);
    
    // На кнопку 'Да' модального окна для удаления фильма вешаем обработчик, удаляющий фильм
    document.getElementById('remove-film-button').addEventListener('click', handlerRemoveFilm(filmRemoveModal, requestAccount, renderAccount));
    
    // На кнопку 'Да' модального окна для удаления аккаунта вешаем обработчик, удаляющий аккаунт
    document.getElementById('account-remove-button').addEventListener('click', handlerAccountRemove(accountRemoveModal));
    // На кнопку "Удалить" (удалить аккаунт) вешаем обработчик, который открывает модальное окно для удаления аккаунта
    document.getElementById('account-show-button').addEventListener('click', showAccountRemoveModal(accountRemoveModal));
}

async function requestAccount(pagination, page) {
    let pageOnServer = arguments.length === 2 ? page : pagination.activePage;
    
    await request(`${basicUrl}/account/index/${pageOnServer}/${pagination.itemsNumberOnPage}`, 'POST',
        JSON.stringify({
            token: app.token,
            aud: app.aud
        }),
        {
            films: filmsAccount,
            pagination: paginationAccount
        }
    );
};

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

export async function pageAccount() {
    document.title = 'Личный кабинет';
    
    await requestAccount(paginationAccount);
    renderAccount();
}
