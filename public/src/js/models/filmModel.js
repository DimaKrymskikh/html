/**
 * Модель фильма
 * @returns {Object}
 */
export function filmModel() {
    // id фильма
    let filmId;
    // Название
    let title;
    // Описание фильма
    let description;
    // Год выхода фильма
    let releaseYear;
    // Список актёров
    let actorNames;
    // Язык, на котором снят фильм
    let language;

    /**
     * Изменяет свойства фильма
     * @param {Object} data
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
    
    return {
        filmId,
        title,
        description,
        releaseYear,
        actorNames,
        language,
        setData
    };
}
