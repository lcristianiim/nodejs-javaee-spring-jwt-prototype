const path = require('path');

module.exports = {
    context: path.join(__dirname, 'public', 'javascripts'),
    entry: {
        tokenHandler: './tokenHandler.js'
    },
    output: {
        path: path.join(__dirname, 'public', 'javascripts', 'dist'),
        filename: '[name].bundle.js'
     }
     // ,
    // module: {
    //     rules: [
    //         {
    //             test: /\.js&/,
    //             use: {
    //                 loader: 'babel-loader'
    //             },
    //             include: path.join(__dirname, 'public', 'javascripts')
    //         }
    //     ]
    // }
};
