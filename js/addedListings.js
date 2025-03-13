

const filtersBox = document.querySelector(".filters-box");



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
const departmentsSelector= document.querySelector(".selector-department"); 
const prioritiesSelector= document.querySelector(".selector-priority");
const employeesSelector= document.querySelector(".selector-employee");  
let chosenDepartment = [];
let chosenPriority = [];
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


const sss = document.querySelector(".btn-choose");

const getUserInput = function(e) {
    const clicked = e.target.closest(".user-input");
    if(!clicked) return;
    const chosen = clicked.value;
    this.push(chosen);
    
};

departmentsSelector. addEventListener("click", getUserInput.bind(chosenDepartment));
prioritiesSelector.addEventListener("click", getUserInput.bind(chosenPriority));
employeesSelector.addEventListener("click", getUserInput.bind(chosenEmployee));


filtersBox.addEventListener("click", function(e) {
    const clicked = e.target.closest(".btn-choose");
    if(!clicked) return;
    
    
    console.log(chosenDepartment);
    console.log(chosenEmployee);
    console.log(chosenPriority);
    
});






/*
const sss = [departmentSelector, prioritySelector, departmentEmployee].forEach(el =>  {
    el.addEventListener("click", getUserInput);
});*/