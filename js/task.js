
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
            ${task.text}
          </div>
          <div class="task-actions">
            <input type="checkbox" class="task-checkbox" data-index="${index}" ${
          task.done ? "checked" : ""
        } />
            <button class="delete-button" data-index="${index}">Delete</button>
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
      tasks.push({ text: taskText, done: false });
      saveTasksToLocalStorage();
      renderTasks();
      taskInput.value = "";
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

  searchInput.addEventListener("input", function () {
    renderTasks();
  });
});


