var curId = 1;
var targetId = 1;
var direction = 0;
var vid;
var img;

function playsunstudy(btnId) {
    // direction=1(forward), direction=-1(backward), direction=0(nothing)
    direction = Math.sign(btnId - curId);

    targetId = btnId;

    if (direction) {
        playVid(`${curId}-${curId+direction}`);
        curId += direction;
    }
}

function playVid(id) {
    // remove event listener
    var videos = document.getElementsByTagName("video");
    Array.prototype.forEach.call(videos, function (video) {
        video.removeEventListener('ended', myHandler, false);
    });

    vid = document.getElementById(id);
    img = document.getElementById(curId);

    var els = document.getElementsByClassName('full');
    Array.prototype.forEach.call(els, function (el) {
        el.classList.remove('show');
        el.classList.add('hide');
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

    if (curId != targetId) {
        playVid(`${curId}-${curId+direction}`);
        curId += direction;
    }
}
