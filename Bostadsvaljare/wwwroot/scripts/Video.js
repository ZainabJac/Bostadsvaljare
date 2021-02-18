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
    if (!img)
        img = $(`#${curId}`);

    if (direction) {
        playVid(`${curId}-${curId + direction}`);
        curId += direction;
        img = $(`#${curId}`);
        update();
    }
}

function playVid(id) {
    vid = $(`#${id}`);
    $('#progressdiv').addClass('loading');
    let tmpImg = img;
    img.fadeOut(400, function () {
        tmpImg.addClass('hide');
    });
    vid.removeClass('hide');
    vid.fadeIn(300);

    vid[0].currentTime = 0;
    vid[0].play();
    vid.on('ended', onVidEnded);

    setTimeout(function () {
        vid.fadeOut(400);
        img.removeClass('hide');
        img.fadeIn(300);
    }, vid[0].duration * 1000 - 400);
}

function onVidEnded(e) {
    vid.addClass('hide');
    $('#progressdiv').removeClass('loading');
    if (curId != targetId) {
        let oldTarget = targetId;
        setTimeout(function () {
            if (oldTarget !== targetId)
                return;
            playVid(`${curId}-${curId + direction}`);
            curId += direction;
            img = $(`#${curId}`);

            update();
        }, 1500);
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
            circle.classList.remove('animate__animated');
            circle.classList.remove('animate__pulse');
            circle.classList.remove('animate__repeat-2');
        }
    });

    const maxWidth = $('.progress-container').width(),
        circleSize = 53,
        circleNr = circles.length - 1,
        activesNr = $('.active').length - 1;
    progress.width((maxWidth - circleSize) * activesNr / circleNr);
}