
(function (n, t) { typeof exports == "object" && typeof module != "undefined" ? t(exports) : typeof define == "function" && define.amd ? define(["exports"], t) : (n = typeof globalThis != "undefined" ? globalThis : n || self, t(n.Spin = {})) })(this, function (n) { "use strict"; function i(n, t) { for (var i in t) n.style[i] = t[i]; return n } function r(n, t) { return typeof n == "string" ? n : n[t % n.length] } function e(n, t) { var e = Math.round(t.corners * t.width * 500) / 1e3 + "px", f = "none", h, u, v; for (t.shadow === !0 ? f = "0 2px 4px #000" : typeof t.shadow == "string" && (f = t.shadow), h = o(f), u = 0; u < t.lines; u++) { var c = ~~(360 / t.lines * u + t.rotate), l = i(document.createElement("div"), { position: "absolute", top: -t.width / 2 + "px", width: t.length + t.width + "px", height: t.width + "px", background: r(t.fadeColor, u), borderRadius: e, transformOrigin: "left", transform: "rotate(" + c + "deg) translateX(" + t.radius + "px)" }), a = u * t.direction / t.lines / t.speed; a -= 1 / t.speed; v = i(document.createElement("div"), { width: "100%", height: "100%", background: r(t.color, u), borderRadius: e, boxShadow: s(h, c), animation: 1 / t.speed + "s linear " + a + "s infinite " + t.animation }); l.appendChild(v); n.appendChild(l) } } function o(n) { for (var o, t, f = [], u = 0, e = n.split(","); u < e.length; u++)if (o = e[u], t = o.match(/^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/), t !== null) { var s = +t[2], h = +t[5], i = t[4], r = t[7]; (s !== 0 || i || (i = r), h !== 0 || r || (r = i), i === r) && f.push({ prefix: t[1] || "", x: s, y: h, xUnits: i, yUnits: r, end: t[8] }) } return f } function s(n, t) { for (var i, u, f = [], r = 0, e = n; r < e.length; r++)i = e[r], u = h(i.x, i.y, t), f.push(i.prefix + u[0] + i.xUnits + " " + u[1] + i.yUnits + i.end); return f.join(", ") } function h(n, t, i) { var r = i * Math.PI / 180, u = Math.sin(r), f = Math.cos(r); return [Math.round((n * f + t * u) * 1e3) / 1e3, Math.round((-n * u + t * f) * 1e3) / 1e3,] } var t = undefined && undefined.__assign || function () { return t = Object.assign || function (n) { for (var t, r, i = 1, u = arguments.length; i < u; i++) { t = arguments[i]; for (r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]) } return n }, t.apply(this, arguments) }, u = { lines: 12, length: 7, width: 5, radius: 10, scale: 1, corners: 1, color: "#000", fadeColor: "transparent", animation: "spinner-line-fade-default", rotate: 0, direction: 1, speed: 1, zIndex: 2e9, className: "spinner", top: "50%", left: "50%", shadow: "0 0 1px transparent", position: "absolute" }, f = function () { function n(n) { n === void 0 && (n = {}); this.opts = t(t({}, u), n) } return n.prototype.spin = function (n) { return this.stop(), this.el = document.createElement("div"), this.el.className = this.opts.className, this.el.setAttribute("role", "progressbar"), i(this.el, { position: this.opts.position, width: 0, zIndex: this.opts.zIndex, left: this.opts.left, top: this.opts.top, transform: "scale(" + this.opts.scale + ")" }), n && n.insertBefore(this.el, n.firstChild || null), e(this.el, this.opts), this }, n.prototype.stop = function () { return this.el && (typeof requestAnimationFrame != "undefined" ? cancelAnimationFrame(this.animateId) : clearTimeout(this.animateId), this.el.parentNode && this.el.parentNode.removeChild(this.el), this.el = undefined), this }, n }(); n.Spinner = f; Object.defineProperty(n, "__esModule", { value: !0 }) });

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
};

let spinnerlist = new Map();
let spinnerCount = new Map();

function ajaxStart(progressAnchorElmId) {

    if ((progressAnchorElmId) && (progressAnchorElmId.length > 0)) {
        if (haveElm(progressAnchorElmId) == true) {

            if (spinnerlist.has(progressAnchorElmId) == false) {

                let spinner = new Spin.Spinner(opts).spin();
                spinnerlist.set(progressAnchorElmId, spinner);
                spinnerCount.set(progressAnchorElmId, 1);

                let progressAnchorElm = getElm(progressAnchorElmId);
                progressAnchorElm.style.position = "relative";
                progressAnchorElm.appendChild(spinner.el);
            }
            else if (spinnerCount.has(progressAnchorElmId) == true) {
                let currentCount = spinnerCount.get(progressAnchorElmId);
                spinnerCount.set(progressAnchorElmId, currentCount + 1);

                if (currentCount == 0) {
                    let spinner = spinnerlist.get(progressAnchorElmId).spin();

                    let progressAnchorElm = getElm(progressAnchorElmId);
                    progressAnchorElm.style.position = "relative";
                    progressAnchorElm.appendChild(spinner.el);
                }
            }
        } else {
            console.error("Progress Element ID [" + progressAnchorElmId + "] not found to Start");
        }
    }
}

function ajaxStop(progressAnchorElmId) {

    if ((progressAnchorElmId) && (progressAnchorElmId.length > 0)) {
        if (haveElm(progressAnchorElmId) == true) {
            if (spinnerlist.has(progressAnchorElmId) == true) {
                if (spinnerCount.has(progressAnchorElmId) == true) {
                    let currentCount = spinnerCount.get(progressAnchorElmId);

                    if (currentCount <= 1) {
                        spinnerCount.set(progressAnchorElmId, 0);
                        spinnerlist.get(progressAnchorElmId).stop();
                    } else {
                        spinnerCount.set(progressAnchorElmId, currentCount - 1);
                    }
                }
            }            
        }
        else {
            console.error("Progress Element ID [" + progressAnchorElmId + "] not found to Stop");
        }
    }
}

/******************************************************************************************************************/

function getCoords() {
    return new Promise((resolve, reject) =>
        navigator.permissions ?

            // Permission API is implemented
            navigator.permissions.query({
                name: 'geolocation'
            }).then(permission =>
                // is geolocation granted?
                permission.state === "granted"
                    ? navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords))
                    : resolve(null)
            ) :

            // Permission API was not implemented
            reject(new Error("Permission API is not supported"))
    )
}

//getCoords().then(coords => console.log(coords))

/******************************************************************************************************************/

window.showLastAjaxCount = 7;

function filterShowAjaxTime(serverResponseJson) {
    if ((serverResponseJson) && (serverResponseJson.ServiceInfo)) {
        if ((serverResponseJson.ServiceInfo.toUpperCase().indexOf("MetricsApi".toUpperCase()) === -1)
            //&& (serverResponseJson.ServiceInfo.toUpperCase().indexOf("CurlApi".toUpperCase()) === -1)
        ) {
            recordAjaxTiming(serverResponseJson, false);
        }
    } else {
        recordAjaxTiming(serverResponseJson, false);
    }
}

function recordAjaxTiming(returnAjaxJson, clear) {
    let ajaxTimeElm = document.getElementById('ajaxTime')
    if (ajaxTimeElm) {
        if (clear === true) {
            //ajaxTimeElm.innerHTML = "";
            while (ajaxTimeElm.firstChild) ajaxTimeElm.removeChild(ajaxTimeElm.firstChild);
        }

        let currentTimestamp = Math.floor(new Date().getTime());
        let ajaxTimeVal = "";

        if (returnAjaxJson.hasOwnProperty('ClientRequestStartTimestamp') === true) {

            let clientRequestStartTimestamp = returnAjaxJson['ClientRequestStartTimestamp'];
            let clientRequestTimestampDifference = currentTimestamp - clientRequestStartTimestamp;

            let serverRequestStartTimestamp = 0;
            if (returnAjaxJson.hasOwnProperty('ServerRequestStartTimestamp') === true) {
                serverRequestStartTimestamp = returnAjaxJson['ServerRequestStartTimestamp'];
            }

            let serverRequestEndTimestamp = currentTimestamp;
            if (returnAjaxJson.hasOwnProperty('ServerRequestEndTimestamp') === true) {
                serverRequestEndTimestamp = returnAjaxJson['ServerRequestEndTimestamp'];
            }

            let serverRequestTimestampDifference = (serverRequestEndTimestamp - serverRequestStartTimestamp);
            let networkTimestampDifference = clientRequestTimestampDifference - serverRequestTimestampDifference;

            if (clientRequestTimestampDifference > 0) {
                if ((serverRequestTimestampDifference <= 0) && (clientRequestTimestampDifference != serverRequestTimestampDifference)) {
                    ajaxTimeVal = "(<span style='color:red;'>" + clientRequestTimestampDifference + "</span>)";
                    if (returnAjaxJson.hasOwnProperty('ServiceInfo') === true) {
                        ajaxTimeVal = "(<span style='color:red;' title='" + returnAjaxJson.ServiceInfo + "'>" + clientRequestTimestampDifference + "</span>)";
                        if (typeof sendAjaxMetrics === "function") {
                            sendAjaxMetrics(returnAjaxJson.ServiceInfo, serverRequestTimestampDifference, clientRequestTimestampDifference);
                        }
                    }
                } else {
                    ajaxTimeVal = "(<span style='color:red;'>" + clientRequestTimestampDifference + "[" + serverRequestTimestampDifference + "]</span>)";
                    if (returnAjaxJson.hasOwnProperty('ServiceInfo') === true) {
                        ajaxTimeVal = "(<span style='color:red;' title='" + returnAjaxJson.ServiceInfo + "'>" + clientRequestTimestampDifference + "[" + serverRequestTimestampDifference + "]</span>)";
                        if (typeof sendAjaxMetrics === "function") {
                            sendAjaxMetrics(returnAjaxJson.ServiceInfo, serverRequestTimestampDifference, clientRequestTimestampDifference);
                        }
                    }
                }
            } else {
                if (serverRequestTimestampDifference > 0) {
                    ajaxTimeVal = "(<span style='color:red;'>[" + serverRequestTimestampDifference + "]</span>)";
                    if (returnAjaxJson.hasOwnProperty('ServiceInfo') === true) {
                        ajaxTimeVal = "(<span style='color:red;' title='" + returnAjaxJson.ServiceInfo + "'>[" + serverRequestTimestampDifference + "]</span>)";
                        if (typeof sendAjaxMetrics === "function") {
                            sendAjaxMetrics(returnAjaxJson.ServiceInfo, serverRequestTimestampDifference, clientRequestTimestampDifference);
                        }
                    }
                }
            }
        }
        else {
            if (returnAjaxJson.hasOwnProperty('ServerRequestStartTimestamp') === true) {
                let serverRequestStartTimestamp = 0;
                if (returnAjaxJson.hasOwnProperty('ServerRequestStartTimestamp') === true) {
                    serverRequestStartTimestamp = returnAjaxJson['ServerRequestStartTimestamp'];
                }

                let serverRequestEndTimestamp = currentTimestamp;
                if (returnAjaxJson.hasOwnProperty('ServerRequestEndTimestamp') === true) {
                    serverRequestEndTimestamp = returnAjaxJson['ServerRequestEndTimestamp'];
                }

                let serverRequestTimestampDifference = (serverRequestEndTimestamp - serverRequestStartTimestamp);
                let networkTimestampDifference = requestTimestampDifference - serverTimestampDifference;

                if (serverRequestTimestampDifference > 0) {
                    ajaxTimeVal = "(<span style='color:red;'>[" + serverRequestTimestampDifference + "]</span>)";
                    if (returnAjaxJson.hasOwnProperty('ServiceInfo') === true) {
                        ajaxTimeVal = "(<span style='color:red;' title='" + returnAjaxJson.ServiceInfo + "'>[" + serverRequestTimestampDifference + "]</span>)";
                        if (typeof sendAjaxMetrics === "function") {
                            sendAjaxMetrics(returnAjaxJson.ServiceInfo, serverRequestTimestampDifference, clientRequestTimestampDifference);
                        }
                    }
                }
            }
        }

        if (ajaxTimeVal.length > 0) {
            let ajaxTimeElmText = ajaxTimeElm.innerHTML.trim();
            let storedAjaxTime = sessionStorage.getItem('ajaxTime');
            if (storedAjaxTime !== null) {
                if (storedAjaxTime.length > 0) {
                    ajaxTimeElmText = storedAjaxTime;
                }
            }

            let ajaxTimeList = "";
            if (ajaxTimeElmText.length === 0) {
                ajaxTimeList = ajaxTimeVal;
            }
            else {
                if (ajaxTimeElmText.indexOf(",") === -1) {
                    ajaxTimeList = ajaxTimeElmText + "," + ajaxTimeVal;
                } else {
                    let ajaxTimeArr = ajaxTimeElmText.split(",", window.showLastAjaxCount);
                    if (ajaxTimeArr.length >= window.showLastAjaxCount) ajaxTimeArr.shift();
                    ajaxTimeList = ajaxTimeArr.join(",") + "," + ajaxTimeVal;
                }
            }
            ajaxTimeElm.innerHTML = "Ajax[" + ajaxTimeList + "]";
            sessionStorage.setItem("ajaxTime", ajaxTimeList);
        }
    }
}

function clearAjaxTiming() {
    let ajaxTimeElm = document.getElementById('ajaxTime')
    if (ajaxTimeElm) {
        if (ajaxTimeElm) {
            while (ajaxTimeElm.firstChild) ajaxTimeElm.removeChild(ajaxTimeElm.firstChild);
            //ajaxTimeElm.innerHTML = "";
        }
    }
    sessionStorage.setItem("ajaxTime", "");
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

function dopost(progressElmId, responseElmId, url, jsonContent, successCallback, failureCallback, clientRequestStartTimestamp) {

    ajaxStart(progressElmId);
  
    let requestToken = "";
    let requestTokenElm = document.head.querySelector("[name=REQUESTTOKEN]");
    if (requestTokenElm) requestToken = requestTokenElm.content

    if (!clientRequestStartTimestamp) {
        clientRequestStartTimestamp = Math.floor(new Date().getTime());
    }

    const urlParams = (new URL(document.location)).searchParams;
    const region = urlParams.get('region');
    const instance = urlParams.get('instance');
    const appname = urlParams.get('app');
    if ((region) && (region.length > 0)) {
        var regionUrl = new URL(url, document.baseURI);
        if (regionUrl.searchParams.has('region') == false) {
            regionUrl.searchParams.append('region', region);
            url = regionUrl.toString();
            console.log('Region Url:', url);
        }
    }
    else if ((instance) && (instance.length > 0)) {
        var instanceUrl = new URL(url, document.baseURI);
        if (instanceUrl.searchParams.has('instance') == false) {
            instanceUrl.searchParams.append('instance', region);
            url = instanceUrl.toString();
            console.log('Instance Url:', url);
        }
    }
    else if ((appname) && (appname.length > 0)) {
        var appnameUrl = new URL(url, document.baseURI);
        if (appnameUrl.searchParams.has('app') == false) {
            appnameUrl.searchParams.append('app', appname);
            url = appnameUrl.toString();
            console.log('App Url:', url);
        }
    }

    fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-Token': requestToken,
            'X-CLIENT_REQUEST_START_TIMESTAMP': clientRequestStartTimestamp
        },
        body: JSON.stringify(jsonContent),
    })        
        .then(parseJson)
        .then(data => {

            ajaxStop(progressElmId);
            filterShowAjaxTime(data);

            if ((data.hasOwnProperty('result') === true) && (data.result)) {
                data.Result = data.result;
            }
            if ((data.hasOwnProperty('error') === true) && (data.error)) {
                data.Error = data.error;
            }
            if ((data.hasOwnProperty('redirect') === true) && (data.redirect)) {
                data.Redirect = data.redirect;
            }
            if ((data.hasOwnProperty('Result') === true) && (data.Result)) {
                let result = data.Result;
                if (typeof successCallback === "function") {
                    successCallback(data);
                }               
            }
            else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                if (data.hasOwnProperty('Redirect') === true) {
                    if (data.Redirect == true) {
                        setTimeout(function () {
                            window.location.href = "/";
                        }, 1000);
                    } else {
                        if (typeof failureCallback === "function") {
                            failureCallback(data);
                        } 
                    }
                } else {
                    let error = data.Error;
                    if (typeof failureCallback === "function") {
                        failureCallback(data);
                    }
                }
            }            
        })                  
        .catch((error) => {
            ajaxStop(progressElmId);
            filterShowAjaxTime(error);
            if ((error.hasOwnProperty('statusText') === true) && (error.hasOwnProperty('status') === true)) {
                if (typeof failureCallback === "function") {
                    failureCallback(error);
                } else {
                    if (haveElm(responseElmId) == true) {
                        showText(responseElm, error.status + ' ' + error.statusText, 'red');
                    }
                }
            } else {
                if (typeof failureCallback === "function") {
                    failureCallback(error);
                } 
            }
        });

}

function dopostform(progressElmId, responseElmId, url, dataContent, successCallback, failureCallback, clientRequestStartTimestamp) {

    ajaxStart(progressElmId);

    let requestToken = "";
    let requestTokenElm = document.head.querySelector("[name=REQUESTTOKEN]");
    if (requestTokenElm) requestToken = requestTokenElm.content

    if (!clientRequestStartTimestamp) {
        clientRequestStartTimestamp = Math.floor(new Date().getTime());
    }

    const urlParams = (new URL(document.location)).searchParams;
    const region = urlParams.get('region');
    const instance = urlParams.get('instance');
    const appname = urlParams.get('app');
    if ((region) && (region.length > 0)) {
        var regionUrl = new URL(url, document.baseURI);
        if (regionUrl.searchParams.has('region') == false) {
            regionUrl.searchParams.append('region', region);
            url = regionUrl.toString();
            console.log('Region Url:', url);
        }
    }
    else if ((instance) && (instance.length > 0)) {
        var instanceUrl = new URL(url, document.baseURI);
        if (instanceUrl.searchParams.has('instance') == false) {
            instanceUrl.searchParams.append('instance', region);
            url = instanceUrl.toString();
            console.log('Region Url:', url);
        }
    }
    else if ((appname) && (appname.length > 0)) {
        var appnameUrl = new URL(url, document.baseURI);
        if (appnameUrl.searchParams.has('app') == false) {
            appnameUrl.searchParams.append('app', appname);
            url = appnameUrl.toString();
            console.log('App Url:', url);
        }
    }

    fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'X-AUTH-Token': requestToken,
            'X-CLIENT_REQUEST_START_TIMESTAMP': clientRequestStartTimestamp
        },
        body: dataContent,
    })
        .then(parseJson)
        .then(data => {
            if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
                let result = data.Result;

                if (typeof successCallback === "function") {
                    successCallback(data);
                }
                else if (window.hasOwnProperty(successCallback) == true) {
                    window[successCallback]();
                }
            }
            else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                if (data.hasOwnProperty('Redirect') === true) {
                    if (data.Redirect == true) {
                        setTimeout(function () {
                            window.location.href = "/";
                        }, 1000);
                    } else {
                        if (typeof failureCallback === "function") {
                            failureCallback(data);
                        }
                    }
                } else {
                    let error = data.Error;
                    if (typeof failureCallback === "function") {
                        failureCallback(data);
                    }
                }
            }

            ajaxStop(progressAnchorElmId);
            filterShowAjaxTime(data);
        })                    
        .catch((error) => {
            ajaxStop(progressElmId);
            filterShowAjaxTime(error);
            if ((error.hasOwnProperty('statusText') === true) && (error.hasOwnProperty('status') === true)) {
                if (typeof failureCallback === "function") {
                    failureCallback(data);
                } else {
                    if (haveElm(responseElmId) == true) {
                        showText(responseElm, error.status + ' ' + error.statusText, 'red');
                    }
                }
            }
        });
}

function doget(progressElmId, responseElmId, url, successCallback, failureCallback, clientRequestStartTimestamp) {

    ajaxStart(progressElmId);

    let requestToken = "";
    let requestTokenElm = document.head.querySelector("[name=REQUESTTOKEN]");
    if (requestTokenElm) requestToken = requestTokenElm.content

    if (!clientRequestStartTimestamp) {
        clientRequestStartTimestamp = Math.floor(new Date().getTime());
    }

    const urlParams = (new URL(document.location)).searchParams;
    const region = urlParams.get('region');
    const instance = urlParams.get('instance');
    const appname = urlParams.get('app');
    if ((region) && (region.length > 0)) {
        var regionUrl = new URL(url, document.baseURI);
        if (regionUrl.searchParams.has('region') == false) {
            regionUrl.searchParams.append('region', region);
            url = regionUrl.toString();
            console.log('Region Url:', url);
        }
    }
    else if ((instance) && (instance.length > 0)) {
        var instanceUrl = new URL(url, document.baseURI);
        if (instanceUrl.searchParams.has('instance') == false) {
            instanceUrl.searchParams.append('instance', region);
            url = instanceUrl.toString();
            console.log('Region Url:', url);
        }
    }
    else if ((appname) && (appname.length > 0)) {
        var appnameUrl = new URL(url, document.baseURI);
        if (appnameUrl.searchParams.has('app') == false) {
            appnameUrl.searchParams.append('app', appname);
            url = appnameUrl.toString();
            console.log('App Url:', url);
        }
    }
    
    fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json', //application/xml, text/plain, text/html, *.*
            'X-REQUEST-Token': requestToken,
            'X-CLIENT_REQUEST_START_TIMESTAMP': clientRequestStartTimestamp
        },
    })
        .then(parseJson)
        .then(data => {
            if (((data.hasOwnProperty('Result') === true) && (data.Result)) && (data.Result)) {
                let result = data.Result;

                if (typeof successCallback === "function") {
                    successCallback(data);
                }
                else if (window.hasOwnProperty(successCallback) == true) {
                    window[successCallback]();
                }
            }
            else if ((data.hasOwnProperty('Error') === true) && (data.Error)) {
                if (data.hasOwnProperty('Redirect') === true) {
                    if (data.Redirect == true) {
                        setTimeout(function () {
                            window.location.href = "/";
                        }, 1000);
                    } else {
                        if (typeof failureCallback === "function") {
                            failureCallback(data);
                        }
                    }
                } else {
                    let error = data.Error;
                    if (typeof failureCallback === "function") {
                        failureCallback(data);
                    }
                }                
            } else {
                if (typeof successCallback === "function") {
                    successCallback(data);
                }
                else if (window.hasOwnProperty(successCallback) == true) {
                    window[successCallback]();
                }
            }
            ajaxStop(progressElmId);
            filterShowAjaxTime(data);
        })            
        .catch((error) => {
            ajaxStop(progressElmId);
            filterShowAjaxTime(error);
            if ((error.hasOwnProperty('statusText') === true) && (error.hasOwnProperty('status') === true)) {
                if (typeof failureCallback === "function") {
                    failureCallback(data);
                } else {
                    if (haveElm(responseElmId) == true) {
                        showText(responseElm, error.status + ' ' + error.statusText, 'red');
                    }
                }
            }
        });
}

//function dogetHtml(progressElmId, responseElmId, url, successCallback, failureCallback, clientRequestStartTimestamp) {

//    ajaxStart(progressElmId);

//    let requestToken = "";
//    let requestTokenElm = document.head.querySelector("[name=REQUESTTOKEN]");
//    if (requestTokenElm) requestToken = requestTokenElm.content

//    if (!clientRequestStartTimestamp) {
//        clientRequestStartTimestamp = Math.floor(new Date().getTime());
//    }

//    const urlParams = (new URL(document.location)).searchParams;
//    const region = urlParams.get('region');
//    const instance = urlParams.get('instance');
//    const appname = urlParams.get('app');
//    if ((region) && (region.length > 0)) {
//        var regionUrl = new URL(url, document.baseURI);
//        if (regionUrl.searchParams.has('region') == false) {
//            regionUrl.searchParams.append('region', region);
//            url = regionUrl.toString();
//            console.log('Region Url:', url);
//        }
//    }
//    else if ((instance) && (instance.length > 0)) {
//        var instanceUrl = new URL(url, document.baseURI);
//        if (instanceUrl.searchParams.has('instance') == false) {
//            instanceUrl.searchParams.append('instance', region);
//            url = instanceUrl.toString();
//            console.log('Region Url:', url);
//        }
//    }
//    else if ((appname) && (appname.length > 0)) {
//        var appnameUrl = new URL(url, document.baseURI);
//        if (appnameUrl.searchParams.has('app') == false) {
//            appnameUrl.searchParams.append('app', appname);
//            url = appnameUrl.toString();
//            console.log('App Url:', url);
//        }
//    } const folder = urlParams.get('folder');
//    if ((folder) && (folder.length > 0)) {
//        var folderUrl = new URL(url, document.baseURI);
//        if (folderUrl.searchParams.has('folder') == false) {
//            folderUrl.searchParams.append('folder', folder);
//            url = folderUrl.toString();
//            console.log('Folder Url:', url);
//        }
//    }

//    fetch(url, {
//        method: 'GET',
//        credentials: 'same-origin',
//        headers: {
//            'Content-Type': 'text/html', //application/xml, text/plain, text/html, *.*
//            'X-REQUEST-Token': requestToken,
//            'X-CLIENT_REQUEST_START_TIMESTAMP': clientRequestStartTimestamp
//        },
//    })
//        .then(response => response.text())
//        .then(data => {
//            ajaxStop(progressElmId);
//            filterShowAjaxTime(data);

//            if (typeof successCallback === "function") {
//                successCallback(data);
//            }
//            else if (window.hasOwnProperty(successCallback) == true) {
//                window[successCallback]();
//            }
//        })                 
//        .catch((error) => {
//            ajaxStop(progressElmId);
//            filterShowAjaxTime(error);

//            if (typeof failureCallback === "function") {
//                failureCallback(data);
//            }
//        });
//}

//(document).ajaxComplete(function (event, request, settings) {
//    console.log(settings.url + " completed");
//    console.log('Content-Type:' + request.getResponseHeader("Content-Type"))
//    console.log('X-AUTH-Token:' + request.getResponseHeader("X-AUTH-Token"))
//});

/******************************************************************************************************************/

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

/******************************************************************************************************************/

function isMobile() {
    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    return isMobile;
}

function isChrome() {
    let isChrome = !!window.chrome;
    return isChrome;
}

function generateUUID1() {
    // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateUUID() { // Public Domain/MIT https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/******************************************************************************************************************/

function setFocus(targetInput, intervalToFocus) {

    // create invisible dummy input to receive the focus first
    const fakeInput = document.createElement('input')
    fakeInput.setAttribute('type', 'text')
    fakeInput.style.position = 'absolute'
    fakeInput.style.opacity = 0
    fakeInput.style.height = 0
    fakeInput.style.fontSize = '16px' // disable auto zoom

    // you may need to append to another element depending on the browser's auto 
    // zoom/scroll behavior
    document.body.prepend(fakeInput)

    // focus so that subsequent async focus will work
    fakeInput.focus()

    setTimeout(() => {

        // now we can focus on the target input
        targetInput.focus()

        // cleanup
        fakeInput.remove()

    }, intervalToFocus)

}

/******************************************************************************************************************/

function removeDynamicCss() {
    let head = document.getElementsByTagName('head')[0];
    let existingDynamicStyleElm = document.getElementById("dynamicStyle");
    if (existingDynamicStyleElm != null) {
        //existingDynamicStyleElm.outerHTML = "";
        existingDynamicStyleElm.parentNode.removeChild(existingDynamicStyleElm);
    }
}

function addDynamicCss(dynamicCss) {
    let head = document.getElementsByTagName('head')[0];
    let dynamicStyleElm = document.createElement('style');
    let existingDynamicStyleElm = document.getElementById("dynamicStyle");
    if (existingDynamicStyleElm != null) {
        existingDynamicStyleElm.parentNode.removeChild(existingDynamicStyleElm);
    }
    dynamicStyleElm.id = "dynamicStyle";
    dynamicStyleElm.setAttribute('type', 'text/css');
    if (dynamicStyleElm.styleSheet) {// IE
        dynamicStyleElm.styleSheet.cssText = dynamicCss;
    } else {// the world
        dynamicStyleElm.appendChild(document.createTextNode(dynamicCss));
    }
    head.appendChild(dynamicStyleElm);
}

function addDynamicCssLink(filePath, index) {
    let fileref = document.createElement("link")
    let existingDynamicStyleElm = document.getElementById("dynamicLink" + index);
    if (existingDynamicStyleElm != null) {
        existingDynamicStyleElm.parentNode.removeChild(existingDynamicStyleElm);
    }
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filePath)
    fileref.setAttribute('id', "dynamicLink" + index)
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function removeDynamicCssLink(maxIndex) {
    for (let i = 0; i < maxIndex; i++) {
        let existingDynamicStyleElm = document.getElementById("dynamicLink" + i);
        if (existingDynamicStyleElm != null) {
            existingDynamicStyleElm.parentNode.removeChild(existingDynamicStyleElm);
        }
    }
}

/******************************************************************************************************************/

function autocomplete(progressElmId, responseElmId, searchEleId, autocompleteElmId, queryCalback) {
    let currentFocus;
    let searchEle = getElm(searchEleId);
    let autocompleteEle = getElm(autocompleteElmId);

    searchEle.addEventListener("input", function (e) {
        let divCreate,
            b,
            i,
            fieldVal = this.value;

        closeAllLists();
        if (!fieldVal) {
            return false;
        }

        currentFocus = -1;

        divCreate = document.createElement("DIV");
        divCreate.setAttribute("id", this.id + "autocomplete-list");
        divCreate.setAttribute("class", "autocomplete-items");
        autocompleteEle.appendChild(divCreate);

        queryCalback(fieldVal, function (data) {
            let arr = data.suggestions;
            for (i = 0; i < arr.length; i++) {
                let listVal = arr[i].data;
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + listVal.substr(0, fieldVal.length) + "</strong>";
                b.innerHTML += listVal.substr(fieldVal.length);
                b.innerHTML += "<input type='hidden' value='" + listVal + "'>";
                b.addEventListener("click", function (e) {
                    searchEle.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                divCreate.appendChild(b);
            }
        })
    });

    searchEle.addEventListener("keydown", function (e) {

        if (haveElm(this.id + 'autocomplete-list"') == true) {
            let autocompleteList = getElm(
                this.id + "autocomplete-list"
            );

            if (autocompleteList)
                autocompleteList = autocompleteList.getElementsByTagName("div");

            if (e.keyCode == 40) {
                currentFocus++;
                addActive(autocompleteList);
            }
            else if (e.keyCode == 38) {
                //up
                currentFocus--;
                addActive(autocompleteList);
            }
            else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (autocompleteList) autocompleteList[currentFocus].click();
                }
            }
        }
    });

    function addActive(autocompleteList) {
        if (!autocompleteList) return false;
        removeActive(autocompleteList);
        if (currentFocus >= autocompleteList.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = autocompleteList.length - 1;
        autocompleteList[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(autocompleteList) {
        for (let i = 0; i < autocompleteList.length; i++) {
            autocompleteList[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        let autocompleteList = document.getElementsByClassName(
            "autocomplete-items"
        );
        for (let i = 0; i < autocompleteList.length; i++) {
            if (elmnt != autocompleteList[i] && elmnt != searchEle) {
                autocompleteList[i].parentNode.removeChild(autocompleteList[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
/******************************************************************************************************************/
//DOM Event

let waitForFinalEvent = (function () {
    let timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();
/******************************************************************************************************************/
//Element Utilitiies
/******************************************************************************************************************/

//Returns true if it is a DOM node
function isNode(o) {
    return (
        typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
    );
}

//Returns true if it is a DOM element    
function isElement(o) {
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    );
}

function haveElm(elmId, scopeElmId) {
    let parentElm = document;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId);
        }
    }
    if (parentElm) {
        let elm = parentElm.getElementById(elmId);
        if (elm == null) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function getElm(elmId, scopeElmId) {
    let parentElm = document;
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId);
            scoped = true;
        }
    }
    if (parentElm) {
        let elm = parentElm.getElementById(elmId);
        if (elm == null) {
            if (scoped === false) {
                alert('Id [' + elmId + '] not found for getElm');
                console.log('Id [' + elmId + '] not found for getElm');
            } else {
                alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for getElm');
                console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for getElm');
            }
            return null;
        } else {
            return elm;
        }
    } else {
        alert('Scope Elm Id [' + scopeElmId + '] not found for getElm');
        console.log('Scope Elm Id [' + scopeElmId + '] not found for getElm');
    }
}

function haveElms(elmSelector, scopeElmId) {
    let parentElm = document;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId);
        }
    }
    if (parentElm) {
        let elms = parentElm.querySelectorAll(elmSelector);
        if ((elms == null) || (elms.length == 0)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function haveElmsInScope(elmSelector, scopeElm) {
    let parentElm = document;
    if (typeof scopeElm !== 'undefined' || scopeElm !== null) {
        if (scopeElm) {
            parentElm = scopeElm;
        }
    }
    if (parentElm) {
        let elms = parentElm.querySelectorAll(elmSelector);
        if ((elms == null) || (elms.length == 0)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function getElms(elmSelector, scopeElmId) {
    let parentElm = document;
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId);
            scoped = true;
        }
    }
    if (parentElm) {
        let elms = parentElm.querySelectorAll(elmSelector);
        if ((elms == null) || (elms.length == 0)) {
            if (scoped === false) {
                alert('Selector [' + elmSelector + '] not found for getElms')
                console.log('Selector [' + elmSelector + '] not found for getElms');
            } else {
                alert('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElms')
                console.log('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElms');
            }
            return null;
        } else {
            return elms;
        }
    }
    else {
        alert('Scope Elm Id [' + scopeElmId + '] not found for getElms');
        console.log('Scope Elm Id [' + scopeElmId + '] not found for getElms');
    }
}

function getElmsInScope(elmSelector, scopeElm) {
    let parentElm = document;
    let scoped = false;
    if (typeof scopeElm !== 'undefined' || scopeElm !== null) {
        if (scopeElm) {
            parentElm = scopeElm;
            scoped = true;
        }
    }
    if (parentElm) {
        let elms = parentElm.querySelectorAll(elmSelector);
        if ((elms == null) || (elms.length == 0)) {
            if (scoped === false) {
                alert('Selector [' + elmSelector + '] not found for getElms')
                console.log('Selector [' + elmSelector + '] not found for getElms');
            } else {
                alert('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElms')
                console.log('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElms');
            }
            return null;
        } else {
            return elms;
        }
    }
}

function getElmBySel(elmSelector, scopeElmId) {
    let parentElm = document;
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId);
            scoped = true;
        }
    }
    if (parentElm) {
        let elm = parentElm.querySelector(elmSelector);
        if (elm) {
            return elm
        } else {
            if (scoped === false) {
                alert('Selector [' + elmSelector + '] not found for getElmBySel')
                console.log('Selector [' + elmSelector + '] not found for getElmBySel');
            } else {
                alert('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElmBySel')
                console.log('Selector [' + elmSelector + '] not found under scoped id [' + scopeElmId + '] for getElmBySel');
            }
            return null;
        }
    }
    else {
        alert('Scope Elm Id [' + scopeElmId + '] not found for getElmBySel');
        console.log('Scope Elm Id [' + scopeElmId + '] not found for getElmBySel');
    }
}

function getElmBySelInScope(elmSelector, scopeElm) {
    let parentElm = document;
    let scoped = false;
    if (typeof scopeElm !== 'undefined' || scopeElm !== null) {
        if (scopeElm) {
            parentElm = scopeElm;
            scoped = true;
        }
    }
    if (parentElm) {
        let elm = parentElm.querySelector(elmSelector);
        if (elm) {
            return elm
        } else {
            if (scoped === false) {
                alert('Selector [' + elmSelector + '] not found for getElmBySel')
                console.log('Selector [' + elmSelector + '] not found for getElmBySel');
            } else {
                alert('Selector [' + elmSelector + '] not found under scoped id [' + scopeElm.id + '] for getElmBySel')
                console.log('Selector [' + elmSelector + '] not found under scoped id [' + scopeElm.id + '] for getElmBySel');
            }
            return null;
        }
    }
}

function getSelectedOption(elmId, scopeElmId) {
    let elm = getElm(elmId, scopeElmId)
    if (elm != null) {
        if (elm.options.length > 0) {
            let optionElm = elm.options[elm.selectedIndex];
            return optionElm;
        } else {
            let optionElm = document.createElement("option");
            return optionElm;
        }
    }
}

function getCheckedElmByName(elmName, scopeElmId) {
    let parentElm = document;
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            parentElm = document.getElementById(scopeElmId);
            scoped = true;
        }
    }
    if (parentElm) {
        let radios = parentElm.getElementsByName(elmName);
        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return radios[i];
            }
        }
    }
    else {
        alert('Scope Elm Id [' + scopeElmId + '] not found for getElmBySel');
        console.log('Scope Elm Id [' + scopeElmId + '] not found for getElmBySel');
    }
}

function triggerEvent(elmId, eventName, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }

    let elm = getElm(elmId, scopeElmId);
    if (elm != null) {
        elm.dispatchEvent(new Event(eventName));
    } else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found to trigger event');
            console.log('Id [' + elmId + '] not found to trigger event');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + ']  to trigger event');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] to trigger event');
        }
    }
    return true;
}

function isDisplayNoneElm(elm) {
    let style = window.getComputedStyle(elm);
    let isHidden = (elm.offsetParent === null)
    if (isHidden == false) {
        isHidden = (style.display === 'none');
    }
    return isHidden;
}

function isHiddenElm(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm !== null) {
        let isHidden = (elm.offsetParent === null)
        if (isHidden == false) {
            let style = window.getComputedStyle(elm);
            isHidden = (style.display === 'none');
        }
        return isHidden;
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for isHiddenElm')
            console.log('Id [' + elmId + '] not found for isHiddenElm');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for isHiddenElm');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for isHiddenElm');
        }
    }
    return true;
}

function disableElm(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm != null) {
        elm.disabled = true;
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for disableElm')
            console.log('Id [' + elmId + '] not found for disableElm');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for disableElm');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for disableElm');
        }
    }
}

function enableElm(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm != null) {
        elm.disabled = false;
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for enableElm')
            console.log('Id [' + elmId + '] not found for enableElm');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for enableElm');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for enableElm');
        }
    }
}

function toggleElm(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm != null) {
        if (elm.style.display === 'none') {
            elm.style.display = '';
        }
        else {
            elm.style.display = 'none';
        }
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for toggleElm')
            console.log('Id [' + elmId + '] not found for toggleElm');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for toggleElm');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for toggleElm');
        }
    }
}

function hideElm(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm != null) {
        elm.style.display = 'none';
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for hideElm')
            console.log('Id [' + elmId + '] not found for hideElm');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for hideElm');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for hideElm');
        }
    }
}

function showElm(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm != null) {
        elm.style.display = '';
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for showElm')
            console.log('Id [' + elmId + '] not found for showElm');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for showElm');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for showElm');
        }
    }
}

function showAutoHideElm(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm != null) {
        elm.style.display = '';
        setTimeout(function () {
            elm.style.display = 'none';
        }, 5000);
    }
    else {
        alert('Id [' + elmId + '] not found')
    }
}

function showText(elm, elmText, color) {
    if (elm !== null) {
        elm.textContent = elmText;
        elm.style.color = color;
        elm.style.display = '';

        let containerElmId = elm.id + "Container";
        if (document.getElementById(containerElmId) != null) {
            showElm(containerElmId);
        }
    }
    else {
        alert('Element not found')
    }
}

function clearResponse(responseElmId) {

    if (haveElm(responseElmId) == true) {
        let responseElm = getElm(responseElmId);
        //responseElm.innerHTML = "";
        while (responseElm.firstChild) responseElm.removeChild(responseElm.firstChild);
    }

    let responseContainerElmId = responseElmId + "Container";
    if (haveElm(responseContainerElmId) == true) {
        let responseContainerElm = getElm(responseContainerElmId)
        hideElm(responseContainerElmId);
    }
}

function toggleFlex(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm != null) {
        if (elm.style.display === 'none') {
            elm.style.display = 'flex';
        }
        else {
            elm.style.display = 'none';
        }
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for toggleFlex')
            console.log('Id [' + elmId + '] not found for toggleFlex');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for toggleFlex');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for toggleFlex');
        }
    }
}

function hideFlex(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm != null) {
        elm.style.display = 'none';
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for hideFlex')
            console.log('Id [' + elmId + '] not found for hideFlex');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for hideFlex');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for hideFlex');
        }
    }
}

function showFlex(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm !== null) {
        elm.style.display = 'flex';
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for showFlex')
            console.log('Id [' + elmId + '] not found for showFlex');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for showFlex');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for showFlex');
        }
    }
}

function showAutoHideFlex(elmId, scopeElmId) {
    let scoped = false;
    if (typeof scopeElmId !== 'undefined' || scopeElmId !== null) {
        if (scopeElmId) {
            scoped = true;
        }
    }
    let elm = getElm(elmId, scopeElmId);
    if (elm !== null) {
        elm.style.display = 'flex';
        setTimeout(function () {
            elm.style.display = 'none';
        }, 5000);
    }
    else {
        if (scoped === false) {
            alert('Id [' + elmId + '] not found for showAutoHideFlex')
            console.log('Id [' + elmId + '] not found for showAutoHideFlex');
        } else {
            alert('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for showAutoHideFlex');
            console.log('Id [' + elmId + '] not found under scoped id [' + scopeElmId + '] for showAutoHideFlex');
        }
    }
}

/******************************************************************************************************************/
//Event Handler Tracking
/******************************************************************************************************************/

let _eventHandlers = {};

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

function navBarClickEvent(el) {
    event.stopPropagation();

    // Get the target from the "data-component" attribute
    const targetElmId = el.dataset.target;
    const target = document.getElementById(targetElmId);

    // Toggle the "nav-active" class on both the "navbar-burger" and the "navbarmenu"
    el.classList.toggle('nav-active');
    target.classList.toggle('nav-active');
}

function initNavBarBurger() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            addListener(el, 'click', () => { navBarClickEvent(el); }, false)
        });
    }
}

function removeNavBarBurgerEvents() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            removeAllListeners(el, 'click')
        });
    }
}

function navBarToggleClickEvent(targetMenu) {
    event.stopPropagation();
    if (targetMenu.classList.contains("active")) {
        targetMenu.classList.remove("active");
        toggleElm.innerHTML = "<svg style='width: 32px; ' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16'></path></svg>";
    } else {
        targetMenu.classList.add("active");
        toggleElm.innerHTML = "<svg style='width: 32px' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'></path></svg>";
    }
}

function navBarSubMenuClickEvent(targetMenu, subMenuItem) {
    event.stopPropagation();
    if (subMenuItem.classList.contains("subnavmenu-active")) {
        subMenuItem.classList.remove("subnavmenu-active");
    } else if (targetMenu.querySelector(".subnavmenu-active")) {
        targetMenu.querySelector(".subnavmenu-active").classList.remove("subnavmenu-active");
        subMenuItem.classList.add("subnavmenu-active");
    } else {
        subMenuItem.classList.add("subnavmenu-active");
    }
}

function navBarSubMenuCloseClickEvent(clickElm, targetMenu) {
    event.stopPropagation();
    let isClickInside = targetMenu.contains(clickElm.target);
    if (!isClickInside && targetMenu.querySelector(".subnavmenu-active")) {
        targetMenu.querySelector(".subnavmenu-active").classList.remove("subnavmenu-active");
    }
}

function initNavBarToggle() {
    // Get all ".navmenutoggle" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navmenutoggle'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(toggleElm => {

            let targetMenu = null
            const targetElmId = toggleElm.dataset.target;
            if (haveElm(targetElmId) == true) {
                targetMenu = document.getElementById(targetElmId);

                if (targetMenu != null) {

                    addListener(toggleElm, 'click', () => { navBarToggleClickEvent(targetMenu); }, false)

                    if (haveElms(".navmenuitem", targetElmId) == true) {
                        const items = getElms(".navmenuitem", targetElmId);
                        if (items.length > 0) {
                            for (i = 0; i < items.length; ++i) {
                                let subMenuItem = items[i]
                                if (subMenuItem.querySelector(".subnavmenu")) {
                                    addListener(subMenuItem, 'click', () => { navBarSubMenuClickEvent(targetMenu, subMenuItem); }, false)
                                }
                            }
                        }

                        addListener(document, 'click', () => { navBarSubMenuCloseClickEvent(event, targetMenu); }, false)
                    }
                }
            }
        });
    }
}

function removeNavBarToggleEvents() {
    // Get all ".navmenutoggle" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navmenutoggle'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(toggleElm => {

            let targetMenu = null
            const targetElmId = toggleElm.dataset.target;
            if (haveElm(targetElmId) == true) {
                targetMenu = document.getElementById(targetElmId);

                if (targetMenu != null) {

                    removeAllListeners(toggleElm, 'click')

                    if (haveElms(".navmenuitem", targetElmId) == true) {
                        const items = getElms(".navmenuitem", targetElmId);
                        if (items.length > 0) {
                            for (i = 0; i < items.length; ++i) {
                                let subMenuItem = items[i]
                                if (subMenuItem.querySelector(".subnavmenu")) {
                                    removeAllListeners(subMenuItem, 'click')
                                }
                            }
                        }

                        removeAllListeners(document, 'click')
                    }
                }
            }
        });
    }
}

function removeNavBarEvents() {
    removeNavBarBurgerEvents();
    removeNavBarToggleEvents();
}

function initNavBar() {
    initNavBarBurger();
    initNavBarToggle();
}

document.addEventListener('DOMContentLoaded', () => {
    initNavBarBurger();
});

document.addEventListener('DOMContentLoaded', () => {
    initNavBarToggle();
});

/******************************************************************************************************************/
//Messages
/******************************************************************************************************************/

function hideMessage(msgLabelId, hideMsgIdList) {
    let msgLabelElm = getElm(msgLabelId);
    if (msgLabelElm) {
        msgLabelElm.innerHTML = "";
        msgLabelElm.style.display = "none";
        msgLabelElm.className = msgLabelElm.className.replace("alert", "");
        msgLabelElm.className = msgLabelElm.className.replace("alert-success", "");
        msgLabelElm.className = msgLabelElm.className.replace("alert-danger", "");
        msgLabelElm.className = msgLabelElm.className.replace("alert-warning", "");
        msgLabelElm.className = msgLabelElm.className.replace("alert-info", "");
    }
    if (hideMsgIdList !== null) {
        for (let i = 0; i < hideMsgIdList.length; i++) {
            if (hideMsgIdList[i].length > 0) {
                hideMessage(hideMsgIdList[i], null);
            }
        }
    }
}

function showMessage(message, msgLabelId) {
    let msgLabelElm = getElm(msgLabelId);
    if (msgLabelElm) {
        msgLabelElm.style.display = "block";
        msgLabelElm.className = msgLabelElm.className.replace("alert", "");
        msgLabelElm.className = msgLabelElm.className.replace("alert-success", "");
        msgLabelElm.className = msgLabelElm.className.replace("alert-danger", "");
        msgLabelElm.className = msgLabelElm.className.replace("alert-warning", "");
        msgLabelElm.className = msgLabelElm.className.replace("alert-info", "");
        let alertClose = "<a href='#' class='close' onclick='hideMessage(\"" + msgLabelId + "\")'>&times;</a>";
        msgLabelElm.innerHTML = alertClose + "<span style='word-space:normal'>" + message + "</span>";
        window.setTimeout("hideMessage('" + msgLabelId + "')", 5000);
    }
}

function showSuccess(message, msgLabelId) {
    let msgLabelElm = getElm(msgLabelId);
    if (msgLabelElm) {
        msgLabelElm.style.display = "block";
        msgLabelElm.className = "alert alert-success";
        let alertClose = "<a href='#' class='close' onclick='hideMessage(\"" + msgLabelId + "\")'>&times;</a>";
        msgLabelElm.innerHTML = alertClose + "<span style='word-space:normal'>" + message + "</span>";
        window.setTimeout("hideMessage('" + msgLabelId + "')", 5000);
    }
}

function showError(message, msgLabelId) {
    let msgLabelElm = getElm(msgLabelId);
    if (msgLabelElm) {
        msgLabelElm.style.display = "block";
        msgLabelElm.className = "alert alert-danger";
        let alertClose = "<a class='close' onclick='hideMessage(\"" + msgLabelId + "\")'>&times;</a>";
        msgLabelElm.innerHTML = alertClose + "<span style='word-space:normal'>" + message + "</span>";
        window.setTimeout("hideMessage('" + msgLabelId + "')", 5000);
    }
}

function showWarning(message, msgLabelId) {
    let msgLabelElm = getElm(msgLabelId);
    if (msgLabelElm) {
        msgLabelElm.style.display = "block";
        msgLabelElm.className = "alert alert-warning";
        let alertClose = "<a href='#' class='close' onclick='hideMessage(\"" + msgLabelId + "\")'>&times;</a>";
        msgLabelElm.innerHTML = alertClose + "<span style='word-space:normal'>" + message + "</span>";
        window.setTimeout("hideMessage('" + msgLabelId + "')", 5000);
    }
}

function showInfo(message, msgLabelId, timeout) {
    let msgLabelElm = getElm(msgLabelId);
    if (msgLabelElm) {
        msgLabelElm.style.display = "block";
        msgLabelElm.className = "alert alert-info";
        let alertClose = "<a href='#' class='close' onclick='hideMessage(\"" + msgLabelId + "\")'>&times;</a>";
        msgLabelElm.innerHTML = alertClose + "<span style='word-space:normal'>" + message + "</span>";
        if (timeout > 0) {
            window.setTimeout("hideMessage('" + msgLabelId + "')", timeout);
        }
    }
}

/******************************************************************************************************************/

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase(); // This is just to avoid case sensitiveness
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function base64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    let sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    let byteCharacters = window.atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

