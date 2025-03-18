"use strict";
const prioritiesContainer = document.querySelector(".priorities-continer");
const renderPriorities = async function () {
    prioritiesContainer.innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities"
    );
    const datas = await res.json();
    console.log(datas);
  
    datas.map(data => {
        const html = `
        <option><img src="https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg"/>nnn </option>
        <option value="${data.name}" style="background-image:url(${data.icon})";>${data.name}</option>
        <option style="background-image:url(${data.icon});">male</option>
        `;

        prioritiesContainer.insertAdjacentHTML("afterbegin", html);
    });

  };
  renderPriorities();
////
////
const statusesContainer = document.querySelector(".statuses-container");
  
  const renderStatuses = async function () {
    statusesContainer.innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/statuses"
    );
    const datas = await res.json();
    console.log(datas);
  
    datas.map(data => {
        const html = `
        <option value="${data.name}">${data.name}</option>
        `;

        statusesContainer.insertAdjacentHTML("afterbegin", html);
    });
  };
  renderStatuses();
  /*
  const departmentsContainer = document.querySelector(".department-container");
  
  const renderDepartments = async function () {
    departmentsContainer .innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/departments"
    );
    const datas = await res.json();
    console.log(datas);
    departments = datas;
  
    datas.map(data => {
        const html = `
        <option value="${data.name}">${data.name}</option>
        `;

        departmentsContainer .insertAdjacentHTML("afterbegin", html);
    });
  };
  renderDepartments();
*/
////////////////////////////////
///////////////////////////////
//////////////////////////////
// customize dropdown functionality
///

const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");
const iconSelected = document.querySelector(".icon-selected");
const categorySelected = document.querySelector(".category-selected");
dropdownBtn.addEventListener("click", function(e) {
  e.preventDefault();
  dropdownContent.classList.toggle("hidden");
});

const dropdownBtnFunctionality = function(e) {
  const clicked = e.target.closest(this);
  const icon = clicked.querySelector("img");
  const iconSource = icon.getAttribute("src");
  
  categorySelected.textContent = clicked.textContent;
  iconSelected.setAttribute("src", iconSource);
  dropdownContent.classList.add("hidden");

}
dropdownContent.addEventListener("click", dropdownBtnFunctionality.bind(".img-icon-container"));