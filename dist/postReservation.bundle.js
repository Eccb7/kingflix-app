"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["postReservation"],{

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/reservationModal/postReservation.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFJlc2VydmF0aW9uLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF5RTtBQUN6RTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSxzQkFBc0I7QUFDcEc7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDhFQUFpQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlCQUFpQixJQUFJLGVBQWUsS0FBSyxjQUFjO0FBQzFGO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDakNlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUlBQXlJLGFBQWE7QUFDdEo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmd0U7O0FBRXpEO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsK0VBQWdCO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvZGlzcGxheVJlc2VydmF0aW9uLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL2ZldGNoUmVzZXJ2YXRpb25zLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL3Bvc3RSZXNlcnZhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmV0Y2hSZXNlcnZhdGlvbnMgZnJvbSAnLi4vcmVzZXJ2YXRpb25Nb2RhbC9mZXRjaFJlc2VydmF0aW9ucy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwbGF5QWZ0ZXJQb3N0IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IDA7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVDb3VudGVyKGZldGNoZWRSZXNlcnZhdGlvbkFycikge1xyXG4gICAgLy8gVXBkYXRlcyBjb3VudGVyXHJcbiAgICB0aGlzLnJlc2VydmF0aW9uQ291bnQgPSBmZXRjaGVkUmVzZXJ2YXRpb25BcnIubGVuZ3RoO1xyXG4gICAgY29uc3QgcmVzZXJ2YXRpb25zSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbnNIZWFkaW5nJyk7XHJcbiAgICByZXNlcnZhdGlvbnNIZWFkaW5nLmZvckVhY2goKGVhY2gpID0+IGVhY2gudGV4dENvbnRlbnQgPSBgUmVzZXJ2YXRpb25zICgke3RoaXMucmVzZXJ2YXRpb25Db3VudH0pOmApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGlzcGxheVJlc2VydmF0aW9ucyhpbmRleCkge1xyXG4gICAgY29uc3QgZmV0Y2hSZXNlcnZhdGlvbnMgPSBuZXcgRmV0Y2hSZXNlcnZhdGlvbnMoKTtcclxuICAgIGZldGNoUmVzZXJ2YXRpb25zLm1vdmllSUQgPSBpbmRleDtcclxuICAgIGNvbnN0IGZldGNoZWRSZXNlcnZhdGlvbiA9IGF3YWl0IGZldGNoUmVzZXJ2YXRpb25zLmZldGNoUmVzZXJ2YXRpb25zRGF0YSgpO1xyXG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uQXJyID0gQXJyYXkuZnJvbShmZXRjaGVkUmVzZXJ2YXRpb24pO1xyXG4gICAgY29uc3QgZXhpc3RpbmdSZXNlcnZhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZXhpc3RpbmdSZXNlcnZhdGlvbnMnKTtcclxuXHJcbiAgICAvLyBDbGVhciBleGlzdGluZyByZXNlcnZhdGlvbnNcclxuICAgIGV4aXN0aW5nUmVzZXJ2YXRpb25zLmZvckVhY2goKGVhY2gpID0+IGVhY2guaW5uZXJIVE1MID0gJycpO1xyXG4gICAgdGhpcy51cGRhdGVDb3VudGVyKGZldGNoZWRSZXNlcnZhdGlvbkFycik7XHJcblxyXG4gICAgZmV0Y2hlZFJlc2VydmF0aW9uQXJyLmZvckVhY2goKGVhY2gpID0+IHtcclxuICAgICAgY29uc3QgcmVzZXJ2YXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHJlc2VydmF0aW9uLnRleHRDb250ZW50ID0gYCR7ZWFjaC5kYXRlX3N0YXJ0fSAtICR7ZWFjaC5kYXRlX2VuZH0gYnkgJHtlYWNoLnVzZXJuYW1lfWA7XHJcbiAgICAgIGV4aXN0aW5nUmVzZXJ2YXRpb25zLmZvckVhY2goKGVhY2gpID0+IHtcclxuICAgICAgICBlYWNoLmFwcGVuZENoaWxkKHJlc2VydmF0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGZXRjaFJlc2VydmF0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubW92aWVJRCA9IDA7XG4gIH1cblxuICBhc3luYyBmZXRjaFJlc2VydmF0aW9uc0RhdGEoKSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL3Jlc2VydmF0aW9ucz9pdGVtX2lkPWl0ZW0ke3RoaXMubW92aWVJRH1gO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5QWZ0ZXJQb3N0IGZyb20gJy4uL3Jlc2VydmF0aW9uTW9kYWwvZGlzcGxheVJlc2VydmF0aW9uLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3N0UmVzZXZhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXJ2YXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2VydmF0aW9uRm9ybScpO1xuICAgIHRoaXMudXNlcm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlcm5hbWUnKTtcbiAgICB0aGlzLnN0YXJ0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydERhdGUnKTtcbiAgICB0aGlzLmVuZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5kRGF0ZScpO1xuICAgIHRoaXMubW92aWVJZCA9IDA7XG5cbiAgfVxuXG4gIGFzeW5jIHBvc3RSZXNlcnZhdGlvbihkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9yZXNlcnZhdGlvbnMnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvaycpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwb3N0Jyk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGRpc3BsYXllZCByZXNlcnZhdGlvbnNcbiAgICBjb25zdCBsb2FkUmVzZXJ2YXRpb25zID0gbmV3IERpc3BsYXlBZnRlclBvc3Q7XG4gICAgbG9hZFJlc2VydmF0aW9ucy5kaXNwbGF5UmVzZXJ2YXRpb25zKHRoaXMubW92aWVJZCk7XG4gIH1cblxuICBzZXR1cExpc3RlbmVyKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMubW92aWVJZCk7XG4gICAgdGhpcy5yZXNlcnZhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubW92aWVJZCk7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBpdGVtX2lkOiBgaXRlbSR7dGhpcy5tb3ZpZUlkfWAsXG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLnZhbHVlLFxuICAgICAgICBkYXRlX3N0YXJ0OiB0aGlzLnN0YXJ0RGF0ZS52YWx1ZSxcbiAgICAgICAgZGF0ZV9lbmQ6IHRoaXMuZW5kRGF0ZS52YWx1ZSxcbiAgICAgIH07XG4gICAgICB0aGlzLnBvc3RSZXNlcnZhdGlvbihkYXRhKTtcbiAgICAgIHRoaXMudXNlcm5hbWUudmFsdWUgPSAnJztcbiAgICAgIHRoaXMuc3RhcnREYXRlLnZhbHVlID0gJyc7XG4gICAgICB0aGlzLmVuZERhdGUudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==