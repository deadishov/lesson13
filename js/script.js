const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const headerBtn = document.querySelector('.header-button')


let toDoData = [];


const stopSubmit = function () {
    if (headerInput.value.length < 1) {
        headerBtn.disabled = true;
    } else {
        headerBtn.disabled = false;
    }
};
const checkChange = function () {
    headerInput.addEventListener('input', stopSubmit);
};

const start = function () {
    if (localStorage.getItem('userData')) {
        toDoData = JSON.parse(localStorage.getItem('userData'));
    }

    stopSubmit();
    checkChange();
    render();
}




function render() {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function (item, index) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }


        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(index, 1);
            render()
        })

    });
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();


    const newToDo = {
        text: headerInput.value.trim(),
        completed: false
    }

    toDoData.push(newToDo);
    headerInput.value = '';

    render();

    localStorage.setItem('userData', JSON.stringify(toDoData))
});



start();