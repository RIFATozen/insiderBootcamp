$(document).ready(() => {
  const addTask = () => {
    const taskText = $("#input").val().trim();

    if (taskText !== "") {
      const $li = $("<li>").addClass("todo-item");
      const $taskContent = $("<span>").text(taskText);
      const $actions = $("<div>").addClass("todo-actions");

      const $completeBtn = $("<button>")
        .addClass("complete-btn")
        .text("Complete");

      const $deleteBtn = $("<button>").addClass("delete-btn").text("Delete");

      $actions.append($completeBtn, $deleteBtn);
      $li.append($taskContent, $actions);
      $("#list").append($li);

      $("#input").val("");
    }
  };

  $("#add").on("click", addTask);

  $("#input").on("keypress", (e) => {
    if (e.which === 13) {
      addTask();
    }
  });

  $("#list").on("click", ".complete-btn", (e) => {
    $(e.target).closest(".todo-item").toggleClass("completed");
  });

  $("#list").on("click", ".delete-btn", (e) => {
    $(e.target)
      .closest(".todo-item")
      .fadeOut(300, () => {
        $(e.target).remove();
      });
  });
});
