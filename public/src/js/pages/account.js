import {basicUrl} from '../domain.js';
import {app, contentContainer, user, filmsAccount, paginationAccount} from '../main.js';
import {paginationBlok, turnPage} from '../components/pagination.js';
import {getBreadcrumb} from '../components/breadcrumb.js';
import {request} from '../tools/request.js';
import {renderFilmCard} from './filmCard.js';
import {renderPersonalFilmsTable} from './account/filmsTable.js';
import {renderFilmRemoveModal, showFilmRemoveModal} from './account/filmRemoveModal.js';
import {renderAccountDeletionModal} from './account/accountDeletionModal.js';

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
    
     htmlContent += `
        <p>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#account-delete-modal" title="Удалить аккаунт">
                Удалить
            </button>
        </p>`;
    
    // Закрываем <div id="personalArea">
    htmlContent += `</div>`;
    
    htmlContent += renderAccountDeletionModal();
    htmlContent += renderFilmRemoveModal();
    
    return htmlContent;
};

function renderAccount() {
    let html = content();
    html += paginationBlok(paginationAccount);
    contentContainer.innerHTML = html;
    
    // Если на странице имеются фильмы, то на таблицу фильмов вешаем обработчик взаимодействия с фильмами
    if (paginationAccount.itemsNumberTotal) {
        document.getElementById('personal-films-table').addEventListener('click', handlerFilms(requestAccount, renderAccount));
    }
    // Обработка переключения страниц
    turnPage(document.querySelector('.pagination-container'), paginationAccount, requestAccount, renderAccount);
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

function handlerFilms(request, render) {
    return function(e) {
        if (e.target.className.toLowerCase().trim() === 'film-card') {
            renderFilmCard(e.target.getAttribute('data-film-id'));
        } else if (e.target.className.toLowerCase().trim() === 'removal-film') {
            showFilmRemoveModal(e.target, request, render);
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
