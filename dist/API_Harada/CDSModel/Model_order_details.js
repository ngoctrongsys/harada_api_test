"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model_order_details = void 0;
const axios_1 = __importDefault(require("axios"));
const Entity_order_details_1 = require("../CDSEntities/Entity_order_details");
const Constants_1 = require("../Constants");
const Model_base_1 = require("./Model_base");
/**
 *
 * @export
 * @class Model_order_details
 */
class Model_order_details {
}
exports.Model_order_details = Model_order_details;
/**
 * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
 * Using Plural name of table [s]
 * Table Name on Power Apps
 * @static
 * @memberof Model_classification_master
 */
Model_order_details.mTableName = `${Constants_1.CONST_CDS_PREFIX}order_details`;
/**
 *
 * Primary Key Column -> Custom of PowerApps
 * @static
 * @memberof Model_classification_master
 */
Model_order_details.mPrimaryKeyCustom = `${Constants_1.CONST_CDS_PREFIX}order_details_ID`;
/**
 *
 * Get list of order_details by order_id
 * @static
 * @memberof Model_order_details
 */
Model_order_details.GetListOrderDetails = (order_id) => {
    //#region Query Option
    let queryOption = `?$filter=${Entity_order_details_1.CONST_column_order_details.cr164_order_id} eq '${order_id}'`;
    queryOption += `&$select=`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_line_items_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_variant_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_size},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_base_color},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_quantity},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_price},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_sku},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_fit_type},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_thumbnail},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_note},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_status},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_reason},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_is_delete}, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_slip_no}, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_shipments_due}, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_return}, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_temp_design_id}, `;
    // queryOption += `&$orderby=createdon desc`;
    queryOption += `&$orderby=${Entity_order_details_1.CONST_column_order_details.cr164_product_name} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_sku}, `;
    queryOption += `createdon desc`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/web-api-query-data-sample#setting-precedence
 * Get list of order_details by order_ids
 * @static
 * @param order_ids
 * @memberof Model_order_details
 */
Model_order_details.GetListOrderDetailsByOrderIds = (order_ids) => {
    //#region Condition
    // $filter=contains(fullname,'(sample)') and (contains(jobtitle,'senior') or contains(jobtitle,'specialist')) and annualincome gt 55000.
    let condition = '';
    for (let i = 0; i < order_ids.length; i++) {
        const id = order_ids[i];
        condition += `contains(${Entity_order_details_1.CONST_column_order_details.cr164_order_id}, '${id}')` + (i === (order_ids.length - 1) ? '' : ' or ');
    }
    //#endregion
    //#region Query Option
    let queryOption = `?$filter=${condition}`;
    queryOption += `&$select=`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_line_items_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_variant_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_size},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_base_color},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_quantity},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_price},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_sku},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_fit_type},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_thumbnail},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_note},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_status},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_reason},`;
    // queryOption += `&$orderby=${ CONST_column_order_details.cr164_order_id } desc, createdon desc`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_is_delete}, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_slip_no}, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_shipments_due}, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_return}, `;
    queryOption += `&$orderby=${Entity_order_details_1.CONST_column_order_details.cr164_order_id} desc, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_name} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_sku}, `;
    queryOption += `createdon desc`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}${queryOption}`;
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
 * Insert an Order_Details
 * @static
 * @memberof Model_order_details
 */
Model_order_details.Insert = (dataJson) => {
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}`;
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
 * Insert list of Order_Details
 * @static
 * @memberof Model_order_details
 */
Model_order_details.InsertList = (JSONObjData) => {
    const functionName = '_InsertListOfOrderDetails_';
    // F_Log(`${functionName} START`);
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.GetCDSToken().then((accessToken) => __awaiter(void 0, void 0, void 0, function* () {
            const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}`;
            const url = Constants_1.CONST_CDS_REDIRECT_URL + queryStr;
            const instance = axios_1.default.create({
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                }
            });
            JSONObjData.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('_A_', item.cr164_order_details_id);
                yield instance.post(url, item).then((response) => {
                    console.log('_B_', item.cr164_order_details_id);
                }).catch((error) => {
                    console.log(error.response.data.error);
                });
            }));
            resolve({});
        })).catch(errorMessage => {
            try {
                console.log(errorMessage.response.data.error);
            }
            catch (e) { }
            console.log(errorMessage);
            reject(errorMessage);
        });
    });
};
/**
 *
 * Delete list of Order_Details_Id
 * @static
 * @memberof Model_order_details
 */
Model_order_details.DeleteListOfOrderDetailsIds = (ids) => {
    // const functionName = '_DeleteListOfOrderDetailsIds_';
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.GetCDSToken().then((accessToken) => __awaiter(void 0, void 0, void 0, function* () {
            const instance = axios_1.default.create({
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                }
            });
            // Loop
            ids.forEach((order_details_id) => __awaiter(void 0, void 0, void 0, function* () {
                const altKey = `(${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id} = '${order_details_id}')`;
                const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}${altKey}`;
                const url = Constants_1.CONST_CDS_REDIRECT_URL + queryStr;
                yield instance.delete(url).then((response) => {
                }).catch((error) => {
                    console.log('_(ERROR)_', error.response.data.error);
                });
            }));
            resolve({});
        })).catch(errorMessage => {
            try {
                console.log(errorMessage.response.data.error);
            }
            catch (e) { }
            console.log(errorMessage);
            reject(errorMessage);
        });
    });
};
/**
 * Insert list of Order Details with sequence
 * @static
 * @memberof Model_order_details
 */
Model_order_details.InsertListWithSequence = (JSONObjData) => {
    // const functionName = '_InsertListOfOrderDetails_';
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.GetCDSToken().then((accessToken) => __awaiter(void 0, void 0, void 0, function* () {
            //#region Query Option
            let queryOption = `?$select=`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_id},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_line_items_id},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_variant_id},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_id},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_name},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_name},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_size},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_base_color},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_quantity},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_price},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_sku},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_fit_type},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_thumbnail},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_note},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_status},`;
            queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_reason},`;
            //#endregion
            const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}${queryOption}`;
            const url = Constants_1.CONST_CDS_REDIRECT_URL + queryStr;
            const instance = axios_1.default.create({
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                    // You can compose your POST request so that data from the created record will be returned with a status of 201 (Created). 
                    // To get this result, you must use the return=representation preference in the request headers.
                    'Prefer': 'return=representation'
                }
            });
            let repData = [];
            let order_details_ids = [];
            //#region Variables for Error
            let repError = {};
            let isError = false;
            let status = 500;
            let statusText = '';
            let errorCode = '';
            let errorMsg = '';
            //#endregion
            const handleInsertList = () => __awaiter(void 0, void 0, void 0, function* () {
                for (const item of JSONObjData) {
                    const handleInsertOrderDetail = Model_order_details.waitForOneSecond().then((obj) => __awaiter(void 0, void 0, void 0, function* () {
                        yield instance.post(url, item).then((response) => {
                            order_details_ids.push(item.cr164_order_details_id);
                            repData.push(response.data);
                        }).catch((error) => {
                            status = error.response.status;
                            statusText += error.response.statusText;
                            errorCode += error.response.data.error.code.toString() + '\n';
                            errorMsg += error.response.data.error.message + '\n';
                            isError = true;
                        });
                    }));
                    yield handleInsertOrderDetail;
                }
                // Return
                if (isError) {
                    // Delete 
                    Model_order_details.DeleteListOfOrderDetailsIds(order_details_ids);
                    //#region Dataverse error structure
                    //  Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/org-service/web-service-error-codes
                    //          https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/compose-http-requests-handle-errors
                    repError = {
                        type: 'Dataverse',
                        message: {
                            code: errorCode,
                            message: errorMsg
                        },
                        response: {
                            status: status,
                            statusText: statusText,
                            data: {
                                errors: {
                                    code: errorCode,
                                    message: errorMsg
                                }
                            }
                        }
                    };
                    //#endregion
                    console.log('_____ERROR_ORDER_SHOPIFY_____', repError);
                    reject(repError);
                }
                else {
                    // resolve({});
                    resolve(repData);
                }
            });
            handleInsertList();
        })).catch(errorMessage => {
            try {
                console.log(errorMessage.response.data.error);
            }
            catch (e) {
            }
            console.log(errorMessage);
            reject(errorMessage);
        });
    });
};
/**
 * The Promise object represents the eventual completion (or failure) of an asynchronous operation
 * and its resulting value.
 */
Model_order_details.waitForOneSecond = () => {
    return new Promise(resolve => {
        resolve('Resolving!');
    });
};
// 2022.07.25
/**
 *
 * Get list of order_details by Status
 * @static
 * @memberof Model_order_details
 */
Model_order_details.GetListOrderDetailsByStatus = (value) => {
    //#region Query Option
    let queryOption = '?';
    if (value !== 0 && value !== '0') {
        if (value === '2' || value === '3') {
            // For 差し戻し
            //  + 差し戻し→ユ
            //  + 差し戻し→運
            //#region Condition
            // $filter=contains(fullname,'(sample)') and (contains(jobtitle,'senior') or contains(jobtitle,'specialist')) and annualincome gt 55000.
            const arrCondition = [2, 3];
            let condition = '';
            for (let i = 0; i < arrCondition.length; i++) {
                const statusValue = arrCondition[i];
                condition += `contains(${Entity_order_details_1.CONST_column_order_details.cr164_status}, '${statusValue}')` + (i === (arrCondition.length - 1) ? '' : ' or ');
            }
            //#endregion
            queryOption += `$filter=${condition}&`;
        }
        else {
            queryOption += `$filter=${Entity_order_details_1.CONST_column_order_details.cr164_status} eq '${value}'&`;
        }
    }
    queryOption += `$select=`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_size},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_base_color},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_quantity},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_price},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_thumbnail},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_status},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_id},`;
    // queryOption += `&$orderby=${ CONST_column_order_details.cr164_order_id } desc, createdon desc`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_slip_no},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_return},`;
    queryOption += `&$orderby=${Entity_order_details_1.CONST_column_order_details.cr164_order_id} desc, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_name} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_sku}, `;
    queryOption += `createdon desc`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}${queryOption}`;
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
 * Get order_details by order_details_id
 * @static
 * @memberof Model_order_details
 */
Model_order_details.GetOrderDetails = (order_details_id) => {
    //#region Query Option
    let queryOption = `?$filter=${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id} eq '${order_details_id}'`;
    queryOption += `&$select=`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_line_items_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_variant_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_size},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_base_color},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_quantity},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_price},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_sku},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_fit_type},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_thumbnail},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_note},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_status},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_reason},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_return},`;
    queryOption += `&$orderby=${Entity_order_details_1.CONST_column_order_details.cr164_product_name} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_sku}, `;
    queryOption += `createdon desc`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}${queryOption}`;
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
 * @param order_details_id is  @order_details_id(Custom)
 * Ref to: To set up an Alternate Key
 *          -> https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api#retrieve-using-an-alternate-key
 *          -> https://carldesouza.com/using-upsert-in-c-dynamics-365/
 * @static
 * @memberof Model_order_details
 */
Model_order_details.UpdateOrderDetails = (order_details_id, dataUpdate) => {
    const altKey = `(${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id} = '${order_details_id}')`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}${altKey}`;
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
 * Get list of order_details update by order_id
 * @static
 * @memberof Model_order_details
 */
Model_order_details.GetListOrderDetailsUpdate = (order_id) => {
    //#region Query Option
    let queryOption = `?$filter=${Entity_order_details_1.CONST_column_order_details.cr164_order_id} eq '${order_id}'`;
    queryOption += `&$select=`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_status},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_is_delete}, `;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            resolve(arrData);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
//#region Pagination - 2023.03
/**
 *
 * Get list of order_details by Status(Pagination)
 *  Ref to: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/web-api-query-data-sample#section-4-limit-and-count-results
 *          https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api#bkmk_limits
 *          https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/web-api-query-data-sample#bkmk_filterPagination
 * @static
 * @memberof Model_order_details
 */
Model_order_details.GetListOrderDetailsByStatusPagination = (value, maxPageSize) => {
    //#region Query Option
    let queryOption = '?';
    if (value !== 0 && value !== '0') {
        if (value === '2' || value === '3') {
            // For 差し戻し
            //  + 差し戻し→ユ
            //  + 差し戻し→運
            //#region Condition
            // $filter=contains(fullname,'(sample)') and (contains(jobtitle,'senior') or contains(jobtitle,'specialist')) and annualincome gt 55000.
            const arrCondition = [2, 3];
            let condition = '';
            for (let i = 0; i < arrCondition.length; i++) {
                const statusValue = arrCondition[i];
                condition += `contains(${Entity_order_details_1.CONST_column_order_details.cr164_status}, '${statusValue}')` + (i === (arrCondition.length - 1) ? '' : ' or ');
            }
            //#endregion
            queryOption += `$filter=${condition}&`;
        }
        else {
            queryOption += `$filter=${Entity_order_details_1.CONST_column_order_details.cr164_status} eq '${value}'&`;
        }
    }
    queryOption += `$select=`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_details_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_order_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_name},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_size},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_base_color},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_quantity},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_price},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_image_thumbnail},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_status},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_id},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_slip_no},`;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_return},`;
    queryOption += `&$orderby=${Entity_order_details_1.CONST_column_order_details.cr164_order_id} desc, `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_product_name} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_category_code} , `;
    queryOption += `${Entity_order_details_1.CONST_column_order_details.cr164_sku}, `;
    queryOption += `createdon desc&$count=true`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_order_details.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGetPagination(queryStr, maxPageSize).then(response => {
            resolve(response);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
/**
 *
 * Get list of order_details by Status(NextLink)
 *  Ref to: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/web-api-query-data-sample#section-4-limit-and-count-results
 *          https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api#bkmk_limits
 *          https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/web-api-query-data-sample#bkmk_filterPagination
 * @static
 * @memberof Model_order_details
 */
Model_order_details.GetListOrderDetailsByStatusNextlink = (nextLink, maxPageSize) => {
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGetNextLink(nextLink, maxPageSize).then(response => {
            resolve(response);
        }).catch(errorMessage => {
            reject(errorMessage);
        });
    });
};
//# sourceMappingURL=Model_order_details.js.map