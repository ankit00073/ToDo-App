let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let add = document.getElementById('add');
let tasks = document.getElementById('tasks');

let data = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

// get the data and show on screen
let showTasks = () => {
  tasks.innerHTML = '';
  data.map((item, index) => {
    return (tasks.innerHTML += `
      <div id=${index}>
      <span class="fw-bold">${item.text}</span>
      <span class="small text-secondary">${item.date}</span>
      <p>${item.description}</p>

      <span class="options">
        <!-- edit -->
        <i
          class="bi bi-pencil-square"
          onclick="editTask(this)"
          data-bs-toggle="modal"
          data-bs-target="#form"
        ></i>

        <!-- delete -->
        <i class="bi bi-trash" onclick="deleteTask(this)"></i>
      </span>
    </div>
      
      `);
  });

  resetForm();
};

let resetForm = () => {
  textInput.value = '';
  dateInput.value = '';
  textarea.value = '';
};

// posting the data
let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem('tasks', JSON.stringify(data));
  showTasks();

  console.log(data);
};

let formValidation = () => {
  if (textInput.value === '') {
    // failure
    msg.innerHTML = '* task title cannot be blank';
  } else {
    // success
    msg.innerHTML = '';
    acceptData();

    // close the modal after submission
    add.setAttribute('data-bs-dismiss', 'modal');
    add.click();

    // IIFE: Immediately Invoked function Expression
    (() => {
      add.setAttribute('data-bs-dismiss', '');
    })();
  }
};

// Delete the task

let deleteTask = (e) => {
  console.log(e.parentElement.parentElement);

  // removing the element from dom , and removing it from the UI
  e.parentElement.parentElement.remove();

  // deleting the element from the data array
  data.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem('tasks', JSON.stringify(data));
  console.log('data array after deletion', data);
};

// let fruits = ['banana', 'cherry', 'apple'];
// // splice(start index, how many elements you want to delete, item1..... itemn)
// fruits.splice(1, 2, 'mango');
// console.log(fruits);

// Editing a task
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  console.log(selectedTask.children[1]);

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  // delete the previous element which you were editing
  deleteTask(e);
};

(() => {
  data = JSON.parse(localStorage.getItem('tasks')) || [];
  showTasks();
})();
