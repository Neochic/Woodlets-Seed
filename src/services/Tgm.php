<?php
require_once(__DIR__ . '/../vendor/tgmpa/tgm-plugin-activation/class-tgm-plugin-activation.php');

add_action( 'tgmpa_register', function() {
	$plugins = array(
		array(
			'name'               => 'Woodlets',
			'slug'               => 'woodlets',
			'source'             => 'https://github.com/Neochic/Woodlets/releases/download/v0.5.0/woodlets-v0.5.0-bundled.zip',
			'required'           => true,
			'force_activation'   => true,
			'force_deactivation' => true
		)
	);

	$config = array(
		'id'           => 'woodlets_seed',
		'menu'         => 'tgmpa-install-plugins',
		'parent_slug'  => 'themes.php',
		'capability'   => 'edit_theme_options',
		'has_notices'  => true,
		'dismissable'  => true,
		'is_automatic' => false,
		'message'      => ''
	);

	tgmpa( $plugins, $config );
});
