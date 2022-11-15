
export function paginationBlok(pagination) {
    let disabledFirstActivePage = pagination.activePage === 1 ? 'disabled' : '';
    let disabledLastActivePage = pagination.activePage === pagination.pagesNumber ? 'disabled' : '';
    
    let html = `
        <nav class="pagination-container">
            <ul class="pagination justify-content-center">
                <li class="page-item ${disabledFirstActivePage}" data-page="1">
                    <span class="page-link">&laquo;</span>
                </li>
        `;
    
    for(let i = pagination.firstButton; i <= pagination.lastButton; i++) {
        let active = pagination.activePage === i ? 'active' : '';
        html += `
            <li class="page-item ${active}" data-page="${i}">
                <span class="page-link">${i}</span>
            </li>`;
    }
    
    html += `
                <li class="page-item ${disabledLastActivePage}" data-page="${pagination.pagesNumber}">
                    <span class="page-link">&raquo;</span>
                </li>
            </ul>
        </nav>`;
    
    return html;
}

function isHiddenPagination(pagination) {
    return !pagination.itemsNumberTotal;
}

export function turnPage(container, pagination, request, render) {
    function handlerPagination(request) {
        return async function(e) {
            let tag;
            if (e.target.parentNode.className.toLowerCase().trim() === 'page-item') {
                tag = e.target.parentNode;
            } else {
                return;
            }
            
            await request(pagination, tag.getAttribute('data-page'));
            render();
        };
    };
    
    container.addEventListener('click', handlerPagination(request));
    // Если на странице нет фильмов, пагинацию не показываем
    container.hidden = isHiddenPagination(pagination);
}
