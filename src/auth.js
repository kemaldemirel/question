export function getAuthForm(){
    return `
        <form class="mui-form" id="auth-form">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="email" id="email-input" required>
                    <label>Email</label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="password" id="password-input" required>
                    <label>Пароль</label>
                </div>
                <button
                        type="submit"
                        class="mui-btn mui-btn--danger">Войти
                </button>
            </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const API_KEY = "AIzaSyC2vdv0luH_qV9TfyACQhWPnp6o-AX8tt8"
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({email, password, returnSecureToken: true}),
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(res => res.json())
        .then(data => data.idToken)
}
