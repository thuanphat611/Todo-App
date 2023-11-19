const addBtn = document.querySelector('.add-button');
const closeModalBtn = document.querySelector('.close-modal');
const myModal = document.querySelector<HTMLDivElement>('.modal');
const addForm = document.querySelector('.save-btn');

console.log(addForm);
const toggleModal = (): void => {
    myModal?.classList.toggle("no-display");
};

addBtn?.addEventListener("click", () => {
  toggleModal();
});

closeModalBtn?.addEventListener("click", () => {
  toggleModal();
});

addForm?.addEventListener('click', (e) => {
  e.preventDefault();
  
  toggleModal();
});