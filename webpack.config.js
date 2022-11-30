const path = require('path');

module.exports = {
    entry: {
        factories: './src/javascript/factories.js',
        startBattle: './src/javascript/startBattle.js',
        gameSetup: './src/javascript/gameSetup.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};