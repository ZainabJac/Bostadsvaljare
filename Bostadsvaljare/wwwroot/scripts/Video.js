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
    var videos = $('video');
    videos.off('ended', onVidEnded);

    vid = $('#' + `${id}`);
    img = $('#' + `${curId}`);

    var els = $('.full');
    els.removeClass('show');
    els.addClass('hide');

    vid.removeClass('hide');
    vid.addClass('show');
    vid[0].currentTime = 0;
    vid[0].play();
    vid.on('ended', onVidEnded);
}

function onVidEnded(e) {
    vid.currentTime = 0;
    vid.removeClass('show');
    vid.addClass('hide');
    img.removeClass('hide');
    img.addClass('show');

    if (curId != targetId) {
        playVid(`${curId}-${curId+direction}`);
        curId += direction;
    }
}
