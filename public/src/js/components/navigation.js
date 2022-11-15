
export function navigationBar() {
    const home = document.querySelector('#nav-home');
    const catalog = document.querySelector('#nav-catalog');
    const account = document.querySelector('#nav-account');
    const login = document.querySelector('#nav-login');
    const logout = document.querySelector('#nav-logout');
    
    const navLogin = function() {
        home.hidden = false;
        catalog.hidden = false;
        account.hidden = false;
        login.hidden = true;
        logout.hidden = false;
    };
    
    const navLogout = function() {
        home.hidden = false;
        catalog.hidden = false;
        account.hidden = true;
        login.hidden = false;
        logout.hidden = true;
    };
    
    const navReboot = function() {
        home.hidden = true;
        catalog.hidden = true;
        account.hidden = true;
        login.hidden = true;
        logout.hidden = true;
    };
    
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
