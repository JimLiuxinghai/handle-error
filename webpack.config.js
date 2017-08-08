const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var plugins = [];
plugins.push(
    new HtmlWebpackPlugin({ 
        filename: __dirname+'/build/views/index.html', 
        template: './src/views/index.html'
    })
)

module.exports = {
    //cache: true,
    entry: {
        main: './src/main',
        findBug: './sdk/index',
        vendors: ['vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname, '/build/static/'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                enforce: "pre",
                loader: "eslint-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: "vue-style!css!less"
            },
            { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    'plugins': plugins,
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    externals: {
        'vue': 'window.Vue'
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false
        }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
