"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["reservations"],{

/***/ "./src/reservationModal/displayReservation.js":
/*!****************************************************!*\
  !*** ./src/reservationModal/displayReservation.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DisplayAfterPost)
/* harmony export */ });
/* harmony import */ var _reservationModal_fetchReservations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reservationModal/fetchReservations.js */ "./src/reservationModal/fetchReservations.js");


class DisplayAfterPost {
  constructor() {
    this.reservationCount = 0;
  }

  updateCounter(fetchedReservationArr) {
    // Updates counter
    this.reservationCount = fetchedReservationArr.length;
    const reservationsHeading = document.querySelectorAll('.reservationsHeading');
    reservationsHeading.forEach((each) => each.textContent = `Reservations (${this.reservationCount}):`);
  }

  async displayReservations(index) {
    const fetchReservations = new _reservationModal_fetchReservations_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    fetchReservations.movieID = index;
    const fetchedReservation = await fetchReservations.fetchReservationsData();
    const fetchedReservationArr = Array.from(fetchedReservation);
    const existingReservations = document.querySelectorAll('.existingReservations');

    // Clear existing reservations
    existingReservations.forEach((each) => each.innerHTML = '');
    this.updateCounter(fetchedReservationArr);

    fetchedReservationArr.forEach((each) => {
      const reservation = document.createElement('p');
      reservation.textContent = `${each.date_start} - ${each.date_end} by ${each.username}`;
      existingReservations.forEach((each) => {
        each.appendChild(reservation);
      });
    });
  }
}

/***/ }),

/***/ "./src/reservationModal/fetchReservations.js":
/*!***************************************************!*\
  !*** ./src/reservationModal/fetchReservations.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FetchReservations)
/* harmony export */ });
class FetchReservations {
  constructor() {
    this.movieID = 0;
  }

  async fetchReservationsData() {
    const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/reservations?item_id=item${this.movieID}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      return null;
    }
  }
}


/***/ }),

/***/ "./src/reservationModal/postReservation.js":
/*!*************************************************!*\
  !*** ./src/reservationModal/postReservation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostResevation)
/* harmony export */ });
/* harmony import */ var _reservationModal_displayReservation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reservationModal/displayReservation.js */ "./src/reservationModal/displayReservation.js");


class PostResevation {
  constructor() {
    this.reservationForm = document.querySelector('.reservationForm');
    this.username = document.querySelector('#username');
    this.startDate = document.querySelector('#startDate');
    this.endDate = document.querySelector('#endDate');
    this.movieId = 0;

  }

  async postReservation(data) {
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
        // console.log('ok');
      }
    } catch (error) {
      throw new Error('Unable to post');
    }

    // update displayed reservations
    const loadReservations = new _reservationModal_displayReservation_js__WEBPACK_IMPORTED_MODULE_0__["default"];
    loadReservations.displayReservations(this.movieId);
  }

  setupListener() {
    console.log(this.movieId);
    this.reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(this.movieId);
      const data = {
        item_id: `item${this.movieId}`,
        username: this.username.value,
        date_start: this.startDate.value,
        date_end: this.endDate.value,
      };
      this.postReservation(data);
      this.username.value = '';
      this.startDate.value = '';
      this.endDate.value = '';
    });
  }
}

/***/ }),

/***/ "./src/reservationModal/pullMovies.js":
/*!********************************************!*\
  !*** ./src/reservationModal/pullMovies.js ***!
  \********************************************/
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

/***/ "./src/reservationModal/reservations.js":
/*!**********************************************!*\
  !*** ./src/reservationModal/reservations.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Reservations)
/* harmony export */ });
/* harmony import */ var _pullMovies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pullMovies.js */ "./src/reservationModal/pullMovies.js");
/* harmony import */ var _postReservation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./postReservation.js */ "./src/reservationModal/postReservation.js");
/* harmony import */ var _fetchReservations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetchReservations.js */ "./src/reservationModal/fetchReservations.js");




class Reservations {
  constructor() {
    this.body = document.querySelector('body');
    this.viewReservationsBtns = document.getElementsByClassName('viewReservations');
    this.fetchReservations = new _fetchReservations_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.reservationCount = 0;
    this.showReservations();
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
        <h2 class="reservationsHeading headings">Reservations(${this.reservationCount}):</h2>
        <div class="existingReservations"> </div>
      </div>

      <div class="sectionContainers">
        <h2 class="addReservationsHeading headings">Reserve a Spot:</h2>
        <form class="reservationForm">
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

    const postReservationData = new _postReservation_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    postReservationData.movieId = index;
    postReservationData.setupListener();
  }

  closeReservationModal(reservationCloseBtns) {
    const reservationsSections = document.querySelectorAll('.reservationsSection');
    reservationCloseBtns.forEach((each) => each.addEventListener('click', () => {
      reservationsSections.forEach((each) => each.style.display = 'none');
    }));
  }

  updateCounter(fetchedReservationArr) {
    // Updates counter
    this.reservationCount = fetchedReservationArr.length;
    const reservationsHeading = document.querySelectorAll('.reservationsHeading');
    reservationsHeading.forEach((each) => each.textContent = `Reservations (${this.reservationCount}):`);
  }

  async displayReservations(index) {
    const fetchReservations = new _fetchReservations_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    fetchReservations.movieID = index;
    const fetchedReservation = await fetchReservations.fetchReservationsData();
    const fetchedReservationArr = Array.from(fetchedReservation);
    const existingReservations = document.querySelectorAll('.existingReservations');

    // Clear existing reservations
    existingReservations.forEach((each) => each.innerHTML = '');
    this.updateCounter(fetchedReservationArr);

    fetchedReservationArr.forEach((each) => {
      const reservation = document.createElement('p');
      reservation.textContent = `${each.date_start} - ${each.date_end} by ${each.username}`;
      existingReservations.forEach((each) => {
        each.appendChild(reservation);
      });
    });
  }

  showReservations() {
    const btnsArray = Array.from(this.viewReservationsBtns);
    btnsArray.forEach((each, eachindex) => {
      each.addEventListener('click', () => {
        this.createReservationsModal(eachindex);
        this.displayReservations(eachindex);
      });
    });
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/reservationModal/reservations.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXJ2YXRpb25zLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF5RTtBQUN6RTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSxzQkFBc0I7QUFDcEc7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDhFQUFpQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlCQUFpQixJQUFJLGVBQWUsS0FBSyxjQUFjO0FBQzFGO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDakNlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUlBQXlJLGFBQWE7QUFDdEo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmd0U7O0FBRXpEO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsK0VBQWdCO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3REZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkNkM7QUFDTTtBQUNJOztBQUV4QztBQUNmO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyw2REFBaUI7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLHNEQUFjO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHFDQUFxQztBQUM1RSwwQ0FBMEMsNkJBQTZCO0FBQ3ZFLHlDQUF5QyxnQ0FBZ0M7QUFDekU7O0FBRUE7QUFDQSxnRUFBZ0Usc0JBQXNCO0FBQ3RGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9DQUFvQywyREFBZTtBQUNuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsc0JBQXNCO0FBQ3BHOztBQUVBO0FBQ0Esa0NBQWtDLDZEQUFpQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxpQkFBaUIsSUFBSSxlQUFlLEtBQUssY0FBYztBQUMxRjtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcmVzZXJ2YXRpb25Nb2RhbC9kaXNwbGF5UmVzZXJ2YXRpb24uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvZmV0Y2hSZXNlcnZhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvcG9zdFJlc2VydmF0aW9uLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL3B1bGxNb3ZpZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvcmVzZXJ2YXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGZXRjaFJlc2VydmF0aW9ucyBmcm9tICcuLi9yZXNlcnZhdGlvbk1vZGFsL2ZldGNoUmVzZXJ2YXRpb25zLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BsYXlBZnRlclBvc3Qge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yZXNlcnZhdGlvbkNvdW50ID0gMDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKSB7XHJcbiAgICAvLyBVcGRhdGVzIGNvdW50ZXJcclxuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IGZldGNoZWRSZXNlcnZhdGlvbkFyci5sZW5ndGg7XHJcbiAgICBjb25zdCByZXNlcnZhdGlvbnNIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc2VydmF0aW9uc0hlYWRpbmcnKTtcclxuICAgIHJlc2VydmF0aW9uc0hlYWRpbmcuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC50ZXh0Q29udGVudCA9IGBSZXNlcnZhdGlvbnMgKCR7dGhpcy5yZXNlcnZhdGlvbkNvdW50fSk6YCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBkaXNwbGF5UmVzZXJ2YXRpb25zKGluZGV4KSB7XHJcbiAgICBjb25zdCBmZXRjaFJlc2VydmF0aW9ucyA9IG5ldyBGZXRjaFJlc2VydmF0aW9ucygpO1xyXG4gICAgZmV0Y2hSZXNlcnZhdGlvbnMubW92aWVJRCA9IGluZGV4O1xyXG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uID0gYXdhaXQgZmV0Y2hSZXNlcnZhdGlvbnMuZmV0Y2hSZXNlcnZhdGlvbnNEYXRhKCk7XHJcbiAgICBjb25zdCBmZXRjaGVkUmVzZXJ2YXRpb25BcnIgPSBBcnJheS5mcm9tKGZldGNoZWRSZXNlcnZhdGlvbik7XHJcbiAgICBjb25zdCBleGlzdGluZ1Jlc2VydmF0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leGlzdGluZ1Jlc2VydmF0aW9ucycpO1xyXG5cclxuICAgIC8vIENsZWFyIGV4aXN0aW5nIHJlc2VydmF0aW9uc1xyXG4gICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC5pbm5lckhUTUwgPSAnJyk7XHJcbiAgICB0aGlzLnVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKTtcclxuXHJcbiAgICBmZXRjaGVkUmVzZXJ2YXRpb25BcnIuZm9yRWFjaCgoZWFjaCkgPT4ge1xyXG4gICAgICBjb25zdCByZXNlcnZhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgcmVzZXJ2YXRpb24udGV4dENvbnRlbnQgPSBgJHtlYWNoLmRhdGVfc3RhcnR9IC0gJHtlYWNoLmRhdGVfZW5kfSBieSAke2VhY2gudXNlcm5hbWV9YDtcclxuICAgICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4ge1xyXG4gICAgICAgIGVhY2guYXBwZW5kQ2hpbGQocmVzZXJ2YXRpb24pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZldGNoUmVzZXJ2YXRpb25zIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tb3ZpZUlEID0gMDtcbiAgfVxuXG4gIGFzeW5jIGZldGNoUmVzZXJ2YXRpb25zRGF0YSgpIHtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvcmVzZXJ2YXRpb25zP2l0ZW1faWQ9aXRlbSR7dGhpcy5tb3ZpZUlEfWA7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXlBZnRlclBvc3QgZnJvbSAnLi4vcmVzZXJ2YXRpb25Nb2RhbC9kaXNwbGF5UmVzZXJ2YXRpb24uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RSZXNldmF0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZXNlcnZhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXJ2YXRpb25Gb3JtJyk7XG4gICAgdGhpcy51c2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VybmFtZScpO1xuICAgIHRoaXMuc3RhcnREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0RGF0ZScpO1xuICAgIHRoaXMuZW5kRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmREYXRlJyk7XG4gICAgdGhpcy5tb3ZpZUlkID0gMDtcblxuICB9XG5cbiAgYXN5bmMgcG9zdFJlc2VydmF0aW9uKGRhdGEpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL3Jlc2VydmF0aW9ucycsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29rJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBvc3QnKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgZGlzcGxheWVkIHJlc2VydmF0aW9uc1xuICAgIGNvbnN0IGxvYWRSZXNlcnZhdGlvbnMgPSBuZXcgRGlzcGxheUFmdGVyUG9zdDtcbiAgICBsb2FkUmVzZXJ2YXRpb25zLmRpc3BsYXlSZXNlcnZhdGlvbnModGhpcy5tb3ZpZUlkKTtcbiAgfVxuXG4gIHNldHVwTGlzdGVuZXIoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5tb3ZpZUlkKTtcbiAgICB0aGlzLnJlc2VydmF0aW9uRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5tb3ZpZUlkKTtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGl0ZW1faWQ6IGBpdGVtJHt0aGlzLm1vdmllSWR9YCxcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlcm5hbWUudmFsdWUsXG4gICAgICAgIGRhdGVfc3RhcnQ6IHRoaXMuc3RhcnREYXRlLnZhbHVlLFxuICAgICAgICBkYXRlX2VuZDogdGhpcy5lbmREYXRlLnZhbHVlLFxuICAgICAgfTtcbiAgICAgIHRoaXMucG9zdFJlc2VydmF0aW9uKGRhdGEpO1xuICAgICAgdGhpcy51c2VybmFtZS52YWx1ZSA9ICcnO1xuICAgICAgdGhpcy5zdGFydERhdGUudmFsdWUgPSAnJztcbiAgICAgIHRoaXMuZW5kRGF0ZS52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVsbE1vdmllc0RhdGEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVybCA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzLzEvZXBpc29kZXMnO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hNb3ZpZXNEYXRhKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMudXJsKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFB1bGxNb3ZpZXNEYXRhIGZyb20gJy4vcHVsbE1vdmllcy5qcyc7XG5pbXBvcnQgUG9zdFJlc2VydmF0aW9uIGZyb20gJy4vcG9zdFJlc2VydmF0aW9uLmpzJztcbmltcG9ydCBGZXRjaFJlc2VydmF0aW9ucyBmcm9tICcuL2ZldGNoUmVzZXJ2YXRpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzZXJ2YXRpb25zIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIHRoaXMudmlld1Jlc2VydmF0aW9uc0J0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2aWV3UmVzZXJ2YXRpb25zJyk7XG4gICAgdGhpcy5mZXRjaFJlc2VydmF0aW9ucyA9IG5ldyBGZXRjaFJlc2VydmF0aW9ucygpO1xuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IDA7XG4gICAgdGhpcy5zaG93UmVzZXJ2YXRpb25zKCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChpbmRleCkge1xuICAgIGNvbnN0IGdldE1vdmllc0RldGFpbHMgPSBuZXcgUHVsbE1vdmllc0RhdGEoKTtcbiAgICBjb25zdCBtb3ZpZXNEZXRhaWxzID0gYXdhaXQgZ2V0TW92aWVzRGV0YWlscy5mZXRjaE1vdmllc0RhdGEoKTtcbiAgICBjb25zdCBtb3ZpZXNEZXRhaWxzQXJyID0gQXJyYXkuZnJvbShtb3ZpZXNEZXRhaWxzKTtcblxuICAgIGNvbnN0IHJlc2VydmF0aW9uc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgcmVzZXJ2YXRpb25zU2VjdGlvbi5jbGFzc05hbWUgPSAncmVzZXJ2YXRpb25zU2VjdGlvbic7XG4gICAgcmVzZXJ2YXRpb25zU2VjdGlvbi5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInJlc2VydmF0aW9uc0NvbnRhaW5lclwiPlxuICAgICAgPHAgY2xhc3M9XCJjbG9zZS1pY29uXCI+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+Y2xvc2U8L3NwYW4+PC9wPlxuICAgICAgPGRpdiBjbGFzcz1cIm1vdmllRGVzY3JpcHRpb25cIj5cbiAgICAgICAgPGltZyBjbGFzcz1cIm1vdmllSW1hZ2VcIiBzcmM9XCIke21vdmllc0RldGFpbHNBcnJbaW5kZXhdLmltYWdlLm1lZGl1bX1cIiB3aWR0aD1cIjYwMFwiIGFsdD1cInNpbXBsZVwiPlxuICAgICAgICA8aDIgY2xhc3M9XCJtb3ZpZVRpdGxlIGhlYWRpbmdzXCI+JHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5uYW1lfTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb3ZpZURlc2NyaXB0aW9uXCI+ICR7bW92aWVzRGV0YWlsc0FycltpbmRleF0uc3VtbWFyeX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwicmVzZXJ2YXRpb25zSGVhZGluZyBoZWFkaW5nc1wiPlJlc2VydmF0aW9ucygke3RoaXMucmVzZXJ2YXRpb25Db3VudH0pOjwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJleGlzdGluZ1Jlc2VydmF0aW9uc1wiPiA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwiYWRkUmVzZXJ2YXRpb25zSGVhZGluZyBoZWFkaW5nc1wiPlJlc2VydmUgYSBTcG90OjwvaDI+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwicmVzZXJ2YXRpb25Gb3JtXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIGlkPVwidXNlcm5hbWVcIiBuYW1lPVwidXNlcm5hbWVcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtRmllbGRzXCIgdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIlN0YXJ0IERhdGVcIiBpZD1cInN0YXJ0RGF0ZVwiIG5hbWU9XCJzdGFydERhdGVcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtRmllbGRzXCIgdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIkVuZCBEYXRlXCIgaWQ9XCJlbmREYXRlXCIgbmFtZT1cImVuZERhdGVcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzdWJtaXRCdG5cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJSZXNlcnZlXCI+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHJlc2VydmF0aW9uc1NlY3Rpb24pO1xuXG4gICAgY29uc3QgcmVzZXJ2YXRpb25DbG9zZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UtaWNvbicpO1xuICAgIHRoaXMuY2xvc2VSZXNlcnZhdGlvbk1vZGFsKHJlc2VydmF0aW9uQ2xvc2VCdG5zKTtcblxuICAgIGNvbnN0IHBvc3RSZXNlcnZhdGlvbkRhdGEgPSBuZXcgUG9zdFJlc2VydmF0aW9uKCk7XG4gICAgcG9zdFJlc2VydmF0aW9uRGF0YS5tb3ZpZUlkID0gaW5kZXg7XG4gICAgcG9zdFJlc2VydmF0aW9uRGF0YS5zZXR1cExpc3RlbmVyKCk7XG4gIH1cblxuICBjbG9zZVJlc2VydmF0aW9uTW9kYWwocmVzZXJ2YXRpb25DbG9zZUJ0bnMpIHtcbiAgICBjb25zdCByZXNlcnZhdGlvbnNTZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbnNTZWN0aW9uJyk7XG4gICAgcmVzZXJ2YXRpb25DbG9zZUJ0bnMuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHJlc2VydmF0aW9uc1NlY3Rpb25zLmZvckVhY2goKGVhY2gpID0+IGVhY2guc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XG4gICAgfSkpO1xuICB9XG5cbiAgdXBkYXRlQ291bnRlcihmZXRjaGVkUmVzZXJ2YXRpb25BcnIpIHtcbiAgICAvLyBVcGRhdGVzIGNvdW50ZXJcbiAgICB0aGlzLnJlc2VydmF0aW9uQ291bnQgPSBmZXRjaGVkUmVzZXJ2YXRpb25BcnIubGVuZ3RoO1xuICAgIGNvbnN0IHJlc2VydmF0aW9uc0hlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVzZXJ2YXRpb25zSGVhZGluZycpO1xuICAgIHJlc2VydmF0aW9uc0hlYWRpbmcuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC50ZXh0Q29udGVudCA9IGBSZXNlcnZhdGlvbnMgKCR7dGhpcy5yZXNlcnZhdGlvbkNvdW50fSk6YCk7XG4gIH1cblxuICBhc3luYyBkaXNwbGF5UmVzZXJ2YXRpb25zKGluZGV4KSB7XG4gICAgY29uc3QgZmV0Y2hSZXNlcnZhdGlvbnMgPSBuZXcgRmV0Y2hSZXNlcnZhdGlvbnMoKTtcbiAgICBmZXRjaFJlc2VydmF0aW9ucy5tb3ZpZUlEID0gaW5kZXg7XG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uID0gYXdhaXQgZmV0Y2hSZXNlcnZhdGlvbnMuZmV0Y2hSZXNlcnZhdGlvbnNEYXRhKCk7XG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uQXJyID0gQXJyYXkuZnJvbShmZXRjaGVkUmVzZXJ2YXRpb24pO1xuICAgIGNvbnN0IGV4aXN0aW5nUmVzZXJ2YXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmV4aXN0aW5nUmVzZXJ2YXRpb25zJyk7XG5cbiAgICAvLyBDbGVhciBleGlzdGluZyByZXNlcnZhdGlvbnNcbiAgICBleGlzdGluZ1Jlc2VydmF0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiBlYWNoLmlubmVySFRNTCA9ICcnKTtcbiAgICB0aGlzLnVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKTtcblxuICAgIGZldGNoZWRSZXNlcnZhdGlvbkFyci5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICBjb25zdCByZXNlcnZhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHJlc2VydmF0aW9uLnRleHRDb250ZW50ID0gYCR7ZWFjaC5kYXRlX3N0YXJ0fSAtICR7ZWFjaC5kYXRlX2VuZH0gYnkgJHtlYWNoLnVzZXJuYW1lfWA7XG4gICAgICBleGlzdGluZ1Jlc2VydmF0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICAgIGVhY2guYXBwZW5kQ2hpbGQocmVzZXJ2YXRpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93UmVzZXJ2YXRpb25zKCkge1xuICAgIGNvbnN0IGJ0bnNBcnJheSA9IEFycmF5LmZyb20odGhpcy52aWV3UmVzZXJ2YXRpb25zQnRucyk7XG4gICAgYnRuc0FycmF5LmZvckVhY2goKGVhY2gsIGVhY2hpbmRleCkgPT4ge1xuICAgICAgZWFjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChlYWNoaW5kZXgpO1xuICAgICAgICB0aGlzLmRpc3BsYXlSZXNlcnZhdGlvbnMoZWFjaGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=