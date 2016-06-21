requirejs.config({
    baseUrl: requirejs.toUrl("./"),
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'wp-inlcudes': '../../../../wp-includes/js'
    },
    optimize: "uglify2",
    wrapShim: true,
    findNestedDependencies: true
});