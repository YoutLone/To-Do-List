import './style.css';
import List from './modules/add-remove.js';
import TodoTask from './modules/todo-task.js';

const list = new List();

function loadTasksFromLocalStorage() {
  if (localStorage.getItem('tasks')) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => {
      const newTask = new TodoTask(task.description, task.index);
      newTask.checked = task.checked;
      list.add(newTask);
    });
  }
}

function handleAddTask(event) {
  const add = event.target;
  if (event.key === 'Enter' && add.value !== '') {
    const newTask = new TodoTask(add.value, list.tasks.length + 1);
    list.add(newTask);
    add.value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  /* eslint-disable */
  ClearButton();
});

const add = document.getElementById('input');
add.addEventListener('keydown', handleAddTask);

const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
  list.reset();
});

function ClearButton() {
  const clearButton = document.querySelector('.clear-task');
  clearButton.addEventListener('click', () => {
    const completedTasks = list.tasks.filter((task) => task.checked);
    completedTasks.forEach((task) => {
      list.remove(task);
    });
  });
}
