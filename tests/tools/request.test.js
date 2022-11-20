/**
 * @jest-environment jsdom
 */

//import {request} from '../../public/src/js/tools/request.js';
//import {paginationModel} from '../../public/src/js/models/paginationModel.js';
//
////import {app} from '../../public/src/js/main.js';
//const {app} = jest.createMockFromModule('../../public/src/js/main.js');
//
//const data = {
//    activePage: 2,
//    itemsNumberOnPage: 10,
//    itemsNumberTotal: 17,
//    pagesNumber: 2,
//    firstButton: 1,
//    lastButton: 2,
//    elementsNumberOnActivePage: 7
//};
//
//const pagination = paginationModel();
//
//describe('Проверка метода request для обновления пагинации', () => {
//    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify({pagination: data}))));
//    request('http://example', 'POST', null, {
//        pagination
//    });
//    
//    test('Сколько раз вызывался fetch? 1', () => {
//        expect(fetch).toHaveBeenCalledTimes(1);
//    });
//    
//    test('Активная страница: 2', () => {
//        expect(pagination.activePage).toBe(2);
//    });
//    test('Число элементов на странице: 10', () => {
//        expect(pagination.itemsNumberOnPage).toBe(10);
//    });
//    test('Общее число элементов в списке: 17', () => {
//        expect(pagination.itemsNumberTotal).toBe(17);
//    });
//    test('Число страниц в списке: 2', () => {
//        expect(pagination.pagesNumber).toBe(2);
//    });
//    test('Номер первой кнопки: 1', () => {
//        expect(pagination.firstButton).toBe(1);
//    });
//    test('Номер последней кнопки: 2', () => {
//        expect(pagination.lastButton).toBe(2);
//    });
//    test('Число элементов на активной странице: 7', () => {
//        expect(pagination.elementsNumberOnActivePage).toBe(7);
//    });
//    test('Номер страницы, который будет отдан на сервер после удаления фильма: 2', () => {
//        expect(pagination.getPageAfterRemoveFilm()).toBe(2);
//    });
//    test('Нужно ли скрыть пагинацию? Нет', () => {
//        expect(pagination.isHiddenPagination()).not.toBeTruthy();
//    });
//});
