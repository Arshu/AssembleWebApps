self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetchWithLog(event.request)
    );
});
function fetchWithLog(request) {
    //console.log("serviceWorker-" + request.url);
    return fetch(request);   
}
