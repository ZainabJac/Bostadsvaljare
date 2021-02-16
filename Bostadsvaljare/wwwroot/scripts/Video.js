var curIdx = 1;
var target = 1;
var direction = 0;
var vid;
var img;

function playsunstudy(id, btnid) {
    // direction=1(forward), direction=-1(backward), direction=0(replay)
    direction = (btnid == curIdx) ? 0 : ((btnid > curIdx) ? 1 : -1);

    target = btnid;

    if (!direction) {
        playVid(id);
    } else {
        curIdx += direction;
        playVid('myVideo' + `${curIdx}`);
    }
}

function playVid(id) {
    // remove event listener
    var videoes = document.getElementsByTagName("video");
    Array.prototype.forEach.call(videoes, function (video) {
        video.removeEventListener('ended', myHandler, false)
    });

    vid = document.getElementById(id);
    img = document.getElementById(curIdx);

    var els = document.getElementsByClassName('full')
    Array.prototype.forEach.call(els, function (el) {
        el.classList.remove('show')
        el.classList.add('hide')
    });

    img.classList.remove('hide');
    img.classList.add('show');

    setTimeout(() => {
        img.classList.remove('show');
        img.classList.add('hide');
        vid.classList.remove('hide');
        vid.classList.add('show');
        vid.currentTime = 0;
        vid.play();
        vid.addEventListener('ended', myHandler, false);
    }, 500);
}

function myHandler(e) {
    vid.currentTime = 0;
    vid.classList.remove('show');
    vid.classList.add('hide');
    img.classList.remove('hide');
    img.classList.add('show');

    if (curIdx != target) {
        curIdx += direction;
        playVid('myVideo' + `${curIdx}`);
    }

    else if (curIdx == 5) {
        img.classList.remove('show');
        img.classList.add('hide');

        document.getElementById('6').classList.remove('hide');
        document.getElementById('6').classList.add('show');
    }
}