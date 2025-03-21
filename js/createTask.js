"use strict";
const token = "9e73c158-43ef-4fd6-9f0e-70385f360191";
const prioritiesContainer = document.querySelector(".dropdown-priorities");
const ddd= document.querySelector(".default");

const employeeLabel = document.querySelector(".employee-label");




const statusSelect = document.querySelector(".statuses-container");
const priorityContainer = document.querySelector(".dropdown-btn-prior");
const taskdepartmentContainer = document.querySelector(".department-container");
const employeeContainer = document.querySelector(".dropdown-btn-employee");


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

    const html = `
        <option value=""></option>
        `;
        statusesContainer.insertAdjacentHTML("afterbegin", html);
  
    datas.map(data => {
        const html = `
        <option value="${data.id}">${data.name}</option>
        `;

        statusesContainer.insertAdjacentHTML("afterbegin", html);
    });
    //datas[0].setAttribute("class", "remove");
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
      
    const html = `
        <option class="department" value=""></option>
        `;
        departmentContainer.insertAdjacentHTML("afterbegin", html);

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
  
  const renderEmployees = function(e) {
    employeeLabel.classList.remove("disable");

    employeeFullname.textContent = "";
    employeeImage.setAttribute("src", "");
    employeeImage.classList.add("remove");
    employeeIdData = null;

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
  };
  selectedDepartment.addEventListener("change", renderEmployees);

/////////////////////////////////////////////



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

///////////////////////////////////////////
// VALIDATIONS

const inputTitle = document.querySelector(".input-title");
const taskDescription = document.querySelector(".task-description");
const titleValidationText = document.querySelector(".title-validation-text");
const descriptionValidationText = document.querySelector(".description-validation-text");

const checkSymbols = (input) => input.trim().length >= 2 && input.trim().length <= 255;
const emptyInput = (inputs) => inputs.trim() === "";
const validMinWords = (inputs) => inputs.trim().split(" ").length > 3;
const validMaxSymbols = (input) => input.trim().length <= 255 && input.trim().length > 0;

const dataInput = document.querySelector(".data-input");
let deadlineData;

const config = {
    dateFormat: "d.m.Y",
    minDate: new Date().fp_incr(1),
}
flatpickr(".data-input", config);


const checkTitleValidation = function() {
  let result = true;
  let title = inputTitle.value;
  
  if(checkSymbols(title)){ 
      titleValidationText.classList.add("valid");
      titleValidationText.classList.remove("invalid");
  }
  if(!checkSymbols(title)) {
      titleValidationText.classList.add("invalid");
      result = false;
  } 
  return result;
}

const checkDescriptionValidation = function() {
  let result = true;
  let description = taskDescription.value;
  
  if(validMinWords(description) || validMaxSymbols(description)){ 
      descriptionValidationText.classList.add("valid");
      descriptionValidationText.classList.remove("invalid");
  }

  if((!validMinWords(description) || !validMaxSymbols(description))) {
      descriptionValidationText.classList.add("invalid");
      descriptionValidationText.classList.remove("valid");
      result = false;
  }   
  if(emptyInput(description)){
    descriptionValidationText.classList.remove("invalid");
      descriptionValidationText.classList.remove("valid");
  }
  return result;
}
inputTitle.addEventListener("input", checkTitleValidation);
taskDescription.addEventListener("input", checkDescriptionValidation);



const checkTaskDropdownsValidation = function() {
  let result = true;
  
  const statusValue = statusSelect.value;
  const priorityValue = priorityContainer.textContent;
  const departmentValue = taskdepartmentContainer.value;
  const employeeValue = employeeContainer.textContent;
  const dateInput = dataInput.value;

   console.log(statusValue);

    if(emptyInput(statusValue)) {
        statusSelect.classList.add("validInput");
        statusSelect.classList.remove("invalidInput");
    } else{
      statusSelect.classList.add("invalidInput");
      statusSelect.classList.remove("validInput");
      result = false;
    }
    if(emptyInput(priorityValue)) {
        priorityContainer.classList.add("validInput");
        priorityContainer.classList.remove("invalidInput");
    } else{
      priorityContainer.classList.add("invalidInput");
      priorityContainer.classList.remove("validInput");
      result = false;

    }
    if(emptyInput(departmentValue)) {
        taskdepartmentContainer.classList.add("validInput");
        taskdepartmentContainer.classList.remove("invalidInput");
    } else{
      taskdepartmentContainer.classList.add("invalidInput");
      taskdepartmentContainer.classList.remove("validInput");
      result = false;
    }
    if(emptyInput(employeeValue)) {
        employeeContainer.classList.add("validInput");
        employeeContainer.classList.remove("invalidInput");
    } else{
      employeeContainer.classList.add("invalidInput");
      employeeContainer.classList.remove("validInput");
      result = false;
    }
    if(emptyInput(dateInput)) {
      dataInput.classList.add("validInput");
      dataInput.classList.remove("invalidInput");
    } else{
      dataInput.classList.add("invalidInput");
      dataInput.classList.remove("validInput");
      result = false;
    }




    return result;
};





//////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////
//dropdown-btn-employee
const dropdownBtnEmployee = document.querySelector(".dropdown-btn-employee");
const iconEmployee = document.querySelector(".icon-selected-emoloyee");
const categoryEmployee = document.querySelector(".category-selected-employee");
const employeeInfoContainer = document.querySelector(".employee-info-container");

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
    const validDropdown = checkTaskDropdownsValidation();
    
    
    if(!validTitle && !validDescription && !validDropdown) return;

    const dataArr = [...new FormData(formCreateTask)];
    const data = Object.fromEntries(dataArr);
    console.log(data);
    
    console.log(inputDataValue.value);
    console.log(data.title);

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

    //window.location.href = "../index.html";
  };
  formCreateTask.addEventListener("submit",uploadData);


