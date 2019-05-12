window.addEventListener("load", init, false);

function init() {

    var counter = 0;
    var slides = document.getElementsByClassName("main_slider");
    var texts = document.getElementsByClassName("main_block");
    var bars = document.getElementsByClassName("bar");
    var arrows = document.getElementsByClassName("arrow");
    var clicked;
    var totalSlides = slides.length;

    document.getElementById("check_button").addEventListener("click", startReservationProcess);
    arrows[0].addEventListener("click", function() { counter - 2; if (counter < 0) { counter = totalSlides - 1 }; clicked = Date.now(); mainSlider() });
    arrows[1].addEventListener("click", function() { clicked = Date.now(); mainSlider() });

    setInterval(autoSlider, 5000);

    function startReservationProcess() {
        window.sessionStorage.flag = "index";
        window.sessionStorage.checkIN = document.getElementById("check-in").value;
        window.sessionStorage.checkOUT = document.getElementById("check-out").value;
        window.sessionStorage.adults = document.getElementById("adults").value;
        window.sessionStorage.children = document.getElementById("children").value;
        window.location.assign("reservation.html");
    };

    function mainSlider() {
        
        var next = (counter + 1) == totalSlides ? 0 : counter + 1;

        slides[counter].style.opacity = 0;
        slides[next].style.opacity = 1;
        
        texts[counter].style.opacity = 0;
        texts[counter].style.display = "none";
        texts[next].style.display = "block"; setTimeout(function() {texts[next].style.opacity = 1}, 20);

        bars[counter].classList.remove("active");
        bars[next].classList.add("active");

        ++counter;
        if (counter == totalSlides) {
            counter = 0;
        };

    };

    function autoSlider() {
        if (clicked == undefined || Date.now() - clicked > 10000) mainSlider();
    };

};
