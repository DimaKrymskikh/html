import {spinner} from '../components/spinner.js';

/**
 * Делает запрос на сервер с изменённым фильтром и обновляет список фильмов и пагинацию
 * @param {HTMLInputElement} tag - Узел, в который вводится фильтр
 * @param {Object} pagination
 * @param {Function} request
 * @param {Function} render
 * @returns {void}
 */
export function putFilms(tag, pagination, request, render) {
    async function handlerPutFilms(e) {
        if(e.key.toLowerCase() !== "enter") {
            return;
        }
         
        document.querySelector('#content-container').innerHTML = spinner();
        // Активная страница в запросе должна быть 1, чтобы избежать получения пустого списка,
        // если фильтр уменьшает число фильмов так, что число страниц станет меньше текущей активной страницы
        if (await request(pagination, 1)) {
            render();
        }
    }
    
    tag.addEventListener('keyup', handlerPutFilms);
}
