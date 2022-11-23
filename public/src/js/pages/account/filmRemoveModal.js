import {basicUrl, app, paginationAccount} from '../../main.js';
import {request} from '../../tools/request.js';
import {getFillingErrors} from '../../components/fillingErrors.js';
import {spinner} from '../../components/spinner.js';
import {objectUtil} from '../../tools/objectUtil.js';

// Получаем доступ к полезным методам
const oU = objectUtil();

export function renderFilmRemoveModal() {
    return `
        <div class="modal fade" id="film-remove-modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Подтверждение удаления фильма</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        Вы действительно хотите удалить фильм 
                        <span class="spinner-border spinner-border-sm"></span>
                        <span id="remove-film-name"></span>?
                        <div class="mb-3">
                            <label class="form-label">Введите пароль: 
                                <span class="spinner-border spinner-border-sm"></span>
                                <input type="password" class="form-control" id="remove-film-password"/>
                            </label>
                        </div>
                        <div id="remove-film-modal-errors" class="list-group" hidden></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Нет</button>
                        <button 
                            type="button" id="remove-film-button" class="btn btn-danger"
                        >
                            <span class="spinner-border spinner-border-sm" role="status"></span>
                            <span id="remove-film-yes">Да</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * По id фильма возвращает данные о фильме для модального окна, удаляющего фильм из аккаунта пользователя
 * @param {int} filmId
 * @returns {Object}
 */
async function requestGetFilm(filmId) {
    return  await request(`${basicUrl}/account/getFilm/${filmId}`, 'POST',
        JSON.stringify({
            token: app.token,
            aud: app.aud
        })
    );
};

/**
 * Отправляет запрос на удаление фильма с id = filmId
 * Возвращает объект с массивом ошибок 
 * @param {int} filmId
 * @returns {Object}
 */
async function requestRemoveFilm(filmId) {
    return  await request(`${basicUrl}/userFilm/${filmId}`, 'DELETE',
        JSON.stringify({
            token: app.token,
            aud: app.aud,
            password: document.getElementById('remove-film-password').value
        })
    );
}

/**
 * Обработчик удаления фильма
 * @param {Object} modal
 * @param {Function} request
 * @param {Function} render
 * @returns {Function}
 */
export function handlerRemoveFilm(modal, request, render) {
    return async function(e) {
        e.stopPropagation();
        // Получаем нужные элементы
        const filmRemovePassword = document.getElementById('remove-film-password');
        const removeFilmYes = document.getElementById('remove-film-yes');
        const filmRemoveModalErrors = document.getElementById('remove-film-modal-errors');
        // Запускаем спиннеры вместо элементов
        oU.showSpinner(filmRemovePassword);
        oU.showSpinner(removeFilmYes);
        // Скрываем сообщение об ошибке
        filmRemoveModalErrors.hidden = true;

        const result = await requestRemoveFilm(e.currentTarget.getAttribute('data-film-id'));
        if (result.errors.length === 0) {
            // Если пароль был введён правильно, то скрываем модальное окно
            modal.hide();
            // Стираем страницу аккаунта и запускаем большой спиннер
            document.querySelector('#content-container').innerHTML = spinner();
            // Отправляем запрос на обновление страницы аккаунта
            await request(paginationAccount, paginationAccount.getPageAfterRemoveFilm());
            // Отрисовываем страницу аккаунта
            render();
        } else {
            // Если был введён неверный пароль, то очищаем поле ввода пароля
            filmRemovePassword.value = '';
            // Убираем спиннеры и показываем элементы
            oU.hideSpinner(filmRemovePassword);
            oU.hideSpinner(removeFilmYes);
            // Отрисовываем сообщение об ошибке
            filmRemoveModalErrors.hidden = false;
            filmRemoveModalErrors.innerHTML = getFillingErrors(result.errors);
        }
    };
}

/**
 * Открытие модального окна для удаления фильма
 * @param {HTMLImageElement} tag - Элемент по которому кликнули
 * @returns {void}
 */
export async function showFilmRemoveModal(tag, modal) {
    modal.show();
    // Получаем нужные элементы модального окна
    const removeFilmName = document.getElementById('remove-film-name');
    const removeFilmYes = document.getElementById('remove-film-yes');
    const removeFilmPassword = document.getElementById('remove-film-password');
    const removeFilmModalErrors = document.getElementById('remove-film-modal-errors');

    // Очищаем данные модального окна:
    // пароль
    removeFilmPassword.value = '';
    // сообщение об ошибке
    removeFilmModalErrors.hidden = true;
    removeFilmModalErrors.innerHTML = '';
    // имя фильма
    removeFilmName.innerHTML = '';
    // Запускаем спиннеры вместо элементов
    oU.showSpinner(removeFilmName);
    oU.showSpinner(removeFilmYes);
    oU.showSpinner(removeFilmPassword);

    // Отправляем запрос для получения данных фильма
    const result = await requestGetFilm(tag.getAttribute('data-film-id'));

    // Убираем спиннеры и показываем элементы
    oU.hideSpinner(removeFilmName);
    oU.hideSpinner(removeFilmYes);
    oU.hideSpinner(removeFilmPassword);
    
    // Показываем поле ввода пароля
    removeFilmPassword.hidden = false;
    // добавляем полученые данные 
    removeFilmName.innerHTML = result.title;
    document.getElementById('remove-film-button').setAttribute('data-film-id', result.id);
}
