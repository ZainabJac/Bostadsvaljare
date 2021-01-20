(function () {
    window.showHideMenuItem = {
        hidecolorpicker: function () {
            if ($(houseinputid).val() > 20 && $(houseinputid).val() <35) {
                $(colorpickermenu).style.display = "initial"

            }
            else {
                (colorpickermenu).style.display = "none"
            };
        },

    }
})

