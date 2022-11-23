/**
 * У объекта ob обновляет свойство при помощи метода method
 * @param {HTMLInputElement} tag - Узел для ввода нового значения свойства
 * @param {Object} ob - Объект, который изменяется
 * @param {String} method - Имя метода объекта, который изменяет его свойство
 * @returns {void}
 */
export function sortInput(tag, ob, method) {
    function handlerSortInput(e) {
        ob[method](e.target.value);
    }
    
    tag.addEventListener('input', handlerSortInput);
}
