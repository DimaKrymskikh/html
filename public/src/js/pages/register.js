import {basicUrl, app, user, alertAuthorization} from '../main.js';
import {pageHome} from './home.js';
import {getBreadcrumb} from '../components/breadcrumb.js'
import {spinner} from '../components/spinner.js';
import {getFillingErrors} from '../components/fillingErrors.js';
import {request} from '../tools/request.js';

const contentContainer = document.querySelector('#content-container');

const breadcrumb = getBreadcrumb([{
                hash: '#',
                text: 'Главная страница'
            }, {
                hash: '#login',
                text: 'Вход'
            }, {
                text: 'Регистрация'
            }]);

const registrationForm = `
        ${breadcrumb}
        
        <form id="register" action="" method="post">
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
                <label class="form-label">Подтверждение пароля: 
                    <input type="password" class="form-control" name="verification"/>
                </label>
            </div>
            <div class="mb-3">
                <button id="button-registration" type="submit" class="btn btn-primary">Зарегистрироваться</button>
            </div>
        </form>

        <div id="register-errors" class="list-group"></div>`;

async function handlerRegistration(e) {
    e.preventDefault();
    
    const register = document.getElementById('register');
    const data = new FormData(register);
    
    // Сохраняем введённый логин, он может понадобиться, если были ошибки при заполнении формы
    const loginName = register.elements.login.value;
    // Спиннер запускается после сбора данных, потому что он стирает форму
    contentContainer.innerHTML = spinner();
    
    const result = await request(`${basicUrl}/register`, 'POST',
        JSON.stringify({
            login: data.get('login'),
            password: data.get('password'),
            verification: data.get('verification'),
            token: app.token,
            aud: app.aud
        }),
        {app, user}
    );
    
    if (!result.errors.length) {
        alertAuthorization.hidden = true;
        pageHome();
    } else {
        // Если были ошибки при заполнении формы, то востановливаем форму
        contentContainer.innerHTML = registrationForm;
        // заполняем поле "Логин" введённым значением
        const registerAfter = document.getElementById('register');
        registerAfter.elements.login.value = loginName;
        // пишем сообщение об ошибке
        const registerErrors = document.getElementById('register-errors');
        registerErrors.hidden = false;
        registerErrors.innerHTML = getFillingErrors(result.errors);
        // вешаем обработчик
        const buttonRegistration = document.getElementById('button-registration');
        buttonRegistration.addEventListener('click', handlerRegistration);
    }
}

export function pageRegister() {
    document.title = 'Регистрация';
    contentContainer.innerHTML = registrationForm;
    const buttonRegistration = document.querySelector('#button-registration');
    buttonRegistration.addEventListener('click', handlerRegistration);
}
