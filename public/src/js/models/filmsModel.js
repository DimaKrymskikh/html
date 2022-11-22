/**
 * Модель для хранения списка фильмов
 * @returns {Object}
 */
export function filmsModel() {
    // Массив объектов (список фильмов), свойства которых определяет сервер
    let films = [];
    // Фильтр по названию фильма
    let sortFilmTitle = '';
    // Фильтр по описанию фильма
    let sortFilmDescription = '';
    // Обновляет список фильмов
    const setData = function(data) {
        this.films = data;
    };
    // Изменяет фильтр по названию фильма
    const setSortFilmTitle = function(text) {
        this.sortFilmTitle = text;
    };
    // Изменяет фильтр по описанию фильма
    const setSortFilmDescription = function(text) {
        this.sortFilmDescription = text;
    };
    
    return {
        films,
        sortFilmTitle,
        sortFilmDescription,
        setSortFilmTitle,
        setSortFilmDescription,
        setData
    };
}
