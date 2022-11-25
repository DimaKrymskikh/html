/**
 * Модель ползователя
 * @returns {Object}
 */
export function userModel() {
    let login = '';

    const setData = function(data) {
        for (let field in data) {
            if (!this.hasOwnProperty(field)) {
                continue;
            }
            this[field] = data[field];
        }
    };
    
    return {
        login,
        setData
    };
}
