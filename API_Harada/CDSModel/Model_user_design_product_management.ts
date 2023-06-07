import { Entity_user_design_product_management } from "../CDSEntities/Entity_user_design_product_management";
import { CONST_CDS_PREFIX, CONST_CDS_SUB_PATH } from "../Constants";
import { F_GetValueByIndex, F_Log, F_PaddingLeft, F_UnsetKeys } from "../FunctionCommon";
import { Model_base } from "./Model_base";

/**
 *
 *
 * @export
 * @class Model_user_design_product_management
 */
export class Model_user_design_product_management {

    /**
     * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
     * Using Plural name of table [s]
     * Table Name on Power Apps
     * @static
     * @memberof Model_user_design_product_management
     */
    public static mTableName = `${CONST_CDS_PREFIX}user_design_product_managements`;

    /**
     * Unique identifier for entity instances
     * Primary Key Auto -> Standard of PowerApps
     * @static
     * @memberof Model_user_design_product_management
     */
    public static mPrimaryKeyAuto = `${CONST_CDS_PREFIX}user_design_product_managementid`;

     /**
     *
     * Primary Name Column -> Custom of PowerApps
     * @static
     * @memberof Model_user_design_product_management
     */
    public static mPrimaryKeyCustom = `${CONST_CDS_PREFIX}sub_item_number`;

    /**
     * Select All
     */
    public static SelectAll = () => {
        const functionName = 'SelectAll';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then(arrData => {
                    F_Log(`${functionName} OK`);
                    resolve(arrData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Select nax for CustomID
     */
    public static SelectMaxCustomID = () => {
        const functionName = 'SelectMaxCustomID';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then((arrData: any) => {

                    let max = '';
                    for (let item of arrData) {
                        if (item[Model_user_design_product_management.mPrimaryKeyCustom] != undefined) {
                            if (item[Model_user_design_product_management.mPrimaryKeyCustom] > max) {
                                max = item[Model_user_design_product_management.mPrimaryKeyCustom];
                            }
                        }
                    }
                    F_Log(`${functionName} OK`);
                    console.log(`MaxCustomID = ${max}`);
                    resolve(max);

                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Get Increase for CustomID
     */
    public static GetIncreaseCustomID = (customID: string) => {
        const functionName = 'GetIncreaseCustomID';
        F_Log(`${functionName} START`);
        let newCustomID = (parseInt(customID.replace(/[^0-9]/g, "")) + 1).toString();
        newCustomID = 'S' + F_PaddingLeft(newCustomID, '0', 6);
        return newCustomID;
    }

    /**
     * Select by AutoID
     * @param id 
     */
    public static SelectByAutoID = (id: any) => {
        const functionName = 'SelectByAutoID';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}(${id})`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then(arrData => {
                    F_Log(`${functionName} OK`);
                    resolve(arrData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Select by CustomID
     * @param customID 
     */
    public static SelectByCustomID = (customID: string) => {
        const functionName = 'SelectByCustomID';
        F_Log(`${functionName} START`);

        const queryOption = `?$filter=${Model_user_design_product_management.mPrimaryKeyCustom} eq '${customID}'`;
        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}${queryOption}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then(arrData => {
                    F_Log(`${functionName} OK`);
                    resolve(arrData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Select by FieldName
     * @param fieldName 
     * @param fieldData 
     */
    public static SelectByFieldName = (fieldName: string, fieldData: any) => {
        const functionName = 'SelectByFieldName';
        F_Log(`${functionName} START`);

        const queryOption = `?$filter=${fieldName} eq ${fieldData}`;
        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}${queryOption}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then(arrData => {
                    F_Log(`${functionName} OK`);
                    resolve(arrData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Insert Entity
     * @param entity 
     */
    public static Insert = (entity0: Entity_user_design_product_management) => {
        const functionName = 'InsertEntity';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}`;
        const entity = F_UnsetKeys(entity0, [Model_user_design_product_management.mPrimaryKeyAuto]);

        return new Promise((resolve, reject) => {
            Model_base.MethodPost(queryStr, entity).then(arrData => {
                    F_Log(`${functionName} OK`);
                    resolve(arrData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Update by AutoID
     * @param id 
     * @param entity 
     */
    public static UpdateByAutoID = (id: any, entity0: Entity_user_design_product_management) => {
        const functionName = 'UpdateByAutoID';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}(${id})`;
        const entity = F_UnsetKeys(entity0, [Model_user_design_product_management.mPrimaryKeyAuto]);

        return new Promise((resolve, reject) => {
            Model_base.MethodPatch(queryStr, entity).then(arrData => {
                    F_Log(`${functionName} OK`);
                    resolve(arrData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

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
    public static DeleteByAutoID = (id: any) => {
        const functionName = 'DeleteByAutoID';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}(${id})`;

        return new Promise((resolve, reject) => {
            Model_base.MethodDelete(queryStr).then(arrData => {
                    F_Log(`${functionName} OK`);
                    resolve(arrData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Delete Entity
     * @param id 
     */
    public static DeleteEntity = (entity: Entity_user_design_product_management) => {
        const functionName = 'DeleteEntity';
        F_Log(`${functionName} START`);

        const autoID = F_GetValueByIndex(entity, Model_user_design_product_management.mPrimaryKeyAuto);
        if (autoID != undefined) {
            const queryStr = `${CONST_CDS_SUB_PATH}/${Model_user_design_product_management.mTableName}(${autoID})`;
            return new Promise((resolve, reject) => {
                Model_base.MethodDelete(queryStr).then(arrData => {
                        F_Log(`${functionName} OK`);
                        resolve(arrData);
                    }).catch(errorMessage => {
                        F_Log(`${functionName} ERROR`);
                        reject(errorMessage);
                    });
            });
        } else {
            return new Promise((resolve, reject) => {
                F_Log(`${functionName} ERROR`);
                reject(`${Model_user_design_product_management.mPrimaryKeyAuto} Not Input`);
            });
        }
    }
}
