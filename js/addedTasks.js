"use strict";
const token = "9e73c158-43ef-4fd6-9f0e-70385f360191";
let departments =[];

const filtersBox = document.querySelector(".filters-box");
const btnClear = document.querySelector(".btn-clear");
const departmentContainer = document.querySelector(".filter-department-container");
const filterPrioritiesContainer = document.querySelector(".fiter-priorities-container");
const filterEmployeesContainer = document.querySelector(".filter-employees-container");

const departmentsSelector= document.querySelector(".selector-department"); 
const prioritiesSelector= document.querySelector(".selector-priority");
const employeesSelector= document.querySelector(".selector-employee");  

const selectionsContainer = document.querySelector(".selections-container");
const statusGoingStartContainer = document.querySelector(".status-goingStart-card");
const statusInProgressContainer = document.querySelector(".status-inProgress-card");
const statusReadyForTestingContainer = document.querySelector(".status-readyForTesting-card");
const statusFinishedContainer = document.querySelector(".status-finished-card");
const userSelectionsContainer = document.querySelector(".user-inputs-container");



//////////////////////////////////////
//  toggle filter's containers

const toggleFiltersContainers = function(e) {
    const clicked = e.target.closest(".btn-filter");
    if(!clicked) return;
    
    const data = clicked.getAttribute('data-filter-btn');
    document.querySelector(`.filter-selector-${data}`).classList.toggle("hidden");
}
filtersBox.addEventListener("click", toggleFiltersContainers);

//////////////////////////////////////
//  hide filter's containers

const hideFilterContainer = function(e) {
    const clicked = e.target.closest(".btn-choose");
    if(!clicked) return;

    const data = clicked.getAttribute("data-btn");
    document.querySelector(`.filter-selector-${data}`).classList.add("hidden");
}
filtersBox.addEventListener("click", hideFilterContainer);

/////////////////////////////////////////////////////
/// RENDER FILTER CATEGORIES

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
// GET SELECTED DATA FROM FILTERS

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

///////////////////////////////////////////////
//  RENDER BUTTONS FROM SELECTED CHECKBOX

selectionsContainer.innerHTML = "";
const renderUserInputsBtns = function(e) {
    const clicked = e.target.closest(".btn-choose");
    if(!clicked) return;
    let html = "";

  if(selectedDepartments.length >= 1) {
    selectedDepartments.map((department) => 
        html +=
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


//////////////////////////////////////////////////////////
//    RENDER TASK CARDS

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
    createCard(tasksData);
    
};
renderTaskCards();


const shortenDepartmentsName = function(data) {
  if (data.length > 1) {
    const datas = data.split(" ");
        
    const sliced = datas.map(each => each.slice(0, 4));
    const shortend = sliced.join(".");
    return shortend;
  }else{
  return false;
  }
};

function formatDeadline(formdate) {
  const months = ["იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];
  
  const date = new Date(formdate);
  
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month}, ${year}`;
};


const createCard = function (datas) {
       /*
    const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };
    const sss = datas.map(data => {
      return data.department.name;
    });
    console.log(sss);
    const deps = new Set(sss);
    console.log(deps);
    const result = deps.forEach(dep => {
      dep.style.backgroundColor = getRandomColor();
    });
    console.log(result);*/
     /*
    const setBackColor = function(department){
         if(department === "ფინანსური დეპარტამენტი") {
          department.style.color = " #F7BC30";
         }
         if(department === "ადმინისტრაციული დეპარტამენტი") {
          department.style.color =" #FB5607;";
        }
        if(department === "მედიის დეპარტამენტი") {
          department.style.color = " #FF006E;";
        }
        if(department === "ტექნოლოგიების დეპარტამენტი") {
          department.style.color = " #3A86FF;";
        }
        if(department === "ადამიანური რესურსების დეპარტამენტი") {
          department.style.color = " #8338EC;";
        }
        if(department === "გაყიდვების და მარკეტინგის დეპარტამენტი") {
          department.style.color = " #8338EC;";
        }
        if(department === "გაყიდვების და მარკეტინგის დეპარტამენტი") {
          department.style.color = " #B588F4;";
        }

    };*/


    datas.map(data =>{
        let html = `
        <div class="task-card" dataset = ${data.id}>
            <div class="task-card-categories">
                <div>
                    <div class="task-category">
                        <img src="${data.priority.icon}"/>
                        <p>${data.priority.name}</p>
                    </div>
                    <div class="department">${data.department.name ? shortenDepartmentsName(data.department.name) : data.department.name}</div>
                </div>
                <p>${formatDeadline(data.due_date)}</p>
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
    const cards = document.querySelectorAll(".task-card");
    cards.forEach((card) =>
      card.addEventListener("click", function () {
        window.location.href ="../pages/detailedTask.html";
        const pageId = card.getAttribute("dataset");
        localStorage.setItem("page-id", pageId);
      })
    );
};

//////////////////////////////////////////////////////////
// FILTER FUNCTIONALITY

function filterTasks() {
    let result = tasksData;

    statusGoingStartContainer.innerHTML ="";  
    statusInProgressContainer.innerHTML = "";
    statusReadyForTestingContainer.innerHTML = "";
    statusFinishedContainer.innerHTML = "";
  
    if (selectedDepartments[0]) {
      result = result.filter((task) => {
        if (selectedDepartments.includes(task.department.name)) {
          return task;
        }
      });
    }
    if (selectedPriorities[0]) {
      result = result.filter((task) => {
        if (selectedPriorities.includes(task.priority.name)) {
          return task;
        }
      });
    }
    console.log(selectedEmployee);
    if (selectedEmployee) {
      const [name, surname] = selectedEmployee.split(" ");
      result = result.filter((task) => {
        return (task.employee.name === name && task.employee.surname === surname)
      });
    } 
    createCard(result);
};

//////////////////////////////////////////////////////
//  REMOVE SELECTED CATEGORIES // UNCHECK checkbox

userSelectionsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".close-icon");
  const clickedText = clicked.previousElementSibling.textContent;
  if (!clicked) return;

  const filteredItem = clicked.parentElement;
  filteredItem.remove(); 
  
  selectedDepartments = selectedDepartments.filter(department => {
    return department !== clickedText
  });
 
  selectedPriorities = selectedPriorities.filter(priority => {
    return priority !== clickedText
  });
   
  if(clickedText === selectedEmployee) {
    selectedEmployee = null;
  }
   
  document.querySelectorAll('[type="checkbox"]').forEach((item) => {
    item.checked = false;
  });
  filterTasks();
});

///////////////////////////////////////////////////////////
//  Clear Button

btnClear.addEventListener("click", function () {
  const selectionsContainer = document.querySelector(".selections-container");
  //filteredInputs.remove();
  selectionsContainer.innerHTML = "";
  
  selectedDepartments = [];
  selectedPriorities = [];
  selectedEmployee = null;

  btnClear.classList.add("hidden");
  filterTasks();

  document.querySelectorAll('[type="checkbox"]').forEach((item) => {
    item.checked = false;
  });
});



































  