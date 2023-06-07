import axios from "axios";
import { CONST_Harada_API_Key, CONST_Harada_API_Version, CONST_Harada_Countries, CONST_Harada_Endpoints, CONST_Harada_Password, CONST_Harada_Province_Of_JP, CONST_Harada_Tables, CONST_STRIPE_API_Key, CONST_STRIPE_API_Version, CONST_STRIPE_Endpoints, CONST_STRIPE_Tables, EMAIL_FOR_DEV, ORDER_HISTORY_PAGE, SENDGRID_API_KEY, SENDGRID_EMAIL, SENDGRID_FROM_EMAIL } from "../Constants";
import { F_FormatCurrency, F_IsNullOrEmptyListItem, F_Log } from "../FunctionCommon";
const querystring = require('querystring');

/**
 * REST Admin API reference
 * The Admin API lets you build apps and integrations that extend and enhance the Shopify admin.
 * @export
 * @class ShopifyAdminAPI
 */
export class ShopifyAdminAPI {

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
     * Retrieves a list of orders that meet the specified criteria.
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static GetOrders = async () => {
        const functionName = '_GetOrders_';
        F_Log(`${ functionName } START`);
        return new Promise(async (resolve, reject) => {

            // &fields: Retrieve only certain fields, specified by a comma-separated list of fields names.
            //          → id, contact_email, email, currency, current_total_price, current_subtotal_price, current_total_tax, order_number, customer, line_items
            // &ids:    Retrieve only orders specified by a comma-separated list of order IDs.
            // &limit:  The maximum number of results to show on a page. (≤ 250 default 50)
            let queryOption = `&fields=id, name, order_number, created_at`;
            queryOption += `&limit=250`;
            queryOption += `&status=any`;

            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/orders.json?' + queryOption;

            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const orders: any[] = respone.data.orders;
                const data = orders.map(order => {
                    return {
                        id: order.id,
                        cart_token: order.cart_token,
                        name: order.name,
                        order_number: order.order_number,
                        // customer: order.customer,
                        created_at: order.created_at
                    }
                });
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * Retrieves a list of orders that meet the specified criteria.
     * previousDate: 2023-02-14     Show customers created after a specified date.(format: 2023-02-14T16:15:47-04:00) 
     * currentDate: 2023-02-15      Show customers created after a specified date.(format: 2023-02-15T16:15:47-04:00)
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static GetOrdersWithConditionCreatedAt = async (previousDate: string, currentDate: string) => {
        const functionName = '_GetOrders_';
        F_Log(`${ functionName } START`);
        return new Promise(async (resolve, reject) => {

            // &fields: Retrieve only certain fields, specified by a comma-separated list of fields names.
            //          → id, contact_email, email, currency, current_total_price, current_subtotal_price, current_total_tax, order_number, customer, line_items
            // &ids:    Retrieve only orders specified by a comma-separated list of order IDs.
            // &limit:  The maximum number of results to show on a page. (≤ 250 default 50)
            let queryOption = `&fields=id, name, order_number, created_at`;
            queryOption += `&limit=250`;
            queryOption += `&status=any`;
            // Condition
            // queryOption += `&created_at_min=${previousDate}T08:00:00+09:00&created_at_max=${currentDate}T08:00:00+09:00`;
            queryOption += `&created_at_min=${previousDate}T00:00:00+09:00&created_at_max=${currentDate}T23:00:00+09:00`;

            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/orders.json?' + queryOption;

            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const orders: any[] = respone.data.orders;
                const data = orders.map(order => {
                    return {
                        id: order.id,
                        name: order.name,
                        created_at: order.created_at
                    }
                });
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
    * Get Customer Login
    * @static
    * @param customerId
    * @memberof ShopifyAdminAPI
    */
    public static GetCustomerLogin = async (customerId: string) => {
        const functionName = '_GetCustomerLogin_';
        F_Log(`${ functionName } START`);

        return new Promise((resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Customers + '/' + customerId + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            axios.get(url, { headers: header }).then(response => {
                const customer = response.data.customer;
                const data = {
                    id: customer.id,
                    // Eメール
                    email: customer.email,
                    // 名
                    first_name: customer.first_name,
                    // 姓
                    last_name: customer.last_name,
                    // 電話番号
                    phone: customer.phone ? customer.phone : ((!customer.default_address) ? '' : customer.default_address.phone),
                    // メールマガジン
                    accepts_marketing: customer.accepts_marketing,

                    //#region Address(ご住所)

                    default_address_id: (!customer.default_address) ? 0 : customer.default_address.id,
                    name: (!customer.default_address) ? '' : customer.default_address.name,
                    // 番地・ビル・建物名
                    address1: (!customer.default_address) ? '' : customer.default_address.address1,
                    address2: (!customer.default_address) ? '' : customer.default_address.address2,
                    company: (!customer.default_address) ? '' : customer.default_address.company,

                    // 市区町村
                    city: (!customer.default_address) ? '' : customer.default_address.city,
                    // 郵便番号
                    zip: (!customer.default_address) ? '' : customer.default_address.zip,
                    // 都道府県
                    province_code: (!customer.default_address) ? '' : (customer.default_address.province_code ?
                        customer.default_address.province_code
                        : customer.default_address.province),

                    province: (!customer.default_address) ? '' : customer.default_address.province,
                    // 都道府県
                    country: (!customer.default_address) ? '' : customer.default_address.country,
                    country_code: (!customer.default_address) ? '' : customer.default_address.country_code,
                    country_name: (!customer.default_address) ? '' : customer.default_address.country_name,
                    //#endregion

                    // 2023.03.16
                    orders_count: customer.orders_count
                }
                resolve(data);
            }).catch(error => {
                console.log(error.message);
                // reject(error);
                reject(null);
            });
        });
    }

    /**
     * Get variants of Product
     * @static
     * @param productId
     * @memberof ShopifyAdminAPI
     */
    public static GetVariantsOfProduct = async (productId: string) => {
        const functionName = `_GetProductInfo ${ productId }_`;
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Product + '/' + productId + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const variants: [] = respone.data.product.variants;
                const variantsCus = variants.map((item: any) => {
                    if (item) {
                        const data = {
                            id: item?.id,
                            product_id: item?.product_id,
                            title: item?.title,
                            option1: item?.option1,
                            option2: item?.option2,
                            price: item?.price,
                            sku: item?.sku,
                            inventory_item_id: item?.inventory_item_id,
                            inventory_quantity: item?.inventory_quantity,
                            requires_shipping: item?.requires_shipping,
                            taxable: item?.taxable,
                            created_at: item?.created_at,
                            updated_at: item?.updated_at
                        }
                        return data;
                    }
                })
                resolve(variantsCus);
            }).catch(error => {
                console.log(error.message);
                reject(error);
            });
        });
    }

    /**
     * Get taxes includes of Shop
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static GetShopTaxesIncludes = async () => {
        const functionName = `_GetShopTaxesIncludes_`;
        F_Log(`${ functionName } START`);

        return new Promise(async(resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Shop + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const taxesIncludes: any = respone.data.shop.taxes_included;
                resolve(taxesIncludes);
            }).catch(error => {
                console.log(error.message);
                reject(error);
            });
        });
    }

    /**
     * Update Customer by Id
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static UpdateCustomerById = (customerId: string, dataUpdate: any) => {

        return new Promise(async (resolve, reject) => {
            const functionName = '_UpdateCustomerById_';
            F_Log(`${ functionName } START`);
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Customers + '/' + customerId + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const customerJSON = {
                customer: dataUpdate
            };
            await axios.put(url, customerJSON, { headers: header }).then(respone =>{
                resolve({});
            }).catch(error => {
                let errMgs = error.message;
                const errors = error.response.data.errors;
                for (let key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        const value = errors[key];
                        errMgs += '\n\n ' + key + ': ' + value;
                    }
                }
                reject(errMgs);
            });
        });
    }

    /**
     * Add New Customer Address
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static AddNewCustomerAddress = (customerId: string, dataUpdate: any) => {
        return new Promise(async (resolve, reject) => {
            const functionName = '_UpdateCustomerById_';
            F_Log(`${ functionName } START`);
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/'
                + CONST_Harada_Tables.Customers + '/' + customerId + '/'
                + CONST_Harada_Tables.CustomerAddress + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const customerAddressJSON = {
                customer_address: dataUpdate
            };

            await axios.post(url, customerAddressJSON, { headers: header }).then(respone => {
                resolve({});
            }).catch(error => {
                console.log('___ERROR(AddNewCustomerAddress)___', error);
                reject(error);
            });
        });
    }

    /**
     * Update Customer Address by Id
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static UpdateCustomerAddressById = (customerId: string, customerAddressId: string, dataUpdate: any) => {

        return new Promise(async (resolve, reject) => {
            const functionName = '_UpdateCustomerById_';
            F_Log(`${ functionName } START`);
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/'
                + CONST_Harada_Tables.Customers + '/' + customerId + '/'
                + CONST_Harada_Tables.CustomerAddress + '/' + customerAddressId + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const customerAddressJSON = {
                customer_address: dataUpdate
            };

            await axios.put(url, customerAddressJSON, { headers: header }).then(respone => {
                resolve({});
            }).catch(error => {
                console.log('___ERROR(UpdateCustomerAddressById)___', error);
                reject(error);
            });
        });
    }

    /**
     *
     * Retrieves a list of orders that meet the specified criteria.
     * @static
     * @param _ids: Retrieve only orders specified by a comma-separated list of order IDs.
     * @memberof ShopifyAdminAPI
     */
    public static GetOrdersByOrderId = async (_ids: any) => {
        const functionName = '_GetOrdersByOrderId_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {

            // &fields: Retrieve only certain fields, specified by a comma-separated list of fields names.
            //          → id, contact_email, email, currency, current_total_price, current_subtotal_price, current_total_tax, order_number, customer, line_items
            // &ids:    Retrieve only orders specified by a comma-separated list of order IDs.
            // &limit:  The maximum number of results to show on a page. (≤ 250 default 50)
            let queryOption = `fields=id, current_total_price, total_price, created_at`;
            queryOption += `&limit=250`;
            queryOption += `&ids=` + _ids;
            queryOption += `&status=any`;

            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order + '.json?' + queryOption;
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };
            await axios.get(url, { headers: header }).then(respone => {
                const orders: any[] = respone.data.orders;
                // const data = orders.map(order => {
                //     return {
                //         id: order.id,
                //         cart_token: order.cart_token,
                //         name: order.name,
                //         order_number: order.order_number,
                //         customer: order.customer
                //     }
                // });
                resolve(orders);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     *
     * Get list order
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static GetOrdersOld = async () => {
        const functionName = '_GetOrdersOldCode_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order + '.json?status=any';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };
            await axios.get(url, { headers: header }).then(respone => {
                const orders: any[] = respone.data.orders;
                const data = orders.map(order =>
                {
                    return {
                        id: order.id,
                        cart_token: order.cart_token,
                        name: order.name,
                        order_number: order.order_number,
                        customer: order.customer
                    }
                });
                resolve(data);
            }).catch(error =>
            {
                reject(error);
            });
        });
    }

    /**
     * Insert an Order
     * @static
     * @param _reqData
     * @memberof ShopifyAdminAPI
     */
    public static InsertOrderOld = async (_reqData: any) => {
        const functionName = '_InsertOrder_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const orderJSON = {
                order: _reqData
            };

            await axios.post(url, orderJSON, { headers: header }).then(respone => {

                console.log('___[insert_order]___', respone.data);
                // const orders: any[] = respone.data.orders;
                // const data = orders.map(order => {
                //     return {
                //         id: order.id,
                //         cart_token: order.cart_token,
                //         name: order.name,
                //         order_number: order.order_number,
                //         customer: order.customer
                //     }
                // });

                const data = respone.data;

                resolve(data);
            }).catch(error => {
                console.log('___[ERORR_INSERT_ORDER]____', error.message);
                reject(error);
            });
        });
    }

    /**
     * Insert an Order
     * Ref to: https://shopify.dev/api/examples/order-testing
     * @static
     * @param _reqData
     * @memberof ShopifyAdminAPI
     */
    public static InsertOrder = async (_reqData: any) => {
        const functionName = '_InsertOrder(Shopify)_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const orderJSON = {
                order: _reqData
            };

            await axios.post(url, orderJSON, { headers: header }).then(respone => {

                // console.log('___[Insert_Order]___', respone.data);
                const data = respone.data;
                resolve(data);

            }).catch(error => {
                console.log('___[ERORR_INSERT_ORDER]____', error.message);
                reject(error);
                // let errMgs = error.message;
                // const errors = error.response.data.errors;
                // for (let key in errors) {
                //     if (errors.hasOwnProperty(key)) {
                //         const value = errors[key];
                //         errMgs += '\n\n ' + key + ': ' + value;
                //     }
                // }
                // reject(errMgs);
            });
        });
    }

    /**
     * Update an Order
     * Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/order#put-orders-order-id
     * @static
     * @param order
     * @memberof ShopifyAdminAPI
     */
    public static UpdateOrder = async (order: any) => {
        const functionName = '_UpdateOrder(Shopify)_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order + '/' + order.id + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const orderJSON = {
                order: order
            };

            await axios.put(url, orderJSON, { headers: header }).then(respone => {
                    const data = respone.data;
                    console.log('___[UPDATE_ORDER](OK)____');
                    resolve(data);
                }).catch(error => {
                    console.log('___[ERORR_UPDATE_ORDER]____', error.message);
                    reject(error);
                });
        });
    }

    /**
     * Delete Order by Id
     *  Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/order#delete-orders-order-id
     *  Deletes an order. Orders that interact with an online gateway can't be deleted.
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static DeleteOrder = (orderId: string) => {
        return new Promise(async (resolve, reject) => {
            const functionName = '_DeleteOrder(Shopify)_';

            // const url = CONST_Harada_Endpoints + '2020-04' + '/' + CONST_Harada_Tables.Customers + '/' + orderId + '.json';
            const url = CONST_Harada_Endpoints + '2020-10' + '/' + CONST_Harada_Tables.Order + '/' + orderId + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };
            await axios.delete(url, { headers: header }).then(respone => {
                const data = respone.data;
                console.log('___[DELETE_ORDER](OK)____');
                resolve(true);
            }).catch(error => {
                let errMgs = error.message;
                errMgs += '\n' + error.response.data.errors;
                console.log('___[ERORR_DELETE_ORDER]____', error.message);
                reject(errMgs);
            });
        });
    }

    /**
     * Refund Transaction by Paypal
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static RefundTransaction = async (_req: any) => {
        const functionName = '_RefundTransaction_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            // https://developer.paypal.com/docs/api/payments/v2/#captures_refund
            // Note: This is example code. Each server platform and programming language has a different way of handling requests, 
            //      making HTTP API calls, and serving responses to the browser.

            // 1. Set up your server to make calls to PayPal

            //      1a. Add your client ID and secret
            const PAYPAL_CLIENT = 'ASrQu7ncOggr53LIZvl4-1iU2_-DTleQsiiPQ0Kb-yPVhQzDo7BLtcOWhM-4UBAw_9hbyremAwxjh6Kb';
            const PAYPAL_SECRET = 'EI4djUaQ0XIMUyJFvO9ilEeovUpHqg7g95YQVKk7T1G3VVODTCpeSttHvTv06nePOfS-bbSR68IiASaq';

            //      1b. Point your server to the PayPal API
            const PAYPAL_PAYMENTS_API = 'https://api.sandbox.paypal.com/v2/payments/captures/';

            //      1c. Get an access token
            const basicAuth = Buffer.from(PAYPAL_CLIENT + ":" + PAYPAL_SECRET, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + basicAuth,
            };

            // 2. Get the capture ID from your database
            const captureID = _req.body.captureID;
            const objRefund = _req.body.objRefund;

            // 3. Call PayPal to refund the transaction
            await axios.post(PAYPAL_PAYMENTS_API + captureID + '/refund', objRefund, { headers: header }).then(respone => {
                const data = respone.data;
                resolve(data);
            }).catch(error => {
                console.log('___[ERORR_REFUND_TRANSACTION]____', error.message);
                reject(error)
            });
        });
    }

    /**
     * Get Order Detail by Id
     * @static
     * @param order_id
     * @memberof ShopifyAdminAPI
     */
    public static GetOrderDetail = async (order_id: any) => {
        const functionName = '_GetOrderDetail_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const COUNTRY_CODE_JAPAN = 'JP';
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order + '/' + order_id + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {

                const shipping_address = respone.data.order.shipping_address;
                if (shipping_address.country_code === COUNTRY_CODE_JAPAN) {
                    const province_code = shipping_address.province_code;
                    const provinceOption = CONST_Harada_Province_Of_JP.find(x => x.key === province_code);
                    const province = (provinceOption === undefined) ? shipping_address.province : provinceOption.text;
                    shipping_address.province = province;
                }
                const billing_address = respone.data.order.billing_address;
                if (billing_address.country_code === COUNTRY_CODE_JAPAN) {
                    const province_code = billing_address.province_code;
                    const provinceOption = CONST_Harada_Province_Of_JP.find(x => x.key === province_code);
                    const province = (provinceOption === undefined) ? billing_address.province : provinceOption.text;
                    billing_address.province = province;
                }
                const data = respone.data;

                resolve(data);
            }).catch(error => {
                console.log('___[ERORR_GET_ORDER_DETAIL]____', error.message);
                reject(error);
            });
        });
    }

    /**
     * Get Checkouts
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static GetCheckouts = async (_req: any) => {
        const functionName = '_GetCheckouts_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {

            // _req.body.customerId
            // CONST_Harada_Endpoints + CONST_Harada_api_version + '/' + checkouts.json?created_at_min=2021-11-12&limit=2

            const created_at_min = _req.body.created_at_min;
            const limit = _req.body.limit;
            const token = _req.body.token;

            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.AbandonedCheckouts + '.json?created_at_min=' + created_at_min + '&limit=' + limit;

            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const checkouts: any[] = respone.data.checkouts;
                const item = checkouts.find(item => item.token === token);
                let data = null;
                if (item !== undefined && item !== null) {
                    data = {
                        id: item.id,
                        token: item.token,
                        cart_token: item.cart_token,
                        name: item.name,

                        created_at: item.created_at,
                        updated_at: item.updated_at,
                        // abandoned_checkout_url: item.abandoned_checkout_url,
                        // total_discounts: item.total_discounts,
                        // total_line_items_price: item.total_line_items_price,
                        // total_price: item.total_price,
                        // total_tax: item.total_tax,
                        // subtotal_price: item.subtotal_price,
                        // total_duties: item.total_duties,
                        // presentment_currency: item.presentment_currency,
                        // currency: item.currency,
                        // line_items: item.line_items,
                        // customer: item.customer

                        customer_id: item.customer.id,
                        customer: item.customer
                    }
                }

                //#region 
                // const data = checkouts.map(item => {
                //     return {
                //         id: item.id,
                //         token: item.token,
                //         cart_token: item.cart_token,
                //         name: item.name,
                //         created_at: item.created_at,
                //         updated_at: item.updated_at,
                //         abandoned_checkout_url: item.abandoned_checkout_url,
                //         total_discounts: item.total_discounts,
                //         total_line_items_price: item.total_line_items_price,
                //         total_price: item.total_price,
                //         total_tax: item.total_tax,
                //         subtotal_price: item.subtotal_price,
                //         total_duties: item.total_duties,
                //         presentment_currency: item.presentment_currency,
                //         currency: item.currency,
                //         line_items: item.line_items,
                //         customer: item.customer
                //     }
                // });
                //#endregion

                resolve(data);
            }).catch(error => {
                reject(error)
            });
        });
    }

    /**
     * Get Fee by Shipping Zone
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static GetFeeByShippingZone = async (_req: any) => {
        const functionName = '_GetShippingZone_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const country_code = _req.body.country_code === 'JP' ? _req.body.country_code : '*';
            const province_code = _req.body.province_code;

            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.ShippingZone + '.json';

            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {

                const shipping_zones: any[] = respone.data.shipping_zones;

                //#region The value Rates
                // Information about carrier shipping providers and the rates used.
                //#region Description
                /**
                 * "carrier_shipping_rate_providers": [
                        {
                            "id": 615128020,
                            "carrier_service_id": 260046840,
                            "flat_modifier": "",
                            "percent_modifier": null,
                            "service_filter": {
                                "*": "+"
                            },
                            "shipping_zone_id": 44570466
                        }
                    ]
                */
                let carrier_shipping_rate_providers = 0;
                //#endregion

                // Information about a price-based shipping rate.
                //#region Description
                /**
                 * "price_based_shipping_rates": [
                        {
                            "id": 64051,
                            "name": "Free Shipping",
                            "price": "0.00",
                            "shipping_zone_id": 44570466,
                            "min_order_subtotal": null,
                            "max_order_subtotal": "450"
                        }
                    ],
                */
                let price_based_shipping_rates = 0;
                //#endregion

                // Information about a weight-based shipping rate.
                //#region Description
                /**
                 * "weight_based_shipping_rates": [
                        {
                            "id": 522512552,
                            "name": "Free Under 5kg",
                            "price": "0.00",
                            "shipping_zone_id": 44570466,
                            "weight_low": 0,
                            "weight_high": 5
                        }
                    ],
                */
                let weight_based_shipping_rates = 0;
                //#endregion
                //#endregion

                let data = null;

                if (shipping_zones.length > 0) {

                    data = shipping_zones.map(shippingZone => {

                        // Get list of Countries
                        const countries = shippingZone.countries;
                        // Get country detail from to list[@countries]
                        const item = countries.find((country: any) => country.code === country_code);

                        if (item !== undefined && item !== null) {

                            const shippingZoneId = item.shipping_zone_id;
                            const shippingZoneDetail = shipping_zones.find((_item: any) => _item.id === shippingZoneId);
                            if (shippingZoneDetail !== undefined && shippingZoneDetail !== null) {

                                let listShippingRatesName = '';
                                //#region Carrier shipping rate providers
                                // Get list of Carrier shipping rate providers
                                const carrierSRP = shippingZoneDetail.carrier_shipping_rate_providers;
                                // Get Carrier detail from to list[@carrierSRP]
                                const listCarrier = carrierSRP.filter((_carrier: any) => _carrier.shipping_zone_id === shippingZoneId);
                                carrier_shipping_rate_providers = 0;
                                //#endregion

                                //#region Price based shipping rates
                                // Get list of Price based shipping rates
                                const priceBasedSR = shippingZoneDetail.price_based_shipping_rates;
                                // Get Carrier detail from to list[@carrierSRP]
                                const listPriceBased = priceBasedSR.filter((_priceBased: any) => _priceBased.shipping_zone_id === shippingZoneId);
                                if (listPriceBased.length > 0) {
                                    price_based_shipping_rates = listPriceBased.reduce((a: any, b: any) => a + (parseInt(b['price'], 10) || 0), 0);

                                    // 2021.12.23
                                    const list_name_price_based_shipping_rates = listPriceBased.map((item: any) => { return item.name; }).join(', ');
                                    listShippingRatesName += list_name_price_based_shipping_rates;
                                }
                                //#endregion

                                //#region Weight based shipping rates
                                // Get list of Weight based shipping rates
                                const weightBasedSR = shippingZoneDetail.weight_based_shipping_rates;
                                // Get Carrier detail from to list[@carrierSRP]
                                const listWeightBase = weightBasedSR.filter((_weightBased: any) => _weightBased.shipping_zone_id === shippingZoneId);
                                if (listWeightBase.length > 0) {
                                    // weight_based_shipping_rates = weightBaseResult.price;
                                    weight_based_shipping_rates = listWeightBase.reduce((a: any, b: any) => a + (parseInt(b['price'], 10) || 0), 0);

                                    // 2021.12.23
                                    const list_name_weight_based_shipping_rates = listWeightBase.map((item: any) => { return item.name; }).join(', ');
                                    listShippingRatesName += list_name_weight_based_shipping_rates;
                                }
                                //#endregion

                                const price = (carrier_shipping_rate_providers + price_based_shipping_rates + weight_based_shipping_rates);

                                return {

                                    id: shippingZoneDetail.id,
                                    name: shippingZoneDetail.name,

                                    _listShippingRatesName: listShippingRatesName,

                                    weight_based_shipping_rates: shippingZoneDetail.weight_based_shipping_rates,
                                    price_based_shipping_rates: shippingZoneDetail.price_based_shipping_rates,
                                    carrier_shipping_rate_providers: shippingZoneDetail.carrier_shipping_rate_providers,

                                    country_code: country_code,
                                    province_code: province_code,

                                    price: price,

                                    _carrier_shipping_rate_providers: carrier_shipping_rate_providers,
                                    _price_based_shipping_rates: price_based_shipping_rates,
                                    _weight_based_shipping_rates: weight_based_shipping_rates,
                                }
                            }
                        } else {
                            return {
                                id: 0,
                                price: 0
                            }
                        }
                    });
                }

                data = data?.filter((x: any) => x.id != 0);

                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * Get fee Tax
     * The Country resource represents the tax rates applied to orders from the different countries where a shop sells its products.
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static GetFeeTax = async (_req: any) => {
        const functionName = '_GetTax_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const country_code = _req.body.country_code;
            const province_code = _req.body.province_code;

            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Country + '.json';

            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const countries: any[] = respone.data.countries;
                const item = countries.find(item => item.code === country_code);
                let data = null;
                if (item !== undefined && item !== null) {
                    // data = {
                    //     id: item.id,
                    //     name: item.name,
                    //     code: item.code,
                    //     tax_name: item.tax_name,
                    //     tax: item.tax,
                    //     // provinces: item.provinces,
                    // };
                    data = {
                        id: item.id,
                        code: item.code,
                        title: item.tax_name,
                        rate: item.tax,
                    };
                    // console.log('___respone(item)____', data);
                    if (item.tax === 0 && item.provinces.length > 0) {
                        // Check Tax for province in the case [@item.tax is (0) and item have list of province]
                        const itemProvince = item.provinces.find((province: any) => province.code === province_code);
                        if (itemProvince !== undefined && itemProvince !== null) {
                            // data = {
                            //     id: itemProvince.id,
                            //     country_id: itemProvince.country_id,
                            //     name: itemProvince.name,
                            //     code: itemProvince.code,

                            //     tax_name: itemProvince.tax_name,
                            //     tax_type: itemProvince.tax_type,
                            //     shipping_zone_id: itemProvince.shipping_zone_id,
                            //     tax: itemProvince.tax,
                            //     tax_percentage: itemProvince.tax_percentage
                            // };

                            data = {
                                id: itemProvince.id,
                                country_id: itemProvince.country_id,
                                name: itemProvince.name,
                                code: itemProvince.code,

                                title: itemProvince.tax_name,
                                tax_type: itemProvince.tax_type,
                                shipping_zone_id: itemProvince.shipping_zone_id,
                                rate: itemProvince.tax,
                                tax_percentage: itemProvince.tax_percentage
                            };
                        } else {
                            // data = {
                            //     id: 0,
                            //     country_id: item.id,
                            //     name: 'Rest of World(Province)',
                            //     code: '*',
                            //     tax_name: 'Tax',
                            //     tax_type: 'Tax_Type',
                            //     shipping_zone_id: 0,
                            //     tax: 0,
                            //     tax_percentage: 0
                            // }
                            data = {
                                id: 0,
                                country_id: item.id,
                                name: 'Rest of World(Province)',
                                code: '*',
                                title: 'Tax',
                                tax_type: 'Tax_Type',
                                shipping_zone_id: 0,
                                rate: 0,
                                tax_percentage: 0
                            }
                        }
                    }
                } else {
                    // data = {
                    //     id: 408471601306,
                    //     name: 'Rest of World',
                    //     code: '*',
                    //     tax_name: 'Tax',
                    //     tax: 0.0,
                    //     provinces: [],
                    // }
                    data = {
                        id: 408471601306,
                        code: '*',
                        title: 'Tax',
                        rate: 0.0,
                    };
                }

                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * Get Customer By Id
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static GetUserById = async (_req: any) => {
        const functionName = '_GetUserById_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const COUNTRY_CODE_JAPAN = 'JP';
            const customer_id = _req.body.customerId;
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Customers + '/' + customer_id + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const customer: any = respone.data.customer;
                const data = {
                    id: customer.id,
                    email: customer.email,
                    first_name: customer.first_name,
                    last_name: customer.last_name,
                    phone: customer.phone,
                    accepts_marketing: customer.accepts_marketing,

                    // addresses: customer.addresses,

                    addresses: customer.addresses.map((address: any) => {

                        const contry = CONST_Harada_Countries.find(x => x.key === address.country_code);
                        const country_name = (contry === undefined) ? '' : contry.text;

                        let _addressInfoDisplay = address.address1 + ', '
                            + address.address2 + ', '
                            + address.city + ' ' + address.zip + ', '
                            + country_name + ' ('
                            + address.name + ', '
                            + address.company + ')';
                        if (address.country_code === COUNTRY_CODE_JAPAN) {
                            const province_code = address.province_code;
                            const provinceOption = CONST_Harada_Province_Of_JP.find(x => x.key === province_code);
                            const province = (provinceOption === undefined) ? address.province : provinceOption.text;

                            _addressInfoDisplay = address.name + ', '
                                + address.zip + ', '
                                + province + ' ' + address.city + ' ' + address.address1 + ', '
                                + address.address2 + ', '
                                + country_name + ' ('
                                + address.first_name + ' ' + address.last_name + ', '
                                + address.company + ')';
                        }

                        return {
                            id: address.id,
                            customer_id: address.customer_id,
                            first_name: address.first_name,
                            last_name: address.last_name,
                            company: address.company,
                            address1: address.address1,
                            address2: address.address2,
                            city: address.city,
                            province: address.province,
                            country: address.country,
                            zip: address.zip,
                            phone: address.phone,
                            name: address.name,
                            province_code: address.province_code,
                            country_code: address.country_code,
                            country_name: address.country_name,
                            default: address.default,

                            addressInfoDisplay: _addressInfoDisplay

                        }
                    }),

                    default_address: customer.default_address,
                }

                if (!F_IsNullOrEmptyListItem(data) && !F_IsNullOrEmptyListItem(data.addresses)) {
                    const addressesSort = data.addresses.sort((a: any, b: any) => (a.id > b.id) ? -1 : ((a.id < b.id) ? 1 : 0));
                    const takeItem = 5;
                    data.addresses = addressesSort.slice(0, takeItem);
                }

                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * Update Customer
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static UpdateCustomer = async (_req: any) => {
        const functionName = '_UpdateCustomer_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const reqData = _req.body.customer;
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Customers + '/' + reqData.id + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const customerJSON = {
                customer: reqData
            };

            await axios.put(url, customerJSON, { headers: header }).then(respone => {
                const data = respone.data;
                resolve(data);
            }).catch(error => {
                console.log('___[ERORR_UPDATE_CUSTOMER]____', error.message);
                reject(error);
            });
        });
    }

    /**
     * Get Products
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static GetProducts = async () => {
        const functionName = '_GetProducts_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Product + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const products: any[] = respone.data.products;
                const data = products.map(product =>
                {
                    return {
                        id: product.id,
                        title: product.title,
                        images: product.images,
                    }
                });
                resolve(data);

            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * Send Email
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static SendEmail = async (_req: any) => {
        const functionName = '_SendEmail_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const COUNTRY_CODE_JAPAN = 'JP';
            const orderData = _req.body.order;
            const sendgridEmailType = _req.body.sendgridEmailType;

            //#region Variables of Order data
            const orderNo = orderData.orderNo;
            const orderEmail = orderData.orderEmail;
            const order_status_url = orderData.order_status_url;
            const customer_lastname = orderData.customer_lastname;
            const shipping_method = orderData.shipping_method;

            // const subtotal_price = orderData.subtotal_price;
            // const shipping_price = orderData.shipping_price;
            // const total_tax = orderData.total_tax;
            // const total_price = orderData.total_price;

            const subtotal_price = F_FormatCurrency(orderData.subtotal_price).replace('￥', '');
            const shipping_price = F_FormatCurrency(orderData.shipping_price).replace('￥', '');
            const total_tax = F_FormatCurrency(orderData.total_tax).replace('￥', '');
            const total_price = F_FormatCurrency(orderData.total_price).replace('￥', '');

            const shipping_address = orderData.shipping_address;
            if (shipping_address.country_code === COUNTRY_CODE_JAPAN) {
                const province_code = shipping_address.province_code;
                const provinceOption = CONST_Harada_Province_Of_JP.find(x => x.key === province_code);
                const province = (provinceOption === undefined) ? shipping_address.province : provinceOption.text;
                shipping_address.province = province;
            }
            const billing_address = orderData.billing_address;
            if (billing_address.country_code === COUNTRY_CODE_JAPAN) {
                const province_code = billing_address.province_code;
                const provinceOption = CONST_Harada_Province_Of_JP.find(x => x.key === province_code);
                const province = (provinceOption === undefined) ? billing_address.province : provinceOption.text;
                billing_address.province = province;
            }
            const line_items_for_dynamic_transaction_email: any = [];
            let strListItem = '';
            const line_items = orderData.line_items;
            line_items.map((item: any, i: any) => {
                const total = F_FormatCurrency(item.cr164_quantity * item.cr164_price).replace('￥', '');

                if (sendgridEmailType === SENDGRID_EMAIL.PACKAGE) {

                    // SENDGRID_EMAIL.PACKAGE
                    strListItem += '                   <tr>'
                        + '                         <td width=\'95px\'>'
                        + '                             <img class=\'max-width\' src=\'' + item.cr164_image_thumbnail
                        + '\' alt=\'' + item.cr164_product_name + ' - ' + item.cr164_category_name + '\' border=\'0\' width=\'95\' height=\'120\'  style=\'width: 95px; height: 120px;\' />'
                        + '                         </td>'
                        + '                         <td colspan=\'2\'>'
                        + '                             <div style=\'width: 100%;\' class=\'font-weight\'>' + item.cr164_product_name + ' × ' + item.cr164_quantity + '</div>'
                        + '                             <div style=\'width: 100%;\' class=\'color-gray\'>' + item.cr164_category_name + '</div>'
                        + '                         </td>'
                        + '                         <td class=\'font-weight\' style=\'text-align: right;\'>￥' + total + '</td>'
                        + '                     </tr>';
                } else {

                    // SENDGRID_EMAIL.API
                    const objItem = {
                        imgThumbnail: item.cr164_image_thumbnail,
                        productName: item.cr164_product_name,
                        title: item.cr164_category_name,
                        quantity: item.cr164_quantity,
                        price: item.cr164_price,
                        total: total
                    }
                    line_items_for_dynamic_transaction_email.push(objItem);
                }
            });
            //#endregion

            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            if (sendgridEmailType === SENDGRID_EMAIL.PACKAGE) {
                // SENDGRID_EMAIL.PACKAGE

                sendgrid.setApiKey(SENDGRID_API_KEY)

                //#region Custom HTML
                const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                    + '<html xmlns="http://www.w3.org/1999/xhtml">'
                    //#region Tag<header>
                    + ' <head>'
                    + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                    + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                    + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'

                    + '     <style type=\'text/css\'>'
                    + '         @import url(\'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;1,100&display=swap\');'
                    + '         html, body { font-family: \'Roboto\', sans-serif; }'
                    + '         body { width: 60%; }'
                    + '         ._width_table { width: 400px; }'
                    + '         .font-size-20 { font-size: 20px; } '
                    + '         .font-size-25 { font-size: 25px; } '
                    + '         .font-size-30 { font-size: 30px; } '
                    + '         .font-size-50 { font-size: 50px; } '
                    + '         .color-gray { color: gray; } '
                    + '         .font-weight { font-weight: bold; color: #545454; } '
                    + '         .text-right { text-align: right !important; } '
                    + '         .vertical-align-mid { vertical-align: middle; } '
                    + '         .border-top { border-top: 1px solid #ddd; } '
                    + '         .border-bottom { border-bottom: 1px solid #ddd; } '
                    + '         .text-decoration { text-decoration: none;  } '
                    + '         .width-50-percent { width: 50%; } '
                    + '         img.max-width { height: auto !important; max-width: 100% !important; }'
                    + '     </style>'
                    + ' </head>'
                    //#endregion

                    + ' <body>'
                    + '  <center class=\'wrapper\'>'
                    + '    <!--[if mso]>'
                    + '     <center>'
                    + '      <table><tr><td width="500">'
                    + '       <![endif]-->'  // Use for width

                    + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'
                    + '         <tr class=\'font-size-25\'>'
                    + '             <td>Harada Corp Sunset Moment</td>'
                    + '             <td class=\'font-weight\'>注文 ' + orderNo + '</td>'
                    + '         </tr>'
                    + '         <tr>'
                    + '             <td colspan=\'2\' class=\'font-size-30\'>ご購入いただきありがとうございました! </td>'
                    + '         </tr>'
                    + '         <tr>'
                    + '             <td colspan=\'2\' class=\'color-gray\' style=\'height: 30px;\'>' + customer_lastname + '様、ご注文いただき、誠にありがとうございます。注文の発送準備を行なっております。</td>'
                    + '         </tr>'
                    + '         <tr>'
                    + '             <td colspan=\'2\' class=\'color-gray\' style=\'height: 30px;\'>商品が発送されましたら、Eメールにてお知らせいたします。</td>'
                    + '         </tr>'
                    + '         <tr>'
                    + '             <td colspan=\'2\' class=\'link-order\' style=\'height: 30px;\'><a class=\'text-decoration\' href=\'' + order_status_url + '\' title=\'注文を表示する\' style=\'background-color: #56a8e9; color: #fff;\'>注文を表示する</a></td>'
                    + '         </tr>'
                    + '         <tr>'
                    + '             <td colspan=\'2\' style=\'height: 50px\'>または<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'注文を表示する\' style=\'color: #56a8e9;\'>ショップにアクセスする</a></td>'
                    + '         </tr>'
                    + '         <tr>'
                    + '             <td colspan=\'2\'>'

                    //#region List of item
                    + '                 <table style=\'width: 100%;\'>'
                    + '                     <tr>'
                    + '                         <td colspan=\'4\' style=\'height: 60px; font-size: 24px;\'>注文概要</td>'
                    + '                     </tr>'

                    + strListItem

                    //#region 小計
                    + '                     <tr>'
                    + '                         <td style=\'height: 30px\' class=\'border-top\'></td>'
                    + '                         <td colspan=\'2\' class=\'color-gray\' style=\'border-top: 1px solid #ddd;\'>小計</td>'
                    + '                         <td class=\'font-weight\' style=\'text-align: right; border-top: 1px solid #ddd;\'>￥' + subtotal_price + '</td>'
                    + '                     </tr>'
                    //#endregion

                    //#region 配送
                    + '                     <tr>'
                    + '                         <td style=\'height: 25px\'></td>'
                    + '                         <td colspan=\'2\' class=\'color-gray\'>配送</td>'
                    + '                         <td class=\'font-weight\' style=\'text-align: right;\'>￥' + shipping_price + '</td>'
                    + '                     </tr>'
                    //#endregion

                    //#region 税金合計
                    + '                     <tr>'
                    + '                         <td style=\'height: 25px\'></td>'
                    + '                         <td colspan=\'2\' class=\'color-gray\'>税金合計</td>'
                    + '                         <td class=\'font-weight\' style=\'text-align: right;\'>￥' + total_tax + '</td>'
                    + '                     </tr>'
                    //#endregion

                    //#region 合計
                    + '                     <tr>'
                    + '                         <td style=\'height: 60px\'></td>'
                    + '                         <td colspan=\'2\' class=\'color-gray\' style=\'border-top: 1px solid #ddd;\'>合計</td>'
                    + '                         <td class=\'font-weight\' style=\'text-align: right; font-size: 25px; border-top: 1px solid #ddd;\'>￥' + total_price + ' JPY</td>'
                    + '                     </tr>'
                    //#endregion

                    + '                 </table>'
                    //#endregion

                    + '             </td>'
                    + '         </tr>'

                    + '         <tr>'
                    + '             <td colspan=\'2\' style=\'height: 60px; font-size: 24px;\'>お客様情報</td>'
                    + '         </tr>'

                    + '         <tr>'
                    + '             <td colspan=\'2\'>'

                    //#region Shipping Address -  Billing Address
                    + '                 <table style=\'width: 100%; color: #545454;\'>'
                    + '                     <tr>'
                    + '                         <td class=\'width-50-percent\'>配送先住所</td>'
                    + '                         <td class=\'width-50-percent\'>請求先住所</td>'
                    + '                     </tr>'

                    + '                     <tr>'
                    + '                         <td style=\'height: 30px\'>' + shipping_address.company + '</td>'
                    + '                         <td>' + billing_address.company + '</td>'
                    + '                     </tr>'

                    + '                     <tr>'
                    + '                         <td style=\'height: 30px\'>' + shipping_address.name + '</td>'
                    + '                         <td>' + billing_address.name + '</td>'
                    + '                     </tr>'

                    + '                     <tr>'
                    + '                         <td style=\'height: 30px\'>' + shipping_address.zip + '</td>'
                    + '                         <td>' + billing_address.zip + '</td>'
                    + '                     </tr>'

                    + '                     <tr>'
                    + '                         <td style=\'height: 30px\'>' + shipping_address.province + ' ' + shipping_address.city + ' ' + shipping_address.address1 + '</td>'
                    + '                         <td>' + billing_address.province + ' ' + billing_address.city + ' ' + billing_address.address1 + '</td>'
                    + '                     </tr>'

                    + '                     <tr>'
                    + '                         <td style=\'height: 30px\'>' + shipping_address.address2 + '</td>'
                    + '                         <td>' + billing_address.address2 + '</td>'
                    + '                     </tr>'

                    + '                     <tr>'
                    + '                         <td style=\'height: 30px\'>' + shipping_address.country + '</td>'
                    + '                         <td>' + billing_address.country + '</td>'
                    + '                     </tr>'

                    + '                     <tr>'
                    + '                         <td colspan=\'2\' style=\'height: 30px\'></td>'
                    + '                     </tr>'

                    + '                     <tr>'
                    + '                         <td style=\'height: 35px\'>' + (shipping_method === '' ? '' : '配送方法') + '</td>'
                    + '                         <td>決済方法</td>'
                    + '                     </tr>'
                    + '                     <tr>'
                    + '                         <td style=\'height: 30px\'>' + shipping_method + '</td>'
                    + '                         <td>Bogus — <span class=\'font-weight\' style=\'font-size: 17px;\'>' + total_price + '</span></td>'
                    + '                     </tr>'
                    + '                     <tr>'
                    + '                         <td colspan=\'2\' class=\'border-bottom\' style=\'height: 70px\'></td>'
                    + '                     </tr>'

                    + '                 </table>'
                    //#endregion

                    + '             </td>'
                    + '         </tr>'


                    + '         <tr>'
                    + '             <td colspan=\'2\' class=\'color-gray\' style=\'height: 30px; line-height:1.5; margin-top:15px;\'>ご不明な点がございましたら、このメールにご返信いただくか、<a class=\'text-decoration\' href=\'mailto:development@virtual-arts.co.jp\' title=\'development@virtual-arts.co.jp\'  style=\'color: #56a8e9;\'>development@virtual-arts.co.jp</a>までご連絡ください。</td>'
                    + '         </tr>'

                    + '     </table>'
                    + '              <!--[if mso]>'
                    + '            </td>'
                    + '          </tr>'
                    + '        </table>'
                    + '      </center>'
                    + '     <![endif]-->'
                    + '  </center>'
                    + ' </body>'
                    + '</html>';
                //#endregion

                const msg = {
                    // Change to your recipient
                    to: orderEmail,
                    // Change to your verified sender
                    from: SENDGRID_FROM_EMAIL,
                    subject: 'ご注文内容の確認　注文番号：' + orderNo,
                    html: _htmlBody
                };

                sendgrid.send(msg).then((resp: any) => {
                    resolve(resp);
                }).catch((error: any) => {
                    console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                    reject(error);
                })
            } else {
                // SENDGRID_EMAIL.API

                //#region For CALL API - Send a transactional email
                // https://docs.sendgrid.com/ui/sending-email/how-to-send-an-email-with-dynamic-transactional-templates#before-you-begin
                const url = 'https://api.sendgrid.com/v3/mail/send';
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + SENDGRID_API_KEY,
                };
                // https://mc.sendgrid.com/dynamic-templates
                // The template ID is 64 characters with one dash (d-uuid)
                const template_id = 'd-f2f13d6a8a864a68bde0b7799166b419';
                const reqDynamicTransactionalEmail = {
                    subject: 'ご注文内容の確認　注文番号： ' + orderNo, // Not working for Subject
                    template_id: template_id,
                    from: {
                        email: SENDGRID_FROM_EMAIL
                    },
                    personalizations: [
                        {
                            to: [
                                {
                                    email: orderEmail
                                }
                            ],
                            dynamic_template_data: {
                                customer_lastname: customer_lastname,
                                orderNo: orderNo,
                                order_status_url: order_status_url,
                                subtotal_price: subtotal_price,
                                shipping_price: shipping_price,
                                total_tax: total_tax,
                                total_price: total_price,
                                line_items: line_items_for_dynamic_transaction_email,
                                shipping_address: shipping_address,
                                billing_address: billing_address,
                                shipping_method: shipping_method,
                                subject: 'ご注文内容の確認　注文番号： ' + orderNo, // -> working for Subject
                            }
                        }
                    ]
                };
                await axios.post(url, reqDynamicTransactionalEmail, { headers: header }).then(respone => {
                    // console.log('___[Send_a_transactional_mail]___', respone);
                    // Error: TypeError: Converting circular structure to JSON --> starting at object with constructor 'ClientRequest' -> by SendGrid.
                    // const data = respone;
                    const data = {
                        status: 200,
                        statusText: 'Accepted'
                    };
                    resolve(data);
                }).catch(error => {
                    console.log('___ERROR[// SENDGRID_EMAIL.API]___', error.message);
                    reject(error);
                });
                //#endregion
            }
            //#endregion
        });
    }

    /**
     * Get list of Variants Id
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static GetListVariantsId = async (_req: any) => {
        const functionName = '_GetListVariantsId_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const product_id = _req.body.product_id;
            const list_sku = _req.body.list_sku;
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Product + '/' + product_id + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const product: any = respone.data.product;
                let data = product.variants.map((variant: any) => {
                    if (!F_IsNullOrEmptyListItem(list_sku.find((x: any) => x === variant.sku))) {
                        return {
                            id: variant.id,
                            sku: variant.sku
                        }
                    } else {
                        return {
                            id: 0,
                            sku: ''
                        }
                    }
                });
                data = data?.filter((x: any) => x.id != 0);

                resolve(data);
            }).catch(error => {
                console.log(error.message);
                reject(error);
            });
        });
    }

    /**
     *
     * Get list of Variants Id 02
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static GetListVariantsId_02 = async (_req: any) => {
        const functionName = '_GetListVariantsId_02_';
        F_Log(`${ functionName } START`);
        return new Promise(async (resolve, reject) => {
            const list_sku = _req.body.list_sku;
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Product + '.json?fields=variants';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };
            await axios.get(url, { headers: header }).then(respone => {
                const products: any = respone.data.products;
                let result: any = [];
                products.map((product: any) =>
                {
                    product.variants.map((variant: any) =>
                    {
                        if (!F_IsNullOrEmptyListItem(list_sku.find((x: any) => x === variant.sku))) {
                            const objVariant = {
                                id: variant.id,
                                sku: variant.sku
                            }
                            result.push(objVariant);
                        }
                    });
                });
                resolve(result);

            }).catch(error => {
                console.log(error.message);
                reject(error);
            });
        });
    }

    /**
     * Get list of Products Id with field[@variants]
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static GetListProductsId = async (_req: any) => {
        const functionName = '_GetListProductsId_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const list_sku = _req.body.list_sku;
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Product + '.json?fields=variants';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const products: any = respone.data.products;
                let result: any = [];
                products.map((product: any) => {
                    product.variants.map((variant: any) => {
                        if (!F_IsNullOrEmptyListItem(list_sku.find((x: any) => x === variant.sku))) {
                            const objProduct = result.find((z: any) => z === variant.product_id);
                            if (objProduct === undefined) {
                                result.push(variant.product_id);
                            }
                        }
                    });
                });
                resolve(result);
            }).catch(error => {
                console.log(error.message);
                reject(error);
            });
        });
    }

    /**
     * Delete Customer by Id
     *  Ref to: https://community.shopify.com/c/technical-q-a/method-to-remove-customer-account-using-shopify-api/td-p/763383
     *  In case this customer has an order, it cannot be deleted. (To delete the customer must delete the Order first)
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static DeleteCustomerById = (customerId: string) => {
        return new Promise(async (resolve, reject) => {
            const functionName = '_DeactiveCustomerById_';

            const url = CONST_Harada_Endpoints + '2020-04' + '/' + CONST_Harada_Tables.Customers + '/' + customerId + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };
            await axios.delete(url, { headers: header }).then(respone => {
                resolve(true);
            }).catch(error => {
                let errMgs = error.message;
                errMgs += '\n' + error.response.data.errors;
                reject(errMgs);
            });
        });
    }

    /**
     * Send Email on Operation UI
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailOperationUI = async (_req: any) => {
        const functionName = '_SendEmailOperationUI_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            //#region Variables of Order data
            const orderNo = _req.body.orderNo;
            const email = _req.body.email;
            // const page = _req.body.page;
            const name = _req.body.name;
            const reason = _req.body.reason;
            const countSplitChar = (reason.split('<br>').length) - 1;

            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                // + '         @import url(\'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;1,100&display=swap\');'
                // + '         html, body { font-family: \'Roboto\', sans-serif; }'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td >' + name + '</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td >この度は、Sunset Momentにご依頼いただき誠にありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >下記のご注文番号にて投稿いただきましたデザインの審査が完了しました。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >申し訳ございませんが、下記の理由によりご注文を承ることができませんでした。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： ' + orderNo + '</td></tr>'
                + '                     <tr><td>差戻理由： ' + (countSplitChar < 2 ? reason : '') + ' </td></tr>'
                + '                     <tr style=\'display: ' + (countSplitChar >= 2 ? 'block' : 'none') + ';\'>'
                + '                         <td style=\'padding-left: 10px;\'>' + reason + '</td>'
                + '                     </tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >決済いただいた商品代金については、クレジットカード会社様へ返金手続きさせていただきます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: email,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                // subject: '差戻　　→　　注文番号：' + orderNo,
                subject: '【Sunset Moment】投稿デザイン審査結果のお知らせ ',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * Send email confirm change email
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailConfirmChangeEmail = async (data: any, name: string, verification_email_link: string) => {
        const functionName = 'SendEmailConfirmChangeEmail';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            //#region Variables of Order data
            const email = data.cr164_new_email;
            const code = data.cr164_code;

            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr><td style=\'height: 10px;\'></td></tr>'
                + '         <tr>'
                + '             <td >' + name + ' 様</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 10px;\'></td></tr>'

                + '         <tr>'
                + '             <td >この度は、Sunset Momentをご利用いただき誠にありがとうございます。</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 10px;\'></td></tr>'

                + '         <tr>'
                + '             <td >メールアドレス変更リクエストを受け付けました。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >お間違いなければ、以下のリンクをクリックして変更を完了させてください。</td>'
                + '         </tr>'

                // + '         <tr>'
                // + '             <td ><a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/pages/verification-email?verifycode=' + code + '\' title=\'https://harada-corp-sunset-moment.myshopify.com/pages/verification-email?verifycode=' + code + '\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/pages/verification-email?verifycode=' + code + '</a></td>'
                // + '         </tr>'
                + '         <tr>'
                + '             <td ><a class=\'text-decoration\' href=\''+verification_email_link+'\' title=\''+verification_email_link+'\' style=\'color: #56a8e9;\'>'+verification_email_link+'</a></td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 10px;\'></td></tr>'

                + '         <tr>'
                + '             <td >このメールにお心当たりがない場合は破棄していただきますよう、お願いいたします。</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 10px;\'></td></tr>'

                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:10px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: email,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】メールアドレス変更リクエスト',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })
        });
    }

    /**
     * Get Email Customer by Id
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static GetEmailById = async (customerId: string) => {
        return new Promise(async (resolve, reject) => {
            const COUNTRY_CODE_JAPAN = 'JP';
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Customers + '/' + customerId + '.json?fields=email';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header })
                .then(respone =>{resolve(respone.data.customer.email)})
                .catch(err => {reject(err)});
        });
    }

    //#region 【ＦⅬＯＷ　Ｂ】

    /**
     * ユーザーが注文した時点 → 1
     * Send mail for Flow B
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailFlowBCheckouts = async (_req: any, env: string) => {
        const functionName = '_SendEmailFlowBCheckouts_';
        F_Log(`${ functionName } START`);

        const orderData = _req.body.order;
        const orderNo = orderData.orderNo;
        const orderEmail = orderData.orderEmail;
        const order_history_url = ORDER_HISTORY_PAGE + env;
        const fullname = orderData.customer_lastname + ' 様';

        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td >' + fullname + '</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td>この度はSunset Momentにご依頼いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記ご注文番号にて、承りました。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： ' + orderNo + '</td></tr>'
                + '                     <tr><td>ご注文内容を確認する：<a class=\'text-decoration\' href=\''
                +   order_history_url + '\' title=\'' + order_history_url + '\' style=\'color: #56a8e9;\'>' + order_history_url + '</a> </td></tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td>デザインの内容を確認させていただきます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>デザイン確認完了の際は、改めてご連絡させていただきます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>デザインに問題がなければ、お支払いの案内をメールにてお送りいたします。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: orderEmail,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】ご注文ありがとうございます。',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * ユーザーが注文した時点 → 1.1
     * Send mail for Flow B
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailFlowBCheckouts02 = async (_orderNo: string, _orderEmail: string, _fullname: string, env: string) => {
        const functionName = '_SendEmailFlowBCheckouts_';
        F_Log(`${ functionName } START`);

        const orderNo = _orderNo;
        const orderEmail = _orderEmail;
        const order_history_url = ORDER_HISTORY_PAGE + env;
        const fullname = _fullname + ' 様';

        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td >' + fullname + '</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td>この度はSunset Momentにご依頼いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記ご注文番号にて、承りました。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： ' + orderNo + '</td></tr>'
                + '                     <tr><td>ご注文内容を確認する：<a class=\'text-decoration\' href=\''
                +   order_history_url + '\' title=\'' + order_history_url + '\' style=\'color: #56a8e9;\'>' + order_history_url + '</a> </td></tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td>デザインの内容を確認させていただきます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>デザイン確認完了の際は、改めてご連絡させていただきます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>デザインに問題がなければ、お支払いの案内をメールにてお送りいたします。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: orderEmail,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】ご注文ありがとうございます。',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * ﾃﾞｻﾞｲﾝ申請完了後のメール 　→　全て承認 → 2
     * Send mail for QA(Repeat Purchase Flow) No.20 (A non admitted)
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailOperationUIApproveAll = async (env: string, orderNo: string, customerId: string, email:string, fullname:string) => {
        const functionName = '_SendEmailOperationUIApproveAll_';
        F_Log(`${ functionName } START`);
        
        // link checkouts of OrderNo.
        const checkouts_url = `https://harada-corp-sunset-moment.myshopify.com/pages/checkouts${env}?code_id=${customerId}|${orderNo}|all`;
        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td >' + fullname + '</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td>この度は、Sunset Momentにご依頼いただき誠にありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記のご注文番号にて投稿いただきましたデザインの確認が完了しましたので、</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>以下のURLよりお支払いを進めてください。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： #' + orderNo + '</td></tr>'
                + '                     <tr><td>お支払いページ：<a class=\'text-decoration\' href=\'' + checkouts_url + '\' title=\'' 
                + checkouts_url + '\' style=\'color: #56a8e9;\'>' + checkouts_url + '</a> </td></tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td>お支払い完了後、改めて製造開始のご連絡をさせていただきます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>受注生産のため、製造開始後の変更・キャンセルはできません。ご了承ください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>Sunset Moment をご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: email,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】投稿デザイン確認結果のお知らせ',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * ﾃﾞｻﾞｲﾝ申請完了後のメール 　→　全て否認 → 3
     * Send mail for QA(Repeat Purchase Flow) No.20 (A non admitted)
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailOperationUIRemandAll = async (env: string, orderNo: string, email:string, fullname:string) => {
        const functionName = '_SendEmailOperationUIRemandAll_';
        F_Log(`${ functionName } START`);

        const order_history_url = ORDER_HISTORY_PAGE + env;
        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td >' + fullname + '</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td>この度は、Sunset Momentにご依頼いただき誠にありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記のご注文番号にて投稿いただきましたデザインの確認が完了しました。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>申し訳ございませんが、下記の理由によりご注文を承ることができないデザインとなりました。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： #' + orderNo + '</td></tr>'
                + '                     <tr><td>差戻内容を確認する：<a class=\'text-decoration\' href=\''
                + order_history_url + '\' title=\'' + order_history_url + '\' style=\'color: #56a8e9;\'>' + order_history_url + '</a> </td></tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td>ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: email,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】投稿デザイン確認結果のお知らせ',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * 一部差戻　→　4
     * Send mail for QA(Repeat Purchase Flow) No.20 (A non admitted)
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailOperationUIANonAdmitted = async (env: string, orderNo: string, customerId: string, email:string, fullname:string) => {
        const functionName = '_SendEmailOperationUIANonAdmitted_';
        F_Log(`${ functionName } START`);

        const nonAdmittedLink = `https://harada-corp-sunset-moment.myshopify.com/pages/non-admitted${env}?code_id=${customerId}|${orderNo}`;

        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td >' + fullname + '</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td>この度は、Sunset Momentにご依頼いただき誠にありがとございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記のご注文番号にて投稿いただきましたデザインの確認が完了しました。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>申し訳ございませんが、ご注文いただきました一部のアイテムで下記の理由によりご注文を承ることができないデザインがございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記の差戻内容ご確認ページにて、最終注文の確定をお願いいたします。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： #' + orderNo + '</td></tr>'
                + '                     <tr><td>差戻内容を確認する：<a class=\'text-decoration\' href=\''+nonAdmittedLink+'\' title=\''+nonAdmittedLink+'\' style=\'color: #56a8e9;\'>'+nonAdmittedLink+'</a> </td></tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td>ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: email,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】投稿デザイン確認結果のお知らせ',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * ﾕｰｻﾞｰ承認後のメール 　→　一部注文　→　5
     * Send mail for QA(Repeat Purchase Flow) No.20 (A non admitted)
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailCustomerApproval = async (env: string, orderNo: string, email:string, fullname:string) => {
        const functionName = '_SendEmailCustomerApproval_';
        F_Log(`${ functionName } START`);

        // const destinationURL = `https://harada-corp-sunset-moment.myshopify.com/pages/non-admitted${env}?code_id=${customerId}|${orderNo}`;
        const order_history_url = ORDER_HISTORY_PAGE + env;
        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td >' + fullname + '</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td>この度は、Sunset Moment にご依頼いただき誠にありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記ご注文番号の内容をご確認いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>最終注文の確定いただきましたアイテムについて、製造開始させていただきます。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： ' + orderNo + '</td></tr>'
                + '                     <tr><td>ご注文内容を確認する：<a class=\'text-decoration\' href=\''
                +   order_history_url + '\' title=\'' + order_history_url + '\' style=\'color: #56a8e9;\'>' + order_history_url + '</a> </td></tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td>納期につきましては、製造からお届けまでにおよそ2週間お時間をいただいております。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>到着までしばらくお待ちください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>受注生産のため、製造開始後の変更・キャンセルはできません。ご了承ください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: email,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】最終注文確定いただきありがとうございます。',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * 注文キャンセル→　→　6
     * Send mail for QA(Repeat Purchase Flow) No.20 (A non admitted)
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailCustomerCancel = async (env: string, orderNo: string, email:string, fullname:string) => {
        const functionName = '_SendEmailCustomerCancel_';
        F_Log(`${ functionName } START`);

        // const destinationURL = `https://harada-corp-sunset-moment.myshopify.com/pages/non-admitted${env}?code_id=${customerId}|${orderNo}`;
        const order_history_url = ORDER_HISTORY_PAGE + env;
        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td >' + fullname + '</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td>この度は、Sunset Moment にご依頼いただき誠にありがとございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記ご注文番号の内容をご確認いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今回ご注文いただいたアイテムは全品キャンセルいたします。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>またのご利用をお待ちしております。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： ' + orderNo + '</td></tr>'
                + '                     <tr><td>ご注文内容を確認する：<a class=\'text-decoration\' href=\''
                +   order_history_url + '\' title=\'' + order_history_url + '\' style=\'color: #56a8e9;\'>' + order_history_url + '</a> </td></tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td>ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'

                + '         <tr>'
                + '             <td>Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: email,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】ご注文のキャンセルを受け付けました',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * Send Email on Operation UI
     * @static
     * @param orderNo
     * @param email
     * @param reason
     * @param fullname
     * @memberof ShopifyAdminAPI
     */
    public static SendEmailOperationUI_02 = async (orderNo: string, email: string, reason: string, fullname: string, ) => {
        const functionName = '_SendEmailOperationUI_02_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            reason += "<br>";
            const countSplitChar = (reason.split('<br>').length) - 1;

            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                // + '         @import url(\'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;1,100&display=swap\');'
                // + '         html, body { font-family: \'Roboto\', sans-serif; }'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td >' + fullname + '</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td >この度は、Sunset Momentにご依頼いただき誠にありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >下記のご注文番号にて投稿いただきましたデザインの審査が完了しました。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >申し訳ございませんが、下記の理由によりご注文を承ることができませんでした。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： #' + orderNo + '</td></tr>'
                + '                     <tr><td>差戻理由： ' + (countSplitChar < 2 ? reason : '') + ' </td></tr>'
                + '                     <tr style=\'display: ' + (countSplitChar >= 2 ? 'block' : 'none') + ';\'>'
                + '                         <td style=\'padding-left: 10px;\'>' + reason + '</td>'
                + '                     </tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >決済いただいた商品代金については、クレジットカード会社様へ返金手続きさせていただきます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td >今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: email,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                // subject: '差戻　　→　　注文番号：' + orderNo,
                subject: '【Sunset Moment】投稿デザイン審査結果のお知らせ ',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }
    //#endregion

    //#region 【 ➝ Draft Order】

    /**
     * Get Draft Order Detail by Id
     * @static
     * @param draft_order_id
     * @memberof ShopifyAdminAPI
     */
    public static GetDraftOrderDetail = async (draft_order_id: any) => {
        const functionName = '_GetDraftOrderDetail_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const COUNTRY_CODE_JAPAN = 'JP';
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.DraftOrders + '/' + draft_order_id + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                // console.log('___[GetDraftOrderDetail]___', respone.data);

                const shipping_address = respone.data.draft_order.shipping_address;
                if (shipping_address.country_code === COUNTRY_CODE_JAPAN) {
                    const province_code = shipping_address.province_code;
                    const provinceOption = CONST_Harada_Province_Of_JP.find(x => x.key === province_code);
                    const province = (provinceOption === undefined) ? shipping_address.province : provinceOption.text;
                    shipping_address.province = province;
                }
                const billing_address = respone.data.draft_order.billing_address;
                if (billing_address.country_code === COUNTRY_CODE_JAPAN) {
                    const province_code = billing_address.province_code;
                    const provinceOption = CONST_Harada_Province_Of_JP.find(x => x.key === province_code);
                    const province = (provinceOption === undefined) ? billing_address.province : provinceOption.text;
                    billing_address.province = province;
                }
                const data = respone.data;

                resolve(data);
            }).catch(error => {

                console.log('___[ERORR_GET_DRAFT_ORDER_DETAIL]____', error.message);
                reject(error);
            });
        });
    }

    /**
     * Insert a Draft Order
     * Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/draftorder#post-draft-orders
     * @static
     * @param _reqData
     * @memberof ShopifyAdminAPI
     */
    public static InsertDraftOrder = async (_reqData: any) => {
        const functionName = '_InsertDraftOrder(Shopify)_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.DraftOrders + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const draftOrderJSON = {
                draft_order: _reqData
            };

            await axios.post(url, draftOrderJSON, { headers: header }).then(respone => {
                // console.log('___[Insert_Draft_Order]___', respone.data);
                const data = respone.data;
                resolve(data);
            }).catch(error => {
                console.log('___[ERORR_INSERT_DRAFT_ORDER]____', error.message);
                reject(error);
            });
        });
    }

    /**
     * Update a Draft Order
     * Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/draftorder#put-draft-orders-draft-order-id
     * @static
     * @param draftOrder
     * @memberof ShopifyAdminAPI
     */
    public static UpdateDraftOrder = async (draftOrder: any) => {
        const functionName = '_UpdateDraftOrder(Shopify)_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.DraftOrders + '/' + draftOrder.id + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const orderJSON = {
                draft_order: draftOrder
            };

            await axios.put(url, orderJSON, { headers: header }).then(respone => {
                    const data = respone.data;
                    console.log('___[UPDATE_DRAFT_ORDER](OK)____');
                    resolve(data);
                }).catch(error => {
                    console.log('___[ERORR_UPDATE_FRAFT_ORDER]____', error.message);
                    reject(error);
                });
        });
    }

    /**
     * Delete Draft Order by Id
     *  Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/draftorder#delete-draft-orders-draft-order-id
     *  Deletes a draft order.
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static DeleteDraftOrder = (draftOrderId: string) => {
        return new Promise(async (resolve, reject) => {
            const functionName = '_DeleteDraftOrder(Shopify)_';
            const url = CONST_Harada_Endpoints + '2020-10' + '/' + CONST_Harada_Tables.DraftOrders + '/' + draftOrderId + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };
            await axios.delete(url, { headers: header }).then(respone => {
                const data = respone.data;
                console.log('___[DELETE_DRAFT_ORDER](OK)____');
                resolve(true);
            }).catch(error => {
                let errMgs = error.message;
                errMgs += '\n' + error.response.data.errors;
                console.log('___[ERORR_DELETE_DRAFT_ORDER]____', error.message);
                reject(errMgs);
            });
        });
    }
    //#endregion

    //#region 【 ➝ Transaction】

    /**
     * Get list of transactions for Order by Id
     *  Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/transaction#get-orders-order-id-transactions
     * @static
     * @param orderId
     * @memberof ShopifyAdminAPI
     */
    public static GetListOfTransactionsForOrder = async (orderId: any) => {
        const functionName = '_GetListOfTransactionsForOrder_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order +  '/' + orderId + '/' + CONST_Harada_Tables.Transaction + '.json';//?fields=kind,gateway,amount,parent_id,status,currency';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const data = respone.data;
                resolve(data);
            }).catch(error => {
                console.log('___[ERORR_GET_LIST_OF_TRANSACTION_FOR_ORDER]____', error.message);
                reject(error);
            });
        });
    }

    /**
     * Insert a Transaction
     *  Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/transaction
     * @static
     * @param _reqData
     * @memberof ShopifyAdminAPI
     */
    public static InsertTransaction = async (orderId: string, _reqData: any) => {
        const functionName = '_InsertTransaction(Shopify)_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order +  '/' + orderId + '/' + CONST_Harada_Tables.Transaction + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const transactionJSON = {
                transaction: _reqData
            };
            await axios.post(url, transactionJSON, { headers: header }).then(respone => {
                // console.log('___[INSERT_TRANSACTION]___', respone.data);
                const data = respone.data;
                resolve(data);

            }).catch(error => {
                // // console.log('___[ERORR_INSERT_TRANSACTION]____', error);
                // // console.log('___[ERORR_INSERT_TRANSACTION]____', error.message);
                // // reject(error);
                // let errMgs = error.message;
                // const errors = error.response.data.errors;
                // for (let key in errors) {
                //     if (errors.hasOwnProperty(key)) {
                //         const value = errors[key];
                //         errMgs += '\n\n ' + key + ': ' + value;
                //     }
                // }
                // console.log('___[ERORR]____', errMgs);
                reject(error);
            });
        });
    }
    //#endregion

    /**
     * Get list of transactions for Order by Id
     *  Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/transaction#get-orders-order-id-transactions
     * @static
     * @param orderId
     * @memberof ShopifyAdminAPI
     */
    public static GetDataByGraphQLAPI = async () => {
        const functionName = '_GetDataByGraphQLAPI_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const endpoint = CONST_Harada_Endpoints + '2023-01/graphql.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const graphqlQuery = {
                'operationName': 'fetchCustomer',
                'query': `query fetchCustomer {
                                    customer(id: "gid://shopify/Customer/5842644566170") {
                                    id
                                    firstName
                                    lastName
                                    acceptsMarketing
                                    email
                                    phone
                                    averageOrderAmountV2 {
                                        amount
                                        currencyCode
                                    }
                                    createdAt
                                    updatedAt
                                    note
                                    verifiedEmail
                                    validEmailAddress
                                    tags
                                    lifetimeDuration
                                    defaultAddress {
                                        formattedArea
                                        address1
                                    }
                                    addresses {
                                        address1
                                    }
                                    image {
                                        src
                                    }
                                    canDelete
                                    }
                                }`,
                'variables': {}
            };
            
            //const response = 
            await axios({
              url: endpoint,
              method: 'post',
              headers: headers,
              data: graphqlQuery
                }).then(respone => {
                    if (respone.data.data) {
                        const data = respone.data.data;
                        resolve(data);
                    } else if (respone.data.errors) {
                        let errMgs = '';
                        const errors = respone.data.errors;
                        for (let key in errors[0]) {
                            if (errors[0].hasOwnProperty(key)) {
                                const value = errors[0][key];
                                errMgs += '\n\n ' + key + ': ' + value;
                            }
                        }
                        reject(errMgs);
                    }
                }).catch(error => {
                    console.log('___[ERORR_GraphGL]____', error);
                    reject(error);
                });

        });
    }

    //#region 【 ➝ Refund】

    /**
     * Get list of refunds for Order by Id
     *  Ref to: https://shopify.dev/api/admin-rest/2023-01/resources/refund#get-orders-order-id-refunds
     * @static
     * @param orderId
     * @memberof ShopifyAdminAPI
     */
    public static GetListOfRefundsForOrder = async (orderId: any) => {
        const functionName = '_GetListOfRefundsForOrder_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order +  '/' + orderId + '/' + CONST_Harada_Tables.Refund + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const data = respone.data;
                resolve(data);
            }).catch(error => {
                console.log('___[ERORR_GET_LIST_OF_REFUND_FOR_ORDER]____', error.message);
                reject(error);
            });
        });
    }

     /**
     * Get refund detail by Id
     *  Ref to: https://shopify.dev/api/admin-rest/2023-01/resources/refund#get-orders-order-id-refunds-refund-id
     * @static
     * @param orderId
     * @memberof ShopifyAdminAPI
     */
    public static GetRefundDetail = async (orderId: any, refundId: any) => {
        const functionName = '_GetRefundDetail_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order +  '/' + orderId + '/' + CONST_Harada_Tables.Refund  + '/' + refundId + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            await axios.get(url, { headers: header }).then(respone => {
                const data = respone.data;
                resolve(data);
            }).catch(error => {
                console.log('___[ERORR_GET_REFUND_DETAIL_FOR_ORDER]____', error.message);
                reject(error);
            });
        });
    }

    /**
     * Creates a refund
     *  Ref to: https://shopify.dev/api/admin-rest/2023-01/resources/refund
     * @static
     * @param _reqData
     * @memberof ShopifyAdminAPI
     */
    public static InsertRefund = async (orderId: string, _reqData: any) => {
        const functionName = '_InsertRefund_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order +  '/' + orderId + '/' + CONST_Harada_Tables.Refund + '.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const refundJSON = {
                refund: _reqData
            };
            await axios.post(url, refundJSON, { headers: header }).then(respone => {
                // console.log('___[INSERT_REFUND]___', respone.data);
                const data = respone.data;
                resolve(data);

            }).catch(error => {
                console.log('___[ERORR_INSERT_REFUND]____', error);
                console.log('___[ERORR_INSERT_REFUND]____', error.message);
                // reject(error);
                let errMgs = error.message;
                const errors = error.response.data.errors;
                for (let key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        const value = errors[key];
                        errMgs += '\n\n ' + key + ': ' + value;
                    }
                }
                console.log('___[ERORR]____', errMgs);
                reject(errMgs);
            });
        });
    }

    /**
     * Calculates a refund
     *  Ref to: https://shopify.dev/api/admin-rest/2023-01/resources/refund
     * @static
     * @param _reqData
     * @memberof ShopifyAdminAPI
     */
    public static CalculatesARefund = async (orderId: string, _reqData: any) => {
        const functionName = '_CalculatesARefund_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const url = CONST_Harada_Endpoints + CONST_Harada_API_Version + '/' + CONST_Harada_Tables.Order +  '/' + orderId + '/' + CONST_Harada_Tables.Refund + '/calculate.json';
            const username = CONST_Harada_API_Key;
            const password = CONST_Harada_Password;
            const base64 = Buffer.from(username + ":" + password, 'utf-8').toString('base64');
            const header = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64,
            };

            const refundJSON = {
                refund: _reqData
            };
            await axios.post(url, refundJSON, { headers: header }).then(respone => {
                // console.log('___[CALCULATE_REFUND]___', respone.data);
                const data = respone.data;
                resolve(data);

            }).catch(error => {
                console.log('___[ERORR_CALCULATE_REFUND]____', error);
                console.log('___[ERORR_CALCULATE_REFUND]____', error.message);
                // reject(error);
                let errMgs = error.message;
                const errors = error.response.data.errors;
                for (let key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        const value = errors[key];
                        errMgs += '\n\n ' + key + ': ' + value;
                    }
                }
                console.log('___[ERORR]____', errMgs);
                reject(errMgs);
            });
        });
    }
    //#endregion

    //#region Auto Send Mail

    /**
     * １）受注（決済前のデザイン確認依頼）が入ったタイミングで運営の指定したメールアドレスへ自動でメールを飛ばすことは可能ですか？ 	
	 *      タイミングは1日1回、朝8時に前日8時〜当日8時までの受注情報を送信したいです。 
     * Send mail for Orders Received
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static AutoSendEmailForOrdersReceived = async (env: string, orderNo: any, email:string) => {
        const functionName = '_AutoSendEmailForOrdersReceived_';
        F_Log(`${ functionName } START`);

        // ①YUJIN　NAKAYAMA <nakayama@haradacorp.co.jp> 
        // ②Mayumi Nakanishi <nakanishi@haradacorp.co.jp> 
        const emailTo = (env === 'dev') ? email : 'nakayama@haradacorp.co.jp';
        const emailCc = (env === 'dev') ? email : 'nakanishi@haradacorp.co.jp';

        const operation_url = (env === 'dev') 
                            ? 'https://apps.powerapps.com/play/e/d64bd34d-9775-4bea-86ec-4113d2e126d4/a/4c6c7820-9dc9-488a-afde-5765ab7688ad?tenantId=734234fa-cb41-481f-9031-d56d23dda043&source=portal&hidenavbar=true' 
                            : 'https://apps.powerapps.com/play/e/d64bd34d-9775-4bea-86ec-4113d2e126d4/a/6a921091-2762-4eff-afe1-31f69339b7ce?tenantId=734234fa-cb41-481f-9031-d56d23dda043&hidenavbar=true';

        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            let contentOrder = '';            
            if (orderNo.length > 0) {
                contentOrder = '        <tr>'
                            + '             <td >'
                            + '                 <table style=\'width: 100%;\'>'
                            + '                     <tr><td>注文番号： ' + orderNo + '</td></tr>'
                            + '                     <tr><td>ご注文内容を確認する：<a class=\'text-decoration\' href=\''
                            +   operation_url + '\' title=\'Order to Factory - PowerApps\' style=\'color: #56a8e9;\'>Order to Factory - PowerApps</a> </td></tr>'
                            + '                 </table>'
                            + '             </td>'
                            + '         </tr>'
            }
            
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                + '         <tr>'
                + '             <td>To Operator(受注（決済前のデザイン確認依頼）)</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td>この度は、Sunset Moment にご依頼いただき誠にありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記ご注文番号の内容をご確認いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>最終注文の確定いただきましたアイテムについて、製造開始させていただきます。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + contentOrder

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td>納期につきましては、製造からお届けまでにおよそ2週間お時間をいただいております。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>到着までしばらくお待ちください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>受注生産のため、製造開始後の変更・キャンセルはできません。ご了承ください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: emailTo,
                cc: emailCc,

                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】受注（決済前のデザイン確認依頼）。',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                reject(error);
            })
            //#endregion
        });
    }

    /**
     * １）受注（決済前のデザイン確認依頼）が入ったタイミングで運営の指定したメールアドレスへ自動でメールを飛ばすことは可能ですか？ 	
	 *      タイミングは1日1回、朝8時に前日8時〜当日8時までの受注情報を送信したいです。 
     * Send mail for Orders Received
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static AutoSendEmailDesignConfirmationRequest = async (env: string, emailToList: string, listOfOrder: string) => {
        const functionName = '_AutoSendEmailDesignConfirmationRequest_';
        F_Log(`${ functionName } START`);

        // // ①YUJIN　NAKAYAMA <nakayama@haradacorp.co.jp> 
        // // ②Mayumi Nakanishi <nakanishi@haradacorp.co.jp> 
        // const emailTo1 = (env === 'dev') ? EMAIL_FOR_DEV : 'nakayama@haradacorp.co.jp';
        // const emailTo2 = (env === 'dev') ? 'ntngoctrong@hotmail.com' : 'nakanishi@haradacorp.co.jp';
        // Ref to: https://docs.sendgrid.com/api-reference/mail-send/mail-send
        const operation_url = (env === 'dev') 
                            ? 'https://apps.powerapps.com/play/e/d64bd34d-9775-4bea-86ec-4113d2e126d4/a/4c6c7820-9dc9-488a-afde-5765ab7688ad?tenantId=734234fa-cb41-481f-9031-d56d23dda043&hidenavbar=true&_page=designapproval' + '&listOfOrder=' + listOfOrder

                            : 'https://apps.powerapps.com/play/e/d64bd34d-9775-4bea-86ec-4113d2e126d4/a/6a921091-2762-4eff-afe1-31f69339b7ce?tenantId=734234fa-cb41-481f-9031-d56d23dda043&hidenavbar=true&_page=designapproval' + '&listOfOrder=' + listOfOrder;

        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                + '         <tr>'
                + '             <td>デザイン確認担当者様 </td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>SunsetMomentデザイン確認依頼があります。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>(<a class=\'text-decoration\' href=\''
                +   operation_url + '\' title=\'Order to Factory - PowerApps\' style=\'color: #56a8e9;\'>' + operation_url + '</a>) より確認作業を開始してください。</td>'
                + '         </tr>'
                
                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                // to: emailTo,
                to: emailToList,

                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】デザイン確認依頼',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                reject(error);
            })
            //#endregion
        });
    }

    /**
     * ２）決済完了のタイミングで工場の指定したメールアドレスへ自動でメールを飛ばすことは可能ですか？ 	
	 *      タイミングは１）と同様、1日1回、朝8時に前日8時〜当日8時までの受注情報を送信したいです。 
     * Auto Send mail for Orders Paid
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static AutoSendEmailForOrdersPaid = async (env: string, orderNo: string, email:string) => {
        const functionName = '_AutoSendEmailForOrdersPaid_';
        F_Log(`${ functionName } START`);

        // ①MASAHIRO MIYATA <miyata@haradacorp.co.jp> 
        // ②Ms.My An Phan Thi My An <an@haradacorp.co.jp> 
        const emailTo = (env === 'dev') ? email : 'miyata@haradacorp.co.jp';
        const emailCc = (env === 'dev') ? email : 'an@haradacorp.co.jp';

        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                //          Customer
                + '         <tr>'
                + '             <td>To Factory(決済完了)</td>'
                + '         </tr>'
                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                + '         <tr>'
                + '             <td>この度は、Sunset Moment にご依頼いただき誠にありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>下記ご注文番号の内容をご確認いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>最終注文の確定いただきましたアイテムについて、製造開始させていただきます。</td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td >'
                + '                 <table style=\'width: 100%;\'>'
                + '                     <tr><td>注文番号： ' + orderNo + '</td></tr>'
                // + '                     <tr><td>ご注文内容を確認する：<a class=\'text-decoration\' href=\''
                // +   order_history_url + '\' title=\'' + order_history_url + '\' style=\'color: #56a8e9;\'>' + order_history_url + '</a> </td></tr>'
                + '                 </table>'
                + '             </td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'

                + '         <tr>'
                + '             <td>納期につきましては、製造からお届けまでにおよそ2週間お時間をいただいております。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>到着までしばらくお待ちください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>受注生産のため、製造開始後の変更・キャンセルはできません。ご了承ください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>ご不明な点がございましたら、ご注文番号を記載の上弊社HPのお問い合わせフォームからお問い合わせください。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>Sunset Momentをご利用いただきありがとうございます。</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>今後ともよろしくお願いいたします。</td>'
                + '         </tr>'

                // URL
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: emailTo,
                cc: emailCc,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】決済完了。',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * ２）決済完了のタイミングで工場の指定したメールアドレスへ自動でメールを飛ばすことは可能ですか？ 	
	 *      タイミングは１）と同様、1日1回、朝8時に前日8時〜当日8時までの受注情報を送信したいです。 
     * Auto Send mail for Orders Paid
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static AutoSendEmailOrderConfirmed = async (env: string, emailToList: string, listOfOrder: string) => {
        const functionName = '_AutoSendEmailOrderConfirmed_';
        F_Log(`${ functionName } START`);

        // // ①MASAHIRO MIYATA <miyata@haradacorp.co.jp> 
        // // ②Ms.My An Phan Thi My An <an@haradacorp.co.jp> 
        // const emailTo1 = (env === 'dev') ? EMAIL_FOR_DEV : 'miyata@haradacorp.co.jp';
        // const emailTo2 = (env === 'dev') ? 'ntngoctrong@hotmail.com' : 'an@haradacorp.co.jp';
        // Ref to: https://docs.sendgrid.com/api-reference/mail-send/mail-send
        const operation_url = (env === 'dev') 
                            ? 'https://apps.powerapps.com/play/e/d64bd34d-9775-4bea-86ec-4113d2e126d4/a/4c6c7820-9dc9-488a-afde-5765ab7688ad?tenantId=734234fa-cb41-481f-9031-d56d23dda043&hidenavbar=true&_page=plant' + '&listOfOrder=' + listOfOrder
                            : 'https://apps.powerapps.com/play/e/d64bd34d-9775-4bea-86ec-4113d2e126d4/a/6a921091-2762-4eff-afe1-31f69339b7ce?tenantId=734234fa-cb41-481f-9031-d56d23dda043&hidenavbar=true&_page=plant' + '&listOfOrder=' + listOfOrder;


        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'

                + '         <tr>'
                + '             <td>Dear Production Dept. </td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>You have Sunset Moment orders</td>'
                + '         </tr>'
                + '         <tr>'
                + '             <td>Please start production from (<a class=\'text-decoration\' href=\''
                +   operation_url + '\' title=\'Order to Factory - PowerApps\' style=\'color: #56a8e9;\'>' + operation_url + '</a>) </td>'
                + '         </tr>'

                + '         <tr><td style=\'height: 15px;\'></td></tr>'
                
                + '         <tr>'
                + '             <td style=\'height: 30px; line-height:1.5; margin-top:15px;\'>Sunset Moment (<a class=\'text-decoration\' href=\'https://harada-corp-sunset-moment.myshopify.com/\' title=\'https://harada-corp-sunset-moment.myshopify.com/\' style=\'color: #56a8e9;\'>https://harada-corp-sunset-moment.myshopify.com/</a>)</td>'
                + '         </tr>'

                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                // to: emailTo,
                to: emailToList,

                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】Order confirmed',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    /**
     * Send mail for Scheduled Flow Test
     * @static
     * @memberof ShopifyAdminAPI
     */
    public static AutoSendEmailForScheduledFlowTest = async (email:string) => {
        const functionName = '_AutoSendEmailForScheduledFlowTest_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            //#region -- Config Send Email by SendGrid
            const sendgrid = require('@sendgrid/mail');
            sendgrid.setApiKey(SENDGRID_API_KEY)

            //#region Custom HTML
            const _htmlBody = '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Strict//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\'>'
                + '<html xmlns="http://www.w3.org/1999/xhtml">'

                //#region Tag<header>
                + ' <head>'
                + '  <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'>'
                + '  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>'
                + '  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=Edge\'>'
                + '     <style type=\'text/css\'>'
                + '         html, body { font-family: Meiryo; font-size: 14.6667px; }'
                + '         body { width: 60%; }'
                + '         ._width_table { width: 620px; }'
                + '         .text-decoration { text-decoration: none;  } '
                + '     </style>'
                + ' </head>'
                //#endregion

                + ' <body>'
                + '  <center class=\'wrapper\'>'
                + '    <!--[if mso]>'
                + '     <center>'
                + '      <table><tr><td width="620">'
                + '       <![endif]-->'  // Use for width

                + '     <table class=\'_width_table\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' border=\'0\' style=\'width:100%; max-width:500px;\' align=\'center\'>'
                + '         <tr>'
                + '             <td>Test email(Scheduled Flow)</td>'
                + '         </tr>'
                + '     </table>'
                + '              <!--[if mso]>'
                + '            </td>'
                + '          </tr>'
                + '        </table>'
                + '      </center>'
                + '     <![endif]-->'
                + '  </center>'
                + ' </body>'
                + '</html>';
            //#endregion

            const msg = {
                // Change to your recipient
                to: email,
                // Change to your verified sender
                from: SENDGRID_FROM_EMAIL,
                subject: '【Sunset Moment】Scheduled Flow Test',
                html: _htmlBody
            };

            sendgrid.send(msg).then((resp: any) => {
                console.log('__OK(Email)___', email);

                resolve(resp);
            }).catch((error: any) => {
                console.log('___ERROR[// SENDGRID_EMAIL.PACKAGE]___', error);
                reject(error);
            })

            //#endregion
        });
    }

    //#endregion


    //#region Charge/Payment Stripe
    /**
     * Charge by Stripe
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static ChargeByStripe = async (_req: any) => {
        const functionName = '_ChargeByStripe_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const header = {
                // 'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + CONST_STRIPE_API_Key,
            };

            let dataRequest = { 
                'card[number]': _req.body.card.card_number,
                'card[exp_month]': _req.body.card.card_exp_month,
                'card[exp_year]': _req.body.card.card_exp_year,
                'card[cvc]': _req.body.card.card_cvc
            };
            let params = querystring.stringify(dataRequest)

            // Call Stripe to Tokens
            await axios.post(CONST_STRIPE_Endpoints + '/' + CONST_STRIPE_API_Version + '/' + CONST_STRIPE_Tables.Tokens, params, { headers: header }).then(async respone => {
                
                const data = respone.data;
                const tokenId = data.id
                console.log('_TokenId_', tokenId);
                // Call Stripe to charges
                let dataRequestCharge = { 
                    // 'customer': _req.body.customer.id, 
                    'amount': _req.body.amount,
                    'currency': 'jpy',
                    'description': _req.body.description,
                    'source': tokenId
                };
                params = querystring.stringify(dataRequestCharge)
                await axios.post(CONST_STRIPE_Endpoints + '/' + CONST_STRIPE_API_Version + '/' + CONST_STRIPE_Tables.Charges, params, { headers: header }).then(respone => {
                    
                    const data = respone.data;
                    // console.log('_Charges_', data);
                    resolve(data);

                }).catch(error => {
                    let errMgs = '[' + error.response.statusText + '] ' +  error.message;
                    const errors = error.response.data.error;
                    console.log('___[ERORR_STRIPE_CHARGE(errors)]____', errors);
                    for (let key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            const value = errors[key];
                            errMgs += '\n\n ' + key + ': ' + value;
                        }
                    }
                    reject(errMgs);
                });
            }).catch(error => {
                let errMgs = '[' + error.response.statusText + '] ' +  error.message;
                const errors = error.response.data.error;
                console.log('___[ERORR_STRIPE_TOKENS(errors)]____', errors);
                for (let key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        const value = errors[key];
                        errMgs += '\n\n ' + key + ': ' + value;
                    }
                }
                reject(errMgs);
            });
        });
    }

    /**
     * Payment by Stripe
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static PaymentByStripe = async (_req: any) => {
        const functionName = '_PaymentByStripe_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const header = {
                // 'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + CONST_STRIPE_API_Key,
            };

            // 2. Get the capture ID from your database
            let dataRequest = { 
                'type': 'card',
                'card[number]': _req.body.card.card_number,
                'card[exp_month]': _req.body.card.card_exp_month,
                'card[exp_year]': _req.body.card.card_exp_year,
                'card[cvc]': _req.body.card.card_cvc
            };
            let params = querystring.stringify(dataRequest)

            // 3. Call Stripe to Tokens
            await axios.post(CONST_STRIPE_Endpoints + '/' + CONST_STRIPE_API_Version + '/' + CONST_STRIPE_Tables.PaymentMethods, params, { headers: header }).then(async respone => {
                
                const data = respone.data;
                // console.log('_PaymentMethods_', data);

                const paymentMethodId = data.id

                // 3. Call Stripe to PaymentIntent
                // const payment_intent = '/v1/payment_intents';
                // action = payment_intent;
                let dataRequestPaymentIntent = { 
                    'customer': _req.body.customer.id, 
                    'amount': _req.body.amount,
                    'currency': 'jpy',
                    'description': _req.body.description,
                    'payment_method': paymentMethodId,
                    'receipt_email' : _req.body.customer.email,
                    // 'invoice' : _req.body.invoiceId

                    // 'billing_details[email]' : _req.body.customer.email,
                    // 'billing_details[name]' : _req.body.customer.name,
                    // 'billing_details[phone]' : _req.body.customer.phone,
                    // 'billing_details.address' : _req.body.customer.email,
                };
                
                console.log('_____dataRequestPaymentIntent______', dataRequestPaymentIntent);

                params = querystring.stringify(dataRequestPaymentIntent);
                // Create a PaymentIntent
                await axios.post(CONST_STRIPE_Endpoints + '/' + CONST_STRIPE_API_Version + '/' + CONST_STRIPE_Tables.PaymentIntents, params, { headers: header }).then(async respone => {
                    
                    const data = respone.data;
                    const paymentIntentId = data.id;
                    console.log('_PaymentIntentId_', paymentIntentId);

                    // Confirm a PaymentIntent
                    await axios.post(CONST_STRIPE_Endpoints + '/' + CONST_STRIPE_API_Version + '/' + CONST_STRIPE_Tables.PaymentIntents + '/' + paymentIntentId + '/confirm', null, { headers: header }).then(respone => {
                        const data = respone.data;
                        // console.log('_PaymentIntent(Confirm)_', data);
                        resolve(data);
                    }).catch(error => {
                        let errMgs = '[' + error.response.statusText + '] ' +  error.message;
                        const errors = error.response.data.error;
                        console.log('___[ERORR_STRIPE_PAYMENT_INTENT_CONFIRM(errors)]____', errors);
                        for (let key in errors) {
                            if (errors.hasOwnProperty(key)) {
                                const value = errors[key];
                                errMgs += '\n\n ' + key + ': ' + value;
                            }
                        }
                        reject(errMgs);
                    });
                }).catch(error => {
                    let errMgs = '[' + error.response.statusText + '] ' +  error.message;
                    const errors = error.response.data.error;
                    console.log('___[ERORR_STRIPE_PAYMENT_INTENT(errors)]____', errors);
                    for (let key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            const value = errors[key];
                            errMgs += '\n\n ' + key + ': ' + value;
                        }
                    }
                    reject(errMgs);
                });
            }).catch(error => {
                let errMgs = '[' + error.response.statusText + '] ' +  error.message;
                const errors = error.response.data.error;
                console.log('___[ERORR_STRIPE_PAYMENT_METHOD(errors)]____', errors);
                for (let key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        const value = errors[key];
                        errMgs += '\n\n ' + key + ': ' + value;
                    }
                }
                reject(errMgs);
            });
        });
    }

    /**
     * Invoice Item by Stripe
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static InvoiceItemByStripe = async (_req: any) => {
        const functionName = '_InvoiceItemByStripe_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const header = {
                // 'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + CONST_STRIPE_API_Key,
            };

            let dataRequest = { 
                'customer': _req.body.customer.id, 
                'currency': 'jpy',
                'description': _req.body.description,
                'quantity': _req.body.quantity,

                // You may only specify one of these parameters: price, unit_amount.
                // 'unit_amount' : _req.body.unit_amount,
                'price' : _req.body.priceid,
            };
            let params = querystring.stringify(dataRequest)

            await axios.post(CONST_STRIPE_Endpoints + '/' + CONST_STRIPE_API_Version + '/' + CONST_STRIPE_Tables.InvoiceItems, params, { headers: header }).then(async respone => {
                
                const data = respone.data;
                console.log('_InvoiceItems_', data);
                resolve(data);

            }).catch(error => {
                let errMgs = '[' + error.response.statusText + '] ' +  error.message;
                const errors = error.response.data.error;
                console.log('___[ERORR_STRIPE_INVOICE_ITEM(errors)]____', errors);
                for (let key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        const value = errors[key];
                        errMgs += '\n\n ' + key + ': ' + value;
                    }
                }
                reject(errMgs);
            });
        });
    }

    /**
     * Invoice by Stripe
     * @static
     * @param _req
     * @memberof ShopifyAdminAPI
     */
    public static InvoiceByStripe = async (_req: any) => {
        const functionName = '_InvoiceByStripe_';
        F_Log(`${ functionName } START`);

        return new Promise(async (resolve, reject) => {
            const header = {
                // 'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + CONST_STRIPE_API_Key,
            };

            let dataRequest = { 
                'customer': _req.body.customer.id, 
                'currency': 'jpy',
                'description': _req.body.description,                
                // 'lines' : _req.body.lines,
                // 'status': _req.body.status,
            };
            let params = querystring.stringify(dataRequest)

            await axios.post(CONST_STRIPE_Endpoints + '/' + CONST_STRIPE_API_Version + '/' + CONST_STRIPE_Tables.Invoices, params, { headers: header }).then(async respone => {
                const data = respone.data;
                console.log('_Invoice_', data);
                resolve(data);

            }).catch(error => {
                let errMgs = '[' + error.response.statusText + '] ' +  error.message;
                const errors = error.response.data.error;
                console.log('___[ERORR_STRIPE_INVOICE(errors)]____', errors);
                for (let key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        const value = errors[key];
                        errMgs += '\n\n ' + key + ': ' + value;
                    }
                }
                reject(errMgs);
            });
        });
    }
    //#endregion


    //#region Payment Intents Stripe
    /**
     * PaymentIntents Stripe
     * @static
     * @param _subTotal
     * @memberof ShopifyAdminAPI
     */
   public static PaymentIntentsStripe = async (_subTotal: number) => {
    const functionName = '_PaymentIntentsStripe_';
    F_Log(`${ functionName } START`);

    return new Promise(async (resolve, reject) => {
        const header = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + CONST_STRIPE_API_Key,
        };

         // Call Stripe to payment intents
         let dataRequestPaymentIntents = { 
             'amount': _subTotal,
             'currency': 'jpy',
         };
         let params = querystring.stringify(dataRequestPaymentIntents)
         await axios.post(CONST_STRIPE_Endpoints + '/' + CONST_STRIPE_API_Version + '/' + CONST_STRIPE_Tables.PaymentIntents, params, { headers: header }).then(respone => {
             
             const data = respone.data;
            //  console.log('_Payment Intents Stripe OK_', data);
             resolve(data);

         }).catch(error => {
             let errMgs = '[' + error.response.statusText + '] ' +  error.message;
             const errors = error.response.data.error;
             console.log('___[ERORR_STRIPE_PAYMENT_INTENTS(errors)]____', errors);
             for (let key in errors) {
                 if (errors.hasOwnProperty(key)) {
                     const value = errors[key];
                     errMgs += '\n\n ' + key + ': ' + value;
                 }
             }
             reject(errMgs);
         });
    });
    }
    //#endregion
}

