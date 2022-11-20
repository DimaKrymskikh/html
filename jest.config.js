module.exports = {
    automock: false,
    setupFiles: [
        './setupJest.js'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'mocks/fileMock.js',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    }
};
