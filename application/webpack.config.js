var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: "./src/main",
    output: {
        path: "/Workspaces2018/mstps/WebRoot/static/js/carInf/mobile",
        filename: "bundle.js"
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.jsx', '.js', '.json'],
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },{
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            },{ 
                test: /\.(svg)$/i, 
                loader: 'svg-sprite', 
                include: [require.resolve('antd-mobile').replace(/warn\.js$/, '')]
            },{ 
                test: /\.css$/, 
                loader: 'style!css' 
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }

        }),
        new webpack.BannerPlugin("民盛保险 版权所有")
    ],
};