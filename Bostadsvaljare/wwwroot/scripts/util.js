(function () {
    window.util = {
        isDevice: function () {
            return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(navigator.userAgent);
        },

        isiOS: function () {
            return [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
        },

        disableClickMenu: function () {
            $('#topnav').addClass('loading');
            
        },

        hidecolorpicker: function () {
            if ($('#houseinputid').val() > 28 && $(houseinputid).val() < 40) {
                $('#colorpick').removeClass('hidecolorpicker');
                $('#colorpick').addClass('showcolorpicker');
                $('#colorpickslink').addClass('animate__animated animate__pulse animate__slower animate__infinite infinite');
                $('.visibleButton').addClass("visibleButtonCP")
                $('.visibleButton').removeClass("visibleButton")
                $('.hiddenButton').addClass("hiddenButtonCP")
                $('.hiddenButton').removeClass("hiddenButton")


            }
            else {
                $('#colorpick').removeClass('showcolorpicker');
                $('#colorpick').addClass('hidecolorpicker');
                $('#colorpickslink').removeClass('animate__animated animate__pulse animate__slower animate__infinite infinite');

            };
        },

        hideCP: function(){
            $('#colorpick').removeClass('showcolorpicker');
            $('#colorpick').addClass('hidecolorpicker');
            $('#colorpickslink').removeClass('animate__animated animate__pulse animate__slower animate__infinite infinite');
    },


        enableClickMenu: function () {
            setTimeout(() => { $('#topnav').removeClass('loading'); }, 2000);
                                        
        },

           disableClickGridResize: function () {
               $('#GridResize').addClass('loading');
            
        },

        enableClickGridResize: function () {
            setTimeout(() => { $('#GridResize').removeClass('loading'); }, 2000);
            
           
        },

        disableContent: function () {
            $('#theWindow').addClass('loading');

        },

        enableContent: function () {
            setTimeout(() => { $('#theWindow').removeClass('loading'); }, 2000);

        },

        enableContentinterior: function () {
            setTimeout(() => {
                $('#theWindow').removeClass('loading');
                if ($(window).width() <= 927) {
                    var height2 = parseInt($('.planritning').height());
                    $('#gallery').height(height2 + 'px');
                    $('#info').height('auto')
                    var height10 = parseInt($('#carousel-item-1').height())
                    $('.iframe-container iframe').height(height10 + 'px');



                }

                else {
                    $('#gallery').height('auto');

                    var height1 = parseInt($('#carousel-item-1').height())
                    var height2 = height1 * 0.15
                    var heightfloor = $('.planritning').height()
                    var heightgal = $('.gallercontain').height()
                    var heightbutton = $('#buttonAndFact').height()
                    var newheight = height1 - heightfloor - heightgal - heightbutton - heightbutton;
                    $('#info').height(newheight + 'px')
                    var height10 = parseInt($('#carousel-item-1').height())
                    $('.iframe-container iframe').height(height10 + 'px');


                }}, 2100);

        },
      
  

        getElementFromPoint: function (target) {
            var list = document.querySelectorAll(':hover');
            for (i = list.length-1; i >= 0; i--) {
                if (list[i].localName === target)
                    return list[i];
            }
            return undefined;
        },

        getSFGridRowIndex: function () {
            var rowEl = this.getElementFromPoint('tr');
            if (rowEl  &&  rowEl.className.includes('e-row'))
                return parseInt(rowEl.ariaRowIndex);
            else
                return -1;
        },

        getGalleryIndex: function () {
            var img = this.getElementFromPoint('img');
            if (img  &&  img.className.includes('gallery-img'))
                return parseInt(img.attributes.index.value);
            else
                return -1;
        },

        getImgElement: function (targetSrc, parent) {
            var img, query = parent ? parent + ' img' : 'img';
            for (img of $(query)) {
                if ($(img).attr('src') === targetSrc)
                    return img;
                
            }
            return img;
        },


        removeObjectByName: function (object, targetName) {
            var children = object.children;

            for (var i = 0; i < children.length; i += 1) {
                if (children[i].name === targetName) {
                    children.splice(i);
                    break;
                }
            }
        },

        /* View in fullscreen */
        openFullscreen: function () {
            var elem = document.documentElement;

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
        },

        /* Close fullscreen */
        closeFullscreen: function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        },

        showTooltip: function (positionX, positionY, msg) {
            var tooltip = $('#tipmsg');
            tooltip.text(msg);
            tooltip.css({
                top: positionY,
                left: positionX,
            }).show();
        },

        hideTooltip: function () {
            $('#tipmsg').hide();
        },

        prettyString: function (str, options) {
            if (str == null || typeof str !== 'string')
                return str;
            if (!options)
                options = {};

            if (options.strip) {
                var stripArr = options.strip.split('|');
                $.each(stripArr, function (_, strip) {
                    str = str.replace(RegExp(strip, 'g'), '');
                });
            }

            // Replace underscores with a space
            str = str.replace(/_/g, ' ');

            // Remove all brackets
            str = str.replace(/\[/g, '').replace(/\]/g, '');

            // Turn the first character of each word into upper case
            str = str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            });

            return (options.prefix || '')
                + str
                + (options.postfix || '');
        },

        matchHeightToWidth: function (id) {
            $("#"+id).height( $("#"+id).width() * 2/3 );
        },

        delay: function (ms) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(2);
                }, ms);
            });
        },

        disableScroll: function () {
            $('body').css({ overflow: 'hidden'});
        },

        enableScroll: function () {
            $('body').css({ overflow: 'visible'});
        },
    };
})();
