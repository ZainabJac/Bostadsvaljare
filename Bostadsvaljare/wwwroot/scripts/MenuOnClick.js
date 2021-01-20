function menuOnClick(n) {
    document.getElementById("menu-btn").checked = false;
    if (window.location.href == n) {
        return;
    }
    else { $('#topnav').addClass('loading'); }

}



