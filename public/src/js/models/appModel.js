import {pageReboot} from '../pages/reboot.js';

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
    // Сохраняем url сервера в basicUrl
    const basicUrl = (async function() {
        const response = await fetch('basicUrl.php');
        return await response.text();
    })();

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
        this.token = '';
        this.isGuest = true;
    };
    
    /**
     * Оболочка над fetch
     * @param {String} url
     * @param {String} method
     * @param {String} body - Строка JSON
     * @param {Object} ob - Содержит список элементов, которые будут обновлены 
     * @returns {Object|Boolean}
     */
    const request = async function(url, method, body, ob = null) {
        const response = await fetch(`${await basicUrl}/${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });

        const result = await response.json();

        if (response.status > 400) {
            pageReboot(response.status, result.message); 
            this.setDefault();
            return false;
        }

        for (let field in ob) {
            ob[field].setData(result[field]);
        }

        return result;
    }
    
    return {
        token,
        isGuest,
        aud,
        setData,
        setDefault,
        request
    };
}
