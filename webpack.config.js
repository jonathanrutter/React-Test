var path = require('path');

module.exports = {
    entry: './src/main/js/index.jsx',
    devtool: 'source-map',
    cache: true,
    mode: 'development',
    //mode: 'production',
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static/built'),
        filename: 'bundle.js',
        publicPath: '/'
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