
(function (n, t) { typeof exports == "object" && typeof module != "undefined" ? t(exports) : typeof define == "function" && define.amd ? define(["exports"], t) : (n = typeof globalThis != "undefined" ? globalThis : n || self, t(n.Spin = {})) })(this, function (n) { "use strict"; function i(n, t) { for (var i in t) n.style[i] = t[i]; return n } function r(n, t) { return typeof n == "string" ? n : n[t % n.length] } function e(n, t) { var e = Math.round(t.corners * t.width * 500) / 1e3 + "px", f = "none", h, u, v; for (t.shadow === !0 ? f = "0 2px 4px #000" : typeof t.shadow == "string" && (f = t.shadow), h = o(f), u = 0; u < t.lines; u++) { var c = ~~(360 / t.lines * u + t.rotate), l = i(document.createElement("div"), { position: "absolute", top: -t.width / 2 + "px", width: t.length + t.width + "px", height: t.width + "px", background: r(t.fadeColor, u), borderRadius: e, transformOrigin: "left", transform: "rotate(" + c + "deg) translateX(" + t.radius + "px)" }), a = u * t.direction / t.lines / t.speed; a -= 1 / t.speed; v = i(document.createElement("div"), { width: "100%", height: "100%", background: r(t.color, u), borderRadius: e, boxShadow: s(h, c), animation: 1 / t.speed + "s linear " + a + "s infinite " + t.animation }); l.appendChild(v); n.appendChild(l) } } function o(n) { for (var o, t, f = [], u = 0, e = n.split(","); u < e.length; u++)if (o = e[u], t = o.match(/^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/), t !== null) { var s = +t[2], h = +t[5], i = t[4], r = t[7]; (s !== 0 || i || (i = r), h !== 0 || r || (r = i), i === r) && f.push({ prefix: t[1] || "", x: s, y: h, xUnits: i, yUnits: r, end: t[8] }) } return f } function s(n, t) { for (var i, u, f = [], r = 0, e = n; r < e.length; r++)i = e[r], u = h(i.x, i.y, t), f.push(i.prefix + u[0] + i.xUnits + " " + u[1] + i.yUnits + i.end); return f.join(", ") } function h(n, t, i) { var r = i * Math.PI / 180, u = Math.sin(r), f = Math.cos(r); return [Math.round((n * f + t * u) * 1e3) / 1e3, Math.round((-n * u + t * f) * 1e3) / 1e3,] } var t = undefined && undefined.__assign || function () { return t = Object.assign || function (n) { for (var t, r, i = 1, u = arguments.length; i < u; i++) { t = arguments[i]; for (r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]) } return n }, t.apply(this, arguments) }, u = { lines: 12, length: 7, width: 5, radius: 10, scale: 1, corners: 1, color: "#000", fadeColor: "transparent", animation: "spinner-line-fade-default", rotate: 0, direction: 1, speed: 1, zIndex: 2e9, className: "spinner", top: "50%", left: "50%", shadow: "0 0 1px transparent", position: "absolute" }, f = function () { function n(n) { n === void 0 && (n = {}); this.opts = t(t({}, u), n) } return n.prototype.spin = function (n) { return this.stop(), this.el = document.createElement("div"), this.el.className = this.opts.className, this.el.setAttribute("role", "progressbar"), i(this.el, { position: this.opts.position, width: 0, zIndex: this.opts.zIndex, left: this.opts.left, top: this.opts.top, transform: "scale(" + this.opts.scale + ")" }), n && n.insertBefore(this.el, n.firstChild || null), e(this.el, this.opts), this }, n.prototype.stop = function () { return this.el && (typeof requestAnimationFrame != "undefined" ? cancelAnimationFrame(this.animateId) : clearTimeout(this.animateId), this.el.parentNode && this.el.parentNode.removeChild(this.el), this.el = undefined), this }, n }(); n.Spinner = f; Object.defineProperty(n, "__esModule", { value: !0 }) })

/******************************************************************************************************************/

var opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 35, // The radius of the inner circle 45
    scale: 0.25, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#919191', // 919191, 080808. ffffff CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
}

let spinnerlist = new Map()
let spinnerCount = new Map()

function ajaxStart(progressAnchorElmId) {

    if ((progressAnchorElmId) && (progressAnchorElmId.length > 0)) {
        if (haveElm(progressAnchorElmId) == true) {

            if (spinnerlist.has(progressAnchorElmId) == false) {

                let spinner = new Spin.Spinner(opts).spin()
                spinnerlist.set(progressAnchorElmId, spinner)
                spinnerCount.set(progressAnchorElmId, 1)

                let progressAnchorElm = getElm(progressAnchorElmId)
                progressAnchorElm.style.position = "relative"
                progressAnchorElm.appendChild(spinner.el)
            }
            else if (spinnerCount.has(progressAnchorElmId) == true) {
                let currentCount = spinnerCount.get(progressAnchorElmId)
                spinnerCount.set(progressAnchorElmId, currentCount + 1)

                if (currentCount == 0) {
                    let spinner = spinnerlist.get(progressAnchorElmId).spin()

                    let progressAnchorElm = getElm(progressAnchorElmId)
                    progressAnchorElm.style.position = "relative"
                    progressAnchorElm.appendChild(spinner.el)
                }
            }
        } else {
            console.error("Progress Element ID [" + progressAnchorElmId + "] not found to Start")
        }
    }
}

function ajaxStop(progressAnchorElmId) {

    if ((progressAnchorElmId) && (progressAnchorElmId.length > 0)) {
        if (haveElm(progressAnchorElmId) == true) {
            if (spinnerlist.has(progressAnchorElmId) == true) {
                if (spinnerCount.has(progressAnchorElmId) == true) {
                    let currentCount = spinnerCount.get(progressAnchorElmId)

                    if (currentCount <= 1) {
                        spinnerCount.set(progressAnchorElmId, 0)
                        spinnerlist.get(progressAnchorElmId).stop()
                    } else {
                        spinnerCount.set(progressAnchorElmId, currentCount - 1)
                    }
                }
            }
        }
        else {
            console.error("Progress Element ID [" + progressAnchorElmId + "] not found to Stop")
        }
    }
}

window.showLastAjaxCount = 7

function filterShowAjaxTime(serverResponseJson) {
    if ((serverResponseJson) && (serverResponseJson.ServiceInfo)) {
        if (serverResponseJson.ServiceInfo.toUpperCase().indexOf("MetricsApi".toUpperCase()) === -1) {
            recordAjaxTiming(serverResponseJson, false)
        }
    } else {
        recordAjaxTiming(serverResponseJson, false)
    }
}

function recordAjaxTiming(returnAjaxJson, clear) {
    let ajaxTimeElm = document.getElementById('ajaxTime')
    if (ajaxTimeElm) {
        if (clear === true) {
            //ajaxTimeElm.innerHTML = "";
            while (ajaxTimeElm.firstChild) ajaxTimeElm.removeChild(ajaxTimeElm.firstChild)
        }

        let currentTimestamp = Math.floor(new Date().getTime())
        let ajaxTimeVal = ""

        if (returnAjaxJson.hasOwnProperty('ClientRequestStartTimestamp') === true) {

            let clientRequestStartTimestamp = returnAjaxJson['ClientRequestStartTimestamp']
            let clientRequestTimestampDifference = currentTimestamp - clientRequestStartTimestamp

            let serverRequestStartTimestamp = 0
            if (returnAjaxJson.hasOwnProperty('ServerRequestStartTimestamp') === true) {
                serverRequestStartTimestamp = returnAjaxJson['ServerRequestStartTimestamp']
            }

            let serverRequestEndTimestamp = currentTimestamp
            if (returnAjaxJson.hasOwnProperty('ServerRequestEndTimestamp') === true) {
                serverRequestEndTimestamp = returnAjaxJson['ServerRequestEndTimestamp']
            }

            let serverRequestTimestampDifference = (serverRequestEndTimestamp - serverRequestStartTimestamp)
            let networkTimestampDifference = clientRequestTimestampDifference - serverRequestTimestampDifference

            if (clientRequestTimestampDifference > 0) {
                if ((serverRequestTimestampDifference <= 0) && (clientRequestTimestampDifference != serverRequestTimestampDifference)) {
                    ajaxTimeVal = "(<span style='color:red;'>" + clientRequestTimestampDifference + "</span>)"
                    if (returnAjaxJson.hasOwnProperty('ServiceInfo') === true) {
                        ajaxTimeVal = "(<span style='color:red;' title='" + returnAjaxJson.ServiceInfo + "'>" + clientRequestTimestampDifference + "</span>)"
                        if (typeof sendAjaxMetrics === "function") {
                            sendAjaxMetrics(returnAjaxJson.ServiceInfo, serverRequestTimestampDifference, clientRequestTimestampDifference)
                        }
                    }
                } else {
                    ajaxTimeVal = "(<span style='color:red;'>" + clientRequestTimestampDifference + "[" + serverRequestTimestampDifference + "]</span>)"
                    if (returnAjaxJson.hasOwnProperty('ServiceInfo') === true) {
                        ajaxTimeVal = "(<span style='color:red;' title='" + returnAjaxJson.ServiceInfo + "'>" + clientRequestTimestampDifference + "[" + serverRequestTimestampDifference + "]</span>)"
                        if (typeof sendAjaxMetrics === "function") {
                            sendAjaxMetrics(returnAjaxJson.ServiceInfo, serverRequestTimestampDifference, clientRequestTimestampDifference)
                        }
                    }
                }
            } else {
                if (serverRequestTimestampDifference > 0) {
                    ajaxTimeVal = "(<span style='color:red;'>[" + serverRequestTimestampDifference + "]</span>)"
                    if (returnAjaxJson.hasOwnProperty('ServiceInfo') === true) {
                        ajaxTimeVal = "(<span style='color:red;' title='" + returnAjaxJson.ServiceInfo + "'>[" + serverRequestTimestampDifference + "]</span>)"
                        if (typeof sendAjaxMetrics === "function") {
                            sendAjaxMetrics(returnAjaxJson.ServiceInfo, serverRequestTimestampDifference, clientRequestTimestampDifference)
                        }
                    }
                }
            }
        }
        else {
            if (returnAjaxJson.hasOwnProperty('ServerRequestStartTimestamp') === true) {
                let serverRequestStartTimestamp = 0
                if (returnAjaxJson.hasOwnProperty('ServerRequestStartTimestamp') === true) {
                    serverRequestStartTimestamp = returnAjaxJson['ServerRequestStartTimestamp']
                }

                let serverRequestEndTimestamp = currentTimestamp
                if (returnAjaxJson.hasOwnProperty('ServerRequestEndTimestamp') === true) {
                    serverRequestEndTimestamp = returnAjaxJson['ServerRequestEndTimestamp']
                }

                let serverRequestTimestampDifference = (serverRequestEndTimestamp - serverRequestStartTimestamp)
                let networkTimestampDifference = requestTimestampDifference - serverTimestampDifference

                if (serverRequestTimestampDifference > 0) {
                    ajaxTimeVal = "(<span style='color:red;'>[" + serverRequestTimestampDifference + "]</span>)"
                    if (returnAjaxJson.hasOwnProperty('ServiceInfo') === true) {
                        ajaxTimeVal = "(<span style='color:red;' title='" + returnAjaxJson.ServiceInfo + "'>[" + serverRequestTimestampDifference + "]</span>)"
                        if (typeof sendAjaxMetrics === "function") {
                            sendAjaxMetrics(returnAjaxJson.ServiceInfo, serverRequestTimestampDifference, clientRequestTimestampDifference)
                        }
                    }
                }
            }
        }

        if (ajaxTimeVal.length > 0) {
            let ajaxTimeElmText = ajaxTimeElm.innerHTML.trim()
            let storedAjaxTime = sessionStorage.getItem('ajaxTime')
            if (storedAjaxTime !== null) {
                if (storedAjaxTime.length > 0) {
                    ajaxTimeElmText = storedAjaxTime
                }
            }

            let ajaxTimeList = ""
            if (ajaxTimeElmText.length === 0) {
                ajaxTimeList = ajaxTimeVal
            }
            else {
                if (ajaxTimeElmText.indexOf(",") === -1) {
                    ajaxTimeList = ajaxTimeElmText + "," + ajaxTimeVal
                } else {
                    let ajaxTimeArr = ajaxTimeElmText.split(",", window.showLastAjaxCount)
                    if (ajaxTimeArr.length >= window.showLastAjaxCount) ajaxTimeArr.shift()
                    ajaxTimeList = ajaxTimeArr.join(",") + "," + ajaxTimeVal
                }
            }
            ajaxTimeElm.innerHTML = "Ajax[" + ajaxTimeList + "]"
            sessionStorage.setItem("ajaxTime", ajaxTimeList)
        }
    }
}

function clearAjaxTiming() {
    let ajaxTimeElm = document.getElementById('ajaxTime')
    if (ajaxTimeElm) {
        if (ajaxTimeElm) {
            while (ajaxTimeElm.firstChild) ajaxTimeElm.removeChild(ajaxTimeElm.firstChild)
            //ajaxTimeElm.innerHTML = "";
        }
    }
    sessionStorage.setItem("ajaxTime", "")
}

/******************************************************************************************************************/

const parseJson = async response => {
    const text = await response.text()
    try {
        const json = JSON.parse(text)
        return json
    } catch (err) {
        //throw new Error("Did not receive JSON, instead received: " + text)
    }
}

function dopost(progressElmId, responseElmId, url, bodyContent, successCallback, failureCallback, clientRequestStartTimestamp) {

    ajaxStart(progressElmId)

    if (!clientRequestStartTimestamp) {
        clientRequestStartTimestamp = Math.floor(new Date().getTime())
    }

    const urlParams = (new URL(document.location)).searchParams
    const region = urlParams.get('region')
    const instance = urlParams.get('instance')
    const appname = urlParams.get('app')
    if ((region) && (region.length > 0)) {
        var regionUrl = new URL(url, document.baseURI)
        if (regionUrl.searchParams.has('region') == false) {
            regionUrl.searchParams.append('region', region)
            url = regionUrl.toString()
            console.log('Region Url:', url)
        }
    }
    else if ((instance) && (instance.length > 0)) {
        var instanceUrl = new URL(url, document.baseURI)
        if (instanceUrl.searchParams.has('instance') == false) {
            instanceUrl.searchParams.append('instance', region)
            url = instanceUrl.toString()
            console.log('Instance Url:', url)
        }
    }
    else if ((appname) && (appname.length > 0)) {
        var appnameUrl = new URL(url, document.baseURI)
        if (appnameUrl.searchParams.has('app') == false) {
            appnameUrl.searchParams.append('app', appname)
            url = appnameUrl.toString()
            console.log('App Url:', url)
        }
    }

    fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CLIENT_REQUEST_START_TIMESTAMP': clientRequestStartTimestamp
        },
        body: bodyContent,
    })
        .then(parseJson)
        .then(data => {
            ajaxStop(progressElmId)
            if (data) {
                filterShowAjaxTime(data)

                if ((data.hasOwnProperty('result') === true) && (data.result)) {
                    data.Result = data.result
                }
                if ((data.hasOwnProperty('error') === true) && (data.error)) {
                    data.Error = data.error
                }
                if ((data.hasOwnProperty('redirect') === true) && (data.redirect)) {
                    data.Redirect = data.redirect
                }
                if ((data.hasOwnProperty('Result') === true) && (data.Result)) {
                    let result = data.Result
                    if (typeof successCallback === "function") {
                        successCallback(data)
                    }
                }
                else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                    if (data.hasOwnProperty('Redirect') === true) {
                        if (data.Redirect == true) {
                            setTimeout(function () {
                                window.location.href = "/"
                            }, 1000)
                        } else {
                            if (typeof failureCallback === "function") {
                                failureCallback(data)
                            }
                        }
                    } else {
                        let error = data.Error
                        if (typeof failureCallback === "function") {
                            failureCallback(data)
                        }
                    }
                }
            }
            else {
                console.error("Return Data is not Json for POST url :" + url)
            }
        })
        .catch((error) => {
            ajaxStop(progressElmId)
            filterShowAjaxTime(error)
            if ((error.hasOwnProperty('statusText') === true) && (error.hasOwnProperty('status') === true)) {
                if (typeof failureCallback === "function") {
                    failureCallback(error)
                } else {
                    if (haveElm(responseElmId) == true) {
                        showText(responseElm, error.status + ' ' + error.statusText, 'red')
                    }
                }
            } else {
                if (typeof failureCallback === "function") {
                    failureCallback(error)
                }
            }
        })

}

function dopostform(progressElmId, responseElmId, url, dataContent, successCallback, failureCallback, clientRequestStartTimestamp) {

    ajaxStart(progressElmId)

    if (!clientRequestStartTimestamp) {
        clientRequestStartTimestamp = Math.floor(new Date().getTime())
    }

    const urlParams = (new URL(document.location)).searchParams
    const region = urlParams.get('region')
    const instance = urlParams.get('instance')
    const appname = urlParams.get('app')
    if ((region) && (region.length > 0)) {
        var regionUrl = new URL(url, document.baseURI)
        if (regionUrl.searchParams.has('region') == false) {
            regionUrl.searchParams.append('region', region)
            url = regionUrl.toString()
            console.log('Region Url:', url)
        }
    }
    else if ((instance) && (instance.length > 0)) {
        var instanceUrl = new URL(url, document.baseURI)
        if (instanceUrl.searchParams.has('instance') == false) {
            instanceUrl.searchParams.append('instance', region)
            url = instanceUrl.toString()
            console.log('Region Url:', url)
        }
    }
    else if ((appname) && (appname.length > 0)) {
        var appnameUrl = new URL(url, document.baseURI)
        if (appnameUrl.searchParams.has('app') == false) {
            appnameUrl.searchParams.append('app', appname)
            url = appnameUrl.toString()
            console.log('App Url:', url)
        }
    }

    fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'X-CLIENT_REQUEST_START_TIMESTAMP': clientRequestStartTimestamp
        },
        body: dataContent,
    })
        .then(parseJson)
        .then(data => {
            ajaxStop(progressElmId)
            if (data) {
                filterShowAjaxTime(data)
                if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
                    let result = data.Result

                    if (typeof successCallback === "function") {
                        successCallback(data)
                    }
                    else if (window.hasOwnProperty(successCallback) == true) {
                        window[successCallback]()
                    }
                }
                else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                    if (data.hasOwnProperty('Redirect') === true) {
                        if (data.Redirect == true) {
                            setTimeout(function () {
                                window.location.href = "/"
                            }, 1000)
                        } else {
                            if (typeof failureCallback === "function") {
                                failureCallback(data)
                            }
                        }
                    } else {
                        let error = data.Error
                        if (typeof failureCallback === "function") {
                            failureCallback(data)
                        }
                    }
                }
            }
        })
        .catch((error) => {
            ajaxStop(progressElmId)
            filterShowAjaxTime(error)
            if ((error.hasOwnProperty('statusText') === true) && (error.hasOwnProperty('status') === true)) {
                if (typeof failureCallback === "function") {
                    failureCallback(data)
                } else {
                    if (haveElm(responseElmId) == true) {
                        showText(responseElm, error.status + ' ' + error.statusText, 'red')
                    }
                }
            }
        })
}

//function doget(progressElmId, responseElmId, url, successCallback, failureCallback, clientRequestStartTimestamp) {

//    ajaxStart(progressElmId)

//    if (!clientRequestStartTimestamp) {
//        clientRequestStartTimestamp = Math.floor(new Date().getTime())
//    }

//    const urlParams = (new URL(document.location)).searchParams
//    const region = urlParams.get('region')
//    const instance = urlParams.get('instance')
//    const appname = urlParams.get('app')
//    if ((region) && (region.length > 0)) {
//        var regionUrl = new URL(url, document.baseURI)
//        if (regionUrl.searchParams.has('region') == false) {
//            regionUrl.searchParams.append('region', region)
//            url = regionUrl.toString()
//            console.log('Region Url:', url)
//        }
//    }
//    else if ((instance) && (instance.length > 0)) {
//        var instanceUrl = new URL(url, document.baseURI)
//        if (instanceUrl.searchParams.has('instance') == false) {
//            instanceUrl.searchParams.append('instance', region)
//            url = instanceUrl.toString()
//            console.log('Region Url:', url)
//        }
//    }
//    else if ((appname) && (appname.length > 0)) {
//        var appnameUrl = new URL(url, document.baseURI)
//        if (appnameUrl.searchParams.has('app') == false) {
//            appnameUrl.searchParams.append('app', appname)
//            url = appnameUrl.toString()
//            console.log('App Url:', url)
//        }
//    }

//    fetch(url, {
//        method: 'GET',
//        credentials: 'same-origin',
//        headers: {
//            'Content-Type': 'application/json', //application/xml, text/plain, text/html, *.*
//            'X-CLIENT_REQUEST_START_TIMESTAMP': clientRequestStartTimestamp
//        },
//    })
//        .then(parseJson)
//        .then(data => {
//            ajaxStop(progressElmId)
//            if (data) {
//                if (data) {
//                    filterShowAjaxTime(data)
//                    if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
//                        let result = data.Result

//                        if (typeof successCallback === "function") {
//                            successCallback(data)
//                        }
//                        else if (window.hasOwnProperty(successCallback) == true) {
//                            window[successCallback]()
//                        }
//                    }
//                    else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
//                        if (data.hasOwnProperty('Redirect') === true) {
//                            if (data.Redirect == true) {
//                                setTimeout(function () {
//                                    window.location.href = "/"
//                                }, 1000)
//                            } else {
//                                if (typeof failureCallback === "function") {
//                                    failureCallback(data)
//                                }
//                            }
//                        } else {
//                            let error = data.Error
//                            if (typeof failureCallback === "function") {
//                                failureCallback(data)
//                            }
//                        }
//                    } else {
//                        if (typeof successCallback === "function") {
//                            successCallback(data)
//                        }
//                        else if (window.hasOwnProperty(successCallback) == true) {
//                            window[successCallback]()
//                        }
//                    }
//                }
//            }
//            else {
//                console.error("Return Data is not Json for GET url :" + url)
//            }
//        })
//        .catch((error) => {
//            ajaxStop(progressElmId)
//            filterShowAjaxTime(error)
//            if ((error.hasOwnProperty('statusText') === true) && (error.hasOwnProperty('status') === true)) {
//                if (typeof failureCallback === "function") {
//                    failureCallback(data)
//                } else {
//                    if (haveElm(responseElmId) == true) {
//                        showText(responseElm, error.status + ' ' + error.statusText, 'red')
//                    }
//                }
//            }
//        })
//}

//(document).ajaxComplete(function (event, request, settings) {
//    console.log(settings.url + " completed")
//    console.log('Content-Type:' + request.getResponseHeader("Content-Type"))
//    console.log('X-REQUEST-Token:' + request.getResponseHeader("X-REQUEST-Token"))
//})

/******************************************************************************************************************/
//Element Utilitiies
/******************************************************************************************************************/

//Returns true if it is a DOM node
function isNode(o) {
    return (
        typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
    )
}

//Returns true if it is a DOM element    
function isElement(o) {
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    )
}

function haveElm(elmIdOrName, scopeElmId, checkName) {
    let parentElm = document
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId)
        }
    }
    if (parentElm) {
        let elm = parentElm.getElementById(elmIdOrName)
        if (elm == null) {
            if (typeof checkName !== 'undefined' && checkName !== null && checkName === true) {
                elm = parentElm.getElementsByName(elmIdOrName)
                if (elm == null) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        } else {
            return true
        }
    } else {
        return false
    }
}

function getElm(elmIdOrName, scopeElmId, checkName) {
    let parentElm = document
    let scoped = false
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId)
            scoped = true
        }
    }
    if (parentElm) {
        let elm = parentElm.getElementById(elmIdOrName)
        if (elm == null) {
            if (typeof checkName !== 'undefined' && checkName !== null && checkName === true) {
                elm = parentElm.getElementsByName(elmIdOrName)
                if (elm == null) {
                    if (scoped === false) {
                        alert('Id [' + elmIdOrName + '] not found for getElm')
                        console.log('Id [' + elmIdOrName + '] not found for getElm')
                    } else {
                        alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for getElm')
                        console.log('Id [' + elmIdOrName + '] not found under scoped id [' + scopeElmId + '] for getElm')
                    }
                    return null
                } else {
                    return elm
                }
            } else {
                if (scoped === false) {
                    alert('Id [' + elmIdOrName + '] not found for getElm')
                    console.log('Id [' + elmIdOrName + '] not found for getElm')
                } else {
                    alert('Id [' + elmIdOrName + '] not found under scoped id [' + scopeElmId + '] for getElm')
                    console.log('Id [' + elmIdOrName + '] not found under scoped id [' + scopeElmId + '] for getElm')
                }
                return null
            }
        } else {
            return elm
        }
    } else {
        alert('Scope Elm Id [' + scopeElmId + '] not found for getElm')
        console.log('Scope Elm Id [' + scopeElmId + '] not found for getElm')
    }
}

function haveElms(elmSelector, scopeElmId) {
    let parentElm = document
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId)
        }
    }
    if (parentElm) {
        let elms = parentElm.querySelectorAll(elmSelector)
        if ((elms == null) || (elms.length == 0)) {
            return false
        } else {
            return true
        }
    } else {
        return false
    }
}

function haveElmsInScope(elmSelector, scopeElm) {
    let parentElm = document
    if (typeof scopeElm !== 'undefined' || scopeElm !== null) {
        if (scopeElm) {
            parentElm = scopeElm
        }
    }
    if (parentElm) {
        let elms = parentElm.querySelectorAll(elmSelector)
        if ((elms == null) || (elms.length == 0)) {
            return false
        } else {
            return true
        }
    } else {
        return false
    }
}

function getElms(elmSelector, scopeElmId) {
    let parentElm = document
    let scoped = false
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId)
            scoped = true
        }
    }
    if (parentElm) {
        let elms = parentElm.querySelectorAll(elmSelector)
        if ((elms == null) || (elms.length == 0)) {
            if (scoped === false) {
                alert('Selector [' + elmSelector + '] not found for getElms')
                console.log('Selector [' + elmSelector + '] not found for getElms')
            } else {
                alert('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElms')
                console.log('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElms')
            }
            return null
        } else {
            return elms
        }
    }
    else {
        alert('Scope Elm Id [' + scopeElmId + '] not found for getElms')
        console.log('Scope Elm Id [' + scopeElmId + '] not found for getElms')
    }
}

function getElmsInScope(elmSelector, scopeElm) {
    let parentElm = document
    let scoped = false
    if (typeof scopeElm !== 'undefined' || scopeElm !== null) {
        if (scopeElm) {
            parentElm = scopeElm
            scoped = true
        }
    }
    if (parentElm) {
        let elms = parentElm.querySelectorAll(elmSelector)
        if ((elms == null) || (elms.length == 0)) {
            if (scoped === false) {
                alert('Selector [' + elmSelector + '] not found for getElms')
                console.log('Selector [' + elmSelector + '] not found for getElms')
            } else {
                alert('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElms')
                console.log('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElms')
            }
            return null
        } else {
            return elms
        }
    }
}

function getElmBySel(elmSelector, scopeElmId) {
    let parentElm = document
    let scoped = false
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId)
            scoped = true
        }
    }
    if (parentElm) {
        let elm = parentElm.querySelector(elmSelector)
        if (elm) {
            return elm
        } else {
            if (scoped === false) {
                alert('Selector [' + elmSelector + '] not found for getElmBySel')
                console.log('Selector [' + elmSelector + '] not found for getElmBySel')
            } else {
                alert('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElmBySel')
                console.log('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElmBySel')
            }
            return null
        }
    }
    else {
        alert('Scope Elm Id [' + scopeElmId + '] not found for getElmBySel')
        console.log('Scope Elm Id [' + scopeElmId + '] not found for getElmBySel')
    }
}

function getElmBySelInScope(elmSelector, scopeElm) {
    let parentElm = document
    let scoped = false
    if (typeof scopeElm !== 'undefined' || scopeElm !== null) {
        if (scopeElm) {
            parentElm = scopeElm
            scoped = true
        }
    }
    if (parentElm) {
        let elm = parentElm.querySelector(elmSelector)
        if (elm) {
            return elm
        } else {
            if (scoped === false) {
                alert('Selector [' + elmSelector + '] not found for getElmBySel')
                console.log('Selector [' + elmSelector + '] not found for getElmBySel')
            } else {
                alert('Selector [' + elmSelector + '] not found under scoped id [' + scopeElm.id + '] for getElmBySel')
                console.log('Selector [' + elmSelector + '] not found under scoped id [' + scopeElm.id + '] for getElmBySel')
            }
            return null
        }
    }
}

function hideElm(elmId, scopeElmId) {
    let scoped = false
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true
        }
    }
    let elm = getElm(elmId, scopeElmId)
    if (elm != null) {
        elm.style.display = 'none'
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for hideElm')
            console.log('Id [' + elmId + '] not found for hideElm')
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for hideElm')
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for hideElm')
        }
    }
}

function showElm(elmId, scopeElmId) {
    let scoped = false
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true
        }
    }
    let elm = getElm(elmId, scopeElmId)
    if (elm != null) {
        elm.style.display = ''
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for showElm')
            console.log('Id [' + elmId + '] not found for showElm')
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for showElm')
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for showElm')
        }
    }
}

function toggleElm(elmId, scopeElmId) {
    let scoped = false
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true
        }
    }
    let elm = getElm(elmId, scopeElmId)
    if (elm != null) {
        if (elm.style.display === 'none') {
            elm.style.display = ''
        }
        else {
            elm.style.display = 'none'
        }
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for toggleElm')
            console.log('Id [' + elmId + '] not found for toggleElm')
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for toggleElm')
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for toggleElm')
        }
    }
}

function isHiddenElm(elmId, scopeElmId) {
    let scoped = false
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true
        }
    }
    let elm = getElm(elmId, scopeElmId)
    if (elm !== null) {
        let isHidden = (elm.offsetParent === null)
        if (isHidden == false) {
            let style = window.getComputedStyle(elm)
            isHidden = (style.display === 'none')
        }
        return isHidden
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for isHiddenElm')
            console.log('Id [' + elmId + '] not found for isHiddenElm')
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for isHiddenElm')
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for isHiddenElm')
        }
    }
    return true
}

/******************************************************************************************************************/
//Event Utilitiies
/******************************************************************************************************************/

function triggerEvent(elmId, eventName, scopeElmId) {
    let scoped = false
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true
        }
    }

    let elm = getElm(elmId, scopeElmId)
    if (elm != null) {
        elm.dispatchEvent(new Event(eventName))
    } else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found to trigger event')
            console.log('Id [' + elmId + '] not found to trigger event')
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + ']  to trigger event')
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] to trigger event')
        }
    }
    return true
}

/******************************************************************************************************************/
//Event Handler Tracking
/******************************************************************************************************************/

let _eventHandlers = {}

const addListener = (node, event, handler, capture = false) => {
    if (!(event in _eventHandlers)) {
        _eventHandlers[event] = []
    }
    // here we track the events and their nodes (note that we cannot
    // use node as Object keys, as they'd get coerced into a string
    _eventHandlers[event].push({ node: node, handler: handler, capture: capture })
    node.addEventListener(event, handler, capture)
}

const removeAllListeners = (targetNode, event) => {
    // remove listeners from the matching nodes
    _eventHandlers[event]
        .filter(({ node }) => node === targetNode)
        .forEach(({ node, handler, capture }) => node.removeEventListener(event, handler, capture))

    // update _eventHandlers global
    _eventHandlers[event] = _eventHandlers[event].filter(
        ({ node }) => node !== targetNode,
    )
}


/******************************************************************************************************************/
//NavBar
/******************************************************************************************************************/

function navBarToggleClickEvent(targetMenu) {
    if (targetMenu.classList.contains("ar-active")) {
        targetMenu.classList.remove("ar-active")
        toggleElm.innerHTML = "<svg style='width: 32px; ' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16'></path></svg>"
    } else {
        targetMenu.classList.add("ar-active")
        toggleElm.innerHTML = "<svg style='width: 32px' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'></path></svg>"
    }
}

function navBarSubMenuClickEvent(targetMenu, subMenuItem) {
    if (subMenuItem.classList.contains("ar-submenu-active")) {
        subMenuItem.classList.remove("ar-submenu-active")
    } else if (targetMenu.querySelector(".ar-submenu-active")) {
        targetMenu.querySelector(".ar-submenu-active").classList.remove("ar-submenu-active")
        subMenuItem.classList.add("ar-submenu-active")
    } else {
        subMenuItem.classList.add("ar-submenu-active")
    }
}

function navBarSubMenuCloseClickEvent(clickElm, targetMenu) {
    let isClickInside = targetMenu.contains(clickElm.target)
    if (!isClickInside && targetMenu.querySelector(".ar-submenu-active")) {
        targetMenu.querySelector(".ar-submenu-active").classList.remove("ar-submenu-active")
    }
}

function initNavBarToggle() {
    // Get all ".ar-menutoggle" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.ar-menutoggle'), 0)

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(toggleElm => {

            let targetMenu = null
            const targetElmId = toggleElm.dataset.target
            if (haveElm(targetElmId) == true) {
                targetMenu = document.getElementById(targetElmId)

                if (targetMenu != null) {

                    addListener(toggleElm, 'click', () => { navBarToggleClickEvent(targetMenu) }, false)

                    if (haveElms(".ar-menuitem", targetElmId) == true) {
                        const items = getElms(".ar-menuitem", targetElmId)
                        if (items.length > 0) {
                            for (i = 0; i < items.length; ++i) {
                                let subMenuItem = items[i]
                                if (subMenuItem.querySelector(".ar-submenu")) {
                                    addListener(subMenuItem, 'click', () => { navBarSubMenuClickEvent(targetMenu, subMenuItem) }, false)
                                }
                            }
                        }

                        addListener(document, 'click', () => { navBarSubMenuCloseClickEvent(toggleElm, targetMenu) }, false)
                    }
                }
            }
        })
    }
}

function removeNavBarToggleEvents() {
    // Get all ".ar-menutoggle" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.ar-menutoggle'), 0)

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(toggleElm => {

            let targetMenu = null
            const targetElmId = toggleElm.dataset.target
            if (haveElm(targetElmId) == true) {
                targetMenu = document.getElementById(targetElmId)

                if (targetMenu != null) {

                    removeAllListeners(toggleElm, 'click')

                    if (haveElms(".ar-menuitem", targetElmId) == true) {
                        const items = getElms(".ar-menuitem", targetElmId)
                        if (items.length > 0) {
                            for (i = 0; i < items.length; ++i) {
                                let subMenuItem = items[i]
                                if (subMenuItem.querySelector(".ar-submenu")) {
                                    removeAllListeners(subMenuItem, 'click')
                                }
                            }
                        }

                        removeAllListeners(document, 'click')
                    }
                }
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initNavBarToggle()
})
