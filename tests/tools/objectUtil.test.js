/**
 * @jest-environment jsdom
 */

import {objectUtil} from '../../public/src/js/tools/objectUtil.js';
import {filmsModel} from '../../public/src/js/models/filmsModel.js';

describe('Проверка обновления фильтров', () => {
    const films = filmsModel();
    const oU = objectUtil();
    
    document.body.innerHTML = `
        <div>
            <input type="text" id="sort-film-title">
            <input type="text" id="sort-film-description">
        </div>`;
    
    const sortFilmTitle = document.getElementById('sort-film-title');
    const sortFilmDescription = document.getElementById('sort-film-description');
    
    test('Проверка изменения фильтра по названию фильмов', () => {
        // Вешаем событие
        oU.sortInput(sortFilmTitle, films, 'setSortFilmTitle');
        // Создаем событие input
        const inputEvent = new Event('input');
        // Изменяем значения текстового поля
        sortFilmTitle.value = '123';
        // Вызываем событие input
        sortFilmTitle.dispatchEvent(inputEvent);
        // Проверяем результат
        expect(films.sortFilmTitle).toBe('123');
        // Тоже самое ещё один раз
        sortFilmTitle.value = 'абвгд';
        sortFilmTitle.dispatchEvent(inputEvent);
        expect(films.sortFilmTitle).toBe('абвгд');
    });
    
    test('Проверка изменения фильтра по описанию фильмов', () => {
        oU.sortInput(sortFilmDescription, films, 'setSortFilmDescription');
        sortFilmDescription.value = 'qqqq';
        sortFilmDescription.dispatchEvent(new Event('input'));
        expect(films.sortFilmDescription).toBe('qqqq');
    });
});
