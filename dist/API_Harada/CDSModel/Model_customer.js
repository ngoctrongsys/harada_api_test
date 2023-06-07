"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model_customer = void 0;
const Entity_customer_1 = require("../CDSEntities/Entity_customer");
const Constants_1 = require("../Constants");
const Model_base_1 = require("./Model_base");
/**
 *
 * @export
 * @class Model_customer
 */
class Model_customer {
}
exports.Model_customer = Model_customer;
/**
 * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
 * Using Plural name of table [s]
 * Table Name on Power Apps
 * @static
 * @memberof Model_customer
 */
Model_customer.mTableName = `${Constants_1.CONST_CDS_PREFIX}customers`;
/**
 *
 * Primary Key -> Custom of PowerApps
 * @static
 * @memberof Model_customer
 */
Model_customer.mPrimaryKeyCustom = `${Constants_1.CONST_CDS_PREFIX}customer_ID`;
/**
 *
 * Get list of Customer
 * @static
 * @memberof Model_customer
 */
Model_customer.GetAllCustomer = () => {
    //#region Query Option
    let queryOption = `?$select=`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_customer_id},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_first_name_kana},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_last_name_kana},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_sex},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_birthday},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_credit_card_number},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_credit_card_expiration_month},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_credit_card_expiration_year},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_cvv_result_code},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_credit_card_name},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_is_delete},`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_customer.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
/**
 *
 * Get Customer detail by Id
 * @param customID -> @cr164_customer_id
 * @static
 * @memberof Model_customer
 */
Model_customer.GetDetailCustomerById = (customID) => {
    //#region Query Option
    let queryOption = `?$filter=${Entity_customer_1.CONST_column_customer.cr164_customer_id} eq '${customID}'`;
    queryOption += ` and ${Entity_customer_1.CONST_column_customer.cr164_is_delete} eq false`;
    queryOption += `&$select=`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_customer_id},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_first_name_kana},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_last_name_kana},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_sex},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_birthday},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_credit_card_number},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_credit_card_expiration_month},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_credit_card_expiration_year},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_cvv_result_code},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_credit_card_name},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_is_delete},`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_customer.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then((arrData) => {
            resolve(arrData[0]);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
/**
 *
 * Check Unsubscribed Customer by Id
 * @param customID -> @cr164_customer_id
 * @static
 * @memberof Model_customer
 */
Model_customer.CheckUnsubscribedCustomerById = (customID) => {
    //#region Query Option
    let queryOption = `?$filter=${Entity_customer_1.CONST_column_customer.cr164_customer_id} eq '${customID}'`;
    queryOption += `&$select=`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_is_delete},`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_customer.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then((arrData) => {
            let result = arrData[0];
            if (!result) {
                result = {
                    cr164_is_delete: false,
                };
            }
            let isExist = false;
            if (result.cr164_is_delete) {
                isExist = true;
            }
            resolve(isExist);
        }).catch(errorMessage => {
            console.log('___ERROR____', errorMessage);
            reject(false);
        });
    });
};
/**
 *
 * Insert a Customer
 * @param dataJson
 * @static
 * @memberof Model_customer
 */
Model_customer.Insert = (dataJson) => {
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_customer.mTableName}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodPost(queryStr, dataJson).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
/**
 *
 * @param customID is  @cr164_customer_id(Custom)
 * Ref to: To set up an Alternate Key
 *          -> https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api#retrieve-using-an-alternate-key
 *          -> https://carldesouza.com/using-upsert-in-c-dynamics-365/
 * @static
 * @memberof Model_customer
 */
Model_customer.UpdateCustomerByAlternatePrimaryKey = (customID, dataUpdate) => {
    const altKey = `(${Entity_customer_1.CONST_column_customer.cr164_customer_id} = '${customID}')`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_customer.mTableName}${altKey}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodPatch(queryStr, dataUpdate).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
/**
 *
 * @param customID
 *              -> @cr164_customerid(Auto) != @cr164_customer_id(Custom)
 * @static
 * @memberof Model_customer
 */
Model_customer.UpdateCustomerBySingleField = (customID, filedName, dataUpdate) => {
    const altKey = `(${Entity_customer_1.CONST_column_customer.cr164_customer_id} = '${customID}')`;
    const propertyName = `/${filedName}`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_customer.mTableName}${altKey}${propertyName}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodPut(queryStr, dataUpdate).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
//#region For Unique Identifier
/**
 * Function update Entity by [@UniqueIdentifier]
 * @param customID is @cr164_customerid(Unique identifier)
 *      Examp: Entity with the primary key accountid value equal to 00000000-0000-0000-0000-000000000001
 * @static
 * @memberof Model_customer
 */
Model_customer.UpdateCustomerByUniqueIdentifier = (uniqueIdentifier, dataUpdate) => {
    const primaryKey = `(${uniqueIdentifier})`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_customer.mTableName}${primaryKey}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodPatch(queryStr, dataUpdate).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
//#endregion
/**
 *
 * @param customID is  @cr164_customer_id(Custom)
 * Ref to: To set up an Alternate Key
 *          -> https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api#retrieve-using-an-alternate-key
 *          -> https://carldesouza.com/using-upsert-in-c-dynamics-365/
 * @static
 * @memberof Model_customer
 */
Model_customer.UpdateCustomerByMultipleField = (customID, dataUpdate) => {
    const altKey = `(${Entity_customer_1.CONST_column_customer.cr164_customer_id} = '${customID}')`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_customer.mTableName}${altKey}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodPatch(queryStr, dataUpdate).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            console.log("errorMessage", errorMessage);
            reject(errorMessage);
        });
    });
};
Model_customer.GetDetailCustomerByCode = (code) => {
    //#region Query Option
    let queryOption = `?$filter=${Entity_customer_1.CONST_column_customer.cr164_code} eq '${code}'`;
    queryOption += `&$select=`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_customer_id},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_new_email},`;
    queryOption += `${Entity_customer_1.CONST_column_customer.cr164_confirm_date_email},`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_customer.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then((arrData) => {
            resolve(arrData[0]);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
//# sourceMappingURL=Model_customer.js.map