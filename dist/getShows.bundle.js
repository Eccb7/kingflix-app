"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["getShows"],{

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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/getShows.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2hvd3MuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsZ0JBQWdCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLG9CQUFvQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsaUVBQWUsUUFBUSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2dldFNob3dzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldFNob3dzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgaG9tZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZXBhZ2VcIik7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzLzEvZXBpc29kZXNcIik7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggc2NvcmVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coanNvbik7XHJcblxyXG4gICAgICAgIGpzb24uZm9yRWFjaCgobW92aWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NOYW1lID0gXCJtb3ZpZXNcIjtcclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgaW1hZ2VzLmNsYXNzTmFtZSA9IFwidGVzdC1pbWdcIjtcclxuICAgICAgICAgICAgaW1hZ2VzLmlubmVySFRNTCA9IGA8aW1nIHNyYz0ke21vdmllLmltYWdlLm1lZGl1bX0gYWx0PVwiXCIgY2xhc3M9XCJteS1pbWdcIj5gO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbG92ZUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgbG92ZUltYWdlLnNyYyA9IFwiLi9tZWRpYS1saWJyYXJ5L2xvdmUucG5nXCI7XHJcbiAgICAgICAgICAgIGxvdmVJbWFnZS5jbGFzc05hbWUgPSBcImxvdmVcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxpa2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGlrZXMuY2xhc3NOYW1lID0gXCJzcGFjZVwiO1xyXG4gICAgICAgICAgICBsaWtlcy5pbm5lckhUTUwgPSBgPHA+JHttb3ZpZS5uYW1lfTwvcD5gO1xyXG4gICAgICAgICAgICBsaWtlcy5pbm5lckhUTUwgKz0gYCA8cD41IGxpa2VzPC9wPmA7XHJcbiAgICAgICAgICAgIGxpa2VzLmFwcGVuZENoaWxkKGxvdmVJbWFnZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBidXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgYnV0dG9uMS5jbGFzc05hbWUgPSBcImJ0blwiO1xyXG4gICAgICAgICAgICBidXR0b24xLmlubmVyVGV4dCA9IFwiQ29tbWVudHNcIjtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGJ1dHRvbjIuY2xhc3NOYW1lID0gXCJidG4gdmlld1JhdGluZ3NcIjtcclxuICAgICAgICAgICAgYnV0dG9uMi5pbm5lclRleHQgPSBcIlZpZXcgUmF0aW5nc1wiO1xyXG5cclxuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChpbWFnZXMpO1xyXG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGxpa2VzKTtcclxuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24xKTtcclxuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24yKTtcclxuICAgICAgICAgICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChib2R5KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHBvc3RcIik7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGdldFNob3dzO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=