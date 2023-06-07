import './style.css';
import List from './modules/add-remove.js';

const list = new List();

function loadTasksFromLocalStorage() {
  if (localStorage.getItem('tasks')) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => {
      const newTask = {
        description: task.description,
        index: task.index,
        checked: task.checked,
      };
      list.add(newTask);
    });
  }
}

function handleAddTask(event) {
  const add = event.target;
  if (event.key === 'Enter' && add.value !== '') {
    const newTask = {
      description: add.value,
      index: list.tasks.length + 1,
      checked: false,
    };
    list.add(newTask);
    add.value = '';
  }
}

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

const add = document.getElementById('input');
add.addEventListener('keydown', handleAddTask);
