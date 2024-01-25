module.exports = {
  // preset: 'ts-jest',
  transform: {
    // '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/src/__mock__/fileMock.js',
      '\\.(css|less)$': '<rootDir>/test/__mock__/styleMock.js',
  },
  "testEnvironment": "<rootDir>/test/test-config/env-setup.js",
  "setupFilesAfterEnv": ["<rootDir>/test/test-config/dom-setup.js"]
};