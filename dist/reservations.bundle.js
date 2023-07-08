"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["reservations"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/reservations.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXJ2YXRpb25zLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5Q2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDZDO0FBQ087QUFDcEQ7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0REFBZTtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsc0RBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHFDQUFxQztBQUM1RSwwQ0FBMEMsNkJBQTZCO0FBQ3ZFLHlDQUF5QyxnQ0FBZ0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9wb3N0UmVzZXJ2YXRpb25zLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9wdWxsTW92aWVzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdFJlc2V2YXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHRoaXMucmVzZXJ2YXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2VydmF0aW9uRm9ybScpO1xyXG4gICAgICB0aGlzLnVzZXJuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJuYW1lJyk7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0RGF0ZScpO1xyXG4gICAgICB0aGlzLmVuZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5kRGF0ZScpO1xyXG4gICAgICB0aGlzLm1vdmllSWQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHBvc3RSZXNldmF0aW9uKGRhdGEpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgICAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL3Jlc2VydmF0aW9ucycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgKTtcclxuICBcclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJva1wiKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcG9zdCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0dXBMaXN0ZW5lcigpe1xyXG4gICAgdGhpcy5yZXNlcnZhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLm1vdmllSWQpO1xyXG4gICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgIGl0ZW1faWQ6IHRoaXMubW92aWVJZCxcclxuICAgICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZS52YWx1ZSxcclxuICAgICAgICBkYXRlX3N0YXJ0OiB0aGlzLnN0YXJ0RGF0ZS52YWx1ZSxcclxuICAgICAgICBkYXRlX2VuZDogdGhpcy5lbmREYXRlLnZhbHVlLFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucG9zdFJlc2V2YXRpb24oZGF0YSk7XHJcbiAgICAgIHRoaXMudXNlcm5hbWUudmFsdWUgPSAnJztcclxuICAgICAgdGhpcy5zdGFydERhdGUudmFsdWUgPSAnJztcclxuICAgICAgdGhpcy5lbmREYXRlLnZhbHVlID0gJyc7XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQdWxsTW92aWVzRGF0YSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnVybCA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzLzEvZXBpc29kZXMnO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZmV0Y2hNb3ZpZXNEYXRhKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLnVybCk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFB1bGxNb3ZpZXNEYXRhIGZyb20gJy4vcHVsbE1vdmllcy5qcyc7XHJcbmltcG9ydCBQb3N0UmVzZXJ2YXRpb24gZnJvbSAnLi9wb3N0UmVzZXJ2YXRpb25zLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc2VydmF0aW9ucyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICB0aGlzLnZpZXdSZXNlcnZhdGlvbnNCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmlld1Jlc2VydmF0aW9ucycpO1xyXG4gICAgdGhpcy5wb3N0UmVzZXJ2YXRpb25EYXRhID0gbmV3IFBvc3RSZXNlcnZhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY3JlYXRlUmVzZXJ2YXRpb25zTW9kYWwoaW5kZXgpIHtcclxuICAgIGNvbnN0IGdldE1vdmllc0RldGFpbHMgPSBuZXcgUHVsbE1vdmllc0RhdGEoKTtcclxuICAgIGNvbnN0IG1vdmllc0RldGFpbHMgPSBhd2FpdCBnZXRNb3ZpZXNEZXRhaWxzLmZldGNoTW92aWVzRGF0YSgpO1xyXG4gICAgY29uc3QgbW92aWVzRGV0YWlsc0FyciA9IEFycmF5LmZyb20obW92aWVzRGV0YWlscyk7XHJcblxyXG4gICAgY29uc3QgcmVzZXJ2YXRpb25zU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcclxuICAgIHJlc2VydmF0aW9uc1NlY3Rpb24uY2xhc3NOYW1lID0gJ3Jlc2VydmF0aW9uc1NlY3Rpb24nO1xyXG4gICAgcmVzZXJ2YXRpb25zU2VjdGlvbi5pbm5lckhUTUwgPSBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicmVzZXJ2YXRpb25zQ29udGFpbmVyXCI+XHJcbiAgICAgIDxwIGNsYXNzPVwiY2xvc2UtaWNvblwiPjxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPmNsb3NlPC9zcGFuPjwvcD5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1vdmllRGVzY3JpcHRpb25cIj5cclxuICAgICAgICA8aW1nIGNsYXNzPVwibW92aWVJbWFnZVwiIHNyYz1cIiR7bW92aWVzRGV0YWlsc0FycltpbmRleF0uaW1hZ2UubWVkaXVtfVwiIHdpZHRoPVwiNjAwXCIgYWx0PVwic2ltcGxlXCI+XHJcbiAgICAgICAgPGgyIGNsYXNzPVwibW92aWVUaXRsZSBoZWFkaW5nc1wiPiR7bW92aWVzRGV0YWlsc0FycltpbmRleF0ubmFtZX08L2gyPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb3ZpZURlc2NyaXB0aW9uXCI+ICR7bW92aWVzRGV0YWlsc0FycltpbmRleF0uc3VtbWFyeX08L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cclxuICAgICAgICA8aDIgY2xhc3M9XCJyZXNlcnZhdGlvbnNIZWFkaW5nIGhlYWRpbmdzXCI+UmVzZXJ2YXRpb25zOjwvaDI+XHJcbiAgICAgICAgPHA+ZGRkZGRkZDwvcD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cclxuICAgICAgICA8aDIgY2xhc3M9XCJhZGRSZXNlcnZhdGlvbnNIZWFkaW5nIGhlYWRpbmdzXCI+UmVzZXJ2ZSBhIFNwb3Q6PC9oMj5cclxuICAgICAgICA8Zm9ybSBjbGFzcz1cInJlc2V2YXRpb25Gb3JtXCI+XHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtRmllbGRzXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCIgaWQ9XCJ1c2VybmFtZVwiIG5hbWU9XCJ1c2VybmFtZVwiPlxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJkYXRlXCIgcGxhY2Vob2xkZXI9XCJTdGFydCBEYXRlXCIgaWQ9XCJzdGFydERhdGVcIiBuYW1lPVwic3RhcnREYXRlXCI+XHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtRmllbGRzXCIgdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIkVuZCBEYXRlXCIgaWQ9XCJlbmREYXRlXCIgbmFtZT1cImVuZERhdGVcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInN1Ym1pdEJ0blwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlJlc2VydmVcIj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+YDtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChyZXNlcnZhdGlvbnNTZWN0aW9uKTtcclxuICAgIGNvbnN0IHJlc2VydmF0aW9uQ2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLWljb24nKTtcclxuICAgIHRoaXMuY2xvc2VSZXNlcnZhdGlvbk1vZGFsKHJlc2VydmF0aW9uQ2xvc2VCdG5zKTtcclxuICAgIHRoaXMucG9zdFJlc2VydmF0aW9uRGF0YS5tb3ZpZUlkID0gaW5kZXg7XHJcbiAgICB0aGlzLnBvc3RSZXNlcnZhdGlvbkRhdGEuc2V0dXBMaXN0ZW5lcigpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VSZXNlcnZhdGlvbk1vZGFsKHJlc2VydmF0aW9uQ2xvc2VCdG5zKSB7XHJcbiAgICBjb25zdCByZXNlcnZhdGlvbnNTZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbnNTZWN0aW9uJyk7XHJcbiAgICByZXNlcnZhdGlvbkNsb3NlQnRucy5mb3JFYWNoKChlYWNoKSA9PiBlYWNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICByZXNlcnZhdGlvbnNTZWN0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiBlYWNoLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpXHJcbiAgICB9KSlcclxuICB9XHJcblxyXG4gIHNob3dSZXNlcnZhdGlvbnMoKSB7XHJcbiAgICBjb25zdCBidG5zQXJyYXkgPSBBcnJheS5mcm9tKHRoaXMudmlld1Jlc2VydmF0aW9uc0J0bnMpO1xyXG4gICAgYnRuc0FycmF5LmZvckVhY2goKGVhY2gsIGluZGV4KSA9PiB7XHJcbiAgICAgIGVhY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChpbmRleCk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=