import { Question } from "./question";
import {createModal, isValid} from "./utils";
import './style.css'
import {authWithEmailAndPassword, getAuthForm} from "./auth";

window.addEventListener('load', Question.renderList)
const form = document.querySelector('#form')
const input = form.querySelector('#question-input')
const btn = form.querySelector('#btn')
const modalBtn = document.getElementById('modal-btn')

form.addEventListener('submit', submitFormHendler)
input.addEventListener('input', () => {
    btn.disabled = !isValid(input.value)
})
modalBtn.addEventListener('click', openModal)

function submitFormHendler(e) {
    e.preventDefault();

    if(isValid(input.value)){
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        btn.disabled = true

        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
            btn.disabled = false
        })


    }
}

function openModal(){
    createModal('Авторизация', getAuthForm())
    document.getElementById('auth-form').addEventListener('submit', authFromHendler)
}

function authFromHendler(e){
    e.preventDefault();
    const btnModal = e.target.querySelector('button')
    const email = e.target.querySelector('#email-input').value.trim()
    const pswd = e.target.querySelector('#password-input').value.trim()

    btnModal.disabled = true
    authWithEmailAndPassword(email, pswd)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btnModal.disabled = false)

}

function renderModalAfterAuth(content){
    if(typeof content === 'string'){
        createModal('Ошибка', content)
    }else{
        createModal('Список вопросов', Question.listToHtml(content))
    }
}


