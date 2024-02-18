"use strict";
// DOM ELEMENTS

const signUp = document.getElementById("sign-up-btn");
const modal = document.querySelector(".modal-pop-up");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector("#close-modal");
// const apiKey = "e4d0f46caa734f51b4f2abacc7f1509e";

// MODAL WINDOW POP-UP

const openModal = function (e) {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");

  console.log("clicked");
};

const closeModal = function () {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// MODAL EVENT HANDLERS

signUp.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

// SIGNUP FORM

const signUpForm = document.getElementById("signUP");
signUpForm.addEventListener("click", function (e) {
  const formContainer = document.getElementById("formContainer");
  e.preventDefault;
  const markup = `
  <div class="input-group mb-3">
  <input
    type="text"
    class="form-control form-control-lg bg-light fs-6"
    placeholder="First Name"
  />
</div>
<div class="input-group mb-3">
<input
  type="text"
  class="form-control form-control-lg bg-light fs-6"
  placeholder="Last Name"
/>
</div>
`;
  formContainer.insertAdjacentHTML("beforebegin", markup);
});

// UPTADE UI FOR TOP NEWS

const uptadeUI = function (data) {
  const topNews = document.querySelector(".top-news");
  topNews.innerHTML = "";
  const markup = `
  <div class="row">
        <div class="col-lg-12">
          <div class="list-group">
            <a
              href="${data.articles[0].url}"
              target="_blank"
              class="list-group-item list-group-item-action active"
              aria-current="true"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${data.articles[0].author}</h5>
                <small>${data.articles[0].publishedAt.slice(0, 10)}</small>
              </div>
              <p class="mb-1">${data.articles[0].title}</p>
              <small>Technology</small>
            </a>
            <a
              href="${data.articles[1].url}"
              target="_blank"
              class="list-group-item list-group-item-action "
              aria-current="true"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${data.articles[1].author}</h5>
                <small>${data.articles[1].publishedAt.slice(0, 10)}</small>
              </div>
              <p class="mb-1">${data.articles[1].title}</p>
              <small>Technology</small>
            </a>
            <a
              href="${data.articles[2].url}"
              target="_blank"
              class="list-group-item list-group-item-action "
              aria-current="true"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${data.articles[2].author}</h5>
                <small>${data.articles[2].publishedAt.slice(0, 10)}</small>
              </div>
              <p class="mb-1">${data.articles[2].title}</p>
              <small>Technology</small>
            </a>
            <a
              href="${data.articles[3].url}"
              target="_blank"
              class="list-group-item list-group-item-action "
              aria-current="true"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${data.articles[3].author}</h5>
                <small>${data.articles[3].publishedAt.slice(0, 10)}</small>
              </div>
              <p class="mb-1">${data.articles[3].title}</p>
              <small>Technology</small>
            </a>
            <a
              href="${data.articles[4].url}"
              target="_blank"
              class="list-group-item list-group-item-action "
              aria-current="true"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${data.articles[4].author}</h5>
                <small>${data.articles[4].publishedAt.slice(0, 10)}</small>
              </div>
              <p class="mb-1">${data.articles[4].title}</p>
              <small>Technology</small>
            </a>
          </div>
        </div>
        `;

  topNews.insertAdjacentHTML("beforeend", markup);
};

// CHANGING CATEGORY FOR TOP NEWS

const getCategoryAndGetData = function () {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  dropdownMenu.addEventListener("click", function (event) {
    if (event.target.classList.contains("dropdown-item")) {
      const category = event.target.id;
      getData(category);
    }
  });
};
// GET DATA FOR TOP NEWS

const getData = async function (category) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=tr&category=${category}&apiKey=c6e1eace128c41a0bef920c8335f929b`
    );
    const data = await res.json();
    console.log(data);
    uptadeUI(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

getData("technology");
getCategoryAndGetData();

// SEARCH NEWS

// PAGINATION FOR SEARCH NEWS
let currentPage = 0;
const pageSize = 12; // Her sayfadaki oge sayisi

const uptadePaginationButtons = () => {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  prevButton.disabled = currentPage === 0; // Ilk sayfada olanda onceki butonu calismasi
  nextButton.disabled = currentPage + 1 >= Math.ceil(totalResults / pageSize); //Son sayfadaysak "Sonraki" düğmesini devre dışı bırak
};

// GET SEARCH NEWS FETCH DATA

const getSearchData = async function (searchTerm) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=c6e1eace128c41a0bef920c8335f929b`
    );
    const data = await res.json();
    uptadeSearchUI(data);
    console.log(data);

    // Uptade search UI
  } catch (err) {
    console.error(err);
  }
};

// RENDER SEARCH NEWS

const uptadeSearchUI = function (data) {
  const searchNews = document.querySelector(".search-news");
  searchNews.innerHTML = "";
  for (let i = currentPage * pageSize; i < (currentPage + 1) * pageSize; i++) {
    if (i >= data.articles.length) break;
    const markup = `
  <div class="card mt-3 s-content" style="width: 18rem">
    <img  height = "250" src="${
      data.articles[i].urlToImage ||
      "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
    }" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${data.articles[i].title.slice(0, 50)}...</h5>
      <p class="card-text">
        ${data.articles[i].description.slice(0, 50)}...
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" >Author : ${data.articles[i].author}</li>
      <li class="list-group-item">${data.articles[i].publishedAt.slice(
        0,
        10
      )}</li>
      <li class="list-group-item">${data.articles[i].source.name}</li>
    </ul>
    <div class="card-body">
    <a class="btn btn-primary" href="${
      data.articles[i].url
    }" target="_blank"  role="button">More information</a>
  </div>
`;
    searchNews.insertAdjacentHTML("beforeend", markup);
  }
};

// EVENT HANDLER FOR PREVIOUS AND NEXT BUTTONS

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  const searchTerm = document.getElementById("searchInput").value;
  getSearchData(searchTerm);
});

document.getElementById("prevPage").addEventListener("click", function () {
  if (currentPage > 0) {
    currentPage--;
    const searchTerm = document.getElementById("searchInput").value || "news";
    getSearchData(searchTerm);
    document.getElementById("focusPoint").scrollIntoView();
  }
});

document.getElementById("nextPage").addEventListener("click", function () {
  currentPage++;
  const searchTerm = document.getElementById("searchInput").value || "news";
  getSearchData(searchTerm);
  document.getElementById("focusPoint").scrollIntoView();
});

// FIRST CALL SEARCH NEWS IN NEWS CATEGORY
getSearchData("news");

const subscribtionBTNS = document.querySelectorAll(".subscribtion-buttons");

subscribtionBTNS.forEach((btn) => btn.addEventListener("click", openModal));
