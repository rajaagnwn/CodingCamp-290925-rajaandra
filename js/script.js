let todos = [];

function addTodo() {
    const todoText = document.getElementById('todo-text').value;
    const todoDate = document.getElementById('todo-date').value;
    ///validasi input
    if (!validateInput(todoText, todoDate)) return;
    let todo = {
        task: todoText,
        date: todoDate
    };
    todos.push(todo);

    alert("To Do added: " + todoText + " " + todoDate);
    console.log(todos);

    // render to do 
    if (typeof renderTodos === 'function') renderTodos();

    // reset form jika diinginkan
    const form = document.getElementById('todo-form');
    if (form) form.reset();
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    ///clear existing list
    todoList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = '<li class="text-center text-gray-500">No tasks yet. Add a task above!</li>';
        return;
    }

    ///render each todo with data-index and remove handler (onclick calls removeTodo)
    todos.forEach((todo, index) => {
        todoList.innerHTML += `<li data-index="${index}" class="border p-2 mb-2 flex justify-between items-center">
            <span><strong>${todo.task}</strong> <small class="text-sm text-gray-500">${todo.date}</small></span>
            <button type="button" onclick="removeTodo(${index})" class="remove-btn text-red-500">Remove</button>
        </li>`;
    });
}

function removeTodo(index) {
    // safety check
    if (typeof index !== 'number' || index < 0 || index >= todos.length) return;
    todos.splice(index, 1);
    if (typeof renderTodos === 'function') renderTodos();
}

function deleteAllTodo() {
    ///clear todos array
    todos = [];
    ///clear UI
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    alert("All To Do items have been deleted.");
    console.log(todos);
}

function filterTodo() {
    // Ambil nilai filter dari elemen #filter-date jika ada, kalau tidak gunakan prompt
    const filterEl = document.getElementById('filter-date');
    const filterDate = filterEl ? filterEl.value.trim() : (prompt('Filter by date (YYYY-MM-DD). Leave empty to show all:') || '').trim();

    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    // jika kosong (reset), tampilkan semua
    if (filterDate === '') {
        if (typeof renderTodos === 'function') {
            renderTodos();
            return;
        }
    }

    // render hanya item yang cocok (pakai index asli sehingga removeTodo bekerja)
    let found = 0;
    todos.forEach((t, i) => {
        if (t.date === filterDate) {
            found++;
            todoList.innerHTML += `<li data-index="${i}" class="border p-2 mb-2 flex justify-between items-center">
                <span><strong>${t.task}</strong> <small class="text-sm text-gray-500">${t.date}</small></span>
                <button type="button" onclick="removeTodo(${i})" class="remove-btn text-red-500">Remove</button>
            </li>`;
        }
    });

    if (found === 0) {
        todoList.innerHTML = '<li class="text-center text-gray-500">No tasks match the filter.</li>';
    }
}

///validasi input
function validateInput(todo, date)
///cek apakah input kosong
{
    if (todo === "" || date === "")
    ///jika jika kosong tampilkan alert
    {
        alert("Please fill in both fields.");
        return false;
    }
    ///jika lolos validasi
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filter-btn') || document.querySelector('button.bg-green-500');
    if (filterBtn) filterBtn.addEventListener('click', filterTodo);

    const deleteBtn = document.getElementById('delete-all') || document.querySelector('button.bg-red-500');
    if (deleteBtn) deleteBtn.addEventListener('click', deleteAllTodo);
});