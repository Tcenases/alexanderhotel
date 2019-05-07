window.addEventListener("load", init);

function init() {

    var roomNumber = window.location.search.substring(window.location.search.indexOf("roomNumber=") + 11);
    document.getElementById("sub_heading").innerText = "Room #" + roomNumber;


}