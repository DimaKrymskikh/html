/**
 * Возвращает объект полезных свойств
 * @returns {Object}
 */
export function objectUtil() {
    /**
     * У объекта ob обновляет свойство при помощи метода method
     * @param {HTMLInputElement} tag - Узел для ввода нового значения свойства
     * @param {Object} ob - Объект, который изменяется
     * @param {String} method - Имя метода объекта, который изменяет его свойство
     * @returns {void}
     */
    function sortInput(tag, ob, method) {
        function handlerSortInput(e) {
            ob[method](e.target.value);
        }

        tag.addEventListener('input', handlerSortInput);
    }
    
    /**
     * Скрывает элемент tag и запускает спиннер
     * У tag и спиннера должен быть общий родитель
     * @param {HTMLElement} tag
     * @returns {void}
     */
    function showSpinner(tag) {
        tag.parentNode.querySelector('.spinner-border').classList.remove('visually-hidden');
        tag.hidden = true;
    }
    
    
    /**
     * Показывает элемент tag и убирает спиннер
     * У tag и спиннера должен быть общий родитель
     * @param {HTMLElement} tag
     * @returns {void}
     */
    function hideSpinner(tag) {
        tag.parentNode.querySelector('.spinner-border').classList.add('visually-hidden');
        tag.hidden = false;
    }
    
    return {
        sortInput,
        showSpinner,
        hideSpinner
    };
}
