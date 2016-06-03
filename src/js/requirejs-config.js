requirejs.config({
    baseUrl: requirejs.toUrl("./"),
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery'
    },
    optimize: "uglify2",
    wrapShim: true,
    findNestedDependencies: true
});
