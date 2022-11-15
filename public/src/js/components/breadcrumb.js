/**
 * Хлебные крошки 
 * @param {Array} list - Массив объектов вида 
 * [{
 *    hash: '#',
 *    text: 'Главная страница'
 *  }, {
 *    text: 'Личный кабинет'
 * }]
 * @returns {String}
 */ 
export function getBreadcrumb(list) {
    let html = `
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">`;
    
    list.forEach( (item, index) => {
        if (index === list.length - 1) {
            html += `<li class="breadcrumb-item active">${item.text}</li>`;
        } else {
            html += `<li class="breadcrumb-item"><a href="/${item.hash}">${item.text}</a></li>`;
        }
    });
                
    html += `</ol></nav>`;
    
    return html;
}
