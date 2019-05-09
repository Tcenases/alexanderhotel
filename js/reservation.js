window.addEventListener("load", init);

//method to get date in "yyyy-mm-dd" format
Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "-0" + (this.getMonth() + 1) : "-" + (this.getMonth() + 1);
    var dd  = this.getDate() < 10 ? "-0" + this.getDate() : "-" + this.getDate();
    return yyyy + mm + dd;
};

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

    document.getElementById("check-button").addEventListener("click", firstStep);

    var startDate = document.getElementById("check-in");
    var endDate = document.getElementById("check-out");
    var adults = document.getElementById("adults");
    var children = document.getElementById("children");
    var roomType = document.getElementById("room_type");
    var flag1;
    var flag2;
    var errorMsg1 = document.getElementById("error_msg1");
    var errorMsg2 = document.getElementById("error_msg2");

    startDate.addEventListener("blur", validateStartDate);
    endDate.addEventListener("blur", validateEndDate);

    function validateStartDate() {
        if (startDate.value <= "2019-05-02") {
            startDate.classList.add("invalid");
            flag1 = false;
            errorMsg1.style.display = "inline";
            validateEndDate();
        }
        else {
            startDate.classList.remove("invalid");
            flag1 = true;
            errorMsg1.style.display = "none";
        }
    };

    function validateEndDate() {
        if (endDate.value <= "2019-05-02" || endDate.value <= startDate.value) {
            endDate.classList.add("invalid");
            flag2 = false;
            errorMsg2.style.display = "inline";
            //validateStartDate();
        }
        else {
            endDate.classList.remove("invalid");
            flag2 = true;
            errorMsg2.style.display = "none";
        }
    };


    if (window.sessionStorage.flag == "index") {
        firstStep();
    };


    function firstStep() {
        if (window.sessionStorage.flag == "index") {
            window.sessionStorage.flag = "";
            if (window.sessionStorage.startDate) {startDate.value = window.sessionStorage.startDate; validateStartDate()};
            if (window.sessionStorage.endDate) { endDate.value = window.sessionStorage.endDate; validateEndDate()};
            if (window.sessionStorage.adults) { adults.value = window.sessionStorage.adults; };
            if (window.sessionStorage.children) {children.value = window.sessionStorage.children; };
        };

        if (flag1 && flag2) {
            window.sessionStorage.startDate = startDate.value;
            window.sessionStorage.endDate = endDate.value;
            window.sessionStorage.adults = adults.value;
            window.sessionStorage.children = children.value;
            window.sessionStorage.roomType = roomType.value;
            window.sessionStorage.flag = "reservations";
            scroll();
            setTimeout(secondStep, 750);
            //alert("OK");
        };
    };

    function secondStep() {

        document.getElementById("step1_action").style.display = "none";
        document.getElementById("step2_action").style.display = "block";
        var steps = document.getElementsByClassName("step");
        steps[0].classList.add("completed_step");
        steps[0].classList.remove("current_step");
        steps[1].classList.add("current_step");


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
                processResponse();
            };
        };


        

        function processResponse() {

            var container = document.getElementById("rooms_overview");

            for (var i = 0; i < data.length; i++) {
                var elem = document.createElement("div");
                elem.classList.add("room_preview")
                var img = document.createElement("img");
                img.src = data[i].image;
                img.attributes.alt = "room_image";
                // elem.appendChild(img);
                var summary = document.createElement("div");
                summary.id = "ID#" + data[i].roomNumber;
                summary.classList.add("room_summary");
                summary.innerHTML = "<h2 class='room_heading'>" + data[i].category + " (#"+ data[i].roomNumber +")</h2><p class='specs'><sup>$</sup><span class='price'>"+ data[i].price +"</span><sub>/per night</sub></p><p class='specs'><span class='specification'>Adults: </span>"+ data[i].maxPersons +"</p><p class='specs'><span class='specification'>Categories: </span>"+ data[i].category +"</p><p class='specs'><span class='specification'>Facilities: </span>Closet with hangers,HD flat-screen TV, Telephone</p><p class='specs'><span class='specification'>Size: </span>"+ data[i].size +"m<sup>2</sup></p><p class='specs'><span class='specification'>Bed Type: </span>"+ data[i].bedType +"</p><button class='choose'>Choose This Room</button>";
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
        

            var container = document.getElementById("step3_action").children[0];
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

            var b = document.getElementById("reserv_button");
            b.addEventListener("click", prepareForStep4);

            function prepareForStep4() {
                scroll();
                setTimeout(fourthStep, 750);
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

};