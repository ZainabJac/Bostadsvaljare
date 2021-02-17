var curId = 1;
var targetId = 1;
var direction = 0;
var vid;
var img;
let currentActive = 1;
let progress;
let circles;

function playsunstudy(btnId) {
    // direction=1(forward), direction=-1(backward), direction=0(nothing)
    direction = Math.sign(btnId - curId);
    progress = document.getElementById('progress');
    circles = document.querySelectorAll('.circle');

    targetId = btnId;


    if (direction) {
        playVid(`${curId}-${curId+direction}`);
        curId += direction;
        img = $(`#${curId}`);
        currentActive += direction;
    }
}

function playVid(id) {
    // remove event listener
    $('video').off('ended', onVidEnded);

    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    update();


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
        }, 1500);
    }
}


function update() {
   
    circles.forEach((circle, inx) => {
        if (inx < currentActive) {
            circle.classList.add('active');
            circle.classList.add('animate__animated')
            circle.classList.add('animate__pulse')
            circle.classList.add('animate__repeat-2')
     
            
        } else {
            circle.classList.remove('active');
        }
    });

    const actives = document.querySelectorAll('.active');
    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';


}