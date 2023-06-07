"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model_base = void 0;
const axios_1 = __importDefault(require("axios"));
const Constants_1 = require("../Constants");
const FunctionCommon_1 = require("../FunctionCommon");
const adal = require('adal-node');
const AuthenticationContext = adal.AuthenticationContext;
var g_accessToken = '';
/**
 * CDS (Common Data Service)
 * Model Base
 * @export
 * @class Model_base
 */
class Model_base {
}
exports.Model_base = Model_base;
/**
*
* Clear CDS Token
* @static
* @memberof Model_base
*/
Model_base.ClearCDSToken = function () {
    eval("g_accessToken = '';");
};
/**
*
* Get CDS Token
* @static
* @memberof Model_base
*/
Model_base.GetCDSToken = function () {
    const functionName = 'GET_CDS_Token';
    return new Promise((resolve, reject) => {
        if (g_accessToken != '') {
            resolve(g_accessToken);
        }
        else {
            /**
             * In ADAL Node, callbacks are used for any operation after the authentication succeeds and a response is obtained:
             * Ref to: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-node-migration#use-promises-instead-of-callbacks
             */
            const context = new AuthenticationContext(Constants_1.CONST_CDS_AUTHORITY_URL);
            context.acquireTokenWithClientCredentials(Constants_1.CONST_CDS_REDIRECT_URL, Constants_1.CONST_CDS_CLIENT_ID, Constants_1.CONST_CDS_CLIENT_SECRET, function (err, tokenResponse) {
                if (err) {
                    // ERROR
                    console.log('[' + functionName + '] Error');
                    let error;
                    try {
                        error = JSON.parse(err.stack);
                    }
                    catch (e) {
                        error = err.stack;
                    }
                    try {
                        console.log('_ERROR_', err.response.data.error);
                    }
                    catch (e) {
                    }
                    reject(error.response.data.error);
                }
                else {
                    // Not ERROR
                    if (tokenResponse !== null && tokenResponse !== undefined) {
                        eval("g_accessToken = tokenResponse.accessToken;");
                        resolve(tokenResponse.accessToken);
                    }
                    else {
                        console.log('[' + functionName + '] Error');
                        reject('RefreshToken Error Unknown.');
                    }
                }
            });
        }
    });
};
/**
 * Use a GET request to retrieve data for a table specified as the resource with a unique identifier.
 * When retrieving a table row (entity record) you can also request specific properties and expand navigation properties to return properties from related tables.
 * To control which properties are returned, append:
 *  + The $select query option to the URL to the entity set.
 *  + The $expand query option will be ignored if used.
 * Method GET
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
 * @param queryStr
 * @static
 * @memberof Model_base
 */
Model_base.MethodGet = (queryStr) => {
    const functionName = 'METHOD_GET';
    FunctionCommon_1.F_Log(`${functionName} START`);
    return new Promise((resolve, reject) => {
        Model_base.GetCDSToken().then(accessToken => {
            const url = Constants_1.CONST_CDS_REDIRECT_URL + queryStr;
            // console.log('[' + functionName + '] ');// + url);
            // Create a new instance of axios with a custom config
            const instance = axios_1.default.create({
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    // Add option $format=application/json;odata.metadata=none
                    //  when querying can make odata.metadata (actually should be odata.context according to odata spec) does not show in the payload
                    // 'Accept': 'application/json;odata.metadata=none',
                    'Accept': 'application/json;odata.metadata=none',
                    'Content-Type': 'application/json;charset=utf-8',
                    // https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api#retrieve-a-count-of-rows
                    // 'Prefer': 'odata.maxpagesize=10',
                }
            });
            instance.get(url).then(function (response) {
                if (response.data.value) {
                    const rs = response.data.value;
                    resolve(rs);
                }
                else {
                    if (response.data) {
                        const rs = response.data;
                        resolve(rs);
                    }
                    else {
                        console.log('[' + functionName + '] response.data Not Found');
                        resolve({});
                    }
                }
            }).catch(function (error) {
                console.log('[' + functionName + '] Error', error);
                try {
                    console.log(error.response.data.error);
                }
                catch (e) {
                }
                reject(error.response.data.error);
            });
        }).catch(errorMessage => {
            console.log('_GetCDSToken_[' + functionName + '] Error');
            try {
                // console.log(errorMessage.response.data.error);
            }
            catch (e) {
            }
            reject(errorMessage);
        });
    });
};
/**
 * Use a POST request to send data to create a table row (entity record).
 * You can create multiple related table rows in a single operation using deep insert.
 * You also need to know how to set values to associate a new table row to existing tables using the @odata.bind annotation.
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/create-entity-web-api
 * Method POST
 * @param queryStr
 * @param JSONObjData
 * @static
 * @memberof Model_base
 */
Model_base.MethodPost = (queryStr, JSONObjData) => {
    const functionName = 'METHOD_POST';
    FunctionCommon_1.F_Log(`${functionName} START`);
    return new Promise((resolve, reject) => {
        Model_base.GetCDSToken().then(accessToken => {
            const url = Constants_1.CONST_CDS_REDIRECT_URL + queryStr;
            // console.log('[' + functionName + '] ' + url);
            // Create a new instance of axios with a custom config
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
            instance.post(url, JSONObjData).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                try {
                    console.log('POST_ERROR_', error.response.data.error);
                }
                catch (e) {
                }
                reject(error.response.data.error);
            });
        }).catch(errorMessage => {
            console.log('_GetCDSToken_[' + functionName + '] Error');
            try {
                // console.log(errorMessage.response.data.error);
            }
            catch (e) {
            }
            reject(errorMessage);
        });
    });
};
/**
 * Basic update
 * Update operations use the HTTP PATCH verb.
 * Pass a JSON object containing the properties you want to update to the URI that represents the entity.
 * A response with a status of 204 will be returned if the update is successful.
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api#basic-update
 * Method PATCH
 * @param queryStr
 * @param JSONObjData
 * @static
 * @memberof Model_base
 */
Model_base.MethodPatch = (queryStr, JSONObjData) => {
    const functionName = 'METHOD_PATCH';
    FunctionCommon_1.F_Log(`${functionName} START`);
    return new Promise((resolve, reject) => {
        Model_base.GetCDSToken().then(accessToken => {
            const url = Constants_1.CONST_CDS_REDIRECT_URL + queryStr;
            // console.log('[' + functionName + '] ' + url);
            // Create a new instance of axios with a custom config
            const instance = axios_1.default.create({
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                    // The If-Match: * header helps ensure you don't create a new record by accidentally performing an upsert operation. 
                    'If-Match': '*'
                    // If you're inserting data, there is some possibility that a record with the same id value already exists in the system 
                    // and you may not want to update it. To prevent this, add an If-None-Match header to the request with a value of "*".
                    // 'If-None-Match': '*'
                    // You can compose your POST request so that data from the created record will be returned with a status of 201 (Created). 
                    // To get this result, you must use the return=representation preference in the request headers.
                    // 'Prefer': 'return=representation'
                }
            });
            instance.patch(url, JSONObjData).then(function (response) {
                resolve({});
            }).catch(function (error) {
                try {
                    console.log(error.response.data.error);
                }
                catch (e) {
                }
                reject(error.response.data.error);
            });
        }).catch(errorMessage => {
            console.log('_GetCDSToken_[' + functionName + '] Error');
            try {
                // console.log(errorMessage.response.data.error);
            }
            catch (e) {
            }
            reject(errorMessage);
        });
    });
};
/**
 * Update a single property value
 * When you want to update only a single property value use a PUT request with the property name appended to the Uri of the entity.
 *  Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api#update-a-single-property-value
 *  Example: [Organization URI]/api/data/v9.0/accounts(00000000-0000-0000-0000-000000000001)/{$property}
 * Method PUT
 * @param queryStr
 * @param JSONObjData
 * @static
 * @memberof Model_base
 */
Model_base.MethodPut = (queryStr, JSONObjData) => {
    const functionName = 'METHOD_PUT';
    FunctionCommon_1.F_Log(`${functionName} START`);
    return new Promise((resolve, reject) => {
        Model_base.GetCDSToken().then(accessToken => {
            const url = Constants_1.CONST_CDS_REDIRECT_URL + queryStr;
            // console.log('[' + functionName + '] ' + url);
            // Create a new instance of axios with a custom config
            const instance = axios_1.default.create({
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
            instance.put(url, JSONObjData).then(function (response) {
                resolve({});
            }).catch(function (error) {
                try {
                    console.log(error.response.data.error);
                }
                catch (e) {
                }
                reject(error.response.data.error);
            });
        }).catch(errorMessage => {
            console.log('_GetCDSToken_[' + functionName + '] Error');
            try {
                // console.log(errorMessage.response.data.error);
            }
            catch (e) {
            }
            reject(errorMessage);
        });
    });
};
/**
 * Basic delete
 * A delete operation is very straightforward. Use the DELETE verb with the URI of the entity you want to delete.
 *  -> This example message deletes an account entity with the primary key accountid value equal to 00000000-0000-0000-0000-000000000001.
 * Ref to: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/update-delete-entities-using-web-api#basic-delete
 * Method DELETE
 * @param queryStr
 * @static
 * @memberof Model_base
 */
Model_base.MethodDelete = (queryStr) => {
    const functionName = 'METHOD_DELETE';
    FunctionCommon_1.F_Log(`${functionName} START`);
    return new Promise((resolve, reject) => {
        Model_base.GetCDSToken().then(accessToken => {
            const url = Constants_1.CONST_CDS_REDIRECT_URL + queryStr;
            // console.log('[' + functionName + '] ' + url);
            // Create a new instance of axios with a custom config
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
            instance.delete(url).then(function (response) {
                resolve({});
            }).catch(function (error) {
                try {
                    console.log(error.response.data.error);
                }
                catch (e) {
                }
                reject(error.response.data.error);
            });
        }).catch(errorMessage => {
            console.log('_GetCDSToken_[' + functionName + '] Error');
            try {
                // console.log(errorMessage.response.data.error);
            }
            catch (e) {
            }
            reject(errorMessage);
        });
    });
};
//#region Pagination - 2023.03
/**
 * (Pagination) Use a GET request to retrieve data for a table specified as the resource with a unique identifier.
 * When retrieving a table row (entity record) you can also request specific properties and expand navigation properties to return properties from related tables.
 * To control which properties are returned, append:
 *  + The $select query option to the URL to the entity set.
 *  + The $expand query option will be ignored if used.
 * Method GET
 * Ref to:  https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
 *          https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/web-api-query-data-sample#section-5-pagination
 * @param queryStr
 * @param maxPageSize
 * @static
 * @memberof Model_base
 */
Model_base.MethodGetPagination = (queryStr, maxPageSize) => {
    const functionName = 'METHOD_GET';
    FunctionCommon_1.F_Log(`${functionName} START`);
    return new Promise((resolve, reject) => {
        Model_base.GetCDSToken().then(accessToken => {
            const url = Constants_1.CONST_CDS_REDIRECT_URL + queryStr;
            // Create a new instance of axios with a custom config
            const instance = axios_1.default.create({
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    // Add option $format=application/json;odata.metadata=none
                    //  when querying can make odata.metadata (actually should be odata.context according to odata spec) does not show in the payload
                    // 'Accept': 'application/json;odata.metadata=none',
                    'Accept': 'application/json;odata.metadata=none',
                    'Content-Type': 'application/json;charset=utf-8',
                    // https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api#retrieve-a-count-of-rows
                    'Prefer': 'odata.maxpagesize=' + maxPageSize,
                }
            });
            instance.get(url).then(function (response) {
                if (response.data) {
                    const rs = response.data;
                    resolve(rs);
                }
                else {
                    if (response.data) {
                        const rs = response.data;
                        resolve(rs);
                    }
                    else {
                        console.log('[' + functionName + '] response.data Not Found');
                        resolve({});
                    }
                }
            }).catch(function (error) {
                console.log('[' + functionName + '] Error', error);
                try {
                    console.log(error.response.data.error);
                }
                catch (e) {
                }
                reject(error.response.data.error);
            });
        }).catch(errorMessage => {
            console.log('_GetCDSToken_[' + functionName + '] Error');
            try {
                // console.log(errorMessage.response.data.error);
            }
            catch (e) {
            }
            reject(errorMessage);
        });
    });
};
/**
 * (NextLink) Use a GET request to retrieve data for a table specified as the resource with a unique identifier.
 * When retrieving a table row (entity record) you can also request specific properties and expand navigation properties to return properties from related tables.
 * To control which properties are returned, append:
 *  + The $select query option to the URL to the entity set.
 *  + The $expand query option will be ignored if used.
 * Method GET
 * Ref to:  https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/retrieve-entity-using-web-api
 *          https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/web-api-query-data-sample#section-5-pagination
 * @param nextLink
 * @param maxPageSize
 * @static
 * @memberof Model_base
 */
Model_base.MethodGetNextLink = (nextLink, maxPageSize) => {
    const functionName = 'METHOD_GET';
    FunctionCommon_1.F_Log(`${functionName} START`);
    return new Promise((resolve, reject) => {
        Model_base.GetCDSToken().then(accessToken => {
            // Create a new instance of axios with a custom config
            const instance = axios_1.default.create({
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    // Add option $format=application/json;odata.metadata=none
                    //  when querying can make odata.metadata (actually should be odata.context according to odata spec) does not show in the payload
                    // 'Accept': 'application/json;odata.metadata=none',
                    'Accept': 'application/json;odata.metadata=none',
                    'Content-Type': 'application/json;charset=utf-8',
                    // https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api#retrieve-a-count-of-rows
                    'Prefer': 'odata.maxpagesize=' + maxPageSize,
                }
            });
            instance.get(nextLink).then(function (response) {
                if (response.data) {
                    const rs = response.data;
                    resolve(rs);
                }
                else {
                    if (response.data) {
                        const rs = response.data;
                        resolve(rs);
                    }
                    else {
                        console.log('[' + functionName + '] response.data Not Found');
                        resolve({});
                    }
                }
            }).catch(function (error) {
                console.log('[' + functionName + '] Error', error);
                try {
                    console.log(error.response.data.error);
                }
                catch (e) {
                }
                reject(error.response.data.error);
            });
        }).catch(errorMessage => {
            console.log('_GetCDSToken_[' + functionName + '] Error');
            try {
                // console.log(errorMessage.response.data.error);
            }
            catch (e) {
            }
            reject(errorMessage);
        });
    });
};
//# sourceMappingURL=Model_base.js.map