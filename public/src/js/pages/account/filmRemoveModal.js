import {basicUrl, app, paginationAccount} from '../../main.js';
import {request} from '../../tools/request.js';
import {getFillingErrors} from '../../components/fillingErrors.js';

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
                                <input type="password" class="form-control" id="film-remove-password"/>
                            </label>
                        </div>
                        <div id="film-remove-modal-errors" class="list-group" hidden></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Нет</button>
                        <button 
                            type="button" id="remove-film-button" class="btn btn-danger"
                        >
                            <span class="spinner-border spinner-border-sm" role="status"></span>
                            <span id="remove-film-yes"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function requestGetFilm(filmId) {
    return  await request(`${basicUrl}/account/getFilm/${filmId}`, 'POST',
        JSON.stringify({
            token: app.token,
            aud: app.aud
        })
    );
};

async function requestRemoveFilm(filmId) {
    return  await request(`${basicUrl}/userFilm/${filmId}`, 'DELETE',
        JSON.stringify({
            token: app.token,
            aud: app.aud,
            password: document.getElementById('film-remove-password').value
        })
    );
}

export function handlerRemoveFilm(modal, request, render) {
    return async function(e) {
        e.stopPropagation();

        const result = await requestRemoveFilm(e.currentTarget.getAttribute('data-film-id'));
        if (result.errors.length === 0) {
            modal.hide();
            await request(paginationAccount, paginationAccount.getPageAfterRemoveFilm());
            render();
        } else {
            document.getElementById('film-remove-password').value = '';
            const filmRemoveModalErrors = document.getElementById('film-remove-modal-errors');
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
    const spinnerBorder = document.querySelectorAll('.spinner-border');
    const removeFilmName = document.getElementById('remove-film-name');
    const removeFilmYes = document.getElementById('remove-film-yes');
    const removeFilmButton = document.getElementById('remove-film-button');

    // Очищаем данные модального окна:
    // пароль
    document.getElementById('film-remove-password').value = '';
    // сообщение об ошибке
    const filmRemoveModalErrors = document.getElementById('film-remove-modal-errors');
    filmRemoveModalErrors.hidden = true;
    filmRemoveModalErrors.innerHTML = '';
    // имя фильма
    removeFilmName.innerHTML = '';
    // слово "Да" на кнопке
    removeFilmYes.innerHTML = '';
    // Запускаем спинер
    Array.from(spinnerBorder).forEach( (item) => {
        item.classList.remove('visually-hidden');
    });

    // Отправляем запрос для получения данных фильма
    const result = await requestGetFilm(tag.getAttribute('data-film-id'));

    // Убираем спинеры
    Array.from(spinnerBorder).forEach( (item) => {
        item.classList.add('visually-hidden');
    });
    // добавляем полученые данные 
    removeFilmName.innerHTML = result.title;
    removeFilmYes.innerHTML = 'Да';
    removeFilmButton.setAttribute('data-film-id', result.id);
}
