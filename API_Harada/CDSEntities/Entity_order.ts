/**
 *
 *
 * @export
 * @interface Entity_order
 */
export interface Entity_order {
    cr164_order_id: string,
    cr164_order_no: string,
    cr164_customer_id: string,

    cr164_shipping_address_first_name_kana: string,
    cr164_shipping_address_last_name_kana: string,

    cr164_payment_credit_card_number: string,
    cr164_payment_credit_card_expiration_month: number,
    cr164_payment_credit_card_expiration_year: number,
    cr164_payment_cvv_result_code: string,
    cr164_payment_credit_card_name: string,

    cr164_is_completed: boolean,

    cr164_total_price: string,
}

/**
 *
 *
 * @export
 * @Entity Entity_order
 */
export const CONST_column_order = {

    cr164_order_id: 'cr164_order_id',
    cr164_order_no: 'cr164_order_no',
    cr164_customer_id: 'cr164_customer_id',

    cr164_shipping_address_first_name_kana: 'cr164_shipping_address_first_name_kana',
    cr164_shipping_address_last_name_kana: 'cr164_shipping_address_last_name_kana',

    cr164_payment_credit_card_number: 'cr164_payment_credit_card_number',
    cr164_payment_credit_card_expiration_month: 'cr164_payment_credit_card_expiration_month',
    cr164_payment_credit_card_expiration_year: 'cr164_payment_credit_card_expiration_year',
    cr164_payment_cvv_result_code: 'cr164_payment_cvv_result_code',
    cr164_payment_credit_card_name: 'cr164_payment_credit_card_name',

    cr164_is_completed: 'cr164_is_completed',

    cr164_total_price: 'cr164_total_price'

}