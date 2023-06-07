"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model_classification_master = void 0;
const Entity_classification_master_1 = require("../CDSEntities/Entity_classification_master");
const Constants_1 = require("../Constants");
const FunctionCommon_1 = require("../FunctionCommon");
const Model_base_1 = require("./Model_base");
/**
 *
 * @export
 * @class Model_classification_master
 */
class Model_classification_master {
}
exports.Model_classification_master = Model_classification_master;
/**
 * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
 * Using Plural name of table [s]
 * Table Name on Power Apps
 * @static
 * @memberof Model_classification_master
 */
Model_classification_master.mTableName = `${Constants_1.CONST_CDS_PREFIX}classification_masters`;
/**
 * Unique identifier for entity instances
 * Primary Key Auto -> Standard of PowerApps
 * @static
 * @memberof Model_classification_master
 */
Model_classification_master.mPrimaryKeyAuto = `${Constants_1.CONST_CDS_PREFIX}classification_masterid`;
/**
 *
 * Primary Key Column -> Custom of PowerApps
 * @static
 * @memberof Model_classification_master
 */
Model_classification_master.mPrimaryKeyCustom = `${Constants_1.CONST_CDS_PREFIX}subclass_code`;
/**
 * Select All
 */
Model_classification_master.SelectAll = () => {
    const functionName = 'SelectAll';
    FunctionCommon_1.F_Log(`${functionName} START`);
    //#region Query Option
    let queryOption = `?$select=`;
    queryOption += `${Entity_classification_master_1.CONST_column_classification_master.cr164_classification_masterid},`;
    queryOption += `${Entity_classification_master_1.CONST_column_classification_master.cr164_major_classification_code},`;
    queryOption += `${Entity_classification_master_1.CONST_column_classification_master.cr164_major_classification_name},`;
    queryOption += `${Entity_classification_master_1.CONST_column_classification_master.cr164_middle_classification_code},`;
    queryOption += `${Entity_classification_master_1.CONST_column_classification_master.cr164_middle_classification_name},`;
    queryOption += `${Entity_classification_master_1.CONST_column_classification_master.cr164_subclass_code},`;
    queryOption += `${Entity_classification_master_1.CONST_column_classification_master.cr164_subclass_name},`;
    //#endregion
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}${queryOption}`;
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
Model_classification_master.SelectMaxCustomID = () => {
    const functionName = 'SelectMaxCustomID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}`;
    return new Promise((resolve, reject) => {
        Model_base_1.Model_base.MethodGet(queryStr).then((arrData) => {
            let max = '';
            for (let item of arrData) {
                if (item[Model_classification_master.mPrimaryKeyCustom] != undefined) {
                    if (item[Model_classification_master.mPrimaryKeyCustom] > max) {
                        max = item[Model_classification_master.mPrimaryKeyCustom];
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
Model_classification_master.GetIncreaseCustomID = (customID) => {
    const functionName = 'GetIncreaseCustomID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    let newCustomID = (parseInt(customID.replace(/[^0-9]/g, "")) + 1).toString();
    newCustomID = 'C' + FunctionCommon_1.F_PaddingLeft(newCustomID, '0', 6);
    return newCustomID;
};
/**
 * Select by AutoID
 * @param id
 */
Model_classification_master.SelectByAutoID = (id) => {
    const functionName = 'SelectByAutoID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}(${id})`;
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
* SelectByCustomID
* @param customID
*/
Model_classification_master.SelectByCustomID = (customID) => {
    const functionName = 'SelectByCustomID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryOption = `?$filter=${Model_classification_master.mPrimaryKeyCustom} eq '${customID}'`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}${queryOption}`;
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
Model_classification_master.SelectByFieldName = (fieldName, fieldData) => {
    const functionName = 'SelectByFieldName';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryOption = `?$filter=${fieldName} eq ${fieldData}`;
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}${queryOption}`;
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
 * Insert
 * @param entity
 */
Model_classification_master.Insert = (entity0) => {
    const functionName = 'InsertEntity';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}`;
    const entity = FunctionCommon_1.F_UnsetKeys(entity0, [Model_classification_master.mPrimaryKeyAuto]);
    // const entity2 = Object.assign({}, entity);
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
Model_classification_master.UpdateByAutoID = (id, entity0) => {
    const functionName = 'UpdateByAutoID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}(${id})`;
    const entity = FunctionCommon_1.F_UnsetKeys(entity0, [Model_classification_master.mPrimaryKeyAuto]);
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
//  * UpdateByCustomID
//  * @param id 
//  * @param entity 
//  */
// public static UpdateByCustomID = (customID: string, entity0: Entity_classification_master) => {
//     const functionName = 'UpdateByCustomID';
//     F_Log(`${functionName} START`);
//     const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}?$filter=${Model_classification_master.mPrimaryKeyCustom} eq '${customID}'`;
//     const entity = F_UnsetKeys(entity0, [Model_classification_master.mPrimaryKeyAuto]);
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
Model_classification_master.DeleteByAutoID = (id) => {
    const functionName = 'DeleteByAutoID';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}(${id})`;
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
 * Delete by Entity
 * @param id
 */
Model_classification_master.DeleteEntity = (entity) => {
    const functionName = 'DeleteEntity';
    FunctionCommon_1.F_Log(`${functionName} START`);
    const autoID = FunctionCommon_1.F_GetValueByIndex(entity, Model_classification_master.mPrimaryKeyAuto);
    if (autoID != undefined) {
        const queryStr = `${Constants_1.CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}(${autoID})`;
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
            reject(`${Model_classification_master.mPrimaryKeyAuto} Not Input`);
        });
    }
};
//# sourceMappingURL=Model_classification_master.js.map