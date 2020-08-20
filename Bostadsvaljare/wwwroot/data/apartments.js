(function () {
    window.apartments = {};
    //TODO: get a list of all file names under data/apartments
    var fileNames = ['apt_data.js'];
    fileNames.forEach(fileName => {
        $.getScript('data/apartments/' + fileName)
            .then(function (text) {
                //TODO: get first word to use as an id (which must be a valid js variable name), OR use fileName as the id
                var id = text.substr(0, text.indexOf(' '));
                apartments[id] = eval(text);
            });
    });
})();
