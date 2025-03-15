"use strict";

const inputTitle = document.querySelector(".input-title");
const taskDescription = document.querySelector(".task-description");
const titleValidationText = document.querySelector(".title-validation-text");
const descriptionValidationText = document.querySelector(".description-validation-text");


const checkMinSymbols = (input) => input.trim().length >= 2;
const checkMaxSymbols = (input) => input.trim().length <= 255;


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
//////////////////////////////
const checkTitleValidation = function() {
    
    //const title = e.target.value;
    let title = inputTitle.value;
    console.log(title);



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

inputTitle.addEventListener("input", checkTitleValidation );
taskDescription.addEventListener("input", checkDescriptionValidation);

