
window.ajaxid = 0;

let gJsonEditorItemsPerPage = 5;
let gJsonEditorItemsPerPageArray = 2;
let gJsonEditorItemsPerPageArrayItem = 2;

function refreshJsonList(progressElmId, responseElmId, jsonSourceAppSite, editModeVal, pageNo, itemsPerPage, jsonFileSelectElmId, jsonFileItemsPerPageSelectElmId, jsonFilePreviousBtnElmId, jsonFileNextBtnElmId, successCallback, failureCallback) {
    let id = window.ajaxid++;

    let responseContainerElmId = responseElmId + "Container";
    let responseElm = getElm(responseElmId)
    let responseContainerElm = getElm(responseContainerElmId)
    //while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
    //hideElm(responseContainerElmId);

    let valid = true;

    if (jsonSourceAppSite.trim().length == 0) {
        showText(responseElm, 'Select AppSite', 'red');
        valid = false;
    }

    if (editModeVal.trim().length == 0) {
        showText(responseElm, 'Specify EditMode', 'red');
        valid = false;
    } else {
        if ((editModeVal != "JsonObjectJsonArray") && (editModeVal != "JsonObject") && (editModeVal != "JsonArray")) {
            showText(responseElm, 'Invalid [' + editModeVal + '] EditMode [JsonObjectJsonArray|JsonObject|JsonArray]', 'red');
            valid = false;
        }
    }

    if (valid == true) {
        let url = '/AppApi/VueApi';
        let urlMethod = 'POST';
        let urlContent = {
            "jsonrpc": '2.0', "method": 'GetJsonFileList',
            "params": {
                "appSite": jsonSourceAppSite,
                "editMode": editModeVal,
                "pageNo": pageNo,
                "itemsPerPage": itemsPerPage
            },
            "id": id
        };

        dopost(progressElmId, responseElmId, url, urlContent,
            function (data) {
                if ((data.hasOwnProperty('Result') === true) && (data.Result)) {
                    let result = data.Result;

                    if (result.hasOwnProperty('message') === true) {
                        //showText(responseElm, result.message, 'green');

                        if (result.hasOwnProperty('json') === true) {
                            let jsonResult = result.json;


                            let itemsPerPageSelectElm = getElm(jsonFileItemsPerPageSelectElmId);
                            if (itemsPerPageSelectElm) {
                                if (jsonResult.hasOwnProperty('itemsPerPage') === true) {
                                    let itemsPerPage = jsonResult.itemsPerPage;

                                    for (let i = 0; i < itemsPerPageSelectElm.options.length; i++) {
                                        itemsPerPageSelectElm.options[i].removeAttribute("selected");                                        
                                    }

                                    let itemSelected = false;
                                    for (let i = 0; i < itemsPerPageSelectElm.options.length; i++) {
                                        itemsPerPageSelectElm.options[i].removeAttribute("selected");
                                        if (itemSelected == false) {
                                            if (itemsPerPageSelectElm.options[i].value >= itemsPerPage) {
                                                itemsPerPageSelectElm.options[i].setAttribute("selected", true);
                                                itemSelected = true;
                                                itemsPerPageSelectElm.removeAttribute("disabled");
                                            }
                                        }
                                    }
                                }
                            }

                            let jsonFilePreviousBtnElm = getElm(jsonFilePreviousBtnElmId);
                            if (jsonFilePreviousBtnElm) {
                                jsonFilePreviousBtnElm.setAttribute("disabled", true);
                                if (jsonResult.hasOwnProperty('havePreviousPage') === true) {
                                    let havePreviousPage = jsonResult.havePreviousPage;
                                    if (havePreviousPage == true) {
                                        jsonFilePreviousBtnElm.removeAttribute("disabled");
                                    }
                                }
                            }

                            let jsonFilePreviousValueElmId = jsonFilePreviousBtnElmId.replace("Btn", "Value");
                            let jsonFilePreviousValueElm = getElm(jsonFilePreviousValueElmId);
                            if (jsonFilePreviousValueElm) {
                                if (jsonResult.hasOwnProperty('previousPage') === true) {
                                    jsonFilePreviousValueElm.value = jsonResult.previousPage;
                                }
                            }

                            let jsonFileNextBtnElm = getElm(jsonFileNextBtnElmId);
                            if (jsonFileNextBtnElm) {
                                jsonFileNextBtnElm.setAttribute("disabled", true);
                                if (jsonResult.hasOwnProperty('haveNextPage') === true) {
                                    let haveNextPage = jsonResult.haveNextPage;
                                    if (haveNextPage == true) {
                                        jsonFileNextBtnElm.removeAttribute("disabled");
                                    }
                                }
                            }

                            let jsonFileNextValueElmId = jsonFileNextBtnElmId.replace("Btn", "Value");
                            let jsonFileNextValueElm = getElm(jsonFileNextValueElmId);
                            if (jsonFileNextValueElm) {
                                if (jsonResult.hasOwnProperty('nextPage') === true) {
                                    jsonFileNextValueElm.value = jsonResult.nextPage;
                                }
                            }

                            if (jsonResult.hasOwnProperty('PathList') === true) {
                                let pathListArray = jsonResult.PathList;

                                let selectElm = getElm(jsonFileSelectElmId);
                                if (selectElm) {
                                    selectElm.options.length = 0;
                                    for (let i = 0; i < pathListArray.length; i++) {
                                        let jsonPathInfo = pathListArray[i];
                                        let selectText = "";
                                        if (jsonPathInfo.hasOwnProperty('Name') === true) {
                                            selectText = jsonPathInfo.Name
                                        }
                                        let selectValue = "";
                                        if (jsonPathInfo.hasOwnProperty('Path') === true) {
                                            selectValue = jsonPathInfo.Path
                                        }
                                        selectElm.options[selectElm.options.length] = new Option(selectText, selectValue);
                                    }
                                }
                            }

                            if (typeof successCallback === "function") {
                                successCallback();
                            }
                        }
                    }
                    else if (result.hasOwnProperty('error') === true) {
                        showText(responseElm, result.error, 'red');

                        if (typeof failureCallback === "function") {
                            failureCallback();
                        }
                    }
                }
                else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                    let error = data.Error;
                    if (error.hasOwnProperty('Message') === true) {
                        showText(responseElm, error.Message, 'red');

                        if (typeof failureCallback === "function") {
                            failureCallback();
                        }
                    }
                }
            });
    }

    return false;
}

function fillJsonEditor(viewId, progressElmId, responseElmId, jsonSourceAppSite, jsonSourceAppView, editModeVal, jsonSource, jsonKey, viewModeVal, targetElmId, showElmId, pageNo, pageNoArray, pageNoArrayItem, filterKeyPath, successCallback) {
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

    if (editModeVal.trim().length == 0) {
        showText(responseElm, 'Specify EditMode', 'red');
        valid = false;
    } else {
        if ((editModeVal != "JsonObjectJsonArray") && (editModeVal != "JsonObject") && (editModeVal != "JsonArray")) {
            showText(responseElm, 'Invalid [' + editModeVal + '] EditMode [JsonObjectJsonArray|JsonObject|JsonArray]', 'red');
            valid = false;
        }
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
                "jsonEditorConfig": jsonSourceAppView,
                "jsonSource": jsonSource,
                "jsonKey": jsonKey,
                "editMode": editModeVal,
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

function refreshEditorJson(viewId, progressElmId, editModeVal, pageNo, pageNoArray, pageNoArrayItem, editorResponseElmId, editorTargetElmId, editorShowElmId, successCallback) {
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

        fillJsonEditor(viewId, progressElmId, responseElmId, jsonSourceAppSite, jsonSourceAppView, editModeVal, jsonSource, jsonKey, viewModeVal, jsonEditorTargetElmId, jsonEditorShowElmId, pageNo, pageNoArray, pageNoArrayItem, "", successCallback);
    }
}

function refreshEditorJsonArray(viewId, progressElmId, editModeVal, pageNo, pageNoArray, pageNoArrayItem, keyPath, successCallback) {

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

        fillJsonEditor(viewId, progressElmId, responseElmId, jsonSourceAppSite, jsonSourceAppView, editModeVal, jsonSource, jsonKey, viewModeVal, arrayTargetElmId, jsonEditorShowElmId, pageNo, pageNoArray, pageNoArrayItem, keyPath, successCallback);
    }
}

function refreshEditorJsonArrayItem(viewId, progressElmId, editModeVal, pageNo, pageNoArray, pageNoArrayItem, keyPath, successCallback) {

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

        fillJsonEditor(viewId, progressElmId, responseElmId, jsonSourceAppSite, jsonSourceAppView, editModeVal, jsonSource, jsonKey, viewModeVal, arrayItemTargetElmId, jsonEditorShowElmId, pageNo, pageNoArray, pageNoArrayItem, keyPath, successCallback);
    }
}



function saveEditorJson(el, viewId, progressElmId, getUpdateJson, refreshComponentName, successCallback) {

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

    const hasKeys = !!Object.keys(flatJsonData).length;
    if (hasKeys == true) {
        let flatJsonDataText = JSON.stringify(flatJsonData);

        if (typeof successCallback === "function") {
            saveJson(el, progressElmId, responseElmId,
                jsonSourceAppSite, jsonSourceAppView, jsonSource,
                flatJsonDataText, flatJsonDataText,
                refreshComponentName, {}, false, '', successCallback);
        } else {
            saveJson(el, progressElmId, responseElmId,
                jsonSourceAppSite, jsonSourceAppView, jsonSource,
                flatJsonDataText, flatJsonDataText,
                refreshComponentName, {}, false, '', '', function () {
                    refreshEditorJsonArray(viewId, progressElmId, pageNoCurrent, pageNoArray, keyPath, successCallback)
                });
        }
    } else {
        showText(responseElm, 'No Changed Json Found to Save', 'red');
    }
}

function cloneEditorJsonArray(el, viewId, progressElmId, pageNoCurrent, pageNoArray, pageNoArrayItem, keyPathJson, refreshComponentName, successCallback) {

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
                cloneJsonInJsonArray(el, progressElmId, responseElmId,
                    jsonSourceAppSite, jsonSourceAppView, jsonSource,
                    { 'KeyPath': keyPath + arrayIndex },
                    refreshComponentName, {}, false, '', '',
                    successCallback);
            }
            else {
                cloneJsonInJsonArray(el, progressElmId, responseElmId,
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

function deleteEditorJsonArray(el, viewId, progressElmId, pageNoCurrent, pageNoArray, pageNoArrayItem, keyPathJson, refreshComponentName, successCallback) {

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
                deleteJsonInJsonArray(el, progressElmId, responseElmId,
                    jsonSourceAppSite, jsonSourceAppView, jsonSource,
                    { 'KeyPath': keyPath + arrayIndex },
                    refreshComponentName, {},
                    false, '', '',
                    successCallback);
            } else {
                deleteJsonInJsonArray(el, progressElmId, responseElmId,
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

