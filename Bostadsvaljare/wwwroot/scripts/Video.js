var curId = 1;
var targetId = 1;
var direction = 0;
var vid;
var img;
let progress;
let circles;

function playsunstudy(btnId) {
    // direction=1(forward), direction=-1(backward), direction=0(nothing)
    direction = Math.sign(btnId - curId);
    progress = $('#progress');
    circles = $('.circle');
    targetId = btnId;


    if (direction) {
        playVid(`${curId}-${curId+direction}`);
        curId += direction;
        img = $(`#${curId}`);

        update();
    }
}

function playVid(id) {
    vid = $(`#${id}`);

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
    vid.removeClass('show');
    vid.addClass('hide');
    img.removeClass('hide');
    img.addClass('show');

    if (curId != targetId) {
        setTimeout(function () {
            playVid(`${curId}-${curId+direction}`);
            curId += direction;
            img = $(`#${curId}`);

            update();
        }, 200);
    }

    vid.off('ended', onVidEnded);
}

function update() {
    circles.each((inx, circle) => {
        if (inx < curId) {
            circle.classList.add('active');
            circle.classList.add('animate__animated');
            circle.classList.add('animate__pulse');
            circle.classList.add('animate__repeat-2');
        } else {
            circle.classList.remove('active');
        }
    });

    const maxWidth = $('.progress-container').width(),
        circleSize = 53,
        circleNr = circles.length - 1,
        activesNr = $('.active').length - 1;
    progress.width((maxWidth - circleSize) * activesNr / circleNr);
}
