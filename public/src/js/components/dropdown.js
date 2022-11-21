import {spinner} from './spinner.js';

/**
 * Контент для отрисовки узла выбора числа элементов на странице
 * @param {String} buttonName
 * @param {Array} list
 * @param {String} selectorId
 * @returns {String}
 */
export function getDropdown(buttonName, list, selectorId, pagination) {
    let html = `
        <div id="${selectorId}" class="dropdown">
            <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                ${buttonName}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    `;
    
    list.forEach((item) => {
        let active = item === pagination.itemsNumberOnPage ? 'active' : '';
        html += `<li><span class="dropdown-item ${active}">${item}</span></li>`;
    });
    
    html += '</ul></div>';
    
    return html;
}

/**
 * Изменяет число элементов на странице
 * @param {object} container
 * @param {function} request
 * @param {function} render
 * @returns {void}
 */
export function changeElementsNumber(container, request, render) {
    function handlerChangeElementsNumber(request) {
        return async function(e) {
            let tag;
            if (e.target.className.toLowerCase().trim() === 'dropdown-item') {
                tag = e.target;
            } else {
                return;
            }
            
            document.querySelector('#content-container').innerHTML = spinner();
            // При смене числа элементов на странице - активная страница всегда первая
            await request(e.target.textContent, 1);
            render();
        };
    }
    
    container.addEventListener('click', handlerChangeElementsNumber(request));
}
