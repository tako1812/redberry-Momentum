
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
  
  const renderFiltersDepartment = async function () {
    departmentContainer.innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/departments"
    );
    const datas = await res.json();
    console.log(datas);
    departments = datas;
  
    datas.map(data => {
        const html = `
        <label for="department1">
        <input
            class="user-input"
            type="checkbox"
            id="department1"
            name="department1"
            value="${data.name}"
        />
        ${data.name}
        </label>
        `;
        departmentContainer.insertAdjacentHTML("afterbegin", html);
    });
  };
  renderFiltersDepartment();
//////////////////////////////////////////
/////////////////////////////////////////
///
const filterPrioritiesContainer = document.querySelector(".fiter-priorities-container");
const renderFiltersPriorities = async function () {
    filterPrioritiesContainer.innerHTML = "";
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities"
    );
    const datas = await res.json();
    console.log(datas);
  
    datas.map(data => {
        const html = `
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
  renderFiltersPriorities();
//////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////
const departmentsSelector= document.querySelector(".selector-department"); 
const prioritiesSelector= document.querySelector(".selector-priority");
const employeesSelector= document.querySelector(".selector-employee");  
let chosenDepartment = [];
let chosenPriorities = [];
let chosenEmployee =[];
/*
const getUserInputDepartment = function(e) {
    const clicked = e.target.closest(".user-input");
    if(!clicked) return;
    const chosen = clicked.value;
    chosenDepartment.push(chosen);
    console.log(chosenDepartment);
}
*/

/*
const sss = document.querySelector(".btn-choose");
departmentSelector. addEventListener("click", function(e) {
    const clicked = e.target.closest(".user-input");
    if(!clicked) return;
    const chosen = clicked.value;
    chosenDepartment.push(chosen);
    
});

filtersBox.addEventListener("click", function(e) {
    const clicked = e.target.closest(".btn-choose");
    if(!clicked) return;
    
    console.log(chosenDepartment);
    
});*/
//////////////////////////////////////////////////
///

const getUserInput = function(e) {
    const clicked = e.target.closest(".user-input");
    if(!clicked) return;
    const chosen = clicked.value;
    this.push(chosen);
    
};

 //class="employee"
 const allEmployee = document.querySelectorAll(".employee");
const makeOneSelection = function() {

    let selection = 0;

    allEmployee.forEach(employee => {
       if(employee.checked == true) {
        selection += 1;
       }
    });
    if(selection > 1){
        console.log(2222);
        return false;
    }
    console.log(selection);


}
//console.log(makeOneSelection());

allEmployee.forEach(employee => {
    employee.addEventListener("click", function() {
        return makeOneSelection();
    })
})

//////////////////////////////////////
//employeesSelector.addEventListener("click", makeOneSelection);
departmentsSelector. addEventListener("click", getUserInput.bind(chosenDepartment));
prioritiesSelector.addEventListener("click", getUserInput.bind(chosenPriorities));
//employeesSelector.addEventListener("click", getUserInput.bind(chosenEmployee));
///
///
////
///////////////////////////////////////
//////////////////////////////////////
///
const selectionsContainer = document.querySelector(".selections-container");
selectionsContainer.innerHTML = "";
const renderUserInputsBtns = function(e) {
    const clicked = e.target.closest(".btn-choose");
    if(!clicked) return;

  let html = chosenDepartment.map(
    (department) => `
    <div class="filtered-item">
        <p>${department}</p>
        <ion-icon  class="close-icon" name="close-outline"></ion-icon>
    </div>`
  );
  if (html) btnClear.classList.remove("hidden");

  html +=  chosenPriorities.map(
    (priority) => `
    <div class="filtered-item">
        <p>${priority}</p>
        <ion-icon  class="close-icon" name="close-outline"></ion-icon>
    </div>`
  );
  if (html) btnClear.classList.remove("hidden");
  

  /*
  html +=  chosenEmployee.map(
    (priority) => `
    <div class="filtered-item">
        <p>${priority}</p>
        <ion-icon  class="close-icon" name="close-outline"></ion-icon>
    </div>`
  );
  if (html) btnClear.classList.remove("hidden");*/

  
  selectionsContainer.innerHTML = html;

}

filtersBox.addEventListener("click",  renderUserInputsBtns);
/*
filtersBox.addEventListener("click", function(e) {
    const clicked = e.target.closest(".btn-choose");
    if(!clicked) return;
    
    
    console.log(chosenDepartment);
    console.log(chosenEmployee);
    console.log(chosenPriority);
    
});
**/
/*
const sss = [departmentSelector, prioritySelector, departmentEmployee].forEach(el =>  {
    el.addEventListener("click", getUserInput);
});*/
///////////////////////////////////////////
///////////////////////////////////////////
//////////////////////////////////////////

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
  ////////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////

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
  ////////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////

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
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/// ADD EMPLOYEE
// preview image
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
  addEmployeeFormContainer.addEventListener("submit",uploadData);

