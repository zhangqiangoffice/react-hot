const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const pxtorem = require('postcss-pxtorem');

module.exports = {

    entry: "./src/main",
    output: {
        path: "/Workspaces2018/mstps/WebRoot/static/js/application/mobile",
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
                loader: 'style!css!postcss' 
            },{ 
              test: /\.less$/, 
              loader: "style!css?modules&localIdentName=[hash:base64:10]!postcss!less" 
            }
        ]
    },
    postcss: function () {
      return [
          autoprefixer({
              browsers: ['last 3 versions', '> 1%']
          }),
          pxtorem({
              rootValue: 100,
              propWhiteList: [],
          }),
          cssnano
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