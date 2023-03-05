
document.querySelector('.form__date').valueAsDate = new Date();
let inputs = Array.from(document.querySelectorAll(".input"))

let comments = []

loadComs()

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
        document.querySelector(".form__alert p").innerHTML = "Input not valid"
    } else {
        document.querySelector(".form__alert p").innerHTML = "Added successfully"
    }
}


document.querySelector('.form__submit').onclick = function(e){
    e.preventDefault();
    validate() 

    let author = document.querySelector('.form__author')
    let comment = document.querySelector('.form__comment')
    let date = Date.parse(document.querySelector('.form__date').value)
    let now = new Date()
    const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()
    const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
    const hoursAndMinutes = ` ${hours}:${minutes}`;
    let dif = Date.now() - date
    let day = 86400000
    let days = Math.round(dif / day)

    if (dif < day ){
        date = 'today,'
    } else if (dif >= day && dif <= day*2) {
        date = 'yesterday,'
    } else date = `${days} days ago,`

    let com = {
        author : author.value,
        comment : comment.value,
        time : date+hoursAndMinutes,
    }

    if(com.author && com.comment){
        comments.push(com)
        saveComs();
    }

    showComs();

}

function showComs() {
    let comField = document.querySelector('.comments')

    let out = '';

    comments.map(item => {
        out += `<div class='comment'><p class="comment__date">${(item.time)}</p>`
        out += `<p class="comment__author">${(item.author)}</p>`
        out += `<p class="comment__comment">${(item.comment)}</p></div>`
    })

    comField.innerHTML = out
}


function saveComs() {
    localStorage.setItem('comments', JSON.stringify(comments))
}

function loadComs() {
    if (JSON.parse(localStorage.getItem('comments'))) {
        comments = JSON.parse(localStorage.getItem('comments'))
    }
    showComs()
}

function clearLS() {
    localStorage.clear()
}

console.log(localStorage)




// let form = document.querySelector('.form')
// let check = 0;

// document.querySelector('.open').onclick = function(){
    

//     check ? form.classList?.add("hidden") : form.classList?.remove("hidden")
    
//     check = Math.abs(check-1)
// }
