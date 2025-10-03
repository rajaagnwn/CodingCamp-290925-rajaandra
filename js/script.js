

let todos = [];

function addTodo() {
    const todoText = document.getElementById('todo-input').value;
    const todoDate = document.getElementById('todo-date').value;
    if (!validateInput(todoText, todoDate)) return;

    const todo = { task: todoText, date: todoDate };
    todos.push(todo);

    renderTodos();
    document.getElementById('todo-form').reset();
}

function renderTodos(list = todos) {
    const todoList = document.getElementById('todo-list');
    const emptyMsg = document.getElementById('empty-msg');
    todoList.innerHTML = '';

    if (list.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
    }

    list.forEach((todo, index) => {
        todoList.innerHTML += `
            <li class="border p-2 mb-2 flex justify-between items-center rounded">
                <span>
                  <strong>${todo.task}</strong> 
                  <small class="text-sm text-gray-500">${todo.date}</small>
                </span>
                <button type="button" class="remove-btn text-red-500" onclick="removeTodo(${index})">Remove</button>
            </li>`;
    });
}

function removeTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Delete All
function deleteAllTodos() {
    if (confirm("Are you sure you want to delete all todos?")) {
        todos = [];
        renderTodos();
    }
}

//  Filter Todos (by date)
function filterTodos() {
    const filterDate = document.getElementById('filter-date').value;

    if (filterDate === "") {
        renderTodos(); // tampilkan semua
        return;
    }

    const filtered = todos.filter(todo => todo.date === filterDate);
    renderTodos(filtered);
}

  function validateInput(text, date) {
  if (!text && !date) {
    alert("Task dan Date tidak boleh kosong!");
    return false;
  }
  if (!text) {
    alert("Task tidak boleh kosong!");
    return false;
  }
  if (!date) {
    alert("Date tidak boleh kosong!");
    return false;
  }
  return true;
}


