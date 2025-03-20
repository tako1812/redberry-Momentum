"use strict";
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
