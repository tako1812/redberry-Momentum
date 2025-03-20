"use strict";
const inputTitle = document.querySelector(".input-title");
const taskDescription = document.querySelector(".task-description");
const titleValidationText = document.querySelector(".title-validation-text");
const descriptionValidationText = document.querySelector(".description-validation-text");

const inputName = document.querySelector(".form-input-name");
const nameValidationText = document.querySelector(".name-validation-text")
const inputSurname = document.querySelector(".form-input-surname");
const surnameValidationText = document.querySelector(".surname-validation-text")

console.log(inputSurname);


const checkSymbols = (input) => input.trim().length >= 2 && input.trim().length <= 255;
const emptyInput = (inputs) => inputs.trim() !== "";
const validMinWords = (inputs) => inputs.trim().split(" ").length > 4;
const validMaxSymbols = (input) => input.trim().length <= 255;


/*
const dataInput = document.querySelector(".data-input");
let deadlineData;

const config = {
    dateFormat: "d.m.Y",
    minDate: new Date().fp_incr(1),
}
const {data} =config.minDate;
console.log(data);
flatpickr(".data-input", config);*/
/*
const sss = function(selectedDates, dateStr, instance) {
    console.log(dateStr);      
} */
//dataInput.addEventListener("change", sss);
/*const checkDataValidation = function() {
    deadlineData = dataInput.value;
    console.log(deadlineData);

}
dataInput.addEventListener("change", checkDataValidation);*/


const checkNameValidation = function() {
    let result = true;
    let nameValue = inputName.value;

    if(checkSymbols(nameValue)){ 
        nameValidationText.classList.add("valid");
        nameValidationText.classList.remove("invalid");
    }
    if(!checkSymbols(nameValue)) {
        nameValidationText.classList.add("invalid");
        result = false;
    } 
    console.log(2222);
    return result;
}


const checkSurnameValidation = function() {
    let result = true;
    let surnameValue = inputSurname.value;

    if(checkSymbols(surnameValue)){ 
        surnameValidationText.classList.add("valid");
        surnameValidationText.classList.remove("invalid");
    }
    if(!checkSymbols(surnameValue)) {
        surnameValidationText.classList.add("invalid");
        result = false;
    } 
    return result;
}

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

    if(!validMinWords(description) || !validMaxSymbols(description)) {
        descriptionValidationText.classList.add("invalid");
        result = false;
    } 
    if(emptyInput(description)) {
        descriptionValidationText.classList.remove("invalid");
        descriptionValidationText.classList.remove("valid");
    }

    return result;
}
//inputTitle.addEventListener("input", checkTitleValidation);
//taskDescription.addEventListener("input", checkDescriptionValidation);
inputName.addEventListener("input", checkNameValidation);
inputSurname.addEventListener("input", checkSurnameValidation);
console.log(inputName);
/////////////////////////////////
////////////////////////////////////////////////////
/////////////////////////////////////////////////
// tasks
/*
const statusSelect = document.querySelector(".statuses-container");
const statusValue = statusSelect.value;

const priorityContainer = document.querySelector(".img-icon-container");
const priorityValue = priorityContainer.textContent;

const taskdepartmentContainer = document.querySelector(".department-container");
const departmentValue = taskdepartmentContainer.value;

const employeeContainer = document.querySelector(".dropdown-btn-employee");
const employeeValue = employeeContainer.textContent;



const checkTaskDropdownsValidation = function() {
    let result = true;
    if(emptyInput(statusValue)) {
        statusSelect.classList.add("validInput");
    }
    if(!emptyInput(statusValue)){
        statusSelect.classList.add("invalidInput");
        result = false;
    }
    if(emptyInput(priorityValue)) {
        priorityContainer.classList.add("validInput");
    }
    if(!emptyInput(priorityValue)){
        priorityContainer.classList.add("invalidInput");
        result = false;
    }

    if(emptyInput(departmentValue)) {
        taskdepartmentContainer.classList.add("validInput");
    }
    if(!emptyInput(departmentValue)){
        taskdepartmentContainer.classList.add("invalidInput");
        result = false;
    }

    if(emptyInput(employeeValue)) {
        employeeContainer.classList.add("validInput");
    }
    if(!emptyInput(employeeValue)){
        employeeContainer.classList.add("invalidInput");
        result = false;
    }

    return result;
};*/
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//// EMPOYEE DROPDOWNS
const fileEmployee = document.querySelector(".image-upload");
const imageContainer = document.querySelector(".uploadImg-container");

const employeeDepartments = document.querySelector(".employee-departments");




const checkCreateEmpValidation = function() {
    const selectedEmployeeDepartments = employeeDepartments.value;
    const fileValue = fileEmployee.files;
    console.log(selectedEmployeeDepartments);
    console.log(fileValue);
    let result = true;
    if(fileValue.length > 0) {
        imageContainer.classList.add("validInput");
        imageContainer.classList.remove("invalidInput");
    }else{
        imageContainer.classList.add("invalidInput");
        imageContainer.classList.remove("validInput");
    }

    if(emptyInput(selectedEmployeeDepartments)){
        employeeDepartments.classList.add("validInput");
        employeeDepartments.classList.remove("invalidInput");

    }else{
        employeeDepartments.classList.add("invalidInput");
        employeeDepartments.classList.remove("validInput");
        result = false;
    }
    return result;
};
