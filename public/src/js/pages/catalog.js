import {basicUrl, app, filmsCatalog, paginationCatalog} from '../main.js';
import {paginationBlok, turnPage} from '../components/pagination.js';
import {getBreadcrumb} from '../components/breadcrumb.js';
import {request} from '../tools/request.js';
import {renderAllFilmsTable, addFilm} from './catalog/filmsTable.js';
import {getDropdown, changeElementsNumber} from '../components/dropdown.js';

// Получаем хлебные крошки
const breadcrumb = getBreadcrumb([{
                hash: '#',
                text: 'Главная страница'
            }, {
                text: 'Каталог'
            }]);

/**
 * Отрисовывает страницу каталога
 * @returns {void}
 */
function renderCatalog() {
    // Получаем узел для выбора числа элементов на странице
    const dropdown = getDropdown('Число фильмов на странице', [10, 20, 50, 100], 'dropdown-films', paginationCatalog);

    // Отрисовываем хлебные крошки
    let html = breadcrumb;
    // таблицу фильмов
    html += renderAllFilmsTable(dropdown);
    // блок пагинации
    html += paginationBlok(paginationCatalog);
    document.querySelector('#content-container').innerHTML = html;
    // Скрываем пагинацию, если нужно
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.hidden = paginationCatalog.isHiddenPagination();
    
    // Добавляем событие, которое добавляет фильм в список пользователя
    addFilm(document.getElementById('films-table'));
    // Обработка переключения страниц
    turnPage(paginationContainer, paginationCatalog , requestCatalog, renderCatalog);
    // Изменяет число элементов на странице
    changeElementsNumber(document.getElementById('dropdown-films'), requestCatalog, renderCatalog);
}

/**
 * Осуществляет запрос на сервер для получения списка фильмов и параметров пагинации
 * @param {Object|int} pagination
 * @param {int} page
 * @returns {void}
 */
const requestCatalog = async function(pagination, page) {
    let pageOnServer = arguments.length === 2 ? page : pagination.activePage;
    let itemsNumberOnPage = typeof pagination === "object" ? pagination.itemsNumberOnPage : pagination;
    
    // Запрос на сервер для получения списка фильмов и параметров пагинации
    await request(`${basicUrl}/film/${pageOnServer}/${itemsNumberOnPage}`, 'POST',
        JSON.stringify({
            token: app.token,
            aud: app.aud
        }),
        {
            films: filmsCatalog,
            pagination: paginationCatalog
        }
    );
    
};

/**
 * Отрисовывает страницу "Каталог" при переходе на неё в меню
 * @returns {void}
 */
export async function pageCatalog() {
    document.title = 'Каталог';
    await requestCatalog(paginationCatalog);
    renderCatalog();
}
