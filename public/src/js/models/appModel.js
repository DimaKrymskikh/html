/**
 * Модель для хранения параметров приложения
 * @returns {Object}
 */
export function appModel() {
    // Токен
    let token = '';
    // Состояние пользователя
    let isGuest = true;
    // Константа по которой сервер определяет, кокое именно приложение к нему обратилось
    const aud = 'html';

    /**
     * Изменяет свойства модели
     * Используется при обработке ответов сервера
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
    
    /**
     * Устанавливает начальные значения свойств пагинации
     * Применяется, когда сервер распознал поддельный токен
     * @returns {void}
     */
    const setDefault = function() {
        token = '';
        isGuest = true;
    };
    
    return {
        token,
        isGuest,
        aud,
        setData,
        setDefault
    };
}
