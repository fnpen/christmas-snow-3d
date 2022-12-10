<?php
/**
 * Plugin Name:       Christmas Snow 3D
 * Plugin URI:        https://ilyazolotov.com/projects/christmas-snow-3d
 * Description:       Add christmas mood to your site.
 *
 * Text Domain:       christmas-snow-3d
 * 
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * Author:            Ilya Zolotov
 * Author URI:        https://ilyazolotov.com/
 * Version:           1.0.1
 * Requires at least: 5.7
 * Tested up to:      6.0.2
 * Requires PHP:      5.6
 *
 * @package           ChristmasSnow3d
 */

namespace ChristmasSnow3d;

/**
 * Includes asset.
 *
 * @return void
 */
function wp_enqueue_scripts() {
	$script_asset_path = __DIR__ . '/build/snow3d.asset.php';
	if ( file_exists( $script_asset_path ) ) {
		$script_asset = include $script_asset_path;

		wp_enqueue_script( 'christmas-snow-3d', plugins_url( 'build/snow3d.js', __FILE__ ), [], $script_asset['version'], true );
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\wp_enqueue_scripts' );

/**
 * Adds async attributes to the script tag.
 *
 * @param string $tag    The `<script>` tag for the enqueued script.
 * @param string $handle The script's registered handle.
 * @return mixed
 */
function add_async_attribute( $tag, $handle ) {
	if ( 'christmas-snow-3d' === $handle ) {
		return str_replace( '<script ', '<script async ', $tag );
	}

	return $tag;
}
add_filter( 'script_loader_tag', __NAMESPACE__ . '\\add_async_attribute', 10, 2 );
