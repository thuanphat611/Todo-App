"use strict";
const currentTaskNav = document.querySelectorAll('.nav-item')[0];
const completedTaskNav = document.querySelectorAll('.nav-item')[1];
const addBtn = document.querySelector('.add-button');
const closeModalBtn = document.querySelector('.close-modal');
const myModal = document.querySelector('.modal');
const addTaskBtn = document.querySelector('.save-btn');
const changeTab = () => {
    console.log('change');
    currentTaskNav.classList.toggle('active');
    completedTaskNav.classList.toggle('active');
};
const toggleModal = () => {
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
    toggleModal();
});
currentTaskNav === null || currentTaskNav === void 0 ? void 0 : currentTaskNav.addEventListener('click', () => { changeTab(); });
completedTaskNav === null || completedTaskNav === void 0 ? void 0 : completedTaskNav.addEventListener('click', () => { changeTab(); });
