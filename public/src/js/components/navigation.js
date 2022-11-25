/**
 * Возвращает объект функций, управляющих основным меню
 * @returns {Object}
 */
export function navigationBar() {
    // Возможные вкладки меню
    const home = document.querySelector('#nav-home');
    const catalog = document.querySelector('#nav-catalog');
    const account = document.querySelector('#nav-account');
    const login = document.querySelector('#nav-login');
    const logout = document.querySelector('#nav-logout');
    
    /**
     * Задаёт вид меню для залогиненного пользователя
     * @returns {void}
     */
    const navLogin = function() {
        home.hidden = false;
        catalog.hidden = false;
        account.hidden = false;
        login.hidden = true;
        logout.hidden = false;
    };
    
    /**
     * Задаёт вид меню для незалогиненного пользователя
     * @returns {void}
     */
    const navLogout = function() {
        home.hidden = false;
        catalog.hidden = false;
        account.hidden = true;
        login.hidden = false;
        logout.hidden = true;
    };
    
    /**
     * Вид меню на странице после того, как сервер распознал поддельный токен
     * @returns {void}
     */
    const navReboot = function() {
        home.hidden = true;
        catalog.hidden = true;
        account.hidden = true;
        login.hidden = true;
        logout.hidden = true;
    };
    
    /**
     * Задаёт вид меню 
     * @param {Boolean} isGuest
     * @returns {void}
     */
    const navBar = function(isGuest) {
        if (isGuest) {
            navLogout();
        } else {
            navLogin();
        }
    };
    
    return {
        navBar,
        navReboot
    };
}
