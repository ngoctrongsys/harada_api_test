"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model_user_design_product_management = void 0;
const Constants_1 = require("../Constants");
const FunctionCommon_1 = require("../FunctionCommon");
const Model_base_1 = require("./Model_base");
/**
 *
 *
 * @export
 * @class Model_user_design_product_management
 */
class Model_user_design_product_management {
}
exports.Model_user_design_product_management = Model_user_design_product_management;
/**
 * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
 * Using Plural name of table [s]
 * Table Name on Power Apps
 * @static
 * @memberof Model_user_design_product_management
 */
Model_user_design_product_management.mTableName = `${Constants_1.CONST_CDS_PREFIX}user_design_product_managements`;
/**
 * Unique identifier for entity instances
 * Primary Key Auto -> Standard of PowerApps
 * @static
 * @memberof Model_user_design_product_management
 */
Model_user_design_product_management.mPrimaryKeyAuto = `${Constants_1.CONST_CDS_PREFIX}user_design_product_managementid`;
/**
*
* Primary Name Column -> Custom of PowerApps
* @static
* @memberof Model_user_design_product_management
*/
Model_user_design_product_management.mPrimaryKeyCustom = `${Constants_1.CONST_CDS_PREFIX}sub_item_number`;
/**
 * Select All
 */
Model_user_design_product_management.SelectAll = () => {
    const functionName = 'SelectAll';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}`;
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
 * Select nax for CustomID
 */
Model_user_design_product_management.SelectMaxCustomID = () => {
    const functionName = 'SelectMaxCustomID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then((arrData) => {
            let max = '';
            for (let item of arrData) {
                if (item[Model_user_design_product_management.mPrimaryKeyCustom] != undefined) {
                    if (item[Model_user_design_product_management.mPrimaryKeyCustom] > max) {
                        max = item[Model_user_design_product_management.mPrimaryKeyCustom];
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
Model_user_design_product_management.GetIncreaseCustomID = (customID) => {
    const functionName = 'GetIncreaseCustomID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    let newCustomID = (parseInt(customID.replace(/[^0-9]/g, "")) + 1).toString();
    newCustomID = 'S' + FunctionCommon_1.F_PaddingLeft(newCustomID, '0', 6);
    return newCustomID;
};
/**
 * Select by AutoID
 * @param id
 */
Model_user_design_product_management.SelectByAutoID = (id) => {
    const functionName = 'SelectByAutoID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}(${id})`;
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
Model_user_design_product_management.SelectByCustomID = (customID) => {
    const functionName = 'SelectByCustomID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryOption = `?$filter=${Model_user_design_product_management.mPrimaryKeyCustom} eq '${customID}'`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}${queryOption}`;
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
 * Select by FieldName
 * @param fieldName
 * @param fieldData
 */
Model_user_design_product_management.SelectByFieldName = (fieldName, fieldData) => {
    const functionName = 'SelectByFieldName';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryOption = `?$filter=${fieldName} eq ${fieldData}`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}${queryOption}`;
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
 * Insert Entity
 * @param entity
 */
Model_user_design_product_management.Insert = (entity0) => {
    const functionName = 'InsertEntity';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}`;
    const entity = FunctionCommon_1.F_UnsetKeys(entity0, [Model_user_design_product_management.mPrimaryKeyAuto]);
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
 * Update by AutoID
 * @param id
 * @param entity
 */
Model_user_design_product_management.UpdateByAutoID = (id, entity0) => {
    const functionName = 'UpdateByAutoID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}(${id})`;
    const entity = FunctionCommon_1.F_UnsetKeys(entity0, [Model_user_design_product_management.mPrimaryKeyAuto]);
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
// /**
//  * Update by CustomID
//  * @param customID 
//  * @param entity 
//  */
// public static UpdateByCustomID = (customID: string, entity0: Entity_user_design_product_management) => {
//     const functionName = 'UpdateByCustomID';
//     F_Log(`${functionName} START`);
//     const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}?$filter=${Model_user_design_product_management.mPrimaryKeyCustom} eq '${customID}'`;
//     const entity = F_UnsetKeys(entity0, [Model_user_design_product_management.mPrimaryKeyAuto]);
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
/**
 * Delete by AutoID
 * @param id
 */
Model_user_design_product_management.DeleteByAutoID = (id) => {
    const functionName = 'DeleteByAutoID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}(${id})`;
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
 * Delete Entity
 * @param id
 */
Model_user_design_product_management.DeleteEntity = (entity) => {
    const functionName = 'DeleteEntity';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const autoID = FunctionCommon_1.F_GetValueByIndex(entity, Model_user_design_product_management.mPrimaryKeyAuto);
    if (autoID != undefined) {
        const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}(${autoID})`;
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
            reject(`${Model_user_design_product_management.mPrimaryKeyAuto} Not Input`);
        });
    }
};
//# sourceMappingURL=Model_user_design_product_management.js.map