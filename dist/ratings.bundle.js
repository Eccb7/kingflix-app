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
    this.viewRatingsBtns = document.querySelectorAll('.viewRatings');
    this.showrating();
  }

  createRatingsModal() {
    const ratingsSection = document.createElement('section');
    ratingsSection.className = 'ratingsSection';
    ratingsSection.innerHTML = `
    <div class="ratingsContainer">
      <p class="close-icon"><span class="material-symbols-outlined">close</span></p>
      <div class="movieDescription">
        <img class="movieImage" src="./media-library/sample-img.jpg" alt="simple">
        <h2 class="movieTitle headings">The Celetist House</h2>
        <p class="movieDescription"> Test image URLs directly: Try accessing the image URLs directly in the browser to verify that the images can be loaded independently of your web application. If the images still don't load, there might be an issue with the image files themselves or with the server hosting them. </p>
      </div>

      <div class="sectionContainers">
        <h2 class="ratingsHeading headings">Ratings:</h2>
        <p>ddddddd</p>
      </div>

      <div class="sectionContainers">
        <h2 class="addRatingsHeading headings">Rate Movie:</h2>
        <form>
          <input class="formFields" type="text" placeholder="Username" id="username" name="username">
          <div class="star-rating">
            <p class="giveRatingText"> Give your rating: </p>
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
    
          <input class="submitBtn" type="submit" value="Post Rating">
        </form>
      </div>
    </div>`;

    this.body.appendChild(ratingsSection);
  }

  showrating() {
    this.viewRatingsBtns.forEach((each) => {
      each.addEventListener('click', () => {
        alert('working');
      })
    })
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/ratings.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5ncy5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yYXRpbmdzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGluZ3Mge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgdGhpcy52aWV3UmF0aW5nc0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmlld1JhdGluZ3MnKTtcclxuICAgIHRoaXMuc2hvd3JhdGluZygpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUmF0aW5nc01vZGFsKCkge1xyXG4gICAgY29uc3QgcmF0aW5nc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XHJcbiAgICByYXRpbmdzU2VjdGlvbi5jbGFzc05hbWUgPSAncmF0aW5nc1NlY3Rpb24nO1xyXG4gICAgcmF0aW5nc1NlY3Rpb24uaW5uZXJIVE1MID0gYFxyXG4gICAgPGRpdiBjbGFzcz1cInJhdGluZ3NDb250YWluZXJcIj5cclxuICAgICAgPHAgY2xhc3M9XCJjbG9zZS1pY29uXCI+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+Y2xvc2U8L3NwYW4+PC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW92aWVEZXNjcmlwdGlvblwiPlxyXG4gICAgICAgIDxpbWcgY2xhc3M9XCJtb3ZpZUltYWdlXCIgc3JjPVwiLi9tZWRpYS1saWJyYXJ5L3NhbXBsZS1pbWcuanBnXCIgYWx0PVwic2ltcGxlXCI+XHJcbiAgICAgICAgPGgyIGNsYXNzPVwibW92aWVUaXRsZSBoZWFkaW5nc1wiPlRoZSBDZWxldGlzdCBIb3VzZTwvaDI+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJtb3ZpZURlc2NyaXB0aW9uXCI+IFRlc3QgaW1hZ2UgVVJMcyBkaXJlY3RseTogVHJ5IGFjY2Vzc2luZyB0aGUgaW1hZ2UgVVJMcyBkaXJlY3RseSBpbiB0aGUgYnJvd3NlciB0byB2ZXJpZnkgdGhhdCB0aGUgaW1hZ2VzIGNhbiBiZSBsb2FkZWQgaW5kZXBlbmRlbnRseSBvZiB5b3VyIHdlYiBhcHBsaWNhdGlvbi4gSWYgdGhlIGltYWdlcyBzdGlsbCBkb24ndCBsb2FkLCB0aGVyZSBtaWdodCBiZSBhbiBpc3N1ZSB3aXRoIHRoZSBpbWFnZSBmaWxlcyB0aGVtc2VsdmVzIG9yIHdpdGggdGhlIHNlcnZlciBob3N0aW5nIHRoZW0uIDwvcD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cclxuICAgICAgICA8aDIgY2xhc3M9XCJyYXRpbmdzSGVhZGluZyBoZWFkaW5nc1wiPlJhdGluZ3M6PC9oMj5cclxuICAgICAgICA8cD5kZGRkZGRkPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uQ29udGFpbmVyc1wiPlxyXG4gICAgICAgIDxoMiBjbGFzcz1cImFkZFJhdGluZ3NIZWFkaW5nIGhlYWRpbmdzXCI+UmF0ZSBNb3ZpZTo8L2gyPlxyXG4gICAgICAgIDxmb3JtPlxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIGlkPVwidXNlcm5hbWVcIiBuYW1lPVwidXNlcm5hbWVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGFyLXJhdGluZ1wiPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cImdpdmVSYXRpbmdUZXh0XCI+IEdpdmUgeW91ciByYXRpbmc6IDwvcD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwic3Rhci0xXCIgbmFtZT1cInJhdGluZ1wiIHZhbHVlPVwiMVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwic3Rhci0xXCI+IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInN0YXItMlwiIG5hbWU9XCJyYXRpbmdcIiB2YWx1ZT1cIjJcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXItMlwiPjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInN0YXItM1wiIG5hbWU9XCJyYXRpbmdcIiB2YWx1ZT1cIjNcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXItM1wiPjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInN0YXItNFwiIG5hbWU9XCJyYXRpbmdcIiB2YWx1ZT1cIjRcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXItNFwiPjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInN0YXItNVwiIG5hbWU9XCJyYXRpbmdcIiB2YWx1ZT1cIjVcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXItNVwiPjwvbGFiZWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwic3VibWl0QnRuXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiUG9zdCBSYXRpbmdcIj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+YDtcclxuXHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQocmF0aW5nc1NlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgc2hvd3JhdGluZygpIHtcclxuICAgIHRoaXMudmlld1JhdGluZ3NCdG5zLmZvckVhY2goKGVhY2gpID0+IHtcclxuICAgICAgZWFjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBhbGVydCgnd29ya2luZycpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9