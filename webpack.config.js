const path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/src/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist')
    },
    module: {
        rules: [{
            test: /\.(scss)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: () => [
                            require('autoprefixer')
                        ]
                    }
                }
            }, {
                loader: 'sass-loader'
            }]
        }]
    }
};
