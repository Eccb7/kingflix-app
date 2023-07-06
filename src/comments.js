const getComments = async (itemId) => {
  try {
    const response = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/:XTyHQABn3ej42SK28nbc/comments?item_id=${itemId}`,
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
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/:XTyHQABn3ej42SK28nbc/comments',
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

export { getComments, createComment };
