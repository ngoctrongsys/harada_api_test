"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model_order = void 0;
const Entity_order_1 = require("../CDSEntities/Entity_order");
const Constants_1 = require("../Constants");
const FunctionCommon_1 = require("../FunctionCommon");
const Model_base_1 = require("./Model_base");
/**
 *
 *
 * @export
 * @class Model_order
 */
class Model_order {
}
exports.Model_order = Model_order;
/**
 * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
 * Using Plural name of table [s]
 * Table Name on Power Apps
 * @static
 * @memberof Model_order
 */
Model_order.mTableName = `${Constants_1.CONST_CDS_PREFIX}orders`;
/**
 * Unique identifier for entity instances
 * Primary Key Auto -> Standard of PowerApps
 * @static
 * @memberof Model_order
 */
Model_order.mPrimaryKeyAuto = `${Constants_1.CONST_CDS_PREFIX}orderid`;
/**
 *
 * Primary Name Column -> Custom of PowerApps
 * @static
 * @memberof Model_order
 */
Model_order.mPrimaryKeyCustom = `${Constants_1.CONST_CDS_PREFIX}order_id`;
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
 * Get list of Order by customer_id
 */
Model_order.GetListOfOrderByCustomer = (customer_id) => {
    const functionName = '_GetListOfOrderByCustomer_';
    // F_Log(`${functionName} START`);
    //#region Query Option
    let queryOption = `?$filter=${Entity_order_1.CONST_column_order.cr164_customer_id} eq '${customer_id}'`;
    queryOption += `&$select=`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_no},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_total_price},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_is_completed},`;
    // queryOption += `${CONST_column_order.cr164_customer_id},`;
    // queryOption += `${CONST_column_order.cr164_shipping_address_first_name_kana},`;
    // queryOption += `${CONST_column_order.cr164_shipping_address_last_name_kana},`;
    // queryOption += `${CONST_column_order.cr164_payment_credit_card_number},`;
    // queryOption += `${CONST_column_order.cr164_payment_credit_card_expiration_month},`;
    // queryOption += `${CONST_column_order.cr164_payment_credit_card_expiration_year},`;
    // queryOption += `${CONST_column_order.cr164_payment_cvv_result_code},`;
    // queryOption += `${CONST_column_order.cr164_payment_credit_card_name},`;
    queryOption += `createdon,`;
    queryOption += `&$orderby=createdon desc&$count=true`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            // F_Log(`${functionName} OK`);
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
 * Get order detail by ID
 */
Model_order.GetOrderDetail = (order_id) => {
    const functionName = '_GetOrderDetail_';
    // F_Log(`${functionName} START`);
    //#region Query Option
    let queryOption = `?$filter=${Entity_order_1.CONST_column_order.cr164_order_id} eq '${order_id}'`;
    queryOption += `&$select=`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_no},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_customer_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_shipping_address_first_name_kana},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_shipping_address_last_name_kana},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_credit_card_number},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_credit_card_expiration_month},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_credit_card_expiration_year},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_cvv_result_code},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_credit_card_name},`;
    queryOption += `createdon,`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            // F_Log(`${functionName} OK`);
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
 * Ref to:  https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-entity-web-api
 *          https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-entity-web-api#create-with-data-returned
 *
 * Insert Entity
 * @param entity
 */
Model_order.Insert = (dataJson) => {
    const functionName = '_InsertOrder_';
    //#region Query Option
    let queryOption = `?$select=`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_no},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_customer_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_shipping_address_first_name_kana},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_shipping_address_last_name_kana},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_credit_card_number},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_credit_card_expiration_month},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_credit_card_expiration_year},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_cvv_result_code},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_payment_credit_card_name},`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodPost(queryStr, dataJson).then(repData => {
            resolve(repData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            // Dataverse error structure
            //  Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/org-service/web-service-error-codes
            //          https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/compose-http-requests-handle-errors
            const repError = {
                type: 'Dataverse',
                message: errorMessage,
                response: {
                    status: 999,
                    statusText: 'Bad Request',
                    data: {
                        errors: errorMessage
                    }
                }
            };
            // reject(errorMessage);
            reject(repError);
        });
    });
};
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api#basic-delete
 * Delete order by ID
 * @param order_id
 */
Model_order.DeleteByAlternatePrimaryKey = (order_id) => {
    const functionName = '_DeleteOrder_';
    const altKey = `(${Entity_order_1.CONST_column_order.cr164_order_id} = '${order_id}')`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${altKey}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodDelete(queryStr).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
//#region For Unique Identifier
/**
 * Function update Entity by [@UniqueIdentifier]
 * @param uniqueIdentifier is @UniqueIdentifier(Unique identifier)
 *      Examp: Entity with the primary key accountid value equal to 00000000-0000-0000-0000-000000000001
 * @static
 */
Model_order.UpdateByUniqueIdentifier = (uniqueIdentifier, dataUpdate) => {
    const primaryKey = `(${uniqueIdentifier})`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${primaryKey}`;
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
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
 * Get list of Order
 */
Model_order.GetListOfOrder = () => {
    const functionName = '_GetListOfOrder_';
    // F_Log(`${functionName} START`);
    //#region Query Option
    let queryOption = `?$select=`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_no},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_customer_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_is_completed},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_total_price},`;
    queryOption += `createdon,`;
    queryOption += `&$orderby=createdon desc`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            // F_Log(`${functionName} OK`);
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
 * Get OrderId by Order No.
 * @static
 * @memberof Model_order
 */
Model_order.GetOrderIdByOrderNo = (orderNo) => {
    const condition = `contains(${Entity_order_1.CONST_column_order.cr164_order_no}, '${orderNo}')`;
    let queryOption = `?$filter=${condition}`;
    queryOption += `&$select=`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_no},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_customer_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_is_completed},`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr)
            .then(arrData => resolve(arrData))
            .catch(errorMessage => reject(errorMessage));
    });
};
/**
 * Update Order
 * @static
 * @memberof Model_order
 */
Model_order.UpdateOrder = (order_id, dataUpdate) => {
    const altKey = `(${Entity_order_1.CONST_column_order.cr164_order_id} = '${order_id}')`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${altKey}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodPatch(queryStr, dataUpdate).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
/**
 * Get list of OrderNo. by CreateDate
 * @static
 * @memberof Model_order
 */
Model_order.GetListOfOrderNoByCreateDate = (currentDatetimeUtc, previousDatetimeUtc) => {
    const condition = `createdon lt '${currentDatetimeUtc}' and createdon gt '${previousDatetimeUtc}'`;
    let queryOption = `?$filter=${condition}`;
    queryOption += `&$select=`;
    // queryOption += `${ CONST_column_order.cr164_order_id },`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_no},`;
    queryOption += `createdon,`;
    queryOption += `&$orderby=createdon desc`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${queryOption}`;
    console.log('_GetListOfOrderNoByCreateDate(URL)__', queryStr);
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr)
            .then(arrData => resolve(arrData))
            .catch(errorMessage => reject(errorMessage));
    });
};
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/web-api-query-data-sample#setting-precedence
 * Get list of order_details by order_ids
 * @static
 * @param order_ids
 * @memberof Model_order
 */
Model_order.GetListOfOrderNoByOrderIds = (order_ids) => {
    //#region Condition
    let condition = '';
    for (let i = 0; i < order_ids.length; i++) {
        const id = order_ids[i];
        condition += `contains(${Entity_order_1.CONST_column_order.cr164_order_id}, '${id}')` + (i === (order_ids.length - 1) ? '' : ' or ');
    }
    //#endregion
    // condition += ` and ${CONST_column_order.cr164_is_completed} eq true`;
    //#region Query Option
    let queryOption = `?$filter=${condition}`;
    queryOption += `&$select=`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_id},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_order_no},`;
    queryOption += `${Entity_order_1.CONST_column_order.cr164_is_completed},`;
    queryOption += `createdon,`;
    queryOption += `&$orderby=createdon desc`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order.mTableName}${queryOption}`;
    // console.log('__queryStr__', queryStr);
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
//# sourceMappingURL=Model_order.js.map