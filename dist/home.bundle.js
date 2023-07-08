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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/home/home.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvY29tbWVudHNNb2RhbC9jb21tZW50cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvY29tbWVudHNNb2RhbC9tb2RhbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaG9tZS9nZXRTaG93cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaG9tZS9ob21lLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9saWtlcy9nZXRMaWtlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbGlrZXMvbGlrZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2xpa2VzL3VwZGF0ZUxpa2VzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL2Rpc3BsYXlSZXNlcnZhdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcmVzZXJ2YXRpb25Nb2RhbC9mZXRjaFJlc2VydmF0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcmVzZXJ2YXRpb25Nb2RhbC9wb3N0UmVzZXJ2YXRpb24uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvcHVsbE1vdmllcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcmVzZXJ2YXRpb25Nb2RhbC9yZXNlcnZhdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0Q29tbWVudHMgPSBhc3luYyAoaXRlbUlkKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9jb21tZW50cz9pdGVtX2lkPSR7aXRlbUlkfWAsXG4gICAgKTtcblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIGNvbW1lbnRzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gY29tbWVudHM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmV0Y2ggY29tbWVudHMnKTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlQ29tbWVudCA9IGFzeW5jIChpdGVtSWQsIHVzZXJuYW1lLCBjb21tZW50KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9jb21tZW50cycsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaXRlbV9pZDogaXRlbUlkLFxuICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgIGNvbW1lbnQsXG4gICAgICAgIH0pLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMSkge1xuICAgIC8vICAgY29uc29sZS5sb2coJ0NvbW1lbnQgY3JlYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIGNvbW1lbnQ6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBjcmVhdGUgY29tbWVudCcpO1xuICB9XG59O1xuXG5leHBvcnQgeyBnZXRDb21tZW50cywgY3JlYXRlQ29tbWVudCB9O1xuIiwiaW1wb3J0IHsgZ2V0Q29tbWVudHMsIGNyZWF0ZUNvbW1lbnQgfSBmcm9tICcuL2NvbW1lbnRzLmpzJztcblxuY29uc3QgY3JlYXRlTW9kYWwgPSAobW92aWUpID0+IHtcbiAgLy8gQ3JlYXRlIHRoZSBtb2RhbCBlbGVtZW50c1xuICBjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWxPdmVybGF5LmNsYXNzTmFtZSA9ICdtb2RhbC1vdmVybGF5JztcbiAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWxDb250YWluZXIuY2xhc3NOYW1lID0gJ21vZGFsLWNvbnRhaW5lcic7XG4gIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2RhbENvbnRlbnQuY2xhc3NOYW1lID0gJ21vZGFsLWNvbnRlbnQnO1xuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlLWJ1dHRvbic7XG4gIGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXM7JztcbiAgY29uc3QgbW9kYWxJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2RhbEltYWdlLmlkID0gJ21vZGFsLWltYWdlJztcbiAgY29uc3QgbW9kYWxUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gIG1vZGFsVGl0bGUuaWQgPSAnbW9kYWwtdGl0bGUnO1xuICBjb25zdCBtb2RhbERldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWxEZXRhaWxzLmlkID0gJ21vZGFsLWRldGFpbHMnO1xuICBjb25zdCBjb21tZW50c1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29tbWVudHNTZWN0aW9uLmlkID0gJ2NvbW1lbnRzLXNlY3Rpb24nO1xuICBjb25zdCBjb21tZW50c0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gIGNvbW1lbnRzSGVhZGVyLmlubmVyVGV4dCA9ICdDb21tZW50cyc7XG4gIGNvbnN0IGNvbW1lbnRzQ291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgY29tbWVudHNDb3VudGVyLmlkID0gJ2NvbW1lbnRzLWNvdW50ZXInO1xuICBjb25zdCBjb21tZW50c0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICBjb21tZW50c0xpc3QuaWQgPSAnY29tbWVudHMtbGlzdCc7XG4gIGNvbnN0IGNvbW1lbnRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICBjb21tZW50Rm9ybS5pZCA9ICdjb21tZW50LWZvcm0nO1xuICBjb25zdCBuYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBuYW1lTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAnbmFtZS1pbnB1dCcpO1xuICBuYW1lTGFiZWwuaW5uZXJUZXh0ID0gJ05hbWU6JztcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgbmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG4gIG5hbWVJbnB1dC5pZCA9ICduYW1lLWlucHV0JztcbiAgbmFtZUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgY29uc3QgY29tbWVudExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgY29tbWVudExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ2NvbW1lbnQtaW5wdXQnKTtcbiAgY29tbWVudExhYmVsLmlubmVyVGV4dCA9ICdDb21tZW50Oic7XG4gIGNvbnN0IGNvbW1lbnRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gIGNvbW1lbnRJbnB1dC5pZCA9ICdjb21tZW50LWlucHV0JztcbiAgY29tbWVudElucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHN1Ym1pdEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gIHN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSAnQ29tbWVudCc7XG5cbiAgLy8gQXBwZW5kIGVsZW1lbnRzIHRvIGNyZWF0ZSB0aGUgbW9kYWwgc3RydWN0dXJlXG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbEltYWdlKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG1vZGFsVGl0bGUpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxEZXRhaWxzKTtcbiAgY29tbWVudHNTZWN0aW9uLmFwcGVuZENoaWxkKGNvbW1lbnRzSGVhZGVyKTtcbiAgY29tbWVudHNTZWN0aW9uLmFwcGVuZENoaWxkKGNvbW1lbnRzQ291bnRlcik7XG4gIGNvbW1lbnRzU2VjdGlvbi5hcHBlbmRDaGlsZChjb21tZW50c0xpc3QpO1xuICBjb21tZW50Rm9ybS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICBjb21tZW50Rm9ybS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICBjb21tZW50Rm9ybS5hcHBlbmRDaGlsZChjb21tZW50TGFiZWwpO1xuICBjb21tZW50Rm9ybS5hcHBlbmRDaGlsZChjb21tZW50SW5wdXQpO1xuICBjb21tZW50Rm9ybS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICBjb21tZW50c1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29tbWVudEZvcm0pO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoY29tbWVudHNTZWN0aW9uKTtcbiAgbW9kYWxDb250YWluZXIuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcbiAgbW9kYWxPdmVybGF5LmFwcGVuZENoaWxkKG1vZGFsQ29udGFpbmVyKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbE92ZXJsYXkpO1xuXG4gIC8vIFNldCB0aGUgbW9kYWwgY29udGVudFxuICBtb2RhbEltYWdlLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7bW92aWUuaW1hZ2UubWVkaXVtfVwiIGFsdD1cIiR7bW92aWUubmFtZX1cIj5gO1xuICBtb2RhbFRpdGxlLmlubmVyVGV4dCA9IG1vdmllLm5hbWU7XG4gIG1vZGFsRGV0YWlscy50ZXh0Q29udGVudCA9IG1vdmllLnN1bW1hcnk7XG5cbiAgLy8gRnVuY3Rpb24gdG8gdXBkYXRlIGNvbW1lbnRzIGluIHRoZSBtb2RhbFxuICBjb25zdCB1cGRhdGVDb21tZW50cyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50cyhtb3ZpZS5pZCk7XG4gICAgICBjb25zdCBjb21tZW50c0NvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtY291bnRlcicpO1xuICAgICAgY29tbWVudHNDb3VudGVyLnRleHRDb250ZW50ID0gYENvbW1lbnRzICgke2NvbW1lbnRzLmxlbmd0aH0pYDtcbiAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgICAgY29tbWVudHMuZm9yRWFjaCgoY29tbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpc3RJdGVtLmlubmVyVGV4dCA9IGAke2NvbW1lbnQudXNlcm5hbWV9OiAke2NvbW1lbnQuY29tbWVudH1gO1xuICAgICAgICBjb21tZW50c0xpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQ2xvc2UgbW9kYWwgd2hlbiBjbGlja2luZyB0aGUgY2xvc2UgYnV0dG9uIG9yIG91dHNpZGUgdGhlIG1vZGFsXG4gIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1vZGFsT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9KTtcbiAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbW9kYWxPdmVybGF5KSB7XG4gICAgICBtb2RhbE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFByZXZlbnQgY2xvc2luZyB0aGUgbW9kYWwgd2hlbiBjbGlja2luZyBpbnNpZGUgdGhlIG1vZGFsIGNvbnRlbnRcbiAgbW9kYWxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIFByZXZlbnQgZm9ybSBzdWJtaXNzaW9uIGFuZCBoYW5kbGUgY29tbWVudCBzdWJtaXNzaW9uXG4gIGNvbW1lbnRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdXNlcm5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XG4gICAgY29uc3QgY29tbWVudCA9IGNvbW1lbnRJbnB1dC52YWx1ZTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBjcmVhdGVDb21tZW50KG1vdmllLmlkLCB1c2VybmFtZSwgY29tbWVudCk7XG4gICAgICBuYW1lSW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGNvbW1lbnRJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgYXdhaXQgdXBkYXRlQ29tbWVudHMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vICAgY29uc29sZS5sb2coJ0Vycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gRGlzcGxheSB0aGUgbW9kYWxcbiAgbW9kYWxPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gIC8vIEluaXRpYWxpemUgY29tbWVudHNcbiAgdXBkYXRlQ29tbWVudHMoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU1vZGFsO1xuIiwiaW1wb3J0IFJlc2VydmF0aW9ucyBmcm9tICcuLi9yZXNlcnZhdGlvbk1vZGFsL3Jlc2VydmF0aW9ucy5qcyc7XG5pbXBvcnQgZ2V0TGlrZXMgZnJvbSAnLi4vbGlrZXMvZ2V0TGlrZXMuanMnO1xuaW1wb3J0IHNldExpa2UgZnJvbSAnLi4vbGlrZXMvbGlrZXMuanMnO1xuaW1wb3J0IGNyZWF0ZU1vZGFsIGZyb20gJy4uL2NvbW1lbnRzTW9kYWwvbW9kYWwuanMnO1xuXG5jb25zdCBnZXRTaG93cyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgaG9tZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lcGFnZScpO1xuICBjb25zdCByZXNlcnZhdGlvbnNNb2RhbCA9IG5ldyBSZXNlcnZhdGlvbnMoKTtcbiAgY29uc3QgbGlrZXNEYXRhID0gYXdhaXQgZ2V0TGlrZXMoKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2hvd3MvMS9lcGlzb2RlcycpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIHNjb3JlczogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICBqc29uLmZvckVhY2goKG1vdmllKSA9PiB7XG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBib2R5LmNsYXNzTmFtZSA9ICdtb3ZpZXMnO1xuICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBpbWFnZXMuY2xhc3NOYW1lID0gJ3Rlc3QtaW1nJztcbiAgICAgIGltYWdlcy5pbm5lckhUTUwgPSBgPGltZyBzcmM9JHttb3ZpZS5pbWFnZS5tZWRpdW19IGFsdD1cIlwiIGNsYXNzPVwibXktaW1nXCI+YDtcblxuICAgICAgY29uc3QgbG92ZUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICBsb3ZlSW1hZ2Uuc3JjID0gJy4vbWVkaWEtbGlicmFyeS9sb3ZlLnBuZyc7XG4gICAgICBsb3ZlSW1hZ2UuY2xhc3NOYW1lID0gJ2xvdmUnO1xuXG4gICAgICBjb25zdCBsaWtlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbGlrZXMuY2xhc3NOYW1lID0gJ3NwYWNlJztcbiAgICAgIGxpa2VzLmlubmVySFRNTCA9IGA8cD4ke21vdmllLm5hbWV9PC9wPiA8cCBjbGFzcz1cImxpa2UtbnVtXCI+PC9wPmA7XG4gICAgICBsaWtlcy5hcHBlbmRDaGlsZChsb3ZlSW1hZ2UpO1xuXG4gICAgICBjb25zdCBidXR0b24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBidXR0b24xLmNsYXNzTmFtZSA9ICdidG4nO1xuICAgICAgYnV0dG9uMS5pbm5lclRleHQgPSAnQ29tbWVudHMnO1xuICAgICAgY29uc3QgYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgYnV0dG9uMi5jbGFzc05hbWUgPSAnYnRuIHZpZXdSZXNlcnZhdGlvbnMnO1xuICAgICAgYnV0dG9uMi5pbm5lclRleHQgPSAnUmVzZXJ2YXRpb25zJztcblxuICAgICAgYm9keS5hcHBlbmRDaGlsZChpbWFnZXMpO1xuICAgICAgYm9keS5hcHBlbmRDaGlsZChsaWtlcyk7XG4gICAgICBib2R5LmFwcGVuZENoaWxkKGJ1dHRvbjEpO1xuICAgICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24yKTtcbiAgICAgIGhvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9keSk7XG5cbiAgICAgIGxvdmVJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBzZXRMaWtlKG1vdmllLCBsaWtlcyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gbGlrZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbnVtYmVyT2ZMaWtlcyA9IGxpa2VzLnF1ZXJ5U2VsZWN0b3IoJy5saWtlLW51bScpO1xuICAgICAgbGV0IHNpbmdsZUxpa2UgPSAwO1xuICAgICAgY29uc3QgbGlrZSA9IGxpa2VzRGF0YS5maW5kKChsaWtlKSA9PiBsaWtlLml0ZW1faWQgPT09IG1vdmllLmlkKTtcblxuICAgICAgaWYgKGxpa2UpIHtcbiAgICAgICAgc2luZ2xlTGlrZSA9IGxpa2UubGlrZXM7XG4gICAgICAgIG51bWJlck9mTGlrZXMudGV4dENvbnRlbnQgPSBgJHtzaW5nbGVMaWtlfSBMaWtlc2A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBudW1iZXJPZkxpa2VzLnRleHRDb250ZW50ID0gYCR7c2luZ2xlTGlrZX0gTGlrZXNgO1xuICAgICAgfVxuXG4gICAgICBidXR0b24xLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjcmVhdGVNb2RhbChtb3ZpZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmZXRjaCcpO1xuICB9XG4gIHJlc2VydmF0aW9uc01vZGFsLnNob3dSZXNlcnZhdGlvbnMoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFNob3dzO1xuIiwiaW1wb3J0IGdldFNob3dzIGZyb20gJy4vZ2V0U2hvd3MuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZW5kZXJQb3N0cygpO1xuICB9XG5cbiAgcmVuZGVyUG9zdHMoKSB7XG4gICAgZ2V0U2hvd3MuYmluZCh0aGlzKSgpO1xuICB9XG59XG4iLCJjb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL2xpa2VzJyxcbiAgICApO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggc2NvcmVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBqc29uO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBvc3QnKTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGdldExpa2VzO1xuIiwiaW1wb3J0IHVwZGF0ZU15TGlrZXMgZnJvbSAnLi91cGRhdGVMaWtlcy5qcyc7XG5cbmNvbnN0IHNldExpa2UgPSBhc3luYyAobW92aWUsIGxpa2VzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9saWtlcycsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaXRlbV9pZDogbW92aWUuaWQsXG4gICAgICAgIH0pLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgdXBkYXRlTXlMaWtlcyhtb3ZpZSwgbGlrZXMpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwb3N0Jyk7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBzZXRMaWtlO1xuIiwiY29uc3QgdXBkYXRlTXlMaWtlcyA9IChtb3ZpZSwgbGlrZXMpID0+IHtcbiAgY29uc3QgbnVtT2ZMaWtlRGl2ID0gbGlrZXMucXVlcnlTZWxlY3RvcignLmxpa2UtbnVtJyk7XG4gIGxldCBzaW5nbGVMaWtlcyA9IHBhcnNlSW50KG51bU9mTGlrZURpdi50ZXh0Q29udGVudCwgMTApO1xuICBzaW5nbGVMaWtlcyArPSAxO1xuICBudW1PZkxpa2VEaXYudGV4dENvbnRlbnQgPSBgJHtzaW5nbGVMaWtlc30gTGlrZXNgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlTXlMaWtlcztcbiIsImltcG9ydCBGZXRjaFJlc2VydmF0aW9ucyBmcm9tICcuL2ZldGNoUmVzZXJ2YXRpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGxheUFmdGVyUG9zdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IDA7XG4gIH1cblxuICB1cGRhdGVDb3VudGVyKGZldGNoZWRSZXNlcnZhdGlvbkFycikge1xuICAgIC8vIFVwZGF0ZXMgY291bnRlclxuICAgIHRoaXMucmVzZXJ2YXRpb25Db3VudCA9IGZldGNoZWRSZXNlcnZhdGlvbkFyci5sZW5ndGg7XG4gICAgY29uc3QgcmVzZXJ2YXRpb25zSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbnNIZWFkaW5nJyk7XG4gICAgcmVzZXJ2YXRpb25zSGVhZGluZy5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICBlYWNoLnRleHRDb250ZW50ID0gYFJlc2VydmF0aW9ucyAoJHt0aGlzLnJlc2VydmF0aW9uQ291bnR9KTpgO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZGlzcGxheVJlc2VydmF0aW9ucyhpbmRleCkge1xuICAgIGNvbnN0IGZldGNoUmVzZXJ2YXRpb25zID0gbmV3IEZldGNoUmVzZXJ2YXRpb25zKCk7XG4gICAgZmV0Y2hSZXNlcnZhdGlvbnMubW92aWVJRCA9IGluZGV4O1xuICAgIGNvbnN0IGZldGNoZWRSZXNlcnZhdGlvbiA9IGF3YWl0IGZldGNoUmVzZXJ2YXRpb25zLmZldGNoUmVzZXJ2YXRpb25zRGF0YSgpO1xuICAgIGNvbnN0IGZldGNoZWRSZXNlcnZhdGlvbkFyciA9IEFycmF5LmZyb20oZmV0Y2hlZFJlc2VydmF0aW9uKTtcbiAgICBjb25zdCBleGlzdGluZ1Jlc2VydmF0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leGlzdGluZ1Jlc2VydmF0aW9ucycpO1xuXG4gICAgLy8gQ2xlYXIgZXhpc3RpbmcgcmVzZXJ2YXRpb25zXG4gICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4ge1xuICAgICAgZWFjaC5pbm5lckhUTUwgPSAnJztcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUNvdW50ZXIoZmV0Y2hlZFJlc2VydmF0aW9uQXJyKTtcblxuICAgIGZldGNoZWRSZXNlcnZhdGlvbkFyci5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICBjb25zdCByZXNlcnZhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHJlc2VydmF0aW9uLnRleHRDb250ZW50ID0gYCR7ZWFjaC5kYXRlX3N0YXJ0fSAtICR7ZWFjaC5kYXRlX2VuZH0gYnkgJHtlYWNoLnVzZXJuYW1lfWA7XG4gICAgICBleGlzdGluZ1Jlc2VydmF0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICAgIGVhY2guYXBwZW5kQ2hpbGQocmVzZXJ2YXRpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGZXRjaFJlc2VydmF0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubW92aWVJRCA9IDA7XG4gIH1cblxuICBhc3luYyBmZXRjaFJlc2VydmF0aW9uc0RhdGEoKSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL3Jlc2VydmF0aW9ucz9pdGVtX2lkPWl0ZW0ke3RoaXMubW92aWVJRH1gO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5QWZ0ZXJQb3N0IGZyb20gJy4uL3Jlc2VydmF0aW9uTW9kYWwvZGlzcGxheVJlc2VydmF0aW9uLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdFJlc2V2YXRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlc2VydmF0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbkZvcm0nKTtcbiAgICB0aGlzLnVzZXJuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXJuYW1lJyk7XG4gICAgdGhpcy5zdGFydERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnREYXRlJyk7XG4gICAgdGhpcy5lbmREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZERhdGUnKTtcbiAgICB0aGlzLm1vdmllSWQgPSAwO1xuICAgIHRoaXMuc2V0dXBMaXN0ZW5lcigpO1xuICB9XG5cbiAgYXN5bmMgcG9zdFJlc2VydmF0aW9uKGRhdGEpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL3Jlc2VydmF0aW9ucycsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgLy8gZ2l2ZXMgZXJyb3I7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBvc3QnKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgZGlzcGxheWVkIHJlc2VydmF0aW9uc1xuICAgIGNvbnN0IGxvYWRSZXNlcnZhdGlvbnMgPSBuZXcgRGlzcGxheUFmdGVyUG9zdCgpO1xuICAgIGxvYWRSZXNlcnZhdGlvbnMuZGlzcGxheVJlc2VydmF0aW9ucyh0aGlzLm1vdmllSWQpO1xuICB9XG5cbiAgc2V0dXBMaXN0ZW5lcigpIHtcbiAgICB0aGlzLnJlc2VydmF0aW9uRm9ybS5mb3JFYWNoKChlYWNoKSA9PiBlYWNoLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBpdGVtX2lkOiBgaXRlbSR7dGhpcy5tb3ZpZUlkfWAsXG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLnZhbHVlLFxuICAgICAgICBkYXRlX3N0YXJ0OiB0aGlzLnN0YXJ0RGF0ZS52YWx1ZSxcbiAgICAgICAgZGF0ZV9lbmQ6IHRoaXMuZW5kRGF0ZS52YWx1ZSxcbiAgICAgIH07XG4gICAgICBjb25zb2xlLmxvZyhcImZpcnN0XCIpO1xuICAgICAgdGhpcy5wb3N0UmVzZXJ2YXRpb24oZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKFwic2Vjb25kXCIpO1xuICAgICAgdGhpcy51c2VybmFtZS52YWx1ZSA9ICcnO1xuICAgICAgdGhpcy5zdGFydERhdGUudmFsdWUgPSAnJztcbiAgICAgIHRoaXMuZW5kRGF0ZS52YWx1ZSA9ICcnO1xuICAgIH0pKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1bGxNb3ZpZXNEYXRhIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cy8xL2VwaXNvZGVzJztcbiAgfVxuXG4gIGFzeW5jIGZldGNoTW92aWVzRGF0YSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLnVybCk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQdWxsTW92aWVzRGF0YSBmcm9tICcuL3B1bGxNb3ZpZXMuanMnO1xuaW1wb3J0IFBvc3RSZXNlcnZhdGlvbiBmcm9tICcuL3Bvc3RSZXNlcnZhdGlvbi5qcyc7XG5pbXBvcnQgRmV0Y2hSZXNlcnZhdGlvbnMgZnJvbSAnLi9mZXRjaFJlc2VydmF0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc2VydmF0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICB0aGlzLnZpZXdSZXNlcnZhdGlvbnNCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmlld1Jlc2VydmF0aW9ucycpO1xuICAgIHRoaXMuZmV0Y2hSZXNlcnZhdGlvbnMgPSBuZXcgRmV0Y2hSZXNlcnZhdGlvbnMoKTtcbiAgICB0aGlzLnJlc2VydmF0aW9uQ291bnQgPSAwO1xuICAgIHRoaXMuc2hvd1Jlc2VydmF0aW9ucygpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlUmVzZXJ2YXRpb25zTW9kYWwoaW5kZXgpIHtcbiAgICBjb25zdCBnZXRNb3ZpZXNEZXRhaWxzID0gbmV3IFB1bGxNb3ZpZXNEYXRhKCk7XG4gICAgY29uc3QgbW92aWVzRGV0YWlscyA9IGF3YWl0IGdldE1vdmllc0RldGFpbHMuZmV0Y2hNb3ZpZXNEYXRhKCk7XG4gICAgY29uc3QgbW92aWVzRGV0YWlsc0FyciA9IEFycmF5LmZyb20obW92aWVzRGV0YWlscyk7XG5cbiAgICBjb25zdCByZXNlcnZhdGlvbnNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIHJlc2VydmF0aW9uc1NlY3Rpb24uY2xhc3NOYW1lID0gJ3Jlc2VydmF0aW9uc1NlY3Rpb24nO1xuICAgIHJlc2VydmF0aW9uc1NlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJyZXNlcnZhdGlvbnNDb250YWluZXJcIj5cbiAgICAgIDxwIGNsYXNzPVwiY2xvc2UtaWNvblwiPjxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPmNsb3NlPC9zcGFuPjwvcD5cbiAgICAgIDxkaXYgY2xhc3M9XCJtb3ZpZURlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxpbWcgY2xhc3M9XCJtb3ZpZUltYWdlXCIgc3JjPVwiJHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5pbWFnZS5tZWRpdW19XCIgd2lkdGg9XCI2MDBcIiBhbHQ9XCJzaW1wbGVcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwibW92aWVUaXRsZSBoZWFkaW5nc1wiPiR7bW92aWVzRGV0YWlsc0FycltpbmRleF0ubmFtZX08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW92aWVEZXNjcmlwdGlvblwiPiAke21vdmllc0RldGFpbHNBcnJbaW5kZXhdLnN1bW1hcnl9PC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb25Db250YWluZXJzXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cInJlc2VydmF0aW9uc0hlYWRpbmcgaGVhZGluZ3NcIj5SZXNlcnZhdGlvbnMoJHt0aGlzLnJlc2VydmF0aW9uQ291bnR9KTo8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZXhpc3RpbmdSZXNlcnZhdGlvbnNcIj4gPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb25Db250YWluZXJzXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cImFkZFJlc2VydmF0aW9uc0hlYWRpbmcgaGVhZGluZ3NcIj5SZXNlcnZlIGEgU3BvdDo8L2gyPlxuICAgICAgICA8Zm9ybSBjbGFzcz1cInJlc2VydmF0aW9uRm9ybVwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm1GaWVsZHNcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiBpZD1cInVzZXJuYW1lXCIgbmFtZT1cInVzZXJuYW1lXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJkYXRlXCIgcGxhY2Vob2xkZXI9XCJTdGFydCBEYXRlXCIgaWQ9XCJzdGFydERhdGVcIiBuYW1lPVwic3RhcnREYXRlXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJkYXRlXCIgcGxhY2Vob2xkZXI9XCJFbmQgRGF0ZVwiIGlkPVwiZW5kRGF0ZVwiIG5hbWU9XCJlbmREYXRlXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwic3VibWl0QnRuXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiUmVzZXJ2ZVwiPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChyZXNlcnZhdGlvbnNTZWN0aW9uKTtcblxuICAgIGNvbnN0IHJlc2VydmF0aW9uQ2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLWljb24nKTtcbiAgICB0aGlzLmNsb3NlUmVzZXJ2YXRpb25Nb2RhbChyZXNlcnZhdGlvbkNsb3NlQnRucyk7XG5cbiAgICBjb25zdCBwb3N0UmVzZXJ2YXRpb25EYXRhID0gbmV3IFBvc3RSZXNlcnZhdGlvbigpO1xuICAgIHBvc3RSZXNlcnZhdGlvbkRhdGEubW92aWVJZCA9IGluZGV4O1xuICB9XG5cbiAgY2xvc2VSZXNlcnZhdGlvbk1vZGFsKHJlc2VydmF0aW9uQ2xvc2VCdG5zKSB7XG4gICAgdGhpcy5yZXNlcnZhdGlvbnNTZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbnNTZWN0aW9uJyk7XG4gICAgcmVzZXJ2YXRpb25DbG9zZUJ0bnMuZm9yRWFjaCgoZWFjaCkgPT4ge1xuICAgICAgZWFjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNlcnZhdGlvbnNTZWN0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICAgICAgZWFjaC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQ291bnRlcihmZXRjaGVkUmVzZXJ2YXRpb25BcnIpIHtcbiAgICAvLyBVcGRhdGVzIGNvdW50ZXJcbiAgICB0aGlzLnJlc2VydmF0aW9uQ291bnQgPSBmZXRjaGVkUmVzZXJ2YXRpb25BcnIubGVuZ3RoO1xuICAgIGNvbnN0IHJlc2VydmF0aW9uc0hlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVzZXJ2YXRpb25zSGVhZGluZycpO1xuICAgIHJlc2VydmF0aW9uc0hlYWRpbmcuZm9yRWFjaCgoZWFjaCkgPT4ge1xuICAgICAgZWFjaC50ZXh0Q29udGVudCA9IGBSZXNlcnZhdGlvbnMgKCR7dGhpcy5yZXNlcnZhdGlvbkNvdW50fSk6YDtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRpc3BsYXlSZXNlcnZhdGlvbnMoaW5kZXgpIHtcbiAgICBjb25zdCBmZXRjaFJlc2VydmF0aW9ucyA9IG5ldyBGZXRjaFJlc2VydmF0aW9ucygpO1xuICAgIGZldGNoUmVzZXJ2YXRpb25zLm1vdmllSUQgPSBpbmRleDtcbiAgICBjb25zdCBmZXRjaGVkUmVzZXJ2YXRpb24gPSBhd2FpdCBmZXRjaFJlc2VydmF0aW9ucy5mZXRjaFJlc2VydmF0aW9uc0RhdGEoKTtcbiAgICBjb25zdCBmZXRjaGVkUmVzZXJ2YXRpb25BcnIgPSBBcnJheS5mcm9tKGZldGNoZWRSZXNlcnZhdGlvbik7XG4gICAgY29uc3QgZXhpc3RpbmdSZXNlcnZhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZXhpc3RpbmdSZXNlcnZhdGlvbnMnKTtcblxuICAgIC8vIENsZWFyIGV4aXN0aW5nIHJlc2VydmF0aW9uc1xuICAgIGV4aXN0aW5nUmVzZXJ2YXRpb25zLmZvckVhY2goKGVhY2gpID0+IHtcbiAgICAgIGVhY2guaW5uZXJIVE1MID0gJyc7XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVDb3VudGVyKGZldGNoZWRSZXNlcnZhdGlvbkFycik7XG5cbiAgICBmZXRjaGVkUmVzZXJ2YXRpb25BcnIuZm9yRWFjaCgoZWFjaCkgPT4ge1xuICAgICAgY29uc3QgcmVzZXJ2YXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICByZXNlcnZhdGlvbi50ZXh0Q29udGVudCA9IGAke2VhY2guZGF0ZV9zdGFydH0gLSAke2VhY2guZGF0ZV9lbmR9IGJ5ICR7ZWFjaC51c2VybmFtZX1gO1xuICAgICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4ge1xuICAgICAgICBlYWNoLmFwcGVuZENoaWxkKHJlc2VydmF0aW9uKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd1Jlc2VydmF0aW9ucygpIHtcbiAgICBjb25zdCBidG5zQXJyYXkgPSBBcnJheS5mcm9tKHRoaXMudmlld1Jlc2VydmF0aW9uc0J0bnMpO1xuICAgIGJ0bnNBcnJheS5mb3JFYWNoKChlYWNoLCBlYWNoaW5kZXgpID0+IHtcbiAgICAgIGVhY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3JlYXRlUmVzZXJ2YXRpb25zTW9kYWwoZWFjaGluZGV4KTtcbiAgICAgICAgdGhpcy5kaXNwbGF5UmVzZXJ2YXRpb25zKGVhY2hpbmRleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9