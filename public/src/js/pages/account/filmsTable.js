import {filmsAccount, paginationAccount} from '../../main.js';

/**
 * Отрисовывает в ЛК таблицу с фильмами пользователя
 * @returns {String}
 */
export function renderPersonalFilmsTable() {
    let html = `
        <div class="table-responsive">
            <table id="personal-films-table" class="table table-striped table-hover  caption-top table-bordered">
                <caption>Показано ${paginationAccount.elementsNumberOnActivePage} фильмов из ${paginationAccount.itemsNumberTotal}</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Язык</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    filmsAccount.films.forEach( (item) => {
        html += `<tr>
                    <th scope="row">${item.n}</th>
                    <td>${item.title}</td>
                    <td>${item.description}</td>
                    <td>${item.name}</td>
                    <td>
                        <img class="film-card"
                            data-film-id="${item.id}"
                            src="src/svg/eye.svg"
                            alt="Карточка фильма"
                            title="Карточка фильма">
                    </td>
                    <td>
                        <img class="removal-film"
                            data-film-id="${item.id}"
                            src="src/svg/trash.svg"
                            alt="Удаление фильма"
                            title="Удаление фильма">
                    </td>
                </tr>`;
    });
    
    html += `</tbody></table></div>`;
    
    return html;
}

