import TodoTask from './todo-task.js';
import List from './add-remove.js';

document.body.innerHTML = `
<section id="task-list"></section>
`;

const list = new List();
const task = new TodoTask('test', 1);

describe('Add task', () => {
  beforeEach(() => {
    list.add(task);
  });

  test('Add task to todo list', () => {
    expect(list.tasks).toContain(task);
  });

  test('Add task to DOM', () => {
    const div = document.querySelector('.item');
    expect(div).not.toBeNull();
  });

  test('Add task to local storage', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[0]).toEqual(task);
  });

  afterEach(() => {
    list.remove(task);
  });
});

describe('Remove task', () => {
  beforeEach(() => {
    list.remove(task); // Ensure the task is removed from the list
  });

  test('Remove task from todo list', () => {
    expect(list.tasks).not.toContain(task);
  });

  test('Remove task from DOM', () => {
    const div = document.querySelector('.item');
    expect(div).toBeNull(); // Check if the div is null after removal
  });

  test('Remove task from local storage', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks).not.toContain(task);
  });

  afterEach(() => {
    list.add(task);
  });
});
