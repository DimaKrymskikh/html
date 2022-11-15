/**
 * Большой спиннер, который нужно применять при обновлении страниц
 * @returns {String}
 */
export function spinner() {
    return `
        <div class="d-flex justify-content-center">
            <div class="spinner-border m-5" role="status" style="width: 10rem; height: 10rem"></div>
        </div>`;
}
