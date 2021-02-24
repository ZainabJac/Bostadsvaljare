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

function loadisdone() {
    setTimeout(() => { $('#theWindow').removeClass('loading'); }, 2000);
}

function playVid(id) {
    vid = $(`#${id}`);
    $('#progressdiv').addClass('loading');
    let tmpImg = img;
    vid.fadeIn(100);
    img.fadeOut(500, function () {
        tmpImg.addClass('hide');
    });
    vid.removeClass('hide');

    vid[0].currentTime = 0;
    vid[0].play();
    //vid.on('ended', onVidEnded);

    setTimeout(function () {

        onVidEnded()
    }, 5000)

    setTimeout(function () {
        vid.fadeOut(500);
        img.removeClass('hide');
        img.fadeIn(100);
    }, vid[0].duration * 1000 - 500);
}

    
function onVidEnded() {
    vid.stop() 
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

    setTimeout(function () {
       
        $(`#0${curId}`).addClass('animate__animated');
        $(`#0${curId}`).addClass('animate__pulse');
        $(`#0${curId}`).addClass('animate__repeat-2');
    }, 4500);

    circles.each((inx, circle) => {
        if (inx < curId) {
            circle.classList.remove('animate__animated');
            circle.classList.remove('animate__pulse');
            circle.classList.remove('animate__repeat-2');
            circle.classList.add('active');
           
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
        activesNr = $('.active').length - 1,
        widthPx = (maxWidth - circleSize) * activesNr / circleNr;
    progress.css('width', `${widthPx / maxWidth * 100}%`);
}