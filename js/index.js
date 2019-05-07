window.addEventListener("load", init, false);

function init() {

    document.getElementById("check_button").addEventListener("click", startReservationProcess, false);

    function startReservationProcess() {
        window.sessionStorage.flag = "index";
        window.sessionStorage.startDate = document.getElementById("check-in").value;
        window.sessionStorage.endDate = document.getElementById("check-out").value;
        window.sessionStorage.adults = document.getElementById("adults").value;
        window.sessionStorage.children = document.getElementById("children").value;
        window.location.assign("reservation.html");
    };
};
