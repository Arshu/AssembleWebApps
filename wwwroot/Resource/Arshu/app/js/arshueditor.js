
window.ajaxid = 0;

let gJsonEditorItemsPerPage = 5;
let gJsonEditorItemsPerPageArray = 2;
let gJsonEditorItemsPerPageArrayItem = 2;

function fillJsonEditor(viewId, progressElmId, responseElmId, jsonSourceAppSite, jsonSourceAppView, jsonSource, jsonKey, viewModeVal, targetElmId, showElmId, pageNo, pageNoArray, pageNoArrayItem, filterKeyPath, successCallback) {
    let id = window.ajaxid++;

    let responseContainerElmId = responseElmId + "Container";
    let responseElm = getElm(responseElmId)
    let responseContainerElm = getElm(responseContainerElmId)
    //while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
    //hideElm(responseContainerElmId);

    let valid = true;

    let itemsPerPage = gJsonEditorItemsPerPage;
    if (haveElm(viewId + "JsonEditorItemsPerPage") == true) {
        itemsPerPage = getElm(viewId + "JsonEditorItemsPerPage").value;
        gJsonEditorItemsPerPage = itemsPerPage;
    }

    let itemsPerPageArray = gJsonEditorItemsPerPageArray;
    if (haveElm(viewId + filterKeyPath + "jsonArrayEditorItemsPerPage") == true) {
        itemsPerPageArray = getElm(viewId + filterKeyPath + "jsonArrayEditorItemsPerPage").value;
        gJsonEditorItemsPerPageArray = itemsPerPageArray;
    }

    let itemsPerPageArrayItem = gJsonEditorItemsPerPageArrayItem;
    if (haveElm(viewId + filterKeyPath + "jsonArrayItemEditorItemsPerPage") == true) {
        itemsPerPageArrayItem = getElm(viewId + filterKeyPath + "jsonArrayItemEditorItemsPerPage").value;
        gJsonEditorItemsPerPageArrayItem = itemsPerPageArrayItem;
    }

    if (targetElmId.trim().length == 0) {
        showText(responseElm, 'Enter Target Element Id', 'red');
        valid = false;
    }

    if (showElmId.trim().length == 0) {
        showText(responseElm, 'Enter Show Element Id', 'red');
        valid = false;
    }

    
    if (valid === true) {

        let url = '/AppApi/VueApi';
        let urlMethod = 'POST';
        let urlContent = {
            "jsonrpc": '2.0', "method": 'GetJsonEditorView',
            "params": {
                "viewId": viewId,
                "jsonAppSite": jsonSourceAppSite,
                "jsonAppView": jsonSourceAppView,
                "jsonSource": jsonSource,
                "jsonKey": jsonKey,
                "viewMode": viewModeVal,
                "pageNo": pageNo,
                "itemsPerPage": itemsPerPage,
                "pageNoArray": pageNoArray,
                "itemsPerPageArray": itemsPerPageArray,
                "pageNoArrayItem": pageNoArrayItem,
                "itemsPerPageArrayItem": itemsPerPageArrayItem,
                "filterKeyPath": filterKeyPath
            },
            "id": id
        };

        dopost(progressElmId, responseElmId, url, urlContent,
            function (data) {
                if ((data.hasOwnProperty('Result') === true) && (data.Result)) {
                    let result = data.Result;

                    if (result.hasOwnProperty('message') === true) {
                        //showText(responseElm, result.message, 'green');
                        if (result.hasOwnProperty('html') === true) {

                            if (filterKeyPath.length == 0) {
                                let rootNode = getElm(targetElmId);
                                rootNode.innerHTML = result.html;
                                showElm(showElmId);
                            } else {
                                let rootNode = getElm(targetElmId);
                                rootNode.outerHTML = result.html;
                                showElm(showElmId);
                            }

                            if (typeof successCallback === "function") {
                                successCallback();
                            }
                        }
                        else if (result.hasOwnProperty('json') === true) {
                            let json = result.json;
                            //fillProfileRole(json);

                            if (typeof successCallback === "function") {
                                successCallback();
                            }
                        }
                    }
                    else if (result.hasOwnProperty('error') === true) {
                        showText(responseElm, result.error, 'red');
                    }
                }
                else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                    let error = data.Error;
                    if (error.hasOwnProperty('Message') === true) {
                        showText(responseElm, error.Message, 'red');
                    }
                }
            });

    }
    return false;
}

function refreshEditorJson(viewId, progressElmId, pageNo, pageNoArray, pageNoArrayItem, editorResponseElmId, editorTargetElmId, editorShowElmId, successCallback) {
    let valid = true;
    if (valid == true) {

        let responseElmId = viewId + 'JsonEditorResponse';
        let responseContainerElmId = responseElmId + "Container";
        let responseElm = getElm(responseElmId)
        let responseContainerElm = getElm(responseContainerElmId)
        while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
        hideElm(responseContainerElmId);

        let jsonEditorTargetElmId = viewId;
        let jsonEditorShowElmId = viewId + "JsonEditorSection";

        if (editorResponseElmId != "") {
            if (haveElm(editorResponseElmId) == true) {
                jsonEditorResponseElmId = editorResponseElmId;
            }
        }
        if (editorTargetElmId != "") {
            if (haveElm(editorTargetElmId) == true) {
                jsonEditorTargetElmId = editorTargetElmId;
            }
        }
        if (editorShowElmId != "") {
            if (haveElm(editorShowElmId) == true) {
                jsonEditorShowElmId = editorShowElmId;
            }
        }

        let jsonSourceAppSite = getElm(viewId + 'EditorJsonSourceAppSite').value;
        let jsonSourceAppView = getElm(viewId + 'EditorJsonSourceAppView').value;
        let jsonSource = getElm(viewId + 'EditorJsonSource').value;
        let jsonKey = "";
        let viewModeVal = getElm(viewId + 'EditorViewMode').value;

        fillJsonEditor(viewId, progressElmId, responseElmId, jsonSourceAppSite, jsonSourceAppView, jsonSource, jsonKey, viewModeVal, jsonEditorTargetElmId, jsonEditorShowElmId, pageNo, pageNoArray, pageNoArrayItem, "", successCallback);
    }
}

function refreshEditorJsonArray(viewId, progressElmId, pageNo, pageNoArray, pageNoArrayItem, keyPath, successCallback) {

    let valid = true;
    if (valid == true) {

        let responseElmId = viewId + 'JsonEditorResponse';
        let responseContainerElmId = responseElmId + "Container";
        let responseElm = getElm(responseElmId)
        let responseContainerElm = getElm(responseContainerElmId)
        while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
        hideElm(responseContainerElmId);

        let jsonEditorTargetElmId = viewId;
        let jsonEditorShowElmId = viewId + "JsonEditorSection";

        let arrayTargetElmId = keyPath;

        let jsonSourceAppSite = getElm(viewId + 'EditorJsonSourceAppSite').value;
        let jsonSourceAppView = getElm(viewId + 'EditorJsonSourceAppView').value;
        let jsonSource = getElm(viewId + 'EditorJsonSource').value;
        let jsonKey = "";
        let viewModeVal = getElm(viewId + 'EditorViewMode').value;

        fillJsonEditor(viewId, progressElmId, responseElmId, jsonSourceAppSite, jsonSourceAppView, jsonSource, jsonKey, viewModeVal, arrayTargetElmId, jsonEditorShowElmId, pageNo, pageNoArray, pageNoArrayItem, keyPath, successCallback);
    }
}

function refreshEditorJsonArrayItem(viewId, progressElmId, pageNo, pageNoArray, pageNoArrayItem, keyPath, successCallback) {

    let valid = true;
    if (valid == true) {

        let responseElmId = viewId + 'JsonEditorResponse';
        let responseContainerElmId = responseElmId + "Container";
        let responseElm = getElm(responseElmId)
        let responseContainerElm = getElm(responseContainerElmId)
        while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
        hideElm(responseContainerElmId);

        let jsonEditorTargetElmId = viewId;
        let jsonEditorShowElmId = viewId + "JsonEditorSection";

        let arrayItemTargetElmId = keyPath;

        let jsonSourceAppSite = getElm(viewId + 'EditorJsonSourceAppSite').value;
        let jsonSourceAppView = getElm(viewId + 'EditorJsonSourceAppView').value;
        let jsonSource = getElm(viewId + 'EditorJsonSource').value;
        let jsonKey = "";
        let viewModeVal = getElm(viewId + 'EditorViewMode').value;

        fillJsonEditor(viewId, progressElmId, responseElmId, jsonSourceAppSite, jsonSourceAppView, jsonSource, jsonKey, viewModeVal, arrayItemTargetElmId, jsonEditorShowElmId, pageNo, pageNoArray, pageNoArrayItem, keyPath, successCallback);
    }
}



function saveEditorJson(viewId, progressElmId,  getUpdateJson, refreshComponentName, successCallback) {

    let responseElmId = viewId + 'JsonEditorResponse';
    let responseContainerElmId = responseElmId + "Container";
    let responseElm = getElm(responseElmId)
    let responseContainerElm = getElm(responseContainerElmId)
    while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
    hideElm(responseContainerElmId);

    let jsonSourceAppSite = getElm(viewId + 'EditorJsonSourceAppSite').value;
    let jsonSourceAppView = getElm(viewId + 'EditorJsonSourceAppView').value;
    let jsonSource = getElm(viewId + 'EditorJsonSource').value;

    let flatJsonData = {};
    if (typeof getUpdateJson === "function") {
        flatJsonData = getUpdateJson();
    }
    let flatJsonDataText = JSON.stringify(flatJsonData);

    if (typeof successCallback === "function") {
        saveViewComponentJson(progressElmId, responseElmId,
            jsonSourceAppSite, jsonSourceAppView, jsonSource,
            flatJsonDataText,
            refreshComponentName, {}, false, '', '', successCallback);
    } else {
        saveViewComponentJson(progressElmId, responseElmId,
            jsonSourceAppSite, jsonSourceAppView, jsonSource,
            flatJsonDataText,
            refreshComponentName, {}, false, '', '', function () {
                refreshEditorJsonArray(viewId, progressElmId, pageNoCurrent, pageNoArray, keyPath, successCallback)
            });
    }
}

function cloneEditorJsonArray(viewId, progressElmId, pageNoCurrent, pageNoArray, pageNoArrayItem, keyPathJson, refreshComponentName, successCallback) {

    let valid = true;
    if (valid == true) {

        let responseElmId = viewId + 'JsonEditorResponse';
        let responseContainerElmId = responseElmId + "Container";    
        let responseElm = getElm(responseElmId)
        let responseContainerElm = getElm(responseContainerElmId)
        while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
        hideElm(responseContainerElmId);

        let jsonSourceAppSite = getElm(viewId + 'EditorJsonSourceAppSite').value;
        let jsonSourceAppView = getElm(viewId + 'EditorJsonSourceAppView').value;
        let jsonSource = getElm(viewId + 'EditorJsonSource').value;

        let keyPath = keyPathJson["KeyPath"];

        let arrayIndex = 1;
        let arrayIndexElm = null;
        let arrayIndexElmArray = document.getElementsByName(keyPath);
        arrayIndexElmArray.forEach((radioElm) => {
            if (radioElm.checked == true) {
                arrayIndexElm = radioElm;
            }
        });

        if (arrayIndexElm != null) {
            let arrayIndexText = arrayIndexElm.id.replace("radio" + keyPath, "");
            arrayIndex = parseInt(arrayIndexText);


            if (typeof successCallback === "function") {
                cloneViewComponentJsonArray(progressElmId, responseElmId,
                    jsonSourceAppSite, jsonSourceAppView, jsonSource,
                    { 'KeyPath': keyPath + arrayIndex },
                    refreshComponentName, {}, false, '', '',
                    successCallback);
            }
            else {
                cloneViewComponentJsonArray(progressElmId, responseElmId,
                    jsonSourceAppSite, jsonSourceAppView, jsonSource,
                    { 'KeyPath': keyPath + arrayIndex },
                    refreshComponentName, {}, false, '', '', function () {
                        refreshEditorJsonArray(viewId, progressElmId, pageNoCurrent, pageNoArray, pageNoArrayItem, keyPath, successCallback)
                    });
            }
        } else {
            showText(responseElm, 'Select the Array Item to Clone', 'red');
        }
    }
}

function deleteEditorJsonArray(viewId, progressElmId, pageNoCurrent, pageNoArray, pageNoArrayItem, keyPathJson, refreshComponentName, successCallback) {

    let valid = true;
    if (valid == true) {

        let responseElmId = viewId + 'JsonEditorResponse';
        let responseContainerElmId = responseElmId + "Container";        
        let responseElm = getElm(responseElmId)
        let responseContainerElm = getElm(responseContainerElmId)
        while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
        hideElm(responseContainerElmId);

        let jsonSourceAppSite = getElm(viewId + 'EditorJsonSourceAppSite').value;
        let jsonSourceAppView = getElm(viewId + 'EditorJsonSourceAppView').value;
        let jsonSource = getElm(viewId + 'EditorJsonSource').value;

        let keyPath = keyPathJson["KeyPath"];

        let arrayIndex = 1;
        let arrayIndexElm = null;
        let arrayIndexElmArray = document.getElementsByName(keyPath);
        arrayIndexElmArray.forEach((radioElm) => {
            if (radioElm.checked == true) {
                arrayIndexElm = radioElm;
            }
        });

        if (arrayIndexElm != null) {
            let arrayIndexText = arrayIndexElm.id.replace("radio" + keyPath, "");
            arrayIndex = parseInt(arrayIndexText);

            if (typeof successCallback === "function") {
                deleteViewComponentJsonArray(progressElmId, responseElmId,
                    jsonSourceAppSite, jsonSourceAppView, jsonSource,
                    { 'KeyPath': keyPath + arrayIndex },
                    refreshComponentName, {},
                    false, '', '',
                    successCallback);
            } else {
                deleteViewComponentJsonArray(progressElmId, responseElmId,
                    jsonSourceAppSite, jsonSourceAppView, jsonSource,
                    { 'KeyPath': keyPath + arrayIndex },
                    refreshComponentName, {},
                    false, '', '', function () {
                        refreshEditorJsonArray(viewId, progressElmId, pageNoCurrent, pageNoArray, pageNoArrayItem, keyPath, successCallback)
                    });
            }
        } else {
            showText(responseElm, 'Select the Array Item to Delete', 'red');
        }
    }
}

