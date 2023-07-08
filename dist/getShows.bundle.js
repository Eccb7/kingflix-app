"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["getShows"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/getShows.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2hvd3MuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxREFBWTtBQUM1QztBQUNBO0FBQ0E7QUFDQSxtREFBbUQsZ0JBQWdCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsb0JBQW9CO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsV0FBVztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzNDVDtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzlDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkNkM7QUFDTztBQUNwRDtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDREQUFlO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxzREFBYztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMscUNBQXFDO0FBQzVFLDBDQUEwQyw2QkFBNkI7QUFDdkUseUNBQXlDLGdDQUFnQztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2dldFNob3dzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9wb3N0UmVzZXJ2YXRpb25zLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9wdWxsTW92aWVzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlc2VydmF0aW9ucyBmcm9tICcuL3Jlc2VydmF0aW9ucyc7XHJcblxyXG5jb25zdCBnZXRTaG93cyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBob21lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lcGFnZVwiKTtcclxuICBjb25zdCByZXNlcnZhdGlvbnNNb2RhbCA9IG5ldyBSZXNlcnZhdGlvbnMoKTtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2hvd3MvMS9lcGlzb2Rlc1wiKTtcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBzY29yZXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xyXG4gICAgfVxyXG4gICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIGNvbnNvbGUubG9nKGpzb24pO1xyXG4gICAganNvbi5mb3JFYWNoKChtb3ZpZSkgPT4ge1xyXG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgYm9keS5jbGFzc05hbWUgPSBcIm1vdmllc1wiO1xyXG4gICAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBpbWFnZXMuY2xhc3NOYW1lID0gXCJ0ZXN0LWltZ1wiO1xyXG4gICAgICBpbWFnZXMuaW5uZXJIVE1MID0gYDxpbWcgc3JjPSR7bW92aWUuaW1hZ2UubWVkaXVtfSBhbHQ9XCJcIiBjbGFzcz1cIm15LWltZ1wiPmA7XHJcbiAgICAgIGNvbnN0IGxvdmVJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgIGxvdmVJbWFnZS5zcmMgPSBcIi4vbWVkaWEtbGlicmFyeS9sb3ZlLnBuZ1wiO1xyXG4gICAgICBsb3ZlSW1hZ2UuY2xhc3NOYW1lID0gXCJsb3ZlXCI7XHJcbiAgICAgIGNvbnN0IGxpa2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgbGlrZXMuY2xhc3NOYW1lID0gXCJzcGFjZVwiO1xyXG4gICAgICBsaWtlcy5pbm5lckhUTUwgPSBgPHA+JHttb3ZpZS5uYW1lfTwvcD5gO1xyXG4gICAgICBsaWtlcy5pbm5lckhUTUwgKz0gYCA8cD41IGxpa2VzPC9wPmA7XHJcbiAgICAgIGxpa2VzLmFwcGVuZENoaWxkKGxvdmVJbWFnZSk7XHJcbiAgICAgIGNvbnN0IGJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICBidXR0b24xLmNsYXNzTmFtZSA9IFwiYnRuXCI7XHJcbiAgICAgIGJ1dHRvbjEuaW5uZXJUZXh0ID0gXCJDb21tZW50c1wiO1xyXG4gICAgICBjb25zdCBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgYnV0dG9uMi5jbGFzc05hbWUgPSBcImJ0biB2aWV3UmVzZXJ2YXRpb25zXCI7XHJcbiAgICAgIGJ1dHRvbjIuaW5uZXJUZXh0ID0gXCJSZXNlcnZhdGlvbnNcIjtcclxuICAgICAgYm9keS5hcHBlbmRDaGlsZChpbWFnZXMpO1xyXG4gICAgICBib2R5LmFwcGVuZENoaWxkKGxpa2VzKTtcclxuICAgICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24xKTtcclxuICAgICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24yKTtcclxuICAgICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChib2R5KTtcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBwb3N0XCIpO1xyXG4gIH1cclxuICByZXNlcnZhdGlvbnNNb2RhbC5zaG93UmVzZXJ2YXRpb25zKCk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGdldFNob3dzO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3N0UmVzZXZhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgdGhpcy5yZXNlcnZhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXJ2YXRpb25Gb3JtJyk7XHJcbiAgICAgIHRoaXMudXNlcm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlcm5hbWUnKTtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnREYXRlJyk7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmREYXRlJyk7XHJcbiAgICAgIHRoaXMubW92aWVJZCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcG9zdFJlc2V2YXRpb24oZGF0YSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgICAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvcmVzZXJ2YXRpb25zJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG4gIFxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9rXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwb3N0Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXR1cExpc3RlbmVyKCl7XHJcbiAgICB0aGlzLnJlc2VydmF0aW9uRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubW92aWVJZCk7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgaXRlbV9pZDogdGhpcy5tb3ZpZUlkLFxyXG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLnZhbHVlLFxyXG4gICAgICAgIGRhdGVfc3RhcnQ6IHRoaXMuc3RhcnREYXRlLnZhbHVlLFxyXG4gICAgICAgIGRhdGVfZW5kOiB0aGlzLmVuZERhdGUudmFsdWUsXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wb3N0UmVzZXZhdGlvbihkYXRhKTtcclxuICAgICAgdGhpcy51c2VybmFtZS52YWx1ZSA9ICcnO1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZS52YWx1ZSA9ICcnO1xyXG4gICAgICB0aGlzLmVuZERhdGUudmFsdWUgPSAnJztcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1bGxNb3ZpZXNEYXRhIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudXJsID0gJ2h0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2hvd3MvMS9lcGlzb2Rlcyc7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmZXRjaE1vdmllc0RhdGEoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMudXJsKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUHVsbE1vdmllc0RhdGEgZnJvbSAnLi9wdWxsTW92aWVzLmpzJztcclxuaW1wb3J0IFBvc3RSZXNlcnZhdGlvbiBmcm9tICcuL3Bvc3RSZXNlcnZhdGlvbnMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzZXJ2YXRpb25zIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICAgIHRoaXMudmlld1Jlc2VydmF0aW9uc0J0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2aWV3UmVzZXJ2YXRpb25zJyk7XHJcbiAgICB0aGlzLnBvc3RSZXNlcnZhdGlvbkRhdGEgPSBuZXcgUG9zdFJlc2VydmF0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChpbmRleCkge1xyXG4gICAgY29uc3QgZ2V0TW92aWVzRGV0YWlscyA9IG5ldyBQdWxsTW92aWVzRGF0YSgpO1xyXG4gICAgY29uc3QgbW92aWVzRGV0YWlscyA9IGF3YWl0IGdldE1vdmllc0RldGFpbHMuZmV0Y2hNb3ZpZXNEYXRhKCk7XHJcbiAgICBjb25zdCBtb3ZpZXNEZXRhaWxzQXJyID0gQXJyYXkuZnJvbShtb3ZpZXNEZXRhaWxzKTtcclxuXHJcbiAgICBjb25zdCByZXNlcnZhdGlvbnNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xyXG4gICAgcmVzZXJ2YXRpb25zU2VjdGlvbi5jbGFzc05hbWUgPSAncmVzZXJ2YXRpb25zU2VjdGlvbic7XHJcbiAgICByZXNlcnZhdGlvbnNTZWN0aW9uLmlubmVySFRNTCA9IGBcclxuICAgIDxkaXYgY2xhc3M9XCJyZXNlcnZhdGlvbnNDb250YWluZXJcIj5cclxuICAgICAgPHAgY2xhc3M9XCJjbG9zZS1pY29uXCI+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+Y2xvc2U8L3NwYW4+PC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW92aWVEZXNjcmlwdGlvblwiPlxyXG4gICAgICAgIDxpbWcgY2xhc3M9XCJtb3ZpZUltYWdlXCIgc3JjPVwiJHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5pbWFnZS5tZWRpdW19XCIgd2lkdGg9XCI2MDBcIiBhbHQ9XCJzaW1wbGVcIj5cclxuICAgICAgICA8aDIgY2xhc3M9XCJtb3ZpZVRpdGxlIGhlYWRpbmdzXCI+JHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5uYW1lfTwvaDI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vdmllRGVzY3JpcHRpb25cIj4gJHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5zdW1tYXJ5fTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uQ29udGFpbmVyc1wiPlxyXG4gICAgICAgIDxoMiBjbGFzcz1cInJlc2VydmF0aW9uc0hlYWRpbmcgaGVhZGluZ3NcIj5SZXNlcnZhdGlvbnM6PC9oMj5cclxuICAgICAgICA8cD5kZGRkZGRkPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uQ29udGFpbmVyc1wiPlxyXG4gICAgICAgIDxoMiBjbGFzcz1cImFkZFJlc2VydmF0aW9uc0hlYWRpbmcgaGVhZGluZ3NcIj5SZXNlcnZlIGEgU3BvdDo8L2gyPlxyXG4gICAgICAgIDxmb3JtIGNsYXNzPVwicmVzZXZhdGlvbkZvcm1cIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm1GaWVsZHNcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiBpZD1cInVzZXJuYW1lXCIgbmFtZT1cInVzZXJuYW1lXCI+XHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtRmllbGRzXCIgdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIlN0YXJ0IERhdGVcIiBpZD1cInN0YXJ0RGF0ZVwiIG5hbWU9XCJzdGFydERhdGVcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm1GaWVsZHNcIiB0eXBlPVwiZGF0ZVwiIHBsYWNlaG9sZGVyPVwiRW5kIERhdGVcIiBpZD1cImVuZERhdGVcIiBuYW1lPVwiZW5kRGF0ZVwiPlxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwic3VibWl0QnRuXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiUmVzZXJ2ZVwiPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5gO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHJlc2VydmF0aW9uc1NlY3Rpb24pO1xyXG4gICAgY29uc3QgcmVzZXJ2YXRpb25DbG9zZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UtaWNvbicpO1xyXG4gICAgdGhpcy5jbG9zZVJlc2VydmF0aW9uTW9kYWwocmVzZXJ2YXRpb25DbG9zZUJ0bnMpO1xyXG4gICAgdGhpcy5wb3N0UmVzZXJ2YXRpb25EYXRhLm1vdmllSWQgPSBpbmRleDtcclxuICAgIHRoaXMucG9zdFJlc2VydmF0aW9uRGF0YS5zZXR1cExpc3RlbmVyKCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZVJlc2VydmF0aW9uTW9kYWwocmVzZXJ2YXRpb25DbG9zZUJ0bnMpIHtcclxuICAgIGNvbnN0IHJlc2VydmF0aW9uc1NlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc2VydmF0aW9uc1NlY3Rpb24nKTtcclxuICAgIHJlc2VydmF0aW9uQ2xvc2VCdG5zLmZvckVhY2goKGVhY2gpID0+IGVhY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHJlc2VydmF0aW9uc1NlY3Rpb25zLmZvckVhY2goKGVhY2gpID0+IGVhY2guc3R5bGUuZGlzcGxheSA9ICdub25lJylcclxuICAgIH0pKVxyXG4gIH1cclxuXHJcbiAgc2hvd1Jlc2VydmF0aW9ucygpIHtcclxuICAgIGNvbnN0IGJ0bnNBcnJheSA9IEFycmF5LmZyb20odGhpcy52aWV3UmVzZXJ2YXRpb25zQnRucyk7XHJcbiAgICBidG5zQXJyYXkuZm9yRWFjaCgoZWFjaCwgaW5kZXgpID0+IHtcclxuICAgICAgZWFjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVJlc2VydmF0aW9uc01vZGFsKGluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==