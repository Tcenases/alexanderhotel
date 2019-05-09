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

        var checkIN;
        var checkOUT;
        var checkINinput = document.getElementById("check-in");
        var checkOUTinput = document.getElementById("check-out");
        var adults = document.getElementById("adults");
        var children = document.getElementById("children");
        var error1 = document.getElementById("p_error_1");
        var error2 = document.getElementById("p_error_2");
        var error3 = document.getElementById("p_error_3");
        var error4 = document.getElementById("p_error_4");
        var errorPeople = document.getElementById("p_error_people");
        var errorDates = document.getElementById("p_error_dates");
        var success = document.getElementById("p_success");
        var checkButton = document.getElementById("check_button");
        var chooseButton = document.getElementById("choose_button");

        var today = new Date;
        today.setHours(0, 0, 0, 0);

        function isFormValid() {
            var marker = true;
            if (!checkINvalidation()) { marker = false };
            if (!checkOUTvalidation()) { marker = false };
            if (!peopleValidation()) { marker = false };
            return marker;
        }

        checkINinput.addEventListener("change", checkINvalidation);
        checkOUTinput.addEventListener("change", checkOUTvalidation);
        checkINinput.addEventListener("change", revert);
        checkOUTinput.addEventListener("change", revert);
        adults.addEventListener("change", peopleValidation);
        children.addEventListener("change", peopleValidation);

        function checkINvalidation() {
            errorDates.style.display = "none";
            checkIN = new Date(document.getElementById("check-in").value);
            if (checkINinput.value == "") {
                error1.style.display = "block";
                error1.innerText = "Please, enter check-in date";
                checkINinput.classList.add("invalid");
                return false;
            } else if (checkIN < today) {
                error1.style.display = "block";
                error1.innerText = "Check-in date should be bigger than today`s!";
                checkINinput.classList.add("invalid");
                return false;
            } else {
                error1.style.display = "none";
                checkINinput.classList.remove("invalid");
                checkOUTvalidation();
                return true;
            };
        };

        function checkOUTvalidation() {
            errorDates.style.display = "none";
            checkOUT = new Date(document.getElementById("check-out").value);
            if (checkOUTinput.value == "") {
                error2.style.display = "block";
                error2.innerText = "Please, enter check-out date";
                checkOUTinput.classList.add("invalid");
                return false;
            } else if (checkOUTinput.value != "" && checkOUT <= checkIN) {
                error2.style.display = "block";
                error2.innerText = "Check-out`s date should be bigger than check-in`s!";
                checkOUTinput.classList.add("invalid");
                return false;
            } else {
                error2.style.display = "none";
                checkOUTinput.classList.remove("invalid");
                return true;
            };
        };

        function peopleValidation() {
            if (+adults.value + +children.value > room.maxPersons) {
                error3.style.display = "block";
                error3.innerText = "The max people in this room is limited to " + room.maxPersons;
                adults.classList.add("invalid");
                if (children.value != 0) {
                    error4.style.display = "block";
                    error4.innerText = "The max people in this room is limited to " + room.maxPersons;
                    children.classList.add("invalid");
                } else {
                    error4.style.display = "none";
                    error4.innerText = "The max people in this room is limited to " + room.maxPersons;
                    children.classList.remove("invalid");
                };
                if (success.style.display == "block") {
                    chooseButton.style.display = "none";
                    errorPeople.style.display = "block";
                };
                return false;
            } else {
                error3.style.display = "none";
                error3.innerText = "The max people in this room is limited to " + room.maxPersons;
                adults.classList.remove("invalid");
                error4.style.display = "none";
                error4.innerText = "The max people in this room is limited to " + room.maxPersons;
                children.classList.remove("invalid");
                if (checkButton.style.display == "none") {
                    chooseButton.style.display = "block";
                    errorPeople.style.display = "none";
                };
                return true;
            };
        };

        function revert() {
            errorPeople.style.display = "none";
            success.style.display = "none";
            chooseButton.style.display = "none";
            checkButton.style.display = "block";
        }

        if (isFormValid()) {
            if (areDatesFree()) {
                // errorDates.style.display = "none";
                checkButton.style.display = "none";
                success.style.display = "block";
                chooseButton.style.display = "block";
                document.getElementById("choose_button").addEventListener("click", startReservation);
            } else {
                errorDates.style.display = "block";
            };
        };

        function areDatesFree() {
            for (var i = 0; i < room.bookedPeriods.length; i++) {
                if ((checkINinput.value < room.bookedPeriods[i].checkIN && checkOUTinput.value <= room.bookedPeriods[i].checkIN) || (checkINinput.value > room.bookedPeriods[i].checkOUT)) {
                    continue;
                }
                return false;
            };
            return true;
        };

        function startReservation() {
            window.sessionStorage.flag = "singleRoom";
            window.sessionStorage.checkIN = checkINinput.value;
            window.sessionStorage.checkOUT = checkOUTinput.value;
            window.sessionStorage.adults = adults.value;
            window.sessionStorage.children = children.value;
            window.sessionStorage.roomNumber = room.roomNumber;
            window.location.assign("reservation.html");
        };


    };






};