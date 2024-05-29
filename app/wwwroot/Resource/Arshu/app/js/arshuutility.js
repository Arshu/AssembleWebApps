
function openFlyUrl(appNameElmId) {
    if (haveElm(appNameElmId) == true) {
        let appName = getElm(appNameElmId).value;
        if (appName != "") {
            let url = 'https://' + appName + ".fly.dev";
            window.open(url, '_blank').focus();
        }
    }
}

function openFlyRegionUrl(appName, appRegion) {
    if ((appName != "") && (appRegion != "")) {
        let url = 'https://' + appName + ".fly.dev/?region=" + appRegion;
        window.open(url, '_blank').focus();
    }
}

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

function setElmHilightStyle(elmId, isBorderNotBackground, elmStyle) {
    if (haveElm(elmId) == true) {
        let elm = getElm(elmId);
        if (isBorderNotBackground == true) {
            elm.style.border = elmStyle;
        } else {
            elm.style.background = elmStyle;
        }
    }
}

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
//NavBar
/******************************************************************************************************************/

function navBarClickEvent(el) {
    event.stopPropagation();

    // Get the target from the "data-component" attribute
    const targetElmId = el.dataset.target;
    const target = document.getElementById(targetElmId);

    // Toggle the "ar-nav-active" class on both the "navbar-burger" and the "navbarmenu"
    el.classList.toggle('ar-nav-active');
    target.classList.toggle('ar-nav-active');
}

function initNavBarBurger() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.ar-navbar-burger'), 0);

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
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.ar-navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            removeAllListeners(el, 'click')
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

