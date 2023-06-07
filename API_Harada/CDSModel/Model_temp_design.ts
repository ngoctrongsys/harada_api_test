import axios from "axios";
import { CONST_column_temp_design, Entity_temp_design } from "../CDSEntities/Entity_temp_design";
import { CONST_CDS_PREFIX, CONST_CDS_REDIRECT_URL, CONST_CDS_SUB_PATH } from "../Constants";
import { F_Log } from "../FunctionCommon";
import { Model_base } from "./Model_base";

/**
 *
 * @export
 * @class Model_temp_design
 */
export class Model_temp_design {

    /**
     * In Dynamics 365 / Power Apps, entity names can have various different plural extensions, such as "s", "es", "ies" etc.
     * Using Plural name of table [s]
     * Table Name on Power Apps
     * @static
     * @memberof Model_temp_design
     */
    public static mTableName = `${CONST_CDS_PREFIX}temp_designs`;

    /**
     * Unique identifier for entity instances
     * Primary Key Auto -> Standard of PowerApps
     * @static
     * @memberof Model_temp_design
     */
    public static mPrimaryKeyAuto = `${CONST_CDS_PREFIX}temp_designId`;

    /**
     *
     * Primary Name Column -> Custom of PowerApps
     * @static
     * @memberof Model_temp_design
     */
    public static mPrimaryKeyCustom = `${CONST_CDS_PREFIX}temp_design_id`;

    /**
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
     * Get list of temp design by key_localstorage
     */
    public static GetListOfTempDesign = (key_localstorage: string) => {
        const functionName = '_GetListOfTempDesign_';

        //#region Query Option
        let queryOption = `?$filter=${CONST_column_temp_design.cr164_key_localstorage} eq '${key_localstorage}'`;
            queryOption += `&$select=`;
            queryOption += `${CONST_column_temp_design.cr164_temp_design_id},`;
            queryOption += `${CONST_column_temp_design.cr164_variant_id},`;
            queryOption += `${CONST_column_temp_design.cr164_product_id},`;
            queryOption += `${CONST_column_temp_design.cr164_product_name},`;
            queryOption += `${CONST_column_temp_design.cr164_category_name},`;
            queryOption += `${CONST_column_temp_design.cr164_category_code},`;
            queryOption += `${CONST_column_temp_design.cr164_size},`;
            queryOption += `${CONST_column_temp_design.cr164_base_color},`;
            queryOption += `${CONST_column_temp_design.cr164_quantity},`;
            queryOption += `${CONST_column_temp_design.cr164_price},`;
            queryOption += `${CONST_column_temp_design.cr164_sku},`;
            queryOption += `${CONST_column_temp_design.cr164_image_fit_type},`;
            queryOption += `${CONST_column_temp_design.cr164_design_3d_image_src},`;
            queryOption += `${CONST_column_temp_design.cr164_design_output_image_src},`;
            queryOption += `${CONST_column_temp_design.cr164_image_thumbnail},`;
            queryOption += `${CONST_column_temp_design.cr164_key_localstorage},`;
            queryOption += `${CONST_column_temp_design.cr164_note}`;
            // queryOption += `&$orderby=createdon desc`;
            queryOption += `&$orderby=${ CONST_column_temp_design.cr164_product_name } , `;
            queryOption += `${ CONST_column_temp_design.cr164_category_code } , `;
            queryOption += `createdon desc, `;
            queryOption += `${ CONST_column_temp_design.cr164_sku }`;
            // queryOption += `createdon desc`;
            
        //#endregion

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_temp_design.mTableName}${queryOption}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then(repData => {
                    resolve(repData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
     * Get total quantity by key_localstorage
     */
    public static GetTotalQuantity = (key_localstorage: string) => {
        const functionName = '_GetTotalQuantity_';

        //#region Query Option
        let queryOption = `?$filter=${CONST_column_temp_design.cr164_key_localstorage} eq '${key_localstorage}'`;
            queryOption += `&$select=`;
            queryOption += `${CONST_column_temp_design.cr164_quantity}`;
        //#endregion

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_temp_design.mTableName}${queryOption}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then(repData => {
                    resolve(repData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
     * Get temp design detail by ID
     */
    public static GetTempDesignDetail = (temp_design_id: string) => {
        const functionName = '_GetTempDesignDetail_';

        //#region Query Option
        let queryOption = `?$filter=${CONST_column_temp_design.cr164_temp_design_id} eq '${temp_design_id}'`;
            queryOption += `&$select=`;
            queryOption += `${CONST_column_temp_design.cr164_temp_design_id},`;
            queryOption += `${CONST_column_temp_design.cr164_variant_id},`;
            queryOption += `${CONST_column_temp_design.cr164_product_id},`;
            queryOption += `${CONST_column_temp_design.cr164_product_name},`;
            queryOption += `${CONST_column_temp_design.cr164_category_name},`;
            queryOption += `${CONST_column_temp_design.cr164_category_code},`;
            queryOption += `${CONST_column_temp_design.cr164_size},`;
            queryOption += `${CONST_column_temp_design.cr164_base_color},`;
            queryOption += `${CONST_column_temp_design.cr164_quantity},`;
            queryOption += `${CONST_column_temp_design.cr164_price},`;
            queryOption += `${CONST_column_temp_design.cr164_sku},`;
            queryOption += `${CONST_column_temp_design.cr164_image_fit_type},`;
            queryOption += `${CONST_column_temp_design.cr164_design_3d_image_src},`;
            queryOption += `${CONST_column_temp_design.cr164_design_output_image_src},`;
            queryOption += `${CONST_column_temp_design.cr164_image_thumbnail},`;
            queryOption += `${CONST_column_temp_design.cr164_key_localstorage},`;
            queryOption += `${CONST_column_temp_design.cr164_note}`;
        //#endregion

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_temp_design.mTableName}${queryOption}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then(repData => {
                    resolve(repData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * 
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-entity-web-api
     * Insert a Temp_Design
     * @param entity 
     */
    public static Insert = (dataJson: Entity_temp_design) => {
        const functionName = '_InsertTempDesign_';
        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_temp_design.mTableName}`;
        return new Promise((resolve, reject) => {
            Model_base.MethodPost(queryStr, dataJson).then(repData => {
                    resolve(repData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Delete temp design by ID
     * Ref to: To set up an Alternate Key 
     *          -> https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api#retrieve-using-an-alternate-key
     *          -> https://carldesouza.com/using-upsert-in-c-dynamics-365/
     *          -> https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api#update-with-data-returned
     * @static
     * @param temp_design_id is  @cr164_temp_design_id(Custom)
     * @param inputModel 
     */
    public static UpdateByAlternatePrimaryKey = (temp_design_id: any, dataJson: Entity_temp_design) => {
        const functionName = '_UpdateTempDesign_';
        const altKey = `(${CONST_column_temp_design.cr164_temp_design_id} = '${temp_design_id}')`;
        const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${ altKey }`;

        return new Promise((resolve, reject) => {
            Model_base.MethodPatch(queryStr, dataJson).then(repData => {
                    resolve(repData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api#basic-delete
     * Delete temp design by ID
     * @param temp_design_id 
     */
    public static DeleteByAlternatePrimaryKey = (temp_design_id: string) => {
        const functionName = '_DeleteTempDesign_';
        const altKey = `(${CONST_column_temp_design.cr164_temp_design_id} = '${temp_design_id}')`;
        const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${ altKey }`;
        return new Promise((resolve, reject) => {
            Model_base.MethodDelete(queryStr).then(repData => {
                    resolve(repData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    } 

    /**
     * Update Single Field
     * @static
     * @param temp_design_id    -> @cr164_temp_design_id(Custom)
     * @param filedName         -> field name of Table
     * @param dataUpdate        -> {"value": "_new_value_"}
     * @memberof Model_temp_design
     */
    public static UpdateBySingleField = (temp_design_id: string, filedName: string, dataUpdate: any) => {
        const altKey = `(${CONST_column_temp_design.cr164_temp_design_id} = '${temp_design_id}')`;
        const propertyName = `/${filedName}`;
        const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${ altKey }${ propertyName }`;
        return new Promise((resolve, reject) => {
            Model_base.MethodPut(queryStr, dataUpdate).then(repData => {
                    resolve(repData);
                }).catch(errorMessage => {
                    reject(errorMessage); 
                });
        });
    }

    //#region For Unique Identifier
    /**
     * Function update Entity by [@UniqueIdentifier]
     * @param uniqueIdentifier is @UniqueIdentifier(Unique identifier)
     *      Examp: Entity with the primary key accountid value equal to 00000000-0000-0000-0000-000000000001
     * @static
     */
    public static UpdateByUniqueIdentifier = (uniqueIdentifier: string, dataUpdate: Entity_temp_design) => {
        const primaryKey = `(${uniqueIdentifier})`;
        const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${ primaryKey }`;
        return new Promise((resolve, reject) => {
            Model_base.MethodPatch(queryStr, dataUpdate).then(repData => {
                    resolve(repData);
                }).catch(errorMessage => {
                    reject(errorMessage); 
                });
        });
    }
    //#endregion


    /**
     *
     * Delete list of Temp_Design_ID
     * @static
     * @memberof Model_temp_design
     */
    public static DeleteListOfTempDesignIds = (ids: any[]) => {
        // const functionName = '_DeleteListOfTempDesignIds_';
        return new Promise((resolve, reject) => {
            Model_base.GetCDSToken().then(async accessToken => {
                const instance = axios.create({
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
                ids.forEach(async (temp_design_id: any) => {
                    const altKey = `(${CONST_column_temp_design.cr164_temp_design_id} = '${temp_design_id}')`;
                    const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${ altKey }`;
                    const url = CONST_CDS_REDIRECT_URL + queryStr;
                    await instance.delete(url).then((response) => {
                            }).catch((error: any) => {
                                console.log('_(ERROR)_', error.response.data.error); 
                            });
                })
                resolve({});

            }).catch(errorMessage => {
                try {
                    console.log(errorMessage.response.data.error);
                } catch (e) { }

                console.log(errorMessage);
                reject(errorMessage);
            });
        });
    }

    /**
     * Insert list of Temp Detail with sequence
     * @static
     * @memberof Model_temp_design
     */
    public static InsertListWithSequence = (JSONObjData: any[], tableName: string) => {
        // const functionName = '_InsertListWithSequence_';
        return new Promise((resolve, reject) => {
            Model_base.GetCDSToken().then(async accessToken => {

                    //#region Query Option
                    let queryOption = `?$select=`;
                        queryOption += `${CONST_column_temp_design.cr164_temp_design_id},`;
                        queryOption += `${CONST_column_temp_design.cr164_variant_id},`;
                        queryOption += `${CONST_column_temp_design.cr164_product_id},`;
                        queryOption += `${CONST_column_temp_design.cr164_product_name},`;
                        queryOption += `${CONST_column_temp_design.cr164_category_name},`;
                        queryOption += `${CONST_column_temp_design.cr164_category_code},`;
                        queryOption += `${CONST_column_temp_design.cr164_size},`;
                        queryOption += `${CONST_column_temp_design.cr164_base_color},`;
                        queryOption += `${CONST_column_temp_design.cr164_quantity},`;
                        queryOption += `${CONST_column_temp_design.cr164_price},`;
                        queryOption += `${CONST_column_temp_design.cr164_sku},`;
                        queryOption += `${CONST_column_temp_design.cr164_image_fit_type},`;
                        queryOption += `${CONST_column_temp_design.cr164_design_3d_image_src},`;
                        queryOption += `${CONST_column_temp_design.cr164_design_output_image_src},`;
                        queryOption += `${CONST_column_temp_design.cr164_image_thumbnail},`;
                        queryOption += `${CONST_column_temp_design.cr164_key_localstorage},`;
                        queryOption += `${CONST_column_temp_design.cr164_note}`;
                    //#endregion
                    // const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${queryOption}`;
                    const queryStr = `${ CONST_CDS_SUB_PATH }/${ tableName }${queryOption}`;
                    const url = CONST_CDS_REDIRECT_URL + queryStr;
                    const instance = axios.create({
                        withCredentials: true,
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'OData-MaxVersion': '4.0',
                            'OData-Version': '4.0',
                            
                            // 'Accept': 'application/json',
                            'Accept': 'application/json;odata.metadata=none',

                            'Content-Type': 'application/json;charset=utf-8',
                            // 'Content-Type': 'application/octet-stream',

                            // You can compose your POST request so that data from the created record will be returned with a status of 201 (Created). 
                            // To get this result, you must use the return=representation preference in the request headers.
                            'Prefer': 'return=representation'
                        }
                    });

                    let repData:any = [];
                    
                    //#region Variables for Error
                    let repError = {};
                    let isError = false;
                    let status = 500;
                    let statusText = '';
                    let errorCode = '';
                    let errorMsg = '';
                    //#endregion

                    const handleInsertList = async () => {
                        for (const item of JSONObjData) {
                            const handleInsertTempDesign = Model_temp_design.waitForOneSecond().then(async (obj: any) => {
                                await instance.post(url, item).then((response: any) => {
                                            repData.push(response.data);
                                        }).catch((error: any) => {
                                            console.log('____error_____', error.response.data.error);

                                            status = error.response.status;
                                            statusText += error.response.statusText;
                                            errorCode += error.response.data.error.code.toString() + '\n';
                                            errorMsg += error.response.data.error.message + '\n';
                                            isError = true;
                                        });
                                    });
                            await handleInsertTempDesign;
                        }

                        // Return
                        if(isError) {

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
                            reject(repError);
                        } else {
                            resolve(repData);
                        }
                    };

                    handleInsertList();
                }).catch(errorMessage => {
                    try {
                        console.log(errorMessage.response.data.error);
                    } catch (e) {
                    }
                    reject(errorMessage);
                });
        });
    }

    /**
     * The Promise object represents the eventual completion (or failure) of an asynchronous operation
     * and its resulting value.
     */
    public static waitForOneSecond = () => {
        return new Promise(resolve => {
            resolve('Resolving!');
        });
    }

    /**
     * Update list of Temp_Design with sequence
     * @static
     * @memberof Model_temp_design
     */
    public static UpdateListImageWithSequence = (JSONObjData: any[], filedName: string) => {
        // const functionName = '_UpdateListImageWithSequence_';
        return new Promise((resolve, reject) => {
            Model_base.GetCDSToken().then(async accessToken => {

                    //#region Query Option
                    let queryOption = `?$select=`;
                        queryOption += `${CONST_column_temp_design.cr164_temp_design_id},`;
                    //#endregion
                    // const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${queryOption}`;

                    // const altKey = `(${CONST_column_temp_design.cr164_temp_design_id} = '${temp_design_id}')`;
                    // const propertyName = `/${filedName}`;
                    // const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${ altKey }${ propertyName }${queryOption}`;
                    // const url = CONST_CDS_REDIRECT_URL + queryStr;

                    const instance = axios.create({
                        withCredentials: true,
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'OData-MaxVersion': '4.0',
                            'OData-Version': '4.0',
                            
                            'Accept': 'application/json',
                            // 'Accept': 'application/json;odata.metadata=none',
                            'Content-Type': 'application/json;charset=utf-8',
                            // 'Content-Type': 'application/octet-stream',

                            // You can compose your POST request so that data from the created record will be returned with a status of 201 (Created). 
                            // To get this result, you must use the return=representation preference in the request headers.
                            'Prefer': 'return=representation'
                        }
                    });

                    let repData:any = [];
                    
                    //#region Variables for Error
                    let repError = {};
                    let isError = false;
                    let status = 500;
                    let statusText = '';
                    let errorCode = '';
                    let errorMsg = '';
                    //#endregion

                    const handleUpdateList = async () => {

                        for (const item of JSONObjData) {
                            const handleInsertTempDesign = Model_temp_design.waitForOneSecond().then(async (obj: any) => {

                                const altKey = `(${CONST_column_temp_design.cr164_temp_design_id} = '${item.cr164_temp_design_id}')`;
                                const propertyName = `/${filedName}`;
                                const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${ altKey }${ propertyName }`;
                                const url = CONST_CDS_REDIRECT_URL + queryStr;

                                await instance.put(url, item.cr164_value.value).then((response: any) => {
                                            repData.push(response.data);
                                        }).catch((error: any) => {
                                            status = error.response.status;
                                            statusText += error.response.statusText;
                                            errorCode += error.response.data.error.code.toString() + '\n';
                                            errorMsg += error.response.data.error.message + '\n';
                                            isError = true;
                                        });
                                    });
                            await handleInsertTempDesign;
                        }

                        // Return
                        if(isError) {

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
                            reject(repError);
                        } else {
                            resolve(repData);
                        }
                    };

                    handleUpdateList();
                }).catch(errorMessage => {
                    try {
                        console.log(errorMessage.response.data.error);
                    } catch (e) {
                    }
                    // console.log(errorMessage);
                    reject(errorMessage);
                });
        });
    }

    // 2022.12.08
    /**
     * Update list of Image Output Pattern with sequence
     * @static
     * @memberof Model_temp_design
     */
    public static UpdateListImageOutputPatternWithSequence = (JSONObjData: any[], tableName: string) => {
        // const functionName = '_UpdateListImageOutputPatternWithSequence_';
        return new Promise((resolve, reject) => {
            Model_base.GetCDSToken().then(async accessToken => {

                    //#region Query Option
                    let queryOption = `?$select=`;
                        queryOption += `${CONST_column_temp_design.cr164_temp_design_id},`;
                        queryOption += `${CONST_column_temp_design.cr164_design_output_image_src},`;
                    //#endregion

                    // const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${queryOption}`;
                    // const url = CONST_CDS_REDIRECT_URL + queryStr;

                    const instance = axios.create({
                        withCredentials: true,
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'OData-MaxVersion': '4.0',
                            'OData-Version': '4.0',
                            
                            // 'Accept': 'application/json',
                            'Accept': 'application/json;odata.metadata=none',
                            'Content-Type': 'application/json;charset=utf-8',
                            // 'Content-Type': 'application/octet-stream',

                            // You can compose your POST request so that data from the created record will be returned with a status of 201 (Created). 
                            // To get this result, you must use the return=representation preference in the request headers.
                            'Prefer': 'return=representation'
                        }
                    });

                    let repData:any = [];
                    
                    //#region Variables for Error
                    let repError = {};
                    let isError = false;
                    let status = 500;
                    let statusText = '';
                    let errorCode = '';
                    let errorMsg = '';
                    //#endregion

                    const handleUpdateList = async () => {

                        for (const item of JSONObjData) {
                            const handleInsertTempDesign = Model_temp_design.waitForOneSecond().then(async (obj: any) => {

                                const altKey = `(${CONST_column_temp_design.cr164_temp_design_id} = '${item.cr164_temp_design_id}')`;
                                // const propertyName = `/${filedName}`;
                                // const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${ altKey }${ propertyName }`;

                                // const queryStr = `${ CONST_CDS_SUB_PATH }/${ Model_temp_design.mTableName }${ altKey }`;
                                const queryStr = `${ CONST_CDS_SUB_PATH }/${ tableName }${ altKey }`;
                                const url = CONST_CDS_REDIRECT_URL + queryStr;
                                await instance.patch(url, item.data).then((response: any) => {
                                            repData.push(response.data);
                                        }).catch((error: any) => {
                                            status = error.response.status;
                                            statusText += error.response.statusText;
                                            errorCode += error.response.data.error.code.toString() + '\n';
                                            errorMsg += error.response.data.error.message + '\n';
                                            isError = true;
                                        });
                                    });
                            await handleInsertTempDesign;
                        }

                        // Return
                        if(isError) {

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
                            reject(repError);
                        } else {
                            resolve(repData);
                        }
                    };

                    handleUpdateList();
                }).catch(errorMessage => {
                    try {
                        console.log(errorMessage.response.data.error);
                    } catch (e) {
                    }
                    // console.log(errorMessage);
                    reject(errorMessage);
                });
        });
    }

    /**
     * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
     * Get list of temp design by id
     */
    public static GetListOfTempDesignById = (temp_design_ids: any) => {
        const functionName = '_GetListOfTempDesign_';

        //#region Condition
        // $filter=contains(fullname,'(sample)') and (contains(jobtitle,'senior') or contains(jobtitle,'specialist')) and annualincome gt 55000.
        let condition = '';
        for (let i = 0; i < temp_design_ids.length; i++) {
            const id = temp_design_ids[i];
            condition += `contains(${ CONST_column_temp_design.cr164_temp_design_id }, '${ id }')` + (i === (temp_design_ids.length - 1) ? '' : ' or ');
        }
        //#endregion

        //#region Query Option
        let queryOption = `?$filter=${condition}`;
            queryOption += `&$select=`;
            queryOption += `${CONST_column_temp_design.cr164_temp_design_id},`;
            queryOption += `${CONST_column_temp_design.cr164_variant_id},`;
            queryOption += `${CONST_column_temp_design.cr164_product_id},`;
            queryOption += `${CONST_column_temp_design.cr164_product_name},`;
            queryOption += `${CONST_column_temp_design.cr164_category_name},`;
            queryOption += `${CONST_column_temp_design.cr164_category_code},`;
            queryOption += `${CONST_column_temp_design.cr164_size},`;
            queryOption += `${CONST_column_temp_design.cr164_base_color},`;
            queryOption += `${CONST_column_temp_design.cr164_quantity},`;
            queryOption += `${CONST_column_temp_design.cr164_price},`;
            queryOption += `${CONST_column_temp_design.cr164_sku},`;
            queryOption += `${CONST_column_temp_design.cr164_image_fit_type},`;
            queryOption += `${CONST_column_temp_design.cr164_design_3d_image_src},`;
            queryOption += `${CONST_column_temp_design.cr164_design_output_image_src},`;
            queryOption += `${CONST_column_temp_design.cr164_image_thumbnail},`;
            queryOption += `${CONST_column_temp_design.cr164_key_localstorage},`;
            queryOption += `${CONST_column_temp_design.cr164_note}`;
            // queryOption += `&$orderby=createdon desc`;
            queryOption += `&$orderby=${ CONST_column_temp_design.cr164_product_name } , `;
            queryOption += `${ CONST_column_temp_design.cr164_category_code } , `;
            queryOption += `createdon desc, `;
            queryOption += `${ CONST_column_temp_design.cr164_sku }`;
            // queryOption += `createdon desc`;
            
        //#endregion

        const queryStr = `${CONST_CDS_SUB_PATH}/${Model_temp_design.mTableName}${queryOption}`;

        return new Promise((resolve, reject) => {
            Model_base.MethodGet(queryStr).then(repData => {
                    resolve(repData);
                }).catch(errorMessage => {
                    F_Log(`${functionName} ERROR`);
                    reject(errorMessage);
                });
        });
    }
}
