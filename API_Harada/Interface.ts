import { Entity_order_management } from "./CDSEntities/Entity_order_management";
import { Entity_product_master } from "./CDSEntities/Entity_product_master";
import { Entity_user_design_product_management } from "./CDSEntities/Entity_user_design_product_management";
import { Entity_user_management } from "./CDSEntities/Entity_user_management";

export interface ICDSTableData {
    mProduct: Entity_product_master
    mUser: Entity_user_management,
    mOrder: Entity_order_management,
    mUserDesignProduct: Entity_user_design_product_management,
    mCheckoutToken: string,
    mFromScreen: {
        Subclass_Code: string,
        Base_Color: string,
        Remarks_Information_1: string,
        Remarks_Information_2: string,
        Size: string,
        Quantity: string,
        Finishing_Method_Classification: string,
    },
}

export interface IResponseCDSTableData {
    fileInfo: {
        filename: string,
        path: string,
        url: string,
    },

    fileInfoThumbnail: {
        filename: string,
        path: string,
        url: string,
    },

    fileInfo3D: {
        filename: string,
        path: string,
        url: string,
    },

    fileInfoImageUpload: {
        filename: string,
        path: string,
        url: string,
    },

    fileInfoLogoUpload: {
        filename: string,
        path: string,
        url: string,
    },

    insertedData: {
        mProduct: Entity_product_master,
        mUser: Entity_user_management,
        mOrder: Entity_order_management,
        mUserDesignProduct: Entity_user_design_product_management,
    },
}
