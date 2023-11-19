"use strict";
const addBtn = document.querySelector('.add-button');
const closeModalBtn = document.querySelector('.close-modal');
const myModal = document.querySelector('.modal');
const addForm = document.querySelector('.save-btn');
console.log(addForm);
const toggleModal = () => {
    myModal === null || myModal === void 0 ? void 0 : myModal.classList.toggle("no-display");
};
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", () => {
    toggleModal();
});
closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.addEventListener("click", () => {
    toggleModal();
});
addForm === null || addForm === void 0 ? void 0 : addForm.addEventListener('click', (e) => {
    e.preventDefault();
    toggleModal();
});
