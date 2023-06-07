import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { TypeData, TypeUpdate } from "./enums";
import { OrderService } from "./Service/order.service";
import { ProductService } from "./Service/product.service";
import { UserService } from "./Service/user.service";
import { PowerApps_TableName, PowerApps_TableName_Dev } from "../API_Harada/Constants";

/**
 *
 *  https://harada-func.azurewebsites.net/api/updateMaster/product/create
 * @param {Context} context
 * @param {HttpRequest} req
 * @returns {Promise<void>}
 */
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    let result: any;
    const subfunction1 = req.params.subfunction1;
    const subfunction2 = req.params.subfunction2;
    const body = req.body;
    
    // Production | Development
    const env = req.query.env || '';
    
    switch (req.method) {
        case "POST":
            switch (subfunction1) {
                // For Customer
                case TypeData.customer:
                    switch (subfunction2) {

                        // Case Create a new Customer
                        case TypeUpdate.create:
                            // handle add a customer
                            result = await UserService.addUser(body);
                            break;

                        // Case Edit a customer
                        case TypeUpdate.update:
                            // handle update customer
                            result = await UserService.updateUser(body);
                            break;

                        // Case Delete a customer
                        case TypeUpdate.delete:
                            // handle delete customer
                            result = await UserService.deleteUser(body);
                            break;

                        default:
                            break;
                    }
                    break;

                // For Product
                case TypeData.product:
                    switch (subfunction2) {
                        // Case Create a new product
                        case TypeUpdate.create:
                            // Handle add product
                            result = await ProductService.addProduct(body);
                            break;

                        // Case Update a product
                        case TypeUpdate.update:
                            // Handle update product
                            result = await ProductService.updateProduct(body);
                            break;

                        // Case Delete a product
                        case TypeUpdate.delete:
                            // Handle delete product
                            result = await ProductService.deleteProduct(body);
                            break;

                        default:
                            break;
                    }
                    break;

                // For Order
                case TypeData.order:
                    switch (subfunction2) {
                        // Case Create an Order
                        case TypeUpdate.create:
                            // Handle add Order
                            result = await OrderService.addOrder(body);
                            break;

                        // Case Update an Order
                        case TypeUpdate.update:
                            // Handle update Order
                            result = await OrderService.updateOrder(body);
                            break;

                        // Case Delete an Order - Don't use
                        case TypeUpdate.delete:
                            result = await OrderService.deleteOrder(body);
                            break;

                        // Case Update an Order - Don't use
                        case TypeUpdate.cancelled:
                            result = await OrderService.cancelledOrder(body);
                            break;

                        // Case Update an Order - Don't use
                        case TypeUpdate.fulfilled:
                            result = await OrderService.fulfilledOrder(body);
                            break;

                        // Case Update an Order - Don't use
                        case TypeUpdate.paid:
                            result = await OrderService.paidOrder(body);
                            break;

                        // Case Update an Order - Don't use
                        case TypeUpdate.partially_fulfilled:
                            result = await OrderService.partially_fulfilledOrder(body);
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

                case TypeData.temp_design:


                    //#region for mode
                    console.log('Enviroment_(' + env + ')');
                    let tableName = PowerApps_TableName.temp_design;
                    if (env !== '' && env === 'dev') {
                        tableName = PowerApps_TableName_Dev.temp_design;
                    }
                    //#endregion

                    switch (subfunction2) {

                        case 'get_total_qty':
                            result = { status: 200, data: 999  };
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
};

export default httpTrigger;
