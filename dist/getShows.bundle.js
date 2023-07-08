"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["getShows"],{

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
/* harmony import */ var _fetchReservations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchReservations.js */ "./src/reservationModal/fetchReservations.js");


class DisplayAfterPost {
  constructor() {
    this.reservationCount = 0;
  }

  updateCounter(fetchedReservationArr) {
    // Updates counter
    this.reservationCount = fetchedReservationArr.length;
    const reservationsHeading = document.querySelectorAll('.reservationsHeading');
    reservationsHeading.forEach((each) => {
      each.textContent = `Reservations (${this.reservationCount}):`;
    });
  }

  async displayReservations(index) {
    const fetchReservations = new _fetchReservations_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    fetchReservations.movieID = index;
    const fetchedReservation = await fetchReservations.fetchReservationsData();
    const fetchedReservationArr = Array.from(fetchedReservation);
    const existingReservations = document.querySelectorAll('.existingReservations');

    // Clear existing reservations
    existingReservations.forEach((each) => {
      each.innerHTML = '';
    });
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
    this.reservationForm = document.querySelectorAll('.reservationForm');
    this.username = document.querySelector('#username');
    this.startDate = document.querySelector('#startDate');
    this.endDate = document.querySelector('#endDate');
    this.movieId = 0;
    this.setupListener();
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
        // gives error;
      }
    } catch (error) {
      throw new Error('Unable to post');
    }

    // update displayed reservations
    const loadReservations = new _reservationModal_displayReservation_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    loadReservations.displayReservations(this.movieId);
  }

  setupListener() {
    this.reservationForm.forEach((each) => each.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        item_id: `item${this.movieId}`,
        username: this.username.value,
        date_start: this.startDate.value,
        date_end: this.endDate.value,
      };
      console.log("first");
      this.postReservation(data);
      console.log(data);
      console.log("second");
      this.username.value = '';
      this.startDate.value = '';
      this.endDate.value = '';
    }));
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
  }

  closeReservationModal(reservationCloseBtns) {
    this.reservationsSections = document.querySelectorAll('.reservationsSection');
    reservationCloseBtns.forEach((each) => {
      each.addEventListener('click', () => {
        this.reservationsSections.forEach((each) => {
          each.style.display = 'none';
        });
      });
    });
  }

  updateCounter(fetchedReservationArr) {
    // Updates counter
    this.reservationCount = fetchedReservationArr.length;
    const reservationsHeading = document.querySelectorAll('.reservationsHeading');
    reservationsHeading.forEach((each) => {
      each.textContent = `Reservations (${this.reservationCount}):`;
    });
  }

  async displayReservations(index) {
    const fetchReservations = new _fetchReservations_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    fetchReservations.movieID = index;
    const fetchedReservation = await fetchReservations.fetchReservationsData();
    const fetchedReservationArr = Array.from(fetchedReservation);
    const existingReservations = document.querySelectorAll('.existingReservations');

    // Clear existing reservations
    existingReservations.forEach((each) => {
      each.innerHTML = '';
    });
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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/home/getShows.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdkRlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2Q2QztBQUNNO0FBQ0k7O0FBRXhDO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLDZEQUFpQjtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsc0RBQWM7QUFDL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMscUNBQXFDO0FBQzVFLDBDQUEwQyw2QkFBNkI7QUFDdkUseUNBQXlDLGdDQUFnQztBQUN6RTs7QUFFQTtBQUNBLGdFQUFnRSxzQkFBc0I7QUFDdEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0NBQW9DLDJEQUFlO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0I7QUFDaEUsS0FBSztBQUNMOztBQUVBO0FBQ0Esa0NBQWtDLDZEQUFpQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxpQkFBaUIsSUFBSSxlQUFlLEtBQUssY0FBYztBQUMxRjtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvY29tbWVudHNNb2RhbC9jb21tZW50cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvY29tbWVudHNNb2RhbC9tb2RhbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaG9tZS9nZXRTaG93cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbGlrZXMvZ2V0TGlrZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2xpa2VzL2xpa2VzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9saWtlcy91cGRhdGVMaWtlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcmVzZXJ2YXRpb25Nb2RhbC9kaXNwbGF5UmVzZXJ2YXRpb24uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvZmV0Y2hSZXNlcnZhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvcG9zdFJlc2VydmF0aW9uLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL3B1bGxNb3ZpZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvcmVzZXJ2YXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldENvbW1lbnRzID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvY29tbWVudHM/aXRlbV9pZD0ke2l0ZW1JZH1gLFxuICAgICk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBjb21tZW50czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgY29tbWVudHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGNvbW1lbnRzO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZldGNoIGNvbW1lbnRzJyk7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZUNvbW1lbnQgPSBhc3luYyAoaXRlbUlkLCB1c2VybmFtZSwgY29tbWVudCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvY29tbWVudHMnLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1faWQ6IGl0ZW1JZCxcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBjb21tZW50LFxuICAgICAgICB9KSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDEpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdDb21tZW50IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBjb21tZW50OiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY3JlYXRlIGNvbW1lbnQnKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZ2V0Q29tbWVudHMsIGNyZWF0ZUNvbW1lbnQgfTtcbiIsImltcG9ydCB7IGdldENvbW1lbnRzLCBjcmVhdGVDb21tZW50IH0gZnJvbSAnLi9jb21tZW50cy5qcyc7XG5cbmNvbnN0IGNyZWF0ZU1vZGFsID0gKG1vdmllKSA9PiB7XG4gIC8vIENyZWF0ZSB0aGUgbW9kYWwgZWxlbWVudHNcbiAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsT3ZlcmxheS5jbGFzc05hbWUgPSAnbW9kYWwtb3ZlcmxheSc7XG4gIGNvbnN0IG1vZGFsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdtb2RhbC1jb250YWluZXInO1xuICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWxDb250ZW50LmNsYXNzTmFtZSA9ICdtb2RhbC1jb250ZW50JztcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZS1idXR0b24nO1xuICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XG4gIGNvbnN0IG1vZGFsSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWxJbWFnZS5pZCA9ICdtb2RhbC1pbWFnZSc7XG4gIGNvbnN0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICBtb2RhbFRpdGxlLmlkID0gJ21vZGFsLXRpdGxlJztcbiAgY29uc3QgbW9kYWxEZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsRGV0YWlscy5pZCA9ICdtb2RhbC1kZXRhaWxzJztcbiAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbW1lbnRzU2VjdGlvbi5pZCA9ICdjb21tZW50cy1zZWN0aW9uJztcbiAgY29uc3QgY29tbWVudHNIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICBjb21tZW50c0hlYWRlci5pbm5lclRleHQgPSAnQ29tbWVudHMnO1xuICBjb25zdCBjb21tZW50c0NvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGNvbW1lbnRzQ291bnRlci5pZCA9ICdjb21tZW50cy1jb3VudGVyJztcbiAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgY29tbWVudHNMaXN0LmlkID0gJ2NvbW1lbnRzLWxpc3QnO1xuICBjb25zdCBjb21tZW50Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgY29tbWVudEZvcm0uaWQgPSAnY29tbWVudC1mb3JtJztcbiAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgbmFtZUxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ25hbWUtaW5wdXQnKTtcbiAgbmFtZUxhYmVsLmlubmVyVGV4dCA9ICdOYW1lOic7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIG5hbWVJbnB1dC50eXBlID0gJ3RleHQnO1xuICBuYW1lSW5wdXQuaWQgPSAnbmFtZS1pbnB1dCc7XG4gIG5hbWVJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gIGNvbnN0IGNvbW1lbnRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGNvbW1lbnRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdjb21tZW50LWlucHV0Jyk7XG4gIGNvbW1lbnRMYWJlbC5pbm5lclRleHQgPSAnQ29tbWVudDonO1xuICBjb25zdCBjb21tZW50SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICBjb21tZW50SW5wdXQuaWQgPSAnY29tbWVudC1pbnB1dCc7XG4gIGNvbW1lbnRJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBzdWJtaXRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0NvbW1lbnQnO1xuXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBjcmVhdGUgdGhlIG1vZGFsIHN0cnVjdHVyZVxuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxJbWFnZSk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbFRpdGxlKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG1vZGFsRGV0YWlscyk7XG4gIGNvbW1lbnRzU2VjdGlvbi5hcHBlbmRDaGlsZChjb21tZW50c0hlYWRlcik7XG4gIGNvbW1lbnRzU2VjdGlvbi5hcHBlbmRDaGlsZChjb21tZW50c0NvdW50ZXIpO1xuICBjb21tZW50c1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29tbWVudHNMaXN0KTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQoY29tbWVudExhYmVsKTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQoY29tbWVudElucHV0KTtcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgY29tbWVudHNTZWN0aW9uLmFwcGVuZENoaWxkKGNvbW1lbnRGb3JtKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKGNvbW1lbnRzU2VjdGlvbik7XG4gIG1vZGFsQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG4gIG1vZGFsT3ZlcmxheS5hcHBlbmRDaGlsZChtb2RhbENvbnRhaW5lcik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWxPdmVybGF5KTtcblxuICAvLyBTZXQgdGhlIG1vZGFsIGNvbnRlbnRcbiAgbW9kYWxJbWFnZS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke21vdmllLmltYWdlLm1lZGl1bX1cIiBhbHQ9XCIke21vdmllLm5hbWV9XCI+YDtcbiAgbW9kYWxUaXRsZS5pbm5lclRleHQgPSBtb3ZpZS5uYW1lO1xuICBtb2RhbERldGFpbHMudGV4dENvbnRlbnQgPSBtb3ZpZS5zdW1tYXJ5O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjb21tZW50cyBpbiB0aGUgbW9kYWxcbiAgY29uc3QgdXBkYXRlQ29tbWVudHMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHMobW92aWUuaWQpO1xuICAgICAgY29uc3QgY29tbWVudHNDb3VudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLWNvdW50ZXInKTtcbiAgICAgIGNvbW1lbnRzQ291bnRlci50ZXh0Q29udGVudCA9IGBDb21tZW50cyAoJHtjb21tZW50cy5sZW5ndGh9KWA7XG4gICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgIGNvbW1lbnRzLmZvckVhY2goKGNvbW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaXN0SXRlbS5pbm5lclRleHQgPSBgJHtjb21tZW50LnVzZXJuYW1lfTogJHtjb21tZW50LmNvbW1lbnR9YDtcbiAgICAgICAgY29tbWVudHNMaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnRXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIENsb3NlIG1vZGFsIHdoZW4gY2xpY2tpbmcgdGhlIGNsb3NlIGJ1dHRvbiBvciBvdXRzaWRlIHRoZSBtb2RhbFxuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtb2RhbE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfSk7XG4gIG1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xuICAgICAgbW9kYWxPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcblxuICAvLyBQcmV2ZW50IGNsb3NpbmcgdGhlIG1vZGFsIHdoZW4gY2xpY2tpbmcgaW5zaWRlIHRoZSBtb2RhbCBjb250ZW50XG4gIG1vZGFsQ29udGVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBQcmV2ZW50IGZvcm0gc3VibWlzc2lvbiBhbmQgaGFuZGxlIGNvbW1lbnQgc3VibWlzc2lvblxuICBjb21tZW50Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVzZXJuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICAgIGNvbnN0IGNvbW1lbnQgPSBjb21tZW50SW5wdXQudmFsdWU7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgY3JlYXRlQ29tbWVudChtb3ZpZS5pZCwgdXNlcm5hbWUsIGNvbW1lbnQpO1xuICAgICAgbmFtZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICBjb21tZW50SW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGF3YWl0IHVwZGF0ZUNvbW1lbnRzKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIERpc3BsYXkgdGhlIG1vZGFsXG4gIG1vZGFsT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAvLyBJbml0aWFsaXplIGNvbW1lbnRzXG4gIHVwZGF0ZUNvbW1lbnRzKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVNb2RhbDtcbiIsImltcG9ydCBSZXNlcnZhdGlvbnMgZnJvbSAnLi4vcmVzZXJ2YXRpb25Nb2RhbC9yZXNlcnZhdGlvbnMuanMnO1xuaW1wb3J0IGdldExpa2VzIGZyb20gJy4uL2xpa2VzL2dldExpa2VzLmpzJztcbmltcG9ydCBzZXRMaWtlIGZyb20gJy4uL2xpa2VzL2xpa2VzLmpzJztcbmltcG9ydCBjcmVhdGVNb2RhbCBmcm9tICcuLi9jb21tZW50c01vZGFsL21vZGFsLmpzJztcblxuY29uc3QgZ2V0U2hvd3MgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGhvbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZXBhZ2UnKTtcbiAgY29uc3QgcmVzZXJ2YXRpb25zTW9kYWwgPSBuZXcgUmVzZXJ2YXRpb25zKCk7XG4gIGNvbnN0IGxpa2VzRGF0YSA9IGF3YWl0IGdldExpa2VzKCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzLzEvZXBpc29kZXMnKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBzY29yZXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAganNvbi5mb3JFYWNoKChtb3ZpZSkgPT4ge1xuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYm9keS5jbGFzc05hbWUgPSAnbW92aWVzJztcbiAgICAgIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgaW1hZ2VzLmNsYXNzTmFtZSA9ICd0ZXN0LWltZyc7XG4gICAgICBpbWFnZXMuaW5uZXJIVE1MID0gYDxpbWcgc3JjPSR7bW92aWUuaW1hZ2UubWVkaXVtfSBhbHQ9XCJcIiBjbGFzcz1cIm15LWltZ1wiPmA7XG5cbiAgICAgIGNvbnN0IGxvdmVJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgbG92ZUltYWdlLnNyYyA9ICcuL21lZGlhLWxpYnJhcnkvbG92ZS5wbmcnO1xuICAgICAgbG92ZUltYWdlLmNsYXNzTmFtZSA9ICdsb3ZlJztcblxuICAgICAgY29uc3QgbGlrZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGxpa2VzLmNsYXNzTmFtZSA9ICdzcGFjZSc7XG4gICAgICBsaWtlcy5pbm5lckhUTUwgPSBgPHA+JHttb3ZpZS5uYW1lfTwvcD4gPHAgY2xhc3M9XCJsaWtlLW51bVwiPjwvcD5gO1xuICAgICAgbGlrZXMuYXBwZW5kQ2hpbGQobG92ZUltYWdlKTtcblxuICAgICAgY29uc3QgYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgYnV0dG9uMS5jbGFzc05hbWUgPSAnYnRuJztcbiAgICAgIGJ1dHRvbjEuaW5uZXJUZXh0ID0gJ0NvbW1lbnRzJztcbiAgICAgIGNvbnN0IGJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIGJ1dHRvbjIuY2xhc3NOYW1lID0gJ2J0biB2aWV3UmVzZXJ2YXRpb25zJztcbiAgICAgIGJ1dHRvbjIuaW5uZXJUZXh0ID0gJ1Jlc2VydmF0aW9ucyc7XG5cbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1hZ2VzKTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQobGlrZXMpO1xuICAgICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24xKTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XG4gICAgICBob21lQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvZHkpO1xuXG4gICAgICBsb3ZlSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgc2V0TGlrZShtb3ZpZSwgbGlrZXMpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGxpa2UnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG51bWJlck9mTGlrZXMgPSBsaWtlcy5xdWVyeVNlbGVjdG9yKCcubGlrZS1udW0nKTtcbiAgICAgIGxldCBzaW5nbGVMaWtlID0gMDtcbiAgICAgIGNvbnN0IGxpa2UgPSBsaWtlc0RhdGEuZmluZCgobGlrZSkgPT4gbGlrZS5pdGVtX2lkID09PSBtb3ZpZS5pZCk7XG5cbiAgICAgIGlmIChsaWtlKSB7XG4gICAgICAgIHNpbmdsZUxpa2UgPSBsaWtlLmxpa2VzO1xuICAgICAgICBudW1iZXJPZkxpa2VzLnRleHRDb250ZW50ID0gYCR7c2luZ2xlTGlrZX0gTGlrZXNgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbnVtYmVyT2ZMaWtlcy50ZXh0Q29udGVudCA9IGAke3NpbmdsZUxpa2V9IExpa2VzYDtcbiAgICAgIH1cblxuICAgICAgYnV0dG9uMS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY3JlYXRlTW9kYWwobW92aWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmV0Y2gnKTtcbiAgfVxuICByZXNlcnZhdGlvbnNNb2RhbC5zaG93UmVzZXJ2YXRpb25zKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRTaG93cztcbiIsImNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvbGlrZXMnLFxuICAgICk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBzY29yZXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGpzb247XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcG9zdCcpO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0TGlrZXM7XG4iLCJpbXBvcnQgdXBkYXRlTXlMaWtlcyBmcm9tICcuL3VwZGF0ZUxpa2VzLmpzJztcblxuY29uc3Qgc2V0TGlrZSA9IGFzeW5jIChtb3ZpZSwgbGlrZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL2xpa2VzJyxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpdGVtX2lkOiBtb3ZpZS5pZCxcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICB1cGRhdGVNeUxpa2VzKG1vdmllLCBsaWtlcyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBvc3QnKTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHNldExpa2U7XG4iLCJjb25zdCB1cGRhdGVNeUxpa2VzID0gKG1vdmllLCBsaWtlcykgPT4ge1xuICBjb25zdCBudW1PZkxpa2VEaXYgPSBsaWtlcy5xdWVyeVNlbGVjdG9yKCcubGlrZS1udW0nKTtcbiAgbGV0IHNpbmdsZUxpa2VzID0gcGFyc2VJbnQobnVtT2ZMaWtlRGl2LnRleHRDb250ZW50LCAxMCk7XG4gIHNpbmdsZUxpa2VzICs9IDE7XG4gIG51bU9mTGlrZURpdi50ZXh0Q29udGVudCA9IGAke3NpbmdsZUxpa2VzfSBMaWtlc2A7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVNeUxpa2VzO1xuIiwiaW1wb3J0IEZldGNoUmVzZXJ2YXRpb25zIGZyb20gJy4vZmV0Y2hSZXNlcnZhdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwbGF5QWZ0ZXJQb3N0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZXNlcnZhdGlvbkNvdW50ID0gMDtcbiAgfVxuXG4gIHVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKSB7XG4gICAgLy8gVXBkYXRlcyBjb3VudGVyXG4gICAgdGhpcy5yZXNlcnZhdGlvbkNvdW50ID0gZmV0Y2hlZFJlc2VydmF0aW9uQXJyLmxlbmd0aDtcbiAgICBjb25zdCByZXNlcnZhdGlvbnNIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc2VydmF0aW9uc0hlYWRpbmcnKTtcbiAgICByZXNlcnZhdGlvbnNIZWFkaW5nLmZvckVhY2goKGVhY2gpID0+IHtcbiAgICAgIGVhY2gudGV4dENvbnRlbnQgPSBgUmVzZXJ2YXRpb25zICgke3RoaXMucmVzZXJ2YXRpb25Db3VudH0pOmA7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBkaXNwbGF5UmVzZXJ2YXRpb25zKGluZGV4KSB7XG4gICAgY29uc3QgZmV0Y2hSZXNlcnZhdGlvbnMgPSBuZXcgRmV0Y2hSZXNlcnZhdGlvbnMoKTtcbiAgICBmZXRjaFJlc2VydmF0aW9ucy5tb3ZpZUlEID0gaW5kZXg7XG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uID0gYXdhaXQgZmV0Y2hSZXNlcnZhdGlvbnMuZmV0Y2hSZXNlcnZhdGlvbnNEYXRhKCk7XG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uQXJyID0gQXJyYXkuZnJvbShmZXRjaGVkUmVzZXJ2YXRpb24pO1xuICAgIGNvbnN0IGV4aXN0aW5nUmVzZXJ2YXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmV4aXN0aW5nUmVzZXJ2YXRpb25zJyk7XG5cbiAgICAvLyBDbGVhciBleGlzdGluZyByZXNlcnZhdGlvbnNcbiAgICBleGlzdGluZ1Jlc2VydmF0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICBlYWNoLmlubmVySFRNTCA9ICcnO1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlQ291bnRlcihmZXRjaGVkUmVzZXJ2YXRpb25BcnIpO1xuXG4gICAgZmV0Y2hlZFJlc2VydmF0aW9uQXJyLmZvckVhY2goKGVhY2gpID0+IHtcbiAgICAgIGNvbnN0IHJlc2VydmF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgcmVzZXJ2YXRpb24udGV4dENvbnRlbnQgPSBgJHtlYWNoLmRhdGVfc3RhcnR9IC0gJHtlYWNoLmRhdGVfZW5kfSBieSAke2VhY2gudXNlcm5hbWV9YDtcbiAgICAgIGV4aXN0aW5nUmVzZXJ2YXRpb25zLmZvckVhY2goKGVhY2gpID0+IHtcbiAgICAgICAgZWFjaC5hcHBlbmRDaGlsZChyZXNlcnZhdGlvbik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZldGNoUmVzZXJ2YXRpb25zIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tb3ZpZUlEID0gMDtcbiAgfVxuXG4gIGFzeW5jIGZldGNoUmVzZXJ2YXRpb25zRGF0YSgpIHtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvcmVzZXJ2YXRpb25zP2l0ZW1faWQ9aXRlbSR7dGhpcy5tb3ZpZUlEfWA7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXlBZnRlclBvc3QgZnJvbSAnLi4vcmVzZXJ2YXRpb25Nb2RhbC9kaXNwbGF5UmVzZXJ2YXRpb24uanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3N0UmVzZXZhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXJ2YXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc2VydmF0aW9uRm9ybScpO1xuICAgIHRoaXMudXNlcm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlcm5hbWUnKTtcbiAgICB0aGlzLnN0YXJ0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydERhdGUnKTtcbiAgICB0aGlzLmVuZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5kRGF0ZScpO1xuICAgIHRoaXMubW92aWVJZCA9IDA7XG4gICAgdGhpcy5zZXR1cExpc3RlbmVyKCk7XG4gIH1cblxuICBhc3luYyBwb3N0UmVzZXJ2YXRpb24oZGF0YSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvcmVzZXJ2YXRpb25zJyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAvLyBnaXZlcyBlcnJvcjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcG9zdCcpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBkaXNwbGF5ZWQgcmVzZXJ2YXRpb25zXG4gICAgY29uc3QgbG9hZFJlc2VydmF0aW9ucyA9IG5ldyBEaXNwbGF5QWZ0ZXJQb3N0KCk7XG4gICAgbG9hZFJlc2VydmF0aW9ucy5kaXNwbGF5UmVzZXJ2YXRpb25zKHRoaXMubW92aWVJZCk7XG4gIH1cblxuICBzZXR1cExpc3RlbmVyKCkge1xuICAgIHRoaXMucmVzZXJ2YXRpb25Gb3JtLmZvckVhY2goKGVhY2gpID0+IGVhY2guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGl0ZW1faWQ6IGBpdGVtJHt0aGlzLm1vdmllSWR9YCxcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlcm5hbWUudmFsdWUsXG4gICAgICAgIGRhdGVfc3RhcnQ6IHRoaXMuc3RhcnREYXRlLnZhbHVlLFxuICAgICAgICBkYXRlX2VuZDogdGhpcy5lbmREYXRlLnZhbHVlLFxuICAgICAgfTtcbiAgICAgIGNvbnNvbGUubG9nKFwiZmlyc3RcIik7XG4gICAgICB0aGlzLnBvc3RSZXNlcnZhdGlvbihkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgY29uc29sZS5sb2coXCJzZWNvbmRcIik7XG4gICAgICB0aGlzLnVzZXJuYW1lLnZhbHVlID0gJyc7XG4gICAgICB0aGlzLnN0YXJ0RGF0ZS52YWx1ZSA9ICcnO1xuICAgICAgdGhpcy5lbmREYXRlLnZhbHVlID0gJyc7XG4gICAgfSkpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVsbE1vdmllc0RhdGEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVybCA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzLzEvZXBpc29kZXMnO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hNb3ZpZXNEYXRhKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMudXJsKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFB1bGxNb3ZpZXNEYXRhIGZyb20gJy4vcHVsbE1vdmllcy5qcyc7XG5pbXBvcnQgUG9zdFJlc2VydmF0aW9uIGZyb20gJy4vcG9zdFJlc2VydmF0aW9uLmpzJztcbmltcG9ydCBGZXRjaFJlc2VydmF0aW9ucyBmcm9tICcuL2ZldGNoUmVzZXJ2YXRpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzZXJ2YXRpb25zIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIHRoaXMudmlld1Jlc2VydmF0aW9uc0J0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2aWV3UmVzZXJ2YXRpb25zJyk7XG4gICAgdGhpcy5mZXRjaFJlc2VydmF0aW9ucyA9IG5ldyBGZXRjaFJlc2VydmF0aW9ucygpO1xuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IDA7XG4gICAgdGhpcy5zaG93UmVzZXJ2YXRpb25zKCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChpbmRleCkge1xuICAgIGNvbnN0IGdldE1vdmllc0RldGFpbHMgPSBuZXcgUHVsbE1vdmllc0RhdGEoKTtcbiAgICBjb25zdCBtb3ZpZXNEZXRhaWxzID0gYXdhaXQgZ2V0TW92aWVzRGV0YWlscy5mZXRjaE1vdmllc0RhdGEoKTtcbiAgICBjb25zdCBtb3ZpZXNEZXRhaWxzQXJyID0gQXJyYXkuZnJvbShtb3ZpZXNEZXRhaWxzKTtcblxuICAgIGNvbnN0IHJlc2VydmF0aW9uc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgcmVzZXJ2YXRpb25zU2VjdGlvbi5jbGFzc05hbWUgPSAncmVzZXJ2YXRpb25zU2VjdGlvbic7XG4gICAgcmVzZXJ2YXRpb25zU2VjdGlvbi5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInJlc2VydmF0aW9uc0NvbnRhaW5lclwiPlxuICAgICAgPHAgY2xhc3M9XCJjbG9zZS1pY29uXCI+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+Y2xvc2U8L3NwYW4+PC9wPlxuICAgICAgPGRpdiBjbGFzcz1cIm1vdmllRGVzY3JpcHRpb25cIj5cbiAgICAgICAgPGltZyBjbGFzcz1cIm1vdmllSW1hZ2VcIiBzcmM9XCIke21vdmllc0RldGFpbHNBcnJbaW5kZXhdLmltYWdlLm1lZGl1bX1cIiB3aWR0aD1cIjYwMFwiIGFsdD1cInNpbXBsZVwiPlxuICAgICAgICA8aDIgY2xhc3M9XCJtb3ZpZVRpdGxlIGhlYWRpbmdzXCI+JHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5uYW1lfTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb3ZpZURlc2NyaXB0aW9uXCI+ICR7bW92aWVzRGV0YWlsc0FycltpbmRleF0uc3VtbWFyeX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwicmVzZXJ2YXRpb25zSGVhZGluZyBoZWFkaW5nc1wiPlJlc2VydmF0aW9ucygke3RoaXMucmVzZXJ2YXRpb25Db3VudH0pOjwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJleGlzdGluZ1Jlc2VydmF0aW9uc1wiPiA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwiYWRkUmVzZXJ2YXRpb25zSGVhZGluZyBoZWFkaW5nc1wiPlJlc2VydmUgYSBTcG90OjwvaDI+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwicmVzZXJ2YXRpb25Gb3JtXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIGlkPVwidXNlcm5hbWVcIiBuYW1lPVwidXNlcm5hbWVcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtRmllbGRzXCIgdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIlN0YXJ0IERhdGVcIiBpZD1cInN0YXJ0RGF0ZVwiIG5hbWU9XCJzdGFydERhdGVcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtRmllbGRzXCIgdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIkVuZCBEYXRlXCIgaWQ9XCJlbmREYXRlXCIgbmFtZT1cImVuZERhdGVcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzdWJtaXRCdG5cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJSZXNlcnZlXCI+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHJlc2VydmF0aW9uc1NlY3Rpb24pO1xuXG4gICAgY29uc3QgcmVzZXJ2YXRpb25DbG9zZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UtaWNvbicpO1xuICAgIHRoaXMuY2xvc2VSZXNlcnZhdGlvbk1vZGFsKHJlc2VydmF0aW9uQ2xvc2VCdG5zKTtcblxuICAgIGNvbnN0IHBvc3RSZXNlcnZhdGlvbkRhdGEgPSBuZXcgUG9zdFJlc2VydmF0aW9uKCk7XG4gICAgcG9zdFJlc2VydmF0aW9uRGF0YS5tb3ZpZUlkID0gaW5kZXg7XG4gIH1cblxuICBjbG9zZVJlc2VydmF0aW9uTW9kYWwocmVzZXJ2YXRpb25DbG9zZUJ0bnMpIHtcbiAgICB0aGlzLnJlc2VydmF0aW9uc1NlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc2VydmF0aW9uc1NlY3Rpb24nKTtcbiAgICByZXNlcnZhdGlvbkNsb3NlQnRucy5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICBlYWNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc2VydmF0aW9uc1NlY3Rpb25zLmZvckVhY2goKGVhY2gpID0+IHtcbiAgICAgICAgICBlYWNoLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVDb3VudGVyKGZldGNoZWRSZXNlcnZhdGlvbkFycikge1xuICAgIC8vIFVwZGF0ZXMgY291bnRlclxuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IGZldGNoZWRSZXNlcnZhdGlvbkFyci5sZW5ndGg7XG4gICAgY29uc3QgcmVzZXJ2YXRpb25zSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbnNIZWFkaW5nJyk7XG4gICAgcmVzZXJ2YXRpb25zSGVhZGluZy5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICBlYWNoLnRleHRDb250ZW50ID0gYFJlc2VydmF0aW9ucyAoJHt0aGlzLnJlc2VydmF0aW9uQ291bnR9KTpgO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZGlzcGxheVJlc2VydmF0aW9ucyhpbmRleCkge1xuICAgIGNvbnN0IGZldGNoUmVzZXJ2YXRpb25zID0gbmV3IEZldGNoUmVzZXJ2YXRpb25zKCk7XG4gICAgZmV0Y2hSZXNlcnZhdGlvbnMubW92aWVJRCA9IGluZGV4O1xuICAgIGNvbnN0IGZldGNoZWRSZXNlcnZhdGlvbiA9IGF3YWl0IGZldGNoUmVzZXJ2YXRpb25zLmZldGNoUmVzZXJ2YXRpb25zRGF0YSgpO1xuICAgIGNvbnN0IGZldGNoZWRSZXNlcnZhdGlvbkFyciA9IEFycmF5LmZyb20oZmV0Y2hlZFJlc2VydmF0aW9uKTtcbiAgICBjb25zdCBleGlzdGluZ1Jlc2VydmF0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leGlzdGluZ1Jlc2VydmF0aW9ucycpO1xuXG4gICAgLy8gQ2xlYXIgZXhpc3RpbmcgcmVzZXJ2YXRpb25zXG4gICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4ge1xuICAgICAgZWFjaC5pbm5lckhUTUwgPSAnJztcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKTtcblxuICAgIGZldGNoZWRSZXNlcnZhdGlvbkFyci5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICBjb25zdCByZXNlcnZhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHJlc2VydmF0aW9uLnRleHRDb250ZW50ID0gYCR7ZWFjaC5kYXRlX3N0YXJ0fSAtICR7ZWFjaC5kYXRlX2VuZH0gYnkgJHtlYWNoLnVzZXJuYW1lfWA7XG4gICAgICBleGlzdGluZ1Jlc2VydmF0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICAgIGVhY2guYXBwZW5kQ2hpbGQocmVzZXJ2YXRpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93UmVzZXJ2YXRpb25zKCkge1xuICAgIGNvbnN0IGJ0bnNBcnJheSA9IEFycmF5LmZyb20odGhpcy52aWV3UmVzZXJ2YXRpb25zQnRucyk7XG4gICAgYnRuc0FycmF5LmZvckVhY2goKGVhY2gsIGVhY2hpbmRleCkgPT4ge1xuICAgICAgZWFjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChlYWNoaW5kZXgpO1xuICAgICAgICB0aGlzLmRpc3BsYXlSZXNlcnZhdGlvbnMoZWFjaGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=