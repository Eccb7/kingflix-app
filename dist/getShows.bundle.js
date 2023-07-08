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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/home/getShows.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0RGU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDZDO0FBQ007QUFDSTs7QUFFeEM7QUFDZjtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsNkRBQWlCO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxzREFBYztBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxxQ0FBcUM7QUFDNUUsMENBQTBDLDZCQUE2QjtBQUN2RSx5Q0FBeUMsZ0NBQWdDO0FBQ3pFOztBQUVBO0FBQ0EsZ0VBQWdFLHNCQUFzQjtBQUN0RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQ0FBb0MsMkRBQWU7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFLHNCQUFzQjtBQUNwRzs7QUFFQTtBQUNBLGtDQUFrQyw2REFBaUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsaUJBQWlCLElBQUksZUFBZSxLQUFLLGNBQWM7QUFDMUY7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2NvbW1lbnRzTW9kYWwvY29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2NvbW1lbnRzTW9kYWwvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2hvbWUvZ2V0U2hvd3MuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2xpa2VzL2dldExpa2VzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9saWtlcy9saWtlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbGlrZXMvdXBkYXRlTGlrZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvZGlzcGxheVJlc2VydmF0aW9uLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL2ZldGNoUmVzZXJ2YXRpb25zLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL3Bvc3RSZXNlcnZhdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcmVzZXJ2YXRpb25Nb2RhbC9wdWxsTW92aWVzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL3Jlc2VydmF0aW9ucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnZXRDb21tZW50cyA9IGFzeW5jIChpdGVtSWQpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL2NvbW1lbnRzP2l0ZW1faWQ9JHtpdGVtSWR9YCxcbiAgICApO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggY29tbWVudHM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBjb21tZW50cztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmZXRjaCBjb21tZW50cycpO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGVDb21tZW50ID0gYXN5bmMgKGl0ZW1JZCwgdXNlcm5hbWUsIGNvbW1lbnQpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL2NvbW1lbnRzJyxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpdGVtX2lkOiBpdGVtSWQsXG4gICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgY29tbWVudCxcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAxKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnQ29tbWVudCBjcmVhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjcmVhdGUgY29tbWVudDogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNyZWF0ZSBjb21tZW50Jyk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdldENvbW1lbnRzLCBjcmVhdGVDb21tZW50IH07XG4iLCJpbXBvcnQgeyBnZXRDb21tZW50cywgY3JlYXRlQ29tbWVudCB9IGZyb20gJy4vY29tbWVudHMuanMnO1xuXG5jb25zdCBjcmVhdGVNb2RhbCA9IChtb3ZpZSkgPT4ge1xuICAvLyBDcmVhdGUgdGhlIG1vZGFsIGVsZW1lbnRzXG4gIGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2RhbE92ZXJsYXkuY2xhc3NOYW1lID0gJ21vZGFsLW92ZXJsYXknO1xuICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2RhbENvbnRhaW5lci5jbGFzc05hbWUgPSAnbW9kYWwtY29udGFpbmVyJztcbiAgY29uc3QgbW9kYWxDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsQ29udGVudC5jbGFzc05hbWUgPSAnbW9kYWwtY29udGVudCc7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY2xvc2UtYnV0dG9uJztcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyZ0aW1lczsnO1xuICBjb25zdCBtb2RhbEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vZGFsSW1hZ2UuaWQgPSAnbW9kYWwtaW1hZ2UnO1xuICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgbW9kYWxUaXRsZS5pZCA9ICdtb2RhbC10aXRsZSc7XG4gIGNvbnN0IG1vZGFsRGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2RhbERldGFpbHMuaWQgPSAnbW9kYWwtZGV0YWlscyc7XG4gIGNvbnN0IGNvbW1lbnRzU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb21tZW50c1NlY3Rpb24uaWQgPSAnY29tbWVudHMtc2VjdGlvbic7XG4gIGNvbnN0IGNvbW1lbnRzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgY29tbWVudHNIZWFkZXIuaW5uZXJUZXh0ID0gJ0NvbW1lbnRzJztcbiAgY29uc3QgY29tbWVudHNDb3VudGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBjb21tZW50c0NvdW50ZXIuaWQgPSAnY29tbWVudHMtY291bnRlcic7XG4gIGNvbnN0IGNvbW1lbnRzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGNvbW1lbnRzTGlzdC5pZCA9ICdjb21tZW50cy1saXN0JztcbiAgY29uc3QgY29tbWVudEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gIGNvbW1lbnRGb3JtLmlkID0gJ2NvbW1lbnQtZm9ybSc7XG4gIGNvbnN0IG5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIG5hbWVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICduYW1lLWlucHV0Jyk7XG4gIG5hbWVMYWJlbC5pbm5lclRleHQgPSAnTmFtZTonO1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBuYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgbmFtZUlucHV0LmlkID0gJ25hbWUtaW5wdXQnO1xuICBuYW1lSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICBjb25zdCBjb21tZW50TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBjb21tZW50TGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAnY29tbWVudC1pbnB1dCcpO1xuICBjb21tZW50TGFiZWwuaW5uZXJUZXh0ID0gJ0NvbW1lbnQ6JztcbiAgY29uc3QgY29tbWVudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgY29tbWVudElucHV0LmlkID0gJ2NvbW1lbnQtaW5wdXQnO1xuICBjb21tZW50SW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgc3VibWl0QnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgc3VibWl0QnV0dG9uLmlubmVyVGV4dCA9ICdDb21tZW50JztcblxuICAvLyBBcHBlbmQgZWxlbWVudHMgdG8gY3JlYXRlIHRoZSBtb2RhbCBzdHJ1Y3R1cmVcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG1vZGFsSW1hZ2UpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxUaXRsZSk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbERldGFpbHMpO1xuICBjb21tZW50c1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29tbWVudHNIZWFkZXIpO1xuICBjb21tZW50c1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29tbWVudHNDb3VudGVyKTtcbiAgY29tbWVudHNTZWN0aW9uLmFwcGVuZENoaWxkKGNvbW1lbnRzTGlzdCk7XG4gIGNvbW1lbnRGb3JtLmFwcGVuZENoaWxkKG5hbWVMYWJlbCk7XG4gIGNvbW1lbnRGb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gIGNvbW1lbnRGb3JtLmFwcGVuZENoaWxkKGNvbW1lbnRMYWJlbCk7XG4gIGNvbW1lbnRGb3JtLmFwcGVuZENoaWxkKGNvbW1lbnRJbnB1dCk7XG4gIGNvbW1lbnRGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gIGNvbW1lbnRzU2VjdGlvbi5hcHBlbmRDaGlsZChjb21tZW50Rm9ybSk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChjb21tZW50c1NlY3Rpb24pO1xuICBtb2RhbENvbnRhaW5lci5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuICBtb2RhbE92ZXJsYXkuYXBwZW5kQ2hpbGQobW9kYWxDb250YWluZXIpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsT3ZlcmxheSk7XG5cbiAgLy8gU2V0IHRoZSBtb2RhbCBjb250ZW50XG4gIG1vZGFsSW1hZ2UuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHttb3ZpZS5pbWFnZS5tZWRpdW19XCIgYWx0PVwiJHttb3ZpZS5uYW1lfVwiPmA7XG4gIG1vZGFsVGl0bGUuaW5uZXJUZXh0ID0gbW92aWUubmFtZTtcbiAgbW9kYWxEZXRhaWxzLnRleHRDb250ZW50ID0gbW92aWUuc3VtbWFyeTtcblxuICAvLyBGdW5jdGlvbiB0byB1cGRhdGUgY29tbWVudHMgaW4gdGhlIG1vZGFsXG4gIGNvbnN0IHVwZGF0ZUNvbW1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IGdldENvbW1lbnRzKG1vdmllLmlkKTtcbiAgICAgIGNvbnN0IGNvbW1lbnRzQ291bnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy1jb3VudGVyJyk7XG4gICAgICBjb21tZW50c0NvdW50ZXIudGV4dENvbnRlbnQgPSBgQ29tbWVudHMgKCR7Y29tbWVudHMubGVuZ3RofSlgO1xuICAgICAgY29tbWVudHNMaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGlzdEl0ZW0uaW5uZXJUZXh0ID0gYCR7Y29tbWVudC51c2VybmFtZX06ICR7Y29tbWVudC5jb21tZW50fWA7XG4gICAgICAgIGNvbW1lbnRzTGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ0Vycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcblxuICAvLyBDbG9zZSBtb2RhbCB3aGVuIGNsaWNraW5nIHRoZSBjbG9zZSBidXR0b24gb3Igb3V0c2lkZSB0aGUgbW9kYWxcbiAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbW9kYWxPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH0pO1xuICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBtb2RhbE92ZXJsYXkpIHtcbiAgICAgIG1vZGFsT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gUHJldmVudCBjbG9zaW5nIHRoZSBtb2RhbCB3aGVuIGNsaWNraW5nIGluc2lkZSB0aGUgbW9kYWwgY29udGVudFxuICBtb2RhbENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gUHJldmVudCBmb3JtIHN1Ym1pc3Npb24gYW5kIGhhbmRsZSBjb21tZW50IHN1Ym1pc3Npb25cbiAgY29tbWVudEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB1c2VybmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICBjb25zdCBjb21tZW50ID0gY29tbWVudElucHV0LnZhbHVlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNyZWF0ZUNvbW1lbnQobW92aWUuaWQsIHVzZXJuYW1lLCBjb21tZW50KTtcbiAgICAgIG5hbWVJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgY29tbWVudElucHV0LnZhbHVlID0gJyc7XG4gICAgICBhd2FpdCB1cGRhdGVDb21tZW50cygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnRXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBEaXNwbGF5IHRoZSBtb2RhbFxuICBtb2RhbE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgLy8gSW5pdGlhbGl6ZSBjb21tZW50c1xuICB1cGRhdGVDb21tZW50cygpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTW9kYWw7XG4iLCJpbXBvcnQgUmVzZXJ2YXRpb25zIGZyb20gJy4uL3Jlc2VydmF0aW9uTW9kYWwvcmVzZXJ2YXRpb25zLmpzJztcbmltcG9ydCBnZXRMaWtlcyBmcm9tICcuLi9saWtlcy9nZXRMaWtlcy5qcyc7XG5pbXBvcnQgc2V0TGlrZSBmcm9tICcuLi9saWtlcy9saWtlcy5qcyc7XG5pbXBvcnQgY3JlYXRlTW9kYWwgZnJvbSAnLi4vY29tbWVudHNNb2RhbC9tb2RhbC5qcyc7XG5cbmNvbnN0IGdldFNob3dzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBob21lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVwYWdlJyk7XG4gIGNvbnN0IHJlc2VydmF0aW9uc01vZGFsID0gbmV3IFJlc2VydmF0aW9ucygpO1xuICBjb25zdCBsaWtlc0RhdGEgPSBhd2FpdCBnZXRMaWtlcygpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cy8xL2VwaXNvZGVzJyk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggc2NvcmVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG4gICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIGpzb24uZm9yRWFjaCgobW92aWUpID0+IHtcbiAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJvZHkuY2xhc3NOYW1lID0gJ21vdmllcyc7XG4gICAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGltYWdlcy5jbGFzc05hbWUgPSAndGVzdC1pbWcnO1xuICAgICAgaW1hZ2VzLmlubmVySFRNTCA9IGA8aW1nIHNyYz0ke21vdmllLmltYWdlLm1lZGl1bX0gYWx0PVwiXCIgY2xhc3M9XCJteS1pbWdcIj5gO1xuXG4gICAgICBjb25zdCBsb3ZlSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIGxvdmVJbWFnZS5zcmMgPSAnLi9tZWRpYS1saWJyYXJ5L2xvdmUucG5nJztcbiAgICAgIGxvdmVJbWFnZS5jbGFzc05hbWUgPSAnbG92ZSc7XG5cbiAgICAgIGNvbnN0IGxpa2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBsaWtlcy5jbGFzc05hbWUgPSAnc3BhY2UnO1xuICAgICAgbGlrZXMuaW5uZXJIVE1MID0gYDxwPiR7bW92aWUubmFtZX08L3A+IDxwIGNsYXNzPVwibGlrZS1udW1cIj48L3A+YDtcbiAgICAgIGxpa2VzLmFwcGVuZENoaWxkKGxvdmVJbWFnZSk7XG5cbiAgICAgIGNvbnN0IGJ1dHRvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIGJ1dHRvbjEuY2xhc3NOYW1lID0gJ2J0bic7XG4gICAgICBidXR0b24xLmlubmVyVGV4dCA9ICdDb21tZW50cyc7XG4gICAgICBjb25zdCBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBidXR0b24yLmNsYXNzTmFtZSA9ICdidG4gdmlld1Jlc2VydmF0aW9ucyc7XG4gICAgICBidXR0b24yLmlubmVyVGV4dCA9ICdSZXNlcnZhdGlvbnMnO1xuXG4gICAgICBib2R5LmFwcGVuZENoaWxkKGltYWdlcyk7XG4gICAgICBib2R5LmFwcGVuZENoaWxkKGxpa2VzKTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uMSk7XG4gICAgICBib2R5LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xuICAgICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChib2R5KTtcblxuICAgICAgbG92ZUltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHNldExpa2UobW92aWUsIGxpa2VzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBsaWtlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBudW1iZXJPZkxpa2VzID0gbGlrZXMucXVlcnlTZWxlY3RvcignLmxpa2UtbnVtJyk7XG4gICAgICBsZXQgc2luZ2xlTGlrZSA9IDA7XG4gICAgICBjb25zdCBsaWtlID0gbGlrZXNEYXRhLmZpbmQoKGxpa2UpID0+IGxpa2UuaXRlbV9pZCA9PT0gbW92aWUuaWQpO1xuXG4gICAgICBpZiAobGlrZSkge1xuICAgICAgICBzaW5nbGVMaWtlID0gbGlrZS5saWtlcztcbiAgICAgICAgbnVtYmVyT2ZMaWtlcy50ZXh0Q29udGVudCA9IGAke3NpbmdsZUxpa2V9IExpa2VzYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG51bWJlck9mTGlrZXMudGV4dENvbnRlbnQgPSBgJHtzaW5nbGVMaWtlfSBMaWtlc2A7XG4gICAgICB9XG5cbiAgICAgIGJ1dHRvbjEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZU1vZGFsKG1vdmllKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZldGNoJyk7XG4gIH1cbiAgcmVzZXJ2YXRpb25zTW9kYWwuc2hvd1Jlc2VydmF0aW9ucygpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0U2hvd3M7XG4iLCJjb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL2xpa2VzJyxcbiAgICApO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggc2NvcmVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBqc29uO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBvc3QnKTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGdldExpa2VzO1xuIiwiaW1wb3J0IHVwZGF0ZU15TGlrZXMgZnJvbSAnLi91cGRhdGVMaWtlcy5qcyc7XG5cbmNvbnN0IHNldExpa2UgPSBhc3luYyAobW92aWUsIGxpa2VzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9saWtlcycsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaXRlbV9pZDogbW92aWUuaWQsXG4gICAgICAgIH0pLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgdXBkYXRlTXlMaWtlcyhtb3ZpZSwgbGlrZXMpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwb3N0Jyk7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBzZXRMaWtlO1xuIiwiY29uc3QgdXBkYXRlTXlMaWtlcyA9IChtb3ZpZSwgbGlrZXMpID0+IHtcbiAgY29uc3QgbnVtT2ZMaWtlRGl2ID0gbGlrZXMucXVlcnlTZWxlY3RvcignLmxpa2UtbnVtJyk7XG4gIGxldCBzaW5nbGVMaWtlcyA9IHBhcnNlSW50KG51bU9mTGlrZURpdi50ZXh0Q29udGVudCwgMTApO1xuICBzaW5nbGVMaWtlcyArPSAxO1xuICBudW1PZkxpa2VEaXYudGV4dENvbnRlbnQgPSBgJHtzaW5nbGVMaWtlc30gTGlrZXNgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlTXlMaWtlcztcbiIsImltcG9ydCBGZXRjaFJlc2VydmF0aW9ucyBmcm9tICcuLi9yZXNlcnZhdGlvbk1vZGFsL2ZldGNoUmVzZXJ2YXRpb25zLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BsYXlBZnRlclBvc3Qge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yZXNlcnZhdGlvbkNvdW50ID0gMDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKSB7XHJcbiAgICAvLyBVcGRhdGVzIGNvdW50ZXJcclxuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IGZldGNoZWRSZXNlcnZhdGlvbkFyci5sZW5ndGg7XHJcbiAgICBjb25zdCByZXNlcnZhdGlvbnNIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc2VydmF0aW9uc0hlYWRpbmcnKTtcclxuICAgIHJlc2VydmF0aW9uc0hlYWRpbmcuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC50ZXh0Q29udGVudCA9IGBSZXNlcnZhdGlvbnMgKCR7dGhpcy5yZXNlcnZhdGlvbkNvdW50fSk6YCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBkaXNwbGF5UmVzZXJ2YXRpb25zKGluZGV4KSB7XHJcbiAgICBjb25zdCBmZXRjaFJlc2VydmF0aW9ucyA9IG5ldyBGZXRjaFJlc2VydmF0aW9ucygpO1xyXG4gICAgZmV0Y2hSZXNlcnZhdGlvbnMubW92aWVJRCA9IGluZGV4O1xyXG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uID0gYXdhaXQgZmV0Y2hSZXNlcnZhdGlvbnMuZmV0Y2hSZXNlcnZhdGlvbnNEYXRhKCk7XHJcbiAgICBjb25zdCBmZXRjaGVkUmVzZXJ2YXRpb25BcnIgPSBBcnJheS5mcm9tKGZldGNoZWRSZXNlcnZhdGlvbik7XHJcbiAgICBjb25zdCBleGlzdGluZ1Jlc2VydmF0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leGlzdGluZ1Jlc2VydmF0aW9ucycpO1xyXG5cclxuICAgIC8vIENsZWFyIGV4aXN0aW5nIHJlc2VydmF0aW9uc1xyXG4gICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC5pbm5lckhUTUwgPSAnJyk7XHJcbiAgICB0aGlzLnVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKTtcclxuXHJcbiAgICBmZXRjaGVkUmVzZXJ2YXRpb25BcnIuZm9yRWFjaCgoZWFjaCkgPT4ge1xyXG4gICAgICBjb25zdCByZXNlcnZhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgcmVzZXJ2YXRpb24udGV4dENvbnRlbnQgPSBgJHtlYWNoLmRhdGVfc3RhcnR9IC0gJHtlYWNoLmRhdGVfZW5kfSBieSAke2VhY2gudXNlcm5hbWV9YDtcclxuICAgICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4ge1xyXG4gICAgICAgIGVhY2guYXBwZW5kQ2hpbGQocmVzZXJ2YXRpb24pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZldGNoUmVzZXJ2YXRpb25zIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tb3ZpZUlEID0gMDtcbiAgfVxuXG4gIGFzeW5jIGZldGNoUmVzZXJ2YXRpb25zRGF0YSgpIHtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvcmVzZXJ2YXRpb25zP2l0ZW1faWQ9aXRlbSR7dGhpcy5tb3ZpZUlEfWA7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXlBZnRlclBvc3QgZnJvbSAnLi4vcmVzZXJ2YXRpb25Nb2RhbC9kaXNwbGF5UmVzZXJ2YXRpb24uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RSZXNldmF0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZXNlcnZhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXJ2YXRpb25Gb3JtJyk7XG4gICAgdGhpcy51c2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VybmFtZScpO1xuICAgIHRoaXMuc3RhcnREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0RGF0ZScpO1xuICAgIHRoaXMuZW5kRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmREYXRlJyk7XG4gICAgdGhpcy5tb3ZpZUlkID0gMDtcblxuICB9XG5cbiAgYXN5bmMgcG9zdFJlc2VydmF0aW9uKGRhdGEpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL3Jlc2VydmF0aW9ucycsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29rJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBvc3QnKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgZGlzcGxheWVkIHJlc2VydmF0aW9uc1xuICAgIGNvbnN0IGxvYWRSZXNlcnZhdGlvbnMgPSBuZXcgRGlzcGxheUFmdGVyUG9zdDtcbiAgICBsb2FkUmVzZXJ2YXRpb25zLmRpc3BsYXlSZXNlcnZhdGlvbnModGhpcy5tb3ZpZUlkKTtcbiAgfVxuXG4gIHNldHVwTGlzdGVuZXIoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5tb3ZpZUlkKTtcbiAgICB0aGlzLnJlc2VydmF0aW9uRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5tb3ZpZUlkKTtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGl0ZW1faWQ6IGBpdGVtJHt0aGlzLm1vdmllSWR9YCxcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlcm5hbWUudmFsdWUsXG4gICAgICAgIGRhdGVfc3RhcnQ6IHRoaXMuc3RhcnREYXRlLnZhbHVlLFxuICAgICAgICBkYXRlX2VuZDogdGhpcy5lbmREYXRlLnZhbHVlLFxuICAgICAgfTtcbiAgICAgIHRoaXMucG9zdFJlc2VydmF0aW9uKGRhdGEpO1xuICAgICAgdGhpcy51c2VybmFtZS52YWx1ZSA9ICcnO1xuICAgICAgdGhpcy5zdGFydERhdGUudmFsdWUgPSAnJztcbiAgICAgIHRoaXMuZW5kRGF0ZS52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVsbE1vdmllc0RhdGEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVybCA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzLzEvZXBpc29kZXMnO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hNb3ZpZXNEYXRhKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMudXJsKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFB1bGxNb3ZpZXNEYXRhIGZyb20gJy4vcHVsbE1vdmllcy5qcyc7XG5pbXBvcnQgUG9zdFJlc2VydmF0aW9uIGZyb20gJy4vcG9zdFJlc2VydmF0aW9uLmpzJztcbmltcG9ydCBGZXRjaFJlc2VydmF0aW9ucyBmcm9tICcuL2ZldGNoUmVzZXJ2YXRpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzZXJ2YXRpb25zIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIHRoaXMudmlld1Jlc2VydmF0aW9uc0J0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2aWV3UmVzZXJ2YXRpb25zJyk7XG4gICAgdGhpcy5mZXRjaFJlc2VydmF0aW9ucyA9IG5ldyBGZXRjaFJlc2VydmF0aW9ucygpO1xuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IDA7XG4gICAgdGhpcy5zaG93UmVzZXJ2YXRpb25zKCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChpbmRleCkge1xuICAgIGNvbnN0IGdldE1vdmllc0RldGFpbHMgPSBuZXcgUHVsbE1vdmllc0RhdGEoKTtcbiAgICBjb25zdCBtb3ZpZXNEZXRhaWxzID0gYXdhaXQgZ2V0TW92aWVzRGV0YWlscy5mZXRjaE1vdmllc0RhdGEoKTtcbiAgICBjb25zdCBtb3ZpZXNEZXRhaWxzQXJyID0gQXJyYXkuZnJvbShtb3ZpZXNEZXRhaWxzKTtcblxuICAgIGNvbnN0IHJlc2VydmF0aW9uc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgcmVzZXJ2YXRpb25zU2VjdGlvbi5jbGFzc05hbWUgPSAncmVzZXJ2YXRpb25zU2VjdGlvbic7XG4gICAgcmVzZXJ2YXRpb25zU2VjdGlvbi5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInJlc2VydmF0aW9uc0NvbnRhaW5lclwiPlxuICAgICAgPHAgY2xhc3M9XCJjbG9zZS1pY29uXCI+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+Y2xvc2U8L3NwYW4+PC9wPlxuICAgICAgPGRpdiBjbGFzcz1cIm1vdmllRGVzY3JpcHRpb25cIj5cbiAgICAgICAgPGltZyBjbGFzcz1cIm1vdmllSW1hZ2VcIiBzcmM9XCIke21vdmllc0RldGFpbHNBcnJbaW5kZXhdLmltYWdlLm1lZGl1bX1cIiB3aWR0aD1cIjYwMFwiIGFsdD1cInNpbXBsZVwiPlxuICAgICAgICA8aDIgY2xhc3M9XCJtb3ZpZVRpdGxlIGhlYWRpbmdzXCI+JHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5uYW1lfTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb3ZpZURlc2NyaXB0aW9uXCI+ICR7bW92aWVzRGV0YWlsc0FycltpbmRleF0uc3VtbWFyeX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwicmVzZXJ2YXRpb25zSGVhZGluZyBoZWFkaW5nc1wiPlJlc2VydmF0aW9ucygke3RoaXMucmVzZXJ2YXRpb25Db3VudH0pOjwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJleGlzdGluZ1Jlc2VydmF0aW9uc1wiPiA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwiYWRkUmVzZXJ2YXRpb25zSGVhZGluZyBoZWFkaW5nc1wiPlJlc2VydmUgYSBTcG90OjwvaDI+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwicmVzZXJ2YXRpb25Gb3JtXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIGlkPVwidXNlcm5hbWVcIiBuYW1lPVwidXNlcm5hbWVcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtRmllbGRzXCIgdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIlN0YXJ0IERhdGVcIiBpZD1cInN0YXJ0RGF0ZVwiIG5hbWU9XCJzdGFydERhdGVcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtRmllbGRzXCIgdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIkVuZCBEYXRlXCIgaWQ9XCJlbmREYXRlXCIgbmFtZT1cImVuZERhdGVcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzdWJtaXRCdG5cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJSZXNlcnZlXCI+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHJlc2VydmF0aW9uc1NlY3Rpb24pO1xuXG4gICAgY29uc3QgcmVzZXJ2YXRpb25DbG9zZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UtaWNvbicpO1xuICAgIHRoaXMuY2xvc2VSZXNlcnZhdGlvbk1vZGFsKHJlc2VydmF0aW9uQ2xvc2VCdG5zKTtcblxuICAgIGNvbnN0IHBvc3RSZXNlcnZhdGlvbkRhdGEgPSBuZXcgUG9zdFJlc2VydmF0aW9uKCk7XG4gICAgcG9zdFJlc2VydmF0aW9uRGF0YS5tb3ZpZUlkID0gaW5kZXg7XG4gICAgcG9zdFJlc2VydmF0aW9uRGF0YS5zZXR1cExpc3RlbmVyKCk7XG4gIH1cblxuICBjbG9zZVJlc2VydmF0aW9uTW9kYWwocmVzZXJ2YXRpb25DbG9zZUJ0bnMpIHtcbiAgICBjb25zdCByZXNlcnZhdGlvbnNTZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbnNTZWN0aW9uJyk7XG4gICAgcmVzZXJ2YXRpb25DbG9zZUJ0bnMuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHJlc2VydmF0aW9uc1NlY3Rpb25zLmZvckVhY2goKGVhY2gpID0+IGVhY2guc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XG4gICAgfSkpO1xuICB9XG5cbiAgdXBkYXRlQ291bnRlcihmZXRjaGVkUmVzZXJ2YXRpb25BcnIpIHtcbiAgICAvLyBVcGRhdGVzIGNvdW50ZXJcbiAgICB0aGlzLnJlc2VydmF0aW9uQ291bnQgPSBmZXRjaGVkUmVzZXJ2YXRpb25BcnIubGVuZ3RoO1xuICAgIGNvbnN0IHJlc2VydmF0aW9uc0hlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVzZXJ2YXRpb25zSGVhZGluZycpO1xuICAgIHJlc2VydmF0aW9uc0hlYWRpbmcuZm9yRWFjaCgoZWFjaCkgPT4gZWFjaC50ZXh0Q29udGVudCA9IGBSZXNlcnZhdGlvbnMgKCR7dGhpcy5yZXNlcnZhdGlvbkNvdW50fSk6YCk7XG4gIH1cblxuICBhc3luYyBkaXNwbGF5UmVzZXJ2YXRpb25zKGluZGV4KSB7XG4gICAgY29uc3QgZmV0Y2hSZXNlcnZhdGlvbnMgPSBuZXcgRmV0Y2hSZXNlcnZhdGlvbnMoKTtcbiAgICBmZXRjaFJlc2VydmF0aW9ucy5tb3ZpZUlEID0gaW5kZXg7XG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uID0gYXdhaXQgZmV0Y2hSZXNlcnZhdGlvbnMuZmV0Y2hSZXNlcnZhdGlvbnNEYXRhKCk7XG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uQXJyID0gQXJyYXkuZnJvbShmZXRjaGVkUmVzZXJ2YXRpb24pO1xuICAgIGNvbnN0IGV4aXN0aW5nUmVzZXJ2YXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmV4aXN0aW5nUmVzZXJ2YXRpb25zJyk7XG5cbiAgICAvLyBDbGVhciBleGlzdGluZyByZXNlcnZhdGlvbnNcbiAgICBleGlzdGluZ1Jlc2VydmF0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiBlYWNoLmlubmVySFRNTCA9ICcnKTtcbiAgICB0aGlzLnVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKTtcblxuICAgIGZldGNoZWRSZXNlcnZhdGlvbkFyci5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICBjb25zdCByZXNlcnZhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHJlc2VydmF0aW9uLnRleHRDb250ZW50ID0gYCR7ZWFjaC5kYXRlX3N0YXJ0fSAtICR7ZWFjaC5kYXRlX2VuZH0gYnkgJHtlYWNoLnVzZXJuYW1lfWA7XG4gICAgICBleGlzdGluZ1Jlc2VydmF0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICAgIGVhY2guYXBwZW5kQ2hpbGQocmVzZXJ2YXRpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93UmVzZXJ2YXRpb25zKCkge1xuICAgIGNvbnN0IGJ0bnNBcnJheSA9IEFycmF5LmZyb20odGhpcy52aWV3UmVzZXJ2YXRpb25zQnRucyk7XG4gICAgYnRuc0FycmF5LmZvckVhY2goKGVhY2gsIGVhY2hpbmRleCkgPT4ge1xuICAgICAgZWFjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChlYWNoaW5kZXgpO1xuICAgICAgICB0aGlzLmRpc3BsYXlSZXNlcnZhdGlvbnMoZWFjaGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=