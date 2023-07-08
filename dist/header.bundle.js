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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF3QztBQUN4QztBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELE1BQU0sMkRBQVEsR0FBRztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsUUFBUSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2hvbWUvaGVhZGVyLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9ob21lL21vdmllTGVuZ3RoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb3ZpZU51bSBmcm9tICcuL21vdmllTGVuZ3RoLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG4gICAgdGhpcy5jcmVhdGVOYXZiYXIoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZU5hdmJhcigpIHtcclxuICAgIGNvbnN0IG5hdkJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xyXG4gICAgbmF2QmFyLmlubmVySFRNTCA9IGA8aW1nIGlkPVwibG9nb1wiIHNyYz1cIi4vbWVkaWEtbGlicmFyeS9sb2dvLnBuZ1wiIGFsdD1cImxvZ29cIj5cclxuICAgIDx1bCBjbGFzcz1cIm1lbnVDb250YWluZXJcIj5cclxuICAgICAgPGxpPjxhIGNsYXNzPVwibWVudUl0ZW0tbW92aWVcIiBocmVmPVwiI1wiPk1vdmllcygke2F3YWl0IG1vdmllTnVtKCl9KTwvYT48L2xpPlxyXG4gICAgICA8bGk+PGEgY2xhc3M9XCJtZW51SXRlbVwiIGhyZWY9XCIjXCI+Q2F0ZWdvcmllcyA8L2E+PC9saT5cclxuICAgICAgPGxpPjxhIGNsYXNzPVwibWVudUl0ZW1cIiBocmVmPVwiI1wiPlN0cmVhbWluZyA8L2E+PC9saT5cclxuICAgIDwvdWw+YDtcclxuICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKG5hdkJhcik7XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IG1vdmllTnVtID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2hvd3MvMS9lcGlzb2RlcycpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgcmV0dXJuIGRhdGEubGVuZ3RoO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBtb3ZpZU51bTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9