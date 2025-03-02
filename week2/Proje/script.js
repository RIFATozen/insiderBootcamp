document.addEventListener("DOMContentLoaded", () => {
  let tasks = [];
  const taskForm = document.getElementById("taskForm");
  const showCompletedBtn = document.getElementById("showCompleted");
  const sortByPriorityBtn = document.getElementById("sortByPriority");
  const taskList = document.getElementById("taskList");

  let showError = (message) => {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = message;
    setTimeout(() => {
      errorDiv.textContent = "";
    }, 3000);
  };

  let validateForm = (title, description, priority) => {
    if (!title.trim() || !description.trim()) {
      showError("Başlık ve açıklama girmeniz gereklidir!");
      return false;
    }
    if (!priority) {
      showError("Lütfen bir öncelik seviyesi seçin!");
      return false;
    }
    return true;
  };

  let renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.className = `task-item priority-${task.priority}${
        task.completed ? " completed" : ""
      }`;
      taskElement.dataset.id = task.id;

      taskElement.innerHTML = `
                <div class="task-content">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <small>Öncelik: ${task.priority}</small>
                </div>
                <div class="task-actions">
                    <button class="complete-btn">${
                      task.completed ? "Geri al" : "Tamamlandı"
                    }</button>
                    <button class="delete-btn">Sil</button>
                </div>
            `;
      taskList.appendChild(taskElement);
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      const title = document.getElementById("taskTitle").value;
      const description = document.getElementById("taskDescription").value;
      const priority = document.querySelector('input[name="priority"]:checked');

      if (!validateForm(title, description, priority)) {
        return;
      }

      const task = {
        id: Date.now(),
        title: title,
        description: description,
        priority: priority.value,
        completed: false,
      };

      tasks.push(task);
      renderTasks();
      e.target.reset();
    } catch (error) {
      showError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(error);
    }
  };

  let handleTaskActions = (e) => {
    e.stopPropagation();
    const taskElement = e.target.closest(".task-item");
    if (!taskElement) return;

    const taskId = Number(taskElement.dataset.id);
    const task = tasks.find((t) => t.id === taskId);

    if (e.target.classList.contains("complete-btn")) {
      task.completed = !task.completed;
    } else if (e.target.classList.contains("delete-btn")) {
      tasks = tasks.filter((t) => t.id !== taskId);
    }

    renderTasks();
  };

  let toggleCompletedTasks = () => {
    const taskElements = document.querySelectorAll(".task-item");
    taskElements.forEach((task) => {
      if (!task.classList.contains("completed")) {
        task.style.display = task.style.display === "none" ? "flex" : "none";
      }
    });
  };

  let sortTasks = () => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    renderTasks();
  };

  taskForm.addEventListener("submit", handleSubmit);
  showCompletedBtn.addEventListener("click", toggleCompletedTasks);
  sortByPriorityBtn.addEventListener("click", sortTasks);
  taskList.addEventListener("click", handleTaskActions);
});
