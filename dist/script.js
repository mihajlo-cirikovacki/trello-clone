'use strict';

const trello = document.querySelector('.trello');
//const main = document.querySelector('.main');


// ================== FUNCTIONS:

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
  console.log(textareaValue);
  console.log(todoList);

  // Create todo:
  const todo = document.createElement('li');
  todo.classList.add('trello__todo-saved');
  todoList.append(todo);

  const html = `
    <p>${textareaValue}</p>
  `;

  // Add textarea:
  todo.insertAdjacentHTML('afterbegin', html);

  // Delete text area:
  todo.previousElementSibling.remove();
}



// ================== EVENT LISTENERS:
trello.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.trello__add-item');
  if(!addBtn) return;
  const trelloItem = addBtn.closest('.trello__item');
  const todoList = trelloItem.querySelector('.trello__todo-list');
  
  // Render Todo:
  renderTodo(todoList);
  addBtn.classList.toggle('hidden');
  addBtn.nextElementSibling.style.display = 'block';
  addBtn.nextElementSibling.style.marginLeft = 'auto';
  todoList.classList.toggle('todo-active');
});


trello.addEventListener('click', (e) => {
  const saveBtn = e.target.closest('.trello__save-item');
  if(!saveBtn) return;
  const trelloItem = saveBtn.closest('.trello__item');
  const textarea = trelloItem.querySelector('.trello__todo-text');
  const todoList = trelloItem.querySelector('.trello__todo-list');
  // Save Todo:
  saveTodo(textarea.value, todoList);
  // Delete button:
  saveBtn.remove();
});











//# sourceMappingURL=script.js.map
