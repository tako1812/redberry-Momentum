"use strict";
const token = "9e73c158-43ef-4fd6-9f0e-70385f360191";
const pageId = localStorage.getItem("page-id");


const createCardDetailed = async function () {
  
  
    const res = await fetch(
      `https://momentum.redberryinternship.ge/api/tasks/${pageId}`,
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
  
    
    const deadlineData = (formatDeadlineDate(datas.due_date));
  
    const taskCategoryIcon = document.querySelector(".task-category-icon");
    const taskCategory = document.querySelector(".task-category-text");
    const taskDepartmentBtn = document.querySelector(".task-department-btn");
    const taskHeading = document.querySelector(".task-heading");
    const taskDescription = document.querySelector(".task-description");
    const taskStatus = document.querySelector(".statuses-container");
    const taskEmployeeImg = document.querySelector(".task-employee-image");
    const taskDepartment = document.querySelector(".task-department");
    const taskEmployee = document.querySelector(".task-employee");
    const taskDeadline = document.querySelector(".deadline-date");
    
    taskCategoryIcon.src = datas.priority.icon;
    taskCategory.textContent = datas.priority.name;
    taskDepartmentBtn.textContent = datas.department.name;
    taskHeading.textContent = datas.name;
    taskDescription.textContent = datas.description;
    taskStatus.value = datas.status.name;
    taskEmployeeImg.src = datas.employee.avatar; 
    taskDepartment.textContent = datas.department.name;
    //taskEmployee.textContent = datas.employee.name;
    taskEmployee.textContent = datas.employee.surname;
    taskDeadline.textContent = deadlineData;

    renderStatuses(datas.status.name);

  };
  createCardDetailed();


const taskStatus = document.querySelector(".statuses-container");

const renderStatuses = async function (taskStatusValue) {
  taskStatus.innerHTML = "";
  const res = await fetch(
    "https://momentum.redberryinternship.ge/api/statuses"
  );
  const datas = await res.json();
  console.log(datas);

  const html = `
      <option value="${taskStatusValue}">${taskStatusValue}</option>
      `;
      taskStatus.insertAdjacentHTML("afterbegin", html);

  datas.map(data => {
      const html = `
      <option value="${data.id}">${data.name}</option>
      `;

      taskStatus.insertAdjacentHTML("afterbegin", html);
  });
};
///////////////////////////////////////
//   COMMENTS
const commentIcon = document.querySelector(".comment-icon");
const formCommentContainer = document.querySelector(".form-comment");

const toggleCommentArea = function(e) {
  formCommentContainer.classList.toggle("hidden");
}
commentIcon.addEventListener("click", toggleCommentArea);
