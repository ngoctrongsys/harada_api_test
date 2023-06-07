import { Entity_product_master } from "../../API_Harada/CDSEntities/Entity_product_master";
import { Model_product_master } from "../../API_Harada/CDSModel/Model_product_master";
import { F_Log } from "../../API_Harada/FunctionCommon";

/**
 *
 * @export
 * @class ProductService
 */
export class ProductService {

    /**
     * Handle add new Product
     * @param data 
     * @returns 
     */
    public static addProduct = (data: any) => {
        F_Log(`START add Product`);
        const id = data.id.toString();
        return new Promise<any>(async resolve => {
            try {
                // Get product to check exist
                const product: any = await Model_product_master.SelectByCustomID(id);

                // Case does not exist
                if (!product.length) {
                    const entity_product_master: Entity_product_master = {
                        cr164_product_masterid: '',
                        cr164_major_classification_code: '',
                        cr164_middle_classification_code: '',
                        cr164_subclass_code: '',
                        cr164_base_color: '#FFFFFF',

                        cr164_item_number: id,
                        cr164_product_name: data.title,
                        cr164_image_url: data.image.src,
                    };
                    const result = await Model_product_master.Insert(entity_product_master);
                    resolve(result);
                } else {
                    resolve(null);
                }
            } catch (error) {
                resolve(null);
            }
        });
    }

    /**
     * Handle Update Product
     * @param data 
     * @returns 
     */
    public static updateProduct = (data: any) => {
        F_Log(`START update Product`);
        const id = data.id.toString();
        return new Promise<any>(async resolve => {
            try {
                // Get Product to check exist
                const product: any = await Model_product_master.SelectByCustomID(id);

                // Case exist
                if (product.length) {
                    const entity_product_master: Entity_product_master = {
                        cr164_item_number: id,

                        cr164_product_masterid: product[0].cr164_product_masterid,
                        cr164_major_classification_code: product[0].cr164_major_classification_code,
                        cr164_middle_classification_code: product[0].cr164_middle_classification_code,
                        cr164_subclass_code: product[0].cr164_subclass_code,
                        cr164_base_color: product[0].cr164_base_color,

                        cr164_product_name: data.title,
                        cr164_image_url: data.image.src,
                    };
                    const result = await Model_product_master.UpdateByAutoID(product[0].cr164_product_masterid, entity_product_master);
                    resolve(result);
                } else {
                    resolve(null);
                }
            } catch (error) {
                resolve(null);
            }
        });
    }

    /**
     * Handle delete Product
     * @param data 
     * @returns 
     */
    public static deleteProduct = (data: any) => {
        F_Log(`START delete Product`);
        const id = data.id.toString();
        return new Promise<any>(async resolve => {
            try {
                // Get Product to check exist
                const product: any = await Model_product_master.SelectByCustomID(id);
                // Case exist product
                if (product.length) {
                    const result = await Model_product_master.DeleteByAutoID(product[0].cr164_product_masterid);
                    resolve(result);
                } else {
                    resolve(null);
                }
            } catch (error) {
                resolve(null);
            }
        });
    }
}
