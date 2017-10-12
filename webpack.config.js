var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanCSSPlugin = require("less-plugin-clean-css");
var AutoprefixPlugin = require("less-plugin-autoprefix");
var path = require('path');
var fs = require('fs-extra');

/*
 * Capitalize drive letter on windows as workaround for
 * webpack bug.
 * https://github.com/webpack/webpack/issues/4530
 */
var outputPath = path.resolve(__dirname, 'src/');
outputPath = outputPath.charAt(0).toUpperCase() + outputPath.slice(1);

module.exports = {
    entry: [
        "./src/js/main.ts",
        "./src/style.less"
    ],
    output: {
        path: outputPath,
        filename: "main-build.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
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
                                    {
                                        // inline less plugin to rewrite ../node_modules directory, which
                                        // is not in theme path, to vendor-assets/
                                        // also copies files and adds cachebust
                                        install: function(less, pluginManager) {
                                            pluginManager.addPostProcessor({
                                                process: function(css) {
                                                    fs.removeSync('src/vendor-assets');
                                                    const cacheBustTimestamp = Date.now();
                                                    return css.replace(/url\((['"]?)\.\.\/node_modules\/(.*?)(['"]?)\)/g, function(match, offset, filePath) {
                                                        filePath = filePath.split(/[?#]+/)[0];
                                                        const extLength = path.extname(filePath).length;
                                                        const filePathWithCacheBust = filePath.slice(0, extLength*-1)+'-'+cacheBustTimestamp+filePath.slice(extLength*-1);
                                                        fs.ensureDirSync(path.dirname('src/vendor-assets/'+filePathWithCacheBust));
                                                        fs.copySync('node_modules/'+filePath, 'src/vendor-assets/'+filePathWithCacheBust);
                                                        return match.replace('../node_modules/'+filePath, 'vendor-assets/'+filePathWithCacheBust);
                                                    });
                                                }
                                            });
                                        }
                                    },
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
