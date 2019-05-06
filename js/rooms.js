window.addEventListener("load", init);

function init() {

    var data;
    getDataFromTheServer();

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
                setTimeout(loadRooms, 5000);
            };
        };
    };

    function loadRooms() {

        var featuredContainer = document.getElementById("featuredContainer");
        var simpleContainer = document.getElementById("simpleContainer");
        document.getElementById("loader").style.display = "none";
        var controller = true;

        for (var i = 0; i < data.length; i++) {   
            var elem = document.createElement("div");  
            elem.innerHTML = "<img src='" + data[i].image + "' alt='room" + i + "'><div class='room_summary'><h2 class='room_heading'>" + data[i].category + "</h2><p class='specs'><sup>$</sup><span class='price'>" + data[i].price + "</span><sub>/per night</sub></p><p class='specs'><span class='specification'>Adults: </span>" + data[i].maxPersons + "</p><p class='specs'><span class='specification'>Categories: </span>" + data[i].category + "</p><p class='specs'><span class='specification'>Facilities: </span>Closet with hangers, HD flat-screen TV, Telephone</p><p class='specs'><span class='specification'>Size: </span>" + data[i].size + "m<sup>2</sup></p><p class='specs'><span class='specification'>Bed Type: </span>" + data[i].bedType + "</p><button id='" + data[i].roomNumber + "' class='readmore_button'>Read More</button>"
            if (data[i].featured) {
                elem.classList.add("room_preview--featured")
                if (controller) { elem.classList.add("room_preview--featured-reversed") };
                controller = !controller;
                featuredContainer.appendChild(elem);
            } else {
                elem.classList.add("room_preview");
                simpleContainer.appendChild(elem);
            };      
        };
    };  
    
    document.getElementById("rooms_showcase").addEventListener("click", singleRoom);

    function singleRoom(e) {
        if (e.target.classList.contains("readmore_button")){
            window.location.assign("singleRoom.html?roomNumber=" + e.target.id);
        };
    };

};