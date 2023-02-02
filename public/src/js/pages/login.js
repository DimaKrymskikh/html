import {app, user} from '../main.js';
import {pageHome} from './home.js';
import {getBreadcrumb} from '../components/breadcrumb.js'
import {spinner} from '../components/spinner.js';
import {getFillingErrors} from '../components/fillingErrors.js';

const contentContainer = document.querySelector('#content-container');

const breadcrumb = getBreadcrumb([{
                hash: '#',
                text: 'Главная страница'
            }, {
                text: 'Вход'
            }]);

const loginForm = `
    ${breadcrumb}
        
    <form id="login" action="" method="post">
        <div class="mb-3">
            <label class="form-label">Логин: 
                <input type="text" class="form-control" name="login"/>
            </label>
        </div>
        <div class="mb-3">
            <label class="form-label">Пароль: 
                <input type="password" class="form-control" name="password"/>
            </label>
        </div>
        <div class="mb-3">
            <button id="button-login" type="submit" class="btn btn-primary">Вход</button>
        </div>
    </form>

    <p>
        <a class="btn btn-link" href="#register">
            Регистрация
        </a>
    </p>

    <div id="login-errors" class="list-group" hidden></div>`;

/**
 * Осуществляет аутентификацию пользователя
 * @param {type} e
 * @returns {Object|Boolean}
 */
async function handlerLogin(e) {
    e.preventDefault();
    
    const login = document.getElementById('login');
    const data = new FormData(login);
    
    // Сохраняем введённый логин, он может понадобиться, если пара логин-пароль не верна.
    const loginName = login.elements.login.value;
    // Спиннер запускается после сбора данных, потому что он стирает форму
    contentContainer.innerHTML = spinner();
    
    const result = await app.request('login', 'POST',
        JSON.stringify({
            login: data.get('login'),
            password: data.get('password'),
            token: app.token,
            aud: app.aud
        }),
        {app, user}
    );
    
    // Если запрос вернул false, то выходим из функции
    if (!result) {
        return;
    }
    
    if (!result.errors.length) {
        document.querySelector('#alert-authorization').hidden = true;
        pageHome();
    } else {
        // Если пара логин-пароль не верна, то востановливаем форму
        contentContainer.innerHTML = loginForm;
        // заполняем поле "Логин" введённым значением
        const loginAfter = document.getElementById('login');
        loginAfter.elements.login.value = loginName;
        // пишем сообщение об ошибке
        const loginErrors = document.getElementById('login-errors');
        loginErrors.hidden = false;
        loginErrors.innerHTML = getFillingErrors(result.errors);
        // вешаем обработчик
        const buttonLogin = document.getElementById('button-login');
        buttonLogin.addEventListener('click', handlerLogin);
    }
}

/**
 * Отрисовывает форму входа
 * @returns {void}
 */
export function pageLogin() {
    location.href = '#login';
    document.title = 'Вход';
    contentContainer.innerHTML = loginForm;
    const buttonLogin = document.getElementById('button-login');
    buttonLogin.addEventListener('click', handlerLogin);
}
