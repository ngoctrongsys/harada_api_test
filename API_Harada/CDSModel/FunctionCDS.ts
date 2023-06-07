// import axios from "axios";
// import { CONST_CDS_PREFIX } from "./Constants";

// var tenant = '7ada4c0c-be2a-4604-8be0-d1cfe5975009';
// var clientId = '51c31565-62d6-4373-80ea-4fe465ab4b6f';
// var clientSecret = 'gZ.GmDAdUm_Kk5s_m.NU74t_9V00BVa~_-';
// var authorityUrl = 'https://login.microsoftonline.com' + '/' + tenant;
// var resource = 'https://haradacorp.crm7.dynamics.com';

// var adal = require('adal-node');
// var AuthenticationContext = adal.AuthenticationContext;

// /**
// * F_RefreshToken
//  */
// const F_RefreshToken = function () {

//     var functionName = 'F_RefreshToken';

//     console.log('[' + functionName + '] START');

//     return new Promise((resolve, reject) => {
//         var context = new AuthenticationContext(authorityUrl);
//         context.acquireTokenWithClientCredentials(
//             resource,
//             clientId,
//             clientSecret,
//             function (err: any, tokenResponse: any) {
//                 if (err) {
//                     console.log('[' + functionName + '] Error');
//                     var error;
//                     try {
//                         error = JSON.parse(err.stack);
//                     } catch (e) {
//                         error = err.stack;
//                     }
//                     reject(error);
//                 } else {
//                     if (tokenResponse !== null && tokenResponse !== undefined) {
//                         console.log('tokenResponse.accessToken: ');
//                         console.log(tokenResponse);
//                         resolve(tokenResponse.accessToken)
//                     }
//                     else {
//                         console.log('[' + functionName + '] Error');
//                         reject('RefreshToken Error Unknown.');
//                     }
//                 }
//             }
//         );
//     });
// }
// // /**
// // * F_CallCDSAPI
// //  * @param action 
// //  * @param url 
// //  * @param accessToken 
// //  */
// // export const F_CallCDSAPI = (action: string, url: string, accessToken: any, JSONObjData: any) => {

// //     var functionName = 'F_CallCDSAPI';

// //     console.log('[' + functionName + '] START');
// //     return new Promise((resolve, reject) => {
// //         console.log('[' + functionName + '] [' + action + '] ' + encodeURI(url));

// //         var request = new XMLHttpRequest();
// //         request.open(action, encodeURI(url), true);
// //         request.setRequestHeader("Authorization", 'Bearer ' + accessToken);
// //         request.setRequestHeader("OData-MaxVersion", "4.0");
// //         request.setRequestHeader("OData-Version", "4.0");
// //         request.setRequestHeader("Accept", "application/json");
// //         request.setRequestHeader("Content-Type", "application/json;charset=utf-8");
// //         request.onreadystatechange = function () {
// //             if (this.readyState === 4) {
// //                 request.onreadystatechange = null;
// //                 switch (this.status) {
// //                     case 200: // Success with content returned in response body.  
// //                     case 204: // Success with no content returned in response body.  
// //                     case 304: // Success with Not Modified  
// //                         console.log(request);
// //                         try {
// //                             resolve(JSON.parse(request.responseText));
// //                         } catch (e) {
// //                             resolve({});
// //                         }
// //                         break;
// //                     default:
// //                         console.log('[' + functionName + '] Error');
// //                         var error;
// //                         try {
// //                             console.log(request);
// //                             error = JSON.parse(request.status);
// //                         } catch (e) {
// //                             error = "Error Unknown.";
// //                         }
// //                         reject(error);
// //                         break;
// //                 }
// //             }
// //         };
// //         request.send(JSON.stringify(JSONObjData));
// //     });
// // }
// /**
// // * F_CallCDSAPI
// //  * @param action 
// //  * @param url 
// //  * @param accessToken 
// //  */
// // export const F_CallCDSAPI = (action: any, url: string, accessToken: any, JSONObjData: any) => {

// //     var functionName = 'F_CallCDSAPI';

// //     console.log('[' + functionName + '] START');
// //     return new Promise((resolve, reject) => {
// //         console.log('[' + functionName + '] [' + action + '] ' + encodeURI(url));

// //         const instance = axios.create({
// //             //baseURL: url,
// //             withCredentials: true,
// //             //timeout: 2000,
// //             method: action,
// //             headers: {
// //                 'Authorization': 'Bearer ' + accessToken,
// //                 'OData-MaxVersion': '4.0',
// //                 'OData-Version': '4.0',
// //                 'Accept': 'application/json',
// //                 'Content-Type': 'application/json;charset=utf-8',
// //             }
// //         });

// //         instance.post(url, JSONObjData)
// //             .then(function (response: any) {
// //                 console.log(response);
// //                 resolve({});
// //                 //                         try {
// //                 //                             resolve(JSON.parse(request.responseText));
// //                 //                         } catch (e) {
// //                 //                             resolve({});
// //                 //                         }
// //             })
// //             .catch(function (error: any) {
// //                 console.log(error);
// //                 reject(error);
// //             });
// //     });
// // }

// /**
// * F_Get
//  * @param queryStr 
//  * @param data 
//  */
// export const F_Get = (queryStr: string) => {

//     var functionName = 'F_Get';

//     console.log('[' + functionName + '] START');
//     return new Promise((resolve, reject) => {
//         F_RefreshToken()
//             .then(accessToken => {
//                 var url = resource + queryStr;
//                 console.log('[' + functionName + '] [GET] ' + url);
//                 const instance = axios.create({
//                     //baseURL: url,
//                     withCredentials: true,
//                     //timeout: 2000,
//                     //method: 'POST',
//                     headers: {
//                         'Authorization': 'Bearer ' + accessToken,
//                         'OData-MaxVersion': '4.0',
//                         'OData-Version': '4.0',
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json;charset=utf-8',
//                     }
//                 });

//                 instance.get(url)
//                     .then(function (response: any) {
//                         if (response.data.value) {
//                             var rs = response.data.value;
//                             console.log('[' + functionName + '] Ok');
//                             //console.log(response);
//                             resolve(rs);
//                         }
//                         else {
//                             if (response.data) {
//                                 var rs = response.data;
//                                 console.log('[' + functionName + '] Ok');
//                                 //console.log(response);
//                                 resolve(rs);
//                             }
//                             else {
//                                 console.log('[' + functionName + '] response.data Not Found');
//                                 //console.log(response);
//                                 resolve({});
//                             }
//                         }
//                     })
//                     .catch(function (error: any) {
//                         console.log('[' + functionName + '] Error');
//                         console.log(error);
//                         reject(error);
//                     });
//             })
//             .catch(errorMessage => {
//                 console.log('[' + functionName + '] Error');
//                 console.log(errorMessage);
//                 reject(errorMessage);
//             });
//     });
// }

// /**
// * F_Post
//  * @param queryStr 
//  * @param data 
//  */
// export const F_Post = (queryStr: string, JSONObjData: any) => {

//     var functionName = 'F_Post';

//     console.log('[' + functionName + '] START');
//     return new Promise((resolve, reject) => {
//         F_RefreshToken()
//             .then(accessToken => {
//                 var url = resource + queryStr;
//                 console.log('[' + functionName + '] [POST] ' + url);
//                 const instance = axios.create({
//                     //baseURL: url,
//                     withCredentials: true,
//                     //timeout: 2000,
//                     //method: 'POST',
//                     headers: {
//                         'Authorization': 'Bearer ' + accessToken,
//                         'OData-MaxVersion': '4.0',
//                         'OData-Version': '4.0',
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json;charset=utf-8',
//                     }
//                 });

//                 instance.post(url, JSONObjData)
//                     .then(function (response: any) {
//                         console.log('[' + functionName + '] Ok');
//                         resolve({});
//                         // try {
//                         //     var rs = response.data.value;
//                         //     console.log('[' + functionName + '] Ok');
//                         //     console.log(response);
//                         //     resolve(rs);
//                         // } catch (e) {
//                         //     console.log('[' + functionName + '] response.data.value Not Found');
//                         //     console.log(response);
//                         //     resolve({});
//                         // }
//                     })
//                     .catch(function (error: any) {
//                         console.log('[' + functionName + '] Error');
//                         console.log(error);
//                         reject(error);
//                     });
//             })
//             .catch(errorMessage => {
//                 console.log('[' + functionName + '] Error');
//                 console.log(errorMessage);
//                 reject(errorMessage);
//             });
//     });

// }
// /**
// * F_Patch
//  * @param queryStr 
//  * @param data 
//  */
// export const F_Patch = (queryStr: string, JSONObjData: any) => {

//     var functionName = 'F_Patch';

//     console.log('[' + functionName + '] START');
//     return new Promise((resolve, reject) => {
//         F_RefreshToken()
//             .then(accessToken => {
//                 var url = resource + queryStr;
//                 console.log('[' + functionName + '] [PATCH] ' + url);
//                 const instance = axios.create({
//                     //baseURL: url,
//                     withCredentials: true,
//                     //timeout: 2000,
//                     //method: 'POST',
//                     headers: {
//                         'Authorization': 'Bearer ' + accessToken,
//                         'OData-MaxVersion': '4.0',
//                         'OData-Version': '4.0',
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json;charset=utf-8',
//                     }
//                 });

//                 instance.patch(url, JSONObjData)
//                     .then(function (response: any) {
//                         console.log('[' + functionName + '] Ok');
//                         resolve({});
//                         // try {
//                         //     var rs = response.data.value;
//                         //     console.log('[' + functionName + '] Ok');
//                         //     console.log(response);
//                         //     resolve(rs);
//                         // } catch (e) {
//                         //     console.log('[' + functionName + '] response.data.value Not Found');
//                         //     console.log(response);
//                         //     resolve({});
//                         // }
//                     })
//                     .catch(function (error: any) {
//                         console.log('[' + functionName + '] Error');
//                         console.log(error);
//                         reject(error);
//                     });
//             })
//             .catch(errorMessage => {
//                 console.log('[' + functionName + '] Error');
//                 console.log(errorMessage);
//                 reject(errorMessage);
//             });
//     });

// }
// /**
// * F_Delete
//  * @param queryStr 
//  * @param data 
//  */
// export const F_Delete = (queryStr: string) => {

//     var functionName = 'F_Delete';

//     console.log('[' + functionName + '] START');
//     return new Promise((resolve, reject) => {
//         F_RefreshToken()
//             .then(accessToken => {
//                 var url = resource + queryStr;
//                 console.log('[' + functionName + '] [DELETE] ' + url);
//                 const instance = axios.create({
//                     //baseURL: url,
//                     withCredentials: true,
//                     //timeout: 2000,
//                     //method: 'POST',
//                     headers: {
//                         'Authorization': 'Bearer ' + accessToken,
//                         'OData-MaxVersion': '4.0',
//                         'OData-Version': '4.0',
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json;charset=utf-8',
//                     }
//                 });

//                 instance.delete(url)
//                     .then(function (response: any) {
//                         console.log('[' + functionName + '] Ok');
//                         resolve({});
//                         // try {
//                         //     var rs = response.data.value;
//                         //     console.log('[' + functionName + '] Ok');
//                         //     console.log(response);
//                         //     resolve(rs);
//                         // } catch (e) {
//                         //     console.log('[' + functionName + '] response.data.value Not Found');
//                         //     console.log(response);
//                         //     resolve({});
//                         // }
//                     })
//                     .catch(function (error: any) {
//                         console.log('[' + functionName + '] Error');
//                         console.log(error);
//                         reject(error);
//                     });
//             })
//             .catch(errorMessage => {
//                 console.log('[' + functionName + '] Error');
//                 console.log(errorMessage);
//                 reject(errorMessage);
//             });
//     });

// }


// /**
// * F_Select_product_master
//  * @param data 
//  */
// export const F_Select_product_master = () => {

//     var functionName = 'F_Select_product_master';
//     var queryStr = `/api/data/v9.1/${CONST_CDS_PREFIX}product_masters`;

//     console.log('[' + functionName + '] START');
//     return new Promise((resolve, reject) => {
//         F_Get(queryStr)
//             .then(arrData => {
//                 resolve(arrData);
//             })
//             .catch(errorMessage => {
//                 console.log('[' + functionName + '] Error');
//                 reject(errorMessage);
//             });
//     });
// }

// /**
// * F_SelectByID_product_master
//  * @param data 
//  */
// export const F_SelectByID_product_master = (id: any) => {

//     var functionName = 'F_Getcr164_user_management';
//     var queryStr = `/api/data/v9.1/${CONST_CDS_PREFIX}product_masters(${id})`;

//     console.log('[' + functionName + '] START');
//     return new Promise((resolve, reject) => {
//         F_Get(queryStr)
//             .then(arrData => {
//                 resolve(arrData);
//             })
//             .catch(errorMessage => {
//                 console.log('[' + functionName + '] Error');
//                 reject(errorMessage);
//             });
//     });
// }


// /**
// * F_Insert_product_master
//  * @param data 
//  */
// export const F_Insert_product_master = (entity: any) => {

//     var functionName = 'F_Insert_product_master';
//     var queryStr = `/api/data/v9.1/${CONST_CDS_PREFIX}product_masters`;

//     console.log('[' + functionName + '] START');

//     return new Promise((resolve, reject) => {
//         F_Post(queryStr, entity)
//             .then(arrData => {
//                 resolve(arrData);
//             })
//             .catch(errorMessage => {
//                 console.log('[' + functionName + '] Error');
//                 reject(errorMessage);
//             });
//     });
// }


// /**
// * F_Update_product_master
//  * @param data 
//  */
// export const F_Update_product_master = (id: any, entity: any) => {

//     var functionName = 'F_Update_product_master';
//     var queryStr = `/api/data/v9.1/${CONST_CDS_PREFIX}product_masters(${id})`;

//     console.log('[' + functionName + '] START');

//     return new Promise((resolve, reject) => {
//         F_Patch(queryStr, entity)
//             .then(arrData => {
//                 resolve(arrData);
//             })
//             .catch(errorMessage => {
//                 console.log('[' + functionName + '] Error');
//                 reject(errorMessage);
//             });
//     });
// }


// /**
// * F_Delete_product_master
//  * @param data 
//  */
// export const F_Delete_product_master = (id: any) => {

//     var functionName = 'F_Delete_product_master';
//     var queryStr = `/api/data/v9.1/${CONST_CDS_PREFIX}product_masters(${id})`;

//     console.log('[' + functionName + '] START');

//     return new Promise((resolve, reject) => {
//         F_Delete(queryStr)
//             .then(arrData => {
//                 resolve(arrData);
//             })
//             .catch(errorMessage => {
//                 console.log('[' + functionName + '] Error');
//                 reject(errorMessage);
//             });
//     });
// }

