"use strict";
const currentTaskNav = document.querySelectorAll('.nav-item')[0];
const completedTaskNav = document.querySelectorAll('.nav-item')[1];
const addBtn = document.querySelector('.add-button');
const closeModalBtn = document.querySelector('.close-modal');
const myModal = document.querySelector('.modal');
const addTaskBtn = document.querySelector('.save-btn');
const formTitle = document.querySelector('.title-input');
const formText = document.querySelector('.text-input');
const formDate = document.querySelector('.date-input');
const taskList = document.querySelector('.task-list');
let CurrentTaskList = [];
let completedTaskList = [];
const refreshTaskList = (list) => {
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
        taskList === null || taskList === void 0 ? void 0 : taskList.append(taskItem);
    });
};
const addTask = (list) => {
    if (!formTitle || formTitle.value.length === 0)
        return;
    if (!formText || formText.value.length === 0)
        return;
    let task = {
        id: Date.now(),
        title: formTitle === null || formTitle === void 0 ? void 0 : formTitle.value,
        date: "",
        content: formText === null || formText === void 0 ? void 0 : formText.value
    };
    const date = (formDate === null || formDate === void 0 ? void 0 : formDate.value) || new Date();
    if (typeof date === "string")
        task.date = date;
    else {
        let dateText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        task.date = dateText;
    }
    list.push(task);
    console.log(list);
};
const clearForm = () => {
    if (formTitle)
        formTitle.value = '';
    if (formText)
        formText.value = '';
    if (formDate)
        formDate.value = '';
};
const changeTab = () => {
    console.log('change');
    currentTaskNav.classList.toggle('active');
    completedTaskNav.classList.toggle('active');
};
const toggleModal = () => {
    clearForm();
    myModal === null || myModal === void 0 ? void 0 : myModal.classList.toggle("no-display");
};
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", () => {
    toggleModal();
});
closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.addEventListener("click", () => {
    toggleModal();
});
addTaskBtn === null || addTaskBtn === void 0 ? void 0 : addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTask(CurrentTaskList);
    refreshTaskList(CurrentTaskList);
    toggleModal();
});
currentTaskNav === null || currentTaskNav === void 0 ? void 0 : currentTaskNav.addEventListener('click', () => { changeTab(); });
completedTaskNav === null || completedTaskNav === void 0 ? void 0 : completedTaskNav.addEventListener('click', () => { changeTab(); });
