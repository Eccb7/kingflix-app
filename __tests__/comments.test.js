import updateComments from '../src/commentsModal/modal.js';
import { getComments } from '../src/commentsModal/comments.js';

jest.mock('../src/commentsModal/comments.js');

describe('updateComments', () => {
  it('should update the comments counter', async () => {
    const commentsMock = [

    ];

    getComments.mockResolvedValue(commentsMock);

    const movie = {
      id: 1,
      image: { medium: 'image.jpg' },
      name: 'Movie',
      summary: 'Summary',
    };

    // Create a mock DOM structure
    document.body.innerHTML = `
      <div id="comments-section">
        <p id="comments-counter">Comments (0)</p>
      </div>
    `;

    // Call the updateComments function
    await updateComments(movie);

    // Get the comments counter element
    const commentsCounter = document.getElementById('comments-counter');

    // Expect the comments counter to be updated
    expect(commentsCounter.textContent).toBe(`Comments (${commentsMock.length})`);
  });
});
