<?php

// add tab to actual product page
add_filter( 'woocommerce_product_tabs', 'woo_add_size_table_tab' );
function woo_add_size_table_tab ($tabs) {
  if (get_post_meta(get_the_ID(), '_show_size_table', true) == 'no') {
    return $tabs;
  }

  $tabs['size_table_tab'] = array(
    'title' 	=> __( 'Size guide', 'woocommerce' ),
    'priority' 	=> 50,
    'callback' 	=> 'size_table_tab_content'
  );

  add_action('get_footer', 'sizeTable_add_footer_styles');

  return $tabs;
}

function size_table_tab_content () {
  $json = htmlspecialchars_decode(get_post_meta(get_the_ID(), '_size_table_data', true));
  $data = json_decode($json)->sizes;

  function build_table ($array) {
    $html = '<table>';

    foreach ($array as $rowIndex => $cells) {
      $html .= '<tr>';

      foreach ($cells as $columnIndex => $val) {
        $openTag = $rowIndex == 0 ? '<th>' : '<td>';
        $closeTag = $rowIndex == 0 ? '</th>' : '</td>';
        $value = $rowIndex == 0 && $columnIndex == 0 ? 'Size' : $val;

        $html .= $openTag . $value . $closeTag;
      }

      $html .= '</tr>';
    }

    $html .= '</table>';

    return $html;
  }

  echo '<div class="size-table">';
  echo '<div class="size-table-description">All measurements are in cm</div>';
  echo build_table($data);
  echo '</div>';
}

function sizeTable_add_footer_styles () {
  $path = plugins_url( 'style.css', __FILE__ );
  wp_enqueue_style('size-table', $path);
};

?>
