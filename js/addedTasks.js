"use strict";
const filtersBox = document.querySelector(".filters-box");
const btnClear = document.querySelector(".btn-clear");
let departments =[];
const token = "9e73c158-43ef-4fd6-9f0e-70385f360191";


//////////////////////////////////////
//  toggle filter's containers
//
const toggleFiltersContainers = function(e) {
    const clicked = e.target.closest(".btn-filter");
    if(!clicked) return;
    
    const data = clicked.getAttribute('data-filter-btn');
    document.querySelector(`.filter-selector-${data}`).classList.toggle("hidden");
}
filtersBox.addEventListener("click", toggleFiltersContainers);
///
///
///
//////////////////////////////////////
//  hide filter's containers
//
const hideFilterContainer = function(e) {
    const clicked = e.target.closest(".btn-choose");
    if(!clicked) return;

    const data = clicked.getAttribute("data-btn");
    document.querySelector(`.filter-selector-${data}`).classList.add("hidden");
}
filtersBox.addEventListener("click", hideFilterContainer);

/////////////////////////////////////////////////////
///
const departmentContainer = document.querySelector(".filter-department-container");
  
const renderFilterDepartment = async function () {
    departmentContainer.innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/departments"
    );
    const datas = await res.json();
    console.log(datas);
    departments = datas;
  
    datas.map(data => {
        const html = `
        <div class="input-label-container">
            <label for="department1">
                <input
                class="user-input"
                type="checkbox"
                id="department1"
                name="department1"
                value="${data.name}"
                />
            ${data.name}</label>
        </div>
        `;
        departmentContainer.insertAdjacentHTML("afterbegin", html);
    });
  };
  renderFilterDepartment();
///////////////////////////////////////////
//////////////////////////////////////////

const filterPrioritiesContainer = document.querySelector(".fiter-priorities-container");
const renderFilterPriorities = async function () {
    filterPrioritiesContainer.innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities"
    );
    const datas = await res.json();
    console.log(datas);
  
    datas.map(data => {
        let html = `
        <div class="input-label-container">
            <input
            class="user-input"
            type="checkbox"
            id="department1"
            name="department1"
            value="${data.name}"
            />
            <label for="department1">${data.name}</label>
        </div>
        `;
        filterPrioritiesContainer.insertAdjacentHTML("afterbegin", html);
    });
  };
  renderFilterPriorities();








//////////////////////////////////////////
/////////////////////////////////////////
///
const filterEmployeesContainer = document.querySelector(".filter-employees-container");
const renderFilterEmployees = async function () {
    filterEmployeesContainer.innerHTML = "";
    
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
            <div class="input-label-container">
                <label for="department1">
                    <input
                    class="employee"
                    type="checkbox"
                    id="${data.id}"
                    name="department1"
                    value="${data.name} ${data.surname}"
                    />
                    <img class="employee-img" src="${data.avatar}">
                ${data.name} ${data.surname}</label>
            </div>
        `;

        filterEmployeesContainer.insertAdjacentHTML("afterbegin", html);
    });

};
renderFilterEmployees();
//////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////
const departmentsSelector= document.querySelector(".selector-department"); 
const prioritiesSelector= document.querySelector(".selector-priority");
const employeesSelector= document.querySelector(".selector-employee");  
let selectedDepartments = [];
let selectedPriorities = [];
let selectedEmployee;

const getUserInput = function(e) {
    const clicked = e.target.closest(".user-input");
    if(!clicked) return;
    const chosen = clicked.value;
    this.push(chosen);
    
};
const makeSingleSelection = function(e) {
    let employee;
    const clicked = e.target;
    if(clicked.type !== "checkbox") return true;
    const allEmployee = document.querySelectorAll(".employee");
    let length = allEmployee.length;

    while(length--) {
       if(allEmployee[length].type && allEmployee[length].type == "checkbox" && allEmployee[length].id !== clicked.id){
        allEmployee[length].checked = false;
       }
       if(allEmployee[length].id !== clicked.id){
        employee = clicked.value;
       }
    }
    selectedEmployee = employee;
};
filterEmployeesContainer.addEventListener("click",makeSingleSelection);
departmentsSelector. addEventListener("click", getUserInput.bind(selectedDepartments));
prioritiesSelector.addEventListener("click", getUserInput.bind(selectedPriorities));

///////////////////////////////////////
//////////////////////////////////////
///
const selectionsContainer = document.querySelector(".selections-container");
selectionsContainer.innerHTML = "";
const renderUserInputsBtns = function(e) {
    const clicked = e.target.closest(".btn-choose");
    if(!clicked) return;
    let html;

  if(selectedDepartments.length >= 1) {
    selectedDepartments.map((department) => 
        html =
         `<div class="filtered-item">
            <p>${department}</p>
            <ion-icon  class="close-icon" name="close-outline"></ion-icon>
        </div>`
    );
      if (html) btnClear.classList.remove("hidden");
  }

  if(selectedPriorities.length >= 1) {
      selectedPriorities.map((priority) => 
        html +=`
        <div class="filtered-item">
            <p>${priority}</p>
            <ion-icon  class="close-icon" name="close-outline"></ion-icon>
        </div>`
      );
      if (html) btnClear.classList.remove("hidden");
  }
  
  if(selectedEmployee) {
    html += `
    <div class="filtered-item">
        <p>${selectedEmployee}</p>
        <ion-icon  class="close-icon" name="close-outline"></ion-icon>
    </div>`;
    if (html) btnClear.classList.remove("hidden");
}
  selectionsContainer.innerHTML = html;

  filterTasks();
  
}
filtersBox.addEventListener("click",  renderUserInputsBtns);
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/// ADD EMPLOYEE
// preview image
/*
const inputFile = document.querySelector(".image-upload");
const previewConatiner = document.querySelector(".image-preview-container");
const imagePreview = document.querySelector(".image-preview--image");
const defaultTextImage = document.querySelector(".default-text-image");

inputFile.addEventListener("change", function() {
    const file = this.files[0];
    console.log(file);

    if(file) {
        const reader = new FileReader();

        defaultTextImage.style.display = "none";
        imagePreview.style.display ="block";

        reader.addEventListener("load", function(){
            imagePreview.setAttribute("src", this.result);
        })
        reader.readAsDataURL(file);
    }

})
//////////////////////////////////////////
//  toggle modal window
const btnAddEmployee = document.querySelector(".btn-add-employee");
const addEmployeeWindow = document.querySelector(".add-employee-window");
const overlay = document.querySelector(".overlay");
const cancelbtn = document.querySelector(".cancel-icon");

const toggleModalWindow = function() {
    addEmployeeWindow.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
};

[cancelbtn, overlay, btnAddEmployee].forEach((el) => 
    el.addEventListener("click", toggleModalWindow));
/////////////////////////////////////////////
///////////////////////////////////////////
const departmentsContainer = document.querySelector(".departments-container");
  
const renderDepartments = async function () {
    departmentsContainer.innerHTML = "";
    const res = await fetch(
        "https://momentum.redberryinternship.ge/api/departments"
    );
    const datas = await res.json();
    console.log(datas);
    departments = datas;

    datas.map(data => {
        const html = `
        <option value="${data.id}">${data.name}</option>
        `;
        departmentsContainer.insertAdjacentHTML("afterbegin", html);
    });
};
renderDepartments();
  ////////////////////////////////////////////
  ///////////////////////////////////////////
  /////////////////////////////////////////
  //  POST REQUEST OF ADD EPLOYEE
  //
const addEmployeeFormContainer = document.querySelector(".add-employee-form");
const btnAddEmplayee = document.querySelector(".btn-add-imployee");

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

    const dataArr = [...new FormData(addEmployeeFormContainer)];
    const data = Object.fromEntries(dataArr);
    console.log(data);

    const employeeData = {
        name: data.name,
        surname: data.surname, 
        avatar:data.avatar, 
        department_id: data.department
    };

    const formData = new FormData();

    formData.append("name", employeeData.name);
    formData.append("surname", employeeData.surname);
    formData.append("avatar", employeeData.avatar);
    formData.append("department_id", employeeData.department_id);

    console.log(formData);
    const datas = await sendJson("https://momentum.redberryinternship.ge/api/employees",formData);
    console.log(datas);
};
addEmployeeFormContainer.addEventListener("submit",uploadData);*/

  /////////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  //GET CARDS DATA
  //
  const statusGoingStartContainer = document.querySelector(".status-goingStart-card");
  const statusInProgressContainer = document.querySelector(".status-inProgress-card");
  const statusReadyForTestingContainer = document.querySelector(".status-readyForTesting-card");
  const statusFinishedContainer = document.querySelector(".status-finished-card");


  let tasksData;
const renderTaskCards = async function () {
    

    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/tasks",
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
    tasksData = datas;

    /*
    const departments = datas.map(data => {
         data.department.name;
    });
    const departmentCategories = [...new Set(departments)];
    console.log(departmentCategories);

    str.split(" ").map(word => word.slice(0, 3));
   }
    
    */
    
};
renderTaskCards();
////////////////////////////////////////////////
/////////////////////////////////////////////////
//////////////////////////////////////////////////
// CREATE CARD
const createCard = function (datas) {
    datas.map(data =>{
        let html = `
        <div class="task-card">
            <div class="task-card-categories">
                <div>
                    <div class="task-category">
                        <img src="${data.priority.icon}"/>
                        <p>${data.priority.name}</p>
                    </div>
                    <div class="department">${data.department.name}</div>
                </div>
                <p>22 იანვ, 2022</p>
            </div>
            <div class="task-card-description">
                <h3>${data.name}</h3>
                <p>${data.description}
                </p>
            </div>
            <div class="task-card-employee">
                <img src="${data.employee.avatar}"/>
                <div>
                <img src="./assets/images/Comments.png"/>
                <p>8</p>
                </div>
            </div>
        </div>
        `;
        
        if(data.status.name === "დასაწყები"){
            statusGoingStartContainer.innerHTML += html;
        }
        if(data.status.name === "პროგრესში"){
            statusInProgressContainer.innerHTML += html;
        }
        if(data.status.name === "მზად ტესტირებისთვის"){
            statusReadyForTestingContainer.innerHTML += html;
        }
        if(data.status.name === "დასრულებული"){
            statusFinishedContainer.innerHTML += html;
        } 
    });
};
createCard(tasksData);



//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// FILTER FUNCTIONALITY
//
const filterTasks = function () {
    let result = tasksData;
    console.log(result);
    console.log(selectedEmployee);
    //let selectedPriorities = [];
     //let selectedEmployee

  
    if (selectedDepartments[0]) {
      result = result.filter((task) => {
        if (selectedDepartments.includes(task.department.name)) {
          return task;
        }
      });
      createCard(result);
    }
    if (selectedPriorities[0]) {
      result = result.filter((task) => {
        if (selectedPriorities.includes(task.priority.name)) {
          return task;
        }
      });
      createCard(result);
    }
    if (selectedEmployee) {
      result = result.filter((task) => {
        return (task.employee.name === selectedEmployee && task.employee.name === selectedEmployee)
      });
      createCard(result);
    } 
};
//////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
// 








/*
onst shorten = function(data){
 if(data.length > 1){
   const datas = data.split(" ");
   console.log(datas);
   const ggg = datas.map(each => {
     each.split(0, 3);
    });
  console.log(ggg);
 }
};
console.log(shorten("ssssss ddddd ddddd"));
}
//////
/////
/////
const shorten = function(data) {
  if (data.length > 1) {
    const datas = data.split(" ");
    console.log(datas);
    
    // Use slice instead of split for substring extraction
    const ggg = datas.map(each => each.slice(0, 3));
    
    console.log(ggg);
    return ggg; // Return the modified array
  }
};
console.log(shorten("ssssss ddddd ddddd"));
*/
  