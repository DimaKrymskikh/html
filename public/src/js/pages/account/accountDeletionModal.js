import {basicUrl} from '../../domain.js';
import {app, user, alertAuthorization} from '../../main.js';
import {pageHome} from '../home.js';
import {request} from '../../tools/request.js';
import {getFillingErrors} from '../../components/fillingErrors.js';

export function renderAccountRemoveButton() {
    return `
        <p>
            <button id="account-show-button" type="button" class="btn btn-danger" title="Удалить аккаунт">
                Удалить
            </button>
        </p>`;
}

export function renderAccountRemoveModal() {
    return `
        <div class="modal fade" id="account-remove-modal" tabindex="-1" aria-labelledby="modal-user-delete" aria-hidden="true">
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
                                <input type="password" class="form-control" id="account-remove-password"/>
                            </label>
                        </div>
                        <div id="account-remove-modal-errors" class="list-group" hidden></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Нет</button>
                        <button type="button" id="account-remove-button" class="btn btn-danger">Да</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function showAccountRemoveModal(modal) {
    return function() {
        modal.show();
        document.getElementById('account-remove-password').value = '';
        const accountRemoveModalErrors = document.getElementById('account-remove-modal-errors');
        accountRemoveModalErrors.hidden = true;
        accountRemoveModalErrors.innerHTML = '';
    };
}

export function handlerAccountRemove(modal) {
    return async function() {
        const result = await request(`${basicUrl}/account`, 'DELETE',
            JSON.stringify({
                password: document.getElementById('account-remove-password').value,
                token: app.token,
                aud: app.aud
            }),
            {app}
        );

        if (result.errors.length === 0) {
            modal.hide();
            alertAuthorization.hidden = true;
            pageHome();
            user = null;
        } else {
            document.getElementById('account-remove-password').value = '';
            const accountRemoveModalErrors = document.getElementById('account-remove-modal-errors');
            accountRemoveModalErrors.hidden = false;
            accountRemoveModalErrors.innerHTML = getFillingErrors(result.errors);
        }
    };
}