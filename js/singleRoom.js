window.addEventListener("load", init);

function init() {

    var roomNumber = window.location.search.substring(window.location.search.indexOf("roomNumber=") + 11);
    document.getElementById("sub_heading").innerText = "Room #" + roomNumber;

    var data;
    if (!window.sessionStorage.data) {
        getDataFromTheServer();
    } else {
       data = JSON.parse(window.sessionStorage.data);
    };

    function getDataFromTheServer() {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "server/data.json", true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) {
                return;
            };

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } 
            else {
                data = JSON.parse(xhr.responseText);
                // setTimeout(loadRooms, 5000);
            };
        };
    };




};