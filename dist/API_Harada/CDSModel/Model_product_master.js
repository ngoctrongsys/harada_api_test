"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model_product_master = void 0;
const Entity_product_master_1 = require("../CDSEntities/Entity_product_master");
const Constants_1 = require("../Constants");
const FunctionCommon_1 = require("../FunctionCommon");
const Model_base_1 = require("./Model_base");
/**
 *
 *
 * @export
 * @class Model_product_master
 */
class Model_product_master {
}
exports.Model_product_master = Model_product_master;
/**
 * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
 * Using Plural name of table [s]
 * Table Name on Power Apps
 * @static
 * @memberof Model_product_master
 */
Model_product_master.mTableName = `${Constants_1.CONST_CDS_PREFIX}product_masters`;
/**
 *
 * Primary Key Auto
 * @static
 * @memberof Model_product_master
 */
Model_product_master.mPrimaryKeyAuto = `${Constants_1.CONST_CDS_PREFIX}product_masterid`;
/**
 *
 * Primary Name Custom
 * @static
 * @memberof Model_product_master
 */
Model_product_master.mPrimaryKeyCustom = `${Constants_1.CONST_CDS_PREFIX}item_number`;
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
 * Select All
 */
Model_product_master.SelectAll = () => {
    const functionName = 'SelectAll';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            FunctionCommon_1.F_Log(`${functionName} OK`);
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
 * Select max CustomID
 */
Model_product_master.SelectMaxCustomID = () => {
    const functionName = 'SelectMaxCustomID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then((arrData) => {
            let max = '';
            for (let item of arrData) {
                if (item[Model_product_master.mPrimaryKeyCustom] != undefined) {
                    if (item[Model_product_master.mPrimaryKeyCustom] > max) {
                        max = item[Model_product_master.mPrimaryKeyCustom];
                    }
                }
            }
            FunctionCommon_1.F_Log(`${functionName} OK`);
            console.log(`MaxCustomID = ${max}`);
            resolve(max);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
 * Get Increase for CustomID
 */
Model_product_master.GetIncreaseCustomID = (customID) => {
    const functionName = 'GetIncreaseCustomID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    let newCustomID = (parseInt(customID.replace(/[^0-9]/g, "")) + 1).toString();
    newCustomID = 'T' + FunctionCommon_1.F_PaddingLeft(newCustomID, '0', 6);
    return newCustomID;
};
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
 * Select by AutoID
 * @param id
 */
Model_product_master.SelectByAutoID = (id) => {
    const functionName = 'SelectByAutoID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const primaryKeyValue = `(${id})`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${primaryKeyValue}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            FunctionCommon_1.F_Log(`${functionName} OK`);
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
* Select by CustomID
* @param customID
*/
Model_product_master.SelectByCustomID = (customID) => {
    const functionName = 'SelectByCustomID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    //#region Query Option
    let queryOption = `?$filter=${Model_product_master.mPrimaryKeyCustom} eq '${customID}'`;
    queryOption += `&$select=`;
    queryOption += `${Entity_product_master_1.CONST_column_product_master.cr164_product_masterid},`;
    queryOption += `${Entity_product_master_1.CONST_column_product_master.cr164_item_number},`;
    queryOption += `${Entity_product_master_1.CONST_column_product_master.cr164_product_name},`;
    queryOption += `${Entity_product_master_1.CONST_column_product_master.cr164_major_classification_code},`;
    queryOption += `${Entity_product_master_1.CONST_column_product_master.cr164_middle_classification_code},`;
    queryOption += `${Entity_product_master_1.CONST_column_product_master.cr164_subclass_code},`;
    queryOption += `${Entity_product_master_1.CONST_column_product_master.cr164_image_url},`;
    queryOption += `${Entity_product_master_1.CONST_column_product_master.cr164_base_color},`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then((arrData) => {
            if (arrData.length > 0) {
                arrData[0].cr164_base_color = '#FFFFFF';
            }
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
 * Select by field name
 * @param fieldName
 * @param fieldData
 */
Model_product_master.SelectByFieldName = (fieldName, fieldData) => {
    const functionName = 'SelectByFieldName';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryOption = `?$filter=${fieldName} eq ${fieldData}`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${queryOption}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then(arrData => {
            FunctionCommon_1.F_Log(`${functionName} OK`);
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
 *
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-entity-web-api
 * Insert Entity
 * @param entity
 */
Model_product_master.Insert = (entity0) => {
    const functionName = 'Insert';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}`;
    const entity = FunctionCommon_1.F_UnsetKeys(entity0, [Model_product_master.mPrimaryKeyAuto]);
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodPost(queryStr, entity).then(arrData => {
            FunctionCommon_1.F_Log(`${functionName} OK`);
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api#update-with-data-returned
 * Update by ID
 * @param id
 * @param entity0
 */
Model_product_master.UpdateByAutoID = (id, entity0) => {
    const functionName = 'UpdateByAutoID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const primaryKeyValue = `(${id})`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${primaryKeyValue}`;
    const entity = FunctionCommon_1.F_UnsetKeys(entity0, [Model_product_master.mPrimaryKeyAuto]);
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodPatch(queryStr, entity).then(arrData => {
            FunctionCommon_1.F_Log(`${functionName} OK`);
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
//#region Don't use
// /**
// * Update by CustomID
// * @param customID 
// * @param entity0 
// */
// public static UpdateByCustomID = (customID: string, entity0: Entity_product_master) => {
//     const functionName = 'UpdateByCustomID';
//     F_Log(`${functionName} START`);
//     const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}?$filter=${Model_product_master.mPrimaryKeyCustom} eq '${customID}'`;
//     const entity = F_UnsetKeys(entity0, [Model_product_master.mPrimaryKeyAuto]);
//     return new Promise((resolve, reject) => {
//         Model_base.MethodPatch(queryStr, entity).then(arrData => {
//                 F_Log(`${functionName} OK`);
//                 resolve(arrData);
//             }).catch(errorMessage => {
//                 F_Log(`${functionName} ERROR`);
//                 reject(errorMessage);
//             });
//     });
// }
//#endregion
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api#basic-delete
 * Delete by ID
 * @param id
 */
Model_product_master.DeleteByAutoID = (id) => {
    const functionName = 'DeleteByAutoID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const primaryKeyValue = `(${id})`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${primaryKeyValue}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodDelete(queryStr).then(arrData => {
            FunctionCommon_1.F_Log(`${functionName} OK`);
            resolve(arrData);
        }).catch(errorMessage => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(errorMessage);
        });
    });
};
/**
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api
 * Delete Entity
 * @param entity
 */
Model_product_master.DeleteEntity = (entity) => {
    const functionName = 'DeleteEntity';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const autoID = FunctionCommon_1.F_GetValueByIndex(entity, Model_product_master.mPrimaryKeyAuto);
    if (autoID != undefined) {
        const primaryKeyAutoValue = `(${autoID})`;
        const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${primaryKeyAutoValue}`;
        return new Promise((resolve, reject) => {
            Model_base_1.Model_base.MethodDelete(queryStr).then(arrData => {
                FunctionCommon_1.F_Log(`${functionName} OK`);
                resolve(arrData);
            }).catch(errorMessage => {
                FunctionCommon_1.F_Log(`${functionName} ERROR`);
                reject(errorMessage);
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            FunctionCommon_1.F_Log(`${functionName} ERROR`);
            reject(`${Model_product_master.mPrimaryKeyAuto} Not Input`);
        });
    }
};
//# sourceMappingURL=Model_product_master.js.map