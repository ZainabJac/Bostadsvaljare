(function () {
    window.popup = {
        populateDiv: function (element) {
            popup.getHTML('/', function (response) {
                element.innerHTML = response.documentElement.innerHTML;
            });
        },

        // From:
        // https://gomakethings.com/getting-html-asynchronously-from-another-page/
        getHTML: function (url, callback) {
            // Feature detection
            if (!window.XMLHttpRequest) return;
            // Create new request
            var xhr = new XMLHttpRequest();
            // Setup callback
            xhr.onload = function () {
                if (callback && typeof (callback) === 'function') {
                    callback(this.responseXML);
                }
            };
            // Get the HTML
            xhr.open('GET', url);
            xhr.responseType = 'document';
            xhr.send();
        }
    };
})();
