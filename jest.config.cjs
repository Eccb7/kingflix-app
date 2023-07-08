module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
  },
};
