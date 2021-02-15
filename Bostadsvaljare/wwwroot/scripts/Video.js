function Reverse(id, btnid) {
    var els = document.getElementsByClassName('full')
    var video = document.getElementById(id)
    Array.prototype.forEach.call(els, function (el) {
        el.classList.add('hide')
        console.log(el.tagName);
    });
   
    video.classList.add('show')
    video.play()
    video.onended = function () {
        video.classList.remove('show')
        document.getElementById('img1').classList.add('show')
    }

    var currentimg = document.getElementsByClassName('show')[0]

    var Numberofloops = btnid - currentimg

    

    if (Numberofloops > 0) {

        while (i < Numberofloops) {
            text += "The number is " + i;
            i++;
        }
    }
    else {

        var Numberofloops2 = Numberofloops * -1;

        while (i < Numberofloops2) {
           
            id++;
            i++;
            looping(id, i)
        }

    }


    function looping(id, i, numberofloops) {
        Array.prototype.forEach.call(els, function (el) {
            el.classList.add('hide')
            console.log(el.tagName);
        });

        var vid = document.getElementById('myVideo' + `${id}`)
        vid.classList.add('show')   
        vid.play()
        vid.onended = function () {
           
            video.classList.remove('show')
            document.getElementById('img'+`${i}`).classList.add('show')
        }
    }
}

