"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const order_service_1 = require("./Service/order.service");
const product_service_1 = require("./Service/product.service");
const user_service_1 = require("./Service/user.service");
const Constants_1 = require("../API_Harada/Constants");
/**
 *
 *  https://harada-func.azurewebsites.net/api/updateMaster/product/create
 * @param {Context} context
 * @param {HttpRequest} req
 * @returns {Promise<void>}
 */
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        const subfunction1 = req.params.subfunction1;
        const subfunction2 = req.params.subfunction2;
        const body = req.body;
        // Production | Development
        const env = req.query.env || '';
        switch (req.method) {
            case "POST":
                switch (subfunction1) {
                    // For Customer
                    case enums_1.TypeData.customer:
                        switch (subfunction2) {
                            // Case Create a new Customer
                            case enums_1.TypeUpdate.create:
                                // handle add a customer
                                result = yield user_service_1.UserService.addUser(body);
                                break;
                            // Case Edit a customer
                            case enums_1.TypeUpdate.update:
                                // handle update customer
                                result = yield user_service_1.UserService.updateUser(body);
                                break;
                            // Case Delete a customer
                            case enums_1.TypeUpdate.delete:
                                // handle delete customer
                                result = yield user_service_1.UserService.deleteUser(body);
                                break;
                            default:
                                break;
                        }
                        break;
                    // For Product
                    case enums_1.TypeData.product:
                        switch (subfunction2) {
                            // Case Create a new product
                            case enums_1.TypeUpdate.create:
                                // Handle add product
                                result = yield product_service_1.ProductService.addProduct(body);
                                break;
                            // Case Update a product
                            case enums_1.TypeUpdate.update:
                                // Handle update product
                                result = yield product_service_1.ProductService.updateProduct(body);
                                break;
                            // Case Delete a product
                            case enums_1.TypeUpdate.delete:
                                // Handle delete product
                                result = yield product_service_1.ProductService.deleteProduct(body);
                                break;
                            default:
                                break;
                        }
                        break;
                    // For Order
                    case enums_1.TypeData.order:
                        switch (subfunction2) {
                            // Case Create an Order
                            case enums_1.TypeUpdate.create:
                                // Handle add Order
                                result = yield order_service_1.OrderService.addOrder(body);
                                break;
                            // Case Update an Order
                            case enums_1.TypeUpdate.update:
                                // Handle update Order
                                result = yield order_service_1.OrderService.updateOrder(body);
                                break;
                            // Case Delete an Order - Don't use
                            case enums_1.TypeUpdate.delete:
                                result = yield order_service_1.OrderService.deleteOrder(body);
                                break;
                            // Case Update an Order - Don't use
                            case enums_1.TypeUpdate.cancelled:
                                result = yield order_service_1.OrderService.cancelledOrder(body);
                                break;
                            // Case Update an Order - Don't use
                            case enums_1.TypeUpdate.fulfilled:
                                result = yield order_service_1.OrderService.fulfilledOrder(body);
                                break;
                            // Case Update an Order - Don't use
                            case enums_1.TypeUpdate.paid:
                                result = yield order_service_1.OrderService.paidOrder(body);
                                break;
                            // Case Update an Order - Don't use
                            case enums_1.TypeUpdate.partially_fulfilled:
                                result = yield order_service_1.OrderService.partially_fulfilledOrder(body);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case 'GET':
                switch (subfunction1) {
                    case enums_1.TypeData.temp_design:
                        //#region for mode
                        console.log('Enviroment_(' + env + ')');
                        let tableName = Constants_1.PowerApps_TableName.temp_design;
                        if (env !== '' && env === 'dev') {
                            tableName = Constants_1.PowerApps_TableName_Dev.temp_design;
                        }
                        //#endregion
                        switch (subfunction2) {
                            case 'get_total_qty':
                                result = { status: 200, data: 999 };
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: result
        };
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map