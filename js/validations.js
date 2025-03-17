"use strict";

const inputTitle = document.querySelector(".input-title");
const taskDescription = document.querySelector(".task-description");
const titleValidationText = document.querySelector(".title-validation-text");
const descriptionValidationText = document.querySelector(".description-validation-text");

const inputName = document.querySelector(".form-input-name");
const nameValidationText = document.querySelector(".name-validation-text")
const inputSurname = document.querySelector(".form-input-surname");
const surnameValidationText = document.querySelector(".surname-validation-text")



const checkMinSymbols = (input) => input.trim().length >= 2 && input.trim().length <= 255;
//const checkMaxSymbols = (input) => input.trim().length <= 255;
const checkData = (input) => input.split("/").length < 3;


const dataInput = document.querySelector(".data-input");


const checkDataValidation = function() {
    
    const [year, data, month] = (dataInput.value).split("-");
    console.log(year,data, month);
    let datas= dataInput.value; 


      
    /*
     if(checkData(datas)) {
         data.style.color = "red"
    }*/



}
dataInput.addEventListener("input", checkDataValidation);





/*
const checkSymbolsValidation = function() {
    
    let description = taskDescription.value;
    //const title = e.target.value;
    let title = inputTitle.value;
    console.log(title);
    
    console.log(title);
    console.log(checkMinSymbols(title));


    if(!checkMinSymbols(title)) {
        titleValidationText.classList.add("invalid");

    } 

    if(checkMinSymbols(title)){ 
        //titleValidationText.classList.add("valid");
        titleValidationText.style.color = "green";
    }

    
    if(!checkMinSymbols(description)) {
        descriptionValidationText .classList.add("invalid");

    } 
    if(checkMinSymbols(description)){ 
        descriptionValidationText.style.color = "green";
    }
    
}*/
/////////////////////////////////////////
////////////////////////////////////////
const checkNameValidation = function() {
    
    let nameValue = inputName.value;


    if(checkMinSymbols(nameValue)){ 
        nameValidationText.classList.remove("invalid");
        nameValidationText.classList.add("valid");
        //nameValidationText.style.color = "green";
    }

    if(!checkMinSymbols(nameValue)) {
        nameValidationText.classList.add("invalid");
    } 
    
}

const checkSurnameValidation = function() {
    
    let surnameValue = inputSurname.value;

    if(!checkMinSymbols(surnameValue)) {
        surnameValidationText.classList.add("invalid");
    } 
    if(checkMinSymbols(surnameValue)){ 
        //titleValidationText.classList.add("valid");
        surnameValidationText.style.color = "green";
    }
}

const checkTitleValidation = function() {
    
    //const title = e.target.value;
    let title = inputTitle.value;


    if(!checkMinSymbols(title)) {
        titleValidationText.classList.add("invalid");
    } 
    if(checkMinSymbols(title)){ 
        //titleValidationText.classList.add("valid");
        titleValidationText.style.color = "green";
    }
}
const checkDescriptionValidation = function() {
    
    let description = taskDescription.value;

    if(!checkMinSymbols(description)) {
        descriptionValidationText .classList.add("invalid");
    } 
    if(checkMinSymbols(description)){ 
        descriptionValidationText.style.color = "green";
    }
}

inputTitle.addEventListener("input", checkTitleValidation);
taskDescription.addEventListener("input", checkDescriptionValidation);
inputName.addEventListener("input", checkNameValidation);
inputSurname.addEventListener("input", checkSurnameValidation);

