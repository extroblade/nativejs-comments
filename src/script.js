
let comments = []

const form = document.querySelector('.form')
const form_submit = document.querySelector('.form__submit')
const form_date = document.querySelector('.form__date')
const inputs = Array.from(document.querySelectorAll(".input"))
const author = document.querySelector('.form__author')
const comment = document.querySelector('.form__comment')
const validator = document.querySelector(".form__alert p")
let comField = document.querySelector('.comments')

const day = 1000 * 60 * 60 * 24

form_date.valueAsDate = new Date()
console.log(form_date.valueAsDate)
const today = Date.parse(form_date.valueAsDate)
console.log(today + 'v1')

let date = Date.parse(form_date.value)
let now = Date.now()
let dif = now - date
let nowD = new Date(now)
author.onchange = validate
comment.onchange = validate


loadComs()
showComs()


comField.addEventListener("change", showComs)


author.addEventListener("input", validate)
comment.addEventListener("input", validate)


form_submit.addEventListener("click",() => {
    validate()
    submit()
});

author.addEventListener("keydown", e => {
    if (e.keyCode == 13) submit()
})

comment.addEventListener("keydown", e => {
    if (e.keyCode == 13) submit()
})


function timeChanger(time, h, m) {
    const hrs = now - time
    
    let days = Math.floor(hrs / day)
    let hours = h < 10 ? `0${h}` : h
    let minutes = m < 10 ? `0${m}` : m
    let hoursAndMinutes = ` ${hours}:${minutes}`

    let t = time + (3600 * 1000 * h) + (60 * 1000 * m) + 4 * 3600 * 1000
    
    if (now-time < now-today ){
        time = 'today,'
    } else if (now-t >= now-today && now-t <= (now-today)+day) {
        time = 'yesterday,'
    } else time = `${days} days ago,`

    return time+hoursAndMinutes
}


function submit(){
    now = Date.now()
    nowD = new Date(now)
    let com = {
        author : author.value,
        comment : comment.value,
        time : Date.parse(form_date.value), // + (3600 * 1000 * nowD.getHours()) + (60 * 1000 * nowD.getMinutes())
        likes: 0,
        pressed: false,
        hours: nowD.getHours(),
        minutes: nowD.getMinutes()
    }

    if(com.author && com.comment){
        validator.innerHTML = 'Added successfully'
        comments.push(com)
        saveComs()
        form_date.valueAsDate = nowD    
        author.value = ''
        comment.value = ''
        showComs()
    }
}


function showComs() {
    if (comments.length){
        let out = ''
        comments.map(item => {
            if(item.author && item.time && item.comment){
                out +=
            `<div class='comment'>\
                    <div class='comment__row'>\
                        <p class="comment__author">${(item.author)}</p>\
                        <p class="comment__date">${timeChanger(item?.time, item?.hours, item?.minutes)}</p>\
                    </div>\
                    <div class='comment__row'>\
                        <p class="comment__comment">${(item.comment)}</p>\
                    </div>\
                    <div class='comment__btns'>
                        <button class='comment__like-btn'>\
                            <img src="src/static/like${item.pressed ? 'd' : ''}.png" alt="like">\
                            <p class='likes'>${item.likes}</p>\
                        </button>\
                        <button class='comment__delete-btn'>\
                            <img src="src/static/trash.png" alt="delete">\
                        </button>\
                    </div>
                </div>`
            }
        })
        
        comField.innerHTML = out
    }

    let likeBtns = Array.from(document.querySelectorAll(".comment__like-btn"))
    for (let i = 0; i < likeBtns.length; i++) {
        likeBtns[i].onclick = function() {

            comments[i].pressed = !comments[i].pressed;

            comments[i].pressed ? comments[i].likes++ :  comments[i].likes--

            localStorage.setItem(`comments[${i}]`, JSON.stringify(comments[i]));
            showComs()
        }
    }

    let deleteIcons = document.querySelectorAll(".comment__delete-btn");

    for (let i = 0; i < deleteIcons.length; i++) {
        deleteIcons[i].addEventListener("click", function () {
            this.parentElement.parentElement.style.display = "none"
            comments.splice(i, 1);
            saveComs()
            showComs()
        });
    }
    
}


function saveComs() {
    clearLS()
    comments.map((item, index) => {
        localStorage.setItem(`comments[${index}]`, JSON.stringify(item))
    })
}
    

function loadComs() {
    for(let i=0; i<localStorage.length; i++){
        comments[i] = JSON.parse(localStorage.getItem(`comments[${i}]`))
    }
}


function clearLS() {
    localStorage.clear()
}


function validate() {
    let textctr=0;

    inputs.map(i => {
        if (i.value) {
            i.classList.remove("error");
        } else {
            textctr++ 
            i.classList?.add("error");
        }
    })

    if (textctr) {
        validator.innerHTML = "Input not valid"
        return false
    } else {
        validator.innerHTML = "&nbsp;"
        return true
    }
}
