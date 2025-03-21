"use strict";
/// ADD EMPLOYEE
// preview image
const inputFile = document.querySelector(".image-upload");
const previewConatiner = document.querySelector(".image-preview-container");
const imagePreview = document.querySelector(".image-preview--image");
const defaultTextImage = document.querySelector(".default-text-image");

imagePreview.style.display = "none";
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
});
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
    const html = `
        <option value=""></option>
        `;
        departmentsContainer.insertAdjacentHTML("afterbegin", html);

    datas.map(data => {
        const html = `
        <option value="${data.id}">${data.name}</option>
        `;
        departmentsContainer.insertAdjacentHTML("afterbegin", html);
    });
  };
  renderDepartments();
  
  /////////////////////////////////////////////
  // VALIDATIONS

  const inputName = document.querySelector(".form-input-name");
const nameValidationText = document.querySelector(".name-validation-text")
const inputSurname = document.querySelector(".form-input-surname");
const surnameValidationText = document.querySelector(".surname-validation-text")



const checkSymbols = (input) => input.trim().length >= 2 && input.trim().length <= 255;
const emptyInput = (inputs) => inputs.trim() !== "";
const validMinWords = (inputs) => inputs.trim().split(" ").length > 4;
const validMaxSymbols = (input) => input.trim().length <= 255;


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

inputName.addEventListener("input", checkNameValidation);
inputSurname.addEventListener("input", checkSurnameValidation);

/////////////////////////////////
////////////////////////////////////////////////////
/////////////////////////////////////////////////
//////////////////////////////////////////
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


    const validDropdown = checkCreateEmpValidation();
    
    if(!validDropdown) return;
   


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
