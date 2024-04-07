
/******************************************************************************************************************/
//Arshu Web Components
/******************************************************************************************************************/

class ArshuView extends HTMLElement {
    constructor() {
        super()
        //const category = this.getAttribute("category")
        //const message = this.getAttribute("message")
        //this.innerHTML = `
        //<div>You've got an interesting message, from ${category} category:</div>
        //<div>${message}</div>`
    }
}

customElements.define('arshu-view', ArshuView);

////https://www.maxiferreira.com/blog/astro-page-transitions/
//navigation.addEventListener('navigate', (navigateEvent) => {
//    const url = new URL(navigateEvent.destination.url)

//    //console.log('EventListener:navigate:' + url);
//    //if (url.pathname.startsWith('/movies/')) {
//    //    navigateEvent.intercept({
//    //        async handler() {
//    //            const html = await getHTMLFragment(url.pathname)
//    //            updateTheDOMSomehow(html)
//    //        },
//    //    })
//    //navigateEvent.intercept({
//    //    async handler() {
//    //        const html = await getHTMLFragment(url.pathname)

//    //        // If the browser doesn't support this API, update the DOM as usual
//    //        if (!document.createDocumentTransition) {
//    //            updateTheDOMSomehow(html)
//    //            return
//    //        }

//    //        // Otherwise, update the DOM within a transition
//    //        const transition = document.createDocumentTransition()
//    //        transition.start(() => updateTheDOMSomehow(html))
//    //    },
//    //})
//    //}
//})

//async function getHTMLFragment(pathname) {
//    const response = await fetch(`/fragment${pathname}`)
//    return await response.text()
//}

//function updateTheDOMSomehow(html) {
//    document.getElementById('content').innerHTML = html
//}

/******************************************************************************************************************/
//Arshu Framework Base Utilities
/******************************************************************************************************************/

function setApiMetrics(result) {

    if (result.hasOwnProperty('AppSite') === true) {
        if (haveElm('dynamicAppSite') == true) {
            getElm('dynamicAppSite').value = result.AppSite
        }
    }
    if (result.hasOwnProperty('AppView') === true) {
        if (haveElm('dynamicAppView') == true) {
            getElm('dynamicAppView').value = result.AppView
        }
    }
    if (result.hasOwnProperty('AppFile') === true) {
        if (haveElm('dynamicAppFile') == true) {
            getElm('dynamicAppFile').value = result.AppFile
        }
    }

    if (result.hasOwnProperty('ConcurrentCount') === true) {
        if (haveElm('concurrentCount') == true) {
            getElm('concurrentCount').innerHTML = result.ConcurrentCount
        }
    }
    if (result.hasOwnProperty('LoginCount') === true) {
        if (haveElm('loginCount') == true) {
            getElm('loginCount').innerHTML = result.LoginCount
        }
    }
    if (result.hasOwnProperty('MemoryInfo') === true) {
        if (haveElm('memoryInfo') == true) {
            getElm('memoryInfo').innerHTML = result.MemoryInfo
        }
    }
    if (result.hasOwnProperty('WorkingSet') === true) {
        if (haveElm('workingSet') == true) {
            getElm('workingSet').innerHTML = result.WorkingSet
        }
    }
    if (result.hasOwnProperty('CPUTime') === true) {
        if (haveElm('cpuTime') == true) {
            getElm('cpuTime').innerHTML = result.CPUTime
        }
    }
    if (result.hasOwnProperty('GCInfo') === true) {
        if (haveElm('gcInfo') == true) {
            getElm('gcInfo').innerHTML = result.GCInfo
        }
    }
    if (haveElm('domCount') == true) {
        let domCount = document.getElementsByTagName('*').length
        getElm('domCount').innerHTML = domCount
    }

    if (haveElm('totalResources') == true) {
        let totalNoOfResources = window.performance.getEntriesByType("resource").length
        getElm('totalResources').innerHTML = totalNoOfResources
    }

    var debugInfo = ""
    if (result.hasOwnProperty('DebugInfo') === true) {
        window.debugInfo = JSON.stringify(result.DebugInfo)
    }
}

function executeScriptElements(containerElement) {

    if ((containerElement) && (containerElement.id != "")) {
        const scriptElements = containerElement.querySelectorAll("script")
        console.log('Found ' + scriptElements.length + ' scriptElements under container element [' + containerElement.id + ']')

        Array.from(scriptElements).forEach((scriptElement) => {
            const clonedElement = document.createElement("script")

            Array.from(scriptElement.attributes).forEach((attribute) => {
                clonedElement.setAttribute(attribute.name, attribute.value)
            })

            clonedElement.text = scriptElement.text

            scriptElement.parentNode.replaceChild(clonedElement, scriptElement)
            if (clonedElement.id != "") {
                console.log('Replacing scriptElement [' + clonedElement.id + ']')
            }

            if (clonedElement.id.length > 0) {
                let eventName = scriptElement.id + "Init"
                document.dispatchEvent(new Event(eventName))
                console.log('Triggering Event  [' + eventName + '] under scriptElement [' + scriptElement.id + '] for document Element')
            }
        })
    }
}

window.addEventListener('popstate', function (event) {
    if (clickRefresh == false) {
        //alert("Not Click Refresh location: " + document.location + ", state: " + JSON.stringify(event.state));
        let locationUrlHash = document.location.hash
        let idxOfHash = locationUrlHash.indexOf("#")
        if (idxOfHash > -1) {
            let hashLocation = locationUrlHash.substring(idxOfHash + 1)
            if (hashLocation.substring(0, 1) == "/") hashLocation = hashLocation.substring(1)
            let idxOfFirstSlash = hashLocation.indexOf("/")

            let newAppSite = "Index"
            let newAppView = "Main"

            if (idxOfFirstSlash > -1) {
                newAppSite = hashLocation.substring(0, idxOfFirstSlash)
                newAppView = hashLocation.substring(idxOfFirstSlash + 1)
            }

            let state = JSON.stringify(event.state)
            if (!state) {
                refreshViewHtml('progress', 'response', newAppSite, newAppView, '')
            } else {
                if ((state.hasOwnProperty("componentName") == true) && (state.hasOwnProperty("configJson") == true)) {
                    newComponentName = state.componentName
                    newConfigJson = state.configJson
                    newRealtimeRefresh = false
                    newRefreshAppDomain = ''
                    newRemoteKey = ''
                    if (state.hasOwnProperty("refreshAppDomain") == true) {
                        newRefreshAppDomain = state.refreshAppDomain
                    }
                    if (state.hasOwnProperty("isRealtime") == true) {
                        newRealtimeRefresh = state.isRealtime
                    }
                    if (state.hasOwnProperty("remoteKey") == true) {
                        newRemoteKey = state.remoteKey
                    }
                    refreshComponentHtml('progress', 'response', newAppSite, newAppView, newComponentName, newConfigJson, newRealtimeRefresh, newRefreshAppDomain, newRemoteKey)
                } else {
                    refreshViewHtml('progress', 'response', newAppSite, newAppView, '')
                }
            }

        } else {
            document.location.reload()
        }
    }
});

/******************************************************************************************************************/
//Arshu Framework Json Utilities
/******************************************************************************************************************/

let clickRefresh = true;
let defaultDelayInterval = 5000;
let globalWebSocketActive = false;

function getFlatJson(scopeElmId, scopePrefixList, skipEmptyValue) {

    let dataJson;

    let scopeElm = getElm(scopeElmId);
    if ((scopeElm) && (scopePrefixList)) {
        dataJson = new Object();

        const dataElmArray = Array.prototype.slice.apply(
            scopeElm.querySelectorAll("[data-key]")
        );

        dataElmArray.forEach((dataElm) => {
            let dataKeys = dataElm.getAttribute('data-key');
            let dataOriginalVal = dataElm.getAttribute('data-value');
            if (dataOriginalVal == null) dataOriginalVal = "";
            let dataCurrentValue = dataElm.value;
            let skipElm = false;
            let dataKey = "";

            if (scopePrefixList.length > 0) {
                skipElm = true;
                let scopePrefixArray = scopePrefixList.split(',');
                for (let i = 0; i < scopePrefixArray.length; i++) {
                    let scopeId = scopePrefixArray[i].toUpperCase();
                    let dataKeyArray = dataKeys.split(',');
                    for (let i = 0; i < dataKeyArray.length; i++) {
                        let dataKeyItem = dataKeyArray[i];
                        let dataScopeItem = dataKeyItem.substring(0, dataKeyItem.indexOf(".")).trim().toUpperCase();
                        let lastScopeIndex = dataScopeItem.lastIndexOf(scopeId);
                        if (dataScopeItem.lastIndexOf(scopeId) === dataScopeItem.length - scopeId.length) {
                            dataKey = dataKeyItem;
                            skipElm = false;
                            break;
                        }
                    }
                }
            }

            if (dataElm.nodeName.toUpperCase() == "INPUT") {
                let elmType = dataElm.getAttribute("type");
                if ((elmType) && (elmType.toLowerCase() == 'checkbox')) {
                    if ((dataOriginalVal.toLowerCase().indexOf('true') > -1)
                        || (dataOriginalVal.toLowerCase().indexOf('false') > -1)) {
                        if (dataOriginalVal.toLowerCase().indexOf('true') > -1) {
                            dataOriginalVal = true;
                        } else if (dataOriginalVal.toLowerCase().indexOf('false') > -1) {
                            dataOriginalVal = false;
                        }
                        if (dataOriginalVal != dataElm.checked) {
                            if (dataElm.checked == true) {
                                dataCurrentValue = dataCurrentValue.replace(/False/gi, 'True')
                            } else {
                                dataCurrentValue = dataCurrentValue.replace(/True/gi, 'False')
                            }
                        }
                    } else {
                        if (dataElm.checked == false) {
                            dataCurrentValue = "";
                        } else {
                            dataOriginalVal = "";
                        }
                    }
                }
            }

            if (skipEmptyValue === true) {
                if (dataCurrentValue.length == 0) {
                    skipElm = true;
                }
            }
            if ((dataKey != "") && (skipElm == false)) {
                if (dataElm.nodeName.toUpperCase() == "INPUT") {
                    let elmType = dataElm.getAttribute("type");

                    if (elmType.toLowerCase() == 'hidden') {
                        dataJson[dataKey] = dataCurrentValue;
                    }

                    if ((dataOriginalVal.length == 0)
                        || (dataOriginalVal != dataCurrentValue)
                    ) {

                        if ((elmType.toLowerCase() == 'text')
                            || (elmType.toLowerCase() == 'password')
                            || (elmType.toLowerCase() == 'apiUrl')
                            || (elmType.toLowerCase() == 'email')
                            || (elmType.toLowerCase() == 'week')
                            || (elmType.toLowerCase() == 'tel')
                            || (elmType.toLowerCase() == 'color')
                            || (elmType.toLowerCase() == 'range')
                            || (elmType.toLowerCase() == 'number')
                            || (elmType.toLowerCase() == 'datetime-local')
                            || (elmType.toLowerCase() == 'date')) {
                            dataJson[dataKey] = dataCurrentValue;
                        } else if (elmType.toLowerCase() == 'radio') {
                            if (dataElm.checked == true) {
                                dataJson[dataKey] = dataCurrentValue;
                            }
                        } else if (elmType.toLowerCase() == 'checkbox') {
                            if (dataElm.checked == true) {
                                if (dataJson.hasOwnProperty(dataKey)) {
                                    if (dataJson[dataKey].length > 0) {
                                        dataJson[dataKey] = dataJson[dataKey] + ",";
                                    }
                                    dataJson[dataKey] = dataJson[dataKey] + dataCurrentValue;
                                } else {
                                    dataJson[dataKey] = dataCurrentValue;
                                }
                            } else {
                                if (dataJson.hasOwnProperty(dataKey) == false) {
                                    dataJson[dataKey] = dataCurrentValue;
                                }
                            }
                        }
                    }
                }
                else if (dataElm.nodeName.toUpperCase() == "SELECT") {
                    if ((dataOriginalVal.length == 0) || (dataOriginalVal != dataCurrentValue)) {
                        dataJson[dataKey] = dataCurrentValue;
                    }
                }
                else if (dataElm.nodeName.toUpperCase() == "TEXTAREA") {
                    if ((dataOriginalVal.length == 0) || (dataOriginalVal != dataCurrentValue)) {
                        dataJson[dataKey] = dataCurrentValue;
                    }
                }
            }
        });

        let dataText = JSON.stringify(dataJson);
    } else {
        if (!scopePrefixList) {
            console.error('Scope Prefix List is empty for Scope Elm ID [' + scopeElmId + "]");
        }
    }

    return dataJson;
}

function validateFlatJson(responseElmId, scopeElmId, scopePrefixList, dataInfoJsonText, checkAttributeName, displayAttributeName) {
    let valid = true;
    let responseElm = getElm(responseElmId)

    let scopeElm = getElm(scopeElmId);
    if (scopeElm) {

        const dataElmArray = Array.prototype.slice.apply(
            scopeElm.querySelectorAll("[data-key]")
        );

        let jsonData = JSON.parse(dataInfoJsonText);
        for (let key in jsonData) {

            dataElmArray.forEach((dataElm) => {
                if (isDisplayNoneElm(dataElm) == false) {
                    if (valid == true) {
                        let dataKey = dataElm.getAttribute('data-key');
                        let dataValue = dataElm.value;
                        let dataChecker = dataElm.getAttribute(checkAttributeName);
                        let dataDisplay = dataElm.getAttribute(displayAttributeName);

                        let skipElm = false;
                        if (scopePrefixList.length > 0) {
                            skipElm = true;
                            let scopePrefixArray = scopePrefixList.split(',');
                            for (let i = 0; i < scopePrefixArray.length; i++) {
                                let scopeId = scopePrefixArray[i].toUpperCase();
                                if (dataKey.trim().toUpperCase().indexOf(scopeId) === 0) {
                                    skipElm = false;
                                    break;
                                }
                            }
                        }
                        if ((dataKey != "") && (skipElm == false)) {
                            if ((dataKey == key) && (dataChecker != null)) {
                                let idxOfStar = dataChecker.indexOf("*");
                                if (idxOfStar > -1) {
                                    if ((dataValue.length == 0) || (dataValue == 0)) {
                                        showText(responseElm, dataDisplay, 'red');
                                        valid = false;
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    return valid;
}

function updateFlatJson(responseElmId, updateScopeElmId, dataInfoJsonText) {
    let responseElm = getElm(responseElmId)
    let unmatchedJson = new Object();

    let updateScopeElm = getElm(updateScopeElmId);
    if (updateScopeElm) {
        let jsonData = JSON.parse(dataInfoJsonText);
        for (let key in jsonData) {
            let updateElm = updateScopeElm.querySelector("[data-key='" + key + "']");
            if (updateElm) {
                let updatedValue = jsonData[key];
                updateElm.value = updatedValue;
            } else {
                unmatchedJson[key] = "[data-key='" + key + "'] Tag Not found under Scope [" + updateScopeElmId + "]";
            }
        }
    } else {
        unmatchedJson["Error"] = "Update Scope Elm Not found [" + updateScopeElmId + "]";
    }
    return unmatchedJson;
}

function clearFlatJson(scopeElmId) {
    let scopeElm = getElm(scopeElmId);
    if ((scopeElm)) {
        const dataElmArray = Array.prototype.slice.apply(
            scopeElm.querySelectorAll("[data-key]")
        );

        dataElmArray.forEach((dataElm) => {
            if (dataElm.nodeName.toUpperCase() == "INPUT") {
                let elmType = dataElm.getAttribute("type");
                if ((elmType.toLowerCase() == 'text')
                    || (elmType.toLowerCase() == 'password')
                    || (elmType.toLowerCase() == 'apiUrl')
                    || (elmType.toLowerCase() == 'email')
                    || (elmType.toLowerCase() == 'week')
                    || (elmType.toLowerCase() == 'tel')
                    || (elmType.toLowerCase() == 'color')
                    || (elmType.toLowerCase() == 'range')
                    || (elmType.toLowerCase() == 'number')
                    || (elmType.toLowerCase() == 'datetime-local')
                    || (elmType.toLowerCase() == 'date')) {
                    dataElm.value = '';
                }
            } else if (dataElm.nodeName.toUpperCase() == "SELECT") {
                dataElm.selectedIndex = 0;
            }
            else if (dataElm.nodeName.toUpperCase() == "TEXTAREA") {
                dataElm.value = '';
            }
        });
    }
}

function refreshHtmlJson(jsonTagList, appSite, appView) {

    if (haveElm('dynamicAppSite')) {
        getElm('dynamicAppSite').value = appSite;
    }
    if (haveElm('dynamicAppView')) {
        getElm('dynamicAppView').value = appView;
    }

    for (let i = 0; i < jsonTagList.length; i++) {
        let jsonTag = jsonTagList[i];
        if (jsonTagList.length > 0) {
            if (typeof removeNavBarEvents === "function") {
                removeNavBarEvents();
            }
        }
        for (let key in jsonTag) {
            if (jsonTag.hasOwnProperty(key)) {
                //if ((key != "RootDomain") && (key != "AppDomain")) {
                if (haveElm(key) == true) {
                    let tagNode = getElm(key);
                    if (tagNode) {
                        if (key.toLocaleLowerCase().indexOf('main') == -1) {
                            //Append the New Html Element
                            tagNode.insertAdjacentHTML('beforeBegin', jsonTag[key]);
                            var new_elem = tagNode.previousSibling;
                            tagNode.parentElement.removeChild(tagNode);
                            if ((new_elem.innerHTML) && (new_elem.innerHTML.trim().length > 0)) {
                                executeScriptElements(new_elem);
                                if (typeof bindArshuAction === "function") {
                                    bindArshuAction(new_elem);
                                }
                            }
                        } else {
                            //Append the New Html Element
                            tagNode.innerHTML = jsonTag[key];
                            if ((tagNode.innerHTML) && (tagNode.innerHTML.trim().length > 0)) {
                                executeScriptElements(tagNode);
                                if (typeof bindArshuAction === "function") {
                                    bindArshuAction(tagNode);
                                }
                            }
                        }
                    }
                }
                //}
            }
        }
    }

    if (jsonTagList.length > 0) {
        if (typeof initNavBar === "function") {
            initNavBar();
        }

    }
}

/******************************************************************************************************************/
//Arshu Framework Component Utilities
/******************************************************************************************************************/

function clearResponse(responseElmId) {

    let responseContainerElmId = responseElmId + "Container";
    let responseElm;
    let responseContainerElm;
    if (haveElm(responseElmId) == true) {
        responseElm = getElm(responseElmId);
        while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
        responseContainerElm = getElm(responseContainerElmId)
        hideElm(responseContainerElmId);
    }

    return responseElm;
}

function callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, componentAppSite, componentAppView, componentName, appComponentName) {
    let responseElm = clearResponse(responseElmId);
    let apiMessage = "";

    if ((isRealtime === false) || (typeof callWSApi !== "function")) {

        apiMessage = "Calling Direct Ajax Api Method " + apiMethod + " for Retrieving Component [" + componentName + "] in [" + componentAppSite + "/" + componentAppView + "] after modifying App Component [" + appComponentName + "]";
        console.log(apiMessage);

        let restApiUrl = apiUrl + '/' + apiMethod;
        let restApiParam = apiParams;
        dopost(progressElmId, responseElmId, restApiUrl, restApiParam,
            function (data) {
                if (((data.hasOwnProperty('Result') === true) && (data.Result))) {
                    let result = data.Result;
                    processReturn(result, responseElmId, successCallback, failureCallback);
                    setApiMetrics(result);
                }               
                if (data.hasOwnProperty('ErrorMessage') === true) {
                    let errorMessage = data.ErrorMessage;
                    if ((errorMessage.length > 0) && (haveElm(responseElmId) == true)) {
                        showText(responseElm, errorMessage, 'red');
                    }
                }
                else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                    let error = data.Error;
                    if (error) {
                        if (error.hasOwnProperty('Message') === true) {
                            if (haveElm(responseElmId) == true) {
                                showText(responseElm, error.Message, 'red');
                            }
                        }
                    }
                }
            }, failureCallback, clientRequestTimestamp);

    }
    else {
        if ((isRealtime === true) && (globalWebSocketActive == true) && (typeof callWSApi === "function")) {

            apiMessage = "Calling Direct WS Api Method " + apiMethod + " for Retrieving Component [" + componentName + "] in [" + componentAppSite + "/" + componentAppView + "] after modifying App Component [" + appComponentName + "]";
            console.log(apiMessage);

            callWSApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams,
                function (data) {
                    if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
                        let result = data.Result;
                        processReturn(result, responseElmId, successCallback);
                        setApiMetrics(result);
                    }
                    if (data.hasOwnProperty('ErrorMessage') === true) {
                        let errorMessage = data.ErrorMessage;
                        if ((errorMessage.length > 0) && (haveElm(responseElmId) == true)) {
                            showText(responseElm, errorMessage, 'red');
                        }
                    }
                    else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                        let error = data.Error;
                        if (error) {
                            if (error.hasOwnProperty('Message') === true) {
                                if (haveElm(responseElmId) == true) {
                                    showText(responseElm, error.Message, 'red');
                                }
                            }
                        }
                    }
                }, null, clientRequestTimestamp, realtimeDomain);

        } else {

            let delayInterval = 0;
            if ((isRealtime === true) && (globalWebSocketActive == false)) {
                //dogetHtml?
                doget(progressElmId, responseElmId, "/EchoInfo", function () {
                    console.log("Called '/EchoInfo' to start the Server");
                    if (typeof restartWebSocketConnection === "function") {
                        restartWebSocketConnection();
                    }
                });
                delayInterval = defaultDelayInterval;
            }

            delayUntil(delayInterval, function () { return globalWebSocketActive; }).then(() => {
                if (globalWebSocketActive == false) {

                    apiMessage = "Calling Delayed Ajax Api Method " + apiMethod + " for Retrieving Component [" + componentName + "] in [" + componentAppSite + "/" + componentAppView + "] after modifying App Component [" + appComponentName + "]";
                    console.log(apiMessage);

                    let restApiUrl = apiUrl + '/' + apiMethod;
                    let restApiParam = apiParams;
                    dopost(progressElmId, responseElmId, restApiUrl, restApiParam,
                        function (data) {
                            if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
                                let result = data.Result;
                                processReturn(result, responseElmId, successCallback);
                                setApiMetrics(result);
                            }
                            if (data.hasOwnProperty('ErrorMessage') === true) {
                                let errorMessage = data.ErrorMessage;
                                if ((errorMessage.length > 0) && (haveElm(responseElmId) == true)) {
                                    showText(responseElm, errorMessage, 'red');
                                }
                            }
                            else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                                let error = data.Error;
                                if (error) {
                                    if (error.hasOwnProperty('Message') === true) {
                                        if (haveElm(responseElmId) == true) {
                                            showText(responseElm, error.Message, 'red');
                                        }
                                    }
                                }
                            }
                        }, null, clientRequestTimestamp);

                }
                else {
                    if ((isRealtime === true) && (typeof callWSApi === "function")) {

                        apiMessage = "Calling Delayed WS Api Method " + apiMethod + " for Retrieving Component [" + componentName + "] in [" + componentAppSite + "/" + componentAppView + "] after modifying App Component [" + appComponentName + "]";
                        console.log(apiMessage);

                        callWSApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams,
                            function (data) {
                                if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
                                    let result = data.Result;
                                    processReturn(result, responseElmId, successCallback);
                                    setApiMetrics(result);
                                }
                                if (data.hasOwnProperty('ErrorMessage') === true) {
                                    let errorMessage = data.ErrorMessage;
                                    if ((errorMessage.length > 0) && (haveElm(responseElmId) == true)) {
                                        showText(responseElm, errorMessage, 'red');
                                    }
                                }
                                else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                                    let error = data.Error;
                                    if (error) {
                                        if (error.hasOwnProperty('Message') === true) {
                                            if (haveElm(responseElmId) == true) {
                                                showText(responseElm, error.Message, 'red');
                                            }
                                        }
                                    }
                                }
                            }, null, clientRequestTimestamp, realtimeDomain);
                    }
                }
            });

        }
    }

}

function refreshViewHtml(progressElmId, responseElmId, appSite, appView, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime());
    let responseElm = clearResponse(responseElmId)

    clickRefresh = true;

    let valid = true;

    if (valid === true) {

        let apiUrl = '/AppApi/HtmlApi';
        let apiMethod = 'GetViewHtml';

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let refreshInfo = {
            "componentName": componentName,
            "configJson": configJson,
            "isRealtime": isRealtime,
            "realtimeDomain": realtimeDomain
        }

        let apiParams = {
            "viewInfo": viewInfo,
            "refreshInfo": refreshInfo
        }

        let processReturn = function (result, responseElmId, successCallback) {

            let responseElm = getElm(responseElmId);

            if (result.hasOwnProperty('error') === true) {
                if (haveElm(responseElmId) == true) {
                    showText(responseElm, result.error, 'red');
                }
            }
            else if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    if (typeof changeContextPage === "function") {
                        changeContextPage(appSite, appView);
                    }

                    let jsonTagList = result.json;
                    refreshHtmlJson(jsonTagList, appSite, appView);

                    if (typeof successCallback === "function") {
                        successCallback(result.json);
                    }
                    else if (window.hasOwnProperty(successCallback) == true) {
                        window[successCallback]();
                    }

                    clickRefresh = false;
                } else {
                    if (typeof successCallback === "function") {
                        successCallback(result.message);
                    }
                    else if (window.hasOwnProperty(successCallback) == true) {
                        window[successCallback]();
                    }
                }
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, "");
    }

    return false;
}

function refreshComponentHtml(progressElmId, responseElmId, appSite, appView, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime());
    let responseElm = clearResponse(responseElmId)

    let valid = true;

    if (valid === true) {

        let apiUrl = '/AppApi/HtmlApi';
        let apiMethod = 'GetComponentHtml';

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let refreshInfo = {
            "componentName": componentName,
            "configJson": configJson,
            "isRealtime": isRealtime,
            "realtimeDomain": realtimeDomain
        };

        let apiParams = {
            "viewInfo": viewInfo,
            "refreshInfo": refreshInfo
        };

        let processReturn = function (result, responseElmId, successCallback) {

            let responseElm = getElm(responseElmId);

            if (result.hasOwnProperty('error') === true) {
                if (haveElm(responseElmId) == true) {
                    showText(responseElm, result.error, 'red');
                }
            }
            else if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json;
                    refreshHtmlJson(jsonTagList, appSite, appView);

                    if (typeof changeContextPage === "function") {
                        changeContextPage(appSite, appView);
                    }

                    if (typeof successCallback === "function") {
                        successCallback(result.json);
                    }
                    else if (window.hasOwnProperty(successCallback) == true) {
                        window[successCallback]();
                    }

                    //if (getType(configJson) == "Object") {
                    //    if (isRealtime == true) {
                    //        configJson["DefaultRealtime"] = isRealtime;
                    //        configJson["DefaultRealtimeDomain"] = realtimeDomain;
                    //    }
                    //}

                    //const apiUrl = new URL(window.location);
                    //const state = {
                    //    'componentName': componentName,
                    //    'configJson': configJson,
                    //    'isRealtime': isRealtime,
                    //    'realtimeDomain': realtimeDomain
                    //}
                    //window.history.pushState(state, '', apiUrl);
                    //clickRefresh = false;
                }
                else {
                    if (typeof successCallback === "function") {
                        successCallback(result.message);
                    }
                    else if (window.hasOwnProperty(successCallback) == true) {
                        window[successCallback]();
                    }
                }
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, "");
    }

    return false;
}

function loadComponentHtml(progressElmId, responseElmId, appSite, appView, componentName, configJson, isRealtime, realtimeDomain, delayInterval, forceReLoad, successCallback) {

    if (haveElm(componentName) == true) {

        let clientRequestTimestamp = Math.floor(new Date().getTime());

        if ((haveElm('dynamicAppSite') == true) && (appSite == "")) {
            appSite = getElm('dynamicAppSite').value;
        }

        if ((haveElm('dynamicAppView') == true) && (appView == "")) {
            currentAppView = getElm('dynamicAppView').value;
        }

        let loadElm = getElm(componentName);
        if ((loadElm.textContent.trim() === '') || (forceReLoad == true)) {

            if (isRealtime === false) {
                refreshComponentHtml(progressElmId, responseElmId, appSite, appView, componentName, configJson, isRealtime, realtimeDomain,
                    function (result) {
                        if (typeof successCallback === "function") {
                            successCallback(result);
                        }
                        else if (window.hasOwnProperty(successCallback) == true) {
                            window[successCallback]();
                        }
                    }, clientRequestTimestamp);
            } else {
                window.setTimeout(() => {
                    refreshComponentHtml(progressElmId, responseElmId, appSite, appView, componentName, configJson, isRealtime, realtimeDomain,
                        function (result) {
                            if (typeof successCallback === "function") {
                                successCallback(result);
                            }
                            else if (window.hasOwnProperty(successCallback) == true) {
                                window[successCallback]();
                            }
                        }, clientRequestTimestamp);
                }, delayInterval);
            }
        } else {
            alert('Found Content in Element which is being loaded with View Component [' + componentName + "] and ForceLoad is false, hence skiping");
        }
    }
}

function filterComponentHtml(progressElmId, responseElmId, appSite, appView, getFilterJson, componentName, configJson, isRealtime, realtimeDomain, successCallback) {

    let filterConfigJson = getJsonValue(configJson, {});
    let flatJsonData = getJsonValue(getFilterJson, {});

    let filterKeyJson = new Object();
    for (let key in flatJsonData) {
        filterKeyJson[key] = flatJsonData[key];
    }
    filterConfigJson["Filter"] = filterKeyJson;

    return refreshComponentHtml(progressElmId, responseElmId, appSite, appView, componentName, filterConfigJson, isRealtime, realtimeDomain, successCallback)
}

/******************************************************************************************************************/
//Arshu Framework Json Functions
/******************************************************************************************************************/

function saveJson(progressElmId, responseElmId, appSite, appView, appComponentName, getKeyJson, getSaveJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime());
    let responseElm = clearResponse(responseElmId)

    let valid = true;

    let keyInfoJson = getJsonValue(getKeyJson);
    let dataInfoJson = getJsonValue(getSaveJson);

    if ((!keyInfoJson) || (Array.isArray(keyInfoJson) == false)) {
        showText(responseElm, 'Json Key to Save is Empty', 'red');
        valid = false;
    }

    if ((!dataInfoJson) || (Array.isArray(dataInfoJson) == false)) {
        showText(responseElm, 'Json Data to Save is Empty', 'red');
        valid = false;
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi';
        let apiMethod = "SaveJson";

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let saveInfo = {
            "appComponentName": appComponentName,
            "keyInfoJson": keyInfoJson,
            "dataInfoJson": dataInfoJson
        }

        let refreshInfo = {
            "componentName": componentName,
            "configJson": configJson,
            "isRealtime": isRealtime,
            "realtimeDomain": realtimeDomain
        }

        let apiParams = {
            "viewInfo": viewInfo,
            "saveInfo": saveInfo,
            "refreshInfo": refreshInfo
        }

        let processReturn = function (result, responseElmId, successCallback) {

            let responseElm = getElm(responseElmId);

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json;
                    refreshHtmlJson(jsonTagList, appSite, appView);
                }

                if (typeof successCallback === "function") {
                    successCallback(result.message);
                }
                else if (window.hasOwnProperty(successCallback) == true) {
                    window[successCallback]();
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red');
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, appComponentName);
    }
    return false;
}

function addJsonToJsonArray(progressElmId, responseElmId, appSite, appView, appComponentName, getKeyJson, getAddJson, getValidKeyJson, getDuplicateKeyJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime());
    let responseElm = clearResponse(responseElmId)

    let valid = true;

    let keyInfoJson = getJsonValue(getKeyJson);
    let dataInfoJson = getJsonValue(getAddJson);
    let validKeyJson = getJsonValue(getValidKeyJson);
    let duplicateKeyJson = getJsonValue(getDuplicateKeyJson);

    const hasKeys = !!Object.keys(keyInfoJson).length;
    if (hasKeys == false) {
        showText(responseElm, 'No Key Json Set to Clone', 'red');
        valid = false;
    }

    let isEmptyValue = true;
    let allowEmptyVal = true;
    for (let validKey in validKeyJson) {
        allowEmptyVal = false;
    }
    for (let key in dataInfoJson) {
        if (key != "") {
            if (dataInfoJson.hasOwnProperty(key)) {
                if (dataInfoJson[key].length == 0) {
                    if (allowEmptyVal == false) {
                        let idxLastDot = key.lastIndexOf(".");
                        let keyName = key.substring(idxLastDot + 1);
                        showText(responseElm, keyName + ' is empty', 'red');
                    }
                    isEmptyValue = true;
                    break;
                } else {
                    isEmptyValue = false;
                }
            }
        }
    }

    if ((isEmptyValue == true) && (allowEmptyVal == false)) {
        showText(responseElm, 'Found Empty Values when Allow Empty Value is False', 'red');
        valid = false;
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi';
        let apiMethod = 'AddJsonToJsonArray';

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let addInfo = {
            "appComponentName": appComponentName,
            "keyInfoJson": keyInfoJson,
            "dataInfoJson": dataInfoJson,
            "validKeyJson": validKeyJson,
            "duplicateKeyJson": duplicateKeyJson
        }

        let refreshInfo = {
            "componentName": componentName,
            "configJson": configJson,
            "isRealtime": isRealtime,
            "realtimeDomain": realtimeDomain
        }

        let apiParams = {
            "viewInfo": viewInfo,
            "addInfo": addInfo,
            "refreshInfo": refreshInfo
        }

        let processReturn = function (result, responseElmId, successCallback) {

            let responseElm = getElm(responseElmId);

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json;
                    refreshHtmlJson(jsonTagList, appSite, appView);
                }

                if (typeof successCallback === "function") {
                    successCallback(result.message);
                }
                else if (window.hasOwnProperty(successCallback) == true) {
                    window[successCallback]();
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red');
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, appComponentName);
    }
    return false;
}

function editJsonInJsonArray(progressElmId, responseElmId, appSite, appView, appComponentName, getKeyJson, getEditJson, getValidKeyJson, getDuplicateKeyJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime());
    let responseElm = clearResponse(responseElmId)

    let valid = true;

    let keyInfoJson = getJsonValue(getKeyJson);
    let dataInfoJson = getJsonValue(getEditJson);
    let validKeyJson = getJsonValue(getValidKeyJson);
    let duplicateKeyJson = getJsonValue(getDuplicateKeyJson);


    const hasKeys = !!Object.keys(keyInfoJson).length;
    if (hasKeys == false) {
        showText(responseElm, 'No Key Json Set to Clone', 'red');
        valid = false;
    }

    let isEmptyValue = true;
    let allowEmptyVal = true;

    for (let validKey in validKeyJson) {
        allowEmptyVal = false;
    }

    for (let key in dataInfoJson) {
        if (key != "") {
            if (dataInfoJson.hasOwnProperty(key)) {
                if (dataInfoJson[key].length == 0) {
                    if (allowEmptyVal == false) {
                        let idxLastDot = key.lastIndexOf(".");
                        let keyName = key.substring(idxLastDot + 1);
                        showText(responseElm, keyName + ' is empty', 'red');
                    }
                    isEmptyValue = true;
                    break;
                } else {
                    isEmptyValue = false;
                }
            }
        }
    }

    if ((isEmptyValue == true) && (allowEmptyVal == false)) {

        valid = false;
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi';
        let apiMethod = 'EditJsonInJsonArray';

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let editInfo = {
            "appComponentName": appComponentName,
            "keyInfoJson": keyInfoJson,
            "dataInfoJson": dataInfoJson,
            "validKeyJson": validKeyJson,
            "duplicateKeyJson": duplicateKeyJson
        }

        let refreshInfo = {
            "componentName": componentName,
            "configJson": configJson,
            "isRealtime": isRealtime,
            "realtimeDomain": realtimeDomain
        }

        let apiParams = {
            "viewInfo": viewInfo,
            "editInfo": editInfo,
            "refreshInfo": refreshInfo
        }

        let processReturn = function (result, responseElmId, successCallback) {

            let responseElm = getElm(responseElmId);

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json;
                    refreshHtmlJson(jsonTagList, appSite, appView);
                }

                if (typeof successCallback === "function") {
                    successCallback(result.message);
                }
                else if (window.hasOwnProperty(successCallback) == true) {
                    window[successCallback]();
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red');
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, appComponentName);
    }
    return false;
}

function deleteJsonInJsonArray(progressElmId, responseElmId, appSite, appView, appComponentName, getKeyJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime());
    let responseElm = clearResponse(responseElmId)

    let valid = true;

    let keyInfoJson = getJsonValue(getKeyJson);

    const hasKeys = !!Object.keys(keyInfoJson).length;
    if (hasKeys == false) {
        showText(responseElm, 'No Key Json Set to Clone', 'red');
        valid = false;
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi';
        let apiMethod = 'DeleteJsonInJsonArray';

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let deleteInfo = {
            "appComponentName": appComponentName,
            "keyInfoJson": keyInfoJson
        }

        let refreshInfo = {
            "componentName": componentName,
            "configJson": configJson,
            "isRealtime": isRealtime,
            "realtimeDomain": realtimeDomain
        }

        let apiParams = {
            "viewInfo": viewInfo,
            "deleteInfo": deleteInfo,
            "refreshInfo": refreshInfo
        }

        let processReturn = function (result, responseElmId, successCallback) {

            let responseElm = getElm(responseElmId);

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json;
                    refreshHtmlJson(jsonTagList, appSite, appView);
                }

                if (typeof successCallback === "function") {
                    successCallback(result.message);
                }
                else if (window.hasOwnProperty(successCallback) == true) {
                    window[successCallback]();
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red');
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, appComponentName);
    }
    return false;
}

function cloneJsonInJsonArray(progressElmId, responseElmId, appSite, appView, appComponentName, getKeyJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime());
    let responseElm = clearResponse(responseElmId)

    let valid = true;

    let keyInfoJson = getJsonValue(getKeyJson);

    const hasKeys = !!Object.keys(keyInfoJson).length;
    if (hasKeys == false) {
        showText(responseElm, 'No Key Json Set to Clone', 'red');
        valid = false;
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi';
        let apiMethod = 'CloneJsonInJsonArray';

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let cloneInfo = {
            "appComponentName": appComponentName,
            "keyInfoJson": keyInfoJson
        }

        let refreshInfo = {
            "componentName": componentName,
            "configJson": configJson,
            "isRealtime": isRealtime,
            "realtimeDomain": realtimeDomain
        }

        let apiParams = {
            "viewInfo": viewInfo,
            "cloneInfo": cloneInfo,
            "refreshInfo": refreshInfo
        }

        let processReturn = function (result, responseElmId, successCallback) {

            let responseElm = getElm(responseElmId);

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json;
                    refreshHtmlJson(jsonTagList, appSite, appView);
                }

                if (typeof successCallback === "function") {
                    successCallback(result.message);
                }
                else if (window.hasOwnProperty(successCallback) == true) {
                    window[successCallback]();
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red');
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, appComponentName);
    }
    return false;
}

/******************************************************************************************************************/
//Arshu Framework Bind Utilities
/******************************************************************************************************************/

var stringConstructor = "test".constructor;
var arrayConstructor = [].constructor;
var objectConstructor = ({}).constructor;

function getType(object) {
    if (object === null) {
        return "null";
    }
    if (object === undefined) {
        return "undefined";
    }
    if (object.constructor === stringConstructor) {
        return "String";
    }
    if (object.constructor === arrayConstructor) {
        return "Array";
    }
    if (object.constructor === objectConstructor) {
        return "Object";
    }
    {
        return "don't know";
    }
}

function getIntValue(getDataText, defaultText = 0) {

    let dataInt = parseInt(defaultText);

    let dataText = "";
    if (getDataText != null) {
        if (typeof window[getDataText] === "function") {
            dataText = window[getDataText]();
        } else {
            dataText = getDataText;
        }
    }
    if (dataText != "") {
        dataInt = parseInt(dataText);
    }

    return dataInt;
}

function getTextValue(getDataText, defaultText = "") {

    let dataText = defaultText;

    if (getDataText != null) {
        if (typeof window[getDataText] === "function") {
            dataText = window[getDataText]();
        } else {
            dataText = getDataText;
        }
    }

    return dataText;
}

function getBoolValue(getDataBool, defaultBool = false) {

    let isBool = defaultBool;

    if (typeof window[getDataBool] === "function") {
        isBool = window[getDataBool]();
    }
    else {
        isBool = getDataBool;
    }
    if ((isBool === true) || (isBool === "true")) {
        isBool = true;
    }
    else if ((isBool === false) || (isBool === "false")) {
        isBool = false;
    }
    if (!isBool) {
        isBool = defaultBool;
    }

    return isBool;
}

function getJsonValue(getDataJson) {

    let jsonData = {};

    if (getDataJson != null) {
        if (typeof window[getDataJson] === "function") {
            let getJsonData = window[getDataJson]();
            const hasKeys = !!Object.keys(getJsonData).length;
            if (hasKeys == true) {
                jsonData = getJsonData;
            } else {
                let jsonText = JSON.stringify(getJsonData);
                jsonData = JSON.parse(jsonText);
            }
        } else {
            let getJsonData = getDataJson;
            if (
                typeof getJsonData === 'object' &&
                !Array.isArray(getJsonData) &&
                getJsonData !== null
            ) {
                let jsonText = JSON.stringify(getJsonData);
                jsonData = JSON.parse(jsonText);
            } else {
                let jsonText = getJsonData.replace(/'/g, "\"");
                jsonData = JSON.parse(jsonText);
            }
        }
    }

    return jsonData
}

function getProgress(el) {
    let dataProgressElmId = getAttributeValue(el, 'data-progress');    
    let dataProgress = getTextValue(dataProgressElmId, 'noprogress');
    return dataProgress;
}

function getResponse(el) {
    let dataResponseElmId = getAttributeValue(el, 'data-response');
    let dataResponse = getTextValue(dataResponseElmId, 'noresponse');
    return dataResponse;
}

function getAppSite(el) {

    let currentAppSite = '';
    if (haveElm('dynamicAppSite')) {
        currentAppSite = getElm('dynamicAppSite').value;
    }

    let dataAppSite = getTextValue(getAttributeValue(el, 'data-appsite'), currentAppSite);
    return dataAppSite;
}

function getAppView(el) {

    let currentAppView = '';
    if (haveElm('dynamicAppView')) {
        currentAppView = getElm('dynamicAppView').value;
    }

    let dataAppView = getTextValue(getAttributeValue(el, 'data-appview'), currentAppView);
    return dataAppView;
}

function getAttributeValue(elm, attrName) {

    let elmAttrVal = elm.getAttribute(attrName);

    if (!elmAttrVal) {
        let parentElm = elm.parentElement;
        if (parentElm != null) {
            elmAttrVal = parentElm.getAttribute(attrName);
            if (!elmAttrVal) {
                let parentParentElm = parentElm.parentElement
                if (parentParentElm != null) {
                    elmAttrVal = parentParentElm.getAttribute(attrName)
                    if (!elmAttrVal) {
                        let parentParentParentElm = parentParentElm.parentElement
                        if (parentParentParentElm != null) {
                            elmAttrVal = parentParentParentElm.getAttribute(attrName)
                        }
                    }
                }
            }
        }
    }

    return elmAttrVal
}

/******************************************************************************************************************/
//Arshu Framework Bind Functions
/******************************************************************************************************************/

function bindShowComponentSourceViewer(event) {
    const el = event.target

    let dataProgress = getProgress(el);
    let dataResponse = getResponse(el);
    let dataAppSite = getAppSite(el);
    let dataAppView = getAppView(el);

    let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
    let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
    let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
    let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

    let dataDelay = getIntValue(getAttributeValue(el, 'data-delay'), 25);

    let dataPreCall = getAttributeValue(el, 'data-precall');
    let dataCallback = getAttributeValue(el, 'data-callback');

    if (getType(dataConfigJson) == "Object") {
        dataConfigJson["DefaultRealtime"] = isRealtime;
        dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
    }

    if ((dataComponent != "") && (dataComponent != "")) {

        if ((dataPreCall) || (dataPreCall != "")) {
            if (typeof dataPreCall === "function") {
                successCallback();
            }
            else if (window.hasOwnProperty(dataPreCall) == true) {
                window[dataPreCall]();
            }
        }

        window["showComponentSourceViewer"](dataProgress, dataAppSite, dataAppView, dataComponent, true, dataCallback);
    }
}

function bindShowComponentSourceEditor(event) {
    const el = event.target;

    let dataProgress = getProgress(el);
    let dataResponse = getResponse(el);
    let dataAppSite = getAppSite(el);
    let dataAppView = getAppView(el);

    let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
    let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
    let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
    let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

    let dataDelay = getIntValue(getAttributeValue(el, 'data-delay'), 25);

    let dataPreCall = getAttributeValue(el, 'data-precall');
    let dataCallback = getAttributeValue(el, 'data-callback');

    if (getType(dataConfigJson) == "Object") {
        dataConfigJson["DefaultRealtime"] = isRealtime;
        dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
    }

    if ((dataComponent != "") && (dataComponent != "")) {

        if ((dataPreCall) || (dataPreCall != "")) {
            if (typeof dataPreCall === "function") {
                successCallback();
            }
            else if (window.hasOwnProperty(dataPreCall) == true) {
                window[dataPreCall]();
            }
        }

        window["showComponentSourceEditor"](dataProgress, dataAppSite, dataAppView, dataComponent, true, dataCallback);
    }
}

function bindRefreshViewHtml(event) {
    const el = event.target;

    let dataProgress = getProgress(el);
    let dataResponse = getResponse(el);
    let dataAppSite = getAppSite(el);
    let dataAppView = getAppView(el);

    let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
    let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
    let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
    let href = getAttributeValue(el, 'href');
    if (href.length == 1) {
        if (href[0] == "#") {
            isRealtime = true;
        }
    }    

    let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

    let dataCallback = getAttributeValue(el, 'data-callback');

    if (getType(dataConfigJson) == "Object") {
        dataConfigJson["DefaultRealtime"] = isRealtime;
        dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
    }

    if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
        window["refreshViewHtml"](dataProgress, dataResponse, dataAppSite, dataAppView, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback);
    }
}

function bindLoadComponentHtml(element) {
    const el = element;

    let dataProgress = getProgress(el);
    let dataResponse = getResponse(el);
    let dataAppSite = getAppSite(el);
    let dataAppView = getAppView(el);

    let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
    let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
    let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
    let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

    let dataDelay = getIntValue(getAttributeValue(el, 'data-delay'), 25);

    let dataCallback = getAttributeValue(el, 'data-callback');

    if (getType(dataConfigJson) == "Object") {
        dataConfigJson["DefaultRealtime"] = isRealtime;
        dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
    }

    if ((dataComponent != "") && (dataComponent != "")) {
        window["loadComponentHtml"](dataProgress, dataResponse, dataAppSite, dataAppView, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataDelay, false, dataCallback);
    }
}

function bindRefreshComponentHtml(event) {
    let el = event.target;
    if (el.nodeName != "BUTTON") {
        el = el.parentNode;
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el);
        let dataResponse = getResponse(el);
        let dataAppSite = getAppSite(el);
        let dataAppView = getAppView(el);

        let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
        let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
        let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
        let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

        let dataCallback = getAttributeValue(el, 'data-callback');

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime;
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["refreshComponentHtml"](dataProgress, dataResponse, dataAppSite, dataAppView, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback);
        }
    }
}

function bindFilterComponentHtml(event) {
    let el = event.target;
    if (el.nodeName != "BUTTON") {
        el = el.parentNode;
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el);
        let dataResponse = getResponse(el);
        let dataAppSite = getAppSite(el);
        let dataAppView = getAppView(el);

        let dataFilterJson = getJsonValue(getAttributeValue(el, 'data-filter'));

        let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
        let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
        let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
        let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

        let dataCallback = getAttributeValue(el, 'data-callback');

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime;
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["filterComponentHtml"](dataProgress, dataResponse, dataAppSite, dataAppView, dataFilterJson, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback);
        }
    }
}

function bindSaveJson(event) {
    let el = event.target;
    if (el.nodeName != "BUTTON") {
        el = el.parentNode;
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el);
        let dataResponse = getResponse(el);
        let dataAppSite = getAppSite(el);
        let dataAppView = getAppView(el);

        let dataAppComponent = getTextValue(getAttributeValue(el, 'data-appcomponent'));
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo');

        let getSaveJson = getAttributeValue(el, 'data-datainfo');

        let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
        let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
        let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
        let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

        let dataCallback = getAttributeValue(el, 'data-callback');

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime;
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["saveJson"](dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, getSaveJson, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback);
        }
    }
}

function bindAddJsonToJsonArray(event) {
    let el = event.target;
    if (el.nodeName != "BUTTON") {
        el = el.parentNode;
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el);
        let dataResponse = getResponse(el);
        let dataAppSite = getAppSite(el);
        let dataAppView = getAppView(el);

        let dataAppComponent = getTextValue(getAttributeValue(el, 'data-appcomponent'));
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo');

        let getAddJson = getAttributeValue(el, 'data-datainfo');
        let getValidKeyJson = getAttributeValue(el, 'data-validkeyinfo');
        let getDuplicateKeyJson = getAttributeValue(el, 'data-duplicatekeyinfo');

        let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
        let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
        let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
        let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

        let dataCallback = getAttributeValue(el, 'data-callback');

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime;
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["addJsonToJsonArray"](dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, getAddJson, getValidKeyJson, getDuplicateKeyJson, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback);
        }
    }
}

function bindEditJsonInJsonArray(event) {
    let el = event.target;
    if (el.nodeName != "BUTTON") {
        el = el.parentNode;
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el);
        let dataResponse = getResponse(el);
        let dataAppSite = getAppSite(el);
        let dataAppView = getAppView(el);

        let dataAppComponent = getTextValue(getAttributeValue(el, 'data-appcomponent'));
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo');

        let getEditJson = getAttributeValue(el, 'data-datainfo');
        let getValidKeyJson = getAttributeValue(el, 'data-validkeyinfo');
        let getDuplicateKeyJson = getAttributeValue(el, 'data-duplicatekeyinfo');

        let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
        let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
        let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
        let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

        let dataCallback = getAttributeValue(el, 'data-callback');

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime;
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["editJsonInJsonArray"](dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, getEditJson, getValidKeyJson, getDuplicateKeyJson, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback);
        }
    }
}

function bindDeleteJsonInJsonArray(event) {
    let el = event.target;
    if (el.nodeName != "BUTTON") {
        el = el.parentNode;
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el);
        let dataResponse = getResponse(el);
        let dataAppSite = getAppSite(el);
        let dataAppView = getAppView(el);

        let dataAppComponent = getTextValue(getAttributeValue(el, 'data-appcomponent'));
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo');

        let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
        let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
        let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
        let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

        let dataCallback = getAttributeValue(el, 'data-callback');

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime;
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["deleteJsonInJsonArray"](dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback);
        }
    }
}

function bindCloneJsonInJsonArray(event) {
    let el = event.target;
    if (el.nodeName != "BUTTON") {
        el = el.parentNode;
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el);
        let dataResponse = getResponse(el);
        let dataAppSite = getAppSite(el);
        let dataAppView = getAppView(el);

        let dataAppComponent = getTextValue(getAttributeValue(el, 'data-appcomponent'));
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo');

        let dataComponent = getTextValue(getAttributeValue(el, 'data-component'), "");
        let dataConfigJson = getJsonValue(getAttributeValue(el, 'data-config'));
        let isRealtime = getBoolValue(getAttributeValue(el, 'data-isrealtime'), false);
        let realtimeDomain = getTextValue(getAttributeValue(el, 'data-realtimedomain'), "");

        let dataCallback = getAttributeValue(el, 'data-callback');

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime;
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain;
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["cloneJsonInJsonArray"](dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback);
        }
    }
}

function bindArshuAction(scopeElement) {
    scopeElement.querySelectorAll('[data-action]').forEach(function (el) {
        let dataAction = getAttributeValue(el, 'data-action');

        if (el.nodeName == "DIV") {
            if (dataAction == "loadComponentHtml") {
                bindLoadComponentHtml(el);
            }
            else if (dataAction == "showComponentSourceViewer") {
                el.removeEventListener("click", bindShowComponentSourceViewer)
                el.addEventListener("click", bindShowComponentSourceViewer, false);
            }
            else if (dataAction == "showComponentSourceEditor") {
                el.removeEventListener("click", bindShowComponentSourceEditor)
                el.addEventListener("click", bindShowComponentSourceEditor, false);
            }            
        }
        else if (el.nodeName == "LI") {
            if (dataAction == "showComponentSourceViewer") {
                el.removeEventListener("click", bindShowComponentSourceViewer)
                el.addEventListener("click", bindShowComponentSourceViewer, false);
            }
            else if (dataAction == "showComponentSourceEditor") {
                el.removeEventListener("click", bindShowComponentSourceEditor)
                el.addEventListener("click", bindShowComponentSourceEditor, false);
            }
        }
        else if (el.nodeName == "A") {
            if (dataAction == "refreshViewHtml") {
                el.removeEventListener("click", bindRefreshViewHtml)
                el.addEventListener("click", bindRefreshViewHtml, false);
            }
        }
        else if (el.nodeName == "SELECT") {
            if (dataAction == "refreshComponentHtml") {
                el.removeEventListener("click", bindRefreshComponentHtml)
                el.addEventListener("click", bindRefreshComponentHtml, false);
            } else if (dataAction == "filterComponentHtml") {
                el.removeEventListener("click", bindFilterComponentHtml)
                el.addEventListener("click", bindFilterComponentHtml, false);
            }
        }
        else if (el.nodeName == "BUTTON") {
            if (dataAction == "showComponentSourceViewer") {
                el.removeEventListener("click", bindShowComponentSourceViewer)
                el.addEventListener("click", bindShowComponentSourceViewer, false);
            }
            else if (dataAction == "showComponentSourceEditor") {
                el.removeEventListener("click", bindShowComponentSourceEditor)
                el.addEventListener("click", bindShowComponentSourceEditor, false);
            }
            else if (dataAction == "refreshComponentHtml") {
                el.removeEventListener("click", bindRefreshComponentHtml)
                el.addEventListener("click", bindRefreshComponentHtml, false);
            } else if (dataAction == "filterComponentHtml") {
                el.removeEventListener("click", bindFilterComponentHtml)
                el.addEventListener("click", bindFilterComponentHtml, false);
            } else if (dataAction == "saveJson") {
                el.removeEventListener("click", bindSaveJson)
                el.addEventListener("click", bindSaveJson, false);
            } else if (dataAction == "addJsonToJsonArray") {
                el.removeEventListener("click", bindAddJsonToJsonArray)
                el.addEventListener("click", bindAddJsonToJsonArray, false);
            } else if (dataAction == "editJsonInJsonArray") {
                el.removeEventListener("click", bindEditJsonInJsonArray)
                el.addEventListener("click", bindEditJsonInJsonArray, false);
            } else if (dataAction == "deleteJsonInJsonArray") {
                el.removeEventListener("click", bindDeleteJsonInJsonArray)
                el.addEventListener("click", bindDeleteJsonInJsonArray, false);
            } else if (dataAction == "cloneJsonInJsonArray") {
               el.removeEventListener("click", bindCloneJsonInJsonArray)
                el.addEventListener("click", bindCloneJsonInJsonArray, false);
            }
        }
    });
}

/******************************************************************************************************************/
//Arshu 
/******************************************************************************************************************/



