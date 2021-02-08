function sortTabletest(n) {
    var table1, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;

    table1 = document.getElementById("tabletest");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table1.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];


            if (x == null && dir == 'asc') {
                x = 'a';
            } else if (x == null && dir == 'desc') {
                x = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
            }

            if (n == 3) {
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;

                    }

                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;

                    }
                }


            }

            if (dir == "asc") {
                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                    shouldSwitch = true;
                    break;

                }

            } else if (dir == "desc") {
                if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                    shouldSwitch = true;
                    break;

                }

            }

        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

}