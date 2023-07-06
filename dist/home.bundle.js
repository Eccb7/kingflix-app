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
const getShows = async () => {
    const homeContainer = document.querySelector(".homepage");
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
            button2.className = "btn viewRatings";
            button2.innerText = "View Ratings";

            body.appendChild(images);
            body.appendChild(likes);
            body.appendChild(button1);
            body.appendChild(button2);
            homeContainer.appendChild(body);
        });
    } catch (error) {
        throw new Error("Unable to post");
    }
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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/home.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxnQkFBZ0I7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsb0JBQW9CO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFdBQVc7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q1U7QUFDbEM7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFRO0FBQ2hCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvZ2V0U2hvd3MuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2hvbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0U2hvd3MgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBob21lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lcGFnZVwiKTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2hvd3MvMS9lcGlzb2Rlc1wiKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBzY29yZXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuXHJcbiAgICAgICAganNvbi5mb3JFYWNoKChtb3ZpZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc05hbWUgPSBcIm1vdmllc1wiO1xyXG4gICAgICAgICAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBpbWFnZXMuY2xhc3NOYW1lID0gXCJ0ZXN0LWltZ1wiO1xyXG4gICAgICAgICAgICBpbWFnZXMuaW5uZXJIVE1MID0gYDxpbWcgc3JjPSR7bW92aWUuaW1hZ2UubWVkaXVtfSBhbHQ9XCJcIiBjbGFzcz1cIm15LWltZ1wiPmA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsb3ZlSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBsb3ZlSW1hZ2Uuc3JjID0gXCIuL21lZGlhLWxpYnJhcnkvbG92ZS5wbmdcIjtcclxuICAgICAgICAgICAgbG92ZUltYWdlLmNsYXNzTmFtZSA9IFwibG92ZVwiO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbGlrZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBsaWtlcy5jbGFzc05hbWUgPSBcInNwYWNlXCI7XHJcbiAgICAgICAgICAgIGxpa2VzLmlubmVySFRNTCA9IGA8cD4ke21vdmllLm5hbWV9PC9wPmA7XHJcbiAgICAgICAgICAgIGxpa2VzLmlubmVySFRNTCArPSBgIDxwPjUgbGlrZXM8L3A+YDtcclxuICAgICAgICAgICAgbGlrZXMuYXBwZW5kQ2hpbGQobG92ZUltYWdlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBidXR0b24xLmNsYXNzTmFtZSA9IFwiYnRuXCI7XHJcbiAgICAgICAgICAgIGJ1dHRvbjEuaW5uZXJUZXh0ID0gXCJDb21tZW50c1wiO1xyXG4gICAgICAgICAgICBjb25zdCBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgYnV0dG9uMi5jbGFzc05hbWUgPSBcImJ0biB2aWV3UmF0aW5nc1wiO1xyXG4gICAgICAgICAgICBidXR0b24yLmlubmVyVGV4dCA9IFwiVmlldyBSYXRpbmdzXCI7XHJcblxyXG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGltYWdlcyk7XHJcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQobGlrZXMpO1xyXG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGJ1dHRvbjEpO1xyXG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xyXG4gICAgICAgICAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvZHkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gcG9zdFwiKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZ2V0U2hvd3M7XHJcbiIsImltcG9ydCBnZXRTaG93cyBmcm9tIFwiLi9nZXRTaG93c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnJlbmRlclBvc3RzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUG9zdHMoKSB7XHJcbiAgICAgICAgZ2V0U2hvd3MoKTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=