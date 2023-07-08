"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["postResevations"],{

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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/postReservations.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFJlc2V2YXRpb25zLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Bvc3RSZXNlcnZhdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdFJlc2V2YXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHRoaXMucmVzZXJ2YXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2VydmF0aW9uRm9ybScpO1xyXG4gICAgICB0aGlzLnVzZXJuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJuYW1lJyk7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0RGF0ZScpO1xyXG4gICAgICB0aGlzLmVuZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5kRGF0ZScpO1xyXG4gICAgICB0aGlzLm1vdmllSWQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHBvc3RSZXNldmF0aW9uKGRhdGEpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgICAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL3Jlc2VydmF0aW9ucycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgKTtcclxuICBcclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJva1wiKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcG9zdCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0dXBMaXN0ZW5lcigpe1xyXG4gICAgdGhpcy5yZXNlcnZhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLm1vdmllSWQpO1xyXG4gICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgIGl0ZW1faWQ6IHRoaXMubW92aWVJZCxcclxuICAgICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZS52YWx1ZSxcclxuICAgICAgICBkYXRlX3N0YXJ0OiB0aGlzLnN0YXJ0RGF0ZS52YWx1ZSxcclxuICAgICAgICBkYXRlX2VuZDogdGhpcy5lbmREYXRlLnZhbHVlLFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucG9zdFJlc2V2YXRpb24oZGF0YSk7XHJcbiAgICAgIHRoaXMudXNlcm5hbWUudmFsdWUgPSAnJztcclxuICAgICAgdGhpcy5zdGFydERhdGUudmFsdWUgPSAnJztcclxuICAgICAgdGhpcy5lbmREYXRlLnZhbHVlID0gJyc7XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=