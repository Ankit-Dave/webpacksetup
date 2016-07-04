module.exports = {
    entry: './src/index.js',
    output: {
        path: './build',
        filename: 'app.bundle.js'
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader"            
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    eslint: {
        configFile:  __dirname + '/.eslintrc.json'
    }
};