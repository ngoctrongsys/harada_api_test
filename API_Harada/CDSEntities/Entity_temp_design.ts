/**
 *
 *
 * @export
 * @interface Entity_temp_design
 */
 export interface Entity_temp_design {
    cr164_temp_design_id: string,  
    cr164_product_id: string,
    cr164_product_name: string,
    cr164_category_name: string,
    cr164_category_code: string,
    cr164_size: string,
    cr164_base_color: string,              
    cr164_quantity: number,
    cr164_price: string,
    cr164_sku: string,
    cr164_image_fit_type: string,
    cr164_design_3d_image_src: any,
    cr164_design_output_image_src: any,
    cr164_image_thumbnail: string,
    cr164_key_localstorage: string,
    cr164_note: string,
    cr164_variant_id: string
}

/**
 *
 *
 * @export
 * @Entity Entity_temp_design
 */
export const CONST_column_temp_design = {
    cr164_temp_design_id: 'cr164_temp_design_id',   
    cr164_product_id: 'cr164_product_id',
    cr164_product_name: 'cr164_product_name',
    cr164_category_name: 'cr164_category_name',
    cr164_category_code: 'cr164_category_code',
    cr164_size: 'cr164_size',
    cr164_base_color: 'cr164_base_color',         
    cr164_quantity: 'cr164_quantity',
    cr164_price: 'cr164_price',
    cr164_sku: 'cr164_sku',
    cr164_image_fit_type: 'cr164_image_fit_type',
    cr164_design_3d_image_src: 'cr164_design_3d_image_src',
    cr164_design_output_image_src: 'cr164_design_output_image_src',
    cr164_image_thumbnail: 'cr164_image_thumbnail',
    cr164_key_localstorage: 'cr164_key_localstorage',
    cr164_note: 'cr164_note',
    cr164_variant_id: 'cr164_variant_id'
}
