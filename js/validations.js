"use strict";
const inputTitle = document.querySelector(".input-title");
const taskDescription = document.querySelector(".task-description");
const titleValidationText = document.querySelector(".title-validation-text");
const descriptionValidationText = document.querySelector(".description-validation-text");

const inputName = document.querySelector(".form-input-name");
const nameValidationText = document.querySelector(".name-validation-text")
const inputSurname = document.querySelector(".form-input-surname");
const surnameValidationText = document.querySelector(".surname-validation-text")



const checkSymbols = (input) => input.trim().length >= 2 && input.trim().length <= 255;
const emptyInput = (inputs) => inputs.trim() === "";
const validMinWords = (inputs) => inputs.trim().split(" ").length > 4;
const validMaxSymbols = (input) => input.trim().length <= 255;
//const checkData = (input) => input.split(" ").length < 4;


const dataInput = document.querySelector(".data-input");
let deadlineData;

const config = {
    dateFormat: "d.m.Y",
    minDate: new Date().fp_incr(1)
}
flatpickr(".data-input", config);
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
        //nameValidationText.style.color = "green";
    }
    if(!checkSymbols(nameValue)) {
        nameValidationText.classList.add("invalid");
        result = false;
    } 
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
inputTitle.addEventListener("input", checkTitleValidation);
taskDescription.addEventListener("input", checkDescriptionValidation);
inputName.addEventListener("input", checkNameValidation);
inputSurname.addEventListener("input", checkSurnameValidation);

