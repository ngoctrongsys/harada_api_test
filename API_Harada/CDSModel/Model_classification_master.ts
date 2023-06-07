import { CONST_column_classification_master, Entity_classification_master } from "../CDSEntities/Entity_classification_master";
import { CONST_CDS_PREFIX, CONST_CDS_SUB_PATH } from "../Constants";
import { F_GetValueByIndex, F_Log, F_PaddingLeft, F_UnsetKeys } from "../FunctionCommon";
import { Model_base } from "./Model_base";

/**
 *
 * @export
 * @class Model_classification_master
 */
export class Model_classification_master {

    /**
     * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
     * Using Plural name of table [s]
     * Table Name on Power Apps
     * @static
     * @memberof Model_classification_master
     */
    public static mTableName = `${CONST_CDS_PREFIX}classification_masters`;

    /**
     * Unique identifier for entity instances
     * Primary Key Auto -> Standard of PowerApps
     * @static
     * @memberof Model_classification_master
     */
    public static mPrimaryKeyAuto = `${CONST_CDS_PREFIX}classification_masterid`;

    /**
     *
     * Primary Key Column -> Custom of PowerApps
     * @static
     * @memberof Model_classification_master
     */
    public static mPrimaryKeyCustom = `${CONST_CDS_PREFIX}subclass_code`;

    /**
     * Select All
     */
    public static SelectAll = () => {
        const functionName = 'SelectAll';
        F_Log(`${functionName} START`);

        //#region Query Option
        let queryOption = `?$select=`;
            queryOption += `${CONST_column_classification_master.cr164_classification_masterid},`;
            queryOption += `${CONST_column_classification_master.cr164_major_classification_code},`;
            queryOption += `${CONST_column_classification_master.cr164_major_classification_name},`;
            queryOption += `${CONST_column_classification_master.cr164_middle_classification_code},`;
            queryOption += `${CONST_column_classification_master.cr164_middle_classification_name},`;
            queryOption += `${CONST_column_classification_master.cr164_subclass_code},`;
            queryOption += `${CONST_column_classification_master.cr164_subclass_name},`;
        //#endregion

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}${queryOption}`;

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
     * Select max CustomID
     */
    public static SelectMaxCustomID = () => {
        const functionName = 'SelectMaxCustomID';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then((arrData: any) => {
                    let max = '';
                    for (let item of arrData) {
                        if (item[Model_classification_master.mPrimaryKeyCustom] != undefined) {
                            if (item[Model_classification_master.mPrimaryKeyCustom] > max) {
                                max = item[Model_classification_master.mPrimaryKeyCustom];
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
        newCustomID = 'C' + F_PaddingLeft(newCustomID, '0', 6);
        return newCustomID;
    }

    /**
     * Select by AutoID
     * @param id 
     */
    public static SelectByAutoID = (id: any) => {
        const functionName = 'SelectByAutoID';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}(${id})`;

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
    * SelectByCustomID
    * @param customID 
    */
    public static SelectByCustomID = (customID: string) => {
        const functionName = 'SelectByCustomID';
        F_Log(`${functionName} START`);

        const queryOption = `?$filter=${Model_classification_master.mPrimaryKeyCustom} eq '${customID}'`;
        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}${queryOption}`;

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
        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}${queryOption}`;

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
     * Insert
     * @param entity 
     */
    public static Insert = (entity0: Entity_classification_master) => {
        const functionName = 'InsertEntity';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}`;
        const entity = F_UnsetKeys(entity0, [Model_classification_master.mPrimaryKeyAuto]);

        // const entity2 = Object.assign({}, entity);
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
    public static UpdateByAutoID = (id: any, entity0: Entity_classification_master) => {
        const functionName = 'UpdateByAutoID';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}(${id})`;
        const entity = F_UnsetKeys(entity0, [Model_classification_master.mPrimaryKeyAuto]);

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
    public static DeleteByAutoID = (id: any) => {
        const functionName = 'DeleteByAutoID';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}(${id})`;

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
     * Delete by Entity
     * @param id 
     */
    public static DeleteEntity = (entity: Entity_classification_master) => {
        const functionName = 'DeleteEntity';
        F_Log(`${functionName} START`);
        const autoID = F_GetValueByIndex(entity, Model_classification_master.mPrimaryKeyAuto);
        if (autoID != undefined) {

            const queryStr = `${CONST_CDS_SUB_PATH}/${Model_classification_master.mTableName}(${autoID})`;

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
                reject(`${Model_classification_master.mPrimaryKeyAuto} Not Input`);
            });
        }
    }
}
