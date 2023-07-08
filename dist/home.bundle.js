"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["home"],{

/***/ "./src/commentsModal/comments.js":
/*!***************************************!*\
  !*** ./src/commentsModal/comments.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createComment: () => (/* binding */ createComment),
/* harmony export */   getComments: () => (/* binding */ getComments)
/* harmony export */ });
const getComments = async (itemId) => {
  try {
    const response = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/comments?item_id=${itemId}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status}`);
    }

    const comments = await response.json();
    return comments;
  } catch (error) {
    throw new Error('Unable to fetch comments');
  }
};

const createComment = async (itemId, username, comment) => {
  try {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/comments',
      {
        method: 'POST',
        body: JSON.stringify({
          item_id: itemId,
          username,
          comment,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      },
    );

    if (response.status === 201) {
    //   console.log('Comment created successfully');
    } else {
      throw new Error(`Failed to create comment: ${response.status}`);
    }
  } catch (error) {
    throw new Error('Unable to create comment');
  }
};




/***/ }),

/***/ "./src/commentsModal/modal.js":
/*!************************************!*\
  !*** ./src/commentsModal/modal.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments.js */ "./src/commentsModal/comments.js");


const createModal = (movie) => {
  // Create the modal elements
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  const modalImage = document.createElement('div');
  modalImage.id = 'modal-image';
  const modalTitle = document.createElement('h2');
  modalTitle.id = 'modal-title';
  const modalDetails = document.createElement('div');
  modalDetails.id = 'modal-details';
  const commentsSection = document.createElement('div');
  commentsSection.id = 'comments-section';
  const commentsHeader = document.createElement('h3');
  commentsHeader.innerText = 'Comments';
  const commentsCounter = document.createElement('p');
  commentsCounter.id = 'comments-counter';
  const commentsList = document.createElement('ul');
  commentsList.id = 'comments-list';
  const commentForm = document.createElement('form');
  commentForm.id = 'comment-form';
  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name-input');
  nameLabel.innerText = 'Name:';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name-input';
  nameInput.required = true;
  const commentLabel = document.createElement('label');
  commentLabel.setAttribute('for', 'comment-input');
  commentLabel.innerText = 'Comment:';
  const commentInput = document.createElement('textarea');
  commentInput.id = 'comment-input';
  commentInput.required = true;
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerText = 'Comment';

  // Append elements to create the modal structure
  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalImage);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalDetails);
  commentsSection.appendChild(commentsHeader);
  commentsSection.appendChild(commentsCounter);
  commentsSection.appendChild(commentsList);
  commentForm.appendChild(nameLabel);
  commentForm.appendChild(nameInput);
  commentForm.appendChild(commentLabel);
  commentForm.appendChild(commentInput);
  commentForm.appendChild(submitButton);
  commentsSection.appendChild(commentForm);
  modalContent.appendChild(commentsSection);
  modalContainer.appendChild(modalContent);
  modalOverlay.appendChild(modalContainer);
  document.body.appendChild(modalOverlay);

  // Set the modal content
  modalImage.innerHTML = `<img src="${movie.image.medium}" alt="${movie.name}">`;
  modalTitle.innerText = movie.name;
  modalDetails.textContent = movie.summary;

  // Function to update comments in the modal
  const updateComments = async () => {
    try {
      const comments = await (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.getComments)(movie.id);
      const commentsCounter = document.getElementById('comments-counter');
      commentsCounter.textContent = `Comments (${comments.length})`;
      commentsList.innerHTML = '';

      comments.forEach((comment) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${comment.username}: ${comment.comment}`;
        commentsList.appendChild(listItem);
      });
    } catch (error) {
      // console.log('Error:', error.message);
    }
  };

  // Close modal when clicking the close button or outside the modal
  closeButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });

  // Prevent closing the modal when clicking inside the modal content
  modalContent.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  // Prevent form submission and handle comment submission
  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = nameInput.value;
    const comment = commentInput.value;

    try {
      await (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.createComment)(movie.id, username, comment);
      nameInput.value = '';
      commentInput.value = '';
      await updateComments();
    } catch (error) {
    //   console.log('Error:', error.message);
    }
  });

  // Display the modal
  modalOverlay.style.display = 'block';

  // Initialize comments
  updateComments();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createModal);


/***/ }),

/***/ "./src/home/getShows.js":
/*!******************************!*\
  !*** ./src/home/getShows.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reservationModal_reservations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reservationModal/reservations.js */ "./src/reservationModal/reservations.js");
/* harmony import */ var _likes_getLikes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../likes/getLikes.js */ "./src/likes/getLikes.js");
/* harmony import */ var _likes_likes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../likes/likes.js */ "./src/likes/likes.js");
/* harmony import */ var _commentsModal_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../commentsModal/modal.js */ "./src/commentsModal/modal.js");





const getShows = async () => {
  const homeContainer = document.querySelector('.homepage');
  const reservationsModal = new _reservationModal_reservations_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  const likesData = await (0,_likes_getLikes_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

  try {
    const response = await fetch('https://api.tvmaze.com/shows/1/episodes');
    if (!response.ok) {
      throw new Error(`Failed to fetch scores: ${response.status}`);
    }
    const json = await response.json();

    json.forEach((movie) => {
      const body = document.createElement('div');
      body.className = 'movies';
      const images = document.createElement('div');
      images.className = 'test-img';
      images.innerHTML = `<img src=${movie.image.medium} alt="" class="my-img">`;

      const loveImage = document.createElement('img');
      loveImage.src = './media-library/love.png';
      loveImage.className = 'love';

      const likes = document.createElement('div');
      likes.className = 'space';
      likes.innerHTML = `<p>${movie.name}</p> <p class="like-num"></p>`;
      likes.appendChild(loveImage);

      const button1 = document.createElement('button');
      button1.className = 'btn';
      button1.innerText = 'Comments';
      const button2 = document.createElement('button');
      button2.className = 'btn viewReservations';
      button2.innerText = 'Reservations';

      body.appendChild(images);
      body.appendChild(likes);
      body.appendChild(button1);
      body.appendChild(button2);
      homeContainer.appendChild(body);

      loveImage.addEventListener('click', async () => {
        try {
          await (0,_likes_likes_js__WEBPACK_IMPORTED_MODULE_2__["default"])(movie, likes);
        } catch (error) {
          throw new Error('Unable to like');
        }
      });

      const numberOfLikes = likes.querySelector('.like-num');
      let singleLike = 0;
      const like = likesData.find((like) => like.item_id === movie.id);

      if (like) {
        singleLike = like.likes;
        numberOfLikes.textContent = `${singleLike} Likes`;
      } else {
        numberOfLikes.textContent = `${singleLike} Likes`;
      }

      button1.addEventListener('click', () => {
        (0,_commentsModal_modal_js__WEBPACK_IMPORTED_MODULE_3__["default"])(movie);
      });
    });
  } catch (error) {
    throw new Error('Unable to fetch');
  }
  reservationsModal.showReservations();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getShows);


/***/ }),

/***/ "./src/home/home.js":
/*!**************************!*\
  !*** ./src/home/home.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var _getShows_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getShows.js */ "./src/home/getShows.js");


class Home {
  constructor() {
    this.renderPosts();
  }

  renderPosts() {
    _getShows_js__WEBPACK_IMPORTED_MODULE_0__["default"].bind(this)();
  }
}


/***/ }),

/***/ "./src/likes/getLikes.js":
/*!*******************************!*\
  !*** ./src/likes/getLikes.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getLikes = async () => {
  try {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/likes',
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch scores: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error('Unable to post');
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLikes);


/***/ }),

/***/ "./src/likes/likes.js":
/*!****************************!*\
  !*** ./src/likes/likes.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _updateLikes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateLikes.js */ "./src/likes/updateLikes.js");


const setLike = async (movie, likes) => {
  try {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/likes',
      {
        method: 'POST',
        body: JSON.stringify({
          item_id: movie.id,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      },
    );

    if (response.ok) {
      (0,_updateLikes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(movie, likes);
    }
  } catch (error) {
    throw new Error('Unable to post');
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setLike);


/***/ }),

/***/ "./src/likes/updateLikes.js":
/*!**********************************!*\
  !*** ./src/likes/updateLikes.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const updateMyLikes = (movie, likes) => {
  const numOfLikeDiv = likes.querySelector('.like-num');
  let singleLikes = parseInt(numOfLikeDiv.textContent, 10);
  singleLikes += 1;
  numOfLikeDiv.textContent = `${singleLikes} Likes`;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateMyLikes);


/***/ }),

/***/ "./src/reservationModal/displayReservation.js":
/*!****************************************************!*\
  !*** ./src/reservationModal/displayReservation.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DisplayAfterPost)
/* harmony export */ });
/* harmony import */ var _reservationModal_fetchReservations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reservationModal/fetchReservations.js */ "./src/reservationModal/fetchReservations.js");


class DisplayAfterPost {
  constructor() {
    this.reservationCount = 0;
  }

  updateCounter(fetchedReservationArr) {
    // Updates counter
    this.reservationCount = fetchedReservationArr.length;
    const reservationsHeading = document.querySelectorAll('.reservationsHeading');
    reservationsHeading.forEach((each) => each.textContent = `Reservations (${this.reservationCount}):`);
  }

  async displayReservations(index) {
    const fetchReservations = new _reservationModal_fetchReservations_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    fetchReservations.movieID = index;
    const fetchedReservation = await fetchReservations.fetchReservationsData();
    const fetchedReservationArr = Array.from(fetchedReservation);
    const existingReservations = document.querySelectorAll('.existingReservations');

    // Clear existing reservations
    existingReservations.forEach((each) => each.innerHTML = '');
    this.updateCounter(fetchedReservationArr);

    fetchedReservationArr.forEach((each) => {
      const reservation = document.createElement('p');
      reservation.textContent = `${each.date_start} - ${each.date_end} by ${each.username}`;
      existingReservations.forEach((each) => {
        each.appendChild(reservation);
      });
    });
  }
}

/***/ }),

/***/ "./src/reservationModal/fetchReservations.js":
/*!***************************************************!*\
  !*** ./src/reservationModal/fetchReservations.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FetchReservations)
/* harmony export */ });
class FetchReservations {
  constructor() {
    this.movieID = 0;
  }

  async fetchReservationsData() {
    const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/reservations?item_id=item${this.movieID}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      return null;
    }
  }
}


/***/ }),

/***/ "./src/reservationModal/postReservation.js":
/*!*************************************************!*\
  !*** ./src/reservationModal/postReservation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostResevation)
/* harmony export */ });
/* harmony import */ var _reservationModal_displayReservation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reservationModal/displayReservation.js */ "./src/reservationModal/displayReservation.js");


class PostResevation {
  constructor() {
    this.reservationForm = document.querySelector('.reservationForm');
    this.username = document.querySelector('#username');
    this.startDate = document.querySelector('#startDate');
    this.endDate = document.querySelector('#endDate');
    this.movieId = 0;

  }

  async postReservation(data) {
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
        // console.log('ok');
      }
    } catch (error) {
      throw new Error('Unable to post');
    }

    // update displayed reservations
    const loadReservations = new _reservationModal_displayReservation_js__WEBPACK_IMPORTED_MODULE_0__["default"];
    loadReservations.displayReservations(this.movieId);
  }

  setupListener() {
    console.log(this.movieId);
    this.reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(this.movieId);
      const data = {
        item_id: `item${this.movieId}`,
        username: this.username.value,
        date_start: this.startDate.value,
        date_end: this.endDate.value,
      };
      this.postReservation(data);
      this.username.value = '';
      this.startDate.value = '';
      this.endDate.value = '';
    });
  }
}

/***/ }),

/***/ "./src/reservationModal/pullMovies.js":
/*!********************************************!*\
  !*** ./src/reservationModal/pullMovies.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PullMoviesData)
/* harmony export */ });
class PullMoviesData {
  constructor() {
    this.url = 'https://api.tvmaze.com/shows/1/episodes';
  }

  async fetchMoviesData() {
    try {
      const response = await fetch(this.url);
      const result = await response.json();
      return result;
    } catch (error) {
      return null;
    }
  }
}


/***/ }),

/***/ "./src/reservationModal/reservations.js":
/*!**********************************************!*\
  !*** ./src/reservationModal/reservations.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Reservations)
/* harmony export */ });
/* harmony import */ var _pullMovies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pullMovies.js */ "./src/reservationModal/pullMovies.js");
/* harmony import */ var _postReservation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./postReservation.js */ "./src/reservationModal/postReservation.js");
/* harmony import */ var _fetchReservations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetchReservations.js */ "./src/reservationModal/fetchReservations.js");




class Reservations {
  constructor() {
    this.body = document.querySelector('body');
    this.viewReservationsBtns = document.getElementsByClassName('viewReservations');
    this.fetchReservations = new _fetchReservations_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.reservationCount = 0;
    this.showReservations();
  }

  async createReservationsModal(index) {
    const getMoviesDetails = new _pullMovies_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const moviesDetails = await getMoviesDetails.fetchMoviesData();
    const moviesDetailsArr = Array.from(moviesDetails);

    const reservationsSection = document.createElement('section');
    reservationsSection.className = 'reservationsSection';
    reservationsSection.innerHTML = `
    <div class="reservationsContainer">
      <p class="close-icon"><span class="material-symbols-outlined">close</span></p>
      <div class="movieDescription">
        <img class="movieImage" src="${moviesDetailsArr[index].image.medium}" width="600" alt="simple">
        <h2 class="movieTitle headings">${moviesDetailsArr[index].name}</h2>
        <div class="movieDescription"> ${moviesDetailsArr[index].summary}</div>
      </div>

      <div class="sectionContainers">
        <h2 class="reservationsHeading headings">Reservations(${this.reservationCount}):</h2>
        <div class="existingReservations"> </div>
      </div>

      <div class="sectionContainers">
        <h2 class="addReservationsHeading headings">Reserve a Spot:</h2>
        <form class="reservationForm">
          <input class="formFields" type="text" placeholder="Username" id="username" name="username">
          <input class="formFields" type="date" placeholder="Start Date" id="startDate" name="startDate">
          <input class="formFields" type="date" placeholder="End Date" id="endDate" name="endDate">
          <input class="submitBtn" type="submit" value="Reserve">
        </form>
      </div>
    </div>`;
    this.body.appendChild(reservationsSection);

    const reservationCloseBtns = document.querySelectorAll('.close-icon');
    this.closeReservationModal(reservationCloseBtns);

    const postReservationData = new _postReservation_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    postReservationData.movieId = index;
    postReservationData.setupListener();
  }

  closeReservationModal(reservationCloseBtns) {
    const reservationsSections = document.querySelectorAll('.reservationsSection');
    reservationCloseBtns.forEach((each) => each.addEventListener('click', () => {
      reservationsSections.forEach((each) => each.style.display = 'none');
    }));
  }

  updateCounter(fetchedReservationArr) {
    // Updates counter
    this.reservationCount = fetchedReservationArr.length;
    const reservationsHeading = document.querySelectorAll('.reservationsHeading');
    reservationsHeading.forEach((each) => each.textContent = `Reservations (${this.reservationCount}):`);
  }

  async displayReservations(index) {
    const fetchReservations = new _fetchReservations_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    fetchReservations.movieID = index;
    const fetchedReservation = await fetchReservations.fetchReservationsData();
    const fetchedReservationArr = Array.from(fetchedReservation);
    const existingReservations = document.querySelectorAll('.existingReservations');

    // Clear existing reservations
    existingReservations.forEach((each) => each.innerHTML = '');
    this.updateCounter(fetchedReservationArr);

    fetchedReservationArr.forEach((each) => {
      const reservation = document.createElement('p');
      reservation.textContent = `${each.date_start} - ${each.date_end} by ${each.username}`;
      existingReservations.forEach((each) => {
        each.appendChild(reservation);
      });
    });
  }

  showReservations() {
    const btnsArray = Array.from(this.viewReservationsBtns);
    btnsArray.forEach((each, eachindex) => {
      each.addEventListener('click', () => {
        this.createReservationsModal(eachindex);
        this.displayReservations(eachindex);
      });
    });
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/home/home.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0RGU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDZDO0FBQ007QUFDSTs7QUFFeEM7QUFDZjtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsNkRBQWlCO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxzREFBYztBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxxQ0FBcUM7QUFDNUUsMENBQTBDLDZCQUE2QjtBQUN2RSx5Q0FBeUMsZ0NBQWdDO0FBQ3pFOztBQUVBO0FBQ0EsZ0VBQWdFLHNCQUFzQjtBQUN0RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQ0FBb0MsMkRBQWU7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFLHNCQUFzQjtBQUNwRzs7QUFFQTtBQUNBLGtDQUFrQyw2REFBaUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsaUJBQWlCLElBQUksZUFBZSxLQUFLLGNBQWM7QUFDMUY7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2NvbW1lbnRzTW9kYWwvY29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2NvbW1lbnRzTW9kYWwvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2hvbWUvZ2V0U2hvd3MuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2hvbWUvaG9tZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbGlrZXMvZ2V0TGlrZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2xpa2VzL2xpa2VzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9saWtlcy91cGRhdGVMaWtlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcmVzZXJ2YXRpb25Nb2RhbC9kaXNwbGF5UmVzZXJ2YXRpb24uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvZmV0Y2hSZXNlcnZhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvcG9zdFJlc2VydmF0aW9uLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL3B1bGxNb3ZpZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvcmVzZXJ2YXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldENvbW1lbnRzID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvY29tbWVudHM/aXRlbV9pZD0ke2l0ZW1JZH1gLFxuICAgICk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBjb21tZW50czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgY29tbWVudHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGNvbW1lbnRzO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZldGNoIGNvbW1lbnRzJyk7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZUNvbW1lbnQgPSBhc3luYyAoaXRlbUlkLCB1c2VybmFtZSwgY29tbWVudCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvY29tbWVudHMnLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1faWQ6IGl0ZW1JZCxcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBjb21tZW50LFxuICAgICAgICB9KSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDEpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdDb21tZW50IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBjb21tZW50OiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY3JlYXRlIGNvbW1lbnQnKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZ2V0Q29tbWVudHMsIGNyZWF0ZUNvbW1lbnQgfTtcbiIsImltcG9ydCB7IGdldENvbW1lbnRzLCBjcmVhdGVDb21tZW50IH0gZnJvbSAnLi9jb21tZW50cy5qcyc7XG5cbmNvbnN0IGNyZWF0ZU1vZGFsID0gKG1vdmllKSA9PiB7XG4gIC8vIENyZWF0ZSB0aGUgbW9kYWwgZWxlbWVudHNcbiAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsT3ZlcmxheS5jbGFzc05hbWUgPSAnbW9kYWwtb3ZlcmxheSc7XG4gIGNvbnN0IG1vZGFsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdtb2RhbC1jb250YWluZXInO1xuICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWxDb250ZW50LmNsYXNzTmFtZSA9ICdtb2RhbC1jb250ZW50JztcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZS1idXR0b24nO1xuICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XG4gIGNvbnN0IG1vZGFsSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWxJbWFnZS5pZCA9ICdtb2RhbC1pbWFnZSc7XG4gIGNvbnN0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICBtb2RhbFRpdGxlLmlkID0gJ21vZGFsLXRpdGxlJztcbiAgY29uc3QgbW9kYWxEZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsRGV0YWlscy5pZCA9ICdtb2RhbC1kZXRhaWxzJztcbiAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbW1lbnRzU2VjdGlvbi5pZCA9ICdjb21tZW50cy1zZWN0aW9uJztcbiAgY29uc3QgY29tbWVudHNIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICBjb21tZW50c0hlYWRlci5pbm5lclRleHQgPSAnQ29tbWVudHMnO1xuICBjb25zdCBjb21tZW50c0NvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGNvbW1lbnRzQ291bnRlci5pZCA9ICdjb21tZW50cy1jb3VudGVyJztcbiAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgY29tbWVudHNMaXN0LmlkID0gJ2NvbW1lbnRzLWxpc3QnO1xuICBjb25zdCBjb21tZW50Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgY29tbWVudEZvcm0uaWQgPSAnY29tbWVudC1mb3JtJztcbiAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgbmFtZUxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ25hbWUtaW5wdXQnKTtcbiAgbmFtZUxhYmVsLmlubmVyVGV4dCA9ICdOYW1lOic7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIG5hbWVJbnB1dC50eXBlID0gJ3RleHQnO1xuICBuYW1lSW5wdXQuaWQgPSAnbmFtZS1pbnB1dCc7XG4gIG5hbWVJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gIGNvbnN0IGNvbW1lbnRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGNvbW1lbnRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdjb21tZW50LWlucHV0Jyk7XG4gIGNvbW1lbnRMYWJlbC5pbm5lclRleHQgPSAnQ29tbWVudDonO1xuICBjb25zdCBjb21tZW50SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICBjb21tZW50SW5wdXQuaWQgPSAnY29tbWVudC1pbnB1dCc7XG4gIGNvbW1lbnRJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBzdWJtaXRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0NvbW1lbnQnO1xuXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBjcmVhdGUgdGhlIG1vZGFsIHN0cnVjdHVyZVxuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxJbWFnZSk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbFRpdGxlKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG1vZGFsRGV0YWlscyk7XG4gIGNvbW1lbnRzU2VjdGlvbi5hcHBlbmRDaGlsZChjb21tZW50c0hlYWRlcik7XG4gIGNvbW1lbnRzU2VjdGlvbi5hcHBlbmRDaGlsZChjb21tZW50c0NvdW50ZXIpO1xuICBjb21tZW50c1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29tbWVudHNMaXN0KTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQoY29tbWVudExhYmVsKTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQoY29tbWVudElucHV0KTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgY29tbWVudHNTZWN0aW9uLmFwcGVuZENoaWxkKGNvbW1lbnRGb3JtKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKGNvbW1lbnRzU2VjdGlvbik7XG4gIG1vZGFsQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG4gIG1vZGFsT3ZlcmxheS5hcHBlbmRDaGlsZChtb2RhbENvbnRhaW5lcik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWxPdmVybGF5KTtcblxuICAvLyBTZXQgdGhlIG1vZGFsIGNvbnRlbnRcbiAgbW9kYWxJbWFnZS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke21vdmllLmltYWdlLm1lZGl1bX1cIiBhbHQ9XCIke21vdmllLm5hbWV9XCI+YDtcbiAgbW9kYWxUaXRsZS5pbm5lclRleHQgPSBtb3ZpZS5uYW1lO1xuICBtb2RhbERldGFpbHMudGV4dENvbnRlbnQgPSBtb3ZpZS5zdW1tYXJ5O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjb21tZW50cyBpbiB0aGUgbW9kYWxcbiAgY29uc3QgdXBkYXRlQ29tbWVudHMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHMobW92aWUuaWQpO1xuICAgICAgY29uc3QgY29tbWVudHNDb3VudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLWNvdW50ZXInKTtcbiAgICAgIGNvbW1lbnRzQ291bnRlci50ZXh0Q29udGVudCA9IGBDb21tZW50cyAoJHtjb21tZW50cy5sZW5ndGh9KWA7XG4gICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgIGNvbW1lbnRzLmZvckVhY2goKGNvbW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaXN0SXRlbS5pbm5lclRleHQgPSBgJHtjb21tZW50LnVzZXJuYW1lfTogJHtjb21tZW50LmNvbW1lbnR9YDtcbiAgICAgICAgY29tbWVudHNMaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnRXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIENsb3NlIG1vZGFsIHdoZW4gY2xpY2tpbmcgdGhlIGNsb3NlIGJ1dHRvbiBvciBvdXRzaWRlIHRoZSBtb2RhbFxuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtb2RhbE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfSk7XG4gIG1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xuICAgICAgbW9kYWxPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcblxuICAvLyBQcmV2ZW50IGNsb3NpbmcgdGhlIG1vZGFsIHdoZW4gY2xpY2tpbmcgaW5zaWRlIHRoZSBtb2RhbCBjb250ZW50XG4gIG1vZGFsQ29udGVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBQcmV2ZW50IGZvcm0gc3VibWlzc2lvbiBhbmQgaGFuZGxlIGNvbW1lbnQgc3VibWlzc2lvblxuICBjb21tZW50Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVzZXJuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICAgIGNvbnN0IGNvbW1lbnQgPSBjb21tZW50SW5wdXQudmFsdWU7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgY3JlYXRlQ29tbWVudChtb3ZpZS5pZCwgdXNlcm5hbWUsIGNvbW1lbnQpO1xuICAgICAgbmFtZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICBjb21tZW50SW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGF3YWl0IHVwZGF0ZUNvbW1lbnRzKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIERpc3BsYXkgdGhlIG1vZGFsXG4gIG1vZGFsT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAvLyBJbml0aWFsaXplIGNvbW1lbnRzXG4gIHVwZGF0ZUNvbW1lbnRzKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVNb2RhbDtcbiIsImltcG9ydCBSZXNlcnZhdGlvbnMgZnJvbSAnLi4vcmVzZXJ2YXRpb25Nb2RhbC9yZXNlcnZhdGlvbnMuanMnO1xuaW1wb3J0IGdldExpa2VzIGZyb20gJy4uL2xpa2VzL2dldExpa2VzLmpzJztcbmltcG9ydCBzZXRMaWtlIGZyb20gJy4uL2xpa2VzL2xpa2VzLmpzJztcbmltcG9ydCBjcmVhdGVNb2RhbCBmcm9tICcuLi9jb21tZW50c01vZGFsL21vZGFsLmpzJztcblxuY29uc3QgZ2V0U2hvd3MgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGhvbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZXBhZ2UnKTtcbiAgY29uc3QgcmVzZXJ2YXRpb25zTW9kYWwgPSBuZXcgUmVzZXJ2YXRpb25zKCk7XG4gIGNvbnN0IGxpa2VzRGF0YSA9IGF3YWl0IGdldExpa2VzKCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzLzEvZXBpc29kZXMnKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBzY29yZXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAganNvbi5mb3JFYWNoKChtb3ZpZSkgPT4ge1xuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYm9keS5jbGFzc05hbWUgPSAnbW92aWVzJztcbiAgICAgIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgaW1hZ2VzLmNsYXNzTmFtZSA9ICd0ZXN0LWltZyc7XG4gICAgICBpbWFnZXMuaW5uZXJIVE1MID0gYDxpbWcgc3JjPSR7bW92aWUuaW1hZ2UubWVkaXVtfSBhbHQ9XCJcIiBjbGFzcz1cIm15LWltZ1wiPmA7XG5cbiAgICAgIGNvbnN0IGxvdmVJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgbG92ZUltYWdlLnNyYyA9ICcuL21lZGlhLWxpYnJhcnkvbG92ZS5wbmcnO1xuICAgICAgbG92ZUltYWdlLmNsYXNzTmFtZSA9ICdsb3ZlJztcblxuICAgICAgY29uc3QgbGlrZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGxpa2VzLmNsYXNzTmFtZSA9ICdzcGFjZSc7XG4gICAgICBsaWtlcy5pbm5lckhUTUwgPSBgPHA+JHttb3ZpZS5uYW1lfTwvcD4gPHAgY2xhc3M9XCJsaWtlLW51bVwiPjwvcD5gO1xuICAgICAgbGlrZXMuYXBwZW5kQ2hpbGQobG92ZUltYWdlKTtcblxuICAgICAgY29uc3QgYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgYnV0dG9uMS5jbGFzc05hbWUgPSAnYnRuJztcbiAgICAgIGJ1dHRvbjEuaW5uZXJUZXh0ID0gJ0NvbW1lbnRzJztcbiAgICAgIGNvbnN0IGJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIGJ1dHRvbjIuY2xhc3NOYW1lID0gJ2J0biB2aWV3UmVzZXJ2YXRpb25zJztcbiAgICAgIGJ1dHRvbjIuaW5uZXJUZXh0ID0gJ1Jlc2VydmF0aW9ucyc7XG5cbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1hZ2VzKTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQobGlrZXMpO1xuICAgICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24xKTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XG4gICAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvZHkpO1xuXG4gICAgICBsb3ZlSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgc2V0TGlrZShtb3ZpZSwgbGlrZXMpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGxpa2UnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG51bWJlck9mTGlrZXMgPSBsaWtlcy5xdWVyeVNlbGVjdG9yKCcubGlrZS1udW0nKTtcbiAgICAgIGxldCBzaW5nbGVMaWtlID0gMDtcbiAgICAgIGNvbnN0IGxpa2UgPSBsaWtlc0RhdGEuZmluZCgobGlrZSkgPT4gbGlrZS5pdGVtX2lkID09PSBtb3ZpZS5pZCk7XG5cbiAgICAgIGlmIChsaWtlKSB7XG4gICAgICAgIHNpbmdsZUxpa2UgPSBsaWtlLmxpa2VzO1xuICAgICAgICBudW1iZXJPZkxpa2VzLnRleHRDb250ZW50ID0gYCR7c2luZ2xlTGlrZX0gTGlrZXNgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbnVtYmVyT2ZMaWtlcy50ZXh0Q29udGVudCA9IGAke3NpbmdsZUxpa2V9IExpa2VzYDtcbiAgICAgIH1cblxuICAgICAgYnV0dG9uMS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY3JlYXRlTW9kYWwobW92aWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmV0Y2gnKTtcbiAgfVxuICByZXNlcnZhdGlvbnNNb2RhbC5zaG93UmVzZXJ2YXRpb25zKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRTaG93cztcbiIsImltcG9ydCBnZXRTaG93cyBmcm9tICcuL2dldFNob3dzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVuZGVyUG9zdHMoKTtcbiAgfVxuXG4gIHJlbmRlclBvc3RzKCkge1xuICAgIGdldFNob3dzLmJpbmQodGhpcykoKTtcbiAgfVxufVxuIiwiY29uc3QgZ2V0TGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9saWtlcycsXG4gICAgKTtcblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIHNjb3JlczogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4ganNvbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwb3N0Jyk7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBnZXRMaWtlcztcbiIsImltcG9ydCB1cGRhdGVNeUxpa2VzIGZyb20gJy4vdXBkYXRlTGlrZXMuanMnO1xuXG5jb25zdCBzZXRMaWtlID0gYXN5bmMgKG1vdmllLCBsaWtlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvbGlrZXMnLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1faWQ6IG1vdmllLmlkLFxuICAgICAgICB9KSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgIHVwZGF0ZU15TGlrZXMobW92aWUsIGxpa2VzKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcG9zdCcpO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgc2V0TGlrZTtcbiIsImNvbnN0IHVwZGF0ZU15TGlrZXMgPSAobW92aWUsIGxpa2VzKSA9PiB7XG4gIGNvbnN0IG51bU9mTGlrZURpdiA9IGxpa2VzLnF1ZXJ5U2VsZWN0b3IoJy5saWtlLW51bScpO1xuICBsZXQgc2luZ2xlTGlrZXMgPSBwYXJzZUludChudW1PZkxpa2VEaXYudGV4dENvbnRlbnQsIDEwKTtcbiAgc2luZ2xlTGlrZXMgKz0gMTtcbiAgbnVtT2ZMaWtlRGl2LnRleHRDb250ZW50ID0gYCR7c2luZ2xlTGlrZXN9IExpa2VzYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZU15TGlrZXM7XG4iLCJpbXBvcnQgRmV0Y2hSZXNlcnZhdGlvbnMgZnJvbSAnLi4vcmVzZXJ2YXRpb25Nb2RhbC9mZXRjaFJlc2VydmF0aW9ucy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwbGF5QWZ0ZXJQb3N0IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IDA7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVDb3VudGVyKGZldGNoZWRSZXNlcnZhdGlvbkFycikge1xyXG4gICAgLy8gVXBkYXRlcyBjb3VudGVyXHJcbiAgICB0aGlzLnJlc2VydmF0aW9uQ291bnQgPSBmZXRjaGVkUmVzZXJ2YXRpb25BcnIubGVuZ3RoO1xyXG4gICAgY29uc3QgcmVzZXJ2YXRpb25zSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbnNIZWFkaW5nJyk7XHJcbiAgICByZXNlcnZhdGlvbnNIZWFkaW5nLmZvckVhY2goKGVhY2gpID0+IGVhY2gudGV4dENvbnRlbnQgPSBgUmVzZXJ2YXRpb25zICgke3RoaXMucmVzZXJ2YXRpb25Db3VudH0pOmApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGlzcGxheVJlc2VydmF0aW9ucyhpbmRleCkge1xyXG4gICAgY29uc3QgZmV0Y2hSZXNlcnZhdGlvbnMgPSBuZXcgRmV0Y2hSZXNlcnZhdGlvbnMoKTtcclxuICAgIGZldGNoUmVzZXJ2YXRpb25zLm1vdmllSUQgPSBpbmRleDtcclxuICAgIGNvbnN0IGZldGNoZWRSZXNlcnZhdGlvbiA9IGF3YWl0IGZldGNoUmVzZXJ2YXRpb25zLmZldGNoUmVzZXJ2YXRpb25zRGF0YSgpO1xyXG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uQXJyID0gQXJyYXkuZnJvbShmZXRjaGVkUmVzZXJ2YXRpb24pO1xyXG4gICAgY29uc3QgZXhpc3RpbmdSZXNlcnZhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZXhpc3RpbmdSZXNlcnZhdGlvbnMnKTtcclxuXHJcbiAgICAvLyBDbGVhciBleGlzdGluZyByZXNlcnZhdGlvbnNcclxuICAgIGV4aXN0aW5nUmVzZXJ2YXRpb25zLmZvckVhY2goKGVhY2gpID0+IGVhY2guaW5uZXJIVE1MID0gJycpO1xyXG4gICAgdGhpcy51cGRhdGVDb3VudGVyKGZldGNoZWRSZXNlcnZhdGlvbkFycik7XHJcblxyXG4gICAgZmV0Y2hlZFJlc2VydmF0aW9uQXJyLmZvckVhY2goKGVhY2gpID0+IHtcclxuICAgICAgY29uc3QgcmVzZXJ2YXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHJlc2VydmF0aW9uLnRleHRDb250ZW50ID0gYCR7ZWFjaC5kYXRlX3N0YXJ0fSAtICR7ZWFjaC5kYXRlX2VuZH0gYnkgJHtlYWNoLnVzZXJuYW1lfWA7XHJcbiAgICAgIGV4aXN0aW5nUmVzZXJ2YXRpb25zLmZvckVhY2goKGVhY2gpID0+IHtcclxuICAgICAgICBlYWNoLmFwcGVuZENoaWxkKHJlc2VydmF0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGZXRjaFJlc2VydmF0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubW92aWVJRCA9IDA7XG4gIH1cblxuICBhc3luYyBmZXRjaFJlc2VydmF0aW9uc0RhdGEoKSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL3Jlc2VydmF0aW9ucz9pdGVtX2lkPWl0ZW0ke3RoaXMubW92aWVJRH1gO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5QWZ0ZXJQb3N0IGZyb20gJy4uL3Jlc2VydmF0aW9uTW9kYWwvZGlzcGxheVJlc2VydmF0aW9uLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3N0UmVzZXZhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXJ2YXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2VydmF0aW9uRm9ybScpO1xuICAgIHRoaXMudXNlcm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlcm5hbWUnKTtcbiAgICB0aGlzLnN0YXJ0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydERhdGUnKTtcbiAgICB0aGlzLmVuZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5kRGF0ZScpO1xuICAgIHRoaXMubW92aWVJZCA9IDA7XG5cbiAgfVxuXG4gIGFzeW5jIHBvc3RSZXNlcnZhdGlvbihkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9yZXNlcnZhdGlvbnMnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvaycpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwb3N0Jyk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGRpc3BsYXllZCByZXNlcnZhdGlvbnNcbiAgICBjb25zdCBsb2FkUmVzZXJ2YXRpb25zID0gbmV3IERpc3BsYXlBZnRlclBvc3Q7XG4gICAgbG9hZFJlc2VydmF0aW9ucy5kaXNwbGF5UmVzZXJ2YXRpb25zKHRoaXMubW92aWVJZCk7XG4gIH1cblxuICBzZXR1cExpc3RlbmVyKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMubW92aWVJZCk7XG4gICAgdGhpcy5yZXNlcnZhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubW92aWVJZCk7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBpdGVtX2lkOiBgaXRlbSR7dGhpcy5tb3ZpZUlkfWAsXG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLnZhbHVlLFxuICAgICAgICBkYXRlX3N0YXJ0OiB0aGlzLnN0YXJ0RGF0ZS52YWx1ZSxcbiAgICAgICAgZGF0ZV9lbmQ6IHRoaXMuZW5kRGF0ZS52YWx1ZSxcbiAgICAgIH07XG4gICAgICB0aGlzLnBvc3RSZXNlcnZhdGlvbihkYXRhKTtcbiAgICAgIHRoaXMudXNlcm5hbWUudmFsdWUgPSAnJztcbiAgICAgIHRoaXMuc3RhcnREYXRlLnZhbHVlID0gJyc7XG4gICAgICB0aGlzLmVuZERhdGUudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1bGxNb3ZpZXNEYXRhIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cy8xL2VwaXNvZGVzJztcbiAgfVxuXG4gIGFzeW5jIGZldGNoTW92aWVzRGF0YSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLnVybCk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQdWxsTW92aWVzRGF0YSBmcm9tICcuL3B1bGxNb3ZpZXMuanMnO1xuaW1wb3J0IFBvc3RSZXNlcnZhdGlvbiBmcm9tICcuL3Bvc3RSZXNlcnZhdGlvbi5qcyc7XG5pbXBvcnQgRmV0Y2hSZXNlcnZhdGlvbnMgZnJvbSAnLi9mZXRjaFJlc2VydmF0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc2VydmF0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICB0aGlzLnZpZXdSZXNlcnZhdGlvbnNCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmlld1Jlc2VydmF0aW9ucycpO1xuICAgIHRoaXMuZmV0Y2hSZXNlcnZhdGlvbnMgPSBuZXcgRmV0Y2hSZXNlcnZhdGlvbnMoKTtcbiAgICB0aGlzLnJlc2VydmF0aW9uQ291bnQgPSAwO1xuICAgIHRoaXMuc2hvd1Jlc2VydmF0aW9ucygpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlUmVzZXJ2YXRpb25zTW9kYWwoaW5kZXgpIHtcbiAgICBjb25zdCBnZXRNb3ZpZXNEZXRhaWxzID0gbmV3IFB1bGxNb3ZpZXNEYXRhKCk7XG4gICAgY29uc3QgbW92aWVzRGV0YWlscyA9IGF3YWl0IGdldE1vdmllc0RldGFpbHMuZmV0Y2hNb3ZpZXNEYXRhKCk7XG4gICAgY29uc3QgbW92aWVzRGV0YWlsc0FyciA9IEFycmF5LmZyb20obW92aWVzRGV0YWlscyk7XG5cbiAgICBjb25zdCByZXNlcnZhdGlvbnNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIHJlc2VydmF0aW9uc1NlY3Rpb24uY2xhc3NOYW1lID0gJ3Jlc2VydmF0aW9uc1NlY3Rpb24nO1xuICAgIHJlc2VydmF0aW9uc1NlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJyZXNlcnZhdGlvbnNDb250YWluZXJcIj5cbiAgICAgIDxwIGNsYXNzPVwiY2xvc2UtaWNvblwiPjxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPmNsb3NlPC9zcGFuPjwvcD5cbiAgICAgIDxkaXYgY2xhc3M9XCJtb3ZpZURlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxpbWcgY2xhc3M9XCJtb3ZpZUltYWdlXCIgc3JjPVwiJHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5pbWFnZS5tZWRpdW19XCIgd2lkdGg9XCI2MDBcIiBhbHQ9XCJzaW1wbGVcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwibW92aWVUaXRsZSBoZWFkaW5nc1wiPiR7bW92aWVzRGV0YWlsc0FycltpbmRleF0ubmFtZX08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW92aWVEZXNjcmlwdGlvblwiPiAke21vdmllc0RldGFpbHNBcnJbaW5kZXhdLnN1bW1hcnl9PC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb25Db250YWluZXJzXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cInJlc2VydmF0aW9uc0hlYWRpbmcgaGVhZGluZ3NcIj5SZXNlcnZhdGlvbnMoJHt0aGlzLnJlc2VydmF0aW9uQ291bnR9KTo8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZXhpc3RpbmdSZXNlcnZhdGlvbnNcIj4gPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb25Db250YWluZXJzXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cImFkZFJlc2VydmF0aW9uc0hlYWRpbmcgaGVhZGluZ3NcIj5SZXNlcnZlIGEgU3BvdDo8L2gyPlxuICAgICAgICA8Zm9ybSBjbGFzcz1cInJlc2VydmF0aW9uRm9ybVwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm1GaWVsZHNcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiBpZD1cInVzZXJuYW1lXCIgbmFtZT1cInVzZXJuYW1lXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJkYXRlXCIgcGxhY2Vob2xkZXI9XCJTdGFydCBEYXRlXCIgaWQ9XCJzdGFydERhdGVcIiBuYW1lPVwic3RhcnREYXRlXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJkYXRlXCIgcGxhY2Vob2xkZXI9XCJFbmQgRGF0ZVwiIGlkPVwiZW5kRGF0ZVwiIG5hbWU9XCJlbmREYXRlXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwic3VibWl0QnRuXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiUmVzZXJ2ZVwiPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChyZXNlcnZhdGlvbnNTZWN0aW9uKTtcblxuICAgIGNvbnN0IHJlc2VydmF0aW9uQ2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLWljb24nKTtcbiAgICB0aGlzLmNsb3NlUmVzZXJ2YXRpb25Nb2RhbChyZXNlcnZhdGlvbkNsb3NlQnRucyk7XG5cbiAgICBjb25zdCBwb3N0UmVzZXJ2YXRpb25EYXRhID0gbmV3IFBvc3RSZXNlcnZhdGlvbigpO1xuICAgIHBvc3RSZXNlcnZhdGlvbkRhdGEubW92aWVJZCA9IGluZGV4O1xuICAgIHBvc3RSZXNlcnZhdGlvbkRhdGEuc2V0dXBMaXN0ZW5lcigpO1xuICB9XG5cbiAgY2xvc2VSZXNlcnZhdGlvbk1vZGFsKHJlc2VydmF0aW9uQ2xvc2VCdG5zKSB7XG4gICAgY29uc3QgcmVzZXJ2YXRpb25zU2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVzZXJ2YXRpb25zU2VjdGlvbicpO1xuICAgIHJlc2VydmF0aW9uQ2xvc2VCdG5zLmZvckVhY2goKGVhY2gpID0+IGVhY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICByZXNlcnZhdGlvbnNTZWN0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiBlYWNoLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xuICAgIH0pKTtcbiAgfVxuXG4gIHVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKSB7XG4gICAgLy8gVXBkYXRlcyBjb3VudGVyXG4gICAgdGhpcy5yZXNlcnZhdGlvbkNvdW50ID0gZmV0Y2hlZFJlc2VydmF0aW9uQXJyLmxlbmd0aDtcbiAgICBjb25zdCByZXNlcnZhdGlvbnNIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc2VydmF0aW9uc0hlYWRpbmcnKTtcbiAgICByZXNlcnZhdGlvbnNIZWFkaW5nLmZvckVhY2goKGVhY2gpID0+IGVhY2gudGV4dENvbnRlbnQgPSBgUmVzZXJ2YXRpb25zICgke3RoaXMucmVzZXJ2YXRpb25Db3VudH0pOmApO1xuICB9XG5cbiAgYXN5bmMgZGlzcGxheVJlc2VydmF0aW9ucyhpbmRleCkge1xuICAgIGNvbnN0IGZldGNoUmVzZXJ2YXRpb25zID0gbmV3IEZldGNoUmVzZXJ2YXRpb25zKCk7XG4gICAgZmV0Y2hSZXNlcnZhdGlvbnMubW92aWVJRCA9IGluZGV4O1xuICAgIGNvbnN0IGZldGNoZWRSZXNlcnZhdGlvbiA9IGF3YWl0IGZldGNoUmVzZXJ2YXRpb25zLmZldGNoUmVzZXJ2YXRpb25zRGF0YSgpO1xuICAgIGNvbnN0IGZldGNoZWRSZXNlcnZhdGlvbkFyciA9IEFycmF5LmZyb20oZmV0Y2hlZFJlc2VydmF0aW9uKTtcbiAgICBjb25zdCBleGlzdGluZ1Jlc2VydmF0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leGlzdGluZ1Jlc2VydmF0aW9ucycpO1xuXG4gICAgLy8gQ2xlYXIgZXhpc3RpbmcgcmVzZXJ2YXRpb25zXG4gICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC5pbm5lckhUTUwgPSAnJyk7XG4gICAgdGhpcy51cGRhdGVDb3VudGVyKGZldGNoZWRSZXNlcnZhdGlvbkFycik7XG5cbiAgICBmZXRjaGVkUmVzZXJ2YXRpb25BcnIuZm9yRWFjaCgoZWFjaCkgPT4ge1xuICAgICAgY29uc3QgcmVzZXJ2YXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICByZXNlcnZhdGlvbi50ZXh0Q29udGVudCA9IGAke2VhY2guZGF0ZV9zdGFydH0gLSAke2VhY2guZGF0ZV9lbmR9IGJ5ICR7ZWFjaC51c2VybmFtZX1gO1xuICAgICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4ge1xuICAgICAgICBlYWNoLmFwcGVuZENoaWxkKHJlc2VydmF0aW9uKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd1Jlc2VydmF0aW9ucygpIHtcbiAgICBjb25zdCBidG5zQXJyYXkgPSBBcnJheS5mcm9tKHRoaXMudmlld1Jlc2VydmF0aW9uc0J0bnMpO1xuICAgIGJ0bnNBcnJheS5mb3JFYWNoKChlYWNoLCBlYWNoaW5kZXgpID0+IHtcbiAgICAgIGVhY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3JlYXRlUmVzZXJ2YXRpb25zTW9kYWwoZWFjaGluZGV4KTtcbiAgICAgICAgdGhpcy5kaXNwbGF5UmVzZXJ2YXRpb25zKGVhY2hpbmRleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9