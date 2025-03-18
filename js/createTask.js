"use strict";
const token = "9e73c158-43ef-4fd6-9f0e-70385f360191";
const prioritiesContainer = document.querySelector(".dropdown-priorities");
const ddd= document.querySelector(".default");
const renderPriorities = async function () {
    prioritiesContainer.innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities"
    );
    const datas = await res.json();
    console.log(datas);
  
    datas.map(data => {
        const html = `
        <a class="img-icon-container">
          <img id="dropdown-icon" src="${data.icon}" alt="priority icon"/>
          <p class="category">${data.name}</p>
        </a>
        `;

        prioritiesContainer.insertAdjacentHTML("afterbegin", html);
    });
    
    /*const [defaultValue] = datas.filter((data) => data.name === "საშუალო"); 
    console.log(defaultValue);

    ddd.innerHTML = "";
    const markup = ` 
        <img class="icon-selected"src="${defaultValue.icon}" alt="priority icon"/>
        <p class="category-selected">${defaultValue.name}</p>
       `;
      
    ddd.insertAdjacentHTML("afterbegin", markup);*/
  
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
  /////////////////////////////////////////
  ////////////////////////////////////////
  
  const departmentContainer = document.querySelector(".department-container");

  let dataDepartments;
  let dataEmployees;
  
  const renderDepartment = async function () {
    departmentContainer .innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/departments"
    );
    const datas = await res.json();
    console.log(datas);
    dataDepartments = datas; 
    

    datas.map(data => {
        const html = `
        <option class="department" value="${data.id}">${data.name}</option>
        `;

        departmentContainer.insertAdjacentHTML("afterbegin", html);
    });

    const resp = await fetch("https://momentum.redberryinternship.ge/api/employees",
      {
          method: "GET",
          headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          },
      }
      );
      const dataEmp = await resp.json();
      console.log(dataEmp);
      dataEmployees = dataEmp;

  };
  renderDepartment();


  const selectedDepartment = document.querySelector(".departments-dropdown");
  selectedDepartment.addEventListener("change", function(e) {
    

    const departmentEmployee = dataEmployees.filter(employee => {
      console.log(employee);
      return employee.department.id === +selectedDepartment.value;

    });
    dropdownContentEmployees.innerHTML = "";
    departmentEmployee.map(employee => {
      const html = `
        <a class="employee-info-container">
          <img src="${employee.avatar}" alt="priority icon"/>
          <p class="category">${employee.name} ${employee.surname}</p>
        </a>
      `
      dropdownContentEmployees.insertAdjacentHTML("afterbegin", html);
    });

  })
////////////////////////////////
///////////////////////////////
/*
const renderEmployees = async function () {
  dropdownContentEmployee.innerHTML = "";
  
  const res = await fetch("https://momentum.redberryinternship.ge/api/employees",
      {
          method: "GET",
          headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          },
      }
      );
      const datas = await res.json();
      console.log(datas);

      datas.map(data => {
          const html = `
           <a class="img-icon-container">
             <img src="https://media.geeksforgeeks.org/wp-content/uploads/20200630132504/uflag.jpg" alt="priority icon"/>
            <p class="category">დაბალი</p>
          </a>
      `;

      dropdownContentEmployee.insertAdjacentHTML("afterbegin", html);
  });

};
renderFilterEmployees();*/




const dropdownContentEmployees = document.querySelector(".dropdown-content-employees");
const employeeImage =document.querySelector(".info-employee-img");
const employeeFullname = document.querySelector(".info-employee-fullName");

//////////////////////////////////////////
/////////////////////////////////////////
// customize dropdown functionality
///

const dropdownBtn = document.querySelector(".dropdown-btn-prior");
const dropdownContentPriorities = document.querySelector(".dropdown-content-priorities");
const iconSelected = document.querySelector(".icon-selected-prior");
const categorySelected = document.querySelector(".category-selected-prior");
dropdownBtn.addEventListener("click", function(e) {
  e.preventDefault();
  dropdownContentPriorities.classList.toggle("hidden");
});

const dropdownBtnFunctionality = function(e) {
  const clicked = e.target.closest(this);
  console.log(clicked);
  const icon = clicked.querySelector("img");
  const iconSource = icon.getAttribute("src");
  
  if(clicked.classList.contains("img-icon-container")){
    categorySelected.textContent = clicked.textContent;
    iconSelected.setAttribute("src", iconSource);
    dropdownContentPriorities.classList.add("hidden");
  }
  if(clicked.classList.contains("employee-info-container")){
    employeeFullname.textContent = clicked.textContent;
    employeeImage.setAttribute("src", iconSource);
    dropdownContentEmployees.classList.add("hidden");
  }

} 


dropdownContentPriorities.addEventListener("click", dropdownBtnFunctionality.bind(".img-icon-container"));
dropdownContentEmployees.addEventListener("click", dropdownBtnFunctionality.bind(".employee-info-container"));

//////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////
//dropdown-btn-employee
const dropdownBtnEmployee = document.querySelector(".dropdown-btn-employee");
//const dropdownContentEmployee = document.querySelector(".dropdown-content-employees");
const iconEmployee = document.querySelector(".icon-selected-emoloyee");
const categoryEmployee = document.querySelector(".category-selected-employee");
const employeeInfoContainer = document.querySelector(".employee-info-container");


//employees-container
dropdownBtnEmployee.addEventListener("click", function(e) {
  e.preventDefault();
  dropdownContentEmployees.classList.toggle("hidden");
});