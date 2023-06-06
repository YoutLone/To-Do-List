import './style.css';

const list = [
  {
    index: 1,
    description: 'Wash the dishes',
    checked: false,
  },
  {
    index: 2,
    description: 'Complete to do list project',
    checked: true,
  },
];

const todoList = document.getElementById('todo-list');

function createTaskElement(task) {
  const div = document.createElement('div');
  div.className = 'task';

  const input = document.createElement('input');
  input.classList.add('checkbox');
  input.type = 'checkbox';
  input.checked = task.checked;

  const p = document.createElement('p');
  p.innerText = task.description;

  const ellipse = document.createElement('i');
  ellipse.className = 'fa-solid fa-ellipsis-vertical';
  ellipse.classList.add('ellipse');

  div.appendChild(input);
  div.appendChild(p);
  div.appendChild(ellipse);

  return div;
}

list.forEach((task) => {
  const taskElement = createTaskElement(task);
  todoList.appendChild(taskElement);
});

const clearSect = document.createElement('div');
clearSect.className = 'clearSect';

const clear = document.createElement('button');
clear.innerText = 'Clear all completed';
clear.className = 'clear';
clearSect.appendChild(clear);

todoList.appendChild(clearSect);
