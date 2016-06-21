<?php
/*
 * remove wp-embed javascript, since it's included via requirejs
 */
add_action('wp_print_scripts', function() {
    wp_deregister_script('wp-embed');
}, 100);

add_filter('neochic_woodlets_twig', function ($twig) {
    return $twig;
});
