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
    datetime: datetimeText,
    isEditing: false,
    completed: false,
  };

  if (taskText.trim() === "") {
    alert('Please enter a task!')
  }
  else { 
    tasksList.push(taskObject);

    renderTodoList();
    newTaskInput.value = '';
  }; 
};

/* Function to display the inputs from TasksList array on the screen */
function renderTodoList(tasksToDisplay = tasksList) {
  let pendingHTML = `<h2>PENDING</h2>`;
  let completedHTML = `<h2>COMPLETE</h2>`;


  for (let i = 0; i < tasksToDisplay.length; i++) {
    const taskObject = tasksToDisplay[i];
    const task = taskObject.task;
    const isEditing = taskObject.isEditing;
    const completed = taskObject.completed;

    const dateValue = new Date(taskObject.datetime);

    const dateOptions = { month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit' };

    const prettyDate = dateValue.toLocaleDateString('en-US', dateOptions);
    const prettyTime = dateValue.toLocaleTimeString('en-US', timeOptions);

    const humanFriendlyDate = `${prettyDate} at ${prettyTime}`;

    let currentTaskHTML = "";

  if (isEditing === false) {
     
    currentTaskHTML += `

    <div class="task-card color-${i % 5} ${completed ? 'completed-task' : ''}"
        id="taskName">
        <img src="./image/calendar.png" class="calendar-img">
        <p class="task-name">${task}</p>
        <span class="task-datetime">${humanFriendlyDate}</span>
        <input type="checkbox" ${completed ? 'checked' : ''} onchange="toggleComplete(${i})">

        <div class="dots-option">
          <div id="options-${i}" class="hidden">
            <button onclick="editTask(${i})">edit</button>
            <button onclick="deleteTask(${i})">delete</button>
          </div>
        </div>

        <img src="./image/dots.png" class="dots-img" id="dots"
        onclick=" dotsOptions(${i})"
        >
    </div>
    `
    }

    else {
    currentTaskHTML += `
      <div class="task-card" id="taskName">
          <img src="./image/calendar.png" class="calendar-img">
          
          <input type="text" 
            class="edit-input-text" 
            id="edit-input-${i}"
            value="${task}">

          <input type="datetime-local" 
            class="edit-input-date" 
            id="edit-datetime-${i}"
            value="${taskObject.datetime}">

          <button class="done-button-js" onclick="updateTask(${i})">done</button>


          <div class="dots-option">
            <div id="options-${i}" class="hidden">
              <button onclick="editTask(${i})">edit</button>
              <button onclick="deleteTask(${i})">delete</button>
            </div>
          </div>

          <img src="./image/dots.png" class="dots-img" id="dots"
          onclick=" dotsOptions(${i})"
          >
      </div>
      `
  } 
    if (completed === false) {
      pendingHTML += currentTaskHTML;
    }

    else if (completed === true ){
      completedHTML += currentTaskHTML;
    }
      
    document.querySelector('.pending-tasks').innerHTML = pendingHTML;
    document.querySelector('.completed-tasks').innerHTML = completedHTML;

  }}; 
 
/* Eventlistener for task and datetime button */
const inputElementTask = document.querySelector('.text-input-js');
const inputElementTimedate = document.querySelector('.datetime-input-js');

inputElementTask.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

inputElementTimedate.addEventListener('keydown', (event) => { 
  if (event.key === 'Enter') {
    addTask();
  }
})
;


/* Setting todays date and time as default for datetime input */
const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const date = now.getDate().toString().padStart(2, '0');

const defaultTime = "00:00";

const formattedDateTime = `${year}-${month}-${date}T${defaultTime}`;
document.querySelector('.datetime-input-js').value = formattedDateTime;

/* Options when clicking on dots */
function dotsOptions(index) {
  document.getElementById(`options-${index}`).classList.toggle('show');
  };

/* Function to delete task from array */
function deleteTask(index) {
  tasksList.splice(index, 1);

  renderTodoList();
};

/* Function to edit task from */
function editTask(index) {
  tasksList[index].isEditing = true;
  renderTodoList();
}; 

function updateTask(index) {
  const newTaskName = document.getElementById(`edit-input-${index}`).value;
  const newDate = document.getElementById(`edit-datetime-${index}`).value;

  tasksList[index].task = newTaskName;
  tasksList[index].datetime = newDate;

  tasksList[index].isEditing = false;

  renderTodoList();
}; 

/* Function to toggle the checkbox value */
function toggleComplete(index) {
  tasksList[index].completed = !tasksList[index].completed;

  renderTodoList();
};

/* Function for search */
function filterItems () {
  let input = document.getElementById('searchBar').value.toLowerCase();
  let filteredTasks = [];

  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].task.toLowerCase().includes(input)) {
      filteredTasks.push(tasksList[i]);
      renderTodoList(filteredTasks);
    }
  }};

/* Eventlistener for search bar */
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', filterItems);

/* Function for sorting */
function applySort() {
const sort = document.getElementById('sortOptions').value;
let sortedTasks = []

if (sort === 'az') {
  tasksList.sort((a,b) => {
    return a.task.localeCompare(b.task);
  });
}
else if (sort === 'za') {
  tasksList.sort((b,a) => {
    return a.task.localeCompare(b.task);
  });
  }
else if (sort === 'newest') {
  tasksList.sort((b,a) => {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);

    return dateB - dateA;
  });
  }
else if (sort === 'oldest') {
  tasksList.sort((a,b) => {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);

    return dateB - dateA;
  });
  }
  renderTodoList();
};


