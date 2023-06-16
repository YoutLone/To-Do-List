import List from './add-remove.js';
import TodoTask from './todo-task.js';

document.body.innerHTML = `
<section id="task-list"></section>
`;

const list = new List();
const task = new TodoTask('test', 1);

describe('Update task', () => {
  beforeEach(() => {
    list.tasks = [];
    localStorage.clear();
    list.add(task);
  });

  test('Update task description', () => {
    const newDescription = 'new test';
    list.tasks[0].updateDescription(newDescription);
    expect(list.tasks[0].description).toBe(newDescription);
  });

  test('Task will be updated in local storage', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[0].description).toBe('new test');
  });
});

describe('Check task', () => {
  beforeEach(() => {
    list.tasks = [];
    localStorage.clear();
    list.add(task);
  });

  test('check by default', () => {
    expect(list.tasks[0].checked).toBeFalsy();
  });

  test('check', () => {
    list.tasks[0].check();
    expect(list.tasks[0].checked).toBeTruthy();
  });

  test('check in local storage', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[0].checked).toBeTruthy();
  });
});

describe('Clear check', () => {
  beforeEach(() => {
    list.tasks = [];
    localStorage.clear();
    list.add(new TodoTask('test', 2));
    list.add(new TodoTask('test', 3));
    list.add(new TodoTask('test', 4));
  });

  test('clear all completed task', () => {
    list.clearCompleted();
    expect(list.tasks.length).toBe(3);
  });

  test('clear completed task from local storage', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks.length).toBe(3);
  });
});
