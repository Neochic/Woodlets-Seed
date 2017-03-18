var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanCSSPlugin = require("less-plugin-clean-css");
var AutoprefixPlugin = require("less-plugin-autoprefix");

module.exports = {
    entry: [
        "./src/js/main.ts",
        "./src/style.less"
    ],
    output: {
        path: "./src/js/",
        filename: "main-build.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: [
        new ExtractTextPlugin("../style.css")
    ],
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ use: 'css-loader' })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { url: false }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                plugins: [
                                    new CleanCSSPlugin({advanced: true}),
                                    new AutoprefixPlugin()
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    }
};
