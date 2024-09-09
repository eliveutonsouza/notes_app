/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testTimeout: 20000,
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
};
