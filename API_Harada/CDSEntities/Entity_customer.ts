/**
 *
 *
 * @export
 * @interface Entity_customer
 */
export interface Entity_customer {
    cr164_customer_id: string,
    cr164_first_name_kana: string,
    cr164_last_name_kana: string,
    cr164_sex: number,
    cr164_birthday: any,
    cr164_credit_card_number: string,
    cr164_credit_card_expiration_month: number,
    cr164_credit_card_expiration_year: number,
    cr164_cvv_result_code: string,
    cr164_credit_card_name: string,
    cr164_is_delete: boolean,

    cr164_code: string,
    cr164_new_email: string,
    cr164_confirm_date_email: any
}

/**
 *
 *
 * @export
 * @Entity Entity_customer
 */
export const CONST_column_customer = {
    cr164_customer_id: 'cr164_customer_id',
    cr164_first_name_kana: 'cr164_first_name_kana',
    cr164_last_name_kana: 'cr164_last_name_kana',
    cr164_sex: 'cr164_sex',
    cr164_birthday: 'cr164_birthday',
    cr164_credit_card_number: 'cr164_credit_card_number',
    cr164_credit_card_expiration_month: 'cr164_credit_card_expiration_month',
    cr164_credit_card_expiration_year: 'cr164_credit_card_expiration_year',
    cr164_cvv_result_code: 'cr164_cvv_result_code',
    cr164_credit_card_name: 'cr164_credit_card_name',
    cr164_is_delete: 'cr164_is_delete',
    cr164_code: 'cr164_code',
    cr164_new_email: 'cr164_new_email',
    cr164_confirm_date_email: 'cr164_confirm_date_email'
}