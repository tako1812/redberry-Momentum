"use strict";











const createListingDetailed = async function () {
    const token = "9d109274-ed65-48e6-a843-284dc8f78e83";
  
    const res = await fetch(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${pageId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      }
    );
    const datas = await res.json();
    cardData.push(datas);
    console.log(datas);
  
    const mainImage = document.querySelector(".img-detailed");
    const listingPrice = document.querySelector(".listing-price");
    const listingLocation = document.querySelector(".listing-details-location");
    const listingArea = document.querySelector(".listing-details-area");
    const listingBedrooms = document.querySelector(".listing-details-bedrooms");
    const listingPostcode = document.querySelector(".listing-details-postcode");
    const listingTextarea = document.querySelector(".listing-textarea");
    const agentImage = document.querySelector(".agent-image");
    const agentName = document.querySelector(".listing-details-name");
    const agentEmail = document.querySelector(".listing-details-email");
    const agentNumber = document.querySelector(".listing-details-number");
  
    mainImage.src = datas.image;
    listingPrice.textContent = datas.price;
    listingLocation.textContent = (datas.city.name, datas.address);
    listingArea.textContent = datas.area;
    listingBedrooms.textContent = datas.bedrooms;
    listingPostcode.textContent = datas.zip_code;
    listingTextarea.textContent = datas.description;
    agentImage.src = datas.agent.avatar;
    agentName.textContent = (datas.agent.name, datas.agent.surname);
    agentEmail.textContent = datas.agent.email;
    agentNumber.textContent = datas.agent.phone;
    sss.style.display = "block";
  };
  //listingDetailedContainer.innerHTML = " ";
  createListingDetailed();