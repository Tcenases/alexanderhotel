window.addEventListener("load", init);

function init() {

    var roomNumber;
    var room;
    var index = window.location.search.indexOf("roomNumber=");
    if (index > 0) {
        roomNumber = window.location.search.substring(index + 11, index + 14);
        document.getElementById("sub_heading").innerText = "Room #" + roomNumber;
    } else {
        window.location.replace("/rooms.html");
    };

    var data;
    if (!window.sessionStorage.data) {
        getDataFromTheServer();
    } else {
       data = JSON.parse(window.sessionStorage.data);
       findRoomObject(roomNumber);
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
                findRoomObject(roomNumber);
            };
        };
    };

    function findRoomObject(roomNumber) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].roomNumber == roomNumber) {
                room = data[i];
                break;
            };
        };
        showRoomInfo(room);
    };

    function showRoomInfo(room) {
        document.getElementById("roomPrice").innerHTML = "$" + room.price + "<br><span>/per night</span>";
        document.getElementById("roomName").innerText = room.category;
        document.getElementById("beds").innerText = room.numberOfBeds;
        document.getElementById("peoples").innerText = room.maxPersons;
        document.getElementById("size").innerHTML = room.size + "m<sup>2</sup>";
        // documnet.getElementById("").innerText = ;
        document.getElementById("big_image_block").innerHTML = "<img src='" + room.image + "' alt='room_image_BIG'>"

    };

    document.getElementById("check_button").addEventListener("click", checkAvailabilty);

    function checkAvailabilty() {
        
    };






};