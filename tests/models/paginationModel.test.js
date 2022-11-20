import {paginationModel} from '../../public/src/js/models/paginationModel.js';

const data = {
    activePage: 2,
    itemsNumberOnPage: 10,
    itemsNumberTotal: 17,
    pagesNumber: 2,
    firstButton: 1,
    lastButton: 2,
    elementsNumberOnActivePage: 7
};

const data2 = {
    activePage: 2,
    itemsNumberOnPage: 10,
    itemsNumberTotal: 11,
    pagesNumber: 2,
    firstButton: 1,
    lastButton: 2,
    elementsNumberOnActivePage: 1
};

const dataNull = {
    activePage: 0,
    itemsNumberOnPage: 0,
    itemsNumberTotal: 0,
    pagesNumber: 0,
    firstButton: 0,
    lastButton: 0,
    elementsNumberOnActivePage: 0
};

/**
 * При начальной иннициализации определены два свойства пагинации
 */
describe('Проверка начальной пагинации', () => {
    const pagination = paginationModel();
    test('Активная страница: 0', () => {
        expect(pagination.activePage).toBe(0);
    });
    test('Число элементов на странице: 0', () => {
        expect(pagination.itemsNumberOnPage).toBe(0);
    });
});

describe('Обновление всех свойств пагинации', () => {
    const pagination = paginationModel();
    pagination.setData(data);
    
    test('Активная страница: 2', () => {
        expect(pagination.activePage).toBe(2);
    });
    test('Число элементов на странице: 10', () => {
        expect(pagination.itemsNumberOnPage).toBe(10);
    });
    test('Общее число элементов в списке: 17', () => {
        expect(pagination.itemsNumberTotal).toBe(17);
    });
    test('Число страниц в списке: 2', () => {
        expect(pagination.pagesNumber).toBe(2);
    });
    test('Номер первой кнопки: 1', () => {
        expect(pagination.firstButton).toBe(1);
    });
    test('Номер последней кнопки: 2', () => {
        expect(pagination.lastButton).toBe(2);
    });
    test('Число элементов на активной странице: 7', () => {
        expect(pagination.elementsNumberOnActivePage).toBe(7);
    });
    test('Номер страницы, который будет отдан на сервер после удаления фильма: 2', () => {
        expect(pagination.getPageAfterRemoveFilm()).toBe(2);
    });
    test('Нужно ли скрыть пагинацию? Нет', () => {
        expect(pagination.isHiddenPagination()).not.toBeTruthy();
    });
});

describe('Пример пагинации, которую нужно скрыть', () => {
    const pagination = paginationModel();
    pagination.setData(dataNull);
    test('Нужно ли скрыть пагинацию? Да', () => {
        expect(pagination.isHiddenPagination()).toBeTruthy();
    });
});

describe('Пример пагинации, у которой уменьшается активная страница при удалении элемента из списка', () => {
    const pagination = paginationModel();
    pagination.setData(data2);
    test('Активная страница: 2', () => {
        expect(pagination.activePage).toBe(2);
    });
    test('Номер страницы, который будет отдан на сервер после удаления фильма: 1', () => {
        expect(pagination.getPageAfterRemoveFilm()).toBe(1);
    });
});
