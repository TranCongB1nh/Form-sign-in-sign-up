let todos = []
let welcomeMessage = document.getElementById("welcomeMessage")
let todoLogout = document.getElementById('todoLogout')

// Hàm tải danh sách todos từ localStorage
function loadTodos() {
    let user =
      localStorage.getItem("currentUser") ||
      sessionStorage.getItem("currentUser");
    if (user) {
        user = JSON.parse(user);
        const storedTodos = localStorage.getItem(`todos_${user.username}`);
        if (storedTodos) {
            todos = JSON.parse(storedTodos);
        }
    }
}

// Hàm lưu danh sách todos vào localStorage
function saveTodos() {
    let user =
      localStorage.getItem("currentUser") ||
      sessionStorage.getItem("currentUser");
    if (user) {
        user = JSON.parse(user);
        localStorage.setItem(`todos_${user.username}`, JSON.stringify(todos));
    }
}

window.onload = function () {
    const localUser = localStorage.getItem('currentUser');
    const sessionUser = sessionStorage.getItem('currentUser');
    const currentWindow = window.location.href.split('/').pop();

    // Nếu người dùng đã đăng nhập
    if (localUser || sessionUser) {
        if (currentWindow === 'signIn.html' || currentWindow === 'signUp.html') {
            window.location.href = 'main.html';
        }
    } else {
        // Nếu người dùng chưa đăng nhập, và họ đang ở trang main.html
        if (currentWindow === 'main.html') {
            window.location.href = 'signIn.html';
        }
    }
}

function checkLoggedIn() {
    const user =
      localStorage.getItem("currentUser") ||
      sessionStorage.getItem("currentUser");
    if (!user) {
      window.location.href = "../HTML/signIn.html"; // Chuyển hướng đến signIn.html nếu không có người dùng
    } else {
      const parsedUser = JSON.parse(user);
      welcomeMessage.textContent = `Hello ${parsedUser.username}. You are logged in`;
      loadTodos(); // Tải todos khi đăng nhập
      renderTodos();
    }
}
checkLoggedIn();

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
    saveTodos(); // Lưu todos sau khi thêm
    renderTodos()
}

function clearTodoInput() {
    const todoInput = document.getElementById("newTodo")
    todoInput.value = ""
}

function deleteTodo(id){
    todos = todos.filter(Todo => Todo.id !== id)
    saveTodos(); // Lưu todos sau khi xoá
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
            saveTodos(); // Lưu todos sau khi sửa
        }
    }
    renderTodos()
}

function toggleTodo(id, currentFilter) {
    for (let index in todos) {
        if (id === todos[index].id) {
            todos[index].isDone = !todos[index].isDone
            saveTodos(); // Lưu todos sau khi chuyển trạng thái
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
