"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["ratings"],{

/***/ "./src/ratings.js":
/*!************************!*\
  !*** ./src/ratings.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ratings)
/* harmony export */ });
class Ratings {
  constructor() {
    this.body = document.querySelector('body');
    this.createRatingsModal();
  }

  createReviewsModal() {
    const ratingsSection = document.createElement('section');
    ratingsSection.className = 'ratingsSection';
    ratingsSection.innerHTML = `
    <div class="ratingsContainer">
      <p class="close-icon"><span class="material-symbols-outlined">close</span></p>
      <div class="movieDescription">
        <img class="movieImage" src="./media-library/sample-img.jpg" alt="simple">
        <h2 class="movieTitle headings">Title</h2>
        <p class="movieDescription"> Test image URLs directly: Try accessing the image URLs directly in the browser to verify that the images can be loaded independently of your web application. If the images still don't load, there might be an issue with the image files themselves or with the server hosting them. </p>
      </div>

      <div>
        <h2 class="ratingsHeading headings">Ratings</h2>
      </div>s

      <div>
        <h2 class="addRatingsHeading headings">Add Review</h2>
        <form>
          <input class="formFields" type="text" placeholder="Username" id="username" name="username">
          <div class="star-rating">
            <p> Give your rating: </p>
            <input type="checkbox" id="star-1" name="rating" value="1">
            <label for="star-1"> </label>
            <input type="checkbox" id="star-2" name="rating" value="2">
            <label for="star-2"></label>
            <input type="checkbox" id="star-3" name="rating" value="3">
            <label for="star-3"></label>
            <input type="checkbox" id="star-4" name="rating" value="4">
            <label for="star-4"></label>
            <input type="checkbox" id="star-5" name="rating" value="5">
            <label for="star-5"></label>
          </div>
    
          <input class="submitBtn" type="submit">
        </form>
      </div>
    </div>`

    this.body.appendChild(ratingsSection);
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/ratings.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5ncy5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yYXRpbmdzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGluZ3Mge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgdGhpcy5jcmVhdGVSYXRpbmdzTW9kYWwoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVJldmlld3NNb2RhbCgpIHtcclxuICAgIGNvbnN0IHJhdGluZ3NTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xyXG4gICAgcmF0aW5nc1NlY3Rpb24uY2xhc3NOYW1lID0gJ3JhdGluZ3NTZWN0aW9uJztcclxuICAgIHJhdGluZ3NTZWN0aW9uLmlubmVySFRNTCA9IGBcclxuICAgIDxkaXYgY2xhc3M9XCJyYXRpbmdzQ29udGFpbmVyXCI+XHJcbiAgICAgIDxwIGNsYXNzPVwiY2xvc2UtaWNvblwiPjxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPmNsb3NlPC9zcGFuPjwvcD5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1vdmllRGVzY3JpcHRpb25cIj5cclxuICAgICAgICA8aW1nIGNsYXNzPVwibW92aWVJbWFnZVwiIHNyYz1cIi4vbWVkaWEtbGlicmFyeS9zYW1wbGUtaW1nLmpwZ1wiIGFsdD1cInNpbXBsZVwiPlxyXG4gICAgICAgIDxoMiBjbGFzcz1cIm1vdmllVGl0bGUgaGVhZGluZ3NcIj5UaXRsZTwvaDI+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJtb3ZpZURlc2NyaXB0aW9uXCI+IFRlc3QgaW1hZ2UgVVJMcyBkaXJlY3RseTogVHJ5IGFjY2Vzc2luZyB0aGUgaW1hZ2UgVVJMcyBkaXJlY3RseSBpbiB0aGUgYnJvd3NlciB0byB2ZXJpZnkgdGhhdCB0aGUgaW1hZ2VzIGNhbiBiZSBsb2FkZWQgaW5kZXBlbmRlbnRseSBvZiB5b3VyIHdlYiBhcHBsaWNhdGlvbi4gSWYgdGhlIGltYWdlcyBzdGlsbCBkb24ndCBsb2FkLCB0aGVyZSBtaWdodCBiZSBhbiBpc3N1ZSB3aXRoIHRoZSBpbWFnZSBmaWxlcyB0aGVtc2VsdmVzIG9yIHdpdGggdGhlIHNlcnZlciBob3N0aW5nIHRoZW0uIDwvcD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMiBjbGFzcz1cInJhdGluZ3NIZWFkaW5nIGhlYWRpbmdzXCI+UmF0aW5nczwvaDI+XHJcbiAgICAgIDwvZGl2PnNcclxuXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgyIGNsYXNzPVwiYWRkUmF0aW5nc0hlYWRpbmcgaGVhZGluZ3NcIj5BZGQgUmV2aWV3PC9oMj5cclxuICAgICAgICA8Zm9ybT5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm1GaWVsZHNcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiBpZD1cInVzZXJuYW1lXCIgbmFtZT1cInVzZXJuYW1lXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Rhci1yYXRpbmdcIj5cclxuICAgICAgICAgICAgPHA+IEdpdmUgeW91ciByYXRpbmc6IDwvcD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwic3Rhci0xXCIgbmFtZT1cInJhdGluZ1wiIHZhbHVlPVwiMVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwic3Rhci0xXCI+IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInN0YXItMlwiIG5hbWU9XCJyYXRpbmdcIiB2YWx1ZT1cIjJcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXItMlwiPjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInN0YXItM1wiIG5hbWU9XCJyYXRpbmdcIiB2YWx1ZT1cIjNcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXItM1wiPjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInN0YXItNFwiIG5hbWU9XCJyYXRpbmdcIiB2YWx1ZT1cIjRcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXItNFwiPjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInN0YXItNVwiIG5hbWU9XCJyYXRpbmdcIiB2YWx1ZT1cIjVcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXItNVwiPjwvbGFiZWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwic3VibWl0QnRuXCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5gXHJcblxyXG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHJhdGluZ3NTZWN0aW9uKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9