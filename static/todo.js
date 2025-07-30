function addTask() {
  const text = document.getElementById("taskText").value.trim();
  if (text === "") return;

  const task = document.createElement("div");
  task.className = "task-card";
  task.draggable = true;
  task.textContent = text;
  task.id = "task-" + Date.now();

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    task.remove();
  };
  task.appendChild(deleteBtn);

  addDragEvents(task);

  // Append to backlog
  document.querySelector("#backlog .task-container").appendChild(task);
  document.getElementById("taskText").value = "";
}

function addDragEvents(task) {
  task.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
}

document.querySelectorAll(".task-card").forEach((task) => {
  addDragEvents(task);
  addDeleteButton(task); // for existing tasks
});

function addDeleteButton(task) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    task.remove();
  };
  task.appendChild(deleteBtn);
}

document.querySelectorAll(".task-container").forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    container.classList.add("drag-over");
  });

  container.addEventListener("dragleave", () => {
    container.classList.remove("drag-over");
  });

  container.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const task = document.getElementById(id);
    container.appendChild(task);
    container.classList.remove("drag-over");
  });
});
