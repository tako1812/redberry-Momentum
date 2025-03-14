

const filtersBox = document.querySelector(".filters-box");

const btnClear = document.querySelector(".btn-clear");
const userInputsContainer =document.querySelector(".chosen-inputs");



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

departmentsSelector. addEventListener("click", getUserInput.bind(chosenDepartment));
prioritiesSelector.addEventListener("click", getUserInput.bind(chosenPriorities));
employeesSelector.addEventListener("click", getUserInput.bind(chosenEmployee));


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
  //if (html) btnClear.classList.remove("hidden");
  



  userInputsContainer.innerHTML = html;

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