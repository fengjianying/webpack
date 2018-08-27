const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    //入口文件及配置项
    entry: {
        //页面函数模块
        main: './src/js/main.js',
        main2: './src/js/main2.js'
    },
    //出口文件及配置项
    output: {
        //打包路径
        path: path.resolve(__dirname, '../dist'),
        //打包文件名称
        filename: '[name]-[hash].js'
    },
    //模块:例如解读css 图片转换,压缩
    module: {
        rules: [
            // css loader
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // less
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            //图片加载
            {
                test: /\.(png|jpg|gif|jpeg)/,
                use: [{
                    loader: 'url-loader',
                    options: { // 这里的options选项参数可以定义多大的图片转换为base64
                        limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath: 'image' //定义输出的图片文件夹
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }
        ]
    },
    //插件 用于生产的模板和各项功能
    plugins: [
        new htmlPlugin({
            minify: { //是对html文件进行压缩
                removeAttributeQuotes: true //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/index.html', //是要打包的html模版路径和文件名称。
            showErrors: true,

        })
    ],
    //配置webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, '../dist'),
        //服务器IP地址,可以使用ip或者localhost
        host: 'localhost',
        //自动打开浏览器
        open: true,
        //配置服务端口号
        port: 8888
    }
}