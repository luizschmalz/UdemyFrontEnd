//seleção de elementos

const todoForm = document.querySelector('#addtask');
const todoDiv = document.querySelector('.addtaskdiv');
const formInput = document.querySelector('#input');
const todoList = document.querySelector('.task');
const editDiv = document.querySelector('.editdiv');
const editForm = document.querySelector('#edittask');
const editInput = document.querySelector('#editinput');
const cancelBtn = document.querySelector('#canceledit');

let oldTittle;

const searchInput = document.querySelector('#searchinput');
const clearBtn = document.querySelector('#apagar');
const filterBtn = document.querySelector('#filtro');

//funções

saveTodo = (text, done =0, save =1) =>{

    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTittle = document.createElement('h3')
    todoTittle.innerText = text
    todo.appendChild(todoTittle)

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)
    
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-todo')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    //operações com a local storage

    if(done){
        todo.classList.add('done');
    }
    if(save){
        saveTodoLocalStorage({text, done});
    }

    todoList.appendChild(todo)

    formInput.value = '';
    formInput.focus();
}

toggleForms = () =>{

    todoForm.classList.toggle('hide');
    editDiv.classList.toggle('hide');
    todoDiv.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

updateTodo = (text) =>{
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {

        if(todo.querySelector('h3').innerText === oldTittle){
            todo.querySelector('h3').innerText = text;

            updateTodoTittleLS(oldTittle, text);
        }
    })
}

getSearchTodos = (search) =>{
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTittle = todo.querySelector('h3').innerText.toLowerCase();
        const searchLower = search.toLowerCase();
    
        todo.style.display = 'flex';

        if(!todoTittle.includes(searchLower)){
            todo.style.display = 'none';
        } 
    })
}

filterTodos = (filterValue) =>{

    const todos = document.querySelectorAll('.todo');

    switch(filterValue){
        case 'all':
            todos.forEach((todo) => todo.style.display = 'flex') 
            break;
        case 'done': //if ternario
            todos.forEach((todo) => todo.classList.contains("done" )
            ? todo.style.display = 'flex' 
            : todo.style.display = 'none')
            break;
        case 'todo': 
            todos.forEach((todo) => 
            !todo.classList.contains("done")
                ? todo.style.display = 'flex' 
                : todo.style.display = 'none')
            break;
        default:
            break;
    }

}


//eventos


todoForm.addEventListener("submit", (e) =>{

    e.preventDefault();

    const task = formInput.value;

    if (!task) return;

    saveTodo (task)
})

document.addEventListener('click', (e) =>{

    const targetEl = e.target;
    const parent = targetEl.closest('div');
    let todoTittle;

    if(parent && parent.querySelector('h3')){
        todoTittle = parent.querySelector('h3').innerText;
    }

    if(targetEl.classList.contains('delete-todo')){
        parent.remove();

        removeTodos(todoTittle);
    } 

    if (targetEl.classList.contains('finish-todo')){
        parent.classList.toggle('done');

        updateTodoStatusLS(todoTittle);
    }
     
    if (targetEl.classList.contains('edit-todo')){
        toggleForms();

        editInput.value = todoTittle;
        oldTittle = todoTittle;
    }
    
});

cancelBtn.addEventListener('click', (e) =>{

    e.preventDefault();
    toggleForms();
})

editForm.addEventListener('submit', (e) =>{

    e.preventDefault();

    const newTask = editInput.value;

    if (!newTask) return;

    updateTodo(newTask);
    toggleForms();

})

clearBtn.addEventListener('click', (e)=>{

    e.preventDefault();
    searchInput.value = '';

    searchInput.dispatchEvent(new Event('keyup'));
})

searchInput.addEventListener('keyup', (e) =>{

    e.preventDefault();

    search = e.target.value 

    getSearchTodos(search);

})

filterBtn.addEventListener('change', (e) =>{
    const filterValue = e.target.value;

    filterTodos(filterValue);
})

//local storage

const getLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    return todos;
}

const loadTodos = () => {
    const todos = getLocalStorage();

    todos.forEach((todo) => {
        saveTodo (todo.text, todo.done, 0);
    })
}

const saveTodoLocalStorage = (todo) => {

    const todos = getLocalStorage();

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos)); 
}

const removeTodos = (todoText) => {

    const todos = getLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text !== todoText);

    localStorage.setItem('todos', JSON.stringify(filteredTodos)); 
}

const updateTodoStatusLS = (todoText) => {

    const todos = getLocalStorage();

    todos.map((todo) => 
        todo.text === todoText ? (todo.done = !todo.done) : null

    );

    localStorage.setItem('todos', JSON.stringify(todos)); 

}

const updateTodoTittleLS = (todoOldText, todoNewText) => {

    const todos = getLocalStorage();

    todos.map((todo) => 
        todo.text === todoOldText ? (todo.text = todoNewText) : null

    );

    localStorage.setItem('todos', JSON.stringify(todos)); 

}

loadTodos();