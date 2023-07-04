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
    navBar.innerHTML = 
    `<img id="logo" src="./media-library/logo.png" alt="logo">

    <ul>
      <li>Movies</li>
      <li>Categories</li>
      <li>Streaming</li>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaGVhZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG4gICAgdGhpcy5jcmVhdGVOYXZiYXIoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU5hdmJhcigpIHtcclxuICAgIGNvbnN0IG5hdkJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xyXG4gICAgbmF2QmFyLmlubmVySFRNTCA9IFxyXG4gICAgYDxpbWcgaWQ9XCJsb2dvXCIgc3JjPVwiLi9tZWRpYS1saWJyYXJ5L2xvZ28ucG5nXCIgYWx0PVwibG9nb1wiPlxyXG5cclxuICAgIDx1bD5cclxuICAgICAgPGxpPk1vdmllczwvbGk+XHJcbiAgICAgIDxsaT5DYXRlZ29yaWVzPC9saT5cclxuICAgICAgPGxpPlN0cmVhbWluZzwvbGk+XHJcbiAgICA8L3VsPmA7XHJcblxyXG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQobmF2QmFyKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbiAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=