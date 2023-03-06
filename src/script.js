
let comments = []

const form = document.querySelector('.form')
const form_submit = document.querySelector('.form__submit')
const form_date = document.querySelector('.form__date')
const inputs = Array.from(document.querySelectorAll(".input"))
const author = document.querySelector('.form__author')
const comment = document.querySelector('.form__comment')
const validator = document.querySelector(".form__alert p")
const comField = document.querySelector('.comments')

const day = 1000 * 60 * 60 * 24

form_date.valueAsDate = new Date()

let date = Date.parse(form_date.value)
let now = Date.now()
let dif = Date.now() - date
let nowD = new Date(now)
author.onchange = validate
comment.onchange = validate


loadComs()


function timeChanger(time, h, m) {
    const hrs = now - time
    
    let days = Math.floor(hrs / day)
    let hours = h < 10 ? `0${h}` : h
    let minutes = m < 10 ? `0${m}` : m
    let hoursAndMinutes = ` ${hours}:${minutes}`
    
    if (now-time < day ){
        time = 'today,'
    } else if (now-time >= day && hrs <= day*2) {
        time = 'yesterday,'
    } else time = `${days} days ago,`

    return time+hoursAndMinutes
}


function submit(){
    validate()
    let com = {
        author : author.value,
        comment : comment.value,
        time : Date.parse(form_date.value),
        likes: 0,
        pressed: false,
        hours: nowD.getHours(),
        minutes: nowD.getMinutes()
    }

    if(com.author && com.comment){
        comments.push(com)
        saveComs()
    }

    showComs()
}


form_submit.onclick = submit


author.onkeydown= function(e){
    if (e.keyCode == 13) submit()
}


comment.onkeydown = function(e){
    if (e.keyCode == 13) submit()
}


function showComs() {
    if (comments != null){
        let out = ''
        comments.map(item => {
            out += `<div class='comment'>\
                <div><button class='comment__like-btn'>\
                <img src="src/static/like${item.pressed ? 'd' : ''}.png" alt="like">\
                <p>${item.likes}</p>\
                </button>\
                <button class='comment__delete-btn'>\
                <img src="src/static/trash.png" alt="delete">\
                </button></div>\
                <p class="comment__date">${timeChanger(item.time, item.hours, item.minutes)}</p>\
                <p class="comment__author">${(item.author)}</p>\
                <p class="comment__comment">${(item.comment)}</p>\
                </div>`
        })
    
        comField.innerHTML = out
    }
}


function saveComs() {
    localStorage.setItem('comments', JSON.stringify(comments))
}


function loadComs() {
    if (JSON.parse(localStorage.getItem('comments'))) {
        comments = JSON.parse(localStorage.getItem('comments'))
        showComs()
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
        validator.innerHTML = "Added successfully"
        return true
    }
}


let likeBtns = Array.from(document.querySelectorAll(".comment__like-btn"))
let likeBtnsP = Array.from(document.querySelectorAll(".comment__like-btn p"))
console.log(comments)




for (let i = 0; i < likeBtns.length; i++) {
    likeBtns[i].onclick = function() {

        comments[i].pressed = !comments[i].pressed;

        if(comments[i].pressed){
            comments[i].likes++
            likeBtns[i].classList.add("liked");
        } else {
            comments[i].likes--
            likeBtns[i].classList.remove("liked");
        }
        clearLS()
        saveComs()
        showComs()
    }
}




let deleteIcons = document.querySelectorAll(".comment__delete-btn");
    for (let i = 0; i < deleteIcons.length; i++) {
        deleteIcons[i].addEventListener("click", function (e) {
            e.preventDefault()
            this.parentElement.parentElement.style.display = "none"
            comments.splice(i, 1)
            clearLS()
            saveComs()
    });
    }

