'use strict';

const btnSignIn = document.getElementById('btnSignIn');
const btnSignUp = document.getElementById('btnSignUp');

const body = document.body;

let panelShowed = false;

btnSignUp.addEventListener('click', function () {
    if (!panelShowed) showRegisterPanel();
});

btnSignIn.addEventListener('click', function () {
    if (!panelShowed) showLoginPanel();
});

function showRegisterPanel() {
    panelShowed = true;
    const registerPanel = document.createElement('div');
    registerPanel.id = 'registerPanel';
    registerPanel.classList.add('userPanel');

    registerPanel.innerHTML = `
        <h2 id="signUpTitle" class="userPanel-title">Sign up</h2>
        <form action="../php/register.php" method="post" id="registerForm" class="userPanel-form">
            <div id="fieldsDiv" class="form-group">
                <input class="form-input" type="text" id="username" name="username" required placeholder="Username" minlength="5" autocomplete="off">
                <input class="form-input" type="password" id="password" name="password" required placeholder="Password" minlength="5" autocomplete="off">
                <input class="form-input" type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm password" minlength="5" autocomplete="off">
            </div>
            <button id="btnRegister" class="form-btnSubmit" type="submit">Register</button>
            <p id="errorMessage">ERROR</p>
            <p id="pressMessage">Press <span style="font-weight: bold"
            >Esc</span> to close</p>
        </form>
    `;

    document.body.insertAdjacentElement('afterbegin', registerPanel);
    moveWithArrows('registerForm');
    changeOpacity();
    handleSubmit('registerForm');
}

function showLoginPanel() {
    panelShowed = true;
    const loginPanel = document.createElement('div');
    loginPanel.id = 'loginPanel';
    loginPanel.classList.add('userPanel');

    loginPanel.innerHTML = `
        <h2 id="signInTitle" class="userPanel-title">Sign in</h2>
        <form action="../php/login.php" method="post" id="loginForm" class="userPanel-form">
            <div id="fieldsDiv" class="form-group">
                <input class="form-input" type="text" id="username" name="username" required placeholder="Username" minlength="5" autocomplete="off">
                <input class="form-input" type="password" id="password" name="password" required placeholder="Password" minlength="5" autocomplete="off">
            </div>
            <button id="btnLogin" class="form-btnSubmit" type="submit">Login</button>
            <p id="errorMessage">ERROR</p>
            <p id="pressMessage">Press <span style="font-weight: bold"
            >Esc</span> to close</p>
        </form>
    `;
    document.body.insertAdjacentElement('afterbegin', loginPanel);
    moveWithArrows('loginForm');
    changeOpacity();
    handleSubmit('loginForm');
}

function changeOpacity() {
    const bodyElementsExceptFirts = Array.from(body.children).slice(1);
    bodyElementsExceptFirts.forEach((e) => {
        e.style.opacity = '0.3';
    });
}

document.addEventListener('keydown', function (event) {
    if (panelShowed && event.key === 'Escape') {
        body.removeChild(body.firstElementChild);
        panelShowed = false;
        const bodyElementsExceptFirts = Array.from(body.children);
        bodyElementsExceptFirts.forEach((e) => {
            e.style.opacity = '1';
        });
    }
});

// Move across the input fields

function moveWithArrows(formName) {
    const form = document.getElementById(formName);
    const inputs = form.querySelectorAll('input');

    inputs.forEach((input, index) => {
        inputs[0].focus();
        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' && index < inputs.length - 1) {
                inputs[index + 1].focus();
                return;
            }

            if (e.key === 'ArrowUp' && index > 0) {
                inputs[index - 1].focus();
                return;
            }
        });
    });
}

function updateErrorMsg(msg) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
}

function handleSubmit(formName) {
    const form = document.getElementById(formName);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        if (formName === 'registerForm') {
            sendRegisterData(formData);
            return;
        }
        sendLoginData(formData);
    });
}

function sendRegisterData(formData) {
    if (formData.get('password') !== formData.get('confirmPassword')) {
        updateErrorMsg('Passwords do not match');
        return;
    }

    sendHttpRequest('../php/mainPage/register.php', formData);
}

function sendLoginData(formData) {
    sendHttpRequest('../php/mainPage/login.php', formData);
}

async function sendHttpRequest(route, formData) {
    try {
        const response = await fetch(route, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(
                'Error al enviar la solicitud. Código de estado: ' +
                    response.status
            );
        }

        const responseData = await response.text();
        handleServerResponse(responseData);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function handleServerResponse(response) {
    const data = JSON.parse(response);
    updateErrorMsg(data.message);
    if (data.move) {
        window.location.href = data.url;
        resetPage();
    }
}

function resetPage() {
    const firstChild = document.body.firstChild;
    const father = document.body;
    father.removeChild(firstChild);
    panelShowed = false;
    const bodyElementsExceptFirts = Array.from(body.children);
    bodyElementsExceptFirts.forEach((e) => {
        e.style.opacity = '1';
    });
}
