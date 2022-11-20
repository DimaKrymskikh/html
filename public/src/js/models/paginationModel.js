/**
 * Модуль для хранения свойств пагинации
 * @returns {Object}
 */
export function paginationModel() {
    // Активная страница
    let activePage = 0;
    // Число элементов на странице
    let itemsNumberOnPage = 0;
    // Общее число элементов в списке
    let itemsNumberTotal;
    // Число страниц в списке
    let pagesNumber;
    // Номер первой кнопки 
    let firstButton;
    // Номер последней кнопки 
    let lastButton;
    // Число элементов на активной странице
    // Если активная страница - последняя страница, то elementsNumberOnActivePage может быть меньше itemsNumberOnPage
    let elementsNumberOnActivePage;

    /**
     * Изменяет свойства пагинации
     * (Данные приходят с сервера, где реализуется логика вычисления свойств пагинации)
     * @param {Object} data - Новые свойства пагинации
     * @returns {void}
     */
    const setData = function(data) {
        for (let field in data) {
            if (!this.hasOwnProperty(field)) {
                continue;
            }
            this[field] = data[field];
        }
    };
    
    /**
     * Возвращает номер страницы, который будет отдан на сервер после удаления фильма
     * @returns {int}
     */
    const getPageAfterRemoveFilm = function() {
        return this.elementsNumberOnActivePage - 1 ? this.activePage : this.activePage - 1;
    };

    /**
     * Если нет элементов в списке, то возвращает true, чтобы скрыть пагинацию на странице
     * @returns {Boolean}
     */
    const isHiddenPagination = function() {
        return !this.itemsNumberTotal;
    };
    
    return {
        activePage,
        itemsNumberOnPage,
        itemsNumberTotal,
        pagesNumber,
        firstButton,
        lastButton,
        elementsNumberOnActivePage,
        setData,
        getPageAfterRemoveFilm,
        isHiddenPagination
    };
}
