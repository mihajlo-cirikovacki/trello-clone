'use strict';

const trello = document.querySelector('.trello');
const todoLists = document.querySelectorAll('.trello__todo-list');

let todoNum = 0;
let startTodoNum;
const todos = [];

// ================== FUNCTIONS:

// == Add to local storage:
const safeLocalTodos = function(todo) {
  let todos;
  
  // Check:
  if (!localStorage.getItem('todos')) todos = [];
    else todos = JSON.parse(localStorage.getItem('todos'));

  // If exist push:
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos)); 
}

// == Render Todo:
const renderTodo = function(todoList) {
  // Create todo element:
  const todo = document.createElement('li');
  todo.classList.add('trello__todo');
  todoList.append(todo);

  const html = `
    <textarea type="text" class="trello__todo-text"></textarea>
  `;

  // Add textarea:
  todo.insertAdjacentHTML('afterbegin', html);
}

// == Save Todo:
const saveTodo = function(textareaValue, todoList) {
  // Create todo:
  const todo = document.createElement('li');
  todo.classList.add('trello__todo-saved');
  todo.setAttribute('data-index', todoNum);
  todo.draggable ="true";
  todoList.append(todo);
  
  const html = `
    <p draggable="true">${textareaValue}</p>
  `;

  // Add textarea:
  todo.insertAdjacentHTML('afterbegin', html);

  // Delete text area:
  todo.previousElementSibling.remove();
  todoNum++;
  todos.push(todo);

  // Safe local todos:
  safeLocalTodos(textareaValue);
}

// == Get Todos from local storage:
const getTodos = function() {
  let todos;

  // Check:
  if (!localStorage.getItem('todos')) todos = [];
    else todos = JSON.parse(localStorage.getItem('todos'));
  
  //console.log(todos);
  //todos.forEach(todo => saveTodo(todo,));  
};

// ================== EVENT LISTENERS:
// == Add Todo:
trello.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.trello__add-item');
  if(!addBtn) return;
  const trelloItem = addBtn.closest('.trello__item');
  const todoList = trelloItem.querySelector('.trello__todo-list');
  
  // Render Todo:
  renderTodo(todoList);
  addBtn.classList.toggle('hidden');
  addBtn.nextElementSibling.classList.toggle('hidden');
  addBtn.nextElementSibling.style.marginLeft = 'auto';
  todoList.classList.toggle('first-in-order');
});

// == Save Todo:
trello.addEventListener('click', (e) => {
  const saveBtn = e.target.closest('.trello__save-item');
  if(!saveBtn) return;
  const trelloItem = saveBtn.closest('.trello__item');
  const textarea = trelloItem.querySelector('.trello__todo-text');
  const todoList = trelloItem.querySelector('.trello__todo-list');
  const addBtn = trelloItem.querySelector('.trello__add-item');
  const buttons = trelloItem.querySelector('.trello__buttons');
  // Save Todo:
  saveTodo(textarea.value, todoList);
  // Delete button:
  saveBtn.classList.toggle('hidden');
  // Add add button:
  addBtn.classList.toggle('hidden');
  buttons.classList.add('first-in-order');
});

// == Get Todos from local storage:
document.addEventListener('DOMContentLoaded', getTodos);


// ==================== DRAG AND DROP

// == Drag Start:
const dragStart = function(todo) {
  startTodoNum = +todo.getAttribute('data-index');
}

// == Drag Over:
const dragOver = function(e) {
  e.preventDefault(); 
}

// == Swap:
const swapTodos = function(startTodoNum, toTodoNum) {
  const todoOne = todos[startTodoNum];
  const todoTwo = todos[toTodoNum];
  const todoOneLi = todoOne.closest('.trello__todo-list');
  const todoTwoLi = todoTwo.closest('.trello__todo-list');
  // Now swap in DOM:
  todoOneLi.append(todoTwo);
  todoTwoLi.append(todoOne);
}

// == Drag drop:
const dragDrop = function() {
  const toTodoNum = +this.querySelector('.trello__todo-saved').getAttribute('data-index');
  swapTodos(startTodoNum, toTodoNum);
}

// ========== EVENT LISTENERS:
trello.addEventListener('dragstart', (e) => {
  const todo = e.target.closest('.trello__todo-saved');
  if(!todo) return;
  dragStart(todo);
});

todoLists.forEach(todo => {
  todo.addEventListener('dragover', dragOver);
  todo.addEventListener('drop', dragDrop);
})





