/* TasksList array */
let tasksList = [];

/* Function to push input into the TasksList array */
function addTask() {
  let newTaskInput = document.querySelector('.text-input-js');
  let newDateTimeInput = document.querySelector('.datetime-input-js');

  let taskText = newTaskInput.value;
  let datetimeText = newDateTimeInput.value;

  const taskObject = {
    task: taskText,
    datetime: datetimeText
  };

  tasksList.push(taskObject);
  console.log(tasksList);

  renderTodoList();
  newTaskInput.value = '';
};

/* Function to display the inputs from TasksList array on the screen */
function renderTodoList() {
  let todoListHTML = "";

  for (let i = 0; i < tasksList.length; i++) {
    const taskObject = tasksList[i];

    const task = taskObject.task;
    const datetime = taskObject.datetime.replace('T', ' ');

    todoListHTML +=
    `<p>${task} ${datetime} </p>`;
  }
  document.querySelector('.todo-list-display').innerHTML = todoListHTML;

  todoListHTML
};

const inputElement = document.querySelector('.text-input-js');

inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

/* Setting todays date and time as default for datetime input */
const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const date = now.getDate().toString().padStart(2, '0');
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');

const formattedDateTime = `${year}-${month}-${date}T${hours}:${minutes}`;
document.querySelector('.datetime-input-js').value = formattedDateTime;
