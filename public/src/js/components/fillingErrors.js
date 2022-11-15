/**
 * Возвращает список ошибок при заполнении формы
 * @param {Array} errors - Массив строк ошибок, полученных с сервера
 * @returns {String}
 */
export function getFillingErrors(errors) {
    let errHtml ='';
    for (let i in errors) {
        errHtml += `<p class="list-group-item list-group-item-action list-group-item-danger">${errors[i]}</p>`;
    };
    return errHtml;
}
