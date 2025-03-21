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
    taskEmployee.textContent = datas.employee.name + " "+ datas.employee.surname;
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
//   TOGGLE COMMENT AREA
/*
const commentIcon = document.querySelector(".comment-icon");
const formCommentContainer = document.querySelector(".form-comment");

const toggleCommentArea = function(e) {
  formCommentContainer.classList.toggle("hidden");
}
commentIcon.addEventListener("click", toggleCommentArea);*/

///////////////////////////////////////////////
//   SEND COMMENT 
const formTextarea = document.querySelector(".form-textarea");

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
const uploadData = async function(e,form,parentId) {
  e.preventDefault();

  const dataArr = [...new FormData(formTextarea)];
  const data = Object.fromEntries(dataArr);
  console.log(data);
  
  const formData = new FormData();
  
  if(form){
    const clicked =  form.description;
    console.log(clicked);
    formData.append("text", clicked.value);
  }else{
    formData.append("text", data.description);
  }
  if(parentId){
    formData.append("parent_id", parentId);
  }

  console.log(formData);
  const datas = await sendJson(`https://momentum.redberryinternship.ge/api/tasks/${pageId}/comments`,formData);
  console.log(datas);
  renderComments();
 
};
formTextarea.addEventListener("submit",uploadData);


///////////////////////////////////////////////
//   GET COMMENTS 

const commentContent = document.querySelector(".comments");

const renderComments = async function () {
  commentContent.innerHTML = "";
    
    const res = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${pageId}/comments`,
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

    const arrangeComments = nestComments(datas);
    console.log(arrangeComments);
    
    
    datas.map(data => {
      const html = `
          <div class="comments-box">
            <div class="comment-content">
              <img class="author-image"src="${data.author_avatar}" alt="author of comment">
              <div class="container">
                <p class="author-fullname">${data.author_nickname}</p>
                <p class="comment">${data.text}
                </p>
              </div>
            </div>
            <img class="comment-icon"src="../assets/icons/comment.png" alt="add comment icon">
            <div class="author-container displayNone">
              <div class="add-comment-container">
                <form onsubmit ="uploadData(event, this,${data.id})"; class="form-textarea form-comment">
                  <textarea
                    name="description"
                    class="textarea"
                    minlength="2"
                    maxlength="255"
                    placeholder="დაწერე კომენტარი"
                  ></textarea>
                  <div class="btn-createTask-box">
                      <button type="submit" class="btn btn-create btn-create-task">
                        დაკომენტარე
                      </button>
                  </div>  
                </form>
                ${data.sub_comments.map(item => `<div class="nested-comment-container">
                  <img class="author-image" src="${item.author_avatar}" alt="author of comment">
                    <div>
                      <p class="author-fullname">${item.author_nickname}</p>
                      <p class="comment">${item.text}
                      </p>
                    </div>
                </div>`)};
              </div>
            </div>
          </div>      
      `;
      commentContent.insertAdjacentHTML("beforeend", html);
      
    });


        ///////////////////////////////////////
      //   TOGGLE COMMENT AREA
      const commentIcons = document.querySelectorAll(".comment-icon");
      const formCommentContainer = document.querySelector(".form-comment");
      
      const toggleCommentArea = function(e) {
        formCommentContainer.classList.toggle("displayNone");
      }
      commentIcons.forEach(icon => {
        icon.addEventListener("click", toggleCommentArea);
      })


};
renderComments();



function nestComments(comments) {
  let commentMap = new Map();
  let rootComments = [];

  comments.forEach(comment => {
      comment.children = [];
      commentMap.set(comment.id, comment);
  });

  comments.forEach(comment => {
      if (comment.parent_id === null) {
          rootComments.push(comment);
      } else {
          let parent = commentMap.get(comment.parent_id);
          if (parent) {
              parent.children.push(comment);
          }
      }
  });

  return rootComments;
}



