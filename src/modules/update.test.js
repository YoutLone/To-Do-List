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
    const newDescription = 'new test';
    list.tasks[0].updateDescription(newDescription);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[0].description).toBe(newDescription);
  });

  // Additional test for editing function
  test('Edit task description', () => {
    const editedDescription = 'edited test';
    const index = 0;
    list.editTaskDescription(index, editedDescription);
    expect(list.tasks[index].description).toBe(editedDescription);
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
    list.tasks[0].check();
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[0].checked).toBeTruthy();
  });

  // Additional test for editing completed task
  test('Edit completed task', () => {
    const index = 0;
    list.editCompletedTask(index);
    expect(list.tasks[index].checked).toBeFalsy();
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
    list.tasks[0].check();
    list.tasks[1].check();
    list.clearCompleted();
    expect(list.tasks.length).toBe(1);
  });

  test('clear completed task from local storage', () => {
    list.tasks[0].check();
    list.tasks[1].check();
    list.clearCompleted();
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks.length).toBe(1);
  });

  // Additional test for clear all completed function
  test('Clear all completed tasks', () => {
    list.tasks[0].check();
    list.tasks[1].check();
    list.tasks[2].check();
    list.clearAllCompleted();
    expect(list.tasks.length).toBe(0);
  });
});
