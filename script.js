const addbtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class="task">
      <input type="checkbox" class="task-check">
      <span class="taskname">${taskName}</span>
      <button class="edit">
      <i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      <button class="delete">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>`;

  tasksContainer.insertAdjacentHTML("beforeend", task);
  taskCount += 1;
  displayCount(taskCount);

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = () => {
      button.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) {
        targetElement = e.target.
        parentElement;
      }
      newTaskInput.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount -= 0;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });
};

addbtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};
