
export function renderAccountDeletionModal() {
    return `
        <div class="modal fade" id="account-delete-modal" tabindex="-1" aria-labelledby="modal-user-delete" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Подтверждение удаления аккаунта</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Вы действительно хотите удалить свой аккаунт?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Нет</button>
                        <button type="button" id="user-delete" class="btn btn-danger">Да</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
