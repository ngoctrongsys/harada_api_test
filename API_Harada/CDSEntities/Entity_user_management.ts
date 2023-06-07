/**
 *
 *
 * @export
 * @interface Entity_user_management
 */
export interface Entity_user_management {
    cr164_user_managementid: string,        // AutoID
    cr164_user_id: string,                  // CustomID
    cr164_user_pw: string,
    cr164_last_name: string,
    cr164_hiragana_m: string,
    cr164_given_names: string,
    cr164_hiragana_n: string,
    cr164_sex: number,
    cr164_street_address: string,
    cr164_birthday: number,
    cr164_age: number,
    cr164_country_of_citizenship: string,
    cr164_phone_number: string,
}


/**
 *
 *
 * @export
 * @Entity Entity_user_management
 */
export const CONST_column_user_management = {
    cr164_user_managementid: 'cr164_user_managementid',     // AutoID
    cr164_user_id: 'cr164_user_id',                         // CustomID
    cr164_user_pw: 'cr164_user_pw',
    cr164_last_name: 'cr164_last_name',
    cr164_hiragana_m: 'cr164_hiragana_m',
    cr164_given_names: 'cr164_given_names',
    cr164_hiragana_n: 'cr164_hiragana_n',
    cr164_sex: 'cr164_sex',
    cr164_street_address: 'cr164_street_address',
    cr164_birthday: 'cr164_birthday',
    cr164_age: 'cr164_age',
    cr164_country_of_citizenship: 'cr164_country_of_citizenship',
    cr164_phone_number: 'cr164_phone_number',
}
