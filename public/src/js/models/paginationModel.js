export function paginationModel() {
    let activePage = 0;
    let itemsNumberOnPage = 0;
    let itemsNumberTotal;
    let pagesNumber;
    let firstButton;
    let lastButton;
    let elementsNumberOnActivePage;

    /**
     * 
     * @param {type} data
     * @returns {undefined}
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
//        // Номер страницы, который будет отдан на сервер при удалении одного фильма
//        // Вначале всегда равен номеру активной странице
//        let page = this.activePage;
//        // Сохраняем число элементов на последней странице
//        let elementsNumber = this.elementsNumberOnActivePage;
//        // Если удалялся фильм на последней странице (активная страница - последняя страница), то уменьшаем число фильмов на активной странице на 1
//        if (page * this.itemsNumberOnPage >= this.itemsNumberTotal) {
//            elementsNumber--;
//        }
//        // Если удалялся фильм на последней странице и на ней после удаления не остаётся фильмов (до удаления был 1 фильм),
//        // то уменьшаем на 1 номер страницы, который будет отдан на сервер
//        if (elementsNumber === 0) {
//            page--;
//        }
//        
        return this.elementsNumberOnActivePage - 1 ? this.activePage : this.activePage - 1;
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
        getPageAfterRemoveFilm
    };
}
