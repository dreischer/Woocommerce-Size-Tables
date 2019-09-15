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

// add content of new options tab
add_action('woocommerce_product_data_panels', 'woocom_custom_product_data_fields');
function woocom_custom_product_data_fields ($post_id) {
  global $post;
  ?>
  <div id='size_table_product_data' class='panel woocommerce_options_panel' >
    <div class = 'options_group' >
      <?php
      // Checkbox - show size table
      woocommerce_wp_checkbox(array(
        'id' => '_show_size_table',
        'label' => 'Show size table',
        'description' => 'Tick to show size table on product page',
        'desc_tip' => true
      ));

      woocommerce_wp_text_input(array(
        'type' => 'number',
        'placeholder' => 25,
        'id' => '_size_table_custom_priority',
        'label' => 'Custom tab priority',
        'description' => 'This field is optional. The default value is 25. Set the value to e.g. 1 to make the table show first.',
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

  $priority = isset($_POST['_size_table_custom_priority']) ? $_POST['_size_table_custom_priority'] : 25;
  update_post_meta($post_id, '_size_table_custom_priority', $priority);

	$hidden_field = $_POST['_size_table_data'];
	update_post_meta( $post_id, '_size_table_data', esc_attr( $hidden_field ) );
}

// load scripts
add_action('admin_enqueue_scripts', 'enqueue_scripts');
function enqueue_scripts ($page) {

  if (!preg_match('/post(-new)?\.php/i', $page)) return;
  wp_register_script('size-table-back-end', plugins_url( 'js/back-end.js', __FILE__ ), null, null, true);
  wp_enqueue_script('size-table-back-end');
}
?>
