<?php

// add tab to actual product page
add_filter( 'woocommerce_product_tabs', 'woo_add_size_table_tab' );
function woo_add_size_table_tab ($tabs) {
  if (get_post_meta(get_the_ID(), '_show_size_table', true) == 'no') {
    return $tabs;
  }

  $tabs['size_table_tab'] = array(
    'title' 	=> __( 'Size table', 'woocommerce' ),
    'priority' 	=> 50,
    'callback' 	=> 'size_table_tab_content'
  );

  return $tabs;
}

function size_table_tab_content () {
  echo '<h2>Size table</h2>';
  echo '<p>Here\'s your new product tab.</p>';
  echo '<p class="abc"></p>';
}

?>
