var path = require('path');

module.exports = {
    entry: './src/main/js/index.jsx',
    devtool: 'source-map',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                use: [{
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                                 "@babel/preset-env",
                                ["@babel/preset-react", {"runtime": "automatic"}]
                             ]
                    }
                }]
            },
            //loaders for the CSS
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
              ]
            }
        ]
    }
};