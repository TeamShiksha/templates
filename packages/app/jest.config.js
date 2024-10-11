export default {
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    testEnvironment: "node",
    transformIgnorePatterns: [
        "/node_modules/"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    }
};
