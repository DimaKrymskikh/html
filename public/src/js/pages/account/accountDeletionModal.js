import {basicUrl, app, user} from '../../main.js';
import {pageHome} from '../home.js';
import {request} from '../../tools/request.js';
import {getFillingErrors} from '../../components/fillingErrors.js';
import {spinner} from '../../components/spinner.js';
import {objectUtil} from '../../tools/objectUtil.js';

// Получаем доступ к полезным методам
const oU = objectUtil();

export function renderAccountRemoveButton() {
    return `
        <p>
            <button id="show-account-button" type="button" class="btn btn-danger" title="Удалить аккаунт">
                Удалить
            </button>
        </p>`;
}

export function renderAccountRemoveModal() {
    return `
        <div class="modal fade" id="remove-account-modal" tabindex="-1" aria-labelledby="modal-user-delete" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Подтверждение удаления аккаунта</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Вы действительно хотите удалить свой аккаунт?
                        <div class="mb-3">
                            <label class="form-label">Введите пароль: 
                                <span class="spinner-border spinner-border-sm visually-hidden" role="status"></span>
                                <input type="password" class="form-control" id="remove-account-password"/>
                            </label>
                        </div>
                        <div id="remove-account-modal-errors" class="list-group" hidden></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Нет</button>
                        <button type="button" id="remove-account-button" class="btn btn-danger">
                            <span class="spinner-border spinner-border-sm visually-hidden" role="status"></span>
                            <span id="remove-account-yes">Да</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Показывает модальное окно для удаления аккаунта пользователя
 * @param {Modal} modal
 * @returns {Function}
 */
export function showAccountRemoveModal(modal) {
    return function() {
        modal.show();
        // Очищаем поле для пароля
        document.getElementById('remove-account-password').value = '';
        // Стираем сообщение об ошибке
        const removeAccountModalErrors = document.getElementById('remove-account-modal-errors');
        removeAccountModalErrors.hidden = true;
        removeAccountModalErrors.innerHTML = '';
    };
}

/**
 * Удаляет аккаунт пользователя
 * @param {Modal} modal
 * @returns {Function}
 */
export function handlerAccountRemove(modal) {
    return async function() {
        const removeAccountPassword = document.getElementById('remove-account-password');
        const removeAccountYes = document.getElementById('remove-account-yes');
        const removeAccountModalErrors = document.getElementById('remove-account-modal-errors');
        // Запускаем спеннеры вместо элементов
        oU.showSpinner(removeAccountPassword);
        oU.showSpinner(removeAccountYes);
        // Стираем сообщение об ошибке
        removeAccountModalErrors.hidden = true;
        removeAccountModalErrors.innerHTML = '';
        
        // Запрос на удаление аккаунта
        const result = await request(`${basicUrl}/account`, 'DELETE',
            JSON.stringify({
                password: document.getElementById('remove-account-password').value,
                token: app.token,
                aud: app.aud
            }),
            {app, user}
        );

        if (result.errors.length === 0) {
            // Если пароль введён правильно, то закрываем модальное окно
            modal.hide();
            // Стираем страницу аккаунта и запускаем большой спиннер
            document.querySelector('#content-container').innerHTML = spinner();
            // Показываем запись неаутифицированного пользователя
            document.querySelector('#alert-authorization').hidden = true;
            // Переходим на главную страницу
            pageHome();
        } else {
            // Если указан неверный пароль, то очищаем поле для пароля
            removeAccountPassword.value = '';
            // Отрисовываем сообщение об ошибке
            removeAccountModalErrors.hidden = false;
            removeAccountModalErrors.innerHTML = getFillingErrors(result.errors);
            // Скрываем спиннеры, показываем элементы
            oU.hideSpinner(removeAccountPassword);
            oU.hideSpinner(removeAccountYes);
        }
    };
}
