const path = require('path');
const webpack = require ('webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: './external_products/smas/sif_engine/user_agent/sif_engine.ts',
    output: {
        path: path.join(__dirname, "dist", "server"),
        filename: 'sif_engine.js'
    },
    resolve: {
        // Add `.ts` and `.js` as a resolvable extensions and the ones used by webpack itself.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        // Add the paths to resolve the module dependencies for webpack
        modules: [
            path.resolve(__dirname, "external_libraries/smas/communication/general"),
            path.resolve(__dirname, "external_libraries/smas/communication/sif"),
            path.resolve(__dirname, "external_libraries/smas/communication/websocket"),
            path.resolve(__dirname, "external_libraries/smas/system_interface_framework/core"),
            path.resolve(__dirname, "external_libraries/smas/system_interface_framework/web_application"),
            path.resolve(__dirname, "node_modules")
        ]
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { 
            test: /\.tsx?$/, 
            
            loader: 'ts-loader' },
        {
            test: /\.html$/,
            use: ['html-loader']
        }
      ]
    },
    plugins: [
        new FileManagerPlugin({
            onEnd: {
              copy: [
              ],
              move: [
              ],
              delete: [
              ],
              mkdir: [
              ],
              archive: [
              ]
            }
          })
    ]
}
