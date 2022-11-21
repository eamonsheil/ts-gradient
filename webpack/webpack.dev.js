// config file for the Development environment
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    // enable webpacks hot module replacement
    devServer: {
        hot:true,
        open:true
    },
    // "cheap-module-source-map" is the value recommended by create-react-app
    // this controls generation of source maps for the app's code
    devtool: 'cheap-module-source-map',
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],
}