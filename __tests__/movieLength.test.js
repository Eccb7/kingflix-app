import movieNum from '../src/movieLength.js';

jest.mock('node-fetch');

describe('movieNum', () => {
  it('should return the number of objects in the response array', async () => {
    const responseData = [
      { id: 1, name: 'Episode 1' },
      { id: 2, name: 'Episode 2' },
      { id: 3, name: 'Episode 3' },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseData),
    });

    const result = await movieNum();

    expect(result).toBe(responseData.length);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.tvmaze.com/shows/1/episodes',
    );
  });
});
