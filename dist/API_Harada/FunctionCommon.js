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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListUrlItemCropModel = exports.ConvertBase64ToImageHTML = exports.GetObjectInArrayByName = exports.SetFabricFullCanvasWidthHeight = exports.RenderRulerOnOutputPattern = exports.SetSizeCanvas = exports.GetCurrentDateTime = exports.ReadFileFromUrl = exports.ProductIsPolo = exports.RegisterFontOnCanvas = exports.ConvertBase64ToImageHTML_02 = exports.F_SetReadonlyFabricObject = exports.ConvertSvgStringToFabric = exports.ConvertImageHTMLToFabricDefault = exports.UpdatePropertyForObjects = exports.enlivenObjects = exports.loadFromJSON = exports.ConvertImageHTMLToFabric = exports.ModeIsDev = exports.waitForOneSecond = exports.F_ConvertStringToStream = exports.F_ConvertBase64ImageToStream = exports.F_CreateGUID = exports.F_GetBtoaFromShopify = exports.FormatNumbers = exports.F_FormatCurrency = exports.F_CreateFolderIfNotExist = exports.F_GetCurrentDateTimeYYYYMMDDHHMMSS_FF = exports.F_GetCurrentDateTimeYYYY_MM_DD_HH_MM_SS = exports.F_GetFileNameFromPath = exports.F_RoundNumber = exports.F_IsNullOrEmptyAttribute = exports.F_GetValueByKey = exports.F_IsNullOrEmptyListItem = exports.F_IsNullOrEmpty = exports.F_GetFileFromURL = exports.ConvertURLToBase64Image = exports.F_GetJson = exports.F_ConvertReadStreamToBuffer = exports.F_ConvertURLToReadStream = exports.F_ConvertBufferToStream = exports.F_PaddingRight = exports.F_PaddingLeft = exports.F_GetValueByIndex = exports.F_UnsetKey = exports.F_UnsetKeys = exports.F_LogError = exports.F_Log = exports.F_ConvertObjectToJSONString = exports.F_ConvertToJSONObj = void 0;
exports.GetInfoOutputPattern_Dev = exports.GetSizePatternModel = exports.F_SetCanvasWidthHeightByProductStyle_Dev = exports.GetInfoOutputPattern = exports.F_SetCanvasWidthHeightByProductStyle = exports.CropItemByShape = exports.CreateOutputPattern = exports.CreateOutputPatternNewVersion = exports.CropImageByShape = exports.AddShapeToCanvas = exports.CropItemOutputPattern = exports.GetArrayUrlItemSvgOutput = void 0;
var fs = require('fs');
var request = require('request');
const fetch = require("node-fetch");
// import { fabric } from 'fabric';
// // import { fabric } from "fabric";
// // const fabric = require('fabric').fabric;
// node-canvas
// const { Image, loadImage, createCanvas } = require('canvas');
const stream_1 = require("stream");
const Model_customer_1 = require("./CDSModel/Model_customer");
const Constants_1 = require("./Constants");
const axios_1 = __importDefault(require("axios"));
//#region
/**
 *
 * Convert to JSON Obj
 * @param {string} data
 * @returns
 */
const F_ConvertToJSONObj = (data) => {
    let obj;
    obj = JSON.parse(data);
    return obj;
};
exports.F_ConvertToJSONObj = F_ConvertToJSONObj;
const F_ConvertObjectToJSONString = (obj) => {
    let str;
    str = JSON.stringify(obj);
    return str;
};
exports.F_ConvertObjectToJSONString = F_ConvertObjectToJSONString;
const F_Log = (obj, obj2 = undefined) => {
    if (obj2 === undefined) {
        // console.log('______________(F_Log)[obj2 = Undefined]_', obj);
    }
    else {
        console.log('__(F_Log)_' + obj, obj2);
    }
};
exports.F_Log = F_Log;
const F_LogError = (obj, obj2 = undefined) => {
    if (obj2 === undefined) {
        console.log('______________(F_LogError)[ERROR(obj2 = Undefined)]_', obj);
    }
    else {
        console.log('__(F_LogError)[ERROR]_' + obj, obj2);
    }
};
exports.F_LogError = F_LogError;
const F_UnsetKeys = (obj, arrRemoveKeys) => {
    var target = {};
    for (var i in obj) {
        if (arrRemoveKeys.indexOf(i) >= 0)
            continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
            continue;
        target[i] = obj[i];
    }
    return target;
};
exports.F_UnsetKeys = F_UnsetKeys;
const F_UnsetKey = (obj, removeKey) => {
    var target = {};
    for (var i in obj) {
        if (removeKey == i)
            continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
            continue;
        target[i] = obj[i];
    }
    return target;
};
exports.F_UnsetKey = F_UnsetKey;
const F_GetValueByIndex = (obj, key) => {
    for (var i in obj) {
        if (key == i && Object.prototype.hasOwnProperty.call(obj, i)) {
            return obj[i];
        }
    }
    return undefined;
};
exports.F_GetValueByIndex = F_GetValueByIndex;
const F_PaddingLeft = (str, padChar, len) => {
    while (str.length < len)
        str = padChar + str;
    return str;
};
exports.F_PaddingLeft = F_PaddingLeft;
const F_PaddingRight = (str, padChar, len) => {
    while (str.length < len)
        str = str + padChar;
    return str;
};
exports.F_PaddingRight = F_PaddingRight;
/**
 * Convert buffer to stream by @Duplex
 *  ref to: https://www.derpturkey.com/buffer-to-stream-in-node/
 * @param {*} buffer
 * @returns
 */
const F_ConvertBufferToStream = (buffer) => {
    let stream = new stream_1.Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
};
exports.F_ConvertBufferToStream = F_ConvertBufferToStream;
const F_ConvertURLToReadStream = (url) => {
    const stream = fs.createReadStream(url);
    return stream;
};
exports.F_ConvertURLToReadStream = F_ConvertURLToReadStream;
const F_ConvertReadStreamToBuffer = (readStream) => {
    const buff = Buffer.from(readStream);
    return buff;
};
exports.F_ConvertReadStreamToBuffer = F_ConvertReadStreamToBuffer;
function F_GetJson(queryStr) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.F_Log('F_GetJson');
        let dataRS = '';
        yield fetch(queryStr).then((response) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const isJson = (_a = response.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.includes('application/json');
            const data = isJson && (yield response.json());
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return error;
            }
            return data;
        })).then((data) => {
            // console.log('data', data);
            dataRS = data;
            return dataRS;
        });
        return dataRS;
    });
}
exports.F_GetJson = F_GetJson;
const ConvertURLToBase64Image = (urlImage) => __awaiter(void 0, void 0, void 0, function* () {
    const type = urlImage.split('.').pop();
    const image = yield axios_1.default.get(urlImage, { responseType: 'arraybuffer' });
    const returnedB64 = `data:image/${type};base64,` + Buffer.from(image.data).toString('base64');
    return returnedB64;
});
exports.ConvertURLToBase64Image = ConvertURLToBase64Image;
// export const F_ConvertURLToBuffer = async (url: any) => {
//     try {
//         const response = await axios.get(url)
//             .then(function (response: any) {
//                 if (response.data.value) {
//                     var rs = response.data.value;
//                     console.log('[' + functionName + '] Ok');
//                     //console.log(response);
//                     resolve(rs);
//                 }
//                 else {
//                     if (response.data) {
//                         var rs = response.data;
//                         console.log('[' + functionName + '] Ok');
//                         //console.log(response);
//                         resolve(rs);
//                     }
//                     else {
//                         console.log('[' + functionName + '] response.data Not Found');
//                         //console.log(response);
//                         resolve({});
//                     }
//                 }
//             })
//             .catch(function (error: any) {
//                 console.log('[' + functionName + '] Error');
//                 try {
//                     console.log(error.response.data.error);
//                 } catch (e) {
//                 }
//                 console.log(error);
//                 reject(error);
//             });
//         const arrayBuffer = await response.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);
//         return buffer;
//     } catch (error) {
//         return { error };
//     }
// }
// export async function downloadFile(fileUrl: string, outputLocationPath: string) {
//     const writer = createWriteStream(outputLocationPath);
//     return axios({
//         method: 'get',
//         url: fileUrl,
//         responseType: 'stream',
//     }).then(response => {
//         //ensure that the user can call `then()` only when the file has
//         //been downloaded entirely.
//         return new Promise((resolve, reject) => {
//             response.data.pipe(writer);
//             let error = null;
//             writer.on('error', err => {
//                 error = err;
//                 writer.close();
//                 reject(err);
//             });
//             writer.on('close', () => {
//             if (!error) {
//                 resolve(true);
//             }
//             //no need to call the reject here, as it will have been called in the
//             //'error' stream;
//             });
//         });
//     });
// }
const F_GetFileFromURL = (file) => {
    return new Promise(resolve => {
        request.get(file.url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
            else {
                resolve(null);
            }
        });
    });
};
exports.F_GetFileFromURL = F_GetFileFromURL;
const F_IsNullOrEmpty = (str) => {
    if (str == null
        || str == undefined
        || str == '') {
        return true;
    }
    return false;
};
exports.F_IsNullOrEmpty = F_IsNullOrEmpty;
const F_IsNullOrEmptyListItem = (obj) => {
    if (obj == null
        || obj == undefined) {
        return true;
    }
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
};
exports.F_IsNullOrEmptyListItem = F_IsNullOrEmptyListItem;
const F_GetValueByKey = (obj, key) => {
    if (!exports.F_IsNullOrEmptyListItem(obj)) {
        for (var i in obj) {
            if (key == i && Object.prototype.hasOwnProperty.call(obj, i)) {
                return obj[i];
            }
        }
    }
    return undefined;
};
exports.F_GetValueByKey = F_GetValueByKey;
const F_IsNullOrEmptyAttribute = (obj, attribute) => {
    return exports.F_GetValueByKey(obj, attribute) == undefined;
};
exports.F_IsNullOrEmptyAttribute = F_IsNullOrEmptyAttribute;
const F_RoundNumber = (numberInput, decimalPlaces) => {
    var temp = Math.pow(10, decimalPlaces);
    return Math.round(numberInput * temp) / temp;
};
exports.F_RoundNumber = F_RoundNumber;
const F_GetFileNameFromPath = (filePath) => {
    var fileName = filePath.replace(/^.*[\\\/]/, '');
    return fileName;
};
exports.F_GetFileNameFromPath = F_GetFileNameFromPath;
// Output ex: '2012-11-04 14:55:45'
const F_GetCurrentDateTimeYYYY_MM_DD_HH_MM_SS = () => {
    return new Date().toISOString() // 2012-11-04T14:51:06.157Z
        .replace(/T/, ' ') // replace T with a space
        .replace(/\..+/, ''); // delete the dot and everything after
};
exports.F_GetCurrentDateTimeYYYY_MM_DD_HH_MM_SS = F_GetCurrentDateTimeYYYY_MM_DD_HH_MM_SS;
/**
 *
 * Output ex: '20121104_145545_157Z'
 * @returns
 */
const F_GetCurrentDateTimeYYYYMMDDHHMMSS_FF = () => {
    return new Date().toISOString()
        .replace(/T/, '_')
        .replace(/[\-\:]/g, '')
        .replace(/\./, '_');
};
exports.F_GetCurrentDateTimeYYYYMMDDHHMMSS_FF = F_GetCurrentDateTimeYYYYMMDDHHMMSS_FF;
/**
 *
 *
 * @param {string} folderPath
 */
const F_CreateFolderIfNotExist = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
};
exports.F_CreateFolderIfNotExist = F_CreateFolderIfNotExist;
/**
 *
 *
 * @param {number} input
 * @returns
 */
const F_FormatCurrency = (input) => {
    var formatter = new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
    });
    return formatter.format(input);
};
exports.F_FormatCurrency = F_FormatCurrency;
/**
 * The function to format number
 * @param {number} value
 * @returns
 */
const FormatNumbers = (value) => {
    const result = String(value).replace(/(.)(?=(\d{3})+$)/g, '$1,');
    return result;
};
exports.FormatNumbers = FormatNumbers;
/**
 * Get the value btoa from Shopify (Graphql_api_id)
 * @param {string} _gid (Graphql_api_id)
 * @returns
 */
const F_GetBtoaFromShopify = (_gid) => {
    // Not working on NodeJS but working on JS
    // const variant_id = btoa(`gid://shopify/ProductVariant/40133929205914`);
    const result = Buffer.from(_gid).toString('base64');
    return result;
};
exports.F_GetBtoaFromShopify = F_GetBtoaFromShopify;
/**
 *
 * Generates a UUID based
 * @method generateUId
 * @return {string} uuid
 */
const F_CreateGUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.F_CreateGUID = F_CreateGUID;
/**
 * Convert base64 Image to Buffer and buffer to stream
 * @param {*} base64Image
 * @returns {*} return {
 *        contentType: mimeType,
 *        stream: stream,
 *        streamLength: buffer.length
 *    }
 */
const F_ConvertBase64ImageToStream = (base64Image) => {
    try {
        if (base64Image !== '') {
            // /^data:image\/(png|jpg);base64,/
            // 'data:image/bmp;base64,'
            // Get Mime type use this one
            let mimeType = base64Image.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
            // // Get only type of it like (png, jpg) etc
            // let mimeType2 = base64Image.match(/[^:/]\w+(?=;|,)/)[0];
            const base64Data = base64Image.replace(/^data:image\/(png|jpg|bmp);base64,/, '');
            // Convert base64 to buffer => <Buffer ff d8 ff db 00 43 00 ... more bytes>
            const buffer = Buffer.from(base64Data, 'base64');
            // Convert buffer to stream
            let stream = exports.F_ConvertBufferToStream(buffer);
            // * @param {*} contentType
            // * @param {*} stream
            // * @param {*} streamLength
            return {
                contentType: mimeType,
                stream: stream,
                streamLength: buffer.length
            };
        }
        else {
            console.log('[F_ConvertBase64ImageToStream] -> base64Image is empty');
            return null;
        }
    }
    catch (error) {
        console.log('[F_ConvertBase64ImageToStream] Error', error);
        return null;
    }
};
exports.F_ConvertBase64ImageToStream = F_ConvertBase64ImageToStream;
/**
 * Convert string(json) to Buffer and buffer to stream
 * @param {*} jsonData
 * @returns {*} return {
 *        contentType: mimeType,
 *        stream: stream,
 *        streamLength: buffer.length
 *    }
 */
const F_ConvertStringToStream = (jsonData) => {
    try {
        if (jsonData !== '') {
            // Get Mime type use this one
            let mimeType = 'application/json;charset=utf-8';
            const buffer = Buffer.from(jsonData, 'utf8');
            // Convert buffer to stream
            let stream = exports.F_ConvertBufferToStream(buffer);
            // * @param {*} contentType
            // * @param {*} stream
            // * @param {*} streamLength
            return {
                contentType: mimeType,
                stream: stream,
                streamLength: buffer.length
            };
        }
        else {
            console.log('[F_ConvertStringToStream] -> jsonData is empty');
            return null;
        }
    }
    catch (error) {
        console.log('[F_ConvertStringToStream] Error', error);
        return null;
    }
};
exports.F_ConvertStringToStream = F_ConvertStringToStream;
/**
 * The Promise object represents the eventual completion (or failure) of an asynchronous operation
 * and its resulting value.
 */
const waitForOneSecond = () => {
    return new Promise(resolve => {
        resolve('Resolving!');
    });
};
exports.waitForOneSecond = waitForOneSecond;
const ModeIsDev = (env) => {
    if (env && env === 'dev') {
        Model_customer_1.Model_customer.mTableName = Constants_1.PowerApps_TableName_Dev.customer;
    }
    else {
        Model_customer_1.Model_customer.mTableName = Constants_1.PowerApps_TableName.customer;
    }
};
exports.ModeIsDev = ModeIsDev;
//#endregion
//#region FabricJS
/**
 * Loads image element from given url and passes it to a callback
 * @param {string} url URL representing an image
 * @returns
 */
const ConvertImageHTMLToFabric = (url) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const fabric = require('fabric').fabric;
        fabric.util.loadImage(url, function (img) {
            // const img = await loadImage(url);
            const oImg = new fabric.Image(img);
            resolve(oImg);
        });
        // resolve(null);
    }));
};
exports.ConvertImageHTMLToFabric = ConvertImageHTMLToFabric;
/**
 * Function loadFromJSON in Fabric.js
 * @param {*} canvas
 * @param {*} json
 * @returns
 */
const loadFromJSON = (canvas, json) => {
    return new Promise((resolve, reject) => {
        // https://stackoverflow.com/questions/44745663/fabricjs-json-error-when-it-going-to-loadfromdatalessjson
        canvas.loadFromJSON(json, function () {
            canvas.renderAll.bind(canvas);
            // const objs = JSON.parse(json).objects;
            // const handleRerender = async () => {
            //     for (const item of objs) {
            //         const handleRerenderForIitem = waitForOneSecond().then(async (obj: any) => {
            //             if (item.type === 'image') {
            //             } else if (item.customContrlType === 'MetaControl') {
            //             } else if (item.type === 'text') {
            //             }
            //         });
            //         await handleRerenderForIitem;
            //     }
            //     canvas.renderAll();
            //     resolve(canvas);
            // };
            // handleRerender();
            // canvas.renderAll();
            resolve(canvas);
        }, function (o, object) {
        });
    });
};
exports.loadFromJSON = loadFromJSON;
/**
 * Function enlivenObjects in Fabric.js
 * Creates corresponding fabric instances from their object representations
 * @param {*} canvas
 * @param {*} objects
 * @returns
 */
const enlivenObjects = (canvas, objects) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const fabric = require('fabric').fabric;
        // EnlivenObjects([array of json objects], [callback])
        fabric.util.enlivenObjects(objects, (objs) => {
            objs.forEach(function (item) {
                return __awaiter(this, void 0, void 0, function* () {
                    item.dirty = true;
                    canvas.add(item);
                });
            });
            // Make sure to call once we're ready!
            canvas.renderAll();
            resolve(canvas);
        }, '');
        // resolve(null);
    });
});
exports.enlivenObjects = enlivenObjects;
/**
 * Update properties for object from JSON
 * @param {*} jsonCanvas
 */
const UpdatePropertyForObjects = (jsonCanvas) => {
    return new Promise((resolve, reject) => {
        jsonCanvas.objects.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            if (item.type === 'text') {
                if (item.fontFamily === 'Noto Sans JP') {
                    if (item.fontWeight !== 'bold') {
                        item.fontFamily = 'Noto Sans JP Medium';
                    }
                }
                else if (item.fontFamily === 'Kiwi maru') {
                    if (item.fontWeight !== 'bold') {
                        item.fontFamily = 'Kiwi maru Medium';
                    }
                }
                else if (item.fontFamily === 'Oswald') {
                    if (item.fontWeight !== 'bold') {
                        item.fontFamily = 'Oswald Medium';
                    }
                }
                else if (item.fontFamily === 'Poppins') {
                    if (item.fontWeight !== 'bold') {
                        item.fontFamily = 'Poppins Medium';
                    }
                }
                else if (item.fontFamily === 'Quicksand') {
                    if (item.fontWeight !== 'bold') {
                        item.fontFamily = 'Quicksand SemiBold';
                    }
                }
                else if (item.fontFamily === 'Teko') {
                    if (item.fontWeight === 'bold') {
                        item.fontFamily = 'Teko Medium';
                    }
                }
            }
            else if ((item.customContrlType === 'MetaControl' && item.name !== 'BorderName')
                || item.customContrlType === 'SVG_Like_Image') {
                item.visible = false;
            }
            else if (item.customContrlType === 'Icon') {
                if (item.src.includes('data:image/gif')) {
                    // item.visible = false;
                    console.log('__data:image/gif___');
                    // // const imageHTMLObj = await loadImage(item.src);
                    // // const imageFabric: any = new fabric.Image(imageHTMLObj);
                    // const imgGif:any = await ConvertImageHTMLToFabric(item.src);
                    // imgGif.set({
                    //     angle: item.angle,
                    //     selectable: false,
                    //     evented: false,
                    //     scaleX: item.scaleX,
                    //     scaleY: item.scaleY,
                    //     left: item.left,
                    //     top: item.top,
                    //     visible: true,
                    //     customContrlType: item.customContrlType,
                    //     width: item.width,
                    //     height: item.height,
                    //     src: item.src
                    //     // src: imageHTMLObj.currentSrc,
                    //     // originalSrc: imageHTMLObj.currentSrc,
                    // });
                    // jsonCanvas.objects.push(imgGif);
                }
            }
        }));
        resolve(jsonCanvas.objects);
    });
};
exports.UpdatePropertyForObjects = UpdatePropertyForObjects;
/**
 * Convert Image HTML to Fabric default
 * @param {string} base64Image
 * @returns
 */
const ConvertImageHTMLToFabricDefault = (base64Image) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const fabric = require('fabric').fabric;
        fabric.util.loadImage(base64Image, function (img) {
            // const img = await loadImage(base64Image);
            let newImageFabric = new fabric.Image(img);
            newImageFabric.set({
                angle: 0,
                padding: 0,
                cornersize: 0,
                selectable: false,
                evented: false,
                scaleX: 1,
                scaleY: 1,
                originalSrc: base64Image,
                left: 0,
                top: 0,
                visible: true,
                hoverCursor: 'default',
                name: "object_default" + exports.F_CreateGUID(),
                customContrlType: 'Image',
                imageFitType: '3',
                customFileName: 'fileName',
                note: '',
                scaleX_BK: 1,
                scaleY_BK: 1,
                scaleAngle_BK: 0,
                centerPoint: {
                    left: 0 + newImageFabric.width / 2,
                    top: 0 + newImageFabric.height / 2,
                    scaleX: 1,
                    scaleY: 1,
                },
            });
            resolve(newImageFabric);
        });
        // resolve(null);
    }));
};
exports.ConvertImageHTMLToFabricDefault = ConvertImageHTMLToFabricDefault;
/**
 * Convert SVG string to Fabric
 * @param {*} svgStr
 * @param {string} name
 * @param {string} text
 * @param {boolean} isReadOnly
 * @param {string} customContrlType
 * @returns
 */
const ConvertSvgStringToFabric = (svgStr, name, text, isReadOnly, customContrlType) => {
    return new Promise((resolve, reject) => {
        const group = [];
        const fabric = require('fabric').fabric;
        fabric.loadSVGFromString(svgStr, function (objects, options) {
            return __awaiter(this, void 0, void 0, function* () {
                var loadedObjects = new fabric.Group(group);
                loadedObjects.set({
                    // objectCaching: false,
                    dirty: true,
                    left: 0,
                    top: 0,
                    selectable: false,
                    evented: false,
                    scaleX: 1,
                    scaleY: 1,
                    indexImg: 0,
                    strokeWidth: 1,
                    text: text,
                    name: name,
                    customContrlType: customContrlType,
                    visible: true,
                    scaleX_BK: 1,
                    scaleY_BK: 1,
                    scaleAngle_BK: 0,
                    svgStr: svgStr,
                    centerPoint: {
                        left: 0 + loadedObjects.width / 2,
                        top: 0 + loadedObjects.height / 2,
                        scaleX: 1,
                        scaleY: 1,
                    },
                });
                resolve(loadedObjects);
            });
        }, function (item, object) {
            group.push(object);
        });
        // resolve(null);
    });
};
exports.ConvertSvgStringToFabric = ConvertSvgStringToFabric;
/**
 * Convert Image HTML to Fabric (version 2)
 * @param {*} imageHTMLObj
 * @param {string} fileName
 * @param {string} name
 * @param {number} top
 * @param {number} left
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {string} imageFitType
 * @param {string} customContrlType
 * @param {string} note
 * @param {boolean} isReadOnly
 * @param {boolean} [visible=true]
 * @returns
 */
const ConvertImageHTMLToFabric_02 = (imageHTMLObj, fileName, name, top, left, scaleX, scaleY, imageFitType, customContrlType, note, isReadOnly, visible = true) => {
    const fabric = require('fabric').fabric;
    const imageFabric = new fabric.Image(imageHTMLObj);
    imageFabric.set({
        // objectCaching: false,
        id: exports.GetCurrentDateTime(),
        angle: 0,
        padding: 0,
        cornersize: 0,
        // selectable: isReadOnly ? false : true,
        // evented: isReadOnly ? false : true,
        selectable: false,
        evented: false,
        scaleX: scaleX,
        scaleY: scaleY,
        originalSrc: imageHTMLObj.currentSrc,
        left: left,
        top: top,
        visible: visible,
        hoverCursor: 'default',
        name: name,
        customContrlType: customContrlType,
        imageFitType: imageFitType,
        customFileName: fileName,
        note: note,
        scaleX_BK: scaleX,
        scaleY_BK: scaleY,
        scaleAngle_BK: 0,
        centerPoint: {
            left: left + (imageFabric.width / 2),
            top: top + (imageFabric.height / 2),
            scaleX: scaleX,
            scaleY: scaleY,
        },
    });
    return imageFabric;
};
/**
 * Set readonly Fabric of Object
 * @param {*} fabricObj
 * @param {boolean} isReadOnly
 */
const F_SetReadonlyFabricObject = (fabricObj, isReadOnly) => {
    fabricObj.set({
        selectable: isReadOnly ? false : true,
        evented: isReadOnly ? false : true,
    });
};
exports.F_SetReadonlyFabricObject = F_SetReadonlyFabricObject;
/**
 * Convert Base64 to Image HTML(Version 2)
 * @param {string} url
 * @returns
 */
const ConvertBase64ToImageHTML_02 = (url) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const fabric = require('fabric').fabric;
        fabric.util.loadImage(url, function (img) {
            resolve(img);
        });
    }));
};
exports.ConvertBase64ToImageHTML_02 = ConvertBase64ToImageHTML_02;
/**
 * Register font for Canvas
 */
const RegisterFontOnCanvas = () => {
    //#region Register Font on Canvas
    // Custom fonts in Fabric on Node, In Fabric on Node (server-side) we can utilize the node-canvas Font API
    // Utility methods 
    //   ➝ To use a font file that is not installed as a system font, use registerFont() to register the font with Canvas. 
    //      This must be done before the Canvas is created.
    // Ref to: https://github.com/Automattic/node-canvas#registerfont
    const { registerFont } = require('canvas');
    const fontFolder = '/assets/Fonts/fixtures';
    //#region Japan/English font
    registerFont(__dirname + fontFolder + '/DelaGothicOne-Regular.ttf', { family: 'Dela Gothic One' });
    registerFont(__dirname + fontFolder + '/TrainOne-Regular.ttf', { family: 'Train One' });
    // :wght@700
    registerFont(__dirname + fontFolder + '/KaiseiDecol-Bold.ttf', { family: 'Kaisei Decol', weight: 'bold', style: 'normal' });
    //#region Font [Noto Sans JP]
    // :wght@500 - 
    // Pango-WARNING: ➝ Render is OK
    // - couldn't load font "Noto Sans JP Medium Not-Rotated 400px", falling back to "Sans Medium Not-Rotated 400px", expect ugly output.
    // - couldn't load font "Noto Sans JP Medium 400px", falling back to "Sans Medium 400px", expect ugly output.
    // - couldn't load font "Noto Sans JP Medium Not-Rotated 72px", falling back to "Sans Medium Not-Rotated 72px", expect ugly output.
    // The JSON sent down must have the correct font name ➝ *\"fontFamily\":\"Noto Sans JP Medium\"*
    registerFont(__dirname + fontFolder + '/NotoSansJP-Medium.otf', { family: 'Noto Sans JP' });
    registerFont(__dirname + fontFolder + '/NotoSansJP-Bold.otf', { family: 'Noto Sans JP', weight: 'bold' });
    //#endregion
    registerFont(__dirname + fontFolder + '/RampartOne-Regular.ttf', { family: 'Rampart One' });
    //#region Font [Kiwi Maru]
    // :wght@500
    // Pango-WARNING: ➝ Render is OK
    // - couldn't load font "Kiwi Maru Medium Not-Rotated 400px", falling back to "Sans Medium Not-Rotated 400px", expect ugly output.
    // - couldn't load font "Kiwi Maru Medium 400px", falling back to "Sans Medium 400px", expect ugly output.
    // - couldn't load font "Kiwi Maru Medium Not-Rotated 72px", falling back to "Sans Medium Not-Rotated 72px", expect ugly output.
    // The JSON sent down must have the correct font name ➝ *\"fontFamily\":\"Kiwi maru Medium\"*
    registerFont(__dirname + fontFolder + '/KiwiMaru-Medium.ttf', { family: 'Kiwi maru' });
    //#endregion
    //#region Render is OK
    registerFont(__dirname + fontFolder + '/DotGothic16-Regular.ttf', { family: 'DotGothic16' });
    registerFont(__dirname + fontFolder + '/ZenOldMincho-Regular.ttf', { family: 'Zen Old Mincho', weight: 'regular' });
    registerFont(__dirname + fontFolder + '/ZenOldMincho-Bold.ttf', { family: 'Zen Old Mincho', weight: 'bold' });
    registerFont(__dirname + fontFolder + '/ReggaeOne-Regular.ttf', { family: 'Reggae One' });
    //#endregion
    //#region Render is OK
    registerFont(__dirname + fontFolder + '/PottaOne-Regular.ttf', { family: 'Potta One' });
    registerFont(__dirname + fontFolder + '/Stick-Regular.ttf', { family: 'Stick' });
    registerFont(__dirname + fontFolder + '/YujiBoku-Regular.ttf', { family: 'Yuji Boku' });
    //#endregion
    //#region Render is OK
    registerFont(__dirname + fontFolder + '/RocknRollOne-Regular.ttf', { family: 'RocknRoll One' });
    registerFont(__dirname + fontFolder + '/ZenMaruGothic-Regular.ttf', { family: 'Zen Maru Gothic', weight: 'regular' });
    registerFont(__dirname + fontFolder + '/ZenMaruGothic-Bold.ttf', { family: 'Zen Maru Gothic', weight: 'bold' });
    registerFont(__dirname + fontFolder + '/MochiyPopOne-Regular.ttf', { family: 'Mochiy Pop One' });
    //#endregion
    //#region Render is OK
    registerFont(__dirname + fontFolder + '/ZenAntique-Regular.ttf', { family: 'Zen Antique' });
    registerFont(__dirname + fontFolder + '/YuseiMagic-Regular.ttf', { family: 'Yusei Magic' });
    registerFont(__dirname + fontFolder + '/HachiMaruPop-Regular.ttf', { family: 'Hachi Maru Pop' });
    //#endregion
    //#endregion
    //#region English font
    // :wght@500
    // Pango-WARNING: 
    // - couldn't load font "Oswald Medium Not-Rotated 400px", falling back to "Sans Medium Not-Rotated 400px", expect ugly output.
    // - couldn't load font "Oswald Medium 400px", falling back to "Sans Medium 400px", expect ugly output.
    // - couldn't load font "Oswald Medium Not-Rotated 72px", falling back to "Sans Medium Not-Rotated 72px", expect ugly output.
    // The JSON sent down must have the correct font name ➝ *\"fontFamily\":\"Oswald Medium\"*
    registerFont(__dirname + fontFolder + '/Oswald-Medium.ttf', { family: 'Oswald' });
    registerFont(__dirname + fontFolder + '/Oswald-Bold.ttf', { family: 'Oswald', weight: 'bold' });
    // :wght@500
    // Pango-WARNING: 
    // - couldn't load font "Poppins Medium Not-Rotated 400px", falling back to "Sans Medium Not-Rotated 400px", expect ugly output.
    // - couldn't load font "Poppins Medium 400px", falling back to "Sans Medium 400px", expect ugly output.
    // - couldn't load font "Poppins Medium Not-Rotated 72px", falling back to "Sans Medium Not-Rotated 72px", expect ugly output.
    // The JSON sent down must have the correct font name ➝ *\"fontFamily\":\"Poppins Medium\"*
    registerFont(__dirname + fontFolder + '/Poppins-Medium.ttf', { family: 'Poppins' });
    registerFont(__dirname + fontFolder + '/Poppins-Bold.ttf', { family: 'Poppins', weight: 'bold' });
    // :wght@600
    // Pango-WARNING: 
    // - couldn't load font "Quicksand Semi-Bold Not-Rotated 400px", falling back to "Sans Semi-Bold Not-Rotated 400px", expect ugly output.
    // - couldn't load font "Quicksand Semi-Bold 400px", falling back to "Sans Semi-Bold 400px", expect ugly output.
    // - couldn't load font "Quicksand Semi-Bold Not-Rotated 72px", falling back to "Sans Semi-Bold Not-Rotated 72px", expect ugly output.
    // The JSON sent down must have the correct font name ➝ *\"fontFamily\":\"Quicksand SemiBold\"*
    registerFont(__dirname + fontFolder + '/Quicksand-SemiBold.ttf', { family: 'Quicksand' });
    registerFont(__dirname + fontFolder + '/Quicksand-Bold.ttf', { family: 'Quicksand', weight: 'bold' });
    //#region Render is OK
    registerFont(__dirname + fontFolder + '/Courgette-Regular.ttf', { family: 'Courgette' });
    registerFont(__dirname + fontFolder + '/Righteous-Regular.ttf', { family: 'Righteous' });
    registerFont(__dirname + fontFolder + '/BungeeInline-Regular.ttf', { family: 'Bungee Inline' });
    //#endregion
    //#region Render is OK
    registerFont(__dirname + fontFolder + '/Alice-Regular.ttf', { family: 'Alice' });
    registerFont(__dirname + fontFolder + '/SplineSansMono-Regular.ttf', { family: 'Spline Sans Mono', weight: 'regular' });
    registerFont(__dirname + fontFolder + '/SplineSansMono-Bold.ttf', { family: 'Spline Sans Mono', weight: 'bold' });
    registerFont(__dirname + fontFolder + '/Anton-Regular.ttf', { family: 'Anton' });
    //#endregion
    //#region Render is OK
    registerFont(__dirname + fontFolder + '/Lobster-Regular.ttf', { family: 'Lobster' });
    registerFont(__dirname + fontFolder + '/DancingScript-Regular.ttf', { family: 'Dancing Script', weight: 'regular' });
    registerFont(__dirname + fontFolder + '/DancingScript-Bold.ttf', { family: 'Dancing Script', weight: 'bold' });
    registerFont(__dirname + fontFolder + '/Pacifico-Regular.ttf', { family: 'Pacifico' });
    //#endregion
    //#region Render is OK
    registerFont(__dirname + fontFolder + '/Teko-Regular.ttf', { family: 'Teko', weight: 'regular' });
    registerFont(__dirname + fontFolder + '/Teko-Medium.ttf', { family: 'Teko', weight: 'bold' });
    registerFont(__dirname + fontFolder + '/AlfaSlabOne-Regular.ttf', { family: 'Alfa Slab One' });
    registerFont(__dirname + fontFolder + '/PressStart2P-Regular.ttf', { family: '"Press Start 2P", cursive' });
    //#endregion
    //#region Render is OK
    registerFont(__dirname + fontFolder + '/Creepster-Regular.ttf', { family: 'Creepster' });
    registerFont(__dirname + fontFolder + '/Monoton-Regular.ttf', { family: 'Monoton' });
    registerFont(__dirname + fontFolder + '/RubikWetPaint-Regular.ttf', { family: 'Rubik Wet Paint' });
    //#endregion
    //#endregion
    //#endregion
};
exports.RegisterFontOnCanvas = RegisterFontOnCanvas;
//#endregion
//#region Commont for Output Pattern
/**
 * Check Product is Polo
 * @param {string} productId
 * @returns
 */
const ProductIsPolo = (productId) => {
    return productId === Constants_1.CONST_PRODUCT_ID.POLO ? true : false;
};
exports.ProductIsPolo = ProductIsPolo;
/**
 * Read file from URL
 * @param {string} filename
 * @returns
 */
const ReadFileFromUrl = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    let rs = '';
    const fs = require("fs");
    rs = yield fs.promises.readFile(filename, 'utf8');
    return rs;
});
exports.ReadFileFromUrl = ReadFileFromUrl;
/**
 * Get current DateTime
 * @returns
 */
const GetCurrentDateTime = () => {
    const day = new Date();
    const date = day.getFullYear() + String(day.getMonth() + 1).padStart(2, '0') + String(day.getDate()).padStart(2, '0');
    const time = String(day.getHours()).padStart(2, '0') + String(day.getMinutes()).padStart(2, '0') + String(day.getSeconds()).padStart(2, '0');
    return date + time;
};
exports.GetCurrentDateTime = GetCurrentDateTime;
/**
 * Set Size for Canvas
 * @param {*} canvas
 * @param {number} widthCanvas
 * @param {number} heightCanvas
 */
const SetSizeCanvas = (canvas, widthCanvas, heightCanvas) => {
    canvas.backgroundColor = Constants_1.CONST_ColorTransparent;
    canvas.setWidth(widthCanvas);
    canvas.setHeight(heightCanvas);
    canvas.renderOnAddRemove = false;
};
exports.SetSizeCanvas = SetSizeCanvas;
/**
 * Render ruler on Output Pattern
 * @param {string} productId
 * @param {*} canvas
 */
const RenderRulerOnOutputPattern = (productId, canvas) => {
    const isPolo = productId === Constants_1.CONST_PRODUCT_ID.POLO ? true : false;
    const isShirts = productId === Constants_1.CONST_PRODUCT_ID.SHIRTS ? true : false;
    const isHoodie = productId === Constants_1.CONST_PRODUCT_ID.HOODIE ? true : false;
    const widthLine = 50;
    const fontSizeText = 45;
    const topLineBot = canvas.height - (!isHoodie ? 70 : 85);
    const leftLineBot = isPolo ? 95 : (isShirts ? 100 : 122);
    const topLineLeft = canvas.height - (!isHoodie ? 90 : 105.5);
    const leftLineLeft = !isHoodie ? 29 : 52;
    const distanceBottom = isPolo ? 124 : (isShirts ? 128.5 : 135);
    const distanceLeft = isPolo ? 61.8 : (isShirts ? 64.5 : 67.5);
    let numBot = 0;
    let numLeft = 0;
    let count = 0;
    const fabric = require('fabric').fabric;
    //add coordinate angle
    const zeroBot = new fabric.Text("0", {
        fontSize: fontSizeText,
    });
    zeroBot.set({
        top: topLineBot + ((widthLine / 2) - ((zeroBot.height || 0) / 2)),
        left: leftLineBot - ((zeroBot.width || 0) / 2),
    });
    const zeroLeft = new fabric.Text("0", {
        fontSize: fontSizeText,
        angle: 270,
    });
    zeroLeft.set({
        top: topLineLeft + ((zeroLeft.width || 0) / 2),
        left: leftLineLeft + ((widthLine / 2) - ((zeroLeft.height || 0) / 2)),
    });
    canvas.add(zeroBot);
    canvas.add(zeroLeft);
    //render ruler
    for (let i = (leftLineBot + distanceBottom); i < canvas.width; i += distanceBottom) {
        //declare bottom line
        const botLine = new fabric.Rect({
            fill: "black",
            height: widthLine,
            width: 3,
        });
        botLine.set({
            left: i - ((botLine.width || 0) / 2),
            top: topLineBot,
        });
        //declare text
        const textNumber = new fabric.Text((numBot += 10).toString(), {
            fontSize: fontSizeText,
        });
        textNumber.set({
            top: (botLine.top || 0) + ((botLine.height || 0) / 2) - ((textNumber.height || 0) / 2),
            left: i - ((textNumber.width || 0) / 2),
        });
        count++;
        const writeNumber = (count % 5 === 0) ? true : false;
        !writeNumber ? canvas.add(botLine) : canvas.add(textNumber);
    }
    // render ruler left
    count = 0;
    for (let i = (topLineLeft - distanceLeft); i > 0; i -= distanceLeft) {
        //declare left line
        const leftLine = new fabric.Rect({
            fill: "black",
            height: 3,
            width: widthLine,
        });
        leftLine.set({
            left: leftLineLeft,
            top: i - ((leftLine.height || 0) / 2),
        });
        //declare text
        const textNumber = new fabric.Text((numLeft += 5).toString(), {
            fontSize: fontSizeText,
            angle: 270,
        });
        textNumber.set({
            top: i + ((textNumber.width || 0) / 2),
            left: (leftLine.left || 0) + ((leftLine.width || 0) / 2) - ((textNumber.height || 0) / 2),
        });
        count++;
        const writeNumber = (count % 5 === 0) ? true : false;
        if (((textNumber.top || 0) - (textNumber.width || 0)) < 0) {
            break;
        }
        !writeNumber ? canvas.add(leftLine) : canvas.add(textNumber);
    }
};
exports.RenderRulerOnOutputPattern = RenderRulerOnOutputPattern;
/**
 * Set Fabric Full Canvas Width and Height
 * @param {*} canvas
 * @param {*} fabricObj
 */
const SetFabricFullCanvasWidthHeight = (canvas, fabricObj) => {
    let c_width = fabricObj.width;
    let c_height = fabricObj.height;
    c_width = canvas.width;
    c_height = canvas.height;
    var scaleValX = c_width / fabricObj.width;
    var scaleValY = c_height / fabricObj.height;
    fabricObj.set({
        left: canvas.width / 2 - c_width / 2,
        top: canvas.height / 2 - c_height / 2,
        scaleX: scaleValX,
        scaleY: scaleValY
    });
};
exports.SetFabricFullCanvasWidthHeight = SetFabricFullCanvasWidthHeight;
/**
 * Get Object in array by name
 * @param {any[]} array
 * @param {string} name
 * @returns
 */
const GetObjectInArrayByName = (array, name) => {
    return array.find((element) => {
        return element.name === name;
    });
};
exports.GetObjectInArrayByName = GetObjectInArrayByName;
/**
 * Convert Base64 to Image HTML
 * @param {string} base64Image
 * @returns
 */
const ConvertBase64ToImageHTML = (base64Image) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        // img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
        img.src = base64Image;
        img.onload = () => {
            resolve(img);
        };
        img.onerror = (e) => {
            reject(e);
        };
    });
};
exports.ConvertBase64ToImageHTML = ConvertBase64ToImageHTML;
/**
 * Get list URL Item Crop Model
 * @param {string} productId
 * @param {string} styleCode
 * @param {string} environment
 * @returns
 */
const GetListUrlItemCropModel = (productId, styleCode, environment) => {
    const arrItemsPatternSVG = [];
    const isPolo = productId === Constants_1.CONST_PRODUCT_ID.POLO ? true : false;
    const isShirts = productId === Constants_1.CONST_PRODUCT_ID.SHIRTS ? true : false;
    const isMen = styleCode === Constants_1.CONST_OptionKeyStyle_key.C1 ? true : false;
    const isLadies = styleCode === Constants_1.CONST_OptionKeyStyle_key.C2 ? true : false;
    const arrNameItems = isPolo ? Constants_1.NAME_FILE_SVG.POLO : (isShirts ? Constants_1.NAME_FILE_SVG.SHIRTS : Constants_1.NAME_FILE_SVG.HOODIE);
    const nameProduct = isPolo ? "Polo" : (isShirts ? "Shirts" : "Hoodie");
    const nameStyle = isMen ? "Men" : (isLadies ? "Ladies" : "Kid");
    const folderUrl = __dirname + `/assets/SvgItemModel${environment}/${nameProduct}${nameStyle}/`;
    arrNameItems.forEach((item) => arrItemsPatternSVG.push(`${folderUrl}${item}.svg`));
    return arrItemsPatternSVG;
};
exports.GetListUrlItemCropModel = GetListUrlItemCropModel;
/**
 * Get array URL Item SVG Output
 * @param {string} productId
 * @param {string} styleCode
 * @param {string} size
 * @param {string} environment: Production|Development
 * @returns
 */
const GetArrayUrlItemSvgOutput = (productId, styleCode, size, environment) => {
    const arrItemsPattern = [];
    const isPolo = productId === Constants_1.CONST_PRODUCT_ID.POLO ? true : false;
    const isShirts = productId === Constants_1.CONST_PRODUCT_ID.SHIRTS ? true : false;
    const isMen = styleCode === Constants_1.CONST_OptionKeyStyle_key.C1 ? true : false;
    const isLadies = styleCode === Constants_1.CONST_OptionKeyStyle_key.C2 ? true : false;
    const arrNameItems = isPolo ? Constants_1.NAME_FILE_SVG.POLO : (isShirts ? Constants_1.NAME_FILE_SVG.SHIRTS : Constants_1.NAME_FILE_SVG.HOODIE);
    const nameProduct = isPolo ? "Polo" : (isShirts ? "Shirts" : "Hoodie");
    const nameStyle = isMen ? "Men" : (isLadies ? "Ladies" : "Kid");
    const folderUrl = __dirname + `/assets/SvgCropOutput${environment}/${nameProduct}/${nameStyle}/${size}/`;
    arrNameItems.forEach((item) => arrItemsPattern.push(`${folderUrl}${item}.svg`));
    return arrItemsPattern;
};
exports.GetArrayUrlItemSvgOutput = GetArrayUrlItemSvgOutput;
/**
 * Get Image bound without transparent pixel
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} wCanvas
 * @param {number} hCanvas
 * @returns
 */
const GetImageBoundWithoutTransparentPixel = (ctx, wCanvas, hCanvas) => {
    let rs = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
    let imgPixels = ctx.getImageData(0, 0, wCanvas, hCanvas);
    let x = 0;
    let y = 0;
    let i = 0;
    for (y = 0; y < imgPixels.height; y++) {
        for (x = 0; x < imgPixels.width; x++) {
            i = y * 4 * imgPixels.width + x * 4;
            if (imgPixels.data[i + 3] != 0) {
                rs.top = y;
                y = imgPixels.height;
                x = imgPixels.width;
                break;
            }
        }
    }
    for (y = imgPixels.height - 1; y >= 0; y--) {
        for (x = 0; x < imgPixels.width; x++) {
            i = y * 4 * imgPixels.width + x * 4;
            if (imgPixels.data[i + 3] != 0) {
                rs.bottom = y;
                y = -1;
                x = imgPixels.width;
                break;
            }
        }
    }
    for (x = 0; x < imgPixels.width; x++) {
        for (y = 0; y < imgPixels.height; y++) {
            i = y * 4 * imgPixels.width + x * 4;
            if (imgPixels.data[i + 3] != 0) {
                rs.left = x;
                x = imgPixels.width;
                y = imgPixels.height;
                break;
            }
        }
    }
    for (x = imgPixels.width - 1; x >= 0; x--) {
        for (y = 0; y < imgPixels.height; y++) {
            i = y * 4 * imgPixels.width + x * 4;
            if (imgPixels.data[i + 3] != 0) {
                rs.right = x;
                x = -1;
                y = imgPixels.height;
                break;
            }
        }
    }
    return rs;
};
/**
 * Crop Image without transparent pixel
 * @param {*} canvas
 * @param {*} imageFabric
 * @param {number} [cropDelta=0]
 * @param {string} [backgroundColor='']
 * @returns
 */
const CropImageWithoutTransparentPixel = (canvas, imageFabric, cropDelta = 0, backgroundColor = '') => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (imageFabric !== null) {
            let arrBKVisible = [];
            let objs = canvas.getObjects();
            for (let i = 0; i < objs.length; i++) {
                if (objs[i].name != imageFabric.name) {
                    arrBKVisible.push({
                        name: objs[i].name,
                        visible: objs[i].visible,
                    });
                    objs[i].set({
                        visible: false,
                    });
                }
            }
            if (backgroundColor !== '') {
                canvas.backgroundColor = backgroundColor;
                canvas.renderAll();
            }
            let imageSrc = canvas.toDataURL();
            for (let i = 0; i < objs.length; i++) {
                if (objs[i].name != imageFabric.name) {
                    objs[i].set({
                        visible: exports.GetObjectInArrayByName(arrBKVisible, objs[i].name).visible,
                    });
                }
            }
            const { loadImage } = require('canvas');
            const resultTran = yield CropTransparentPixel(imageSrc, cropDelta);
            const imageHTMLObj = yield loadImage(resultTran.base64);
            resolve({
                imageHTMLObj: imageHTMLObj,
                rec: resultTran.rec
            });
        }
    }));
};
/**
 * Crop transparent pixel
 * @param {*} imageSrc
 * @param {number} [cropDelta=0]
 * @returns
 */
const CropTransparentPixel = (imageSrc, cropDelta = 0) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { Image } = require('canvas');
        let imageObj = new Image();
        imageObj.onload = () => {
            const c_width = imageObj.width;
            const c_height = imageObj.height;
            const { createCanvas } = require('canvas');
            //#region
            let tempCanvas = createCanvas(c_width, c_height);
            // // tempCanvas.style.imageRendering = "pixelated";
            const context = tempCanvas.getContext('2d');
            // context.imageSmoothingEnabled = false;
            context.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            context.drawImage(imageObj, 0, 0, c_width, c_height);
            /************************************************************/
            /*                    GetImageBoundWithoutTransparentPixel START
            /************************************************************/
            let rec0 = GetImageBoundWithoutTransparentPixel(context, tempCanvas.width, tempCanvas.height);
            let rec = {
                left: rec0.left + cropDelta,
                top: rec0.top + cropDelta,
                right: rec0.right - cropDelta,
                bottom: rec0.bottom - cropDelta,
            };
            let tempCanvas2 = createCanvas((rec.right - rec.left + 1), (rec.bottom - rec.top + 1));
            // // tempCanvas2.style.imageRendering = "pixelated";
            tempCanvas2.width = (rec.right - rec.left + 1);
            tempCanvas2.height = (rec.bottom - rec.top + 1);
            const context2 = tempCanvas2.getContext('2d');
            // context2.imageSmoothingEnabled = false;
            context2.clearRect(0, 0, tempCanvas2.width, tempCanvas2.height);
            context2.drawImage(imageObj, rec.left, rec.top, tempCanvas2.width, tempCanvas2.height, 0, 0, tempCanvas2.width, tempCanvas2.height);
            /************************************************************/
            /*                    GetImageBoundWithoutTransparentPixel END
            /************************************************************/
            resolve({ base64: tempCanvas2.toDataURL(), rec: rec });
            //#endregion
        };
        imageObj.src = imageSrc;
    }));
};
/**
 * Add Image to Canvas by FitType
 * @param {*} borderObj
 * @param {*} canvas
 * @param {*} imageHTMLObj
 * @param {string} fileName
 * @param {string} imageFitType
 * @param {string} customContrlType
 * @param {string} [note='']
 * @returns
 */
const AddImageToCanvasByFitType = (borderObj, canvas, imageHTMLObj, fileName, imageFitType, customContrlType, note = '') => __awaiter(void 0, void 0, void 0, function* () {
    switch (imageFitType) {
        // case '1':
        //     return await AddImageFitTypeFillOrCenter(props, canvas, imageHTMLObj, fileName, imageFitType, customContrlType, note);
        case '3':
            return yield AddImageFitTypeFillOrCenter(borderObj, canvas, imageHTMLObj, fileName, imageFitType, customContrlType, note);
        // case '2':
        //     return await AddImageFitTypeRepeat(props, canvas, imageHTMLObj, fileName, imageFitType, customContrlType, note);
        // case '5':
        //     return await AddImageFitTypeRandomRepeat(props, canvas, imageHTMLObj, fileName, imageFitType, customContrlType, note);
        default:
            return;
    }
});
/**
 * Add Image FitType fill or center
 * @param {*} borderObj
 * @param {*} canvas
 * @param {*} imageHTMLObj
 * @param {string} fileName
 * @param {string} imageFitType
 * @param {string} customContrlType
 * @param {string} [note='']
 * @returns
 */
const AddImageFitTypeFillOrCenter = (borderObj, canvas, imageHTMLObj, fileName, imageFitType, customContrlType, note = '') => __awaiter(void 0, void 0, void 0, function* () {
    let rWidth = borderObj.mRecW;
    let rHeight = borderObj.mRecH;
    const scaleX = rWidth / imageHTMLObj.width;
    const scaleY = rHeight / imageHTMLObj.height;
    if (imageFitType === '3') {
        rWidth = imageHTMLObj.width;
        rHeight = imageHTMLObj.height;
        if (rWidth > borderObj.mRecW) {
            rWidth = borderObj.mRecW;
            rHeight = imageHTMLObj.height * (borderObj.mRecW / imageHTMLObj.width);
            if (rHeight > borderObj.mRecH) {
                rHeight = borderObj.mRecH;
                rWidth = imageHTMLObj.width * (borderObj.mRecH / imageHTMLObj.height);
            }
        }
    }
    const top = borderObj.mRecH / 2 - rHeight / 2 + borderObj.mRecY;
    const left = borderObj.mRecW / 2 - rWidth / 2 + borderObj.mRecX;
    const imageFabric = yield ConvertImageHTMLToFabric_02(imageHTMLObj, fileName, /*name*/ '8888', top, left, scaleX, scaleY, '3', customContrlType, note, false);
    canvas.add(imageFabric);
    return imageFabric;
});
//#endregion
//#region Handle Output Pattern
/**
 * Crop item output pattern
 * @param {*} canvas2
 * @param {*} imgFabric
 * @param {*} imgFabricRight
 * @param {string} productId
 * @param {string} styleCode
 * @param {string} environment
 * @returns
 */
const CropItemOutputPattern = (canvas2, imgFabric, imgFabricRight, productId, styleCode, environment) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let style = styleCode;
        let arrItemsPattern = [];
        //#region Get array name of file SVG
        const arrItemsPatternSVG = exports.GetListUrlItemCropModel(productId, styleCode, environment);
        //#endregion
        // 2022.12.15
        if (environment === '') {
            exports.F_SetCanvasWidthHeightByProductStyle(canvas2, productId, style);
        }
        else if (environment === 'dev') {
            exports.F_SetCanvasWidthHeightByProductStyle_Dev(canvas2, productId, style);
        }
        exports.SetFabricFullCanvasWidthHeight(canvas2, imgFabric);
        if (productId === Constants_1.CONST_PRODUCT_ID.SHIRTS) {
            exports.SetFabricFullCanvasWidthHeight(canvas2, imgFabricRight);
        }
        const canvas0 = {
            width: canvas2.width,
            height: canvas2.height
        };
        for (let strURI of arrItemsPatternSVG) {
            const name = strURI.substring(strURI.lastIndexOf("/") + 1, strURI.lastIndexOf("."));
            console.log('    __(name[svg])___', name);
            canvas2.clear();
            const svgStringVal = yield exports.ReadFileFromUrl(strURI);
            let imgFabricCrop = null;
            if (productId === Constants_1.CONST_PRODUCT_ID.SHIRTS) {
                imgFabricCrop = (name === 'frontRight') ? imgFabricRight : imgFabric;
            }
            else {
                imgFabricCrop = imgFabric;
            }
            const shape = yield exports.ConvertSvgStringToFabric(svgStringVal, '', '', false, 'SVG');
            exports.SetFabricFullCanvasWidthHeight(canvas2, shape);
            let newFabricObj = yield exports.CropImageByShape(canvas0, canvas2, imgFabricCrop, shape);
            newFabricObj.set({
                customFileName: name,
            });
            // Fix 3d model hoodie horizontal
            if (productId !== Constants_1.CONST_PRODUCT_ID.HOODIE) {
                newFabricObj.rotate(90);
            }
            // newFabricObj.rotate(90);
            arrItemsPattern.push(newFabricObj);
        }
        resolve(arrItemsPattern);
    }));
};
exports.CropItemOutputPattern = CropItemOutputPattern;
/**
 * Add Shape to Canvas
 * @param {*} borderObj
 * @param {*} canvas
 * @param {string} svgStringVal
 * @param {string} shapeId
 * @returns
 */
const AddShapeToCanvas = (borderObj, canvas, svgStringVal, shapeId) => __awaiter(void 0, void 0, void 0, function* () {
    const loadedObjects = yield exports.ConvertSvgStringToFabric(svgStringVal, '999' /*OBJECT_NAME_PREFIX + mObjectNameAutoIncrease*/, shapeId, false, 'SVG');
    const cWidth = 100;
    const cHeight = 100;
    const scaleX = cWidth / loadedObjects.width;
    const scaleY = cHeight / loadedObjects.height;
    const x = borderObj.mRecX + (borderObj.mRecW / 2) - (cWidth / 2);
    const y = borderObj.mRecY + (borderObj.mRecH / 2) - (cHeight / 2);
    loadedObjects.set({
        left: x,
        top: y,
        scaleX: scaleX,
        scaleY: scaleY,
    });
    canvas.add(loadedObjects);
    return loadedObjects;
});
exports.AddShapeToCanvas = AddShapeToCanvas;
/**
 * Crop Image by Shape
 * @param {*} canvas0
 * @param {*} canvas2
 * @param {*} imageFabric
 * @param {*} shapeObj
 * @returns
 */
const CropImageByShape = (canvas0, canvas2, imageFabric, shapeObj) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const cropDelta = -1;
        if (imageFabric !== undefined && shapeObj !== undefined) {
            const fabric = require('fabric').fabric;
            canvas2.clear();
            // Image
            let imageFabric2 = fabric.util.object.clone(imageFabric);
            canvas2.add(imageFabric2);
            let hsZoom = 1 / imageFabric.scaleX;
            imageFabric2.set({
                left: imageFabric.left * hsZoom,
                top: imageFabric.top * hsZoom,
                scaleX: 1,
                scaleY: 1,
                angle: imageFabric.angle,
            });
            canvas2.setWidth(canvas0.width * hsZoom);
            canvas2.setHeight(canvas0.height * hsZoom);
            // canvas2.renderAll();
            let shapeObj2;
            let borderObj = {
                mRecW: canvas0.width,
                mRecH: canvas0.height,
                mRecX: 0,
                mRecY: 0,
            };
            // SVG
            const svgGroup = yield exports.AddShapeToCanvas(borderObj, canvas2, shapeObj.svgStr, 'shapeName');
            svgGroup.set({
                left: shapeObj.left * hsZoom,
                top: shapeObj.top * hsZoom,
                scaleX: shapeObj.scaleX * hsZoom,
                scaleY: shapeObj.scaleY * hsZoom,
                angle: shapeObj.angle,
                visible: false,
            });
            shapeObj2 = svgGroup;
            // canvas2.renderAll();
            let imageSrc2 = canvas2.toDataURL();
            shapeObj2.set({
                visible: true,
            });
            let newImageFabric = yield exports.ConvertImageHTMLToFabric(imageSrc2);
            newImageFabric.set({
                // objectCaching: false,
                angle: 0,
                padding: 0,
                cornersize: 0,
                // selectable: true,
                // evented: true,
                selectable: false,
                evented: false,
                scaleX: 1,
                scaleY: 1,
                originalSrc: imageSrc2,
                left: 0,
                top: 0,
                visible: true,
                hoverCursor: 'default',
                // name: OBJECT_NAME_PREFIX + mObjectNameAutoIncrease,
                customContrlType: 'Image',
                imageFitType: '3',
                customFileName: imageFabric.customFileName,
                note: '',
                scaleX_BK: 1,
                scaleY_BK: 1,
                scaleAngle_BK: 0,
                centerPoint: {
                    left: 0 + newImageFabric.width / 2,
                    top: 0 + newImageFabric.height / 2,
                    scaleX: 1,
                    scaleY: 1,
                },
            });
            let temp2 = shapeObj2;
            temp2._objects.map((item) => { item.fill = 'black'; });
            let left2 = temp2.left - (newImageFabric.width / 2);
            let top2 = temp2.top - (newImageFabric.height / 2);
            temp2.set({
                left: left2,
                top: top2,
            });
            newImageFabric.clipPath = temp2;
            canvas2.add(newImageFabric);
            canvas2.getObjects().map((obj) => {
                obj.setCoords();
            });
            canvas2.remove(imageFabric2);
            canvas2.remove(shapeObj2);
            // canvas2.renderAll();
            const cropWithout = yield CropImageWithoutTransparentPixel(canvas2, newImageFabric, cropDelta, Constants_1.CONST_ColorTransparent);
            const imgHTML = cropWithout.imageHTMLObj;
            const rec = cropWithout.rec;
            canvas2.clear();
            const imageFabricAdded = yield AddImageToCanvasByFitType(borderObj, canvas2, imgHTML, imageFabric.customFileName, '3', 'Image');
            imageFabricAdded.set({
                left: rec.left,
                top: rec.top,
                scaleX: 1,
                scaleY: 1,
                angle: imageFabric2.angle,
                cropedFlag: true,
            });
            imageFabricAdded.setCoords();
            // canvas2.renderAll();
            const imageFabric3 = fabric.util.object.clone(imageFabricAdded);
            // Don't use
            // const canvas1 = {
            //     width: 347,
            //     height: 347,
            // }
            // SetFabricFullCanvasOuter(canvas1, imageFabric3);
            // // F_SetReadonlyFabricObject(imageFabric3, false);
            imageFabric3.set({
                left: rec.left / hsZoom,
                top: rec.top / hsZoom,
                scaleX: 1 / hsZoom,
                scaleY: 1 / hsZoom,
                angle: imageFabric2.angle,
                customFileName: '',
            });
            resolve(imageFabric3);
        }
    }));
};
exports.CropImageByShape = CropImageByShape;
/**
 * Create Output Pattern new version
 * @param {*} canvas3
 * @param {string} product_id
 * @param {string} styleCode
 * @param {*} arrItemOutput
 * @param {*} size
 * @param {*} base64Ruler
 * @param {string} environment
 * @returns
 */
const CreateOutputPatternNewVersion = (canvas3, product_id, styleCode, arrItemOutput, size, base64Ruler, environment) => __awaiter(void 0, void 0, void 0, function* () {
    if (arrItemOutput.length <= 0) {
        return;
    }
    let base64Pattern;
    if (size === "LL") {
        base64Pattern = yield exports.CreateOutputPattern(canvas3, product_id, styleCode, arrItemOutput, size, base64Ruler, environment);
        return base64Pattern;
    }
    else {
        const infoRes = (environment === '') ? exports.GetInfoOutputPattern(product_id, styleCode, size) : exports.GetInfoOutputPattern_Dev(product_id, styleCode, size);
        const arrInfoItem = infoRes.InfoItem;
        const infoSize = infoRes.InfoSize;
        const arrItem = arrItemOutput;
        const hPattern = 2000;
        const rZoomSize = hPattern / infoSize.Height;
        const wPattern = infoSize.Width * rZoomSize;
        exports.SetSizeCanvas(canvas3, wPattern, hPattern);
        const arrUrlItem = exports.GetArrayUrlItemSvgOutput(product_id, styleCode, size, environment);
        // console.log('______(02)_GetArrayUrlItemSvgOutput__________', arrUrlItem);
        const arrNewFabric = [];
        for (let i = 0; i < arrInfoItem.length; i++) {
            canvas3.clear();
            const infoTop = arrInfoItem[i][0];
            const infoLeft = arrInfoItem[i][1];
            const infoScaleX = arrInfoItem[i][2];
            const infoScaleY = arrInfoItem[i][3];
            arrItem[i].set({
                top: infoTop,
                left: infoLeft,
                scaleX: infoScaleX,
                scaleY: infoScaleY,
                angle: product_id !== Constants_1.CONST_PRODUCT_ID.HOODIE ? 90 : 0,
            });
            canvas3.add(arrItem[i]);
            canvas3.renderAll();
            const base64ImageData = canvas3.toDataURL();
            const imageRepeat = yield exports.ConvertImageHTMLToFabricDefault(base64ImageData);
            exports.SetFabricFullCanvasWidthHeight(canvas3, imageRepeat);
            const strURI = arrUrlItem[i];
            const svgStringVal = yield exports.ReadFileFromUrl(strURI);
            // const name = strURI.substring(strURI.lastIndexOf("/") + 1, strURI.lastIndexOf("."));
            const name = arrItem[i].customFileName;
            const shape = yield exports.ConvertSvgStringToFabric(svgStringVal, '', name, false, 'SVG');
            exports.SetFabricFullCanvasWidthHeight(canvas3, shape);
            const newFabricObj = yield exports.CropItemByShape(imageRepeat, shape);
            newFabricObj.set({
                customFileName: name,
            });
            arrNewFabric.push(newFabricObj);
        }
        canvas3.clear();
        // Render ruler
        // RenderRulerOnOutputPattern(product_id, canvas3);
        // 2022.12.02
        if (base64Ruler !== '') {
            const fbRuler = yield exports.ConvertImageHTMLToFabricDefault(base64Ruler);
            canvas3.add(fbRuler);
        }
        for (const item of arrNewFabric) {
            canvas3.add(item);
        }
        base64Pattern = canvas3.toDataURL();
        return base64Pattern;
    }
});
exports.CreateOutputPatternNewVersion = CreateOutputPatternNewVersion;
/**
 * Create Output Pattern
 * @param {*} canvas3
 * @param {string} product_id
 * @param {string} style_code
 * @param {*} arrItemOutput
 * @param {*} size
 * @param {string} base64Ruler
 * @returns
 */
const CreateOutputPattern = (canvas3, product_id, style_code, arrItemOutput, size, base64Ruler, environment) => __awaiter(void 0, void 0, void 0, function* () {
    canvas3.clear();
    const productId = product_id;
    const style = style_code;
    const infoRes = (environment === '') ? exports.GetInfoOutputPattern(productId, style, size) : exports.GetInfoOutputPattern_Dev(productId, style, size);
    const arrItem = arrItemOutput;
    const arrInfoItem = infoRes.InfoItem;
    const infoSize = infoRes.InfoSize;
    //set size pattern
    let rZoomSize = 2000 / infoSize.Height;
    let setH = 2000;
    let setW = infoSize.Width * rZoomSize;
    canvas3.backgroundColor = Constants_1.CONST_ColorTransparent;
    canvas3.setWidth(setW);
    canvas3.setHeight(setH);
    canvas3.renderOnAddRemove = false;
    canvas3.renderAll();
    // RenderRulerOnOutputPattern(productId, canvas3);
    // 2022.12.02
    if (base64Ruler !== '') {
        const fbRuler = yield exports.ConvertImageHTMLToFabricDefault(base64Ruler);
        canvas3.add(fbRuler);
    }
    for (let i = 0; i < arrInfoItem.length; i++) {
        const infoTop = arrInfoItem[i][0];
        const infoLeft = arrInfoItem[i][1];
        const infoScaleX = arrInfoItem[i][2];
        const infoScaleY = arrInfoItem[i][3];
        arrItem[i].set({
            top: infoTop,
            left: infoLeft,
            scaleX: infoScaleX,
            scaleY: infoScaleY,
            angle: product_id !== Constants_1.CONST_PRODUCT_ID.HOODIE ? 90 : 0,
        });
        canvas3.add(arrItem[i]);
    }
    canvas3.renderAll();
    const base64Pattern = canvas3.toDataURL();
    return base64Pattern;
});
exports.CreateOutputPattern = CreateOutputPattern;
/**
 * Crop Item by Shape
 * @param {*} imageFabric
 * @param {*} shapeObj
 * @returns
 */
const CropItemByShape = (imageFabric, shapeObj) => {
    if (imageFabric && shapeObj) {
        let newImageFabric = imageFabric;
        let shapeCrop = shapeObj;
        shapeCrop._objects.map((item) => { item.fill = 'black'; });
        shapeCrop.set({
            left: shapeCrop.left - (newImageFabric.width / 2),
            top: shapeCrop.top - (newImageFabric.height / 2),
        });
        newImageFabric.clipPath = shapeCrop;
        newImageFabric.set({
            scaleX: 1,
            scaleY: 1,
            angle: imageFabric.angle,
            croppedFlag: true,
        });
        newImageFabric.setCoords();
        return newImageFabric;
    }
};
exports.CropItemByShape = CropItemByShape;
//#endregion
//#region ➝　PRODUCTION
/**
 * ============================================================
 *      Functions related to Output Pattern for Production
 * ============================================================
 */
/**
 * Set Canvas Width and Height by Product Style(Production)
 * @param {*} canvas
 * @param {string} productId
 * @param {string} style
 */
const F_SetCanvasWidthHeightByProductStyle = (canvas, productId, style) => {
    const sizePattern = exports.GetSizePatternModel(productId, style);
    const widthCanvas = sizePattern.Width;
    const heightCanvas = sizePattern.Height;
    let hsZoom = 2000 / widthCanvas;
    let setW = 2000;
    let setH = heightCanvas * hsZoom;
    canvas.setWidth(setW);
    canvas.setHeight(setH);
    canvas.renderAll();
};
exports.F_SetCanvasWidthHeightByProductStyle = F_SetCanvasWidthHeightByProductStyle;
/**
 * Get Information Output Pattern(Production)
 * @param {string} productId
 * @param {string} styleCode
 * @param {string} size
 * @returns
 */
const GetInfoOutputPattern = (productId, styleCode, size) => {
    let infoItem;
    let infoSize = { Width: 0, Height: 0 };
    const isPolo = productId === Constants_1.CONST_PRODUCT_ID.POLO ? true : false;
    const isShirts = productId === Constants_1.CONST_PRODUCT_ID.SHIRTS ? true : false;
    const isMen = styleCode === Constants_1.CONST_OptionKeyStyle_key.C1 ? true : false;
    const isLadies = styleCode === Constants_1.CONST_OptionKeyStyle_key.C2 ? true : false;
    const productNameItem = isPolo ? Constants_1.INFO_ITEM_OUTPUT.POLO : (isShirts ? Constants_1.INFO_ITEM_OUTPUT.SHIRTS : Constants_1.INFO_ITEM_OUTPUT.HOODIE);
    const productNameSize = isPolo ? Constants_1.SIZE_OUTPUT_PATTERN.POLO : (isShirts ? Constants_1.SIZE_OUTPUT_PATTERN.SHIRTS : Constants_1.SIZE_OUTPUT_PATTERN.HOODIE);
    const styleNameItem = isMen ? productNameItem.MEN : (isLadies ? productNameItem.LADIES : productNameItem.KID);
    const styleNameSize = isMen ? productNameSize.MEN : (isLadies ? productNameSize.LADIES : productNameSize.KID);
    switch (size) {
        case Constants_1.OptionKeySize.LL:
            infoItem = styleNameItem.LL;
            infoSize = styleNameSize.LL;
            break;
        case Constants_1.OptionKeySize.L:
            infoItem = styleNameItem.L;
            infoSize = styleNameSize.L;
            break;
        case Constants_1.OptionKeySize.M:
            infoItem = styleNameItem.M;
            infoSize = styleNameSize.M;
            break;
        case Constants_1.OptionKeySize.S:
            infoItem = styleNameItem.S;
            infoSize = styleNameSize.S;
            break;
        case Constants_1.OptionKeySize.SS:
            infoItem = styleNameItem.SS;
            infoSize = styleNameSize.SS;
            break;
    }
    return { InfoSize: infoSize, InfoItem: infoItem };
};
exports.GetInfoOutputPattern = GetInfoOutputPattern;
//#endregion
//#region ➝　DEVELOPMENT
/**
 * ============================================================
 *      Functions related to Output Pattern for Development
 * ============================================================
 */
/**
 * Set Canvas Width and Height by Product Style(Development)
 * @param {*} canvas
 * @param {string} productId
 * @param {string} style
 */
const F_SetCanvasWidthHeightByProductStyle_Dev = (canvas, productId, style) => {
    const sizePattern = exports.GetSizePatternModel(productId, style);
    const widthCanvas = sizePattern.Width;
    const heightCanvas = sizePattern.Height;
    let hsZoom = 2000 / widthCanvas;
    let setW = 2000;
    let setH = heightCanvas * hsZoom;
    canvas.setWidth(setW);
    canvas.setHeight(setH);
    canvas.renderAll();
};
exports.F_SetCanvasWidthHeightByProductStyle_Dev = F_SetCanvasWidthHeightByProductStyle_Dev;
/**
 * Get size Pattern Model
 * @param productId
 * @param styleCode
 * @returns Width: number, Height: number
 */
const GetSizePatternModel = (productId, styleCode) => {
    const isPolo = productId === Constants_1.CONST_PRODUCT_ID.POLO ? true : false;
    const isShirts = productId === Constants_1.CONST_PRODUCT_ID.SHIRTS ? true : false;
    // const isHoodie = productId === CONST_PRODUCT_ID.HOODIE ? true : false;
    const isMen = styleCode === Constants_1.CONST_OptionKeyStyle_key.C1 ? true : false;
    const isLadies = styleCode === Constants_1.CONST_OptionKeyStyle_key.C2 ? true : false;
    // const isKid = styleCode === CONST_OptionKeyStyle_key.C3 ? true : false;
    const sizeProduct = isPolo ? Constants_1.SIZE_MODEL_PATTERN.POLO : (isShirts ? Constants_1.SIZE_MODEL_PATTERN.SHIRTS : Constants_1.SIZE_MODEL_PATTERN.HOODIE);
    const sizeStyle = isMen ? sizeProduct.MEN : (isLadies ? sizeProduct.LADIES : sizeProduct.KID);
    return { Width: sizeStyle.Width, Height: sizeStyle.Height };
};
exports.GetSizePatternModel = GetSizePatternModel;
/**
 * Get Information Output Pattern(Development)
 * @param {string} productId
 * @param {string} styleCode
 * @param {string} size
 * @returns
 */
const GetInfoOutputPattern_Dev = (productId, styleCode, size) => {
    let infoItem;
    let infoSize = { Width: 0, Height: 0 };
    const isPolo = productId === Constants_1.CONST_PRODUCT_ID.POLO ? true : false;
    const isShirts = productId === Constants_1.CONST_PRODUCT_ID.SHIRTS ? true : false;
    const isMen = styleCode === Constants_1.CONST_OptionKeyStyle_key.C1 ? true : false;
    const isLadies = styleCode === Constants_1.CONST_OptionKeyStyle_key.C2 ? true : false;
    const productNameItem = isPolo ? Constants_1.INFO_ITEM_OUTPUT.POLO : (isShirts ? Constants_1.INFO_ITEM_OUTPUT.SHIRTS : Constants_1.INFO_ITEM_OUTPUT.HOODIE);
    const productNameSize = isPolo ? Constants_1.SIZE_OUTPUT_PATTERN.POLO : (isShirts ? Constants_1.SIZE_OUTPUT_PATTERN.SHIRTS : Constants_1.SIZE_OUTPUT_PATTERN.HOODIE);
    const styleNameItem = isMen ? productNameItem.MEN : (isLadies ? productNameItem.LADIES : productNameItem.KID);
    const styleNameSize = isMen ? productNameSize.MEN : (isLadies ? productNameSize.LADIES : productNameSize.KID);
    switch (size) {
        case Constants_1.OptionKeySize.LL:
            infoItem = styleNameItem.LL;
            infoSize = styleNameSize.LL;
            break;
        case Constants_1.OptionKeySize.L:
            infoItem = styleNameItem.L;
            infoSize = styleNameSize.L;
            break;
        case Constants_1.OptionKeySize.M:
            infoItem = styleNameItem.M;
            infoSize = styleNameSize.M;
            break;
        case Constants_1.OptionKeySize.S:
            infoItem = styleNameItem.S;
            infoSize = styleNameSize.S;
            break;
        case Constants_1.OptionKeySize.SS:
            infoItem = styleNameItem.SS;
            infoSize = styleNameSize.SS;
            break;
    }
    return { InfoSize: infoSize, InfoItem: infoItem };
};
exports.GetInfoOutputPattern_Dev = GetInfoOutputPattern_Dev;
//#endregion
//# sourceMappingURL=FunctionCommon.js.map