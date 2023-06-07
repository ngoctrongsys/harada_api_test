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
exports.ProductService = void 0;
const Model_product_master_1 = require("../../API_Harada/CDSModel/Model_product_master");
const FunctionCommon_1 = require("../../API_Harada/FunctionCommon");
/**
 *
 * @export
 * @class ProductService
 */
class ProductService {
}
exports.ProductService = ProductService;
/**
 * Handle add new Product
 * @param data
 * @returns
 */
ProductService.addProduct = (data) => {
    FunctionCommon_1.F_Log(`START add Product`);
    const id = data.id.toString();
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Get product to check exist
            const product = yield Model_product_master_1.Model_product_master.SelectByCustomID(id);
            // Case does not exist
            if (!product.length) {
                const entity_product_master = {
                    cr164_product_masterid: '',
                    cr164_major_classification_code: '',
                    cr164_middle_classification_code: '',
                    cr164_subclass_code: '',
                    cr164_base_color: '#FFFFFF',
                    cr164_item_number: id,
                    cr164_product_name: data.title,
                    cr164_image_url: data.image.src,
                };
                const result = yield Model_product_master_1.Model_product_master.Insert(entity_product_master);
                resolve(result);
            }
            else {
                resolve(null);
            }
        }
        catch (error) {
            resolve(null);
        }
    }));
};
/**
 * Handle Update Product
 * @param data
 * @returns
 */
ProductService.updateProduct = (data) => {
    FunctionCommon_1.F_Log(`START update Product`);
    const id = data.id.toString();
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Get Product to check exist
            const product = yield Model_product_master_1.Model_product_master.SelectByCustomID(id);
            // Case exist
            if (product.length) {
                const entity_product_master = {
                    cr164_item_number: id,
                    cr164_product_masterid: product[0].cr164_product_masterid,
                    cr164_major_classification_code: product[0].cr164_major_classification_code,
                    cr164_middle_classification_code: product[0].cr164_middle_classification_code,
                    cr164_subclass_code: product[0].cr164_subclass_code,
                    cr164_base_color: product[0].cr164_base_color,
                    cr164_product_name: data.title,
                    cr164_image_url: data.image.src,
                };
                const result = yield Model_product_master_1.Model_product_master.UpdateByAutoID(product[0].cr164_product_masterid, entity_product_master);
                resolve(result);
            }
            else {
                resolve(null);
            }
        }
        catch (error) {
            resolve(null);
        }
    }));
};
/**
 * Handle delete Product
 * @param data
 * @returns
 */
ProductService.deleteProduct = (data) => {
    FunctionCommon_1.F_Log(`START delete Product`);
    const id = data.id.toString();
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Get Product to check exist
            const product = yield Model_product_master_1.Model_product_master.SelectByCustomID(id);
            // Case exist product
            if (product.length) {
                const result = yield Model_product_master_1.Model_product_master.DeleteByAutoID(product[0].cr164_product_masterid);
                resolve(result);
            }
            else {
                resolve(null);
            }
        }
        catch (error) {
            resolve(null);
        }
    }));
};
//# sourceMappingURL=product.service.js.map