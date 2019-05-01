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
        window.location.replace(url + "#reservation-block");
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
            secondStep();
            //alert("OK");
        };
    };

    function secondStep() {
        var steps = document.getElementsByClassName("step");
        steps[0].classList.add("completed_step");
        steps[0].classList.remove("current_step");
        steps[1].classList.add("current_step");
    };

};