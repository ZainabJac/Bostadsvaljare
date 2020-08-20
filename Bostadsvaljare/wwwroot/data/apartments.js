(function () {
    window.apartments = {};
    //TODO: get a list of all file names under data/apartments
    var fileNames = ['apt_data'];
    fileNames.forEach(fileName => {
        $.getScript('data/apartments/' + fileName + '.js')
            .then(function (text) {
                apartments[fileName] = eval(text);
            });
    });
})();
