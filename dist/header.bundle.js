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
        this.header = document.querySelector("header");
        this.createNavbar();
    }

    createNavbar() {
        const navBar = document.createElement("nav");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9oZWFkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlclwiKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZU5hdmJhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU5hdmJhcigpIHtcclxuICAgICAgICBjb25zdCBuYXZCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpO1xyXG4gICAgICAgIG5hdkJhci5pbm5lckhUTUwgPSBgPGltZyBpZD1cImxvZ29cIiBzcmM9XCIuL21lZGlhLWxpYnJhcnkvbG9nby5wbmdcIiBhbHQ9XCJsb2dvXCI+XHJcbiAgICA8dWwgY2xhc3M9XCJtZW51Q29udGFpbmVyXCI+XHJcbiAgICAgIDxsaT48YSBjbGFzcz1cIm1lbnVJdGVtXCIgaHJlZj1cIiNcIj5Nb3ZpZXMgPC9hPjwvbGk+XHJcbiAgICAgIDxsaT48YSBjbGFzcz1cIm1lbnVJdGVtXCIgaHJlZj1cIiNcIj5DYXRlZ29yaWVzIDwvYT48L2xpPlxyXG4gICAgICA8bGk+PGEgY2xhc3M9XCJtZW51SXRlbVwiIGhyZWY9XCIjXCI+U3RyZWFtaW5nIDwvYT48L2xpPlxyXG4gICAgPC91bD5gO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKG5hdkJhcik7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9