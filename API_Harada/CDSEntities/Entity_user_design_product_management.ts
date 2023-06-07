/**
 *
 *
 * @export
 * @interface Entity_user_design_product_management
 */
export interface Entity_user_design_product_management {
    cr164_user_design_product_managementid: string, // AutoID
    cr164_sub_item_number: string, // CustomID
    cr164_original_item_number: string,
    cr164_order_number: string,
    cr164_sub_product_name: string,
    cr164_major_classification_code: string,
    cr164_middle_classification_code: string,
    cr164_subclass_code: string,
    cr164_sub_image_url: string,
    cr164_sub_base_color: string,
    cr164_user_id: string,
    cr164_remarks_information_1: string,
    cr164_remarks_information_2: string,
    cr164_remarks_information_3: string,
    cr164_created_date: any,
    cr164_checkout_token: string,

}

/**
 *
 *
 * @export
 * @Entity Entity_user_design_product_management
 */
export const CONST_column_user_design_product_management = {
    cr164_user_design_product_managementid: 'cr164_user_design_product_managementid',   // AutoID
    cr164_sub_item_number: 'cr164_sub_item_number',                                     // CustomID
    cr164_original_item_number: 'cr164_original_item_number',
    cr164_order_number: 'cr164_order_number',
    cr164_sub_product_name: 'cr164_sub_product_name',
    cr164_major_classification_code: 'cr164_major_classification_code',
    cr164_middle_classification_code: 'cr164_middle_classification_code',
    cr164_subclass_code: 'cr164_subclass_code',
    cr164_sub_image_url: 'cr164_sub_image_url',
    cr164_sub_base_color: 'cr164_sub-bass_color',
    cr164_user_id: 'cr164_user_id',
    cr164_remarks_information_1: 'cr164_remarks_information_1',
    cr164_remarks_information_2: 'cr164_remarks_information_2',
    cr164_remarks_information_3: 'cr164_remarks_information_3',
    cr164_created_date: 'cr164_created_date',
    cr164_checkout_token: 'cr164_checkout_token',
}
