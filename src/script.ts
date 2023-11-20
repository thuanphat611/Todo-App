const currentTaskNav = document.querySelectorAll('.nav-item')[0];
const completedTaskNav = document.querySelectorAll('.nav-item')[1];

const addBtn = document.querySelector('.add-button');
const closeModalBtn = document.querySelector('.close-modal');
const myModal = document.querySelector<HTMLDivElement>('.modal');
const addTaskBtn = document.querySelector('.save-btn');

// const formTitle = document.querySelector('.title-input');

// const clearForm = (): void => {

// };

const changeTab = (): void => {
  console.log('change');
  currentTaskNav.classList.toggle('active');
  completedTaskNav.classList.toggle('active');
};

const toggleModal = (): void => {
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

  //add task

  toggleModal();
});

currentTaskNav?.addEventListener('click', () => { changeTab() });
completedTaskNav?.addEventListener('click', () => { changeTab() });