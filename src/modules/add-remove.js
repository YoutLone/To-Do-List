const ClearButton = () => {
  const todoList = document.getElementById('todo-list');
  const clearSect = document.createElement('div');
  clearSect.className = 'clearSect';
  const clear = document.createElement('button');
  clear.innerText = 'Clear all completed';
  clear.className = 'clear-task';
  clearSect.appendChild(clear);
  todoList.appendChild(clearSect);
};

ClearButton();

class List {
  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push(task);
    this.appendToDom(task);
    this.updateLocalStorage();
  }

  get() {
    return this.tasks;
  }

  remove(task) {
    const index = task.index - 1;
    this.tasks.splice(index, 1);
    this.updateIndex(index);
    this.updateLocalStorage();
    this.reload();
  }

  appendToDom(task) {
    const sect = document.getElementById('task-list');
    const div = document.createElement('div');
    div.className = 'item';

    const createInput = (type, className, value, eventListener) => {
      const input = document.createElement('input');
      input.type = type;
      input.className = className;
      input.value = value;
      if (eventListener) {
        input.addEventListener('change', eventListener);
      }
      return input;
    };

    const p = createInput('text', 'task', task.description, () => {
      if (p.value !== '') {
        this.tasks[this.tasks.indexOf(task)].description = p.value;
        this.updateLocalStorage();
        p.blur();
      }
    });

    const input = createInput('checkbox', 'checkbox', null, () => {
      p.blur();
      const currentTask = this.tasks[this.tasks.indexOf(task)];
      currentTask.checked = !currentTask.checked;
      p.classList.toggle('checked');
      this.updateLocalStorage();
    });
    input.checked = task.checked;

    const createIcon = (className, eventListener) => {
      const icon = document.createElement('i');
      icon.className = `fa-solid ${className}`;
      icon.classList.add('ellipse', 'drag');
      if (eventListener) {
        icon.addEventListener('mousedown', eventListener);
      }
      return icon;
    };

    const ellipse = createIcon('fa-ellipsis-vertical');

    const rm = createIcon('fas fa-trash-alt pointer', () => {
      this.remove(task);
    });
    rm.style.display = 'none';

    const toggleSelection = () => {
      ellipse.style.display = 'block';
      rm.style.display = 'none';
      div.classList.toggle('selected');
      p.classList.toggle('selected');
    };

    p.addEventListener('blur', toggleSelection);
    p.addEventListener('focus', () => {
      div.classList.toggle('selected');
      p.classList.toggle('selected');
      ellipse.style.display = 'none';
      rm.style.display = 'block';
    });
    p.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && p.value !== '') {
        this.tasks[this.tasks.indexOf(task)].description = p.value;
        this.updateLocalStorage();
        p.blur();
      }
    });
    div.addEventListener('click', () => {
      p.focus();
    });

    div.appendChild(input);
    div.appendChild(p);
    div.appendChild(ellipse);
    div.appendChild(rm);
    sect.appendChild(div);
  }

  updateIndex(start) {
    for (let i = start; i < this.tasks.length; i += 1) {
      this.tasks[i].index -= 1;
    }
  }

  reload() {
    const sect = document.getElementById('task-list');
    sect.innerHTML = '';
    this.tasks.forEach((task) => {
      this.appendToDom(task);
    });
  }

  reset() {
    this.tasks = [];
    this.updateLocalStorage();
    this.reload();
  }

  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

export default List;
