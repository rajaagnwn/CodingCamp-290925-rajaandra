console.log("Hello world!");

let todos = [];

function addTodo() {
    const todoText = document.getElementById('todo-input').value;
    const todoDate = document.getElementById('todo-date').value;
    if (!validateInput(todoText, todoDate)) return;
    // Tambah todo ke array menggunakan nilai string langsung
    const todo = {
        task: todoText,
        date: todoDate
    };
    todos.push(todo);

    alert("To Do added: " + todoText + " " + todoDate);
    console.log(todos);

    // update tampilan (panggil fungsi render jika ada)
    if (typeof renderTodos === 'function') renderTodos();

    // reset form jika diinginkan
    const form = document.getElementById('todo-form');
    if (form) form.reset();
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        todoList.innerHTML += `<li class="border p-2 mb-2 flex justify-between items-center">
            <span><strong>${todo.task}</strong> <small class="text-sm text-gray-500">${todo.date}</small></span>
            <button type="button" class="remove-btn text-red-500">Remove</button>
        </li>`;
    });
}

function deleteAllTodo() {

}

function filterTodo() {

}

function validateInput(todo, date) {
    if (todo === "" || date === "") {
        alert("Please fill in both fields.");
        return false;
    }
    return true;
}