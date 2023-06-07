import { CONST_column_order_management, Entity_order_management } from "../../API_Harada/CDSEntities/Entity_order_management";
import { Model_order_management } from "../../API_Harada/CDSModel/Model_order_management";
import { F_Log } from "../../API_Harada/FunctionCommon";
/**
 *
 * @export
 * @class OrderService
 */
export class OrderService {

    /**
     * handle add new Order
     * @param data 
     * @returns 
     */
    public static addOrder = (data: any) => {
        F_Log(`START add Order event -> update by checkout token`);

        const checkout_token = data.checkout_token.toString();
        return new Promise<any>(async resolve => {
            try {
                // Get order to check exist
                const arrOrder: any = await Model_order_management.SelectByFieldName(CONST_column_order_management.cr164_checkout_token, `'${checkout_token}'`);
                
                // Case exist
                if (arrOrder.length) {
                    for(let i = 0; i < arrOrder.length; i++){
                        const order = arrOrder[i];
                        const entity_order_management: Entity_order_management = {
                            cr164_order_managementid: '',                                   // AutoID
                            cr164_order_number: data.id.toString(),                         // CustomID

                            cr164_original_item_number: order.cr164_original_item_number,
                            cr164_sub_item_number: order.cr164_sub_item_number,
                            cr164_user_id: order.cr164_user_id,
                            cr164_major_classification_code: order.cr164_major_classification_code,
                            cr164_middle_classification_code: order.cr164_middle_classification_code,
                            cr164_subclass_code: order.cr164_subclass_code,
                            cr164_base_color: order.cr164_base_color,
                            cr164_size: order.cr164_size,
                            cr164_quantity: order.cr164_quantity,
                            cr164_finishing_method_classification: order.cr164_finishing_method_classification,
                            cr164_remarks_information_1: order.cr164_remarks_information_1,
                            cr164_remarks_information_2: order.cr164_remarks_information_2,
                            cr164_remarks_information_3: order.cr164_remarks_information_3,
                            cr164_checkout_token: order.cr164_checkout_token,

                            cr164_created_date: data.created_at,
                            cr164_payment_classification: data.financial_status === "paid" ? 2 : 1,
                            cr164_settlement_date: data.processed_at,
                        }
                        const result = await Model_order_management.UpdateByAutoID(order.cr164_order_managementid, entity_order_management);
                        resolve(result);
                    }
                } else {
                    resolve(null);
                }
            } catch (error: any) {
                resolve(null);
            }
        });
    }

    /**
     * Handle Update order
     * @param data 
     * @returns 
     */
    public static updateOrder = (data: any) => {
        F_Log(`START update Order by checkout token`);
        const checkout_token = data.checkout_token.toString();
        return new Promise<any>(async resolve => {
            try {
                // Get order to check exist
                const arrOrder: any = await Model_order_management.SelectByFieldName(CONST_column_order_management.cr164_checkout_token, `'${checkout_token}'`);

                // Case exist
                if (arrOrder.length) {
                    for(let i = 0; i < arrOrder.length; i++) {
                        const order = arrOrder[i];
                        const entity_order_management: Entity_order_management = {
                            cr164_order_managementid: '',                                       // AutoID
                            cr164_order_number: data.id.toString(),                             // CustomID

                            cr164_original_item_number: order.cr164_original_item_number,
                            cr164_sub_item_number: order.cr164_sub_item_number,
                            cr164_user_id: order.cr164_user_id,
                            cr164_major_classification_code: order.cr164_major_classification_code,
                            cr164_middle_classification_code: order.cr164_middle_classification_code,
                            cr164_subclass_code: order.cr164_subclass_code,
                            cr164_base_color: order.cr164_base_color,
                            cr164_size: order.cr164_size,
                            cr164_quantity: order.cr164_quantity,
                            cr164_finishing_method_classification: order.cr164_finishing_method_classification,
                            cr164_remarks_information_1: order.cr164_remarks_information_1,
                            cr164_remarks_information_2: order.cr164_remarks_information_2,
                            cr164_remarks_information_3: order.cr164_remarks_information_3,
                            cr164_checkout_token: order.cr164_checkout_token,

                            cr164_created_date: data.created_at,
                            cr164_payment_classification: data.financial_status === "paid" ? 2 : 1,
                            cr164_settlement_date: data.processed_at,
                        }
                        const result = await Model_order_management.UpdateByAutoID(order.cr164_order_managementid, entity_order_management);
                        resolve(result);
                    }
                } else {
                    resolve(null);
                }
            } catch (error: any) {
                resolve(null);
            }
        });
    }

    /**
     * Handle delete order
     * @param data 
     * @returns 
     */
    public static deleteOrder = (data: any) => {
        F_Log(`START delete Order`);
        return new Promise<any>(async resolve => {
            resolve(null);
        });

        //#region Don't use
        // const id = data.id.toString();
        // return new Promise<any>(async resolve => {
        //     try {
        //         // get order to check exist
        //         const order: any = await Model_order_management.SelectByCustomID(id);
        //         // Case exist order
        //         if (order.length) {
        //             const result = await Model_order_management.DeleteByAutoID(order[0].cr164_order_managementid);
        //             resolve(result);
        //         } else {
        //             resolve(null);
        //         }
        //     } catch (error) {
        //         resolve(null);
        //     }
        // });
        //#endregion
    }

    /**
     * Handle cancelledOrder
     * @param data 
     * @returns 
     */
    public static cancelledOrder = (data: any) => {
        F_Log(`START cancelledOrder`);
        return new Promise<any>(async resolve => {
            resolve(null);
        });
    }

    /**
     * Handle fulfilledOrder
     * @param data 
     * @returns 
     */
    public static fulfilledOrder = (data: any) => {
        F_Log(`START fulfilledOrder`);
        return new Promise<any>(async resolve => {
            resolve(null);
        });
    }

    /**
     * Handle paidOrder
     * @param data 
     * @returns 
     */
    public static paidOrder = (data: any) => {
        F_Log(`START paidOrder`);
        return new Promise<any>(async resolve => {
            resolve(null);
        });
    }

    /**
     * Handle partially_fulfilledOrder
     * @param data 
     * @returns 
     */
    public static partially_fulfilledOrder = (data: any) => {
        F_Log(`START partially_fulfilledOrder`);
        return new Promise<any>(async resolve => {
            resolve(null);
        });
    }
}

//#region temp model
    // {
    //     "id": 820982911946154508,
    //     "email": "jon@doe.ca",
    //     "closed_at": null,
    //     "created_at": "2021-08-16T17:52:31-04:00",
    //     "updated_at": "2021-08-16T17:52:31-04:00",
    //     "number": 234,
    //     "note": null,
    //     "token": "123456abcd",
    //     "gateway": null,
    //     "test": true,
    //     "total_price": "403.00",
    //     "subtotal_price": "393.00",
    //     "total_weight": 0,
    //     "total_tax": "0.00",
    //     "taxes_included": false,
    //     "currency": "USD",
    //     "financial_status": "voided",
    //     "confirmed": false,
    //     "total_discounts": "5.00",
    //     "total_line_items_price": "398.00",
    //     "cart_token": null,
    //     "buyer_accepts_marketing": true,
    //     "name": "#9999",
    //     "referring_site": null,
    //     "landing_site": null,
    //     "cancelled_at": "2021-08-16T17:52:31-04:00",
    //     "cancel_reason": "customer",
    //     "total_price_usd": null,
    //     "checkout_token": null,
    //     "reference": null,
    //     "user_id": null,
    //     "location_id": null,
    //     "source_identifier": null,
    //     "source_url": null,
    //     "processed_at": null,
    //     "device_id": null,
    //     "phone": null,
    //     "customer_locale": "en",
    //     "app_id": null,
    //     "browser_ip": null,
    //     "landing_site_ref": null,
    //     "order_number": 1234,
    //     "discount_applications": [
    //         {
    //         "type": "manual",
    //         "value": "5.0",
    //         "value_type": "fixed_amount",
    //         "allocation_method": "each",
    //         "target_selection": "explicit",
    //         "target_type": "line_item",
    //         "description": "Discount",
    //         "title": "Discount"
    //         }
    //     ],
    //     "discount_codes": [
    //     ],
    //     "note_attributes": [
    //     ],
    //     "payment_gateway_names": [
    //         "visa",
    //         "bogus"
    //     ],
    //     "processing_method": "",
    //     "checkout_id": null,
    //     "source_name": "web",
    //     "fulfillment_status": "pending",
    //     "tax_lines": [
    //     ],
    //     "tags": "",
    //     "contact_email": "jon@doe.ca",
    //     "order_status_url": "https:\/\/apple.myshopify.com\/690933842\/orders\/123456abcd\/authenticate?key=abcdefg",
    //     "presentment_currency": "USD",
    //     "total_line_items_price_set": {
    //         "shop_money": {
    //         "amount": "398.00",
    //         "currency_code": "USD"
    //         },
    //         "presentment_money": {
    //         "amount": "398.00",
    //         "currency_code": "USD"
    //         }
    //     },
    //     "total_discounts_set": {
    //         "shop_money": {
    //         "amount": "5.00",
    //         "currency_code": "USD"
    //         },
    //         "presentment_money": {
    //         "amount": "5.00",
    //         "currency_code": "USD"
    //         }
    //     },
    //     "total_shipping_price_set": {
    //         "shop_money": {
    //         "amount": "10.00",
    //         "currency_code": "USD"
    //         },
    //         "presentment_money": {
    //         "amount": "10.00",
    //         "currency_code": "USD"
    //         }
    //     },
    //     "subtotal_price_set": {
    //         "shop_money": {
    //         "amount": "393.00",
    //         "currency_code": "USD"
    //         },
    //         "presentment_money": {
    //         "amount": "393.00",
    //         "currency_code": "USD"
    //         }
    //     },
    //     "total_price_set": {
    //         "shop_money": {
    //         "amount": "403.00",
    //         "currency_code": "USD"
    //         },
    //         "presentment_money": {
    //         "amount": "403.00",
    //         "currency_code": "USD"
    //         }
    //     },
    //     "total_tax_set": {
    //         "shop_money": {
    //         "amount": "0.00",
    //         "currency_code": "USD"
    //         },
    //         "presentment_money": {
    //         "amount": "0.00",
    //         "currency_code": "USD"
    //         }
    //     },
    //     "line_items": [
    //         {
    //         "id": 866550311766439020,
    //         "variant_id": 808950810,
    //         "title": "IPod Nano - 8GB",
    //         "quantity": 1,
    //         "sku": "IPOD2008PINK",
    //         "variant_title": null,
    //         "vendor": null,
    //         "fulfillment_service": "manual",
    //         "product_id": 632910392,
    //         "requires_shipping": true,
    //         "taxable": true,
    //         "gift_card": false,
    //         "name": "IPod Nano - 8GB",
    //         "variant_inventory_management": "shopify",
    //         "properties": [
    //         ],
    //         "product_exists": true,
    //         "fulfillable_quantity": 1,
    //         "grams": 567,
    //         "price": "199.00",
    //         "total_discount": "0.00",
    //         "fulfillment_status": null,
    //         "price_set": {
    //             "shop_money": {
    //             "amount": "199.00",
    //             "currency_code": "USD"
    //             },
    //             "presentment_money": {
    //             "amount": "199.00",
    //             "currency_code": "USD"
    //             }
    //         },
    //         "total_discount_set": {
    //             "shop_money": {
    //             "amount": "0.00",
    //             "currency_code": "USD"
    //             },
    //             "presentment_money": {
    //             "amount": "0.00",
    //             "currency_code": "USD"
    //             }
    //         },
    //         "discount_allocations": [
    //         ],
    //         "duties": [
    //         ],
    //         "admin_graphql_api_id": "gid:\/\/shopify\/LineItem\/866550311766439020",
    //         "tax_lines": [
    //         ]
    //         },
    //         {
    //         "id": 141249953214522974,
    //         "variant_id": 808950810,
    //         "title": "IPod Nano - 8GB",
    //         "quantity": 1,
    //         "sku": "IPOD2008PINK",
    //         "variant_title": null,
    //         "vendor": null,
    //         "fulfillment_service": "manual",
    //         "product_id": 632910392,
    //         "requires_shipping": true,
    //         "taxable": true,
    //         "gift_card": false,
    //         "name": "IPod Nano - 8GB",
    //         "variant_inventory_management": "shopify",
    //         "properties": [
    //         ],
    //         "product_exists": true,
    //         "fulfillable_quantity": 1,
    //         "grams": 567,
    //         "price": "199.00",
    //         "total_discount": "5.00",
    //         "fulfillment_status": null,
    //         "price_set": {
    //             "shop_money": {
    //             "amount": "199.00",
    //             "currency_code": "USD"
    //             },
    //             "presentment_money": {
    //             "amount": "199.00",
    //             "currency_code": "USD"
    //             }
    //         },
    //         "total_discount_set": {
    //             "shop_money": {
    //             "amount": "5.00",
    //             "currency_code": "USD"
    //             },
    //             "presentment_money": {
    //             "amount": "5.00",
    //             "currency_code": "USD"
    //             }
    //         },
    //         "discount_allocations": [
    //             {
    //             "amount": "5.00",
    //             "discount_application_index": 0,
    //             "amount_set": {
    //                 "shop_money": {
    //                 "amount": "5.00",
    //                 "currency_code": "USD"
    //                 },
    //                 "presentment_money": {
    //                 "amount": "5.00",
    //                 "currency_code": "USD"
    //                 }
    //             }
    //             }
    //         ],
    //         "duties": [
    //         ],
    //         "admin_graphql_api_id": "gid:\/\/shopify\/LineItem\/141249953214522974",
    //         "tax_lines": [
    //         ]
    //         }
    //     ],
    //     "fulfillments": [
    //     ],
    //     "refunds": [
    //     ],
    //     "total_tip_received": "0.0",
    //     "original_total_duties_set": null,
    //     "current_total_duties_set": null,
    //     "admin_graphql_api_id": "gid:\/\/shopify\/Order\/820982911946154508",
    //     "shipping_lines": [
    //         {
    //         "id": 271878346596884015,
    //         "title": "Generic Shipping",
    //         "price": "10.00",
    //         "code": null,
    //         "source": "shopify",
    //         "phone": null,
    //         "requested_fulfillment_service_id": null,
    //         "delivery_category": null,
    //         "carrier_identifier": null,
    //         "discounted_price": "10.00",
    //         "price_set": {
    //             "shop_money": {
    //             "amount": "10.00",
    //             "currency_code": "USD"
    //             },
    //             "presentment_money": {
    //             "amount": "10.00",
    //             "currency_code": "USD"
    //             }
    //         },
    //         "discounted_price_set": {
    //             "shop_money": {
    //             "amount": "10.00",
    //             "currency_code": "USD"
    //             },
    //             "presentment_money": {
    //             "amount": "10.00",
    //             "currency_code": "USD"
    //             }
    //         },
    //         "discount_allocations": [
    //         ],
    //         "tax_lines": [
    //         ]
    //         }
    //     ],
    //     "billing_address": {
    //         "first_name": "Bob",
    //         "address1": "123 Billing Street",
    //         "phone": "555-555-BILL",
    //         "city": "Billtown",
    //         "zip": "K2P0B0",
    //         "province": "Kentucky",
    //         "country": "United States",
    //         "last_name": "Biller",
    //         "address2": null,
    //         "company": "My Company",
    //         "latitude": null,
    //         "longitude": null,
    //         "name": "Bob Biller",
    //         "country_code": "US",
    //         "province_code": "KY"
    //     },
    //     "shipping_address": {
    //         "first_name": "Steve",
    //         "address1": "123 Shipping Street",
    //         "phone": "555-555-SHIP",
    //         "city": "Shippington",
    //         "zip": "40003",
    //         "province": "Kentucky",
    //         "country": "United States",
    //         "last_name": "Shipper",
    //         "address2": null,
    //         "company": "Shipping Company",
    //         "latitude": null,
    //         "longitude": null,
    //         "name": "Steve Shipper",
    //         "country_code": "US",
    //         "province_code": "KY"
    //     },
    //     "customer": {
    //         "id": 115310627314723954,
    //         "email": "john@test.com",
    //         "accepts_marketing": false,
    //         "created_at": null,
    //         "updated_at": null,
    //         "first_name": "John",
    //         "last_name": "Smith",
    //         "orders_count": 0,
    //         "state": "disabled",
    //         "total_spent": "0.00",
    //         "last_order_id": null,
    //         "note": null,
    //         "verified_email": true,
    //         "multipass_identifier": null,
    //         "tax_exempt": false,
    //         "phone": null,
    //         "tags": "",
    //         "last_order_name": null,
    //         "currency": "USD",
    //         "accepts_marketing_updated_at": null,
    //         "marketing_opt_in_level": null,
    //         "admin_graphql_api_id": "gid:\/\/shopify\/Customer\/115310627314723954",
    //         "default_address": {
    //         "id": 715243470612851245,
    //         "customer_id": 115310627314723954,
    //         "first_name": null,
    //         "last_name": null,
    //         "company": null,
    //         "address1": "123 Elm St.",
    //         "address2": null,
    //         "city": "Ottawa",
    //         "province": "Ontario",
    //         "country": "Canada",
    //         "zip": "K2H7A8",
    //         "phone": "123-123-1234",
    //         "name": "",
    //         "province_code": "ON",
    //         "country_code": "CA",
    //         "country_name": "Canada",
    //         "default": true
    //         }
    //     }
    // }
//#endregion

// return new Promise<any>(async resolve => {
//     resolve(null);
// });

        