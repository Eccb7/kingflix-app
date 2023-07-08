"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["header"],{

/***/ "./src/home/header.js":
/*!****************************!*\
  !*** ./src/home/header.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _movieLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movieLength.js */ "./src/home/movieLength.js");


class Header {
  constructor() {
    this.header = document.querySelector('header');
    this.createNavbar();
  }

  async createNavbar() {
    const navBar = document.createElement('nav');
    navBar.innerHTML = `<img id="logo" src="./media-library/logo.png" alt="logo">
    <ul class="menuContainer">
      <li><a class="menuItem-movie" href="#">Movies(${await (0,_movieLength_js__WEBPACK_IMPORTED_MODULE_0__["default"])()})</a></li>
      <li><a class="menuItem" href="#">Categories </a></li>
      <li><a class="menuItem" href="#">Streaming </a></li>
    </ul>`;
    this.header.appendChild(navBar);
  }
}


/***/ }),

/***/ "./src/home/movieLength.js":
/*!*********************************!*\
  !*** ./src/home/movieLength.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const movieNum = async () => {
  const response = await fetch('https://api.tvmaze.com/shows/1/episodes');
  const data = await response.json();
  return data.length;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (movieNum);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/home/header.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF3Qzs7QUFFekI7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxNQUFNLDJEQUFRLEdBQUc7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFFBQVEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9ob21lL2hlYWRlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaG9tZS9tb3ZpZUxlbmd0aC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW92aWVOdW0gZnJvbSAnLi9tb3ZpZUxlbmd0aC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XG4gICAgdGhpcy5jcmVhdGVOYXZiYXIoKTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZU5hdmJhcigpIHtcbiAgICBjb25zdCBuYXZCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICBuYXZCYXIuaW5uZXJIVE1MID0gYDxpbWcgaWQ9XCJsb2dvXCIgc3JjPVwiLi9tZWRpYS1saWJyYXJ5L2xvZ28ucG5nXCIgYWx0PVwibG9nb1wiPlxuICAgIDx1bCBjbGFzcz1cIm1lbnVDb250YWluZXJcIj5cbiAgICAgIDxsaT48YSBjbGFzcz1cIm1lbnVJdGVtLW1vdmllXCIgaHJlZj1cIiNcIj5Nb3ZpZXMoJHthd2FpdCBtb3ZpZU51bSgpfSk8L2E+PC9saT5cbiAgICAgIDxsaT48YSBjbGFzcz1cIm1lbnVJdGVtXCIgaHJlZj1cIiNcIj5DYXRlZ29yaWVzIDwvYT48L2xpPlxuICAgICAgPGxpPjxhIGNsYXNzPVwibWVudUl0ZW1cIiBocmVmPVwiI1wiPlN0cmVhbWluZyA8L2E+PC9saT5cbiAgICA8L3VsPmA7XG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQobmF2QmFyKTtcbiAgfVxufVxuIiwiY29uc3QgbW92aWVOdW0gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2hvd3MvMS9lcGlzb2RlcycpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YS5sZW5ndGg7XG59O1xuZXhwb3J0IGRlZmF1bHQgbW92aWVOdW07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=