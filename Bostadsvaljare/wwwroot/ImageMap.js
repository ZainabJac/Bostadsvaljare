//TODO: show tooltip with concise info about an housing
let housingsData;
let colors = {
    available: "5bcb24",
    sold: "d32626",
    booked: "dfd431"
}
let views = {};
let view;


function init() {
    console.log("ImageMap.start");
    let housingsData = document.getElementById("overview_im");
    view = 0;

    let selector = document.getElementById("selector");
    //TODO: adjust the image map to the frame's asepct ratio
    let w = selector.clientWidth,
        h = selector.clientHeight;

    let options = {
        //staticState: false,
        mapKey: 'status',
        fill: true,
        onClick: function (e) {
            onClick(e);
        },
        areas: [{
            key: 'available',
            fillColor: colors.available
        },
        {
            key: 'booked',
            fillColor: colors.booked
        },
        {
            key: 'sold',
            fillColor: colors.sold
        }]
    };

    /*for (const [viewInd, housingView] of Object.entries(housingsData.map)) {
        // let housingView = housingsData.map[0];

        // let imgEl = document.createElement("img");
        // imgEl.width = w;
        // imgEl.height = h;
        // imgEl.src = housingView.image;
        // imgEl.id = viewInd;
        // imgEl.useMap = '#housings-map' + viewInd;
        let img = new Image(w, h);
        img.src = housingView.image;
        img.id = 'view' + viewInd;
        img.useMap = '#housings-map' + viewInd;

        let mapEl = document.createElement("map");
        mapEl.name = 'housings-map' + viewInd;
        applyMap(mapEl, housingView.housings);

        selector.appendChild(mapEl);

        views[parseInt(viewInd)] = img;
    }*/

    // imgEl.src = housingsData.map[view].image;
    // imgEl.useMap = '#housings-map' + view;
    // selector.appendChild(imgEl);
    //selector.appendChild(views[view]);
    $('img').mapster(options);
    //$('img').onClick = function (data) { clickHandler(data); };
    $('img').onStateChange = function (event) { console.log(event); };

    return true;
}

/*function applyMap(mapEl, housings) {
    housings.forEach(housing => {
        for (const [housingName, coords] of Object.entries(housing)) {
            if (housingName === 'status')
                continue;
            let area = document.createElement("area");
            area.shape = 'poly';

            area.href = '#';
            area.title = housingName;
            area.setAttribute('status', housing.status);
            area.coords = coords;
            area.onclick = function () { showHousingInfo(housingName); };

            mapEl.appendChild(area);
        }
    });
}*/

function onClick(data) {
    console.log("onClick", data);
}

function clickHandler(data) {
    console.log("clickHandler", data);
}

function click() {
    console.log("clickity click");
}

function hover() {
    console.log("hoverberg");
}

function showHousingInfo(name) {
    console.log('clicked', name);
    //TODO: show info of selected housing
}

function changeView(args) {
    let newView = args.view;
    // $('img').mapster('unbind');
    //TODO: change image and image map
    let parent = views[view].parentNode;
    parent.removeChild(views[view]);
    parent.appendChild(views[newView]);
    // document.getElementById('view'+view).src = views[newView].src;
    // document.getElementById('view'+view).id = 'view' + newView;

    // $('img.mapster_el').src = views[newView];
    // console.log($('img.mapster_el'));

    let options = {
        staticState: false,
        mapKey: 'status',
        fill: true,
        areas: [{
            key: 'available',
            fillColor: colors.available
        },
        {
            key: 'booked',
            fillColor: colors.booked
        },
        {
            key: 'sold',
            fillColor: colors.sold
        }]
    };
    $('#view' + newView).mapster('rebind', options);
    view = newView;
}
