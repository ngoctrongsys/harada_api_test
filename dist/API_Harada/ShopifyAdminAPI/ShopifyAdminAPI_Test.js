"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyAdminAPI_Test = void 0;
/**
 * REST Admin API reference
 * The Admin API lets you build apps and integrations that extend and enhance the Shopify admin.
 * @export
 * @class ShopifyAdminAPI
 */
class ShopifyAdminAPI_Test {
}
exports.ShopifyAdminAPI_Test = ShopifyAdminAPI_Test;
//#region Status and error codes
/**
 * Status and error codes
 *  Ref to: https://shopify.dev/api/admin-rest#status_and_error_codes
 *
 *  All API queries return HTTP status codes that can tell you more about the response.
 *
 *      401 Unauthorized
 *          ➝　The client doesn’t have correct authentication credentials.
 *
 *       402 Payment Required
 *          ➝　The shop is frozen. The shop owner will need to pay the outstanding balance to unfreeze the shop.
 *
 *       403 Forbidden
 *          ➝　The server is refusing to respond. This is typically caused by incorrect access scopes.
 *
 *       404 Not Found
 *          ➝　The requested resource was not found but could be available again in the future.
 *
 *       406 Not Acceptable Error
 *          ➝　Incorrect method.
 *
 *       422 Unprocessable Entity
 *          ➝　The request body contains semantic errors.
 *              This is typically caused by incorrect formatting, omitting required fields,
 *                  or logical errors such as initiating a checkout for an out-of-stock product.
 *
 *       429 Too Many Requests
 *          ➝　The client has exceeded the rate limit.
 *
 *       5xx Errors
 *          ➝　An internal error occurred in Shopify. Check out the Shopify status page for more information.
 *
 */
//#endregion
/**
* Get Customer Login
* @static
* @param customerId
* @memberof ShopifyAdminAPI
*/
ShopifyAdminAPI_Test.GetCustomerLogin = (customerId) => {
    const functionName = '_GetCustomerLogin_';
    // F_Log(`${ functionName } START`);
    // return new Promise((resolve, reject) => {
    // resolve({_OK: 'HELLO_WORLD'});
    return { _OK: 'HELLO_WORLD: ' + customerId };
    // const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Customers + '/' + customerId + '.json';
    // const username = CONST_Harada_API_Key;
    // const password = CONST_Harada_Password;
    // const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
    // const header = {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Basic ' + base64,
    // };
    // axios.get(url, { headers: header }).then(response => {
    //     const customer = response.data.customer;
    //     const data = {
    //         id: customer.id,
    //         // Eメール
    //         email: customer.email,
    //         // 名
    //         first_name: customer.first_name,
    //         // 姓
    //         last_name: customer.last_name,
    //         // 電話番号
    //         phone: customer.phone ? customer.phone : ((!customer.default_address) ? '' : customer.default_address.phone),
    //         // メールマガジン
    //         accepts_marketing: customer.accepts_marketing,
    //         //#region Address(ご住所)
    //         default_address_id: (!customer.default_address) ? 0 : customer.default_address.id,
    //         name: (!customer.default_address) ? '' : customer.default_address.name,
    //         // 番地・ビル・建物名
    //         address1: (!customer.default_address) ? '' : customer.default_address.address1,
    //         address2: (!customer.default_address) ? '' : customer.default_address.address2,
    //         company: (!customer.default_address) ? '' : customer.default_address.company,
    //         // 市区町村
    //         city: (!customer.default_address) ? '' : customer.default_address.city,
    //         // 郵便番号
    //         zip: (!customer.default_address) ? '' : customer.default_address.zip,
    //         // 都道府県
    //         province_code: (!customer.default_address) ? '' : (customer.default_address.province_code ?
    //             customer.default_address.province_code
    //             : customer.default_address.province),
    //         province: (!customer.default_address) ? '' : customer.default_address.province,
    //         // 都道府県
    //         country: (!customer.default_address) ? '' : customer.default_address.country,
    //         country_code: (!customer.default_address) ? '' : customer.default_address.country_code,
    //         country_name: (!customer.default_address) ? '' : customer.default_address.country_name,
    //         //#endregion
    //         // 2023.03.16
    //         orders_count: customer.orders_count
    //     }
    //     resolve(data);
    // }).catch(error => {
    //     console.log(error.message);
    //     // reject(error);
    //     reject(null);
    // });
    // });
};
//# sourceMappingURL=ShopifyAdminAPI_Test.js.map