/**
 *
 *
 * @export
 * @interface Entity_classification_master
 */
export interface Entity_classification_master {
    cr164_classification_masterid: string,          // AutoID
    cr164_major_classification_code: string,
    cr164_major_classification_name: string,
    cr164_middle_classification_code: string,
    cr164_middle_classification_name: string,
    cr164_subclass_code: string,                    // CustomID
    cr164_subclass_name: string,
}

/**
 *
 *
 * @export
 * @Entity Entity_classification_master
 */
export const CONST_column_classification_master = {
    cr164_classification_masterid: 'cr164_classification_masterid',             // AutoID
    cr164_major_classification_code: 'cr164_major_classification_code',
    cr164_major_classification_name: 'cr164_major_classification_name',
    cr164_middle_classification_code: 'cr164_middle_classification_code',
    cr164_middle_classification_name: 'cr164_middle_classification_name',
    cr164_subclass_code: 'cr164_subclass_code',                                 // CustomID
    cr164_subclass_name: 'cr164_subclass_name',
}
