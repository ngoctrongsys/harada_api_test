/**
 *
 *
 * @export
 * @interface Entity_order_details
 */
export interface Entity_order_details {
    cr164_order_details_id: string,  
    cr164_order_id: string,
    cr164_line_items_id: string,
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
    cr164_image_thumbnail: string,
    cr164_note: string,
    cr164_variant_id: string,

    cr164_status: string,
    cr164_reason: string,

    cr164_is_delete: boolean,
    cr164_slip_no: string,
    cr164_shipments_due: any,
    cr164_return: string,

    cr164_temp_design_id: string,
}

/**
 *
 *
 * @export
 * @Entity Entity_order_details
 */
export const CONST_column_order_details = {
    cr164_order_details_id: 'cr164_order_details_id',   
    cr164_order_id: 'cr164_order_id',
    cr164_line_items_id: 'cr164_line_items_id',
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
    cr164_image_thumbnail: 'cr164_image_thumbnail',
    cr164_note: 'cr164_note',
    cr164_variant_id: 'cr164_variant_id',

    cr164_status: 'cr164_status',
    cr164_reason: 'cr164_reason',

    cr164_is_delete: 'cr164_is_delete',
    cr164_slip_no: 'cr164_slip_no',
    cr164_shipments_due: 'cr164_shipments_due',
    cr164_return: 'cr164_return',
    
    cr164_temp_design_id: 'cr164_temp_design_id',
}
