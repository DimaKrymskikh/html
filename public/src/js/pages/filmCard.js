import {basicUrl, app} from '../main.js';
import {getBreadcrumb} from '../components/breadcrumb.js';
import {filmModel} from '../models/filmModel.js';
import {request} from '../tools/request.js';
import {spinner} from '../components/spinner.js';

const film = filmModel();
const contentContainer = document.querySelector('#content-container');

// Хлебные крошки для карточки фильма
const breadcrumb = getBreadcrumb([{
                hash: '#',
                text: 'Главная страница'
            }, {
                hash: '#account',
                text: 'Личный кабинет'
            }, {
                text: 'Карточка фильма'
            }]);

/**
 * Контент карточки фильма
 * @param {Object} film
 * @returns {Window.html|String}
 */
function content(film) {
    
    let html = `
        ${breadcrumb}
        
        <h1>${film.title}</h1>

        <div class="row">
            <div class="col">
                <h4>Основная информация</h4>
            </div>
            <div class="col">
                <h4>Описание</h4>
            </div>
            <div class="col">
                <h4>Актёры</h4>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div>Фильм вышел в ${film.releaseYear} году</div>
                <div>Язык фильма: ${film.language}</div>
            </div>
            <div class="col">
                <div>${film.description}</div>
            </div>
            <div class="col">`;
    
    film.actorNames.forEach ( (item) => {
        html += `<div>${item}</div>`;
    });
    
    html += `</div></div>`;
    
    return html;
}

/**
 * Запрос на получение данных фильма с id = filmId
 * @param {int} filmId
 * @returns {Object|Boolean}
 */
async function requestFilmCard(filmId) {
    contentContainer.innerHTML = spinner();
    return await request(`${basicUrl}/account/filmCard/${filmId}`, 'POST',
        JSON.stringify({
            token: app.token,
            aud: app.aud
        }),
        {film}
    );
};

/**
 * Отрисовка карточки фильма
 * @param {type} filmId
 * @returns {void}
 */
export async function renderFilmCard(filmId) {
    if (await requestFilmCard(filmId)) {
        document.title = `Фильм: ${film.title}`;
        contentContainer.innerHTML = content(film);
    }
}
