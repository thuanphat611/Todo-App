const currentTaskNav = document.querySelectorAll('.nav-item')[0];
const completedTaskNav = document.querySelectorAll('.nav-item')[1];

const addBtn = document.querySelector('.add-button');
const closeModalBtn = document.querySelector('.close-modal');
const myModal = document.querySelector<HTMLDivElement>('.modal');
const addTaskBtn = document.querySelector('.save-btn');

const formTitle = document.querySelector<HTMLInputElement>('.title-input');
const formText = document.querySelector<HTMLTextAreaElement>('.text-input');
const formDate = document.querySelector<HTMLInputElement>('.date-input');

const taskList = document.querySelector<HTMLUListElement>('.task-list');

interface Task {
  id: number;
  title: string,
  date: string,
  content: string
}

let CurrentTaskList: Task[] = [];
let completedTaskList: Task[] = [];

const refreshTaskList = (list: Task[]): void => {
  if (taskList !== undefined && taskList !== null) {
    taskList.innerHTML = '';
  }
  else
    return;

  list.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskCheckBox = document.createElement('input');
    taskCheckBox.type = 'checkbox';
    taskCheckBox.classList.add('done-checkbox');
    const taskTitle = document.createElement('h3');
    taskTitle.classList.add('task-title');
    const taskDeadline = document.createElement('h3');
    taskDeadline.classList.add('task-deadline');
    const taskContent = document.createElement('p');
    taskContent.classList.add('task-content');

    taskTitle.innerText = task.title;
    taskDeadline.innerText = task.date;
    taskContent.innerText = task.content;
  
    taskItem.append(taskCheckBox);
    taskItem.append(taskTitle);
    taskItem.append(taskDeadline);
    taskItem.append(taskContent);
  
    taskList?.append(taskItem);
  });
  
};

const addTask = (list: Task[]): void => {
  if (!formTitle || formTitle.value.length === 0) 
    return;
  if (!formText || formText.value.length === 0) 
    return;

  let task = {
    id: Date.now(),
    title: formTitle?.value,
    date: "",
    content: formText?.value
  }
  
  const date = formDate?.value || new Date();

  if (typeof date === "string") 
    task.date = date;
  else {
    let dateText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    task.date = dateText;
  }
  list.push(task);
  console.log(list);
};

const clearForm = (): void => {
  if (formTitle) 
    formTitle.value = '';
  if (formText) 
    formText.value = '';
  if (formDate)
    formDate.value = '';
};

const changeTab = (): void => {
  console.log('change');
  currentTaskNav.classList.toggle('active');
  completedTaskNav.classList.toggle('active');
};

const toggleModal = (): void => {
    clearForm();
    myModal?.classList.toggle("no-display");
};

addBtn?.addEventListener("click", () => {
  toggleModal();
});

closeModalBtn?.addEventListener("click", () => {
  toggleModal();
});

addTaskBtn?.addEventListener('click', (e) => {
  e.preventDefault();

  addTask(CurrentTaskList);
  refreshTaskList(CurrentTaskList);

  toggleModal();
});

currentTaskNav?.addEventListener('click', () => { changeTab() });
completedTaskNav?.addEventListener('click', () => { changeTab() });