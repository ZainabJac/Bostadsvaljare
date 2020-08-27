
function ResizeScript() {
    window.addEventListener('resize', sf.base.debounce(ResizeComplete, 500));
}



function ResizeComplete() {
    //This will be triggered when browser window resize completes.
    var HouseList = document.getElementById("GridResize").ej2_instances[0];  //Get the instance of Syncfusion Grid
    var rowHeight = HouseList.getRowHeight();                                 //Get the Grid row height
    var winHeight = HouseList.getContent();
    var gridHeight = window.innerHeight - 100;                     //here you can set a height for the grid according your need(if any other elements are present in that page).
    var pageSize = HouseList.pageSettings.pageSize + 10;
    var pageResize = (gridHeight - (1.25 * pageSize * rowHeight )) / rowHeight;
    HouseList.pageSettings.pageSize = pageSize + Math.round(pageResize);     //Assign the calculated value based on your window for the "pageSize" property
}

