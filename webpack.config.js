var path = require('path');

module.exports = {
    entry: './src/main/js/index.tsx',
    devtool: 'inline-source-map',
    cache: true,
    mode: 'development',
    //mode: 'production',
    stats: {
        errorDetails: true,
        children: true
    },
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static/built'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".tsx", "*.css"]
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/,
                exclude: /(node_modules)/,
                // using two loaders for the typescript/JavaScript
                // ts-loader run first
                //    this fails on typescript errors
                //    but the "jsx": "preserve" option in tsconfig.json means the jsx is not converted to JavaScript
                // babel-loader runs second
                //    this converts the jsx to JavaScript
                //    adds any polyfills that are required (functions for browser backward compatibility)
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                     "@babel/preset-env",
                                     "@babel/preset-typescript",
                                    ["@babel/preset-react", {"runtime": "automatic"}]
                                 ]
                        }
                    },
                    {
                        loader: 'ts-loader',
                    },
                ]
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