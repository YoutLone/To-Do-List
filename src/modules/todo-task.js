class TodoTask {
  constructor(description, index) {
    this.description = description;
    this.checked = false;
    this.index = index;
  }

  check() {
    this.checked = !this.checked;
  }

  updateDescription(description) {
    this.description = description;
  }
}

export default TodoTask;
