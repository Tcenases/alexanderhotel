window.addEventListener("load", init, false);

function init() {

    document.getElementById("check_button").addEventListener("click", startReservationProcess);

    function startReservationProcess() {
        window.sessionStorage.flag = "index";
        window.sessionStorage.checkIN = document.getElementById("check-in").value;
        window.sessionStorage.checkOUT = document.getElementById("check-out").value;
        window.sessionStorage.adults = document.getElementById("adults").value;
        window.sessionStorage.children = document.getElementById("children").value;
        window.location.assign("reservation.html");
    };
};
