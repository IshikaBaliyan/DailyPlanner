document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const searchInput = document.getElementById("searchInput");
  const taskList = document.getElementById("taskList");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    const searchTerm = searchInput.value.toLowerCase();
    tasks.forEach((task, index) => {
      if (task.text.toLowerCase().includes(searchTerm)) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
          <div class="task-text">
          <input type="checkbox" class="task-checkbox" data-index="${index}" ${
            task.done ? "checked" : ""
          } />
          <span class="todo-itemtext ${task.done}" >
            ${task.text}
            </span>
          </div>
          
          <div class="task-actions">
            
            <button class="delete-button" data-index="${index}">Delete</button>
            <button class="update-button" data-index="${index}">Update</button>
          </div>
        `;
        taskList.appendChild(taskItem);
      }
    });
  }

  renderTasks();

  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const updateIndex = taskInput.dataset.updateIndex;
      if (updateIndex !== undefined) {
        // If updating, remove the previous task
        tasks.splice(updateIndex, 1);
        delete taskInput.dataset.updateIndex;
      }
      tasks.push({ text: taskText, done: false });
      saveTasksToLocalStorage();
      renderTasks();
      taskInput.value = "";
      addTaskButton.textContent = "Add Task";
    }
  });

  taskList.addEventListener("change", function (e) {
    if (e.target.classList.contains("task-checkbox")) {
      const index = parseInt(e.target.dataset.index);
      tasks[index].done = e.target.checked;
      saveTasksToLocalStorage();
      renderTasks();
    }
  });

  taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-button")) {
      const index = parseInt(e.target.dataset.index);
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
      renderTasks();
    }
  });

  taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("update-button")) {
      const index = parseInt(e.target.dataset.index);
      taskInput.value = tasks[index].text; // Set the task text in the input box
      taskInput.dataset.updateIndex = index; // Store the index for updating
      addTaskButton.textContent = "Update Task";
    }
  });

  searchInput.addEventListener("input", function () {
    renderTasks();
  });
});
