window.addEventListener("load", init);

// //method to get date in "yyyy-mm-dd" format
// Date.prototype.yyyymmdd = function() {
//     var yyyy = this.getFullYear();
//     var mm = this.getMonth() < 9 ? "-0" + (this.getMonth() + 1) : "-" + (this.getMonth() + 1);
//     var dd  = this.getDate() < 10 ? "-0" + this.getDate() : "-" + this.getDate();
//     return yyyy + mm + dd;
// };

function init() {

    setTimeout(scroll, 500);

    function scroll() {
        var url = window.location.href;
        var index = url.indexOf("#")
        if (index > 0) {
            url = url.substring(0, index);
        };
        window.location.replace(url + "#reserv");
    };

    var checkINinput = document.getElementById("check-in");
    var checkOUTinput = document.getElementById("check-out");
    var checkOUTinputWasFocused = false;
    var adults = document.getElementById("adults");
    var children = document.getElementById("children");
    var roomType = document.getElementById("room_type");
    var error1 = document.getElementById("p_error_1");
    var error2 = document.getElementById("p_error_2");
    var checkButton = document.getElementById("check_button");
    var today = new Date;
    today.setHours(0, 0, 0, 0);
    var steps = document.getElementsByClassName("step");
    var data;

    checkINinput.addEventListener("change", checkINvalidation);
    checkOUTinput.addEventListener("change", checkOUTvalidation);
    checkOUTinput.addEventListener("focus", checkOUTfocused);
    checkButton.addEventListener("click", firstStep);

    function checkINvalidation() {
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
        if (checkOUTinputWasFocused) {
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
    };
    
    function checkOUTfocused() {
        checkOUTinputWasFocused = true;
        checkINinput.removeEventListener("focus", checkOUTfocused);
    };

    if (window.sessionStorage.flag == "index") {
        setTimeout(firstStep, 1000);
    };

    function firstStep() {

        checkOUTinputWasFocused = true;

        if (window.sessionStorage.flag == "index") {
            window.sessionStorage.flag = "";
            if (window.sessionStorage.checkIN) { checkINinput.value = window.sessionStorage.checkIN; checkINvalidation(); };
            if (window.sessionStorage.checkOUT) { checkOUTinput.value = window.sessionStorage.checkOUT; checkOUTvalidation(); };
            if (window.sessionStorage.adults) { adults.value = window.sessionStorage.adults; };
            if (window.sessionStorage.children) { children.value = window.sessionStorage.children; };
        };

        if (checkINvalidation() && checkOUTvalidation()) {
            window.sessionStorage.checkIN = checkINinput.value;
            window.sessionStorage.checkOUT = checkOUTinput.value;
            window.sessionStorage.adults = adults.value;
            window.sessionStorage.children = children.value;
            window.sessionStorage.roomType = roomType.value;
            window.sessionStorage.flag = "reservations";
            scroll();
            setTimeout(secondStep, 750);
        };
    };

    function secondStep() {

        document.getElementById("step1_action").style.display = "none";
        document.getElementById("step2_action").style.display = "block";
        steps[0].classList.add("completed_step");
        steps[0].classList.remove("current_step");
        steps[1].classList.add("current_step");

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "server/data.json", true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) {
                return;
            };

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                data = JSON.parse(xhr.responseText);
                processResponse();
            };
        };

        function processResponse() {

            var filteredData = [];

            var requestingPeopleNumber = +window.sessionStorage.adults + +window.sessionStorage.children;

            for (var i = 0; i < data.length; i++) {
                if (window.sessionStorage.roomType != "all") {
                    if (data[i].category != window.sessionStorage.roomType) {
                        continue;
                    };
                };
                if (data[i].maxPersons >= requestingPeopleNumber) {
                    var intersects = false;
                    for (y = 0; y < data[i].bookedPeriods.length; y++) {
                        if ((window.sessionStorage.checkIN < data[i].bookedPeriods[y].checkIN && window.sessionStorage.checkOUT <= data[i].bookedPeriods[y].checkIN) || (window.sessionStorage.checkIN > data[i].bookedPeriods[y].checkOUT)) {
                            continue;
                        } else {
                            intersects = true;
                        };
                    };
                    if (!intersects) { 
                        filteredData.push(data[i]); 
                    };
                };
            };

            // for (var i = 0; i < data.length; i++) {
            //     var intersects = false;
            //     for (y = 0; y < data[i].bookedPeriods.length; y++) {
            //         if ((window.sessionStorage.checkIN < data[i].bookedPeriods[y].checkIN && window.sessionStorage.checkOUT <= data[i].bookedPeriods[y].checkIN) || (window.sessionStorage.checkIN > data[i].bookedPeriods[y].checkOUT)) {
            //             continue;
            //         } else {
            //             intersects = true;
            //         };
            //     };
            //     if (!intersects) { 
            //         filteredData.push(data[i]); 
            //     };
            // };

            var container = document.getElementById("rooms_overview");

            for (var i = 0; i < filteredData.length; i++) {
                var elem = document.createElement("div");
                elem.classList.add("room_preview")
                var img = document.createElement("img");
                img.src = filteredData[i].image;
                img.attributes.alt = "room_image";
                var summary = document.createElement("div");
                summary.id = "ID#" + filteredData[i].roomNumber;
                summary.classList.add("room_summary");
                summary.innerHTML = "<h2 class='room_heading'>" + filteredData[i].category + " (#"+ filteredData[i].roomNumber +")</h2><p class='specs'><sup>$</sup><span class='price'>"+ data[i].price +"</span><sub>/per night</sub></p><p class='specs'><span class='specification'>Adults: </span>"+ filteredData[i].maxPersons +"</p><p class='specs'><span class='specification'>Categories: </span>"+ filteredData[i].category +"</p><p class='specs'><span class='specification'>Facilities: </span>Closet with hangers,HD flat-screen TV, Telephone</p><p class='specs'><span class='specification'>Size: </span>"+ filteredData[i].size +"m<sup>2</sup></p><p class='specs'><span class='specification'>Bed Type: </span>"+ filteredData[i].bedType +"</p><button class='choose'>Choose This Room</button>";
                elem.appendChild(img);
                elem.appendChild(summary);
                container.appendChild(elem);
            };

            container.addEventListener("click", roomWasChosed);
        };   

        function roomWasChosed(e) {
            if (e.target.classList.contains("choose")){
                window.sessionStorage.roomID = e.target.parentElement.id;
                window.sessionStorage.flag = "step2"
                scroll();
                setTimeout(thirdStep, 750);
            };
        };


    };

    function thirdStep() {
        //changing step_view
        document.getElementById("step2_action").style.display = "none";
        document.getElementById("step3_action").style.display = "block";
        var steps = document.getElementsByClassName("step");
        steps[1].classList.add("completed_step");
        steps[1].classList.remove("current_step");
        steps[2].classList.add("current_step");

        // getting updated info from server
        var data;
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
                continueReservation();
            };
        };

        var chosenIndex;

        function continueReservation() {
            for (var i = 0; i < data.length; i++) {
                if (window.sessionStorage.roomID.indexOf(data[i].roomNumber) > 0) {
                    chosenIndex = i;
                };
            };
        

            var container = document.getElementById("room_container");
            var elem = document.createElement("div");
            elem.classList.add("room_preview")
            var img = document.createElement("img");
            img.src = data[chosenIndex].image;
            img.attributes.alt = "room_image";
            // elem.appendChild(img);
            var summary = document.createElement("div");
            // summary.id = "ID#" + data[i].roomNumber;
            summary.classList.add("room_summary");
            summary.innerHTML = "<h2 class='room_heading'>" + data[chosenIndex].category + " (#"+ data[chosenIndex].roomNumber +")</h2><p class='specs'><sup>$</sup><span class='price'>"+ data[chosenIndex].price +"</span><sub>/per night</sub></p><p class='specs'><span class='specification'>Adults: </span>"+ data[chosenIndex].maxPersons +"</p><p class='specs'><span class='specification'>Categories: </span>"+ data[chosenIndex].category +"</p><p class='specs'><span class='specification'>Facilities: </span>Closet with hangers,HD flat-screen TV, Telephone</p><p class='specs'><span class='specification'>Size: </span>"+ data[chosenIndex].size +"m<sup>2</sup></p><p class='specs'><span class='specification'>Bed Type: </span>"+ data[chosenIndex].bedType +"</p>";
            elem.appendChild(img);
            elem.appendChild(summary);
            container.appendChild(elem);

            document.getElementById("check-in-span").innerText = window.sessionStorage.checkIN;
            document.getElementById("check-out-span").innerText = window.sessionStorage.checkOUT;

            var b = document.getElementById("reserv_button");
            b.addEventListener("click", validateForm);

            var name = document.getElementById("name");
            var surname = document.getElementById("surname");
            var email = document.getElementById("email");
            var tel = document.getElementById("tel");
            var formContainer = document.getElementsByClassName("booking_info")[0];

            function validateForm() {              
                if (name.value == "") {
                    name.classList.add("invalid");
                } else {
                    name.classList.remove("invalid");
                };
                if (surname.value == "") {
                    surname.classList.add("invalid");
                } else {
                    surname.classList.remove("invalid");
                };
                if (email.value == "") {
                    email.classList.add("invalid");
                } else {
                    email.classList.remove("invalid");
                };
                if (tel.value == "") {
                    tel.classList.add("invalid");
                } else {
                    tel.classList.remove("invalid");
                };

                formContainer.addEventListener("change", validateForm);
                var formValid = true

                for (var i = 0; i < formContainer.children.length; i++) {
                    if (formContainer.children[i].classList.contains("invalid")) {
                        formValid = false;
                        break;
                    };
                };

                if (formValid) {
                    window.sessionStorage.name = name.value;
                    window.sessionStorage.surname = surname.value;
                    window.sessionStorage.email = email.value;
                    window.sessionStorage.tel = tel.value;
                    scroll();
                    setTimeout(fourthStep, 750);
                };

            };

        };

    };


    function fourthStep() {
        document.getElementById("step3_action").style.display = "none";
        document.getElementById("step4_action").style.display = "block";
        var steps = document.getElementsByClassName("step");
        steps[2].classList.add("completed_step");
        steps[2].classList.remove("current_step");
        steps[3].classList.add("current_step");

        var b = document.getElementById("confirm_button");
        b.addEventListener("click", confirmed);

    };

    function confirmed() {
        document.getElementById("step4_action").style.display = "none";
        document.getElementById("step5_action").style.display = "block";
        var steps = document.getElementsByClassName("step");
        steps[3].classList.add("completed_step");
        steps[3].classList.remove("current_step");
    };

    //develop-only
    // secondStep();
    // thirdStep();
    // fourthStep();
    

};