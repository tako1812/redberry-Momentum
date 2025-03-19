"use strict";
const token = "9e73c158-43ef-4fd6-9f0e-70385f360191";
const prioritiesContainer = document.querySelector(".dropdown-priorities");
const ddd= document.querySelector(".default");

const employeeLabel = document.querySelector(".employee-label");

const renderPriorities = async function () {
    prioritiesContainer.innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities"
    );
    const datas = await res.json();
    console.log(datas);
  
    datas.map(data => {
        const html = `
        <a class="img-icon-container" data-set="${data.id}">
          <img id="dropdown-icon" src="${data.icon}" alt="priority icon"/>
          <p class="category">${data.name}</p>
        </a>
        `;

        prioritiesContainer.insertAdjacentHTML("afterbegin", html);
    });
    
    const [defaultValue] = datas.filter((data) => data.name === "საშუალო"); 
    console.log(defaultValue);
     const imgSource =defaultValue.icon;
     const category = defaultValue.name;
     iconSelected.setAttribute("src", imgSource);
     categorySelected.textContent = category;     

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
        <option value="${data.id}">${data.name}</option>
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
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
 
  const selectedDepartment = document.querySelector(".departments-dropdown");
  let btnEmployeeHasLisener = false;

  selectedDepartment.addEventListener("change", function(e) {
    employeeLabel.classList.remove("disable");

    if(!btnEmployeeHasLisener) {
      dropdownBtnEmployee.addEventListener("click", function(e) {
        e.preventDefault();
        dropdownContentEmployees.classList.toggle("hidden");
      });
      btnEmployeeHasLisener = true;
    }
     
    
    const departmentEmployee = dataEmployees.filter(employee => {
      return employee.department.id === +selectedDepartment.value;

    });

    dropdownContentEmployees.innerHTML = "";
    departmentEmployee.map(employee => {
      const html = `
        <a class="employee-info-container" data-set="${employee.id}">
          <img src="${employee.avatar}" alt="priority icon"/>
          <p class="category">${employee.name} ${employee.surname}</p>
        </a>
      ` 
      
      dropdownContentEmployees.insertAdjacentHTML("afterbegin", html);
    });
    /*
    dropdownBtnEmployee.innerHTML = "";
    const markup = 
    `<div class="default">
        <img class="info-employee-img"src="${departmentEmployee[0].avatar}" alt="priority icon"/>
        <p class="info-employee-fullName">${departmentEmployee[0].name} ${departmentEmployee[0].surname}</p>
     </div>
    `;
    dropdownBtnEmployee.insertAdjacentHTML("afterbegin", markup);*/





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
const dropdownBtnPriority = document.querySelector(".dropdown-btn-prior");
const dropdownContentPriorities = document.querySelector(".dropdown-content-priorities");
const iconSelected = document.querySelector(".icon-selected-prior");
const categorySelected = document.querySelector(".category-selected-prior");
dropdownBtnPriority.addEventListener("click", function(e) {
  e.preventDefault();
  dropdownContentPriorities.classList.toggle("hidden");
});


let priorityIdData;
let employeeIdData;

const dropdownBtnFunctionality = function(e) {
  const clicked = e.target.closest(this);
  const id = clicked.getAttribute("data-set");
  const icon = clicked.querySelector("img");
  const iconSource = icon.getAttribute("src");
  
  if(clicked.classList.contains("img-icon-container")){
    categorySelected.textContent = clicked.textContent;
    iconSelected.setAttribute("src", iconSource);
    priorityIdData = id;
    dropdownContentPriorities.classList.add("hidden");
  }
  if(clicked.classList.contains("employee-info-container")){
    employeeFullname.textContent = clicked.textContent;
    employeeImage.setAttribute("src", iconSource);
    employeeImage.classList.remove("remove");
    employeeIdData = id;

    //const [nname, surname] = employeeFullnameData.split(" ");
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
/*dropdownBtnEmployee.addEventListener("click", function(e) {
  e.preventDefault();
  dropdownContentEmployees.classList.toggle("hidden");
});*/
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// POST REQUEST ON TASKS
//
const formCreateTask = document.querySelector(".form-create-task");
const inputDataValue = document.querySelector(".data-input");


const sendJson = async function(url, uploadData) {
    try{
        const fetchData = await fetch(url,{
            method:"POST",
            headers:{
                Authorization: `Bearer ${token}`,
                accept:"application/json",
            },
            body: uploadData,
        }
    );
    const data = await fetchData.json();
    return data;
    }catch (err){
        throw err;
    }
  };

  const uploadData = async function(e) {
    e.preventDefault();

    const validTitle = checkTitleValidation();
    const validDescription = checkDescriptionValidation();
    
    if(!validTitle && !validDescription) return;

    const dataArr = [...new FormData(formCreateTask)];
    const data = Object.fromEntries(dataArr);
    console.log(data);
    
    console.log(inputDataValue.value);
    console.log(data.title);
    /*const taskData = {
        name: data.name,
        surname: data.surname, 
        avatar:data.avatar, 
        department_id: data.department
    };*/

    const formData = new FormData();

    formData.append("name", data.title);
    formData.append("description", data.description);
    formData.append("due_date", inputDataValue.value);
    formData.append("status_id", +data.status);
  
    formData.append("priority_id", +priorityIdData);
    formData.append("employee_id", +employeeIdData);
    
    
    console.log(formData);
    const datas = await sendJson("https://momentum.redberryinternship.ge/api/tasks",formData);
    console.log(datas);
  };
  formCreateTask.addEventListener("submit",uploadData);


