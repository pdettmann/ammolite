import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './'});

export default createJestConfig({
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
})
