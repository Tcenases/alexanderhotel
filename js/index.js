window.addEventListener("load", init, false);

function init() {

    document.getElementById("check_button").addEventListener("click", startReservationProcess, false);

    Date.prototype.yyyymmdd = function() {
        var yyyy = this.getFullYear();
        var mm = this.getMonth() < 9 ? "-0" + (this.getMonth() + 1) : "-" + (this.getMonth() + 1);
        var dd  = this.getDate() < 10 ? "-0" + this.getDate() : "-" + this.getDate();
        return yyyy + mm + dd;
    };
    
    function startReservationProcess() {
        var startDate = document.getElementById("check-in");
        var endDate = document.getElementById("check-out");
        var date = new Date;
        var flag = true;
        if (startDate.value < date.yyyymmdd()) {
            flag = false;
            startDate.style.backgroundColor = "#dc3545";

        };
        if (endDate.value <= startDate.value) {
            flag = false;
            endDate.style.backgroundColor = "#dc3545";
        };
        if (flag) {
            window.sessionStorage.startDate = startDate.value;
            window.sessionStorage.endDate = endDate.value;
            window.sessionStorage.adults = "";
            window.sessionStorage.children = "";
            var url = window.location;
            if (String.prototype.indexOf.call(url, "index.html")) {
                var newUrl = String.prototype.replace.call(url, "index.html", "reservation.html");
            }
            else {
                newUrl = url + "/reservation.html";
            }
            window.location.replace(newUrl);
        };
    };

;}