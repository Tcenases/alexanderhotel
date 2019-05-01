window.addEventListener("load", init, false);

function init() {

    document.getElementById("check_button").addEventListener("click", startReservationProcess, false);

    function startReservationProcess() {
        var startDate = document.getElementById("check-in");
        var endDate = document.getElementById("check-out");
        var date = new Date;
        var flag = true;

        if (startDate.value < date.yyyymmdd()) {
            flag = false;
            startDate.style.backgroundColor = "rgba(255, 7, 7, 0.2)";
            startDate.style.border = "2px solid red";
        };
        if (endDate.value <= startDate.value) {
            flag = false;
            endDate.style.backgroundColor = "rgba(255, 7, 7, 0.2)";
            endDate.style.border = "2px solid red";
        };
        if (flag) {
            window.sessionStorage.startDate = startDate.value;
            window.sessionStorage.endDate = endDate.value;
            window.sessionStorage.adults = document.getElementById("adults").value;
            window.sessionStorage.children = document.getElementById("children").value;
            var url = window.location;
            if ((String.prototype.indexOf.call(url, "index.html")) > 0) {
                var newUrl = String.prototype.replace.call(url, "index.html", "reservation.html");
            }
            else {
                newUrl = url.href + "reservation.html";
            }
            window.location.assign(newUrl);
        };
    };

;}