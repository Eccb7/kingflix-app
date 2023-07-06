import { getComments, createComment } from './comments.js';

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
      const comments = await getComments(movie.id);
      commentsCounter.innerText = `${comments.length} Comments`;
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
      await createComment(movie.id, username, comment);
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

export default createModal;
