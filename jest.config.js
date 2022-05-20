module.exports = {
  setupFiles: ['../jest.setup.js'],
  transform: { '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest' },
  testTimeout: 30000,
  coverageReporters: ['json', 'text', 'html', 'lcov', 'clover'],
  testEnvironment: 'jsdom',
  rootDir: './src'
};