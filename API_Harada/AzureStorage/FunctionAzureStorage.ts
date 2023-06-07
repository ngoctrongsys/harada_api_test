import { CONST_azureStorageAccountKey, CONST_azureStorageAccountName, CONST_azureStorageRootURL } from "../Constants";
import { F_IsNullOrEmpty } from "../FunctionCommon";

var path = require("path");
var fs = require('fs');
//var getStream = require('get-stream');
var azure: any = require('azure-storage');
var multipart = require('parse-multipart');
const fetch = require("node-fetch");

/**
 * BlobService class
 * Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#constructors
 * @export
 * @class FunctionAzureStorage
 */
export class FunctionAzureStorage {

    /**
     * Checks a blob exists on the service
     * @static
     * @param {*} containerName
     * @param {*} fileNameWithSubPath
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_CheckBlobExist(containerName: any, fileNameWithSubPath: any) {
        const functionName = 'F_CheckBlobExist';

        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Checks whether or not a blob exists on the service.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-doesblobexist
             * @param {string} container    : The container name.
             * @param {string} blob         : The blob name.
             * @param {CreateBlockBlobRequestOptions} options
             * @param {ErrorOrResult<BlobResult>} callback : 
             *          error will contain information if an error occurs; 
             *          otherwise errorOrResult will be true if the blob exists, or false if the blob does not exist. 
             *          response will contain information related to this operation.
             */
            blobService.doesBlobExist(containerName, fileNameWithSubPath, function (error: any, result: any) {
                if (error) {
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    if (result.exists) {
                        resolve('1');
                    } else {
                        resolve('0');
                    }
                }
            });
        });
    }

    /**
     * Download Blobs
     * @static
     * @param {*} containerName
     * @param {*} fileNameWithSubPath
     * @param {*} folderSavePath
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_DownloadBlobs(containerName: any, fileNameWithSubPath: any, folderSavePath: any) {
        const functionName = 'F_DownloadBlobs';

        if (!fs.existsSync(folderSavePath)) {
            console.log(folderSavePath + ' does not exist. Attempting to create this directory...');
            fs.mkdirSync(folderSavePath);
            console.log(folderSavePath + ' created.');
        }

        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Get Blob to local file.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-getblobtolocalfile-1
             * @param {string} container        : The container name.
             * @param {string} blob             : The blob name.
             * @param {string} localFileName    : The local file name.
             * @param {ErrorOrResult<BlobResult>} callback  : The callback function.
             */
            blobService.getBlobToLocalFile(containerName, fileNameWithSubPath, (folderSavePath + path.basename(fileNameWithSubPath)),
                    function (error: any, serverBlob: any) {
                        if (error) {
                            console.log('[' + functionName + '] Error');
                            reject(error);
                        } else {
                            resolve(fileNameWithSubPath);
                        }
            });
        });
    }
    
    /**
     * Delete blob if exists
     * @static
     * @param {*} containerName
     * @param {*} fileNameWithSubPath
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_DeleteBlobIfExists(containerName: any, fileNameWithSubPath: any) {
        const functionName = 'F_DeleteBlobIfExists';
        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Marks the specified blob or snapshot for deletion if it exists. The blob is later deleted during garbage collection. 
             * If a blob has snapshots, you must delete them when deleting the blob. 
             * Using the deleteSnapshots option, you can choose either to delete both the blob and its snapshots, 
             * or to delete only the snapshots but not the blob itself. 
             * If the blob has snapshots, you must include the deleteSnapshots option or the blob service will return an error and nothing will be deleted. 
             * If you are deleting a specific snapshot using the snapshotId option, the deleteSnapshots option must NOT be included.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-deleteblobifexists
             * @param {string} container    : The container name.
             * @param {string} blob         : The blob name.
             * @param {ErrorOrResult<boolean>} callback  : The callback function.
             */
            blobService.deleteBlobIfExists(containerName, fileNameWithSubPath, function (error: any, result: any) {
                if (error) {
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    resolve(fileNameWithSubPath);
                }
            });
        });
    };

    /**
     * Delete by Folder
     *  Ref to: https://stackoverflow.com/questions/34727829/how-to-delete-a-folder-within-an-azure-blob-container
     * @static
     * @param {*} containerName
     * @param {*} prefix
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_DeleteByFolder(containerName: any, prefix: any) {
        const functionName = 'F_DeleteBlobInFolder';
        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Lists a segment containing a collection of blob items whose names begin with the specified prefix in the container.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-listblobssegmentedwithprefix
             * @param {string} container        : The container name. 
             * @param {string} prefix           : The prefix of the blob name.
             * @param {string} currentToken     : A continuation token returned by a previous listing operation. 
             *                                      Please use 'null' or 'undefined' if this is the first operation.
             * @param {ErrorOrResult<ListBlobsResult>} callback  : The callback function.
             */
            blobService.listBlobsSegmentedWithPrefix(containerName, prefix, null, function (error: any, results: any) {
                if (error) {
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    for (let i = 0, blob; blob = results.entries[i]; i++) {
                        const blobName = blob.name;
                        /**
                         * Marks the specified blob or snapshot for deletion if it exists. The blob is later deleted during garbage collection. 
                         * If a blob has snapshots, you must delete them when deleting the blob. 
                         * Using the deleteSnapshots option, you can choose either to delete both the blob and its snapshots, 
                         * or to delete only the snapshots but not the blob itself. 
                         * If the blob has snapshots, you must include the deleteSnapshots option or the blob service will return an error and nothing will be deleted. 
                         * If you are deleting a specific snapshot using the snapshotId option, the deleteSnapshots option must NOT be included.
                         *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-deleteblobifexists
                         * @param {string} container    : The container name.
                         * @param {string} blob         : The blob name.
                         * @param {ErrorOrResult<boolean>} callback  : The callback function.
                         */
                        blobService.deleteBlobIfExists(containerName, blobName, function (error: any, result: any) {
                            if (error) {
                                console.log('[F_DeleteBlobInFolder ➝ (deleteBlobIfExists)] Error', error);
                                reject(error);
                            } else {
                                // console.log('[OK(deleteBlobIfExists)] ', blobName);
                                resolve(prefix);
                            }
                        });
                    }
                    resolve(prefix);
                }
            });
        });
    };

    /**
     * Delete Container if exists
     * @static
     * @param {*} containerName
     *              Ref to: https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_DeleteContainerIfExists(containerName: any) {
        const functionName = 'F_DeleteContainerIfExists';
        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Marks the specified container for deletion if it exists. 
             * The container and any blobs contained within it are later deleted during garbage collection.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-deletecontainerifexists
             * @param {string} container    : The container name.
             * @param {ErrorOrResult<boolean>} callback  : The callback function.
             */
            blobService.deleteContainerIfExists(containerName, function (error: any, result: any) {
                if (error) {
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    resolve(containerName);
                }
            });
        });
    };

    /**
     *
     * Upload Blobs
     * @static
     * @param {*} containerName
     * @param {*} localFilePath
     * @param {string} fileNameFormat
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_UploadBlobs(containerName: any, localFilePath: any, fileNameFormat: string) {
        const functionName = 'F_UploadBlobs';
        // console.log(`localFilePath = ${localFilePath}`);

        return new Promise((resolve, reject) => {
            const blobName = FunctionAzureStorage.getNewBlobName(localFilePath, fileNameFormat);
            // console.log(blobName);
            // console.log(`${containerName}/${blobName}`);
            // console.log(`${CONST_azureStorageRootURL}${containerName}/${blobName}`);

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Create Block Blob from local file
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-createblockblobfromlocalfile-1
             * @param {string} container        : The container name.
             * @param {string} blob             : The blob name.
             * @param {string} localFileName    : The local file name.
             * @param {ErrorOrResult<BlobResult>} callback  : The callback function.
             */
            blobService.createBlockBlobFromLocalFile(containerName, `${blobName}`, localFilePath, (err: any) => {
                if (err) {
                    console.log('[' + functionName + '] Error');
                    reject(err);
                } else {
                    resolve({
                        filename: blobName,
                        originalname: path.basename(localFilePath),
                        //size: streamLength,
                        path: `${containerName}/${blobName}`,
                        url: `${CONST_azureStorageRootURL}${containerName}/${blobName}`
                    });
                }
            });
        });
    };

    /**
     *
     * Upload Blobs with sub folder
     * @static
     * @param {*} containerName
     * @param {*} azureSubFolder
     * @param {*} filePath
     * @param {string} newFileName
     * @param {string} fileNameFormat
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_UploadBlobsWithSubFolder(containerName: any, azureSubFolder: any, filePath: any, newFileName: string, fileNameFormat: string) {
        const functionName = 'F_UploadBlobsWithSubFolder';

        return new Promise((resolve, reject) => {
            const blobName = FunctionAzureStorage.getNewBlobName(newFileName, fileNameFormat);
            // console.log(blobName);
            // console.log(`${containerName}/${azureSubFolder}/${blobName}`);
            // console.log(`${CONST_azureStorageRootURL}${containerName}/${azureSubFolder}/${blobName}`);

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Create Block Blob from local file
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-createblockblobfromlocalfile-1
             * @param {string} container        : The container name.
             * @param {string} blob             : The blob name.
             * @param {string} localFileName    : The local file name.
             * @param {ErrorOrResult<BlobResult>} callback  : The callback function.
             */
            blobService.createBlockBlobFromLocalFile(containerName, `${azureSubFolder}/${blobName}`, filePath, (err: any) => {
                if (err) {
                    console.log('[' + functionName + '] Error');
                    reject(err);
                } else {
                    resolve({
                        filename: blobName,
                        originalname: path.basename(filePath),
                        //size: streamLength,
                        path: `${containerName}/${azureSubFolder}/${blobName}`,
                        url: `${CONST_azureStorageRootURL}${containerName}/${azureSubFolder}/${blobName}`
                    });
                }
            });
        });
    };

    /**
     * Upload blobs from stream
     * @static
     * @param {string} containerName
     * @param {string} azureSubFolder
     * @param {*} stream
     * @param {*} streamLength
     * @param {string} contentTypeFile
     * @param {string} newFileName
     * @param {string} fileNameFormat
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_UploadBlobsFromStream(containerName: string,
                                            azureSubFolder: string,
                                            stream: any,
                                            streamLength: any,
                                            contentTypeFile: string,
                                            newFileName: string,
                                            fileNameFormat: string) {

        const functionName = 'F_UploadBlobsFromStream';
        const blobName = FunctionAzureStorage.getNewBlobName(newFileName, fileNameFormat);
        let filePath = '';
        if (F_IsNullOrEmpty(azureSubFolder)){
            filePath = `${blobName}`;
        } else {
            filePath = `${azureSubFolder}/${blobName}`;
        }

        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            const options = { contentSettings: { contentType: contentTypeFile } };

            /**
             * Uploads a block blob from a stream.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-createblockblobfromstream-1
             * @param {string} container    : The container name.
             * @param {string} blob         : The blob name.
             * @param {stream.Readable} stream : 
             * @param {number} streamLength : The length of the stream to upload.
             * @param {CreateBlockBlobRequestOptions} options
             * @param {ErrorOrResult<BlobResult>} callback  : The callback function.
             */
            blobService.createBlockBlobFromStream(containerName, filePath, stream, streamLength, options, (err: any) => {
                if (err) {
                    console.log('[' + functionName + '] Error');
                    reject(err);
                } else {
                    const response = {
                        filename: blobName,
                        //originalname: file.originalname,
                        //size: streamLength,
                        path: `${containerName}/${filePath}`,
                        url: `${CONST_azureStorageRootURL}${containerName}/${filePath}`
                    }
                    resolve(response);
                }
            });
        });
    };

    /**
     * Copy Blob
     * @static
     * @param {string} sourceUri         Ex: (https://haradacorp.blob.core.windows.net/thumbnails/temp/551403e0-8b28-45df-8c43-76f79fcde255.png)
     * @param {string} containerName
     * @param {string} azureSubFolder
     * @param {string} newFileName
     * @param {string} fileNameFormat
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_CopyBlob(sourceUri:string, containerName: any, azureSubFolder: any, newFileName: string, fileNameFormat: string) {
        const functionName = 'F_CopyBlob';

        const blobName = FunctionAzureStorage.getNewBlobName(newFileName, fileNameFormat);
        let targetBlob = '';
        if (F_IsNullOrEmpty(azureSubFolder)){
            targetBlob = `${blobName}`;
        } else {
            targetBlob = `${azureSubFolder}/${blobName}`;
        }

        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Starts to copy a blob or an Azure Storage file to a destination blob. 
             * For an asynchronous copy(by default), this operation returns a object including a copy ID which you can use to check or abort the copy operation. 
             * The Blob service copies blobs on a best-effort basis. 
             * The source blob for an asynchronous copy operation may be a block blob, an append blob, a page blob or an Azure Storage file.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-startcopyblob-1
             * @param {string} sourceUri        : The source blob URI. 
             * @param {string} targetContainer  : The target container name.
             * @param {string} targetBlob       : The target blob name.
             * @param {ErrorOrResult<boolean>} callback  : The callback function.
             */
            blobService.startCopyBlob(sourceUri, containerName, targetBlob, function (error: any, result: any) {
                if (error) {
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    const response = {
                        filename: blobName,
                        path: `${containerName}/${targetBlob}`,
                        url: `${CONST_azureStorageRootURL}${containerName}/${targetBlob}`
                    }
                    resolve(response);
                }
            });
        });
    };

    /**
     * Get list Containers Segmented
     * @static
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_GetListContainersSegmented() {
        const functionName = 'F_GetListContainersSegmented';
        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Lists a segment containing a collection of container items under the specified account.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-listcontainerssegmented-1
             * @param {string} currentToken    : A continuation token returned by a previous listing operation. 
             *                                      Please use 'null' or 'undefined' if this is the first operation.
             * @param {ErrorOrResult<ListContainerResult>} callback  : The callback function.
             */
            blobService.listContainersSegmented(null, function (error: any, results: any) {
                if (error) {
                    // List container error
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    // for (let i = 0, container; container = results.entries[i]; i++) {
                    //     // Deal with container object
                    //     console.log('_______container_________', container);
                    // }
                    resolve(results.entries);
                }
            });
        });
    };

    /**
     * Get list Blobs Segmented
     * @static
     * @param {string} containerName
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_GetListBlobsSegmented(containerName: any) {
        const functionName = 'F_GetListBlobsSegmented';
        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Lists a segment containing a collection of blob items in the container.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-listblobssegmented
             * @param {string} container  : The container name. 
             * @param {string} currentToken    : A continuation token returned by a previous listing operation. 
             *                                      Please use 'null' or 'undefined' if this is the first operation.
             * @param {ErrorOrResult<ListContainerResult>} callback  : The callback function.
             */
            blobService.listBlobsSegmented(containerName, null, function (error: any, results: any) {
                if (error) {
                    // List blobs error
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    // for (var i = 0, blob; blob = results.entries[i]; i++) {
                    //     // Deal with blob object
                    //     // console.log('_______blob_________', blob);
                    // }
                    resolve(results.entries);
                }
            });

        });
    };

    /**
     * Get list Blobs segmented with prefix
     * @static
     * @param {string} containerName
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_GetListBlobsSegmentedWithPrefix(containerName: any, prefix: any) {
        const functionName = 'F_GetListBlobsSegmented';
        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Lists a segment containing a collection of blob items whose names begin with the specified prefix in the container.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-listblobssegmentedwithprefix
             * @param {string} container    : The container name. 
             * @param {string} prefix       : The prefix of the blob name.
             * @param {string} currentToken    : A continuation token returned by a previous listing operation. 
             *                                      Please use 'null' or 'undefined' if this is the first operation.
             * @param {ErrorOrResult<ListBlobsResult>} callback  : The callback function.
             */
            blobService.listBlobsSegmentedWithPrefix(containerName, prefix, null, function (error: any, results: any) {
                if (error) {
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    // for (let i = 0, blob; blob = results.entries[i]; i++) {
                    //     console.log('_______blob_________', blob.name);
                    // }
                    resolve(results);
                }
            });

        });
    };

    /**
     * Get new Blob name
     * @static
     * @memberof FunctionAzureStorage
     */
    public static getNewBlobName = (originalName: any, fileNameFormat: string = '{0}') => {
        const newFileName = path.basename(originalName);
        return fileNameFormat.replace('{0}', `${newFileName}`);
    };

    /**
     * Copy by Folder
     *  Ref to: 
     * @static
     * @param {*} containerName
     * @param {*} sourceBlob
     * @param {*} destinationBlob
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_CopyByFolder(containerName: any, sourceBlob: any, destinationBlob: any) {
        const functionName = 'F_CopyByFolder';
        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Lists a segment containing a collection of blob items whose names begin with the specified prefix in the container.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-listblobssegmentedwithprefix
             * @param {string} container        : The container name. 
             * @param {string} prefix           : The prefix of the blob name.
             * @param {string} currentToken     : A continuation token returned by a previous listing operation. 
             *                                      Please use 'null' or 'undefined' if this is the first operation.
             * @param {ErrorOrResult<ListBlobsResult>} callback  : The callback function.
             */
            blobService.listBlobsSegmentedWithPrefix(containerName, sourceBlob, null, function (error: any, results: any) {
                if (error) {
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    for (let i = 0, blob; blob = results.entries[i]; i++) {
                        const blobNameTempDesign = blob.name;
                        /**
                         * Starts to copy a blob or an Azure Storage file to a destination blob. 
                         * For an asynchronous copy(by default), this operation returns a object including a copy ID which you can use to check or abort the copy operation. 
                         * The Blob service copies blobs on a best-effort basis. 
                         * The source blob for an asynchronous copy operation may be a block blob, an append blob, a page blob or an Azure Storage file.
                         *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-startcopyblob-1
                         * @param {string} sourceUri        : The source blob URI. 
                         * @param {string} targetContainer  : The target container name.
                         * @param {string} targetBlob       : The target blob name.
                         * @param {ErrorOrResult<boolean>} callback  : The callback function.
                         */
                        const blobName = blobNameTempDesign.replace(sourceBlob + '/', '');
                        const targetBlob = `${destinationBlob}/${blobName}`;
                        blobService.startCopyBlob(CONST_azureStorageRootURL + containerName + '/' + blobNameTempDesign, containerName, targetBlob, function (error: any, result: any) {
                            if (error) {
                                console.log('[startCopyBlob] Error', error);
                                reject(error);
                            } else {
                                const response = {
                                    filename: blobName,
                                    path: `${containerName}/${targetBlob}`,
                                    url: `${CONST_azureStorageRootURL}${containerName}/${targetBlob}`
                                }
                                // console.log('__response__', response);
                                resolve(response);
                            }
                        });
                    }
                    resolve(destinationBlob);
                }
            });
        });
    };


    /**
     * Get list Blobs segmented with prefix Order
     * @static
     * @param {string} containerName
     * @returns
     * @memberof FunctionAzureStorage
     */
    public static F_GetListBlobsSegmentedWithPrefixOrder(containerName: any, prefix: any) {
        const functionName = 'F_GetListBlobsSegmentedWithPrefixOrder';
        return new Promise((resolve, reject) => {

            /**
             * Creates a new createBlobService
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage?view=azure-node-legacy#azure-storage-azurestorage-createblobservice
             * @param {string} storageAccount
             * @param {string} storageAccessKey
             * @param {string | StorageHost} host?
             */
            const blobService = azure.createBlobService(CONST_azureStorageAccountName, CONST_azureStorageAccountKey);

            /**
             * Lists a segment containing a collection of blob items whose names begin with the specified prefix in the container.
             *  Ref to: https://docs.microsoft.com/en-us/javascript/api/azure-storage/azurestorage.services.blob.blobservice.blobservice?view=azure-node-legacy#azure-storage-azurestorage-services-blob-blobservice-blobservice-listblobssegmentedwithprefix
             * @param {string} container    : The container name. 
             * @param {string} prefix       : The prefix of the blob name.
             * @param {string} currentToken    : A continuation token returned by a previous listing operation. 
             *                                      Please use 'null' or 'undefined' if this is the first operation.
             * @param {ErrorOrResult<ListBlobsResult>} callback  : The callback function.
             */
            blobService.listBlobsSegmentedWithPrefix(containerName, prefix, null, function (error: any, results: any) {
                if (error) {
                    console.log('[' + functionName + '] Error');
                    reject(error);
                } else {
                    // for (let i = 0, blob; blob = results.entries[i]; i++) {
                    // }
                    resolve(results);
                }
            });

        });
    };
}