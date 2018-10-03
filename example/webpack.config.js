const path = require('path');

module.exports = {
    mode:'development',
    entry: {
        index: './index.js',
        antd: './antd.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        // chunkFilename: '[name].bundle.js',
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};