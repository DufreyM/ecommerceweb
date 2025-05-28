module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/tests/**/*.test.jsx', '**/?(*.)+(spec|test).jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
};
