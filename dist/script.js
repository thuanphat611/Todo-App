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
let currentTab = 1;
let currentTaskList = [];
let completedTaskList = [
    {
        id: 1700468638409,
        title: "Learn TypeScript",
        date: "2023-11-20",
        content: "Learn TypeScript and do a simple project",
        isCompleted: true
    }
];
const moveTask = (src, dest, id) => {
    const task = src.filter((task) => task.id === id)[0];
    task.isCompleted = !task.isCompleted;
    dest.push(task);
    let taskIndex = -1;
    src.forEach((task, i) => {
        if (task.id === id)
            taskIndex = i;
    });
    src.splice(taskIndex, 1);
    refreshTaskList(src);
};
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
        taskCheckBox.checked = task.isCompleted;
        if (task.isCompleted) {
            taskCheckBox.addEventListener('click', () => {
                moveTask(completedTaskList, currentTaskList, task.id);
            });
        }
        else {
            taskCheckBox.addEventListener('click', () => {
                moveTask(currentTaskList, completedTaskList, task.id);
            });
        }
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
        content: formText === null || formText === void 0 ? void 0 : formText.value,
        isCompleted: false
    };
    const date = (formDate === null || formDate === void 0 ? void 0 : formDate.value) || new Date();
    if (typeof date === "string")
        task.date = date;
    else {
        let dateText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        task.date = dateText;
    }
    list.push(task);
};
const formValidCheck = () => {
    if (!formTitle || formTitle.value.length === 0)
        return false;
    if (!formText || formText.value.length === 0)
        return false;
    if (!formDate || formDate.value.length == 0)
        return false;
    return true;
};
const clearForm = () => {
    if (formTitle)
        formTitle.value = '';
    if (formText)
        formText.value = '';
    if (formDate)
        formDate.value = '';
};
const changeTab = (e) => {
    if (e.target === completedTaskNav && currentTab === 1) {
        currentTaskNav.classList.toggle('active');
        completedTaskNav.classList.toggle('active');
        currentTab = 2;
    }
    if (e.target === currentTaskNav && currentTab === 2) {
        currentTaskNav.classList.toggle('active');
        completedTaskNav.classList.toggle('active');
        currentTab = 1;
    }
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
    if (formValidCheck()) {
        addTask(currentTaskList);
        refreshTaskList(currentTaskList);
        toggleModal();
    }
});
currentTaskNav === null || currentTaskNav === void 0 ? void 0 : currentTaskNav.addEventListener('click', (e) => {
    changeTab(e);
    refreshTaskList(currentTaskList);
});
completedTaskNav === null || completedTaskNav === void 0 ? void 0 : completedTaskNav.addEventListener('click', (e) => {
    changeTab(e);
    refreshTaskList(completedTaskList);
});
