window.addEventListener("load", init, false);

function init() {

    document.getElementById("check_button").addEventListener("click", startReservationProcess, false);

    function startReservationProcess() {
        window.sessionStorage.flag = "index";
        window.sessionStorage.startDate = document.getElementById("check-in").value;
        window.sessionStorage.endDate = document.getElementById("check-out").value;
        window.sessionStorage.adults = document.getElementById("adults").value;
        window.sessionStorage.children = document.getElementById("children").value;
        var url = window.location.href;
        if (url.indexOf("index.html") > 0) {
            var newUrl = url.replace("index.html", "reservation.html");
        }
        else {
            newUrl = url + "reservation.html";
        };
        window.location.assign(newUrl);
    };
};
