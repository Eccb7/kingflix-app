"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["home"],{

/***/ "./src/getShows.js":
/*!*************************!*\
  !*** ./src/getShows.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reservations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservations */ "./src/reservations.js");


const getShows = async () => {
  const homeContainer = document.querySelector(".homepage");
  const reservationsModal = new _reservations__WEBPACK_IMPORTED_MODULE_0__["default"]();
  try {
    const response = await fetch("https://api.tvmaze.com/shows/1/episodes");
    if (!response.ok) {
        throw new Error(`Failed to fetch scores: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    json.forEach((movie) => {
      const body = document.createElement("div");
      body.className = "movies";
      const images = document.createElement("div");
      images.className = "test-img";
      images.innerHTML = `<img src=${movie.image.medium} alt="" class="my-img">`;
      const loveImage = document.createElement("img");
      loveImage.src = "./media-library/love.png";
      loveImage.className = "love";
      const likes = document.createElement("div");
      likes.className = "space";
      likes.innerHTML = `<p>${movie.name}</p>`;
      likes.innerHTML += ` <p>5 likes</p>`;
      likes.appendChild(loveImage);
      const button1 = document.createElement("button");
      button1.className = "btn";
      button1.innerText = "Comments";
      const button2 = document.createElement("button");
      button2.className = "btn viewReservations";
      button2.innerText = "Reservations";
      body.appendChild(images);
      body.appendChild(likes);
      body.appendChild(button1);
      body.appendChild(button2);
      homeContainer.appendChild(body);
    });
  } catch (error) {
      throw new Error("Unable to post");
  }
  reservationsModal.showReservations();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getShows);


/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var _getShows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getShows */ "./src/getShows.js");


class Home {
  constructor() {
    this.renderPosts();
  }  
  renderPosts() {
    (0,_getShows__WEBPACK_IMPORTED_MODULE_0__["default"])();
  }
}


/***/ }),

/***/ "./src/postReservations.js":
/*!*********************************!*\
  !*** ./src/postReservations.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostResevation)
/* harmony export */ });
class PostResevation {
    constructor() {
      this.reservationForm = document.querySelector('.reservationForm');
      this.username = document.querySelector('#username');
      this.startDate = document.querySelector('#startDate');
      this.endDate = document.querySelector('#endDate');
      this.movieId = 0;
    }

    async postResevation(data) {
    try {
      const response = await fetch(
        'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/reservations',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
  
      if (response.ok) {
        console.log("ok");
      }
    } catch (error) {
      throw new Error('Unable to post');
    }
  }

  setupListener(){
    this.reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(this.movieId);
      const data = {
        item_id: this.movieId,
        username: this.username.value,
        date_start: this.startDate.value,
        date_end: this.endDate.value,
      }
      this.postResevation(data);
      this.username.value = '';
      this.startDate.value = '';
      this.endDate.value = '';
    })
  }
}


/***/ }),

/***/ "./src/pullMovies.js":
/*!***************************!*\
  !*** ./src/pullMovies.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PullMoviesData)
/* harmony export */ });
class PullMoviesData {
  constructor() {
    this.url = 'https://api.tvmaze.com/shows/1/episodes';
  }

  async fetchMoviesData() {
    try {
      const response = await fetch(this.url);
      const result = await response.json();
      return result;
    } catch (error) {
    return null;
    }
  }
}


/***/ }),

/***/ "./src/reservations.js":
/*!*****************************!*\
  !*** ./src/reservations.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Reservations)
/* harmony export */ });
/* harmony import */ var _pullMovies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pullMovies.js */ "./src/pullMovies.js");
/* harmony import */ var _postReservations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./postReservations.js */ "./src/postReservations.js");



class Reservations {
  constructor() {
    this.body = document.querySelector('body');
    this.viewReservationsBtns = document.getElementsByClassName('viewReservations');
    this.postReservationData = new _postReservations_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  async createReservationsModal(index) {
    const getMoviesDetails = new _pullMovies_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const moviesDetails = await getMoviesDetails.fetchMoviesData();
    const moviesDetailsArr = Array.from(moviesDetails);

    const reservationsSection = document.createElement('section');
    reservationsSection.className = 'reservationsSection';
    reservationsSection.innerHTML = `
    <div class="reservationsContainer">
      <p class="close-icon"><span class="material-symbols-outlined">close</span></p>
      <div class="movieDescription">
        <img class="movieImage" src="${moviesDetailsArr[index].image.medium}" width="600" alt="simple">
        <h2 class="movieTitle headings">${moviesDetailsArr[index].name}</h2>
        <div class="movieDescription"> ${moviesDetailsArr[index].summary}</div>
      </div>

      <div class="sectionContainers">
        <h2 class="reservationsHeading headings">Reservations:</h2>
        <p>ddddddd</p>
      </div>

      <div class="sectionContainers">
        <h2 class="addReservationsHeading headings">Reserve a Spot:</h2>
        <form class="resevationForm">
          <input class="formFields" type="text" placeholder="Username" id="username" name="username">
          <input class="formFields" type="date" placeholder="Start Date" id="startDate" name="startDate">
          <input class="formFields" type="date" placeholder="End Date" id="endDate" name="endDate">
          <input class="submitBtn" type="submit" value="Reserve">
        </form>
      </div>
    </div>`;
    this.body.appendChild(reservationsSection);
    const reservationCloseBtns = document.querySelectorAll('.close-icon');
    this.closeReservationModal(reservationCloseBtns);
    this.postReservationData.movieId = index;
    this.postReservationData.setupListener();
  }

  closeReservationModal(reservationCloseBtns) {
    const reservationsSections = document.querySelectorAll('.reservationsSection');
    reservationCloseBtns.forEach((each) => each.addEventListener('click', () => {
      reservationsSections.forEach((each) => each.style.display = 'none')
    }))
  }

  showReservations() {
    const btnsArray = Array.from(this.viewReservationsBtns);
    btnsArray.forEach((each, index) => {
      each.addEventListener('click', () => {
        this.createReservationsModal(index);
        
      })
    })
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/home.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHFEQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxnQkFBZ0I7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxvQkFBb0I7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixXQUFXO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzNDVTtBQUNsQztBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHFEQUFRO0FBQ1o7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDVGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5Q2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDZDO0FBQ087QUFDcEQ7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0REFBZTtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsc0RBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHFDQUFxQztBQUM1RSwwQ0FBMEMsNkJBQTZCO0FBQ3ZFLHlDQUF5QyxnQ0FBZ0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9nZXRTaG93cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaG9tZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcG9zdFJlc2VydmF0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcHVsbE1vdmllcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcmVzZXJ2YXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNlcnZhdGlvbnMgZnJvbSAnLi9yZXNlcnZhdGlvbnMnO1xyXG5cclxuY29uc3QgZ2V0U2hvd3MgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgaG9tZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZXBhZ2VcIik7XHJcbiAgY29uc3QgcmVzZXJ2YXRpb25zTW9kYWwgPSBuZXcgUmVzZXJ2YXRpb25zKCk7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzLzEvZXBpc29kZXNcIik7XHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggc2NvcmVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgIGpzb24uZm9yRWFjaCgobW92aWUpID0+IHtcclxuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGJvZHkuY2xhc3NOYW1lID0gXCJtb3ZpZXNcIjtcclxuICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgaW1hZ2VzLmNsYXNzTmFtZSA9IFwidGVzdC1pbWdcIjtcclxuICAgICAgaW1hZ2VzLmlubmVySFRNTCA9IGA8aW1nIHNyYz0ke21vdmllLmltYWdlLm1lZGl1bX0gYWx0PVwiXCIgY2xhc3M9XCJteS1pbWdcIj5gO1xyXG4gICAgICBjb25zdCBsb3ZlSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICBsb3ZlSW1hZ2Uuc3JjID0gXCIuL21lZGlhLWxpYnJhcnkvbG92ZS5wbmdcIjtcclxuICAgICAgbG92ZUltYWdlLmNsYXNzTmFtZSA9IFwibG92ZVwiO1xyXG4gICAgICBjb25zdCBsaWtlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGxpa2VzLmNsYXNzTmFtZSA9IFwic3BhY2VcIjtcclxuICAgICAgbGlrZXMuaW5uZXJIVE1MID0gYDxwPiR7bW92aWUubmFtZX08L3A+YDtcclxuICAgICAgbGlrZXMuaW5uZXJIVE1MICs9IGAgPHA+NSBsaWtlczwvcD5gO1xyXG4gICAgICBsaWtlcy5hcHBlbmRDaGlsZChsb3ZlSW1hZ2UpO1xyXG4gICAgICBjb25zdCBidXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgYnV0dG9uMS5jbGFzc05hbWUgPSBcImJ0blwiO1xyXG4gICAgICBidXR0b24xLmlubmVyVGV4dCA9IFwiQ29tbWVudHNcIjtcclxuICAgICAgY29uc3QgYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgIGJ1dHRvbjIuY2xhc3NOYW1lID0gXCJidG4gdmlld1Jlc2VydmF0aW9uc1wiO1xyXG4gICAgICBidXR0b24yLmlubmVyVGV4dCA9IFwiUmVzZXJ2YXRpb25zXCI7XHJcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1hZ2VzKTtcclxuICAgICAgYm9keS5hcHBlbmRDaGlsZChsaWtlcyk7XHJcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uMSk7XHJcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XHJcbiAgICAgIGhvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9keSk7XHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gcG9zdFwiKTtcclxuICB9XHJcbiAgcmVzZXJ2YXRpb25zTW9kYWwuc2hvd1Jlc2VydmF0aW9ucygpO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBnZXRTaG93cztcclxuIiwiaW1wb3J0IGdldFNob3dzIGZyb20gXCIuL2dldFNob3dzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucmVuZGVyUG9zdHMoKTtcclxuICB9ICBcclxuICByZW5kZXJQb3N0cygpIHtcclxuICAgIGdldFNob3dzKCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RSZXNldmF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLnJlc2VydmF0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNlcnZhdGlvbkZvcm0nKTtcclxuICAgICAgdGhpcy51c2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VybmFtZScpO1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydERhdGUnKTtcclxuICAgICAgdGhpcy5lbmREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZERhdGUnKTtcclxuICAgICAgdGhpcy5tb3ZpZUlkID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwb3N0UmVzZXZhdGlvbihkYXRhKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAgICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9yZXNlcnZhdGlvbnMnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcbiAgXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib2tcIik7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBvc3QnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldHVwTGlzdGVuZXIoKXtcclxuICAgIHRoaXMucmVzZXJ2YXRpb25Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5tb3ZpZUlkKTtcclxuICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICBpdGVtX2lkOiB0aGlzLm1vdmllSWQsXHJcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlcm5hbWUudmFsdWUsXHJcbiAgICAgICAgZGF0ZV9zdGFydDogdGhpcy5zdGFydERhdGUudmFsdWUsXHJcbiAgICAgICAgZGF0ZV9lbmQ6IHRoaXMuZW5kRGF0ZS52YWx1ZSxcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnBvc3RSZXNldmF0aW9uKGRhdGEpO1xyXG4gICAgICB0aGlzLnVzZXJuYW1lLnZhbHVlID0gJyc7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlLnZhbHVlID0gJyc7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZS52YWx1ZSA9ICcnO1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVsbE1vdmllc0RhdGEge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy51cmwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cy8xL2VwaXNvZGVzJztcclxuICB9XHJcblxyXG4gIGFzeW5jIGZldGNoTW92aWVzRGF0YSgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godGhpcy51cmwpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQdWxsTW92aWVzRGF0YSBmcm9tICcuL3B1bGxNb3ZpZXMuanMnO1xyXG5pbXBvcnQgUG9zdFJlc2VydmF0aW9uIGZyb20gJy4vcG9zdFJlc2VydmF0aW9ucy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNlcnZhdGlvbnMge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgdGhpcy52aWV3UmVzZXJ2YXRpb25zQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZpZXdSZXNlcnZhdGlvbnMnKTtcclxuICAgIHRoaXMucG9zdFJlc2VydmF0aW9uRGF0YSA9IG5ldyBQb3N0UmVzZXJ2YXRpb24oKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZVJlc2VydmF0aW9uc01vZGFsKGluZGV4KSB7XHJcbiAgICBjb25zdCBnZXRNb3ZpZXNEZXRhaWxzID0gbmV3IFB1bGxNb3ZpZXNEYXRhKCk7XHJcbiAgICBjb25zdCBtb3ZpZXNEZXRhaWxzID0gYXdhaXQgZ2V0TW92aWVzRGV0YWlscy5mZXRjaE1vdmllc0RhdGEoKTtcclxuICAgIGNvbnN0IG1vdmllc0RldGFpbHNBcnIgPSBBcnJheS5mcm9tKG1vdmllc0RldGFpbHMpO1xyXG5cclxuICAgIGNvbnN0IHJlc2VydmF0aW9uc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XHJcbiAgICByZXNlcnZhdGlvbnNTZWN0aW9uLmNsYXNzTmFtZSA9ICdyZXNlcnZhdGlvbnNTZWN0aW9uJztcclxuICAgIHJlc2VydmF0aW9uc1NlY3Rpb24uaW5uZXJIVE1MID0gYFxyXG4gICAgPGRpdiBjbGFzcz1cInJlc2VydmF0aW9uc0NvbnRhaW5lclwiPlxyXG4gICAgICA8cCBjbGFzcz1cImNsb3NlLWljb25cIj48c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5jbG9zZTwvc3Bhbj48L3A+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtb3ZpZURlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgPGltZyBjbGFzcz1cIm1vdmllSW1hZ2VcIiBzcmM9XCIke21vdmllc0RldGFpbHNBcnJbaW5kZXhdLmltYWdlLm1lZGl1bX1cIiB3aWR0aD1cIjYwMFwiIGFsdD1cInNpbXBsZVwiPlxyXG4gICAgICAgIDxoMiBjbGFzcz1cIm1vdmllVGl0bGUgaGVhZGluZ3NcIj4ke21vdmllc0RldGFpbHNBcnJbaW5kZXhdLm5hbWV9PC9oMj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibW92aWVEZXNjcmlwdGlvblwiPiAke21vdmllc0RldGFpbHNBcnJbaW5kZXhdLnN1bW1hcnl9PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb25Db250YWluZXJzXCI+XHJcbiAgICAgICAgPGgyIGNsYXNzPVwicmVzZXJ2YXRpb25zSGVhZGluZyBoZWFkaW5nc1wiPlJlc2VydmF0aW9uczo8L2gyPlxyXG4gICAgICAgIDxwPmRkZGRkZGQ8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb25Db250YWluZXJzXCI+XHJcbiAgICAgICAgPGgyIGNsYXNzPVwiYWRkUmVzZXJ2YXRpb25zSGVhZGluZyBoZWFkaW5nc1wiPlJlc2VydmUgYSBTcG90OjwvaDI+XHJcbiAgICAgICAgPGZvcm0gY2xhc3M9XCJyZXNldmF0aW9uRm9ybVwiPlxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIGlkPVwidXNlcm5hbWVcIiBuYW1lPVwidXNlcm5hbWVcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm1GaWVsZHNcIiB0eXBlPVwiZGF0ZVwiIHBsYWNlaG9sZGVyPVwiU3RhcnQgRGF0ZVwiIGlkPVwic3RhcnREYXRlXCIgbmFtZT1cInN0YXJ0RGF0ZVwiPlxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJkYXRlXCIgcGxhY2Vob2xkZXI9XCJFbmQgRGF0ZVwiIGlkPVwiZW5kRGF0ZVwiIG5hbWU9XCJlbmREYXRlXCI+XHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzdWJtaXRCdG5cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJSZXNlcnZlXCI+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PmA7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQocmVzZXJ2YXRpb25zU2VjdGlvbik7XHJcbiAgICBjb25zdCByZXNlcnZhdGlvbkNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZS1pY29uJyk7XHJcbiAgICB0aGlzLmNsb3NlUmVzZXJ2YXRpb25Nb2RhbChyZXNlcnZhdGlvbkNsb3NlQnRucyk7XHJcbiAgICB0aGlzLnBvc3RSZXNlcnZhdGlvbkRhdGEubW92aWVJZCA9IGluZGV4O1xyXG4gICAgdGhpcy5wb3N0UmVzZXJ2YXRpb25EYXRhLnNldHVwTGlzdGVuZXIoKTtcclxuICB9XHJcblxyXG4gIGNsb3NlUmVzZXJ2YXRpb25Nb2RhbChyZXNlcnZhdGlvbkNsb3NlQnRucykge1xyXG4gICAgY29uc3QgcmVzZXJ2YXRpb25zU2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVzZXJ2YXRpb25zU2VjdGlvbicpO1xyXG4gICAgcmVzZXJ2YXRpb25DbG9zZUJ0bnMuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgcmVzZXJ2YXRpb25zU2VjdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKVxyXG4gICAgfSkpXHJcbiAgfVxyXG5cclxuICBzaG93UmVzZXJ2YXRpb25zKCkge1xyXG4gICAgY29uc3QgYnRuc0FycmF5ID0gQXJyYXkuZnJvbSh0aGlzLnZpZXdSZXNlcnZhdGlvbnNCdG5zKTtcclxuICAgIGJ0bnNBcnJheS5mb3JFYWNoKChlYWNoLCBpbmRleCkgPT4ge1xyXG4gICAgICBlYWNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUmVzZXJ2YXRpb25zTW9kYWwoaW5kZXgpO1xyXG4gICAgICAgIFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9