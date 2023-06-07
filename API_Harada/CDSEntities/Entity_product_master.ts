
/**
 *
 *
 * @export
 * @interface Entity_product_master
 */
export interface Entity_product_master {
    cr164_product_masterid: string,         // AutoID
    cr164_item_number: string,              // CustomID
    cr164_product_name: string,
    cr164_major_classification_code: string,
    cr164_middle_classification_code: string,
    cr164_subclass_code: string,
    cr164_image_url: string,
    cr164_base_color: string,

}

/**
 *
 *
 * @export
 * @Entity Entity_product_master
 */
export const CONST_column_product_master = {
    cr164_product_masterid: 'cr164_product_masterid',   // AutoID
    cr164_item_number: 'cr164_item_number',             // CustomID
    cr164_product_name: 'cr164_product_name',
    cr164_major_classification_code: 'cr164_major_classification_code',
    cr164_middle_classification_code: 'cr164_middle_classification_code',
    cr164_subclass_code: 'cr164_subclass_code',
    cr164_image_url: 'cr164_image_url',
    cr164_base_color: 'cr164_base_color',
}