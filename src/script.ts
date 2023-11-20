const currentTaskNav = document.querySelectorAll('.nav-item')[0];
const completedTaskNav = document.querySelectorAll('.nav-item')[1];

const addBtn = document.querySelectorAll('.nav-button')[0];
const clearBtn = document.querySelectorAll('.nav-button')[1];
const closeModalBtn = document.querySelector('.close-modal');
const myModal = document.querySelector<HTMLDivElement>('.modal');
const addTaskBtn = document.querySelector('.save-btn');

const formTitle = document.querySelector<HTMLInputElement>('.title-input');
const formText = document.querySelector<HTMLTextAreaElement>('.text-input');
const formDate = document.querySelector<HTMLInputElement>('.date-input');

const taskList = document.querySelector<HTMLUListElement>('.task-list');

let currentTab: 1 | 2 = 1;//1: currentTask, 2: completedTask
interface Task {
  id: number;
  title: string,
  date: string,
  content: string,
  isCompleted: boolean
}

let currentTaskList: Task[] = [];
let completedTaskList: Task[] = [
  {
  id: 1700468638409,
  title: "Learn TypeScript",
  date:"2023-11-20",
  content:"Learn TypeScript and do a simple project",
  isCompleted: true
  }
];

const clearCompleted = (): void => {
  completedTaskList = [];
  refreshTaskList(completedTaskList);
};

const moveTask = (src: Task[], dest: Task[], id: number): void => {
  const task = src.filter((task) => task.id === id)[0];

  task.isCompleted = !task.isCompleted;
  dest.push(task);
  let taskIndex = -1;
  src.forEach((task, i) => {
    if (task.id === id)
    taskIndex = i;
  });
  src.splice(taskIndex,1);
  setTimeout(() => refreshTaskList(src), 100);
};

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
    taskCheckBox.checked = task.isCompleted;

    if (task.isCompleted) {
      taskCheckBox.addEventListener('click', () => {
        taskItem.style.animation = "fade-out 0.1s ease-out forwards"
        moveTask(completedTaskList, currentTaskList, task.id)
      });
    }
    else {
      taskCheckBox.addEventListener('click', () => {
        taskItem.style.animation = "fade-out 0.1s ease-out forwards"
        moveTask(currentTaskList, completedTaskList, task.id)
      });
    }
  
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
    content: formText?.value,
    isCompleted: false
  }
  
  const date = formDate?.value || new Date();

  if (typeof date === "string") 
    task.date = date;
  else {
    let dateText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    task.date = dateText;
  }
  list.push(task);
};

const formValidCheck = (): boolean => {
  if (!formTitle || formTitle.value.length === 0)
    return false;
  if (!formText || formText.value.length === 0)
    return false;
  if (!formDate || formDate.value.length == 0)
    return false;
  return true;
};

const clearForm = (): void => {
  if (formTitle) 
    formTitle.value = '';
  if (formText) 
    formText.value = '';
  if (formDate)
    formDate.value = '';
};

const changeTab = (e: any): void => {
  if (e.target === completedTaskNav && currentTab === 1) {
    currentTaskNav.classList.toggle('active');
    completedTaskNav.classList.toggle('active');
    currentTab = 2;
    addBtn?.classList.toggle('no-display');
    clearBtn?.classList.toggle('no-display');
  }
  if (e.target === currentTaskNav && currentTab === 2) {
    currentTaskNav.classList.toggle('active');
    completedTaskNav.classList.toggle('active');
    currentTab = 1;
    addBtn?.classList.toggle('no-display');
    clearBtn?.classList.toggle('no-display');
  }
};

const toggleModal = (): void => {
    clearForm();
    myModal?.classList.toggle("no-display");
};

addBtn?.addEventListener("click", () => {
  toggleModal();
});

clearBtn?.addEventListener("click", () => {
  clearCompleted();
});

closeModalBtn?.addEventListener("click", () => {
  toggleModal();
});

addTaskBtn?.addEventListener('click', (e) => {
  e.preventDefault();

  if (formValidCheck()) {
    addTask(currentTaskList);
    refreshTaskList(currentTaskList);
    toggleModal();
  }
});

currentTaskNav?.addEventListener('click', (e) => { 
  changeTab(e);
  refreshTaskList(currentTaskList);
});
completedTaskNav?.addEventListener('click', (e) => { 
  changeTab(e);
  refreshTaskList(completedTaskList);
});