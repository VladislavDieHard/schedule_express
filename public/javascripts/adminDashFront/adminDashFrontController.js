function accordionDown() {
    let accordion = document.getElementsByClassName('accordion')
    for(let i = 0; i < accordion.length; i++){
        accordion[i].onclick = function () {
            this.classList.toggle('active')
            this.nextElementSibling.classList.toggle('show')
        }
    }
}

function read(id) {
    let login = this.document.getElementById(`login${id}`).value
    let isDeleted = this.document.getElementById(`isDeleted${id}`).value
    console.log(login, isDeleted)
}