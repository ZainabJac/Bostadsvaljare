function menuOnClick(n) {
    document.getElementById("menu-btn").checked = false;
    if (window.location.href == n) {
        location.reload();
    }
    else { $('#topnav').addClass('loading'); }

}



