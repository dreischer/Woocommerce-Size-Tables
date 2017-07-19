<?php

// add options tab to product admin page
add_filter('woocommerce_product_data_tabs', 'add_size_table_product_data_tab');
function add_size_table_product_data_tab ( $product_data_tabs ) {
    $product_data_tabs['size-table-tab'] = array(
        'label' => 'Size table',
        'target' => 'size_table_product_data',
        'class' => array('show_if_simple', 'show_if_variable'),
    );
    return $product_data_tabs;
}

// add style for new options tab
add_action('admin_head', 'wcpp_custom_style');
function wcpp_custom_style () {
  ?>
  <style>
  #woocommerce-product-data ul.wc-tabs li.size-table-tab_options a:before { font-family: WooCommerce; content: '\e006'; }
  </style>
  <?php
}

// add content of new options tab
add_action('woocommerce_product_data_panels', 'woocom_custom_product_data_fields');
function woocom_custom_product_data_fields () {
  global $post;
  ?>
  <div id='size_table_product_data' class='panel woocommerce_options_panel' >
    <div class = 'options_group' >
      <?php
      // Checkbox - show size table
      woocommerce_wp_checkbox(array(
        'id' => '_show_size_table',
        'label' => 'Show size table',
        'description' => 'Tick if size table should be shown on product page',
        'desc_tip' => true
      ));

      // Hidden field - contains size table data (through JS)
      woocommerce_wp_hidden_input(array(
      	'id' => '_size_table_data'
      ));
      ?>
      <div id="size_table_container"></div>
    </div>
  </div>
  <?php
}

// save data of new fields
add_action('woocommerce_process_product_meta', 'woocom_save_proddata_custom_fields');
function woocom_save_proddata_custom_fields ($post_id) {
  $checkbox = isset($_POST['_show_size_table']) ? 'yes' : 'no';
  update_post_meta($post_id, '_show_size_table', $checkbox);

	$hidden_field = $_POST['_size_table_data'];
	update_post_meta( $post_id, '_size_table_data', esc_attr( $hidden_field ) );
}

// load scripts
add_action('admin_enqueue_scripts', 'enqueue_scripts');
function enqueue_scripts ($page) {
  if($page != 'post.php') return;
  // wp_register_script('size-table-preact', plugin_dir_path( __FILE__ ) . 'assets/preact.js');
  // wp_enqueue_script('size-table-preact');

  wp_register_script('size-table-back-end', plugins_url( '../dist/back-end.js', __FILE__ ), null, null, true);
  wp_enqueue_script('size-table-back-end');
}
?>
