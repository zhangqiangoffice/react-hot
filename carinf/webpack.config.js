var webpack = require('webpack');
var path = require('path');

module.exports = {

    // 车险
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            },
            { 
                test: /\.(svg)$/i, 
                loader: 'svg-sprite', 
                include: [
                require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
                path.resolve(__dirname, 'src/my-project-svg-foler')]
            },
            { 
                test: /\.css$/, 
                loader: 'style!css' 
            } // 把css处理成内联style，动态插入到页面
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