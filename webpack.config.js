const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            loader: "file-loader",
        },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.scss', 'jpeg', 'jpg', 'png', 'gif', 'woff', 'woff2', 'eot', 'ttf', 'svg'],
        modules: [__dirname, 'node_modules'],
        alias: {
            '/': path.join(__dirname, 'src'),
            'pages': path.join(__dirname, 'src/pages'),
            'router': path.join(__dirname, 'src/router'),
            'store': path.join(__dirname, 'src/store'),
            'container': path.join(__dirname, 'src/container'),
            'components': path.join(__dirname, 'src/components'),
            'constants': path.join(__dirname, 'src/constants'),
            'theme': path.join(__dirname, 'src/theme'),
            'i18n': path.join(__dirname, 'src/i18n'),
            'assets': path.join(__dirname, 'src/assets'),
            'hooks': path.join(__dirname, 'src/hooks'),
            'flows': path.join(__dirname, 'src/flows'),
            'render': path.join(__dirname, 'src/render'),
        },
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
};