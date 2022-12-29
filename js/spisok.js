let form = document.querySelector('form')
let textTask = document.querySelector('form input')
let listTask = document.querySelector('.container ul')
let taskNo = document.querySelector('.taskNo')

//===============================================
// createTask.onclick=function(){
//     console.log(textTask.value);
// }
//renameTask()
let tasks = []

if (localStorage.getItem('task')) {
    tasks = JSON.parse(localStorage.getItem('task'))
}
tasks.forEach(function (item) {
    let cssClass = (item.done) ? "editTask" : ""


    let boxTask = `<li id=${item.id} class="taskList">
        <div class='${cssClass}'>${item.text}</div>
        <div>
            <button class="Yes"></button>
            <button class="No"></button>
        </div>
    </li>`
    if (item.text !== '')
        listTask.insertAdjacentHTML('beforeend', boxTask)
    if (tasks.length > 0)
        taskNo.classList.add('displayNone')//пройти по коллекции
})

form.addEventListener('submit', createNewTask)
function createNewTask(event) {
    event.preventDefault()
    event.preventDefault()
    // let text = textTask.value
    let task = {
        id: Date.now(),
        text: textTask.value,
        done: false,
    }
    let cssClass = (task.done) ? "editTask" : ""
    if (task.text !== '')
        tasks.push(task)
    let boxTask = `<li id=${task.id} class="taskList">
        <div class='${cssClass}'>${task.text}</div>
        <div>
            <button class="Yes"></button>
            <button class="No"></button>
        </div>
    </li>`
    if (task.text !== '') {
        listTask.insertAdjacentHTML('beforeend', boxTask)
        textTask.value = ''
        textTask.focus()
        if (tasks.length > 0)
            taskNo.classList.add('displayNone')//пройти по коллекции
        saveDataTask()
    }
}
listTask.addEventListener('click', deleteTask)
function deleteTask(event) {

    if (event.target.closest('.No')) {
        let id = event.target.closest('.taskList').id;
        tasks = tasks.filter((item) => (item.id !== +id))

        event.target.closest('.taskList').remove()
    }
    if (tasks.length === 0) {
        taskNo.classList.remove('displayNone')
    }
    saveDataTask()
}
//===================================================================
listTask.addEventListener('click', editTask)
function editTask(event) {
    if (event.target.closest('.Yes')) {
        let parentNode = event.target.closest('.taskList')
        let id = +parentNode.id
        tasks.find(function (item) {
            if (item.id === id) {
                item.done = !item.done
                saveDataTask()
            }
        })
        parentNode.querySelector('div').classList.toggle('editTask')
    }


}
//=============================localStorage=========================================
function saveDataTask() {
    localStorage.setItem('task', JSON.stringify(tasks))

}
// function renameTask() {
//     let localTask = localStorage.getItem('task')
//     JSON.stringify = localTask
// }






