let todos = []
let welcomeMessage = document.getElementById("welcomeMessage")
let todoLogout = document.getElementById('todoLogout')

function checkLoggedIn() {
    let user =
      localStorage.getItem("currentUser") ||
      sessionStorage.getItem("currentUser");
    if (!user) {
      window.location.href = "../HTML/main.html";
    } else {
      user = JSON.parse(user);
      welcomeMessage.textContent = `Hello ${user.username}. You are logged in`;
    }
}
checkLoggedIn()

todoLogout.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    localStorage.removeItem("rememberMeStatus");
    window.location.href = "../HTML/signIn.html";
});

function addTodo() {
    const todoInput = document.getElementById("newTodo")
    const text = todoInput.value
    if (text === "") {
        return
    }

    const Todo = {
        id: Date.now(),
        text: text,
        isDone: false
    }
    todos.push(Todo)
    todoInput.value = ""
    renderTodos()
}

function clearTodoInput() {
    const todoInput = document.getElementById("newTodo")
    todoInput.value = ""
}

function deleteTodo(id){
    todos = todos.filter(Todo => Todo.id !== id)
    renderTodos()
}

function filterTodos(){
    const filterTodo = document.getElementById("filter")
    const filterStatus = filterTodo.value
    renderTodos(filterStatus)
}

function editTodoText(id){
    const todo = todos.find(todo => todo.id === id)
    if (todo){
        const newText = prompt('Edit todo:',todo.text)
        if (newText !== null){
            todo.text = newText
        }
    }
    renderTodos()
}

function toggleTodo(id, currentFilter) {
    for (let index in todos) {
        if (id === todos[index].id) {
            todos[index].isDone = !todos[index].isDone
        }
    }
    renderTodos(currentFilter)
}

function renderTodos(filter = 'all') {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    let filteredTodos = todos;
    if (filter === 'done') {
        filteredTodos = todos.filter(todo => todo.isDone)
    } else if (filter === 'undone') {
        filteredTodos = todos.filter(todo => !todo.isDone)
    }

    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isDone;
        checkbox.onchange = () => toggleTodo(todo.id, filter);

        const text = document.createElement('input');
        text.type = 'text';
        text.value = todo.text;
        text.readOnly = true;

        const editTodoBtn = document.createElement('button');
        editTodoBtn.textContent = 'Edit';
        editTodoBtn.onclick = () => editTodoText(todo.id);

        const deleteTodoBtn = document.createElement('button');
        deleteTodoBtn.textContent = 'Delete';
        deleteTodoBtn.onclick = () => deleteTodo(todo.id);

        todoItem.appendChild(checkbox);
        todoItem.appendChild(text);
        todoItem.appendChild(editTodoBtn);
        todoItem.appendChild(deleteTodoBtn);
        todoList.appendChild(todoItem);
    })
}