(function () {
    window.session_handler = {
        getID: function () {
            var id = window.sessionStorage.getItem('id');
            if (id === null) {
                id = uuidv4();
                window.sessionStorage.setItem('id', id);
            }
            return id;
        },
    };
})();
