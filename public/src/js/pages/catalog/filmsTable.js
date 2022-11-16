import {basicUrl, app, filmsCatalog, paginationCatalog} from '../../main.js';
import {request} from '../../tools/request.js';

/**
 * Отрисовывает на странице "Каталог" таблицу всех фильмов
 * @returns {String}
 */
export function renderAllFilmsTable() {
    let html = `
        <h1>Список всех фильмов</h1>
        <table id="films-table" class="table table-striped table-hover  caption-top table-bordered">
            <caption>Показано ${paginationCatalog.elementsNumberOnActivePage} фильмов из ${paginationCatalog.itemsNumberTotal}</caption>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Язык</th>`;
    
    if(!app.isGuest) {
        html += `<th scope="col"></th>`;
    }
    
    html += `</tr></thead>
            <tbody>`;
  
    filmsCatalog.films.forEach( item => {
        html += `<tr>
                    <th scope="row">${item.n}</th>
                    <td>${item.title}</td>
                    <td>${item.description}</td>
                    <td>${item.name}</td>`;
        if(!app.isGuest) {
            html += `<td>`;
            if (item.isAvailable) {
                html += `<img src="src/svg/check-circle.svg" alt="Домашняя страница" data-film-id="${item.id}">`;
            } else {
                html += `<img src="src/svg/plus-circle.svg" alt="Домашняя страница" data-film-id="${item.id}">`;
            }
            html += `</td>`;
        }
        html += `</tr>`;
    });
    
    html += `</tbody></table>`;
    
    return html;
}

/**
 * По клику добавляет фильм в список пользователя
 * Меняется иконка в колонке (плюс меняется на галочку)
 * @param {Element} container - Элемент, на который делегируется событие (<table id="films-table">)
 * @returns {void}
 */
export function addFilm(container) {
    // Запрос на сервер для добавления фильма в таблицу person.users_films
    async function requestAddFilm(filmId) {
        return await request(`${basicUrl}/userFilm/${filmId}`, 'POST',
            JSON.stringify({
                token: app.token,
                aud: app.aud
            })
        );
    }
    // Обработка клика по картинке 'plus-circle.svg'
    function handlerAddFilm(e) {
        let tag;
        // Клик должен быть по картинке 'plus-circle.svg'
        if (e.target.hasAttribute('src') && e.target.getAttribute('src').toLowerCase().trim() === 'src/svg/plus-circle.svg') {
            tag = e.target;
        } else {
            return;
        }
        // При неудачнм ответе завершаем функцию
        if (!requestAddFilm(tag.getAttribute('data-film-id'))) {
            return;
        }
        // Меняем плюс на галочку
        tag.setAttribute('src', 'src/svg/check-circle.svg');
    }
    // Обработчик клика по картинке 'plus-circle.svg' (Событие делегируется на <table id="films-table">)
    container.addEventListener('click', handlerAddFilm);
}
