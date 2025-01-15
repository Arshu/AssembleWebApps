
/******************************************************************************************************************/
//Arshu Web Components
/******************************************************************************************************************/

class ArshuView extends HTMLElement {
    constructor() {
        super()
    }

    //connectedCallback() {
    //    console.log("Custom element added to page.");
    //}

    //disconnectedCallback() {
    //    console.log("Custom element removed from page.");
    //}

    //adoptedCallback() {
    //    console.log("Custom element moved to new page.");
    //}

    //attributeChangedCallback(name, oldValue, newValue) {
    //    console.log(`Attribute ${name} has changed.`);
    //}
}

customElements.define('ar-component', ArshuView)

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

//function updateTheDOM(html) {
//    document.getElementById('content').innerHTML = html
//}

/******************************************************************************************************************/
//Arshu Framework Base Utilities
/******************************************************************************************************************/

//let byteArray = new TextEncoder().encode('{"name":"John","age":30}');
//console.log(byteArrayToJson(byteArray)); // {name: "John", age: 30}
function byteArrayToJson(byteArray) {
    let jsonString = Array.from(byteArray).map(byte => String.fromCharCode(byte)).join('')
    return JSON.parse(jsonString)
}

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

    if (typeof serverStarted === "function") {
        serverStarted()
    }
}

function executeScriptElements(containerElement) {

    if ((containerElement) && (containerElement.id != "")) {
        const scriptElements = containerElement.querySelectorAll("script")
        //console.log('Found ' + scriptElements.length + ' scriptElements under container element [' + containerElement.id + ']')

        Array.from(scriptElements).forEach((scriptElement) => {
            const clonedElement = document.createElement("script")

            Array.from(scriptElement.attributes).forEach((attribute) => {
                clonedElement.setAttribute(attribute.name, attribute.value)
            })

            clonedElement.text = scriptElement.text

            scriptElement.parentNode.replaceChild(clonedElement, scriptElement)
            if (clonedElement.id != "") {
                //console.log('Replacing scriptElement [' + clonedElement.id + ']')
            }

            if (clonedElement.id.length > 0) {
                let eventName = scriptElement.id + "Init"
                document.dispatchEvent(new Event(eventName))
                //console.log('Triggering Event  [' + eventName + '] under scriptElement [' + scriptElement.id + '] for document Element')
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
                refreshViewHtml('progress', 'response', newAppSite, newAppView, '', '')
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
                    refreshViewHtml('progress', 'response', newAppSite, newAppView, '', '')
                }
            }

        } else {
            document.location.reload()
        }
    }
})

/******************************************************************************************************************/
//Arshu Framework Json Utilities
/******************************************************************************************************************/

let clickRefresh = true
let defaultDelayInterval = 5000
let globalWebSocketActive = false

function getFlatJson(scopeElmId, scopePrefixList, skipEmptyValue) {

    let dataJson
    let scopeElm = getElm(scopeElmId)
    if (scopeElm) {
        dataJson = new Object()

        const dataElmArray = Array.prototype.slice.apply(
            scopeElm.querySelectorAll("[data-key]")
        )

        dataElmArray.forEach((dataElm) => {
            let dataKeys = dataElm.getAttribute('data-key')
            let dataOriginalVal = dataElm.getAttribute('data-value')
            if (dataOriginalVal == null) dataOriginalVal = ""
            let dataCurrentValue = dataElm.value
            if (dataElm.nodeName.toUpperCase() == "SELECT") {
                dataCurrentValue = dataElm.options[dataElm.selectedIndex].value
            }
            let skipElm = false
            let dataKey = ""

            if ((scopePrefixList) && (scopePrefixList.length > 0)) {
                let scopePrefixArray = scopePrefixList.split(',')
                for (let i = 0; i < scopePrefixArray.length; i++) {
                    let scopeId = scopePrefixArray[i].toUpperCase()
                    //Remove the .Json Extension if any
                    if (scopeId.indexOf('.json') > 0) {
                        scopeId = scopeId.split('.').slice(0, -1).join('.')
                    }
                    let dataKeyArray = dataKeys.split(',')
                    for (let i = 0; i < dataKeyArray.length; i++) {
                        let dataKeyItem = dataKeyArray[i]
                        let dataScopeItem = dataKeyItem.substring(0, dataKeyItem.indexOf(".")).trim().toUpperCase()
                        let lastScopeIndex = dataScopeItem.lastIndexOf(scopeId)
                        if (dataScopeItem.lastIndexOf(scopeId) === dataScopeItem.length - scopeId.length) {
                            dataKey = dataKeyItem
                            skipElm = false
                            break
                        }
                    }
                }
            } else {
                let dataKeyArray = dataKeys.split(',')
                dataKey = dataKeyArray[0]
            }

            if (dataElm.nodeName.toUpperCase() == "INPUT") {
                let elmType = dataElm.getAttribute("type")
                if ((elmType) && (elmType.toLowerCase() == 'checkbox')) {
                    if ((dataOriginalVal.toLowerCase().indexOf('true') > -1)
                        || (dataOriginalVal.toLowerCase().indexOf('false') > -1)) {
                        if (dataOriginalVal.toLowerCase().indexOf('true') > -1) {
                            dataOriginalVal = true
                        } else if (dataOriginalVal.toLowerCase().indexOf('false') > -1) {
                            dataOriginalVal = false
                        }
                        if (dataOriginalVal != dataElm.checked) {
                            if (dataElm.checked == true) {
                                dataCurrentValue = dataCurrentValue.replace(/False/gi, 'True')
                            } else {
                                dataCurrentValue = dataCurrentValue.replace(/True/gi, 'False')
                            }
                        } else {
                            dataOriginalVal = dataElm.checked
                            dataCurrentValue = dataElm.checked
                        }
                    } else {
                        if (dataElm.checked == false) {
                            dataCurrentValue = ""
                        } else {
                            dataOriginalVal = ""
                        }
                    }
                }
            }

            if (skipEmptyValue === true) {
                if (dataCurrentValue.length == 0) {
                    skipElm = true
                }
            }

            if ((dataKey != "") && (skipElm == false)) {
                if (dataElm.nodeName.toUpperCase() == "INPUT") {
                    let elmType = dataElm.getAttribute("type")

                    if (elmType.toLowerCase() == 'hidden') {
                        dataJson[dataKey] = dataCurrentValue
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
                            dataJson[dataKey] = dataCurrentValue
                        } else if (elmType.toLowerCase() == 'radio') {
                            if (dataElm.checked == true) {
                                dataJson[dataKey] = dataCurrentValue
                            }
                        } else if (elmType.toLowerCase() == 'checkbox') {
                            if (dataElm.checked == true) {
                                if (dataJson.hasOwnProperty(dataKey)) {
                                    if (dataJson[dataKey].length > 0) {
                                        dataJson[dataKey] = dataJson[dataKey] + ","
                                    }
                                    dataJson[dataKey] = dataJson[dataKey] + dataCurrentValue
                                } else {
                                    dataJson[dataKey] = dataCurrentValue
                                }
                            } else {
                                if (dataJson.hasOwnProperty(dataKey) == false) {
                                    dataJson[dataKey] = dataCurrentValue
                                }
                            }
                        }
                    }
                }
                else if (dataElm.nodeName.toUpperCase() == "SELECT") {
                    if ((dataOriginalVal.length == 0) || (dataOriginalVal != dataCurrentValue)) {
                        dataJson[dataKey] = dataCurrentValue
                    }
                }
                else if (dataElm.nodeName.toUpperCase() == "TEXTAREA") {
                    if ((dataOriginalVal.length == 0) || (dataOriginalVal != dataCurrentValue)) {
                        dataJson[dataKey] = dataCurrentValue
                    }
                }
            }
        })

        let dataText = JSON.stringify(dataJson)
    } else {
        if (!scopePrefixList) {
            console.error('Scope Prefix List is empty for Scope Elm ID [' + scopeElmId + "]")
        }
    }

    return dataJson
}

function validateFlatJson(responseElmId, scopeElmId, scopePrefixList, dataInfoJsonText, checkAttributeName, displayAttributeName) {
    let valid = true
    let responseElm = getElm(responseElmId)

    let scopeElm = getElm(scopeElmId)
    if (scopeElm) {

        const dataElmArray = Array.prototype.slice.apply(
            scopeElm.querySelectorAll("[data-key]")
        )

        if (dataInfoJsonText.length > 0) {
            let jsonData = JSON.parse(dataInfoJsonText)
            for (let key in jsonData) {

                dataElmArray.forEach((dataElm) => {
                    if (isHiddenElm(dataElm) == false) {
                        if (valid == true) {
                            let dataKey = dataElm.getAttribute('data-key')
                            let dataValue = dataElm.value
                            let dataChecker = dataElm.getAttribute(checkAttributeName)
                            let dataDisplay = dataElm.getAttribute(displayAttributeName)

                            let skipElm = false
                            if (scopePrefixList.length > 0) {
                                skipElm = true
                                let scopePrefixArray = scopePrefixList.split(',')
                                for (let i = 0; i < scopePrefixArray.length; i++) {
                                    let scopeId = scopePrefixArray[i].toUpperCase()
                                    if (dataKey.trim().toUpperCase().indexOf(scopeId) === 0) {
                                        skipElm = false
                                        break
                                    }
                                }
                            }
                            if ((dataKey != "") && (skipElm == false)) {
                                if ((dataKey == key) && (dataChecker != null)) {
                                    let idxOfStar = dataChecker.indexOf("*")
                                    if (idxOfStar > -1) {
                                        if ((dataValue.length == 0) || (dataValue == 0)) {
                                            showText(responseElm, dataDisplay, 'red')
                                            valid = false
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            }
        } else {
            showText(responseElm, 'Empty Json Text', 'red')
        }
    }
    return valid
}

function updateFlatJson(responseElmId, updateScopeElmId, dataInfoJsonText) {
    let responseElm = getElm(responseElmId)
    let unmatchedJson = new Object()

    let updateScopeElm = getElm(updateScopeElmId)
    if (updateScopeElm) {
        if (dataInfoJsonText.length > 0) {
            let jsonData = JSON.parse(dataInfoJsonText)
            for (let key in jsonData) {
                let updateElm = updateScopeElm.querySelector("[data-key='" + key + "']")
                if (updateElm) {
                    let updatedValue = jsonData[key]
                    updateElm.value = updatedValue
                } else {
                    unmatchedJson[key] = "[data-key='" + key + "'] Tag Not found under Scope [" + updateScopeElmId + "]"
                }
            }
        } else {
            unmatchedJson["Error"] = "Empty Json Text"
        }
    } else {
        unmatchedJson["Error"] = "Update Scope Elm Not found [" + updateScopeElmId + "]"
    }
    return unmatchedJson
}

function clearFlatJson(scopeElmId) {
    let scopeElm = getElm(scopeElmId)
    if ((scopeElm)) {
        const dataElmArray = Array.prototype.slice.apply(
            scopeElm.querySelectorAll("[data-key]")
        )

        dataElmArray.forEach((dataElm) => {
            if (dataElm.nodeName.toUpperCase() == "INPUT") {
                let elmType = dataElm.getAttribute("type")
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
                    dataElm.value = ''
                }
            } else if (dataElm.nodeName.toUpperCase() == "SELECT") {
                dataElm.selectedIndex = 0
            }
            else if (dataElm.nodeName.toUpperCase() == "TEXTAREA") {
                dataElm.value = ''
            }
        })
    }
}

function refreshHtmlJson(jsonTagList, appSite, appView) {

    if (haveElm('dynamicAppSite')) {
        getElm('dynamicAppSite').value = appSite
    }
    if (haveElm('dynamicAppView')) {
        getElm('dynamicAppView').value = appView
    }

    for (let i = 0; i < jsonTagList.length; i++) {
        let jsonTag = jsonTagList[i]
        if (jsonTagList.length > 0) {
            if (typeof removeNavBarEvents === "function") {
                removeNavBarEvents()
            }
        }
        for (let key in jsonTag) {
            if (jsonTag.hasOwnProperty(key)) {
                if (haveElm(key, null, true) == true) {
                    let tagNode = getElm(key, null, true)
                    if (tagNode) {
                        if (isNode(tagNode) == true) {
                            if (jsonTag[key].length > 0) {
                                if (key.toLocaleLowerCase().indexOf('main') == -1) {

                                    if (!document.createDocumentTransition) {

                                        //Append the New Html Element
                                        tagNode.insertAdjacentHTML('beforeBegin', jsonTag[key])
                                        var new_elem = tagNode.previousSibling
                                        tagNode.parentElement.removeChild(tagNode)

                                        if ((new_elem.innerHTML) && (new_elem.innerHTML.trim().length > 0)) {
                                            executeScriptElements(new_elem)

                                            if (typeof bindArshuAction === "function") {
                                                bindArshuAction(new_elem)
                                            }
                                        }
                                        //console.log("Update Dom without Transition")
                                    }
                                    else {
                                        const transition = document.createDocumentTransition()
                                        transition.start(() => {

                                            //Append the New Html Element
                                            tagNode.insertAdjacentHTML('beforeBegin', jsonTag[key])
                                            var new_elem = tagNode.previousSibling
                                            tagNode.parentElement.removeChild(tagNode)

                                            if ((new_elem.innerHTML) && (new_elem.innerHTML.trim().length > 0)) {
                                                executeScriptElements(new_elem)

                                                if (typeof bindArshuAction === "function") {
                                                    bindArshuAction(new_elem)
                                                }
                                            }
                                            //console.log("Update Dom with Transition")
                                        })
                                    }

                                } else {

                                    if (!document.createDocumentTransition) {
                                        //Append the New Html Element
                                        tagNode.innerHTML = jsonTag[key]

                                        if ((tagNode.innerHTML) && (tagNode.innerHTML.trim().length > 0)) {
                                            executeScriptElements(tagNode)

                                            if (typeof bindArshuAction === "function") {
                                                bindArshuAction(tagNode)
                                            }
                                        }
                                        //console.log("Update Dom without Transition")
                                    }
                                    else {
                                        const transition = document.createDocumentTransition()
                                        transition.start(() => {
                                            //Append the New Html Element
                                            tagNode.innerHTML = jsonTag[key]

                                            if ((tagNode.innerHTML) && (tagNode.innerHTML.trim().length > 0)) {
                                                executeScriptElements(tagNode)

                                                if (typeof bindArshuAction === "function") {
                                                    bindArshuAction(tagNode)
                                                }
                                            }
                                            //console.log("Update Dom with Transition")
                                        })
                                    }
                                }
                            }
                        }
                        else {
                            console.log("[" + key + "] is not a Node")
                        }
                    }
                }
            }
        }
    }

    if (jsonTagList.length > 0) {
        if (typeof initNavBar === "function") {
            initNavBar()
        }
    }
}

function highlightHtmlJson(jsonTagList, appSite, appView) {

    if (haveElm('debugMode') == true) {
        let debugModeElm = getElm('debugMode')
        if (debugModeElm.checked == true) {
            for (let i = 0; i < jsonTagList.length; i++) {
                let jsonTag = jsonTagList[i]
                for (let key in jsonTag) {
                    if (jsonTag.hasOwnProperty(key)) {
                        if (haveElm(key) == true) {
                            let tagNode = getElm(key)
                            if (tagNode) {
                                if (isNode(tagNode) == true) {
                                    tagNode.classList.add('ar_highlight')
                                    let clearTimeout = 500
                                    if (debugModeElm.hasAttribute('clearTimeout') == true) {
                                        let clearTimeoutAttributeVal = debugModeElm.getAttribute('clearTimeout')
                                        if (clearTimeoutAttributeVal) {
                                            clearTimeout = parseInt(clearTimeoutAttributeVal)
                                        }
                                    }
                                    setTimeout(function () {
                                        tagNode.classList.remove('ar_highlight')
                                    }, clearTimeout)
                                }
                                else {
                                    console.log("[" + key + "] is not a Node")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

/******************************************************************************************************************/
//Arshu Framework Component Utilities
/******************************************************************************************************************/

function clearResponse(responseElmId) {

    let responseContainerElmId = responseElmId + "Container"
    let responseElm
    let responseContainerElm
    if (haveElm(responseElmId) == true) {
        responseElm = getElm(responseElmId)
        while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild)
        responseContainerElm = getElm(responseContainerElmId)
        hideElm(responseContainerElmId)
    }

    return responseElm
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
}

let reqProcessReturnList = new Object()
function callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, componentAppSite, componentAppView, componentName, actionComponentName) {
    let responseElm = clearResponse(responseElmId)
    let apiMessage = ""
    let reqId = apiUrl +"-"+ apiMethod + "_" + uuidv4()
    reqProcessReturnList[reqId] = processReturn

    if (!isRealtime) isRealtime = false
    if ((isRealtime == false) || (isRealtime == "false") || (typeof callWSApi !== "function")) {

        apiMessage = "Calling Direct Ajax Api Method " + apiMethod + " for Retrieving Component [" + componentName + "] in [" + componentAppSite + "/" + componentAppView + "] after modifying App Component [" + actionComponentName + "]"
        if ((apiMessage.toLowerCase().indexOf('metrics') == -1) &&
            (apiMessage.toLowerCase().indexOf('serverinfo') == -1)) {
            console.log(apiMessage)
        }

        let restApiUrl = apiUrl + '/' + apiMethod
        let restApiParam = JSON.stringify(apiParams)
        dopost(reqId, progressElmId, responseElmId, restApiUrl, restApiParam,
            function (data) {
                if ((data.hasOwnProperty('Result') === true) && (data.Result)) {
                    let result = data.Result
                    if ((data.hasOwnProperty('ClientRequestId') === true) && (data.ClientRequestId)) {
                        let resId = data.ClientRequestId
                        if (reqProcessReturnList.hasOwnProperty(resId)) {
                            let reqProcessReturn = reqProcessReturnList[resId]
                            if (reqProcessReturn != null) {
                                delete reqProcessReturnList[resId]
                                reqProcessReturn(result, responseElmId, successCallback)
                                setApiMetrics(result)
                            } else {
                                console.log("Direct Ajax [" + resId + "] does not have Process Return")
                            }
                        } else {
                            console.log("Direct Ajax [" + resId + "] does not have Process Return")
                        }
                    }
                }
                if (data.hasOwnProperty('ErrorMessage') === true) {
                    let errorMessage = data.ErrorMessage
                    if ((errorMessage.length > 0) && (haveElm(responseElmId) == true)) {
                        let responseElm = getElm(responseElmId)
                        showText(responseElm, errorMessage, 'red')
                    }
                }
                else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                    let error = data.Error
                    if (error) {
                        if (error.hasOwnProperty('Message') === true) {
                            if (haveElm(responseElmId) == true) {
                                let responseElm = getElm(responseElmId)
                                showText(responseElm, error.Message, 'red')
                            }
                        }
                    }
                }
            }, failureCallback, clientRequestTimestamp)

    }
    else {
        if (
            (globalWebSocketActive == true) && (typeof callWSApi === "function") &&
            ((isRealtime == true) || (isRealtime == 'ws'))
        ) {

            apiMessage = "Calling Direct WS Api Method " + apiMethod + " for Retrieving Component [" + componentName + "] in [" + componentAppSite + "/" + componentAppView + "] after modifying App Component [" + actionComponentName + "]"
            if ((apiMessage.toLowerCase().indexOf('metrics') == -1) &&
                (apiMessage.toLowerCase().indexOf('serverinfo') == -1)) {
                console.log(apiMessage)
            }

            callWSApi(reqId, progressElmId, responseElmId, apiUrl, apiMethod, apiParams,
                function (resId, data) {
                    if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
                        let result = data.Result
                        if (reqProcessReturnList.hasOwnProperty(resId)) {
                            let reqProcessReturn = reqProcessReturnList[resId]
                            if (reqProcessReturn != null) {
                                if (result.hasOwnProperty('refresh') == false) {
                                    delete reqProcessReturnList[resId]
                                    ajaxStop(progressElmId)
                                }
                                reqProcessReturn(result, responseElmId, successCallback)
                                setApiMetrics(result)
                            } else {
                                console.log("Direct WS [" + resId + "] does not have Process Return")
                            }
                        } else {
                            console.log("Direct WS [" + resId + "] does not have Process Return")
                        }
                    }
                    if (data.hasOwnProperty('ErrorMessage') === true) {
                        let errorMessage = data.ErrorMessage
                        if ((errorMessage.length > 0) && (haveElm(responseElmId) == true)) {
                            let responseElm = getElm(responseElmId)
                            showText(responseElm, errorMessage, 'red')
                        }
                    }
                    else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                        let error = data.Error
                        if (error) {
                            if (error.hasOwnProperty('Message') === true) {
                                if (haveElm(responseElmId) == true) {
                                    let responseElm = getElm(responseElmId)
                                    showText(responseElm, error.Message, 'red')
                                }
                            }
                        }
                    }
                }, null, clientRequestTimestamp, realtimeDomain)

        } else {

            let delayInterval = 0
            if ((isRealtime != false) && (globalWebSocketActive == false)) {
                fetch("/EchoInfo", {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(data => {
                        console.log("Called '/EchoInfo' to start the Server")
                        if (typeof restartWebSocketConnection === "function") {
                            restartWebSocketConnection()
                        }
                    })
                delayInterval = defaultDelayInterval
            }

            delayUntil(delayInterval, function () { return globalWebSocketActive }).then(() => {
                if (globalWebSocketActive == false) {

                    apiMessage = "Calling Delayed Ajax Api Method " + apiMethod + " for Retrieving Component [" + componentName + "] in [" + componentAppSite + "/" + componentAppView + "] after modifying App Component [" + actionComponentName + "]"
                    if ((apiMessage.toLowerCase().indexOf('metrics') == -1) &&
                        (apiMessage.toLowerCase().indexOf('serverinfo') == -1)) {
                        console.log(apiMessage)
                    }

                    let restApiUrl = apiUrl + '/' + apiMethod
                    let restApiParam = JSON.stringify(apiParams)
                    dopost(reqId, progressElmId, responseElmId, restApiUrl, restApiParam,
                        function (data) {
                            if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
                                let result = data.Result
                                if ((data.hasOwnProperty('ClientRequestId') === true) && (data.ClientRequestId)) {
                                    let resId = data.ClientRequestId
                                    if (reqProcessReturnList.hasOwnProperty(resId)) {
                                        let reqProcessReturn = reqProcessReturnList[resId]
                                        if (reqProcessReturn != null) {
                                            delete reqProcessReturnList[resId]
                                            reqProcessReturn(result, responseElmId, successCallback)
                                            setApiMetrics(result)
                                        } else {
                                            console.log("Delayed Ajax [" + resId + "] does not have Process Return")
                                        }
                                    } else {
                                        console.log("Delayed Ajax [" + resId + "] does not have Process Return")
                                    }
                                }
                            }
                            if (data.hasOwnProperty('ErrorMessage') === true) {
                                let errorMessage = data.ErrorMessage
                                if ((errorMessage.length > 0) && (haveElm(responseElmId) == true)) {
                                    let responseElm = getElm(responseElmId)
                                    showText(responseElm, errorMessage, 'red')
                                }
                            }
                            else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                                let error = data.Error
                                if (error) {
                                    if (error.hasOwnProperty('Message') === true) {
                                        if (haveElm(responseElmId) == true) {
                                            let responseElm = getElm(responseElmId)
                                            showText(responseElm, error.Message, 'red')
                                        }
                                    }
                                }
                            }
                        }, null, clientRequestTimestamp)

                }
                else {
                    if (((isRealtime == true) || (isRealtime == "ws")) && (typeof callWSApi === "function")) {

                        apiMessage = "Calling Delayed WS Api Method " + apiMethod + " for Retrieving Component [" + componentName + "] in [" + componentAppSite + "/" + componentAppView + "] after modifying App Component [" + actionComponentName + "]"
                        if ((apiMessage.toLowerCase().indexOf('metrics') == -1) &&
                            (apiMessage.toLowerCase().indexOf('serverinfo') == -1)) {
                            console.log(apiMessage)
                        }

                        callWSApi(reqId, progressElmId, responseElmId, apiUrl, apiMethod, apiParams,
                            function (resId, data) {
                                if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
                                    let result = data.Result
                                    if (reqProcessReturnList.hasOwnProperty(resId)) {
                                        let reqProcessReturn = reqProcessReturnList[resId]
                                        if (reqProcessReturn != null) {
                                            if (result.hasOwnProperty('refresh') == false) {
                                                delete reqProcessReturnList[resId]
                                                ajaxStop(progressElmId)
                                            }
                                            reqProcessReturn(result, responseElmId, successCallback)
                                            setApiMetrics(result)
                                        } else {
                                            console.log("Delayed WS [" + resId + "] does not have Process Return")
                                        }
                                    } else {
                                        console.log("Delayed WS[" + resId + "] does not have Process Return")
                                    }
                                }
                                if (data.hasOwnProperty('ErrorMessage') === true) {
                                    let errorMessage = data.ErrorMessage
                                    if ((errorMessage.length > 0) && (haveElm(responseElmId) == true)) {
                                        let responseElm = getElm(responseElmId)
                                        showText(responseElm, errorMessage, 'red')
                                    }
                                }
                                else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                                    let error = data.Error
                                    if (error) {
                                        if (error.hasOwnProperty('Message') === true) {
                                            if (haveElm(responseElmId) == true) {
                                                let responseElm = getElm(responseElmId)
                                                showText(responseElm, error.Message, 'red')
                                            }
                                        }
                                    }
                                }
                            }, null, clientRequestTimestamp, realtimeDomain)
                    }
                }
            })

        }
    }
}

function refreshViewHtml(progressElmId, responseElmId, appSite, appView, appFiles, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime())
    let responseElm = clearResponse(responseElmId)

    clickRefresh = true

    let valid = true

    if (valid === true) {

        let apiUrl = '/AppApi/HtmlApi'
        let apiMethod = 'GetViewHtml'

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
            "appFiles": appFiles,
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

            let responseElm = getElm(responseElmId)

            if (result.hasOwnProperty('error') === true) {
                if (haveElm(responseElmId) == true) {
                    showText(responseElm, result.error, 'red')
                }
            }
            else if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    if (typeof changeContextPage === "function") {
                        changeContextPage(appSite, appView)
                    }

                    let jsonTagList = result.json
                    refreshHtmlJson(jsonTagList, appSite, appView)

                    if (typeof successCallback === "function") {
                        successCallback(result.json)
                    }

                    highlightHtmlJson(jsonTagList, appSite, appView)
                    clickRefresh = false

                } else {
                    if (typeof successCallback === "function") {
                        successCallback(result.message)
                    }
                }
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, "")
    }

    return false
}

function refreshComponentHtml(progressElmId, responseElmId, appSite, appView, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime())
    let responseElm = clearResponse(responseElmId)

    let valid = true

    if (valid === true) {

        let apiUrl = '/AppApi/HtmlApi'
        let apiMethod = 'GetComponentHtml'

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

            let responseElm = getElm(responseElmId)

            if (result.hasOwnProperty('error') === true) {
                if (haveElm(responseElmId) == true) {
                    showText(responseElm, result.error, 'red')
                }
            }
            else if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json
                    refreshHtmlJson(jsonTagList, appSite, appView)

                    if (typeof changeContextPage === "function") {
                        changeContextPage(appSite, appView)
                    }

                    if (typeof successCallback === "function") {
                        successCallback(result.json)
                    }

                    highlightHtmlJson(jsonTagList, appSite, appView)
                }
                else {
                    if (typeof successCallback === "function") {
                        successCallback(result.message)
                    }
                }
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, "")
    }

    return false
}

function loadComponentHtml(progressElmId, responseElmId, appSite, appView, componentName, configJson, isRealtime, realtimeDomain, delayInterval, reload, successCallback) {

    if (haveElm(componentName) == true) {

        let clientRequestTimestamp = Math.floor(new Date().getTime())
        if (!delayInterval) delayInterval = 0

        if ((haveElm('dynamicAppSite') == true) && (appSite == "")) {
            appSite = getElm('dynamicAppSite').value
        }

        if ((haveElm('dynamicAppView') == true) && (appView == "")) {
            currentAppView = getElm('dynamicAppView').value
        }
        let loadElm = getElm(componentName)
        if ((loadElm.textContent.trim() === '') || (reload == true)) {

            if (delayInterval == 0) {
                refreshComponentHtml(progressElmId, responseElmId, appSite, appView, componentName, configJson, isRealtime, realtimeDomain,
                    function (result) {
                        if (typeof successCallback === "function") {
                            successCallback(result)
                        }
                    }, clientRequestTimestamp)
            } else {
                console.log("Realtime [" + isRealtime + "] refreshComponentHtml Delayed by [" + delayInterval + "ms] for [" + appSite + "." + appView + "." + componentName + "] Component")
                window.setTimeout(() => {
                    refreshComponentHtml(progressElmId, responseElmId, appSite, appView, componentName, configJson, isRealtime, realtimeDomain,
                        function (result) {
                            if (typeof successCallback === "function") {
                                successCallback(result)
                            }
                        }, clientRequestTimestamp)
                }, delayInterval)
            }
        } else {
            alert('Found Content in Element which is being loaded with View Component [' + componentName + "] and Reload is false, hence skiping")
        }
    }
}

/******************************************************************************************************************/
//Arshu Framework Json Functions
/******************************************************************************************************************/

function saveJson(el, progressElmId, responseElmId, appSite, appView, actionComponentName, getKeyJson, getSaveJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime())
    let responseElm = clearResponse(responseElmId)

    let valid = true

    let keyInfoJson = getJsonValue(el, getKeyJson)
    let dataInfoJson = getJsonValue(el, getSaveJson)

    if (valid == true) {
        const keyInfoHasKeys = !!Object.keys(keyInfoJson).length
        if (keyInfoHasKeys == false) {
            showText(responseElm, 'Json Key to Save is Empty', 'red')
            valid = false
        }
    }

    if (valid == true) {
        const dataInfoHasKeys = !!Object.keys(dataInfoJson).length
        if (dataInfoHasKeys == false) {
            showText(responseElm, 'Json Data to Save is Empty', 'red')
            valid = false
        }
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi'
        let apiMethod = "SaveJson"

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let saveInfo = {
            "componentName": actionComponentName,
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

            let responseElm = getElm(responseElmId)

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json
                    refreshHtmlJson(jsonTagList, appSite, appView)

                    if (typeof successCallback === "function") {
                        successCallback(result.message)
                    }

                    highlightHtmlJson(jsonTagList, appSite, appView)
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red')
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, actionComponentName)
    }
    return false
}

function addJsonToJsonArray(el, progressElmId, responseElmId, appSite, appView, actionComponentName, getKeyJson, getAddJson, getValidKeyJson, getDuplicateKeyJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime())
    let responseElm = clearResponse(responseElmId)

    let valid = true

    let keyInfoJson = getJsonValue(el, getKeyJson)
    let dataInfoJson = getJsonValue(el, getAddJson)
    let validKeyJson = getJsonValue(el, getValidKeyJson)
    let duplicateKeyJson = getJsonValue(el, getDuplicateKeyJson)

    const hasKeys = !!Object.keys(keyInfoJson).length
    if (hasKeys == false) {
        showText(responseElm, 'No Key Json Set to Clone', 'red')
        valid = false
    }

    let isEmptyValue = true
    let allowEmptyVal = true
    for (let validKey in validKeyJson) {
        allowEmptyVal = false
    }
    for (let key in dataInfoJson) {
        if (key != "") {
            if (dataInfoJson.hasOwnProperty(key)) {
                if (dataInfoJson[key].length == 0) {
                    if (allowEmptyVal == false) {
                        let idxLastDot = key.lastIndexOf(".")
                        let keyName = key.substring(idxLastDot + 1)
                        showText(responseElm, keyName + ' is empty', 'red')
                    }
                    isEmptyValue = true
                    break
                } else {
                    isEmptyValue = false
                }
            }
        }
    }

    if ((isEmptyValue == true) && (allowEmptyVal == false)) {
        showText(responseElm, 'Found Empty Values when Allow Empty Value is False', 'red')
        valid = false
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi'
        let apiMethod = 'AddJsonToJsonArray'

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let addInfo = {
            "componentName": actionComponentName,
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

            let responseElm = getElm(responseElmId)

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json
                    refreshHtmlJson(jsonTagList, appSite, appView)

                    if (typeof successCallback === "function") {
                        successCallback(result.message)
                    }

                    highlightHtmlJson(jsonTagList, appSite, appView)
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red')
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, actionComponentName)
    }
    return false
}

function editJsonInJsonArray(el, progressElmId, responseElmId, appSite, appView, actionComponentName, getKeyJson, getEditJson, getValidKeyJson, getDuplicateKeyJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime())
    let responseElm = clearResponse(responseElmId)

    let valid = true

    let keyInfoJson = getJsonValue(el, getKeyJson)
    let dataInfoJson = getJsonValue(el, getEditJson)
    let validKeyJson = getJsonValue(el, getValidKeyJson)
    let duplicateKeyJson = getJsonValue(el, getDuplicateKeyJson)


    const hasKeys = !!Object.keys(keyInfoJson).length
    if (hasKeys == false) {
        showText(responseElm, 'No Key Json Set to Clone', 'red')
        valid = false
    }

    let isEmptyValue = true
    let allowEmptyVal = true

    for (let validKey in validKeyJson) {
        allowEmptyVal = false
    }

    for (let key in dataInfoJson) {
        if (key != "") {
            if (dataInfoJson.hasOwnProperty(key)) {
                if (dataInfoJson[key].length == 0) {
                    if (allowEmptyVal == false) {
                        let idxLastDot = key.lastIndexOf(".")
                        let keyName = key.substring(idxLastDot + 1)
                        showText(responseElm, keyName + ' is empty', 'red')
                    }
                    isEmptyValue = true
                    break
                } else {
                    isEmptyValue = false
                }
            }
        }
    }

    if ((isEmptyValue == true) && (allowEmptyVal == false)) {

        valid = false
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi'
        let apiMethod = 'EditJsonInJsonArray'

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let editInfo = {
            "componentName": actionComponentName,
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

            let responseElm = getElm(responseElmId)

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json
                    refreshHtmlJson(jsonTagList, appSite, appView)

                    if (typeof successCallback === "function") {
                        successCallback(result.message)
                    }

                    highlightHtmlJson(jsonTagList, appSite, appView)
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red')
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, actionComponentName)
    }
    return false
}

function deleteJsonInJsonArray(el, progressElmId, responseElmId, appSite, appView, actionComponentName, getKeyJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime())
    let responseElm = clearResponse(responseElmId)

    let valid = true

    let keyInfoJson = getJsonValue(el, getKeyJson)

    const hasKeys = !!Object.keys(keyInfoJson).length
    if (hasKeys == false) {
        showText(responseElm, 'No Key Json Set to Clone', 'red')
        valid = false
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi'
        let apiMethod = 'DeleteJsonInJsonArray'

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let deleteInfo = {
            "componentName": actionComponentName,
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

            let responseElm = getElm(responseElmId)

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json
                    refreshHtmlJson(jsonTagList, appSite, appView)

                    if (typeof successCallback === "function") {
                        successCallback(result.message)
                    }

                    highlightHtmlJson(jsonTagList, appSite, appView)
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red')
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, actionComponentName)
    }
    return false
}

function cloneJsonInJsonArray(el, progressElmId, responseElmId, appSite, appView, actionComponentName, getKeyJson, componentName, configJson, isRealtime, realtimeDomain, successCallback, failureCallback) {
    let clientRequestTimestamp = Math.floor(new Date().getTime())
    let responseElm = clearResponse(responseElmId)

    let valid = true

    let keyInfoJson = getJsonValue(el, getKeyJson)

    const hasKeys = !!Object.keys(keyInfoJson).length
    if (hasKeys == false) {
        showText(responseElm, 'No Key Json Set to Clone', 'red')
        valid = false
    }

    if (valid === true) {

        let apiUrl = '/AppApi/JsonApi'
        let apiMethod = 'CloneJsonInJsonArray'

        let viewInfo = {
            "appSite": appSite,
            "appView": appView,
        }

        let cloneInfo = {
            "componentName": actionComponentName,
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

            let responseElm = getElm(responseElmId)

            if (result.hasOwnProperty('message') === true) {
                //showText(responseElm, result.message, 'green');

                if (result.hasOwnProperty('json') === true) {

                    let jsonTagList = result.json
                    refreshHtmlJson(jsonTagList, appSite, appView)

                    if (typeof successCallback === "function") {
                        successCallback(result.message)
                    }

                    highlightHtmlJson(jsonTagList, appSite, appView)
                }
            }
            else if (result.hasOwnProperty('error') === true) {
                showText(responseElm, result.error, 'red')
            }
        }

        callAssemblerApi(progressElmId, responseElmId, apiUrl, apiMethod, apiParams, isRealtime, realtimeDomain, processReturn, successCallback, failureCallback, clientRequestTimestamp, appSite, appView, componentName, actionComponentName)
    }
    return false
}

/******************************************************************************************************************/
//Arshu Framework Bind Utilities
/******************************************************************************************************************/

var stringConstructor = "test".constructor
var arrayConstructor = [].constructor
var objectConstructor = ({}).constructor

function getType(object) {
    if (object === null) {
        return "null"
    }
    if (object === undefined) {
        return "undefined"
    }
    if (object.constructor === stringConstructor) {
        return "String"
    }
    if (object.constructor === arrayConstructor) {
        return "Array"
    }
    if (object.constructor === objectConstructor) {
        return "Object"
    }
    {
        return "don't know"
    }
}

function getAttributeValue(el, attrName) {

    let elmAttrVal = el.getAttribute(attrName)

    if (!elmAttrVal) {
        let parentElm = el.parentElement
        if (parentElm != null) {
            elmAttrVal = parentElm.getAttribute(attrName)
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

function getProgress(el) {
    let dataProgressElmId = getAttributeValue(el, 'data-progress')
    let dataProgress = getTextValue(el, dataProgressElmId, 'noprogress')
    return dataProgress
}

function getResponse(el) {
    let dataResponseElmId = getAttributeValue(el, 'data-response')
    let dataResponse = getTextValue(el, dataResponseElmId, 'noresponse')
    return dataResponse
}

function getAppSite(el) {

    let currentAppSite = ''
    if (haveElm('dynamicAppSite')) {
        currentAppSite = getElm('dynamicAppSite').value
    }

    let dataAppSite = getTextValue(el, getAttributeValue(el, 'data-appsite'), currentAppSite)
    return dataAppSite
}

function getAppView(el) {

    let currentAppView = ''
    if (haveElm('dynamicAppView')) {
        currentAppView = getElm('dynamicAppView').value
    }

    let dataAppView = getTextValue(el, getAttributeValue(el, 'data-appview'), currentAppView)
    return dataAppView
}

function getAppFiles(el) {

    let dataAppFiles = getTextValue(el, getAttributeValue(el, 'data-appfiles'), "")
    return dataAppFiles
}

function getIntValue(el, getDataText, defaultText = 0) {

    let dataInt = parseInt(defaultText)

    let dataText = ""
    if (getDataText != null) {
        if (typeof window[getDataText] === "function") {
            if (window[getDataText].length == 1) {
                dataText = window[getDataText](el)
            } else {
                dataText = window[getDataText]()
            }
        } else {
            dataText = getDataText
        }
    }
    if (dataText != "") {
        dataInt = parseInt(dataText)
    }

    return dataInt
}

function getTextValue(el, getDataText, defaultText = "") {

    let dataText = defaultText

    if (getDataText != null) {
        if (typeof window[getDataText] === "function") {
            if (window[getDataText].length == 1) {
                dataText = window[getDataText](el)
            } else {
                dataText = window[getDataText]()
            }
        } else {
            dataText = getDataText
        }
    }

    return dataText
}

function getBoolValue(el, getDataBool, defaultBool = false) {

    let isBool = defaultBool

    if (typeof window[getDataBool] === "function") {
        if (window[getDataBool].length == 1) {
            isBool = window[getDataBool](el)
        } else {
            isBool = window[getDataBool]()
        }
    }
    else {
        if ((getDataBool === true) || (getDataBool === "true")) {
            isBool = true
        }
        else if ((getDataBool === false) || (getDataBool === "false")) {
            isBool = false
        }
    }
    if ((isBool === true) || (isBool === "true")) {
        isBool = true
    }
    else if ((isBool === false) || (isBool === "false")) {
        isBool = false
    }
    if (!isBool) {
        isBool = defaultBool
    }

    return isBool
}

function getJsonValue(el, getDataJson, defaultJson = {}) {

    let retJsonData = {}
    let jsonData = {}
    let getJsonData = defaultJson

    if (getDataJson != null) {
        if (typeof window[getDataJson] === "function") {
            if (window[getDataJson].length == 1) {
                getJsonData = window[getDataJson](el)
            } else {
                getJsonData = window[getDataJson]()
            }
            const hasKeys = !!Object.keys(getJsonData).length
            if (hasKeys == true) {
                jsonData = getJsonData
            } else {
                let jsonText = JSON.stringify(getJsonData)
                if (jsonText.length > 0) {
                    jsonData = JSON.parse(jsonText)
                }
            }
        } else {
            let getJsonData = getDataJson
            if (
                typeof getJsonData === 'object' &&
                !Array.isArray(getJsonData) &&
                getJsonData !== null
            ) {
                let jsonText = JSON.stringify(getJsonData)
                if (jsonText.length > 0) {
                    jsonData = JSON.parse(jsonText)
                }
            } else {
                let jsonText = getJsonData.replace(/'/g, "\"")
                if (jsonText.length > 0) {
                    jsonData = JSON.parse(jsonText)
                }
            }
        }
    }

    //const hasKeys = !!Object.keys(jsonData).length;
    //if (hasKeys == true) {
    //    for (const key in jsonData) {
    //        if (jsonData.hasOwnProperty(key)) {
    //            retJsonData[key] = jsonData[key];
    //        }
    //    }
    //}

    return jsonData
}

function jsonCompare(arg1, arg2) {
    if (Object.prototype.toString.call(arg1) === Object.prototype.toString.call(arg2)) {
        if (Object.prototype.toString.call(arg1) === '[object Object]' || Object.prototype.toString.call(arg1) === '[object Array]') {
            if (Object.keys(arg1).length !== Object.keys(arg2).length) {
                return false
            }
            return (Object.keys(arg1).every(function (key) {
                return deepCompare(arg1[key], arg2[key])
            }))
        }
        return (arg1 === arg2)
    }
    return false
}

function jsonContains(arg1, arg2) {
    let jsonContains = false
    const arg1HasKeys = !!Object.keys(arg1).length
    if (arg1HasKeys == true) {
        const arg2HasKeys = !!Object.keys(arg2).length
        if (arg2HasKeys == true) {

            jsonContains = true
            for (const key in arg1) {
                if (arg2.hasOwnProperty(key) == true) {
                    if (arg1[key] != arg2[key]) {
                        jsonContains = false
                    }
                } else {
                    jsonContains = false
                    break
                }
            }
        }
    }
    return jsonContains
}

/******************************************************************************************************************/
//Arshu Framework Bind Functions
/******************************************************************************************************************/

function bindShowComponentSourceViewer(event) {
    const el = event.target

    let dataProgress = getProgress(el)
    let dataResponse = getResponse(el)
    let dataAppSite = getAppSite(el)
    let dataAppView = getAppView(el)

    let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
    let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
    let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
    let realtimeDomain = ""
    if (isRealtime == true) {
        realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
    }

    let dataDelay = getIntValue(el, getAttributeValue(el, 'data-delay'), 25)
    let dataPreCall = getAttributeValue(el, 'data-precall')
    let dataCallback = getAttributeValue(el, 'data-callback')

    if (getType(dataConfigJson) == "Object") {
        dataConfigJson["DefaultRealtime"] = isRealtime
        dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
    }

    if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {

        if ((dataPreCall) || (dataPreCall != "")) {
            if (typeof dataPreCall === "function") {
                dataPreCall()
            }
            else if (window.hasOwnProperty(dataPreCall) == true) {
                window[dataPreCall]()
            }
        }

        window["showComponentSourceViewer"](dataProgress, dataAppSite, dataAppView, dataComponent, true, dataCallback)
    }
    else {
        console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] or Data Component [" + dataComponent + "] is Empty for Method ShowComponentSourceViewer")
    }

}

function bindShowComponentSourceEditor(event) {
    const el = event.target

    let dataProgress = getProgress(el)
    let dataResponse = getResponse(el)
    let dataAppSite = getAppSite(el)
    let dataAppView = getAppView(el)

    let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
    let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
    let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
    let realtimeDomain = ""
    if (isRealtime == true) {
        realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
    }

    let dataDelay = getIntValue(el, getAttributeValue(el, 'data-delay'), 25)
    let dataPreCall = getAttributeValue(el, 'data-precall')
    let dataCallback = getAttributeValue(el, 'data-callback')

    if (getType(dataConfigJson) == "Object") {
        dataConfigJson["DefaultRealtime"] = isRealtime
        dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
    }

    if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {

        if ((dataPreCall) || (dataPreCall != "")) {
            if (typeof dataPreCall === "function") {
                dataPreCall()
            }
            else if (window.hasOwnProperty(dataPreCall) == true) {
                window[dataPreCall]()
            }
        }

        window["showComponentSourceEditor"](dataProgress, dataAppSite, dataAppView, dataComponent, true, dataCallback)
    }
    else {
        console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] or Data Component [" + dataComponent + "] is Empty for Method ShowComponentSourceEditor")
    }
}

function bindRefreshViewHtml(event) {
    const el = event.target

    let dataProgress = getProgress(el)
    let dataResponse = getResponse(el)
    let dataAppSite = getAppSite(el)
    let dataAppView = getAppView(el)
    let dataAppFiles = getAppFiles(el)

    let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
    if (dataComponent == "") dataComponent = getTextValue(el, getAttributeValue(el, 'data-view'), "")
    let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
    let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
    if (el.hasAttribute("href") == true) {
        let href = getAttributeValue(el, 'href')
        if (href.length == 1) {
            if (href[0] == "#") {
                isRealtime = true
            }
        }
    }
    let realtimeDomain = ""
    if (isRealtime == true) {
        realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
    }

    let dataCallback = getAttributeValue(el, 'data-callback')

    if (getType(dataConfigJson) == "Object") {
        dataConfigJson["DefaultRealtime"] = isRealtime
        dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
    }

    let dataFilterJson = getJsonValue(el, getAttributeValue(el, 'data-filter'))
    const filterInfoHasKeys = !!Object.keys(dataFilterJson).length
    if (filterInfoHasKeys == true) {
        dataConfigJson["Filter"] = dataFilterJson
    }

    if ((dataAppSite != "") && (dataAppView != "")) {
        window["refreshViewHtml"](dataProgress, dataResponse, dataAppSite, dataAppView, dataAppFiles, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback)
    }
    else {
        console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] is Empty for Method RefreshViewHtml")
    }
}

function bindLoadComponentHtml(element) {
    const el = element

    let dataProgress = getProgress(el)
    let dataResponse = getResponse(el)
    let dataAppSite = getAppSite(el)
    let dataAppView = getAppView(el)

    let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
    if (dataComponent == "") dataComponent = getTextValue(el, getAttributeValue(el, 'data-view'), "")
    let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
    let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
    let realtimeDomain = ""
    if (isRealtime == true) {
        realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
    }

    let dataDelay = getIntValue(el, getAttributeValue(el, 'data-delay'), 25)
    let dataPreCall = getAttributeValue(el, 'data-precall')
    let dataCallback = getAttributeValue(el, 'data-callback')
    let dataReload = getBoolValue(el, getAttributeValue(el, 'data-reload', false))

    if (getType(dataConfigJson) == "Object") {
        dataConfigJson["DefaultRealtime"] = isRealtime
        dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
    }

    let dataFilterJson = getJsonValue(el, getAttributeValue(el, 'data-filter'))
    const filterInfoHasKeys = !!Object.keys(dataFilterJson).length
    if (filterInfoHasKeys == true) {
        dataConfigJson["Filter"] = dataFilterJson
    }

    if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
        window["loadComponentHtml"](dataProgress, dataResponse, dataAppSite, dataAppView, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataDelay, dataReload, dataCallback)
    }
    else {
        console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] or Data Component [" + dataComponent + "] is Empty for Method LoadComponentHtml")
    }
}

function bindRefreshComponentHtml(event) {
    let el = event.target
    if ((el.nodeName != "BUTTON") && (el.nodeName != "SELECT")) {
        el = el.parentNode
    }
    if ((el.nodeName == "BUTTON") || (el.nodeName == "SELECT")) {
        let dataProgress = getProgress(el)
        let dataResponse = getResponse(el)
        let dataAppSite = getAppSite(el)
        let dataAppView = getAppView(el)

        let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
        if (dataComponent == "") dataComponent = getTextValue(el, getAttributeValue(el, 'data-view'), "")
        let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
        let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
        let realtimeDomain = ""
        if (isRealtime == true) {
            realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
        }

        let dataCallback = getAttributeValue(el, 'data-callback')

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
        }

        let dataFilterJson = getJsonValue(el, getAttributeValue(el, 'data-filter'))
        const filterInfoHasKeys = !!Object.keys(dataFilterJson).length
        if (filterInfoHasKeys == true) {
            dataConfigJson["Filter"] = dataFilterJson
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["refreshComponentHtml"](dataProgress, dataResponse, dataAppSite, dataAppView, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback)
        }
        else {
            console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] or Data Component [" + dataComponent + "] is Empty for Method RefreshComponentHtml")
        }
    }
}

function bindSaveJson(event) {
    let el = event.target
    if (el.nodeName != "BUTTON") {
        el = el.parentNode
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el)
        let dataResponse = getResponse(el)
        let dataAppSite = getAppSite(el)
        let dataAppView = getAppView(el)

        let dataAppComponent = getTextValue(el, getAttributeValue(el, 'data-appcomponent'))
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo')

        let getSaveJson = getAttributeValue(el, 'data-datainfo')

        let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
        if (dataComponent == "") dataComponent = getTextValue(el, getAttributeValue(el, 'data-view'), "")
        let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
        let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
        let realtimeDomain = ""
        if (isRealtime == true) {
            realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
        }

        let dataCallback = getAttributeValue(el, 'data-callback')

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
        }

        let dataFilterJson = getJsonValue(el, getAttributeValue(el, 'data-filter'))
        const filterInfoHasKeys = !!Object.keys(dataFilterJson).length
        if (filterInfoHasKeys == true) {
            dataConfigJson["Filter"] = dataFilterJson
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["saveJson"](el, dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, getSaveJson, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback)
        }
        else {
            console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] or Data Component [" + dataComponent + "] is Empty for Method SaveJson")
        }

    }
}

function bindAddJsonToJsonArray(event) {
    let el = event.target
    if (el.nodeName != "BUTTON") {
        el = el.parentNode
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el)
        let dataResponse = getResponse(el)
        let dataAppSite = getAppSite(el)
        let dataAppView = getAppView(el)

        let dataAppComponent = getTextValue(el, getAttributeValue(el, 'data-appcomponent'))
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo')

        let getAddJson = getAttributeValue(el, 'data-datainfo')
        let getValidKeyJson = getAttributeValue(el, 'data-validkeyinfo')
        let getDuplicateKeyJson = getAttributeValue(el, 'data-duplicatekeyinfo')

        let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
        if (dataComponent == "") dataComponent = getTextValue(el, getAttributeValue(el, 'data-view'), "")
        let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
        let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
        let realtimeDomain = ""
        if (isRealtime == true) {
            realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
        }

        let dataCallback = getAttributeValue(el, 'data-callback')

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
        }

        let dataFilterJson = getJsonValue(el, getAttributeValue(el, 'data-filter'))
        const filterInfoHasKeys = !!Object.keys(dataFilterJson).length
        if (filterInfoHasKeys == true) {
            dataConfigJson["Filter"] = dataFilterJson
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["addJsonToJsonArray"](el, dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, getAddJson, getValidKeyJson, getDuplicateKeyJson, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback)
        }
        else {
            console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] or Data Component [" + dataComponent + "] is Empty for Method AddJsonToJsonArray")
        }

    }
}

function bindEditJsonInJsonArray(event) {
    let el = event.target
    if ((el.nodeName != "BUTTON") && (el.nodeName != "INPUT")) {
        el = el.parentNode
    }
    if ((el.nodeName == "BUTTON") || (el.nodeName == "INPUT")) {
        let dataProgress = getProgress(el)
        let dataResponse = getResponse(el)
        let dataAppSite = getAppSite(el)
        let dataAppView = getAppView(el)

        let dataAppComponent = getTextValue(el, getAttributeValue(el, 'data-appcomponent'))
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo')

        let getEditJson = getAttributeValue(el, 'data-datainfo')
        let getValidKeyJson = getAttributeValue(el, 'data-validkeyinfo')
        let getDuplicateKeyJson = getAttributeValue(el, 'data-duplicatekeyinfo')

        let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
        if (dataComponent == "") dataComponent = getTextValue(el, getAttributeValue(el, 'data-view'), "")
        let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
        let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
        let realtimeDomain = ""
        if (isRealtime == true) {
            realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
        }

        let dataCallback = getAttributeValue(el, 'data-callback')

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
        }

        let dataFilterJson = getJsonValue(el, getAttributeValue(el, 'data-filter'))
        const filterInfoHasKeys = !!Object.keys(dataFilterJson).length
        if (filterInfoHasKeys == true) {
            dataConfigJson["Filter"] = dataFilterJson
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["editJsonInJsonArray"](el, dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, getEditJson, getValidKeyJson, getDuplicateKeyJson, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback)
        }
        else {
            console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] or Data Component [" + dataComponent + "] is Empty for Method EditJsonInJsonArray")
        }
    }
}

function bindDeleteJsonInJsonArray(event) {
    let el = event.target
    if (el.nodeName != "BUTTON") {
        el = el.parentNode
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el)
        let dataResponse = getResponse(el)
        let dataAppSite = getAppSite(el)
        let dataAppView = getAppView(el)

        let dataAppComponent = getTextValue(el, getAttributeValue(el, 'data-appcomponent'))
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo')

        let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
        if (dataComponent == "") dataComponent = getTextValue(el, getAttributeValue(el, 'data-view'), "")
        let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
        let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
        let realtimeDomain = ""
        if (isRealtime == true) {
            realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
        }

        let dataCallback = getAttributeValue(el, 'data-callback')

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
        }

        let dataFilterJson = getJsonValue(el, getAttributeValue(el, 'data-filter'))
        const filterInfoHasKeys = !!Object.keys(dataFilterJson).length
        if (filterInfoHasKeys == true) {
            dataConfigJson["Filter"] = dataFilterJson
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["deleteJsonInJsonArray"](el, dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback)
        }
        else {
            console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] or Data Component [" + dataComponent + "] is Empty for Method DeleteJsonInJsonArray")
        }
    }
}

function bindCloneJsonInJsonArray(event) {
    let el = event.target
    if (el.nodeName != "BUTTON") {
        el = el.parentNode
    }
    if (el.nodeName == "BUTTON") {
        let dataProgress = getProgress(el)
        let dataResponse = getResponse(el)
        let dataAppSite = getAppSite(el)
        let dataAppView = getAppView(el)

        let dataAppComponent = getTextValue(el, getAttributeValue(el, 'data-appcomponent'))
        let getKeyInfo = getAttributeValue(el, 'data-keyinfo')

        let dataComponent = getTextValue(el, getAttributeValue(el, 'data-component'), "")
        if (dataComponent == "") dataComponent = getTextValue(el, getAttributeValue(el, 'data-view'), "")
        let dataConfigJson = getJsonValue(el, getAttributeValue(el, 'data-config'))
        let isRealtime = getBoolValue(el, getAttributeValue(el, 'data-isrealtime'), false)
        let realtimeDomain = ""
        if (isRealtime == true) {
            realtimeDomain = getTextValue(el, getAttributeValue(el, 'data-realtimedomain'), "")
        }

        let dataCallback = getAttributeValue(el, 'data-callback')

        if (getType(dataConfigJson) == "Object") {
            dataConfigJson["DefaultRealtime"] = isRealtime
            dataConfigJson["DefaultRealtimeDomain"] = realtimeDomain
        }

        let dataFilterJson = getJsonValue(el, getAttributeValue(el, 'data-filter'))
        const filterInfoHasKeys = !!Object.keys(dataFilterJson).length
        if (filterInfoHasKeys == true) {
            dataConfigJson["Filter"] = dataFilterJson
        }

        if ((dataAppSite != "") && (dataAppView != "") && (dataComponent != "")) {
            window["cloneJsonInJsonArray"](el, dataProgress, dataResponse, dataAppSite, dataAppView, dataAppComponent, getKeyInfo, dataComponent, dataConfigJson, isRealtime, realtimeDomain, dataCallback)
        }
        else {
            console.error("AppSite [" + dataAppSite + "] or AppView [" + dataAppView + "] or Data Component [" + dataComponent + "] is Empty for Method CloneJsonInJsonArray")
        }

    }
}

function bindAnchorAction(scopeElement) {

    let defaultAppSite = "Index"
    if (typeof getDefaultAppSite === "function") {
        defaultAppSite = getDefaultAppSite()
    }
    let defaultAppView = "Main"
    if (typeof getDefaultAppView === "function") {
        defaultAppView = getDefaultAppView()
    }
    let defaultRealtime = "false"
    if (typeof getDefaultRealtime === "function") {
        defaultRealtime = getDefaultRealtime()
    }
    let defaultRealtimeDomain = ""
    if (typeof getDefaultRealtimeDomain === "function") {
        if (getDefaultRealtimeDomain() == true) {
            defaultRealtimeDomain = "/" + defaultAppSite + "/" + defaultAppView
        }
    }
    let defaultRefreshComponents = "Nav, Content, Footer"
    if (typeof getDefaultRefreshComponents === "function") {
        defaultRefreshComponents = getDefaultRefreshComponents()
    }

    scopeElement.querySelectorAll('a').forEach(function (el) {
        let href = el.getAttribute('href')

        if (href) {
            let skipProcessHref = false
            if (href.trim() == "/") {
                //skipProcessHref = true
            }
            if (el.classList.contains("logoff") == true) {
                skipProcessHref = true
                el.setAttribute('href', "#" + href)
            }
            if (href.startsWith("#") == true) {
                skipProcessHref = true
            }
            if (href.toLowerCase().startsWith("http") == true) {
                skipProcessHref = true
            }
            if (skipProcessHref == false) {

                el.setAttribute('href', "#" + href)

                let appSite = defaultAppSite
                let appView = defaultAppView
                let hrefUrl = href
                if (hrefUrl.trim().startsWith("/") == true) {
                    hrefUrl = hrefUrl.trim().substring(1)
                }
                var hrefParts = hrefUrl.split("/")
                if (hrefParts.length >= 2) {
                    appSite = hrefParts[0]
                    appView = hrefParts[1]
                }
                console.log("Processing:" + href + "," + appSite + "," + appView)

                if (el.hasAttribute("data-action") == false) {
                    el.setAttribute('data-action', "refreshViewHtml")
                }
                if (el.hasAttribute("data-progress") == false) {
                    el.setAttribute('data-progress', "progress")
                }
                if (el.hasAttribute("data-response") == false) {
                    el.setAttribute('data-response', "response")
                }
                if (el.hasAttribute("data-appsite") == false) {
                    el.setAttribute('data-appsite', appSite)
                }
                if (el.hasAttribute("data-appview") == false) {
                    el.setAttribute('data-appview', appView)
                }
                if (el.hasAttribute("data-isrealtime") == false) {
                    el.setAttribute('data-isrealtime', defaultRealtime)
                }
                if (el.hasAttribute("data-realtimedomain") == false) {
                    el.setAttribute('data-realtimedomain', defaultRealtimeDomain)
                }
                if (el.hasAttribute("data-component") == false) {
                    el.setAttribute('data-component', defaultRefreshComponents)
                }
            }
        }
    })
}

function bindArshuAction(scopeElement) {

    if (typeof isOnlyRootGET === "function") {
        bindAnchorAction(scopeElement)
    }

    scopeElement.querySelectorAll('[data-action]').forEach(function (el) {
        let clickEvent = getTextValue(el, getAttributeValue(el, 'data-event'), "click")
        let changeEvent = getTextValue(el, getAttributeValue(el, 'data-event'), "change")
        let dataAction = getAttributeValue(el, 'data-action')
        let dataProcess = getAttributeValue(el, 'data-process')

        if ((!dataProcess) || (dataProcess == "true")) {
            if (el.nodeName == "DIV") {
                if (dataAction == "loadComponentHtml") {
                    bindLoadComponentHtml(el)
                }
                else if (dataAction == "showComponentSourceViewer") {
                    el.removeEventListener(clickEvent, bindShowComponentSourceViewer)
                    el.addEventListener(clickEvent, bindShowComponentSourceViewer, false)
                }
                else if (dataAction == "showComponentSourceEditor") {
                    el.removeEventListener(clickEvent, bindShowComponentSourceEditor)
                    el.addEventListener(clickEvent, bindShowComponentSourceEditor, false)
                } else {
                    if (typeof window[dataAction] === "function") {
                        el.removeEventListener(clickEvent, window[dataAction])
                        el.addEventListener(clickEvent, window[dataAction], false)
                    }
                }
            }
            else if (el.nodeName == "LI") {
                if (dataAction == "showComponentSourceViewer") {
                    el.removeEventListener(clickEvent, bindShowComponentSourceViewer)
                    el.addEventListener(clickEvent, bindShowComponentSourceViewer, false)
                }
                else if (dataAction == "showComponentSourceEditor") {
                    el.removeEventListener(clickEvent, bindShowComponentSourceEditor)
                    el.addEventListener(clickEvent, bindShowComponentSourceEditor, false)
                }
                else {
                    if (typeof window[dataAction] === "function") {
                        el.removeEventListener(clickEvent, window[dataAction])
                        el.addEventListener(clickEvent, window[dataAction], false)
                    }
                }
            }
            else if (el.nodeName == "A") {
                let dataAppSite = getAttributeValue(el, 'data-appsite')
                if ((dataAppSite) && (dataAppSite.length > 0)) {
                    let dataAppView = getAttributeValue(el, 'data-appview')
                    if ((dataAppSite) && (dataAppSite.length > 0)) {
                        let dataComponent = getAttributeValue(el, 'data-component')
                        if ((dataComponent) && (dataComponent.length > 0)) {
                            if (el.href.indexOf("#") > -1) {
                                if (dataAction == "refreshViewHtml") {
                                    el.removeEventListener(clickEvent, bindRefreshViewHtml)
                                    el.addEventListener(clickEvent, bindRefreshViewHtml, false)
                                }
                                else {
                                    if (typeof window[dataAction] === "function") {
                                        el.removeEventListener(clickEvent, window[dataAction])
                                        el.addEventListener(clickEvent, window[dataAction], false)
                                    }
                                }
                            } else {
                                if (el.href != '/') {
                                    console.warn("Bound anchor link [" + el.href + "] does not have # in front")
                                }
                            }
                        } else {
                            console.warn("Data Component is empty for Bound anchor link [" + el.href + "]")
                        }
                    } else {
                        console.warn("Data AppView is empty for Bound anchor link [" + el.href + "]")
                    }
                } else {
                    //console.warn("Data AppSite is empty for Bound anchor link [" + el.href + "]");
                }
            }
            else if (el.nodeName == "BUTTON") {
                if (dataAction == "showComponentSourceViewer") {
                    el.removeEventListener(clickEvent, bindShowComponentSourceViewer)
                    el.addEventListener(clickEvent, bindShowComponentSourceViewer, false)
                }
                else if (dataAction == "showComponentSourceEditor") {
                    el.removeEventListener(clickEvent, bindShowComponentSourceEditor)
                    el.addEventListener(clickEvent, bindShowComponentSourceEditor, false)
                }
                else if (dataAction == "refreshViewHtml") {
                    el.removeEventListener(clickEvent, bindRefreshViewHtml)
                    el.addEventListener(clickEvent, bindRefreshViewHtml, false)
                }
                else if (dataAction == "refreshComponentHtml") {
                    el.removeEventListener(clickEvent, bindRefreshComponentHtml)
                    el.addEventListener(clickEvent, bindRefreshComponentHtml, false)
                }
                else if (dataAction == "saveJson") {
                    el.removeEventListener(clickEvent, bindSaveJson)
                    el.addEventListener(clickEvent, bindSaveJson, false)
                }
                else if (dataAction == "addJsonToJsonArray") {
                    el.removeEventListener(clickEvent, bindAddJsonToJsonArray)
                    el.addEventListener(clickEvent, bindAddJsonToJsonArray, false)
                } else if (dataAction == "editJsonInJsonArray") {
                    el.removeEventListener(clickEvent, bindEditJsonInJsonArray)
                    el.addEventListener(clickEvent, bindEditJsonInJsonArray, false)
                }
                else if (dataAction == "deleteJsonInJsonArray") {
                    el.removeEventListener(clickEvent, bindDeleteJsonInJsonArray)
                    el.addEventListener(clickEvent, bindDeleteJsonInJsonArray, false)
                } else if (dataAction == "cloneJsonInJsonArray") {
                    el.removeEventListener(clickEvent, bindCloneJsonInJsonArray)
                    el.addEventListener(clickEvent, bindCloneJsonInJsonArray, false)
                }
                else {
                    if (typeof window[dataAction] === "function") {
                        el.removeEventListener(clickEvent, window[dataAction])
                        el.addEventListener(clickEvent, window[dataAction], false)
                    }
                }
            }
            else if (el.nodeName == "SELECT") {
                if (dataAction == "refreshComponentHtml") {
                    el.removeEventListener(changeEvent, bindRefreshComponentHtml)
                    el.addEventListener(changeEvent, bindRefreshComponentHtml, false)
                }
                else {
                    if (typeof window[dataAction] === "function") {
                        el.removeEventListener(clickEvent, window[dataAction])
                        el.addEventListener(clickEvent, window[dataAction], false)
                    }
                }
            }
            else if (el.nodeName == "INPUT") {
                let elmType = el.getAttribute("type")
                if ((elmType) && (elmType.toLowerCase() == 'checkbox')) {
                    if (dataAction == "editJsonInJsonArray") {
                        el.removeEventListener(changeEvent, bindEditJsonInJsonArray)
                        el.addEventListener(changeEvent, bindEditJsonInJsonArray)
                    }
                    else {
                        if (typeof window[dataAction] === "function") {
                            el.removeEventListener(clickEvent, window[dataAction])
                            el.addEventListener(clickEvent, window[dataAction], false)
                        }
                    }
                }
            }
            else {
                console.log("Unknown Element [" + el.nodeName + "]")
            }
        } else {
            console.warn("Element Binding [" + el.nodeName + "][" + el.id + "] Skipped due to Data Process is not true or empty")
        }
    })
}

/******************************************************************************************************************/
//Arshu 
/******************************************************************************************************************/



