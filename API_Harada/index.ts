const fs = require("fs");
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { FunctionAzureStorage } from "./AzureStorage/FunctionAzureStorage";
import { Model_base } from "./CDSModel/Model_base";
import { Model_temp_design } from "./CDSModel/Model_temp_design";
import { CONST_azureAction, CONST_azureTableName, CONST_PRODUCT_ID, CONST_StorageContainer_usercontents, CONST_StorageFolder_temp, 
    PowerApps_TableName, PowerApps_TableName_Dev } from "./Constants";
import {
    ConvertImageHTMLToFabricDefault, ConvertURLToBase64Image, enlivenObjects, F_ConvertBase64ImageToStream, F_ConvertStringToStream, 
    F_GetCurrentDateTimeYYYYMMDDHHMMSS_FF,F_GetJson, F_Log, UpdatePropertyForObjects, waitForOneSecond, RegisterFontOnCanvas,
    CreateOutputPatternNewVersion, CropItemOutputPattern
} from "./FunctionCommon";
import { ShopifyAdminAPI } from "./ShopifyAdminAPI/ShopifyAdminAPI";

/**
 * For HTTP-triggered functions, you can specify the authorization types needed to have in order to execute it. 
 * There are five types you can choose from the below list. Keep in mind, when running the Azure Functions locally, 
 * the authorization attribute is ignored, and you can call any function no matter which level is specified. 
 * These authorizations will works only after publishing the code in Azure. 
 * It can receive request data via query string parameters, request body data or URL route templates. 
 * Like other functions, they can also integrate with other Azure services such as Blob Storage, Event Hubs, queues and so on.

 * @param {Context} context
 * @param {HttpRequest} req
 * @returns {Promise<void>}
 */
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const table = req.query.table;
    const action = req.query.action;
    const id = req.query.id;
    const body = req.rawBody;
    // Production | Development
    const env = req.query.env || '';
    Model_base.ClearCDSToken();

    F_Log(' -> [Begin]');

    if (table !== undefined) {

        switch (table) {
           
            /******************************************* TEMP DESIGN *****************************************/
            case CONST_azureTableName.temp_design:

                let requestBodyTempDesign:any = null;
                let key_localstorage = '';

                //#region for mode
                let tableName = PowerApps_TableName.temp_design;
                if (env !== '' && env === 'dev') {
                    Model_temp_design.mTableName = PowerApps_TableName_Dev.temp_design;
                    tableName = PowerApps_TableName_Dev.temp_design;
                } else {
                    Model_temp_design.mTableName = PowerApps_TableName.temp_design;
                }
                //#endregion

                switch (action) {

                    case 'test_01':

                        Output(200, { message: 'HELLO WORLD' }, context);
                        break;

                    case CONST_azureAction.test_data:

                        const customerID = req.query.customerID || '';
                        let dataShopify = await ShopifyAdminAPI.GetCustomerLogin(customerID);
                        Output(200, { _table: table, _action: action,  _tableName: tableName, _customer: customerID, _dataShopify: dataShopify }, context);
                        break;

                    case CONST_azureAction.get_total_qty:

                        key_localstorage = req.query.key || '';
                        await Model_temp_design.GetTotalQuantity(key_localstorage).then(async (arrData: any) => {
                            const quantity = arrData ? arrData.length : 0;
                            Output(200, quantity, context);
                        }).catch(errorMessage => {
                            Output(400, errorMessage, context);
                        });
                        break;
                        
                    case CONST_azureAction.output_pattern:

                        const handleInsertList = async () => {
                            try {

                                Output(200, { data: 'OK_Output_Pattern', status: 200 }, context);

                                requestBodyTempDesign = JSON.parse(body);
                                let currentDateTimeStr = F_GetCurrentDateTimeYYYYMMDDHHMMSS_FF();
                                let newFileName = `${ currentDateTimeStr }.png`;

                                const folderTempDesign = CONST_StorageFolder_temp;

                                // 再度購入
                                const isReorder = requestBodyTempDesign.isReorder;

                                // Clone data from requestBodyTempDesign
                                const _listEntity = JSON.parse(JSON.stringify(requestBodyTempDesign.listEntity));

                                console.log('___(1)____Output_Pattern__');

                                
                                const listUpdate:any = [];

                                //#region handle CropItemOutputPattern
                                const fabric = require('fabric').fabric;

                                let product_id = '';
                                let style_code = '';
                                let fileType = '';
                                let _listItem: any = [];
                                let _dataJSONCanvas0 = '';
                                let _dataJSONCanvas4 = '';
                                let _dataImageCanvas0 = '';
                                let _dataImageCanvas4 = '';

                                const _enableRetinaScaling = requestBodyTempDesign.objCanvas.enableRetinaScaling;
                                const _backgroundColor = requestBodyTempDesign.objCanvas.backgroundColor;

                                if (!isReorder) {

                                    // ➝　Add product from [Add to Cart] page
                                    console.log('______FROM: (Add to Cart)___________');
                                    const canvas:any = new fabric.StaticCanvas(null, { enableRetinaScaling: _enableRetinaScaling });
                                    canvas.backgroundColor = _backgroundColor;
                                    canvas.renderOnAddRemove = false;

                                    product_id = requestBodyTempDesign.objCanvas.product_id;
                                    style_code = requestBodyTempDesign.objCanvas.style_code;

                                    // json|image
                                    fileType = requestBodyTempDesign.objCanvas.fileType;
                                    let imgFabric = null;
                                    let imgFabricRight = null;

                                    if (fileType === 'image') {

                                        //#region For imageBase64
                                        const srcImg = requestBodyTempDesign.objCanvas.imageCanvas;
                                        _dataImageCanvas0 = requestBodyTempDesign.objCanvas.imageCanvas;
                                        imgFabric = await ConvertImageHTMLToFabricDefault(srcImg);
                                        if (product_id === CONST_PRODUCT_ID.SHIRTS) {
                                            // For Shirts
                                            const srcImgRight = requestBodyTempDesign.objCanvas.imageCanvasRight;
                                            _dataImageCanvas4 = requestBodyTempDesign.objCanvas.imageCanvasRight;
                                            imgFabricRight = await ConvertImageHTMLToFabricDefault(srcImgRight);
                                        }
                                        //#endregion

                                    } else {

                                        //#region For json, There are Width, Height
                                        
                                        // //Register Font on Canvas
                                        // RegisterFontOnCanvas();

                                        // const width = requestBodyTempDesign.objCanvas.width;
                                        // const height = requestBodyTempDesign.objCanvas.height;
                                        
                                        // // const canvas0:any = new fabric.StaticCanvas(null, { renderOnAddRemove: false });
                                        // const canvas0:any = new fabric.StaticCanvas(null, { enableRetinaScaling: _enableRetinaScaling, renderOnAddRemove: false });
                                        // canvas0.backgroundColor = _backgroundColor;
                                        // canvas0.width = width;
                                        // canvas0.height = height;
                                        // canvas0.selection = false;
                                        // canvas0.preserveObjectStacking = true;
                        
                                        // let jsonCanvas0:any = requestBodyTempDesign.objCanvas.dataJSONCanvas0;
                                        // _dataJSONCanvas0 = requestBodyTempDesign.objCanvas.dataJSONCanvas0;

                                        // jsonCanvas0 = JSON.parse(jsonCanvas0);
                                        // UpdatePropertyForObjects(jsonCanvas0);
                                        // await enlivenObjects(canvas0, jsonCanvas0.objects);
                                        // imgFabric = await ConvertImageHTMLToFabricDefault(canvas0.toDataURL());

                                        // if (product_id === CONST_PRODUCT_ID.SHIRTS) {

                                        //     // For Shirts
                                        //     const canvas4:any = new fabric.StaticCanvas(null, { enableRetinaScaling: requestBodyTempDesign.objCanvas.enableRetinaScaling, renderOnAddRemove: false });
                                        //     canvas4.backgroundColor = requestBodyTempDesign.objCanvas.backgroundColor;
                                        //     canvas4.width = width;
                                        //     canvas4.height = height;
                                        //     canvas4.preserveObjectStacking = true;
                                        //     let jsonCanvas4:any = requestBodyTempDesign.objCanvas.dataJSONCanvas4;
                                        //     _dataJSONCanvas4 = requestBodyTempDesign.objCanvas.dataJSONCanvas4;

                                        //     jsonCanvas4 = JSON.parse(jsonCanvas4);
                                        //     UpdatePropertyForObjects(jsonCanvas4);
                                        //     await enlivenObjects(canvas4, jsonCanvas4.objects);
                                        //     imgFabricRight = await ConvertImageHTMLToFabricDefault(canvas4.toDataURL());
                                        // }
                                        //#endregion
                                    }
                                    console.log('___(2)____SvgItemModel(Start)____________');
                                    _listItem = await CropItemOutputPattern(canvas, imgFabric, imgFabricRight, product_id, style_code, env);
                                    console.log('___(2)____SvgItemModel(End)_____(2)_______');
                                } else {
                                    // ➝　Add product from [Reorder] page
                                    console.log('______FROM: (Reorder)____________');
                                    
                                    // 2023.04.10
                                    // if (requestBodyTempDesign.listItemChange.length > 0) {
                                    //     // Register Font on Canvas
                                    //     RegisterFontOnCanvas();
                                    // }

                                    for(const itemChange of requestBodyTempDesign.listItemChange) {

                                        const handleItemChange = waitForOneSecond().then(async (obj: any) => {
                                            if (!itemChange.listOfCanvas) {
                                                return;
                                            }
    
                                            const canvas:any = new fabric.StaticCanvas(null, { enableRetinaScaling: _enableRetinaScaling });
                                            canvas.backgroundColor = _backgroundColor;
                                            canvas.renderOnAddRemove = false;

                                            product_id = itemChange.product_id;
                                            style_code = itemChange.style_code;
                                            const listOfCanvas = itemChange.listOfCanvas.split(',');
                                            const UrlJsonCanvas0 = listOfCanvas[0];
                                            // json|image
                                            fileType = UrlJsonCanvas0.split('.').pop();
                                            // Set fileName for itemChange
                                            itemChange.fileType = fileType;
                                            let imgFabric = null;
                                            let imgFabricRight = null;
    
                                            if (fileType === 'image' || fileType === 'png') {
                                                //#region For imageBase64
                                                const srcImg = UrlJsonCanvas0;
                                                itemChange._dataImageCanvas0 = await ConvertURLToBase64Image(srcImg);

                                                imgFabric = await ConvertImageHTMLToFabricDefault(srcImg);
                                                if (product_id === CONST_PRODUCT_ID.SHIRTS) {

                                                    // For Shirts
                                                    const srcImgRight = listOfCanvas[1];
                                                    itemChange._dataImageCanvas4 = await ConvertURLToBase64Image(srcImgRight);
                                                    imgFabricRight = await ConvertImageHTMLToFabricDefault(srcImgRight);
                                                }
                                                //#endregion
    
                                            } else {
    
                                                //#region For JSON, There are Width, Height
                                                const rsJsonCanvas0: any = await F_GetJson(UrlJsonCanvas0);
                                                itemChange._dataJSONCanvas0 = rsJsonCanvas0;

                                                // //Register Font on Canvas
    
                                                const width = rsJsonCanvas0.width;
                                                const height = rsJsonCanvas0.height;
                                                
                                                // const canvas0:any = new fabric.StaticCanvas(null, { renderOnAddRemove: false });
                                                const canvas0:any = new fabric.StaticCanvas(null, { enableRetinaScaling: _enableRetinaScaling, renderOnAddRemove: false });
                                                canvas0.backgroundColor = _backgroundColor;
                                                canvas0.width = width;
                                                canvas0.height = height;
                                                canvas0.selection = false;
                                                canvas0.preserveObjectStacking = true;
                                
                                                let jsonCanvas0:any = rsJsonCanvas0;
                                                UpdatePropertyForObjects(jsonCanvas0);
                                                await enlivenObjects(canvas0, jsonCanvas0.objects);
                                                imgFabric = await ConvertImageHTMLToFabricDefault(canvas0.toDataURL());
    
                                                if (product_id === CONST_PRODUCT_ID.SHIRTS) {
    
                                                    // For Shirts
                                                    const UrlJsonCanvas4 = listOfCanvas[1];
                                                    
                                                    const rsJsonCanvas4: any = await F_GetJson(UrlJsonCanvas4);
                                                    itemChange._dataJSONCanvas4 = rsJsonCanvas4;
                                                    
                                                    const canvas4:any = new fabric.StaticCanvas(null, { enableRetinaScaling: _enableRetinaScaling, renderOnAddRemove: false });
                                                    canvas4.backgroundColor = _backgroundColor;
                                                    canvas4.width = width;
                                                    canvas4.height = height;
                                                    canvas4.preserveObjectStacking = true;
                                                    let jsonCanvas4:any = rsJsonCanvas4;
                                                    
                                                    UpdatePropertyForObjects(jsonCanvas4);
                                                    await enlivenObjects(canvas4, jsonCanvas4.objects);
                                                    imgFabricRight = await ConvertImageHTMLToFabricDefault(canvas4.toDataURL());
                                                }
                                                //#endregion
                                            }

                                            _listItem = await CropItemOutputPattern(canvas, imgFabric, imgFabricRight, product_id, style_code, env);
                                            itemChange._listItem = _listItem;
                                        })
                                        await handleItemChange;
                                    }
                                }

                                const canvas3:any = new fabric.StaticCanvas(null, { enableRetinaScaling: _enableRetinaScaling });

                                let urlImageCanvas0 = '';
                                let urlImageCanvas4 = '';
                                let urlJsonCanvas0 = '';
                                let urlJsonCanvas4 = '';
                                //#endregion

                                for (const item of _listEntity) {
                                    const handleUpdateTempDesign = waitForOneSecond().then(async (obj: any) => {

                                        const temp_design_id = item.cr164_temp_design_id;
                                        if (isReorder) {
                                            console.log('______(REORDER)___________');
                                            // In the case: For Reorder
                                            product_id = item.cr164_product_id;
                                            style_code = item.cr164_category_code;

                                            if (requestBodyTempDesign.listItemChange.length > 0) {
                                                const objItemChange = requestBodyTempDesign.listItemChange.find((itemX:any) => itemX.cr164_temp_design_id === temp_design_id);
    
                                                if (objItemChange) {

                                                    //#region Description 
                                                    /*  Get the values of the changed item as:
                                                        １。@fileType
                                                        ２。@_listItem
                                                        ３。@_dataJSONCanvas0
                                                        ４。@_dataJSONCanvas4
                                                        ５。@_dataImageCanvas0
                                                        ６。@_dataImageCanvas4
                                                    */
                                                    //#endregion

                                                    fileType = objItemChange.fileType;
                                                    _listItem = objItemChange._listItem;
                                                    if (fileType === 'json') {
                                                        _dataJSONCanvas0 = JSON.stringify(objItemChange._dataJSONCanvas0).replace('"', '\"');
                                                        _dataJSONCanvas4 = (product_id === CONST_PRODUCT_ID.SHIRTS) ? JSON.stringify(objItemChange._dataJSONCanvas4).replace('"', '\"') : '';
                                                    } else {
                                                        _dataImageCanvas0 = objItemChange._dataImageCanvas0;
                                                        _dataImageCanvas4 = (product_id === CONST_PRODUCT_ID.SHIRTS) ? objItemChange._dataImageCanvas4 : '';
                                                    }
                                                } else {
                                                    fileType = '';
                                                    _listItem = [];
                                                    _dataJSONCanvas0 = '';
                                                    _dataJSONCanvas4 = '';
                                                    _dataImageCanvas0 = '';
                                                    _dataImageCanvas4 = '';
                                                }
                                            }
                                        }

                                        //#region Handle CropItem 
                                        canvas3.clear();
                                        console.log('___(3)____OutputPattern[Size:' + item.cr164_size + '](Start)___________');
                                        let base64OP = await CreateOutputPatternNewVersion(canvas3, product_id, style_code, _listItem, item.cr164_size, item.image_ruler, env);
                                        console.log('___(3)____OutputPattern[Size:' + item.cr164_size + '](End)___________');

                                        //#region Handlde save file to Storage account
                                        const azureSubFolderCanvas = folderTempDesign +`/${ temp_design_id }/canvas`;
                                        if (fileType === 'image' || fileType === 'png') {

                                            console.log('___(4)____SaveImage(Canvas)(Start)____(4)________');
                                            // For image
                                            if (urlImageCanvas0 === '' || (urlImageCanvas0 && isReorder)) {
                                                
                                                const canvas0_result = F_ConvertBase64ImageToStream(_dataImageCanvas0);
                                                await FunctionAzureStorage.F_UploadBlobsFromStream(
                                                                        CONST_StorageContainer_usercontents,
                                                                        azureSubFolderCanvas, 
                                                                        canvas0_result?.stream, 
                                                                        canvas0_result?.streamLength, 
                                                                        canvas0_result?.contentType,
                                                                        '0.png', 
                                                                        'canvas_{0}').then(async (response:any) => {
                                                    urlImageCanvas0 = response.url;
                                                });
                                            } else {
                                                //#region for copy
                                                await FunctionAzureStorage.F_CopyBlob(
                                                    urlImageCanvas0,
                                                                        CONST_StorageContainer_usercontents,
                                                                        azureSubFolderCanvas, 
                                                                        '0.png', 
                                                                        'canvas_{0}'
                                                                        ).then(async (response:any) => {
                                                });
                                                //#endregion
                                            }
        
                                            if (product_id === CONST_PRODUCT_ID.SHIRTS) {
                                                if (urlImageCanvas4 === '' || (urlImageCanvas4 && isReorder)) {
                                                    const canvas4_result = F_ConvertBase64ImageToStream(_dataImageCanvas4);
                                                    await FunctionAzureStorage.F_UploadBlobsFromStream(
                                                                            CONST_StorageContainer_usercontents,
                                                                            azureSubFolderCanvas, 
                                                                            canvas4_result?.stream, 
                                                                            canvas4_result?.streamLength, 
                                                                            canvas4_result?.contentType,
                                                                            '4.png', 
                                                                            'canvas_{0}').then(async (response:any) => {
                                                        urlImageCanvas4 = response.url;
                                                    });
                                                } else {
                                                    //#region for copy
                                                    await FunctionAzureStorage.F_CopyBlob(
                                                                            urlImageCanvas4,
                                                                            CONST_StorageContainer_usercontents,
                                                                            azureSubFolderCanvas, 
                                                                            '4.png', 
                                                                            'canvas_{0}'
                                                                            ).then(async (response:any) => {
                                                    });
                                                    //#endregion
                                                }
                                            }
                                            console.log('___(4)____SaveImage(Canvas)(End)___________');
                                        } else if(fileType === 'json') {
                                            // For json

                                            if (urlJsonCanvas0 === '' || (urlJsonCanvas0 && isReorder)) {
                                                let inputFile0 = F_ConvertStringToStream(_dataJSONCanvas0);
                                                await FunctionAzureStorage.F_UploadBlobsFromStream(CONST_StorageContainer_usercontents, 
                                                                                                    azureSubFolderCanvas, 
                                                                                                    inputFile0?.stream, 
                                                                                                    inputFile0?.streamLength, 
                                                                                                    inputFile0?.contentType || '', 
                                                                                                    `0.json`, 
                                                                                                    'canvas_{0}').then(async (fileInfo: any) => {
                                                    urlJsonCanvas0 = fileInfo.url;
                                                });
                                            } else {
                                                //#region for copy
                                                await FunctionAzureStorage.F_CopyBlob(
                                                                        urlJsonCanvas0,
                                                                        CONST_StorageContainer_usercontents,
                                                                        azureSubFolderCanvas, 
                                                                        `0.json`, 
                                                                        'canvas_{0}').then(async (fileInfo:any) => {
                                                });
                                                //#endregion
                                            }

                                            if (product_id === CONST_PRODUCT_ID.SHIRTS) {
                                                if (urlJsonCanvas4 === '' || (urlJsonCanvas4 && isReorder)) {
                                                    let inputFile4 = F_ConvertStringToStream(_dataJSONCanvas4);
                                                    await FunctionAzureStorage.F_UploadBlobsFromStream(CONST_StorageContainer_usercontents, 
                                                                                                        azureSubFolderCanvas, 
                                                                                                        inputFile4?.stream, 
                                                                                                        inputFile4?.streamLength, 
                                                                                                        inputFile4?.contentType || '', 
                                                                                                        `4.json`, 
                                                                                                        'canvas_{0}').then(async (fileInfo: any) => {
                                                        urlJsonCanvas4 = fileInfo.url;
                                                    });
                                                } else {
                                                    //#region for copy
                                                    await FunctionAzureStorage.F_CopyBlob(
                                                                            urlJsonCanvas4,
                                                                            CONST_StorageContainer_usercontents,
                                                                            azureSubFolderCanvas, 
                                                                            `4.json`, 
                                                                            'canvas_{0}').then(async (fileInfo:any) => {
                                                    });
                                                    //#endregion
                                                }
                                            }
                                        } else {

                                            if (isReorder) {
                                                
                                                // For the case of repurchase and no change size
                                                // Make a copy of the order's Canvas resource to temporary
                                                if (!item.isChangeSize) {

                                                    // Reassign the old output value
                                                    base64OP = item.cr164_design_output_image_src;
                                                    
                                                    //#region Copy [canvas] Folder
                                                    const sourceBlob = item.orderId + '/' + item.orderDetailsId + '/canvas';
                                                    const destinationBlob = folderTempDesign + '/' + temp_design_id + '/canvas';
                                                    await FunctionAzureStorage.F_CopyByFolder(CONST_StorageContainer_usercontents, sourceBlob, destinationBlob);
                                                    //#endregion
                                                } else {
                                                    if (fileType === '') {
                                                        // The [@fileType] value will depend on the resource (json/image)
                                                        console.log('____No resources(json file) exist when resizing to process Output____');
                                                    }
                                                }
                                            }
                                        }
                                        //#endregion
                                        //#endregion 

                                        
                                        //#region 1. For Image Output Pattern: cr164_design_output_image_src
                                        console.log('___(4)____SaveImage(OutputPattern)(Start)____________');
                                        // const design_output_pattern_result = F_ConvertBase64ImageToStream(item.cr164_design_output_image_src);
                                        const design_output_pattern_result = F_ConvertBase64ImageToStream(base64OP);
                                        const azureSubFolderPaperPattern = folderTempDesign +`/${ temp_design_id }/paper pattern`;
                                        await FunctionAzureStorage.F_UploadBlobsFromStream(
                                                                CONST_StorageContainer_usercontents,
                                                                azureSubFolderPaperPattern, 
                                                                design_output_pattern_result?.stream, 
                                                                design_output_pattern_result?.streamLength, 
                                                                design_output_pattern_result?.contentType,
                                                                newFileName, 
                                                                'design_{0}').then(async (response:any) => {
                                            item.cr164_design_output_image_src = response.url;
                                        });
                                        console.log('___(4)____SaveImage(OutputPattern)(End)____________');
                                        //#endregion

                                        const _item = {
                                            cr164_temp_design_id: temp_design_id,
                                            data : {
                                                cr164_design_output_image_src: item.cr164_design_output_image_src
                                            }
                                        }
                                        listUpdate.push(_item);
                                    });

                                    await handleUpdateTempDesign;
                                }

                                await Model_temp_design.UpdateListImageOutputPatternWithSequence(listUpdate, tableName).then((_repData: any) => {
                                        console.log('___(5)____UPDATE_(OK)_____');
                                    }).catch((_errMgs) => {
                                        console.log('_UPDATE_03_(ERROR)_', _errMgs);
                                    });

                            } catch (error: any) {
                                Output(400, error, context);
                            }
                        };
                        handleInsertList();
                        break;
                }
                break;

            default:
                break;
        }

    } else {

        //#region Handle Canvas on Fabric.js
        /******************************************* Handle Canvas on Fabric.js *****************************************/
        if (action == 'handle_json_canvas_text') {

            F_Log('start handle_json_canvas_text');

            try {
                const isLocalhost = req.query.a ? true : false;
                let _result = '';
                // http://fabricjs.com/fabric-intro-part-4#node
                // https://github.com/fabricjs/fabric.js/issues/4174
                // loadFromJSON ignores custom properties after loading
                // const requestBodyCanvas = JSON.parse(body);
                // // Windows
                // const fontFolder = __dirname + '\\assets\\Fonts\\fixtures';

                // Linux
                const fontFolder = __dirname + '/assets/Fonts/fixtures';

                const { createCanvas, registerFont, freetypeVersion, pangoVersion, cairoVersion } = require('canvas');

                // Default: Corki-Regular.otf - Corki
                // Default: TrainOne-Regular.ttf - Train One
                const fontName = 'TrainOne-Regular.ttf';
                const fontFamily = 'Train One';

                // // Windows
                // const path01 = fontFolder + '\\' + fontName;

                // // Linux
                const path01 = fontFolder + '/' + fontName;

                // // const path01 = 'C:\\Windows\\Fonts\\arial.ttf';
                // // const fontFamily = 'Arial';

                registerFont(path01, { family: fontFamily, weight: 'regular', style: 'normal' });

                // Check write permission
                try {
                    fs.accessSync(path01, fs.constants.W_OK);
                    console.log('__OK___Can write %s', path01);
                    _result = '__OK___Can write (' + path01 + ')';
                }
                catch (err) {
                    console.log("__NG___ %s doesn't exist", path01);
                    _result = "__NG___ (" +  path01 + ") doesn't exist";
                }

                //#region #1. mode-canvas
                // const nodeCanvas = createCanvas(500, 500);
                // const ctx = nodeCanvas.getContext('2d');
                // ctx.font = '50px ' + fontFamily + ', Sans';
                // ctx.rotate(0.1);
                // ctx.fillText('(A)!@#$%', 120, 250);
                //#endregion

                //#region #2. FabricJS
                // const fabric = require('fabric').fabric;
                // fabric.Object.prototype.objectCaching = false;
                // const fabricCanvas = new fabric.Canvas(null, { width: 500, height: 500 });
                // const objText = new fabric.Text('(A)!@#$%', {
                //     fontSize: 50,
                //     left: 120,
                //     top: 250,
                //     fontFamily: fontFamily
                // });
                // fabricCanvas.add(objText);
                // fabricCanvas.renderAll();
                //#endregion

                const resp = {
                    isLocalhost: isLocalhost,
                    result: _result,

                    // freetypeVersion: freetypeVersion,
                    // pangoVersion: pangoVersion,
                    // cairoVersion: cairoVersion,

                    // nodeCanvas: nodeCanvas.toDataURL(),
                    // fabricCanvas: fabricCanvas.toDataURL(),
                }

                // Clears a canvas element and dispose objects
                // fabricCanvas.dispose();

                Output(200, resp, context);

            } catch (error:any) {
                console.log('_ERROR_', error);
                Output(400, error, context);
            }
        }
        //#endregion
    }

    //#region Output -> -1
    if (!context.res) {
        Output(-1, '', context);
    }
    //#endregion
};

export default httpTrigger;

/**
 *
 * Output
 * @param {number} status
 * @param {*} data
 * @param {*} context
 */
function Output(status: number, data: any, context: any) {
    context.res = {
        body: {
            status: status,
            data: data
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };

    context.done();
}
