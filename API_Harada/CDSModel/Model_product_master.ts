import { CONST_column_product_master, Entity_product_master } from "../CDSEntities/Entity_product_master";
import { CONST_CDS_PREFIX, CONST_CDS_SUB_PATH } from "../Constants";
import { F_GetBtoaFromShopify, F_GetValueByIndex, F_Log, F_PaddingLeft, F_UnsetKeys } from "../FunctionCommon";
import { Model_base } from "./Model_base";

/**
 *
 *
 * @export
 * @class Model_product_master
 */
export class Model_product_master {

    /**
     * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
     * Using Plural name of table [s]
     * Table Name on Power Apps
     * @static
     * @memberof Model_product_master
     */
    public static mTableName = `${CONST_CDS_PREFIX}product_masters`;

    /**
     *
     * Primary Key Auto
     * @static
     * @memberof Model_product_master
     */
    public static mPrimaryKeyAuto = `${CONST_CDS_PREFIX}product_masterid`;

    /**
     *
     * Primary Name Custom
     * @static
     * @memberof Model_product_master
     */
    public static mPrimaryKeyCustom = `${CONST_CDS_PREFIX}item_number`;

    /**
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
     * Select All
     */
    public static SelectAll = () => {
        const functionName = 'SelectAll';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}`;

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

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then((arrData: any) => {

                    let max = '';
                    for (let item of arrData) {
                        if (item[Model_product_master.mPrimaryKeyCustom] != undefined) {
                            if (item[Model_product_master.mPrimaryKeyCustom] > max) {
                                max = item[Model_product_master.mPrimaryKeyCustom];
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
        newCustomID = 'T' + F_PaddingLeft(newCustomID, '0', 6);
        return newCustomID;
    }

    /**
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
     * Select by AutoID
     * @param id 
     */
    public static SelectByAutoID = (id: string) => {
        const functionName = 'SelectByAutoID';
        F_Log(`${functionName} START`);

        const primaryKeyValue = `(${id})`;
        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${primaryKeyValue}`;

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

        //#region Query Option
        let queryOption = `?$filter=${Model_product_master.mPrimaryKeyCustom} eq '${customID}'`;
            queryOption += `&$select=`;
            queryOption += `${CONST_column_product_master.cr164_product_masterid},`;
            queryOption += `${CONST_column_product_master.cr164_item_number},`;
            queryOption += `${CONST_column_product_master.cr164_product_name},`;
            queryOption += `${CONST_column_product_master.cr164_major_classification_code},`;
            queryOption += `${CONST_column_product_master.cr164_middle_classification_code},`;
            queryOption += `${CONST_column_product_master.cr164_subclass_code},`;
            queryOption += `${CONST_column_product_master.cr164_image_url},`;
            queryOption += `${CONST_column_product_master.cr164_base_color},`;
        //#endregion

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${queryOption}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then((arrData: any) => {
                    if (arrData.length > 0) {
                        arrData[0].cr164_base_color = '#FFFFFF';
                    }
                    resolve(arrData);   
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Select by field name
     * @param fieldName 
     * @param fieldData 
     */
    public static SelectByFieldName = (fieldName: string, fieldData: any) => {
        const functionName = 'SelectByFieldName';
        F_Log(`${functionName} START`);

        const queryOption = `?$filter=${fieldName} eq ${fieldData}`;
        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${queryOption}`;
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
     * 
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-entity-web-api
     * Insert Entity
     * @param entity 
     */
    public static Insert = (entity0: Entity_product_master) => {
        const functionName = 'Insert';
        F_Log(`${functionName} START`);

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}`;
        const entity = F_UnsetKeys(entity0, [Model_product_master.mPrimaryKeyAuto]);

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
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api#update-with-data-returned
     * Update by ID
     * @param id 
     * @param entity0 
     */
    public static UpdateByAutoID = (id: any, entity0: Entity_product_master) => {
        const functionName = 'UpdateByAutoID';
        F_Log(`${functionName} START`);

        const primaryKeyValue = `(${id})`;
        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${primaryKeyValue}`;
        const entity = F_UnsetKeys(entity0, [Model_product_master.mPrimaryKeyAuto]);

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
    public static DeleteByAutoID = (id: any) => {
        const functionName = 'DeleteByAutoID';
        F_Log(`${functionName} START`);

        const primaryKeyValue = `(${id})`;
        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${primaryKeyValue}`;

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
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api
     * Delete Entity
     * @param entity 
     */
    public static DeleteEntity = (entity: Entity_product_master) => {
        const functionName = 'DeleteEntity';
        F_Log(`${functionName} START`);

        const autoID = F_GetValueByIndex(entity, Model_product_master.mPrimaryKeyAuto);
        if (autoID != undefined) {
            const primaryKeyAutoValue = `(${autoID})`;
            const queryStr = `${CONST_CDS_SUB_PATH}/${Model_product_master.mTableName}${primaryKeyAutoValue}`;

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
                reject(`${Model_product_master.mPrimaryKeyAuto} Not Input`);
            });
        }
    }
}
