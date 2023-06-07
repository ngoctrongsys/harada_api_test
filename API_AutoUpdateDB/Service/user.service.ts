import { Entity_user_management } from "../../API_Harada/CDSEntities/Entity_user_management";
import { Model_user_management } from "../../API_Harada/CDSModel/Model_user_management";
import { F_Log } from "../../API_Harada/FunctionCommon";

/**
 *
 * @export
 * @class UserService
 */
export class UserService {

    /**
     * handle add new user
     * @param data 
     * @returns 
     */
    public static addUser = (data: any) => {
        F_Log(`START add User`);
        const id = data.id.toString();
        return new Promise<any>(async resolve => {
            try {
                // Get user to check exist
                const user: any = await Model_user_management.SelectByCustomID(id);

                // Case not exist
                if (!user.length) {
                    // Get address of user
                    let address = '';
                    let country = '';
                    let phone = data.phone;
                    if (data?.default_address) {
                        address = data.default_address.address1 ? data.default_address.address1 : data.default_address.address2;
                        country = data.default_address.country;
                        phone = data.phone ? data.phone : data.default_address.phone;
                    }
                    const entity_user_management: Entity_user_management = {
                        cr164_user_managementid: '',
                        cr164_user_id: id,
                        cr164_user_pw: '',
                        cr164_hiragana_m: '',
                        cr164_hiragana_n: '',
                        cr164_last_name: data.last_name,
                        cr164_given_names: data.first_name,
                        cr164_sex: 0,
                        cr164_birthday: 0,
                        cr164_age: 0,
                        cr164_street_address: address,
                        cr164_country_of_citizenship: country,
                        cr164_phone_number: phone,
                    }
                    const result = await Model_user_management.Insert(entity_user_management);
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
     * Handle Update user
     * @param data 
     * @returns 
     */
    public static updateUser = (data: any) => {
        F_Log(`START update User`);
        const id = data.id.toString();
        return new Promise<any>(async resolve => {
            try {
                // Get user to check exist
                const user: any = await Model_user_management.SelectByCustomID(id);

                // Case exist
                if (user.length) {
                    // Get address of user
                    let address = '';
                    let country = '';
                    let phone = data.phone;
                    if (data?.default_address) {
                        address = data.default_address.address1 ? data.default_address.address1 : data.default_address.address2;
                        country = data.default_address.country;
                        phone = data.phone ? data.phone : data.default_address.phone;
                    }

                    const entity_user_management: Entity_user_management = {
                        cr164_user_id: id,

                        cr164_user_managementid: user[0].cr164_user_managementid,
                        cr164_user_pw: user[0].cr164_user_pw,
                        cr164_hiragana_m: user[0].cr164_hiragana_m,
                        cr164_hiragana_n: user[0].cr164_hiragana_n,
                        cr164_sex: user[0].cr164_sex,
                        cr164_birthday: user[0].cr164_birthday,
                        cr164_age: user[0].cr164_age,

                        cr164_last_name: data.last_name,
                        cr164_given_names: data.first_name,
                        cr164_street_address: address,
                        cr164_country_of_citizenship: country,
                        cr164_phone_number: phone,
                    }
                    const result = await Model_user_management.UpdateByAutoID(user[0].cr164_user_managementid, entity_user_management);
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
     * Handle delete user
     * @param data 
     * @returns 
     */
    public static deleteUser = (data: any) => {
        F_Log(`START delete User`);
        const id = data.id.toString();

        return new Promise<any>(async resolve => {
            try {
                // Get user to check exist
                const user: any = await Model_user_management.SelectByCustomID(id);

                // Case exist user
                if (user.length) {
                    const result = await Model_user_management.DeleteByAutoID(user[0].cr164_user_managementid);
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
