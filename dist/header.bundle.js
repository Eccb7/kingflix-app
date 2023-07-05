"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["header"],{

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
class Header {
  constructor() {
    this.header = document.querySelector('header');
    this.createNavbar();
  }

  createNavbar() {
    const navBar = document.createElement('nav');
    navBar.innerHTML = `<img id="logo" src="./media-library/logo.png" alt="logo">
    <ul class="menuContainer">
      <li><a class="menuItem" href="#">Movies </a></li>
      <li><a class="menuItem" href="#">Categories </a></li>
      <li><a class="menuItem" href="#">Streaming </a></li>
    </ul>`;
    this.header.appendChild(navBar);
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/header.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9oZWFkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcbiAgICB0aGlzLmNyZWF0ZU5hdmJhcigpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTmF2YmFyKCkge1xyXG4gICAgY29uc3QgbmF2QmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XHJcbiAgICBuYXZCYXIuaW5uZXJIVE1MID0gYDxpbWcgaWQ9XCJsb2dvXCIgc3JjPVwiLi9tZWRpYS1saWJyYXJ5L2xvZ28ucG5nXCIgYWx0PVwibG9nb1wiPlxyXG4gICAgPHVsIGNsYXNzPVwibWVudUNvbnRhaW5lclwiPlxyXG4gICAgICA8bGk+PGEgY2xhc3M9XCJtZW51SXRlbVwiIGhyZWY9XCIjXCI+TW92aWVzIDwvYT48L2xpPlxyXG4gICAgICA8bGk+PGEgY2xhc3M9XCJtZW51SXRlbVwiIGhyZWY9XCIjXCI+Q2F0ZWdvcmllcyA8L2E+PC9saT5cclxuICAgICAgPGxpPjxhIGNsYXNzPVwibWVudUl0ZW1cIiBocmVmPVwiI1wiPlN0cmVhbWluZyA8L2E+PC9saT5cclxuICAgIDwvdWw+YDtcclxuICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKG5hdkJhcik7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==