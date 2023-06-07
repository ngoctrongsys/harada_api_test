/**
 *
 *
 * @export
 * @interface Entity_order_management
 */
export interface Entity_order_management {
    cr164_order_managementid: string,           // AutoID
    cr164_order_number: string,                 // CustomID
    cr164_original_item_number: string,
    cr164_sub_item_number: string,
    cr164_user_id: string,
    cr164_major_classification_code: string,
    cr164_middle_classification_code: string,
    cr164_subclass_code: string,
    cr164_base_color: string,
    cr164_size: number,
    cr164_quantity: number,
    cr164_finishing_method_classification: number,
    cr164_remarks_information_1: string,
    cr164_remarks_information_2: string,
    cr164_remarks_information_3: string,
    cr164_created_date: any,
    cr164_payment_classification: number,
    cr164_settlement_date: any,
    cr164_checkout_token: string,
}

/**
 *
 *
 * @export
 * @Entity Entity_order_management
 */
export const CONST_column_order_management = {
    cr164_order_managementid: 'cr164_order_managementid',           // AutoID
    cr164_order_number: 'cr164_order_number',                       // CustomID
    cr164_original_item_number: 'cr164_original_item_number',
    cr164_sub_item_number: 'cr164_sub_item_number',
    cr164_user_id: 'cr164_user_id',
    cr164_major_classification_code: 'cr164_major_classification_code',
    cr164_middle_classification_code: 'cr164_middle_classification_code',
    cr164_subclass_code: 'cr164_subclass_code',
    cr164_base_color: 'cr164_base_color',
    cr164_size: 'cr164_size',
    cr164_quantity: 'cr164_quantity',
    cr164_finishing_method_classification: 'cr164_finishing_method_classification',
    cr164_remarks_information_1: 'cr164_remarks_information_1',
    cr164_remarks_information_2: 'cr164_remarks_information_2',
    cr164_remarks_information_3: 'cr164_remarks_information_3',
    cr164_created_date: 'cr164_created_date',
    cr164_payment_classification: 'cr164_payment_classification',
    cr164_settlement_date: 'cr164_settlement_date',
    cr164_checkout_token: 'cr164_checkout_token',

}