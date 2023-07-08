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
/* harmony import */ var _likes_updateLikes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../likes/updateLikes.js */ "./src/likes/updateLikes.js");


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
      (0,_likes_updateLikes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(movie, likes);
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

/***/ "./src/reservationModal/postReservations.js":
/*!**************************************************!*\
  !*** ./src/reservationModal/postReservations.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostResevation)
/* harmony export */ });
/* harmony import */ var _reservations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reservations */ "./src/reservationModal/reservations.js");


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
        console.log("ok");
      }
    } catch (error) {
      throw new Error('Unable to post');
    }

    // update displayed reservations
    const loadReservations = new _reservations__WEBPACK_IMPORTED_MODULE_0__["default"]();
    loadReservations.displayReservations(this.movieId);
  }

  setupListener(){
    console.log(this.movieId);
    this.reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(this.movieId);
      const data = {
        item_id: `item${this.movieId}`,
        username: this.username.value,
        date_start: this.startDate.value,
        date_end: this.endDate.value,
      }
      this.postReservation(data);
      this.username.value = '';
      this.startDate.value = '';
      this.endDate.value = '';
    })
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
/* harmony import */ var _postReservations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./postReservations.js */ "./src/reservationModal/postReservations.js");
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

    const postReservationData = new _postReservations_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    postReservationData.movieId = index;
    postReservationData.setupListener();

  }

  closeReservationModal(reservationCloseBtns) {
    const reservationsSections = document.querySelectorAll('.reservationsSection');
    reservationCloseBtns.forEach((each) => each.addEventListener('click', () => {
    reservationsSections.forEach((each) => each.style.display = 'none');
    }))
  }

  updateCounter(fetchedReservationArr) {
    // Updates counter
    this.reservationCount = fetchedReservationArr.length;
    const reservationsHeading = document.querySelectorAll('.reservationsHeading');
    reservationsHeading.forEach((each) => each.textContent = `Reservations (${this.reservationCount}):`)
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
      reservation.textContent =  `${each.date_start} - ${each.date_end} by ${each.username}`;
      existingReservations.forEach((each) => {
        each.appendChild(reservation)
      })
    });
  }

    showReservations() {
    const btnsArray = Array.from(this.viewReservationsBtns);
    btnsArray.forEach((each, eachindex) => {
      each.addEventListener('click', () => {
        this.createReservationsModal(eachindex);
        this.displayReservations(eachindex);
      })
    })
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/home/home.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2Q2QztBQUNPO0FBQ0c7QUFDdkQ7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyw2REFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxzREFBYztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMscUNBQXFDO0FBQzVFLDBDQUEwQyw2QkFBNkI7QUFDdkUseUNBQXlDLGdDQUFnQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0Usc0JBQXNCO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw0REFBZTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFLHNCQUFzQjtBQUNwRztBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsNkRBQWlCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsaUJBQWlCLElBQUksZUFBZSxLQUFLLGNBQWM7QUFDM0Y7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9jb21tZW50c01vZGFsL2NvbW1lbnRzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9jb21tZW50c01vZGFsL21vZGFsLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9ob21lL2dldFNob3dzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9ob21lL2hvbWUuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2xpa2VzL2dldExpa2VzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9saWtlcy9saWtlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbGlrZXMvdXBkYXRlTGlrZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvZmV0Y2hSZXNlcnZhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3Jlc2VydmF0aW9uTW9kYWwvcG9zdFJlc2VydmF0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcmVzZXJ2YXRpb25Nb2RhbC9wdWxsTW92aWVzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9yZXNlcnZhdGlvbk1vZGFsL3Jlc2VydmF0aW9ucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnZXRDb21tZW50cyA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1hUeUhRQUJuM2VqNDJTSzI4bmJjL2NvbW1lbnRzP2l0ZW1faWQ9JHtpdGVtSWR9YCxcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBjb21tZW50czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tbWVudHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gY29tbWVudHM7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZldGNoIGNvbW1lbnRzJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlQ29tbWVudCA9IGFzeW5jIChpdGVtSWQsIHVzZXJuYW1lLCBjb21tZW50KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9jb21tZW50cycsXHJcbiAgICAgIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICBpdGVtX2lkOiBpdGVtSWQsXHJcbiAgICAgICAgICB1c2VybmFtZSxcclxuICAgICAgICAgIGNvbW1lbnQsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDEpIHtcclxuICAgIC8vICAgY29uc29sZS5sb2coJ0NvbW1lbnQgY3JlYXRlZCBzdWNjZXNzZnVsbHknKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBjb21tZW50OiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY3JlYXRlIGNvbW1lbnQnKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgeyBnZXRDb21tZW50cywgY3JlYXRlQ29tbWVudCB9O1xyXG4iLCJpbXBvcnQgeyBnZXRDb21tZW50cywgY3JlYXRlQ29tbWVudCB9IGZyb20gJy4vY29tbWVudHMuanMnO1xyXG5cclxuY29uc3QgY3JlYXRlTW9kYWwgPSAobW92aWUpID0+IHtcclxuICAvLyBDcmVhdGUgdGhlIG1vZGFsIGVsZW1lbnRzXHJcbiAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbW9kYWxPdmVybGF5LmNsYXNzTmFtZSA9ICdtb2RhbC1vdmVybGF5JztcclxuICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG1vZGFsQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdtb2RhbC1jb250YWluZXInO1xyXG4gIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG1vZGFsQ29udGVudC5jbGFzc05hbWUgPSAnbW9kYWwtY29udGVudCc7XHJcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlLWJ1dHRvbic7XHJcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyZ0aW1lczsnO1xyXG4gIGNvbnN0IG1vZGFsSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBtb2RhbEltYWdlLmlkID0gJ21vZGFsLWltYWdlJztcclxuICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICBtb2RhbFRpdGxlLmlkID0gJ21vZGFsLXRpdGxlJztcclxuICBjb25zdCBtb2RhbERldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBtb2RhbERldGFpbHMuaWQgPSAnbW9kYWwtZGV0YWlscyc7XHJcbiAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgY29tbWVudHNTZWN0aW9uLmlkID0gJ2NvbW1lbnRzLXNlY3Rpb24nO1xyXG4gIGNvbnN0IGNvbW1lbnRzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICBjb21tZW50c0hlYWRlci5pbm5lclRleHQgPSAnQ29tbWVudHMnO1xyXG4gIGNvbnN0IGNvbW1lbnRzQ291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICBjb21tZW50c0NvdW50ZXIuaWQgPSAnY29tbWVudHMtY291bnRlcic7XHJcbiAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICBjb21tZW50c0xpc3QuaWQgPSAnY29tbWVudHMtbGlzdCc7XHJcbiAgY29uc3QgY29tbWVudEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgY29tbWVudEZvcm0uaWQgPSAnY29tbWVudC1mb3JtJztcclxuICBjb25zdCBuYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gIG5hbWVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICduYW1lLWlucHV0Jyk7XHJcbiAgbmFtZUxhYmVsLmlubmVyVGV4dCA9ICdOYW1lOic7XHJcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBuYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcclxuICBuYW1lSW5wdXQuaWQgPSAnbmFtZS1pbnB1dCc7XHJcbiAgbmFtZUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcclxuICBjb25zdCBjb21tZW50TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gIGNvbW1lbnRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdjb21tZW50LWlucHV0Jyk7XHJcbiAgY29tbWVudExhYmVsLmlubmVyVGV4dCA9ICdDb21tZW50Oic7XHJcbiAgY29uc3QgY29tbWVudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcclxuICBjb21tZW50SW5wdXQuaWQgPSAnY29tbWVudC1pbnB1dCc7XHJcbiAgY29tbWVudElucHV0LnJlcXVpcmVkID0gdHJ1ZTtcclxuICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICBzdWJtaXRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xyXG4gIHN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSAnQ29tbWVudCc7XHJcblxyXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBjcmVhdGUgdGhlIG1vZGFsIHN0cnVjdHVyZVxyXG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XHJcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG1vZGFsSW1hZ2UpO1xyXG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbFRpdGxlKTtcclxuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxEZXRhaWxzKTtcclxuICBjb21tZW50c1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29tbWVudHNIZWFkZXIpO1xyXG4gIGNvbW1lbnRzU2VjdGlvbi5hcHBlbmRDaGlsZChjb21tZW50c0NvdW50ZXIpO1xyXG4gIGNvbW1lbnRzU2VjdGlvbi5hcHBlbmRDaGlsZChjb21tZW50c0xpc3QpO1xyXG4gIGNvbW1lbnRGb3JtLmFwcGVuZENoaWxkKG5hbWVMYWJlbCk7XHJcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcclxuICBjb21tZW50Rm9ybS5hcHBlbmRDaGlsZChjb21tZW50TGFiZWwpO1xyXG4gIGNvbW1lbnRGb3JtLmFwcGVuZENoaWxkKGNvbW1lbnRJbnB1dCk7XHJcbiAgY29tbWVudEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcclxuICBjb21tZW50c1NlY3Rpb24uYXBwZW5kQ2hpbGQoY29tbWVudEZvcm0pO1xyXG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChjb21tZW50c1NlY3Rpb24pO1xyXG4gIG1vZGFsQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XHJcbiAgbW9kYWxPdmVybGF5LmFwcGVuZENoaWxkKG1vZGFsQ29udGFpbmVyKTtcclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsT3ZlcmxheSk7XHJcblxyXG4gIC8vIFNldCB0aGUgbW9kYWwgY29udGVudFxyXG4gIG1vZGFsSW1hZ2UuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHttb3ZpZS5pbWFnZS5tZWRpdW19XCIgYWx0PVwiJHttb3ZpZS5uYW1lfVwiPmA7XHJcbiAgbW9kYWxUaXRsZS5pbm5lclRleHQgPSBtb3ZpZS5uYW1lO1xyXG4gIG1vZGFsRGV0YWlscy50ZXh0Q29udGVudCA9IG1vdmllLnN1bW1hcnk7XHJcblxyXG4gIC8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjb21tZW50cyBpbiB0aGUgbW9kYWxcclxuICBjb25zdCB1cGRhdGVDb21tZW50cyA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHMobW92aWUuaWQpO1xyXG4gICAgICBjb25zdCBjb21tZW50c0NvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtY291bnRlcicpO1xyXG4gICAgICBjb21tZW50c0NvdW50ZXIudGV4dENvbnRlbnQgPSBgQ29tbWVudHMgKCR7Y29tbWVudHMubGVuZ3RofSlgO1xyXG4gICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGxpc3RJdGVtLmlubmVyVGV4dCA9IGAke2NvbW1lbnQudXNlcm5hbWV9OiAke2NvbW1lbnQuY29tbWVudH1gO1xyXG4gICAgICAgIGNvbW1lbnRzTGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ0Vycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIENsb3NlIG1vZGFsIHdoZW4gY2xpY2tpbmcgdGhlIGNsb3NlIGJ1dHRvbiBvciBvdXRzaWRlIHRoZSBtb2RhbFxyXG4gIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbW9kYWxPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfSk7XHJcbiAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgbW9kYWxPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIFByZXZlbnQgY2xvc2luZyB0aGUgbW9kYWwgd2hlbiBjbGlja2luZyBpbnNpZGUgdGhlIG1vZGFsIGNvbnRlbnRcclxuICBtb2RhbENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBQcmV2ZW50IGZvcm0gc3VibWlzc2lvbiBhbmQgaGFuZGxlIGNvbW1lbnQgc3VibWlzc2lvblxyXG4gIGNvbW1lbnRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHVzZXJuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xyXG4gICAgY29uc3QgY29tbWVudCA9IGNvbW1lbnRJbnB1dC52YWx1ZTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBjcmVhdGVDb21tZW50KG1vdmllLmlkLCB1c2VybmFtZSwgY29tbWVudCk7XHJcbiAgICAgIG5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICBjb21tZW50SW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgYXdhaXQgdXBkYXRlQ29tbWVudHMoKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gRGlzcGxheSB0aGUgbW9kYWxcclxuICBtb2RhbE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gIC8vIEluaXRpYWxpemUgY29tbWVudHNcclxuICB1cGRhdGVDb21tZW50cygpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTW9kYWw7XHJcbiIsImltcG9ydCBSZXNlcnZhdGlvbnMgZnJvbSAnLi4vcmVzZXJ2YXRpb25Nb2RhbC9yZXNlcnZhdGlvbnMuanMnO1xyXG5pbXBvcnQgZ2V0TGlrZXMgZnJvbSAnLi4vbGlrZXMvZ2V0TGlrZXMuanMnO1xyXG5pbXBvcnQgc2V0TGlrZSBmcm9tICcuLi9saWtlcy9saWtlcy5qcyc7XHJcbmltcG9ydCBjcmVhdGVNb2RhbCBmcm9tICcuLi9jb21tZW50c01vZGFsL21vZGFsLmpzJztcclxuXHJcbmNvbnN0IGdldFNob3dzID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IGhvbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZXBhZ2UnKTtcclxuICBjb25zdCByZXNlcnZhdGlvbnNNb2RhbCA9IG5ldyBSZXNlcnZhdGlvbnMoKTtcclxuICBjb25zdCBsaWtlc0RhdGEgPSBhd2FpdCBnZXRMaWtlcygpO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cy8xL2VwaXNvZGVzJyk7XHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIHNjb3JlczogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgIGpzb24uZm9yRWFjaCgobW92aWUpID0+IHtcclxuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBib2R5LmNsYXNzTmFtZSA9ICdtb3ZpZXMnO1xyXG4gICAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgaW1hZ2VzLmNsYXNzTmFtZSA9ICd0ZXN0LWltZyc7XHJcbiAgICAgIGltYWdlcy5pbm5lckhUTUwgPSBgPGltZyBzcmM9JHttb3ZpZS5pbWFnZS5tZWRpdW19IGFsdD1cIlwiIGNsYXNzPVwibXktaW1nXCI+YDtcclxuXHJcbiAgICAgIGNvbnN0IGxvdmVJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICBsb3ZlSW1hZ2Uuc3JjID0gJy4vbWVkaWEtbGlicmFyeS9sb3ZlLnBuZyc7XHJcbiAgICAgIGxvdmVJbWFnZS5jbGFzc05hbWUgPSAnbG92ZSc7XHJcblxyXG4gICAgICBjb25zdCBsaWtlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBsaWtlcy5jbGFzc05hbWUgPSAnc3BhY2UnO1xyXG4gICAgICBsaWtlcy5pbm5lckhUTUwgPSBgPHA+JHttb3ZpZS5uYW1lfTwvcD4gPHAgY2xhc3M9XCJsaWtlLW51bVwiPjwvcD5gO1xyXG4gICAgICBsaWtlcy5hcHBlbmRDaGlsZChsb3ZlSW1hZ2UpO1xyXG5cclxuICAgICAgY29uc3QgYnV0dG9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICBidXR0b24xLmNsYXNzTmFtZSA9ICdidG4nO1xyXG4gICAgICBidXR0b24xLmlubmVyVGV4dCA9ICdDb21tZW50cyc7XHJcbiAgICAgIGNvbnN0IGJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgYnV0dG9uMi5jbGFzc05hbWUgPSAnYnRuIHZpZXdSZXNlcnZhdGlvbnMnO1xyXG4gICAgICBidXR0b24yLmlubmVyVGV4dCA9ICdSZXNlcnZhdGlvbnMnO1xyXG5cclxuICAgICAgYm9keS5hcHBlbmRDaGlsZChpbWFnZXMpO1xyXG4gICAgICBib2R5LmFwcGVuZENoaWxkKGxpa2VzKTtcclxuICAgICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24xKTtcclxuICAgICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24yKTtcclxuICAgICAgaG9tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChib2R5KTtcclxuXHJcbiAgICAgIGxvdmVJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgYXdhaXQgc2V0TGlrZShtb3ZpZSwgbGlrZXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBsaWtlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG51bWJlck9mTGlrZXMgPSBsaWtlcy5xdWVyeVNlbGVjdG9yKCcubGlrZS1udW0nKTtcclxuICAgICAgbGV0IHNpbmdsZUxpa2UgPSAwO1xyXG4gICAgICBjb25zdCBsaWtlID0gbGlrZXNEYXRhLmZpbmQoKGxpa2UpID0+IGxpa2UuaXRlbV9pZCA9PT0gbW92aWUuaWQpO1xyXG5cclxuICAgICAgaWYgKGxpa2UpIHtcclxuICAgICAgICBzaW5nbGVMaWtlID0gbGlrZS5saWtlcztcclxuICAgICAgICBudW1iZXJPZkxpa2VzLnRleHRDb250ZW50ID0gYCR7c2luZ2xlTGlrZX0gTGlrZXNgO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG51bWJlck9mTGlrZXMudGV4dENvbnRlbnQgPSBgJHtzaW5nbGVMaWtlfSBMaWtlc2A7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJ1dHRvbjEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY3JlYXRlTW9kYWwobW92aWUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmZXRjaCcpO1xyXG4gIH1cclxuICByZXNlcnZhdGlvbnNNb2RhbC5zaG93UmVzZXJ2YXRpb25zKCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRTaG93cztcclxuIiwiaW1wb3J0IGdldFNob3dzIGZyb20gJy4vZ2V0U2hvd3MuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJlbmRlclBvc3RzKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJQb3N0cygpIHtcclxuICAgIGdldFNob3dzLmJpbmQodGhpcykoKTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgZ2V0TGlrZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9YVHlIUUFCbjNlajQyU0syOG5iYy9saWtlcycsXHJcbiAgICApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggc2NvcmVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBvc3QnKTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGdldExpa2VzO1xyXG4iLCJpbXBvcnQgdXBkYXRlTXlMaWtlcyBmcm9tICcuLi9saWtlcy91cGRhdGVMaWtlcy5qcyc7XHJcblxyXG5jb25zdCBzZXRMaWtlID0gYXN5bmMgKG1vdmllLCBsaWtlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvbGlrZXMnLFxyXG4gICAgICB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgaXRlbV9pZDogbW92aWUuaWQsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgdXBkYXRlTXlMaWtlcyhtb3ZpZSwgbGlrZXMpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwb3N0Jyk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBzZXRMaWtlO1xyXG4iLCJjb25zdCB1cGRhdGVNeUxpa2VzID0gKG1vdmllLCBsaWtlcykgPT4ge1xyXG4gIGNvbnN0IG51bU9mTGlrZURpdiA9IGxpa2VzLnF1ZXJ5U2VsZWN0b3IoJy5saWtlLW51bScpO1xyXG4gIGxldCBzaW5nbGVMaWtlcyA9IHBhcnNlSW50KG51bU9mTGlrZURpdi50ZXh0Q29udGVudCwgMTApO1xyXG4gIHNpbmdsZUxpa2VzICs9IDE7XHJcbiAgbnVtT2ZMaWtlRGl2LnRleHRDb250ZW50ID0gYCR7c2luZ2xlTGlrZXN9IExpa2VzYDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZU15TGlrZXM7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZldGNoUmVzZXJ2YXRpb25zIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubW92aWVJRCA9IDA7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmZXRjaFJlc2VydmF0aW9uc0RhdGEoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvcmVzZXJ2YXRpb25zP2l0ZW1faWQ9aXRlbSR7dGhpcy5tb3ZpZUlEfWA7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4gIiwiaW1wb3J0IFJlc2VydmF0aW9ucyBmcm9tIFwiLi9yZXNlcnZhdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RSZXNldmF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLnJlc2VydmF0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNlcnZhdGlvbkZvcm0nKTtcclxuICAgICAgdGhpcy51c2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2VybmFtZScpO1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydERhdGUnKTtcclxuICAgICAgdGhpcy5lbmREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZERhdGUnKTtcclxuICAgICAgdGhpcy5tb3ZpZUlkID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwb3N0UmVzZXJ2YXRpb24oZGF0YSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgICAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvWFR5SFFBQm4zZWo0MlNLMjhuYmMvcmVzZXJ2YXRpb25zJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG4gIFxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9rXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwb3N0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIGRpc3BsYXllZCByZXNlcnZhdGlvbnNcclxuICAgIGNvbnN0IGxvYWRSZXNlcnZhdGlvbnMgPSBuZXcgUmVzZXJ2YXRpb25zKCk7XHJcbiAgICBsb2FkUmVzZXJ2YXRpb25zLmRpc3BsYXlSZXNlcnZhdGlvbnModGhpcy5tb3ZpZUlkKTtcclxuICB9XHJcblxyXG4gIHNldHVwTGlzdGVuZXIoKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMubW92aWVJZCk7XHJcbiAgICB0aGlzLnJlc2VydmF0aW9uRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubW92aWVJZCk7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgaXRlbV9pZDogYGl0ZW0ke3RoaXMubW92aWVJZH1gLFxyXG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLnZhbHVlLFxyXG4gICAgICAgIGRhdGVfc3RhcnQ6IHRoaXMuc3RhcnREYXRlLnZhbHVlLFxyXG4gICAgICAgIGRhdGVfZW5kOiB0aGlzLmVuZERhdGUudmFsdWUsXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wb3N0UmVzZXJ2YXRpb24oZGF0YSk7XHJcbiAgICAgIHRoaXMudXNlcm5hbWUudmFsdWUgPSAnJztcclxuICAgICAgdGhpcy5zdGFydERhdGUudmFsdWUgPSAnJztcclxuICAgICAgdGhpcy5lbmREYXRlLnZhbHVlID0gJyc7XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQdWxsTW92aWVzRGF0YSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnVybCA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzLzEvZXBpc29kZXMnO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZmV0Y2hNb3ZpZXNEYXRhKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLnVybCk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFB1bGxNb3ZpZXNEYXRhIGZyb20gJy4vcHVsbE1vdmllcy5qcyc7XHJcbmltcG9ydCBQb3N0UmVzZXJ2YXRpb24gZnJvbSAnLi9wb3N0UmVzZXJ2YXRpb25zLmpzJztcclxuaW1wb3J0IEZldGNoUmVzZXJ2YXRpb25zIGZyb20gJy4vZmV0Y2hSZXNlcnZhdGlvbnMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzZXJ2YXRpb25zIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICAgIHRoaXMudmlld1Jlc2VydmF0aW9uc0J0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2aWV3UmVzZXJ2YXRpb25zJyk7XHJcbiAgICB0aGlzLmZldGNoUmVzZXJ2YXRpb25zID0gbmV3IEZldGNoUmVzZXJ2YXRpb25zKCk7XHJcbiAgICB0aGlzLnJlc2VydmF0aW9uQ291bnQgPSAwO1xyXG4gICAgdGhpcy5zaG93UmVzZXJ2YXRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChpbmRleCkge1xyXG4gICAgY29uc3QgZ2V0TW92aWVzRGV0YWlscyA9IG5ldyBQdWxsTW92aWVzRGF0YSgpO1xyXG4gICAgY29uc3QgbW92aWVzRGV0YWlscyA9IGF3YWl0IGdldE1vdmllc0RldGFpbHMuZmV0Y2hNb3ZpZXNEYXRhKCk7XHJcbiAgICBjb25zdCBtb3ZpZXNEZXRhaWxzQXJyID0gQXJyYXkuZnJvbShtb3ZpZXNEZXRhaWxzKTtcclxuXHJcbiAgICBjb25zdCByZXNlcnZhdGlvbnNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xyXG4gICAgcmVzZXJ2YXRpb25zU2VjdGlvbi5jbGFzc05hbWUgPSAncmVzZXJ2YXRpb25zU2VjdGlvbic7XHJcbiAgICByZXNlcnZhdGlvbnNTZWN0aW9uLmlubmVySFRNTCA9IGBcclxuICAgIDxkaXYgY2xhc3M9XCJyZXNlcnZhdGlvbnNDb250YWluZXJcIj5cclxuICAgICAgPHAgY2xhc3M9XCJjbG9zZS1pY29uXCI+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+Y2xvc2U8L3NwYW4+PC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW92aWVEZXNjcmlwdGlvblwiPlxyXG4gICAgICAgIDxpbWcgY2xhc3M9XCJtb3ZpZUltYWdlXCIgc3JjPVwiJHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5pbWFnZS5tZWRpdW19XCIgd2lkdGg9XCI2MDBcIiBhbHQ9XCJzaW1wbGVcIj5cclxuICAgICAgICA8aDIgY2xhc3M9XCJtb3ZpZVRpdGxlIGhlYWRpbmdzXCI+JHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5uYW1lfTwvaDI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vdmllRGVzY3JpcHRpb25cIj4gJHttb3ZpZXNEZXRhaWxzQXJyW2luZGV4XS5zdW1tYXJ5fTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uQ29udGFpbmVyc1wiPlxyXG4gICAgICAgIDxoMiBjbGFzcz1cInJlc2VydmF0aW9uc0hlYWRpbmcgaGVhZGluZ3NcIj5SZXNlcnZhdGlvbnMoJHt0aGlzLnJlc2VydmF0aW9uQ291bnR9KTo8L2gyPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJleGlzdGluZ1Jlc2VydmF0aW9uc1wiPiA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbkNvbnRhaW5lcnNcIj5cclxuICAgICAgICA8aDIgY2xhc3M9XCJhZGRSZXNlcnZhdGlvbnNIZWFkaW5nIGhlYWRpbmdzXCI+UmVzZXJ2ZSBhIFNwb3Q6PC9oMj5cclxuICAgICAgICA8Zm9ybSBjbGFzcz1cInJlc2VydmF0aW9uRm9ybVwiPlxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIGlkPVwidXNlcm5hbWVcIiBuYW1lPVwidXNlcm5hbWVcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm1GaWVsZHNcIiB0eXBlPVwiZGF0ZVwiIHBsYWNlaG9sZGVyPVwiU3RhcnQgRGF0ZVwiIGlkPVwic3RhcnREYXRlXCIgbmFtZT1cInN0YXJ0RGF0ZVwiPlxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybUZpZWxkc1wiIHR5cGU9XCJkYXRlXCIgcGxhY2Vob2xkZXI9XCJFbmQgRGF0ZVwiIGlkPVwiZW5kRGF0ZVwiIG5hbWU9XCJlbmREYXRlXCI+XHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzdWJtaXRCdG5cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJSZXNlcnZlXCI+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PmA7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQocmVzZXJ2YXRpb25zU2VjdGlvbik7XHJcbiAgICBcclxuICAgIGNvbnN0IHJlc2VydmF0aW9uQ2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlLWljb24nKTtcclxuICAgIHRoaXMuY2xvc2VSZXNlcnZhdGlvbk1vZGFsKHJlc2VydmF0aW9uQ2xvc2VCdG5zKTtcclxuXHJcbiAgICBjb25zdCBwb3N0UmVzZXJ2YXRpb25EYXRhID0gbmV3IFBvc3RSZXNlcnZhdGlvbigpO1xyXG4gICAgcG9zdFJlc2VydmF0aW9uRGF0YS5tb3ZpZUlkID0gaW5kZXg7XHJcbiAgICBwb3N0UmVzZXJ2YXRpb25EYXRhLnNldHVwTGlzdGVuZXIoKTtcclxuXHJcbiAgfVxyXG5cclxuICBjbG9zZVJlc2VydmF0aW9uTW9kYWwocmVzZXJ2YXRpb25DbG9zZUJ0bnMpIHtcclxuICAgIGNvbnN0IHJlc2VydmF0aW9uc1NlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc2VydmF0aW9uc1NlY3Rpb24nKTtcclxuICAgIHJlc2VydmF0aW9uQ2xvc2VCdG5zLmZvckVhY2goKGVhY2gpID0+IGVhY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICByZXNlcnZhdGlvbnNTZWN0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiBlYWNoLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG4gICAgfSkpXHJcbiAgfVxyXG5cclxuICB1cGRhdGVDb3VudGVyKGZldGNoZWRSZXNlcnZhdGlvbkFycikge1xyXG4gICAgLy8gVXBkYXRlcyBjb3VudGVyXHJcbiAgICB0aGlzLnJlc2VydmF0aW9uQ291bnQgPSBmZXRjaGVkUmVzZXJ2YXRpb25BcnIubGVuZ3RoO1xyXG4gICAgY29uc3QgcmVzZXJ2YXRpb25zSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXNlcnZhdGlvbnNIZWFkaW5nJyk7XHJcbiAgICByZXNlcnZhdGlvbnNIZWFkaW5nLmZvckVhY2goKGVhY2gpID0+IGVhY2gudGV4dENvbnRlbnQgPSBgUmVzZXJ2YXRpb25zICgke3RoaXMucmVzZXJ2YXRpb25Db3VudH0pOmApXHJcbiAgfVxyXG5cclxuICBhc3luYyBkaXNwbGF5UmVzZXJ2YXRpb25zKGluZGV4KSB7XHJcbiAgICBjb25zdCBmZXRjaFJlc2VydmF0aW9ucyA9IG5ldyBGZXRjaFJlc2VydmF0aW9ucygpO1xyXG4gICAgZmV0Y2hSZXNlcnZhdGlvbnMubW92aWVJRCA9IGluZGV4O1xyXG4gICAgY29uc3QgZmV0Y2hlZFJlc2VydmF0aW9uID0gYXdhaXQgZmV0Y2hSZXNlcnZhdGlvbnMuZmV0Y2hSZXNlcnZhdGlvbnNEYXRhKCk7XHJcbiAgICBjb25zdCBmZXRjaGVkUmVzZXJ2YXRpb25BcnIgPSBBcnJheS5mcm9tKGZldGNoZWRSZXNlcnZhdGlvbik7XHJcbiAgICBjb25zdCBleGlzdGluZ1Jlc2VydmF0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leGlzdGluZ1Jlc2VydmF0aW9ucycpO1xyXG4gIFxyXG4gICAgLy8gQ2xlYXIgZXhpc3RpbmcgcmVzZXJ2YXRpb25zXHJcbiAgICBleGlzdGluZ1Jlc2VydmF0aW9ucy5mb3JFYWNoKChlYWNoKSA9PiBlYWNoLmlubmVySFRNTCA9ICcnKTtcclxuICAgIHRoaXMudXBkYXRlQ291bnRlcihmZXRjaGVkUmVzZXJ2YXRpb25BcnIpO1xyXG5cclxuICAgIGZldGNoZWRSZXNlcnZhdGlvbkFyci5mb3JFYWNoKChlYWNoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc2VydmF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICByZXNlcnZhdGlvbi50ZXh0Q29udGVudCA9ICBgJHtlYWNoLmRhdGVfc3RhcnR9IC0gJHtlYWNoLmRhdGVfZW5kfSBieSAke2VhY2gudXNlcm5hbWV9YDtcclxuICAgICAgZXhpc3RpbmdSZXNlcnZhdGlvbnMuZm9yRWFjaCgoZWFjaCkgPT4ge1xyXG4gICAgICAgIGVhY2guYXBwZW5kQ2hpbGQocmVzZXJ2YXRpb24pXHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICAgc2hvd1Jlc2VydmF0aW9ucygpIHtcclxuICAgIGNvbnN0IGJ0bnNBcnJheSA9IEFycmF5LmZyb20odGhpcy52aWV3UmVzZXJ2YXRpb25zQnRucyk7XHJcbiAgICBidG5zQXJyYXkuZm9yRWFjaCgoZWFjaCwgZWFjaGluZGV4KSA9PiB7XHJcbiAgICAgIGVhY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVSZXNlcnZhdGlvbnNNb2RhbChlYWNoaW5kZXgpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheVJlc2VydmF0aW9ucyhlYWNoaW5kZXgpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9