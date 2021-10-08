export class Question {
    static create(question) {
        return fetch('https://question-app-5115f-default-rtdb.firebaseio.com/questions.json',{
            method: 'POST',
                body: JSON.stringify(question),
                headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                question.id = res.name
                return question;
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static fetch(token){
        if(!token){
            return Promise.resolve('<p class="error">У вас нет токена</p>')
        }
        return fetch(`https://question-app-5115f-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
            .then(res => res.json())
            .then(res => {
                if(res && res.error){
                    return `<p class="error">${res.error}</p>`
                }
                return res ? Object.keys(res).map(key => ({
                    ...res[key],
                    id: key
                })) : []
            })
    }

    static renderList() {
        const questions = getQuestionFromLocalStorage();

        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div className="mui--text-headline">Вы пока ничего не спрашивали</div>`
        const list = document.getElementById('list')
        list.insertAdjacentHTML('beforeend', html)
    }

    static listToHtml(question){
        return question.length
            ? `<ol>${question.map(q => `<li>${q.text}</li>`).join('')}</ol>`
            : `<p>Вопросов пока нет</p>`
    }
}

function addToLocalStorage(question){
    const all = getQuestionFromLocalStorage();
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionFromLocalStorage(){
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>
            ${question.text}
        </div>
        <br><br>
    `
}
