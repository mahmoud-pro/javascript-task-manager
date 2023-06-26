// Define UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const addTaskBtn = document.querySelector('.add-task');

// Load All EventListers
loadEventListeners();

// Load All EventListers
function loadEventListeners(){
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add Task
  form.addEventListener('submit', addTask);
  // Remove Task
  taskList.addEventListener('click', removeTask);
  // Clear Task
  clearBtn.addEventListener('click', clearAllTasks);
  // Filter Task
  filter.addEventListener('keyup', filterTasks);
}

// Get Task From LocalStorage
function getTasks(){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  // Create Text Noad and Append Task Input
  li.appendChild(document.createTextNode(task));
  // Create Link Element
  const link = document.createElement('a');
  // Add Class To Link
  link.className = 'delete-item secondary-content';
  // Add Icon Html
  link.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  // Append Link to li
  li.appendChild(link);
  // Apend li to ul
  taskList.appendChild(li);
  //Store Tasks
  });
}

// Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
    addTaskBtn.preventDefault();
  }

  // Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  // Create Text Noad and Append Task Input
  li.appendChild(document.createTextNode(taskInput.value));
  // Create Link Element
  const link = document.createElement('a');
  // Add Class To Link
  link.className = 'delete-item secondary-content';
  // Add Icon Html
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // Append Link to li
  li.appendChild(link);
  // Apend li to ul
  taskList.appendChild(li);
  //Store Tasks
  storeLocalStorage(taskInput.value);
  // Clear Task Input
  taskInput.value = '';
  // Prevent Sending Form
  e.preventDefault();
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
    }
  }

  // Remove From LocalStorage
  removeFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove From LocalStorage
function removeFromLocalStorage(taskItem){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear All Tasks
function clearAllTasks(){

  // === Method-01 ===
  // taskList.textContent = "";
  // === Method-02 ===
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  clearLocalStorage();
}

// Clear All LocalStorage
function clearLocalStorage(){
  localStorage.clear();
}

// Filter All Tasks

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  })
}

// Store Tasks
function storeLocalStorage(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

